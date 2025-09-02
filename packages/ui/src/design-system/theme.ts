import { breakpoints } from './breakpoints';
import { palette } from './palette';
import { typography } from './typography';

export const theme = {
  breakpoints,
  palette,
  typography,
} as const;

export type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}
