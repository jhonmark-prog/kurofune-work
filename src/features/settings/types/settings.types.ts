export type LanguageCode = 'en' | 'ja' | 'id' | 'fil' | 'vi' | 'zh';

export interface Language {
  code: LanguageCode;
  label: string;
}

export type SettingsStatus = 'idle' | 'loading' | 'succeeded' | 'failed';