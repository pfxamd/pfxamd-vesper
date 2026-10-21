/** Approved photography from the first two VESPER product sets. */
export const productMedia = Object.freeze({
  'lune-i': Object.freeze({
    main: 'lune-i-main.webp',
    detail: 'lune-i-detail.webp',
    ingredients: 'lune-i-ingredients.webp',
  }),
  sable: Object.freeze({
    main: 'sable-main.webp',
    detail: 'sable-detail.webp',
    ingredients: 'sable-ingredients.webp',
  }),
});

export function mediaFor(item, variant, label = '') {
  const photos = productMedia[item?.id];
  if (!photos) return null;
  const kind = label.includes('MATERIAL IMAGE') ? 'ingredients'
    : label.includes('DETAIL IMAGE') ? 'detail' : 'main';
  return {
    src: `./assets/${photos[kind]}`,
    alt: kind === 'ingredients'
      ? `Ingredients of ${item.name}: the fragrance composition`
      : kind === 'detail'
      ? `Close-up of VESPER ${item.name} Eau de Parfum bottle`
      : `VESPER ${item.name} Eau de Parfum bottle`,
    priority: variant === 'large',
  };
}