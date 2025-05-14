import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReservationFormComponent } from '../../components/reservation-form/reservation-form.component'; // Ensure this service exists (we'll explain it below)
import { ContactSectionPaths } from '../../values/asset-paths';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ReservationFormComponent,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  ContactSectionPaths = ContactSectionPaths;
}
