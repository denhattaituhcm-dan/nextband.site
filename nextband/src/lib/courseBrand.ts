export interface CourseBrandInfo {
  key: string;
  code: string;
  name: string;
  band: string;
  hex: string;
  avatarClass: string;
  badgeClass: string;
  textClass: string;
  borderClass: string;
  dotClass: string;
  bgSoftClass: string;
}

const COURSE_BRANDS: Record<string, CourseBrandInfo> = {
  starter: {
    key: 'starter',
    code: 'ST',
    name: 'Starter',
    band: 'Band 3.0',
    hex: '#D83A94',
    avatarClass: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 dark:border-fuchsia-800',
    badgeClass: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:border-fuchsia-800',
    textClass: 'text-fuchsia-700 dark:text-fuchsia-300',
    borderClass: 'border-fuchsia-300 dark:border-fuchsia-800',
    dotClass: 'bg-fuchsia-500',
    bgSoftClass: 'bg-fuchsia-50/70 dark:bg-fuchsia-950/20',
  },
  dreamer: {
    key: 'dreamer',
    code: 'DR',
    name: 'Dreamer',
    band: 'Band 4.0',
    hex: '#2582D7',
    avatarClass: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    textClass: 'text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-300 dark:border-blue-800',
    dotClass: 'bg-blue-500',
    bgSoftClass: 'bg-blue-50/70 dark:bg-blue-950/20',
  },
  builder: {
    key: 'builder',
    code: 'BU',
    name: 'Builder',
    band: 'Band 5.0',
    hex: '#EE8722',
    avatarClass: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
    textClass: 'text-orange-700 dark:text-orange-300',
    borderClass: 'border-orange-300 dark:border-orange-800',
    dotClass: 'bg-orange-500',
    bgSoftClass: 'bg-orange-50/70 dark:bg-orange-950/20',
  },
  master: {
    key: 'master',
    code: 'MA',
    name: 'Master',
    band: 'Band 6.0',
    hex: '#289B6E',
    avatarClass: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    textClass: 'text-emerald-700 dark:text-emerald-300',
    borderClass: 'border-emerald-300 dark:border-emerald-800',
    dotClass: 'bg-emerald-500',
    bgSoftClass: 'bg-emerald-50/70 dark:bg-emerald-950/20',
  },
  leader: {
    key: 'leader',
    code: 'LE',
    name: 'Leader',
    band: 'Band 6.5+',
    hex: '#DC342D',
    avatarClass: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    textClass: 'text-rose-700 dark:text-rose-300',
    borderClass: 'border-rose-300 dark:border-rose-800',
    dotClass: 'bg-rose-500',
    bgSoftClass: 'bg-rose-50/70 dark:bg-rose-950/20',
  },
  placement: {
    key: 'placement',
    code: 'PL',
    name: 'Placement Test',
    band: 'Test',
    hex: '#6366F1',
    avatarClass: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    textClass: 'text-indigo-700 dark:text-indigo-300',
    borderClass: 'border-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    bgSoftClass: 'bg-indigo-50/70 dark:bg-indigo-950/20',
  },
  extra_listening: {
    key: 'extra_listening',
    code: 'EX',
    name: 'Extra Listening',
    band: 'Listening',
    hex: '#8B5CF6',
    avatarClass: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    textClass: 'text-purple-700 dark:text-purple-300',
    borderClass: 'border-purple-300 dark:border-purple-800',
    dotClass: 'bg-purple-500',
    bgSoftClass: 'bg-purple-50/70 dark:bg-purple-950/20',
  },
  entrance_thpt: {
    key: 'entrance_thpt',
    code: 'EN',
    name: 'Entrance Test THPTQG',
    band: 'THPTQG',
    hex: '#D97706',
    avatarClass: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    textClass: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-300 dark:border-amber-800',
    dotClass: 'bg-amber-500',
    bgSoftClass: 'bg-amber-50/70 dark:bg-amber-950/20',
  },
  luyen_thi_thpt: {
    key: 'luyen_thi_thpt',
    code: 'LU',
    name: 'Luyện thi TN THPT',
    band: 'TN THPT',
    hex: '#0D9488',
    avatarClass: 'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
    textClass: 'text-teal-700 dark:text-teal-300',
    borderClass: 'border-teal-300 dark:border-teal-800',
    dotClass: 'bg-teal-500',
    bgSoftClass: 'bg-teal-50/70 dark:bg-teal-950/20',
  },
  fallback: {
    key: 'default',
    code: 'CS',
    name: 'Khóa học',
    band: '',
    hex: '#64748B',
    avatarClass: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/40 dark:text-slate-300 dark:border-slate-700',
    textClass: 'text-slate-700 dark:text-slate-300',
    borderClass: 'border-slate-300 dark:border-slate-700',
    dotClass: 'bg-slate-500',
    bgSoftClass: 'bg-slate-50/70 dark:bg-slate-900/20',
  },
};

