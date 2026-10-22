/** Approved photography for VESPER product sets. */
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
  cendre: Object.freeze({
    main: 'cendre-main.webp',
    detail: 'cendre-detail.webp',
    ingredients: 'cendre-ingredients.webp',
  }),
  solin: Object.freeze({
    main: 'solin-main.webp',
    detail: 'solin-detail.webp',
    ingredients: 'solin-ingredients.webp',
  }),
  velum: Object.freeze({
    main: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyLACOaXKwxZct2VlGvtPvAYT/445ee6d0-cc4f-4f66-8d84-4de8b0134a4c.webp',
    detail: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyLACOaXKwxZct2VlGvtPvAYT/6d3241ce-4ada-434f-bd22-7a30bd9c5940.webp',
    ingredients: 'https://d2ol7oe51mr4n9.cloudfront.net/user_3IwyLACOaXKwxZct2VlGvtPvAYT/74ec384c-bcaa-4c99-84e4-e9d8ef3cf747.webp',
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