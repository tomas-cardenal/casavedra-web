import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, of, switchMap, timer } from 'rxjs';
import { Artwork } from '../models/artwork';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private emailApiUrl = 'https://api.emailjs.com/api/v1.0/email/send';
  private serviceId = environment.emailjs.serviceId;
  private confirmationTemplateId = environment.emailjs.confirmationTemplateId;
  private messageTemplateId = environment.emailjs.messageTemplateId;
  private userId = environment.emailjs.publicKey;

  constructor(private http: HttpClient) {}

  sendEmail(
    formData: {
      name: string;
      surname1: string;
      surname2?: string;
      email: string;
      comments?: string;
    },
    artwork?: Artwork
  ): Observable<any> {
    const fullName = `${formData.name} ${formData.surname1} ${
      formData.surname2 ?? ''
    }`.trim();

    const buyerTemplateParams = {
      name: fullName,
      email: formData.email,
    };

    const messageTemplateParams = {
      name: fullName,
      email: formData.email,
      motive: artwork
        ? `Reserva ${artwork.name} desde www.casavedra.com`
        : `Consulta desde www.casavedra.com`,
      message: artwork
        ? this.buildReservationMessage(
            fullName,
            formData.email,
            formData.comments,
            artwork
          )
        : this.buildConsultationMessage(
            fullName,
            formData.email,
            formData.comments
          ),
    };

    const reserveOrContactMail = this.http.post(
      this.emailApiUrl,
      {
        service_id: this.serviceId,
        user_id: this.userId,
        template_id: this.messageTemplateId,
        template_params: messageTemplateParams,
      },
      { responseType: 'text' }
    );

    if (artwork) {
      const buyerConfirmation = () =>
        this.http.post(
          this.emailApiUrl,
          {
            service_id: this.serviceId,
            template_id: this.confirmationTemplateId,
            user_id: this.userId,
            template_params: buyerTemplateParams,
          },
          { responseType: 'text' }
        );

      return reserveOrContactMail.pipe(
        switchMap((reserverOrContactRes) =>
          timer(1000).pipe(
            switchMap(() => buyerConfirmation()),
            concatMap((buyerRes) => of([reserverOrContactRes, buyerRes]))
          )
        )
      );
    }
    return reserveOrContactMail;
  }

  private buildReservationMessage(
    fullName: string,
    email: string,
    comments?: string,
    artwork?: Artwork
  ): string {
    return `
🖼 NUEVA RESERVA DE OBRA

👤 Nombre: ${fullName}
📧 Email: ${email}
📝 Comentarios: ${comments ?? 'Sin comentarios.'}

📌 Obra reservada:
- ID: ${artwork?.id}
- Título: ${artwork?.name}
- Colección: ${artwork?.collection ?? 'No especificada'}
    `.trim();
  }

  private buildConsultationMessage(
    fullName: string,
    email: string,
    comments?: string
  ): string {
    return `
💬 NUEVA CONSULTA

👤 Nombre: ${fullName}
📧 Email: ${email}
📝 Mensaje: ${comments ?? 'Sin mensaje.'}
    `.trim();
  }
}
