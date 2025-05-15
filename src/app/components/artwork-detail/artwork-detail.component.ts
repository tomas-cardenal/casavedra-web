import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artwork } from '../../models/artwork';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { getLabelForArtworkCollection } from '../../data/artwork-collection';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, ReservationFormComponent],
  templateUrl: './artwork-detail.component.html',
})
export class ArtworkDetailComponent {
  artwork = input.required<Artwork>();

  getLabelForArtworkCollection(): string {
    if (this.artwork().collection !== undefined) {
      return getLabelForArtworkCollection(this.artwork().collection!);
    } else {
      return '';
    }
  }
}
