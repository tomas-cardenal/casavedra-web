import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artwork } from '../../models/artwork';
import { ArtworkCardComponent } from '../artwork-card/artwork-card.component';
import { UseInViewDirective } from '../../directives/in-view.directive';

@Component({
  selector: 'app-artwork-grid',
  standalone: true,
  imports: [CommonModule, ArtworkCardComponent, UseInViewDirective],
  templateUrl: './artwork-grid.component.html',
  styleUrl: './artwork-grid.component.scss'
})
export class ArtworkGridComponent {
  artworks = input<Artwork[]>();
}
