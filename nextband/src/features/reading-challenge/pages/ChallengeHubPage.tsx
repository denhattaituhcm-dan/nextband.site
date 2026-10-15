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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {totalUnits.map((u: any) => {
            const isAvailable = !u.isLocked;

            return (
              <Card
                key={u.unitNumber}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isAvailable
                    ? 'hover:border-sky-400 hover:shadow-md bg-card group cursor-pointer'
                    : 'opacity-65 bg-muted/30 border-dashed cursor-not-allowed'
                }`}
              >
                <CardContent className="p-5 flex flex-col justify-between h-full min-h-[190px]">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        Unit {u.unitNumber}
                      </span>
                      {isAvailable ? (
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Ready
                        </span>
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>

                    <h3 className="font-bold text-base text-foreground group-hover:text-sky-600 transition-colors line-clamp-1">
                      {u.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {u.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    {isAvailable ? (
                      <Link to={`/reading-challenge/${u.unitNumber}`}>
                        <Button className="w-full rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold h-9 shadow-sm">
                          Start Unit {u.unitNumber}
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled variant="outline" className="w-full rounded-2xl text-xs h-9">
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
