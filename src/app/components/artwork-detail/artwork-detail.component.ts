import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Artwork } from '../../models/artwork';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artwork-detail.component.html',
  styleUrl: './artwork-detail.component.scss',
})
export class ArtworkDetailComponent {
  artwork = input.required<Artwork>();

  formData = {
    name: '',
    surname1: '',
    surname2: '',
    email: '',
    comments: '',
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    // TODO: Integrate EmailJS or backend call
    this.submitted = true;

    // Auto-hide the snackbar after 3 seconds
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }

  imageLoaded() {
    const element = document.getElementById('artwork-img');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
