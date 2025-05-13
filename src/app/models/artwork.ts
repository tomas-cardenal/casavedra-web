import { ArtworkCollection } from "../data/artwork-collection";

export interface Artwork {
  id: string;
  name: string;
  imagePath: string;
  description?: string;
  collection?: ArtworkCollection;
  size?: string;
  technique?: string;
  year?: number;
}
