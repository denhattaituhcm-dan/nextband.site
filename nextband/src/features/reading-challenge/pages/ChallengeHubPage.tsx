import React from 'react';
import { UNITS_CATALOG } from '../data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Layers, 
  Compass 
} from 'lucide-react';

export const ChallengeHubPage: React.FC = () => {
  // 20 Units array for UI layout
  const totalUnits = Array.from({ length: 20 }, (_, i) => {
    const unitNumber = i + 1;
    const existing = UNITS_CATALOG.find((u) => u.unitNumber === unitNumber);
    return (
      existing || {
        unitNumber,
        slug: `unit-${unitNumber}`,
        title: unitNumber === 1 ? 'The Ice Hotel' : `Unit ${unitNumber}: Coming Soon`,
        subtitle: 'Reading Challenge 1 (Second Edition)',
        isLocked: unitNumber > 1,
      }
    );
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent border-b border-sky-100 dark:border-sky-900/40">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-bold tracking-wide uppercase">
              <Compass className="w-3.5 h-3.5" />
              Compass Publishing Series
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Reading Challenge 1
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Second Edition — 20 Interactive Non-Fiction Units featuring Pre-reading, Passage Audio, Comprehension, Dictation, Grammar Focus, and Review Quizzes.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-600" /> 20 Comprehensive Units
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> 10 Micro-Steps per Unit
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-emerald-600" /> Interactive Mastery Tracking
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of 20 Units */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground">Unit Curriculum</h2>
            <p className="text-xs text-muted-foreground">Select a unit to start your learning journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {totalUnits.map((u: any) => {
            const isAvailable = !u.isLocked;
            const hasCustomImage = u.unitNumber <= 18;
            const imageUrl = hasCustomImage
              ? `/images/reading-challenge/unit-${String(u.unitNumber).padStart(2, '0')}.png`
              : null;

            // Palette for vibrant YouPass-style section badges
            const badgeColors = [
              'bg-amber-500 text-white',
              'bg-blue-600 text-white',
              'bg-purple-600 text-white',
              'bg-sky-600 text-white',
              'bg-emerald-600 text-white',
              'bg-rose-500 text-white',
              'bg-indigo-600 text-white',
              'bg-teal-600 text-white',
            ];
            const badgeColorClass = badgeColors[(u.unitNumber - 1) % badgeColors.length];

            return (
              <Card
                key={u.unitNumber}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
                  isAvailable
                    ? 'hover:border-sky-400 hover:shadow-lg bg-card group cursor-pointer'
                    : 'opacity-65 bg-muted/30 border-dashed cursor-not-allowed'
                }`}
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={u.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-slate-200 dark:to-slate-800 text-muted-foreground">
                      <BookOpen className="w-8 h-8 mb-1 text-sky-500/70" />
                      <span className="text-[11px] font-medium">Reading Challenge 1</span>
                    </div>
                  )}

                  {/* Gradient shadow overlay for badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Top-left Category Pill (YouPass style) */}
                  <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-white text-[11px] font-medium shadow-sm">
                    <BookOpen className="w-3 h-3 text-sky-400" />
                    <span className="truncate max-w-[130px]">{u.category || 'Non-Fiction'}</span>
                  </div>

                  {/* Top-right Status Pill */}
                  <div className="absolute top-2.5 right-2.5">
                    {isAvailable ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/60 text-slate-300 backdrop-blur-md">
                        <Lock className="w-2.5 h-2.5" />
                        Locked
                      </span>
                    )}
                  </div>

                  {/* Bottom-left Unit Badge (YouPass Section style) */}
                  <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow-md tracking-wide ${badgeColorClass}`}>
                    Unit {u.unitNumber}
                  </div>
                </div>

                {/* Card Body */}
                <CardContent className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      className="font-bold text-sm sm:text-base text-foreground group-hover:text-sky-600 transition-colors line-clamp-1 mb-1"
                      title={u.title}
                    >
                      {u.title}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-2 mb-3">
                      <span>{u.wordCount ? `${u.wordCount} words` : 'Non-Fiction'}</span>
                      <span>•</span>
                      <span>10 micro-steps</span>
                      <span>•</span>
                      <span>Audio</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    {isAvailable ? (
                      <Link to={`/reading-challenge/${u.unitNumber}`} className="block">
                        <Button className="w-full rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold h-8.5 shadow-sm transition-transform active:scale-95">
                          Start Unit {u.unitNumber}
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled variant="outline" className="w-full rounded-xl text-xs h-8.5">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};