export function getCourseBrand(
  input:
    | {
        title?: string;
        name?: string;
        slug?: string;
        courseId?: string;
        band?: string;
      }
    | string
    | null
    | undefined
): CourseBrandInfo {
  if (!input) return COURSE_BRANDS.fallback;

  let rawStr = '';
  if (typeof input === 'string') {
    rawStr = input.trim();
  } else {
    rawStr = [input.slug, input.title, input.name, input.band]
      .filter(Boolean)
      .join(' ')
      .trim();
  }

  const lower = rawStr.toLowerCase();
  const upper = rawStr.toUpperCase();

  // 1. Check Master (Green)
  if (
    lower.includes('master') ||
    /\b(MA|M\d+)\b/i.test(rawStr) ||
    /^M\d+/i.test(rawStr) ||
    lower.includes('6.0')
  ) {
    return COURSE_BRANDS.master;
  }

  // 2. Check Builder (Orange)
  if (
    lower.includes('builder') ||
    /\b(BU|B\d+)\b/i.test(rawStr) ||
    /^B\d+/i.test(rawStr) ||
    lower.includes('5.0')
  ) {
    return COURSE_BRANDS.builder;
  }

  // 3. Check Dreamer (Blue)
  if (
    lower.includes('dreamer') ||
    /\b(DR|D\d+)\b/i.test(rawStr) ||
    /^D\d+/i.test(rawStr) ||
    lower.includes('4.0')
  ) {
    return COURSE_BRANDS.dreamer;
  }

  // 4. Check Starter (Pink/Fuchsia)
  if (
    lower.includes('starter') ||
    /\b(ST|S\d+)\b/i.test(rawStr) ||
    /^S\d+/i.test(rawStr) ||
    lower.includes('3.0')
  ) {
    return COURSE_BRANDS.starter;
  }

  // 5. Check Leader (Red)
  if (
    lower.includes('leader') ||
    /\b(LE|L\d+)\b/i.test(rawStr) ||
    /^L\d+/i.test(rawStr) ||
    lower.includes('6.5') ||
    lower.includes('7.0')
  ) {
    return COURSE_BRANDS.leader;
  }

  // 6. Placement Test
  if (lower.includes('placement') || upper.startsWith('PL') || /\bPL\b/i.test(rawStr)) {
    return COURSE_BRANDS.placement;
  }

  // 7. Extra Listening
  if (lower.includes('extra') || lower.includes('listening') || upper.startsWith('EX') || /\bEX\b/i.test(rawStr)) {
    return COURSE_BRANDS.extra_listening;
  }

  // 8. Entrance Test THPTQG
  if (lower.includes('entrance') || upper.startsWith('EN') || /\bEN\b/i.test(rawStr)) {
    return COURSE_BRANDS.entrance_thpt;
  }

  // 9. Luyện thi TN THPT
  if (lower.includes('luyện thi') || lower.includes('luyen thi') || upper.startsWith('LU') || /\bLU\b/i.test(rawStr)) {
    return COURSE_BRANDS.luyen_thi_thpt;
  }

  const code = rawStr.length >= 2 ? rawStr.substring(0, 2).toUpperCase() : 'CS';
  return {
    ...COURSE_BRANDS.fallback,
    code,
    name: typeof input === 'string' ? input : input.title || input.name || 'Khóa học',
  };
}
