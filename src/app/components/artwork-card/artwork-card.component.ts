import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'app-artwork-card',
  imports: [CommonModule],
  templateUrl: './artwork-card.component.html',
  styleUrl: './artwork-card.component.scss'
})
export class ArtworkCardComponent {
  artwork = input.required<Artwork>();
}
