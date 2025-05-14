import { afterNextRender, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArtworkService } from '../../services/artwork.service';
import { ArtworkDetailComponent } from '../../components/artwork-detail/artwork-detail.component';

@Component({
  standalone: true,
  selector: 'app-artwork-page',
  imports: [CommonModule, ArtworkDetailComponent],
  templateUrl: './artwork-page.component.html',
})
export class ArtworkPageComponent {
  private route = inject(ActivatedRoute);
  private service = inject(ArtworkService);

  artwork = computed(() =>
    this.service
      .getArtworks()
      .find((a) => a.id === this.route.snapshot.paramMap.get('id'))
  );
}
