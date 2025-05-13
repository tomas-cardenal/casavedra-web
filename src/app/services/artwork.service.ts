import { Injectable } from '@angular/core';
import { Artwork } from '../models/artwork';
import { ARTWORK_DATA } from '../data/artwork-data';
import { ArtworkCollection } from '../data/artwork-collection';

@Injectable({
  providedIn: 'root',
})
export class ArtworkService {
  constructor() {}

  getArtworks(): Artwork[] {
    return ARTWORK_DATA;
  }

  getArtworksFromCollection(collection: ArtworkCollection): Artwork[] {
    return ARTWORK_DATA.filter((artwork) => artwork.collection === collection);
  }

  searchArtworksByName(search: string): Artwork[] {
    const normalized = search.toLowerCase();
    return ARTWORK_DATA.filter((artwork) =>
      artwork.name.toLowerCase().includes(normalized)
    );
  }
}
