import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';  // Ensure this service exists (we'll explain it below)

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  successMessage?: string;
  errorMessage?: string;

  constructor(private emailService: EmailService) {}

  onSubmit(contactForm: NgForm) {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    if (contactForm.invalid) {
      return;
    }

    const formData = contactForm.value;

    this.emailService.sendEmail(formData).subscribe(
      response => {
        // Display success message on successful email send
        this.successMessage = `¡Se ha mandado tu mensaje y responderemos a la mayor brevedad!`;
        contactForm.reset();
      },
      error => {
        // Display error message if something goes wrong
        this.errorMessage = `There was an issue sending your message. Please try again later.`;
      }
    );
  }
}
