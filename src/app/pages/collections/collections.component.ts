import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArtworkCollection,
  getLabelForArtworkCollection,
} from '../../data/artwork-collection';
import { ArtworkGridComponent } from '../../components/artwork-grid/artwork-grid.component';
import { ArtworkService } from '../../services/artwork.service';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'app-collections',
  imports: [ArtworkGridComponent],
  templateUrl: './collections.component.html',
})
export class CollectionsComponent {
  collection: ArtworkCollection | undefined;
  collectionLabel: string = '';

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const raw = params.get('collection') as ArtworkCollection;
      this.collection = raw;
      this.collectionLabel = this.getLabelFor(raw);
    });
  }

  getLabelFor(collection: ArtworkCollection): string {
    return getLabelForArtworkCollection(collection);
  }

  getCollectionArtworks(): Artwork[] {
    if (this.collection === undefined) {
      return [];
    }
    return this.artworkService.getArtworksFromCollection(this.collection);
  }
}
