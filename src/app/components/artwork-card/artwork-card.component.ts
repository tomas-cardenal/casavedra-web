import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artwork } from '../../models/artwork';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-artwork-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss',
})
export class ArtworkCardComponent {
  artwork = input.required<Artwork>();

  constructor(private router: Router) {}

  navigate() {
    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() =>
        this.router.navigate(['/artwork', this.artwork().id])
      );
    } else {
      this.router.navigate(['/artwork', this.artwork().id]);
    }
  }
}
