import { Component, input } from '@angular/core';
import { Artwork } from '../../models/artwork';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  imports: [FormsModule],
  templateUrl: './reservation-form.component.html',
})
export class ReservationFormComponent {
  artwork = input<Artwork | undefined>();

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
}
