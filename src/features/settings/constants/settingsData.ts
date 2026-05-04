import type { Language } from '../types/settings.types';

export const LANGUAGE_OPTIONS: Language[] = [
  { code: 'en',  label: 'English' },
  { code: 'ja',  label: '日本語 (Japan)' },
  { code: 'id',  label: 'Bahasa' },
  { code: 'fil', label: 'Filipino' },
  { code: 'vi',  label: 'Tiếng Việt (Vietnam)' },
  { code: 'zh',  label: '中文 (China)' },
];

export const PAYFOREX_URL = 'https://www.payforex.jp';

export const PRIVACY_POLICY_URL  = 'https://kurofune.work/privacy';
export const TERMS_URL           = 'https://kurofune.work/terms';

export const PASSWORD_HINT =
  'Password must be at least 8 characters, alphanumeric, has uppercase and lowercase.';