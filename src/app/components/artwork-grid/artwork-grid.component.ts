import {
  Component,
  input,
  signal,
  effect,
  inject,
  computed,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artwork } from '../../models/artwork';
import { ArtworkCardComponent } from '../artwork-card/artwork-card.component';
import Fuse from 'fuse.js';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { UseInViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'app-artwork-grid',
  standalone: true,
  imports: [CommonModule, ArtworkCardComponent, UseInViewDirective],
  templateUrl: './artwork-grid.component.html',
})
export class ArtworkGridComponent {
  artworks = input<Artwork[]>();
  searchText = signal('');

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef<HTMLInputElement>;

  fuse = computed(() => {
    return new Fuse(this.artworks() ?? [], {
      keys: ['name', 'description', 'technique'],
      threshold: 0.3,
    });
  });

  filteredArtworks = computed(() => {
    const query = this.searchText().trim();
    if (!query) return this.artworks() ?? [];
    return this.fuse()
      .search(query)
      .map((result) => result.item);
  });

  ngAfterViewInit() {
    fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(200),
        map((e) => (e.target as HTMLInputElement).value)
      )
      .subscribe((value) => this.searchText.set(value));
  }
}
