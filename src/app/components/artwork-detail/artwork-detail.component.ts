import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artwork } from '../../models/artwork';
import { ReservationFormComponent } from "../reservation-form/reservation-form.component";

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, ReservationFormComponent],
  templateUrl: './artwork-detail.component.html',
  styleUrl: './artwork-detail.component.scss',
})
export class ArtworkDetailComponent {
  artwork = input.required<Artwork>();

  imageLoaded() {
    const element = document.getElementById('artwork-img');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
