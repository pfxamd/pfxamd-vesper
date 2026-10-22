/** Approved photography for VESPER product sets. */
export const productMedia = Object.freeze({
  'lune-i': Object.freeze({
    main: 'https://media.pfxamd.com/vesper/lune-i-main.webp',
    detail: 'https://media.pfxamd.com/vesper/lune-i-detail.webp',
    ingredients: 'https://media.pfxamd.com/vesper/lune-i-ingredients.webp',
  }),
  sable: Object.freeze({
    main: 'https://media.pfxamd.com/vesper/sable-main.webp',
    detail: 'https://media.pfxamd.com/vesper/sable-detail.webp',
    ingredients: 'https://media.pfxamd.com/vesper/sable-ingredients.webp',
  }),
  cendre: Object.freeze({
    main: 'https://media.pfxamd.com/vesper/cendre-main.webp',
    detail: 'https://media.pfxamd.com/vesper/cendre-detail.webp',
    ingredients: 'https://media.pfxamd.com/vesper/cendre-ingredients.webp',
  }),
  solin: Object.freeze({
    main: 'https://media.pfxamd.com/vesper/solin-main.webp',
    detail: 'https://media.pfxamd.com/vesper/solin-detail.webp',
    ingredients: 'https://media.pfxamd.com/vesper/solin-ingredients.webp',
  }),
  velum: Object.freeze({
    main: 'https://media.pfxamd.com/vesper/velum-main.webp',
    detail: 'https://media.pfxamd.com/vesper/velum-detail.webp',
    ingredients: 'https://media.pfxamd.com/vesper/velum-ingredients.webp',
  }),
});

export function mediaFor(item, variant, label = '') {
  const photos = productMedia[item?.id];
  if (!photos) return null;
  const kind = label.includes('MATERIAL IMAGE') ? 'ingredients'
    : label.includes('DETAIL IMAGE') ? 'detail' : 'main';
  return {
    src: photos[kind].startsWith('https://') ? photos[kind] : `./assets/${photos[kind]}`,
    alt: kind === 'ingredients'
      ? `Ingredients of ${item.name}: the fragrance composition`
      : kind === 'detail'
      ? `Close-up of VESPER ${item.name} Eau de Parfum bottle`
      : `VESPER ${item.name} Eau de Parfum bottle`,
    priority: variant === 'large',
  };
}