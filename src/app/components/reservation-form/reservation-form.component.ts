import { Component, input, signal } from '@angular/core';
import { Artwork } from '../../models/artwork';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.component.html',
})
export class ReservationFormComponent {
  constructor(private emailService: EmailService) {}

  artwork = input<Artwork | undefined>();

  formData = {
    name: '',
    surname1: '',
    surname2: '',
    email: '',
    comments: '',
  };

  submitted = signal(false);
  error = signal(false);
  busy = signal(false);

  onSubmit() {
    this.submitted.set(false);
    this.error.set(false);
    this.busy.set(true);

    this.emailService.sendEmail(this.formData, this.artwork()).subscribe({
      next: () => {
        this.busy.set(false);
        this.submitted.set(true);
        this.error.set(false);
        setTimeout(() => this.submitted.set(false), 3000);
      },
      error: () => {
        this.busy.set(false);
        this.error.set(true);
        setTimeout(() => this.error.set(false), 5000);
      },
    });
  }
}
