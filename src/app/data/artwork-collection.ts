export enum ArtworkCollection {
  suenhos = 'suenhos',
  musicos = 'musicos',
  etnicos = 'etnicos',
  bocetos = 'bocetos',
}

export function getLabelForArtworkCollection(
  collection: ArtworkCollection
): string {
  switch (collection) {
    case ArtworkCollection.suenhos:
      return 'Sueños';
    case ArtworkCollection.musicos:
      return 'Músicos en la escuela';
    case ArtworkCollection.etnicos:
      return 'Étnicos';
    case ArtworkCollection.bocetos:
      return 'Bocetos';
    default:
      return '';
  }
}
