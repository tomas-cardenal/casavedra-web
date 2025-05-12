import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailApiUrl = 'https://api.emailjs.com/api/v1.0/email/send';  // Example for EmailJS

  constructor(private http: HttpClient) {}

  sendEmail(formData: any): Observable<any> {
    const emailPayload = {
      service_id: 'your_service_id',
      template_id: 'your_template_id',
      user_id: 'your_user_id',
      template_params: {
        name: formData.name,
        email: formData.email,
        message: formData.message
      }
    };

    return this.http.post(this.emailApiUrl, emailPayload);
  }
}
