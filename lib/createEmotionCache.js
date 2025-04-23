import createCache from '@emotion/cache';

export default function createEmotionCache() {
  // prepend: true moves MUI styles to the top of the <head> for better CSS specificity
  return createCache({ key: 'css', prepend: true });
}