import { API_BASE_URL, getAuthToken } from "./api";
import {
  SpeakingEvidenceTagDTO,
  SpeakingEvidenceGroupedDTO,
  SpeakingAssessmentEvidenceDTO,
  SyncSpeakingEvidenceItem,
} from "../contracts/speaking-evidence.contract";

export const speakingEvidenceApi = {
  /**
   * Fetches all active candidate speaking evidence tags, grouped by criterion
   */
  getTags: async (criterion?: string): Promise<{
    tags: SpeakingEvidenceTagDTO[];
    grouped: SpeakingEvidenceGroupedDTO;
  }> => {
    const token = await getAuthToken();
    const query = criterion ? `?criterion=${criterion}` : "";
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}/speaking/evidence-tags${query}`, {
      headers,
    });

    if (!res.ok) {
      throw new Error(`Failed to load speaking evidence tags: HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      tags: data.tags || [],
      grouped: data.grouped || { pr: [], fc: [], lr: [], gra: [] },
    };
  },

  /**
   * Fetches active evidence items for a specific assessment
   */
  getAssessmentEvidence: async (
    assessmentId: string
  ): Promise<SpeakingAssessmentEvidenceDTO[]> => {
    const token = await getAuthToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(
      `${API_BASE_URL}/speaking/assessments/${assessmentId}/evidence`,
      { headers }
    );

    if (!res.ok) {
      throw new Error(`Failed to load assessment evidence: HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.evidence || [];
  },

  /**
   * Batch synchronizes selected evidence tags for a speaking assessment
   */
  syncAssessmentEvidence: async (
    assessmentId: string,
    items: SyncSpeakingEvidenceItem[]
  ): Promise<SpeakingAssessmentEvidenceDTO[]> => {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(
      `${API_BASE_URL}/speaking/assessments/${assessmentId}/evidence/sync`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ items }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to sync assessment evidence: HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.evidence || [];
  },
};
