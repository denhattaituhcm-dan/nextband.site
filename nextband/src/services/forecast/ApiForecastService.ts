import { ForecastService } from './ForecastService';
import {
  Season,
  ForecastTopic,
  TopicFilters,
  formatSeasonSlug,
  parseSeasonSlug,
} from './types';
import { speakingForecastApi } from '@/lib/api';

export class ApiForecastService implements ForecastService {
  private cache: {
    data: { seasons: Season[]; topics: ForecastTopic[]; selectedSeasonId?: string } | null;
    timestamp: number;
  } = { data: null, timestamp: 0 };

  private CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

  private async fetchForecastData() {
    const now = Date.now();
    if (this.cache.data && now - this.cache.timestamp < this.CACHE_TTL_MS) {
      return this.cache.data;
    }

    try {
      const res = await speakingForecastApi.getPublicData();
      const seasons: Season[] = res?.seasons || [];
      const topics: ForecastTopic[] = res?.topics || [];
      const selectedSeasonId = res?.selectedSeasonId;

      this.cache = {
        data: { seasons, topics, selectedSeasonId },
        timestamp: now,
      };

      return this.cache.data;
    } catch (err) {
      console.error('[ApiForecastService] Failed to fetch speaking forecast:', err);
      // Return empty dataset truthfully if network/server is down
      return { seasons: [], topics: [], selectedSeasonId: undefined };
    }
  }

  async getLatestSeason(): Promise<Season | null> {
    const { seasons, selectedSeasonId } = await this.fetchForecastData();
    if (selectedSeasonId) {
      const match = seasons.find((s) => s.id === selectedSeasonId);
      if (match) return match;
    }
    const current = seasons.find((s) => s.isCurrent);
    if (current) return current;
    return seasons[0] || null;
  }

  async getSeasons(): Promise<Season[]> {
    const { seasons } = await this.fetchForecastData();
    return seasons;
  }

  async getSeason(slug: string): Promise<Season | null> {
    const { seasons } = await this.fetchForecastData();
    const parsed = parseSeasonSlug(slug);
    if (parsed) {
      const match = seasons.find(
        (s) => s.year === parsed.year && s.quarter === parsed.quarter
      );
      if (match) return match;
    }
    return (
      seasons.find(
        (s) => formatSeasonSlug(s.year, s.quarter).toLowerCase() === slug.toLowerCase()
      ) || null
    );
  }

  async getTopics(seasonSlug: string, filters?: TopicFilters): Promise<ForecastTopic[]> {
    const season = await this.getSeason(seasonSlug);
    if (!season) return [];

    const { topics } = await this.fetchForecastData();

    return topics.filter((t) => {
      // Must belong to target season
      if (t.seasonId !== season.id) return false;

      // Status filter
      const statusFilter = filters?.status || 'Published';
      if (t.status && t.status !== statusFilter) return false;

      // Part filter
      if (filters?.part && filters.part !== 'all' && t.part !== filters.part) {
        return false;
      }

      // Type filter
      if (filters?.type && filters.type !== 'all' && t.type !== filters.type) {
        return false;
      }

      // Category filter
      if (filters?.category && t.category?.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Search term
      if (filters?.search && filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchName = t.topicName?.toLowerCase().includes(q);
        const matchCat = t.category?.toLowerCase().includes(q);
        const matchPrompt = t.cueCardPrompt?.toLowerCase().includes(q);
        const matchQ = t.questions?.some((item) => item.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchPrompt && !matchQ) {
          return false;
        }
      }

      return true;
    });
  }

  async getTopic(seasonSlug: string, topicSlug: string): Promise<ForecastTopic | null> {
    const topics = await this.getTopics(seasonSlug);
    return topics.find((t) => t.slug === topicSlug) || null;
  }

  async getRelatedTopics(topic: ForecastTopic, limit: number = 3): Promise<ForecastTopic[]> {
    const { topics } = await this.fetchForecastData();
    return topics
      .filter((t) => t.id !== topic.id && t.seasonId === topic.seasonId && t.part === topic.part)
      .slice(0, limit);
  }
}
