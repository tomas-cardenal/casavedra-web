import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtworkCollection } from '../../data/artwork-collection';

@Component({
  selector: 'app-collections',
  imports: [],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent {
  collection: ArtworkCollection | undefined;
  collectionLabel: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const raw = params.get('collection') as ArtworkCollection;
      this.collection = raw;
      this.collectionLabel = this.getLabelFor(raw);
    });
  }

  getLabelFor(c: ArtworkCollection): string {
    switch (c) {
      case ArtworkCollection.suenhos: return 'Sueños';
      case ArtworkCollection.musicos: return 'Músicos en la escuela';
      case ArtworkCollection.etnicos: return 'Étnicos';
      case ArtworkCollection.bocetos: return 'Bocetos';
      default: return '';
    }
  }
}
