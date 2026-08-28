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

  let titleStr = '';
  let slugStr = '';
  let bandStr = '';

  if (typeof input === 'string') {
    titleStr = input.trim();
  } else {
    titleStr = (input.title || input.name || '').trim();
    slugStr = (input.slug || '').trim();
    bandStr = (input.band || '').trim();
  }

  const primaryText = `${slugStr} ${titleStr}`.toLowerCase();

  // 1. Check Starter (ST - Pink/Fuchsia)
  if (
    primaryText.includes('starter') ||
    /\b(st|s\d+)\b/i.test(titleStr) ||
    /^s\d+/i.test(titleStr)
  ) {
    return COURSE_BRANDS.starter;
  }

  // 2. Check Leader (LE - Rose/Red)
  if (
    primaryText.includes('leader') ||
    /\b(le|l\d+)\b/i.test(titleStr) ||
    /^l\d+/i.test(titleStr)
  ) {
    return COURSE_BRANDS.leader;
  }

  // 3. Check Master (MA - Green)
  if (
    primaryText.includes('master') ||
    /\b(ma|m\d+)\b/i.test(titleStr) ||
    /^m\d+/i.test(titleStr)
  ) {
    return COURSE_BRANDS.master;
  }

  // 4. Check Builder (BU - Orange)
  if (
    primaryText.includes('builder') ||
    /\b(bu|b\d+)\b/i.test(titleStr) ||
    /^b\d+/i.test(titleStr)
  ) {
    return COURSE_BRANDS.builder;
  }

  // 5. Check Dreamer (DR - Blue)
  if (
    primaryText.includes('dreamer') ||
    /\b(dr|d\d+)\b/i.test(titleStr) ||
    /^d\d+/i.test(titleStr)
  ) {
    return COURSE_BRANDS.dreamer;
  }

  // 6. Check Placement Test (PL - Indigo)
  if (
    primaryText.includes('placement') ||
    /\b(pl|p\d+)\b/i.test(titleStr) ||
    /^pl/i.test(titleStr)
  ) {
    return COURSE_BRANDS.placement;
  }

  // 7. Check Extra Listening (EX - Purple)
  if (
    primaryText.includes('extra') ||
    primaryText.includes('listening') ||
    /\b(ex|e\d+)\b/i.test(titleStr) ||
    /^ex/i.test(titleStr)
  ) {
    return COURSE_BRANDS.extra_listening;
  }

  // 8. Check Entrance Test THPTQG (EN - Amber)
  if (
    primaryText.includes('entrance') ||
    primaryText.includes('thptqg') ||
    /\b(en)\b/i.test(titleStr) ||
    /^en/i.test(titleStr)
  ) {
    return COURSE_BRANDS.entrance_thpt;
  }

  // 9. Check Luyện thi TN THPT (LU - Teal)
  if (
    primaryText.includes('luyện thi') ||
    primaryText.includes('luyen thi') ||
    primaryText.includes('tn thpt') ||
    /\b(lu)\b/i.test(titleStr) ||
    /^lu/i.test(titleStr)
  ) {
    return COURSE_BRANDS.luyen_thi_thpt;
  }

  // Fallback check by specific exact band (if title is generic)
  const fullText = `${titleStr} ${bandStr}`.toLowerCase();
  if (fullText.includes('band 3.0') || fullText.includes('đầu ra 3.0')) return COURSE_BRANDS.starter;
  if (fullText.includes('band 4.0') || fullText.includes('đầu ra 4.0')) return COURSE_BRANDS.dreamer;
  if (fullText.includes('band 5.0') || fullText.includes('đầu ra 5.0')) return COURSE_BRANDS.builder;
  if (fullText.includes('band 6.0') || fullText.includes('đầu ra 6.0')) return COURSE_BRANDS.master;
  if (fullText.includes('band 6.5') || fullText.includes('đầu ra 6.5') || fullText.includes('7.0')) return COURSE_BRANDS.leader;

  const rawForCode = titleStr || slugStr || 'CS';
  const code = rawForCode.length >= 2 ? rawForCode.substring(0, 2).toUpperCase() : 'CS';
  return {
    ...COURSE_BRANDS.fallback,
    code,
    name: titleStr || 'Khóa học',
  };
}
