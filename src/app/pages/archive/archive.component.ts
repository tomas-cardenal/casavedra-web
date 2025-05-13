import { Component } from '@angular/core';
import { ArtworkGridComponent } from '../../components/artwork-grid/artwork-grid.component';
import { Artwork } from '../../models/artwork';
import { ArtworkService } from '../../services/artwork.service';

@Component({
  selector: 'app-archive',
  imports: [ArtworkGridComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss',
})
export class ArchiveComponent {
  constructor(public artworkService: ArtworkService) {}

  getArtworks(): Artwork[] {
    return this.artworkService.getArtworks();
  }
}
