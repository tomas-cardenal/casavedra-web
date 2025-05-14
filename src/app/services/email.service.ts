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

  private alejandroEmail = environment.reservationRecipient;

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

    const emailToAlejandro = this.http.post(this.emailApiUrl, {
      service_id: this.serviceId,
      user_id: this.userId,
      template_id: this.messageTemplateId,
      template_params: messageTemplateParams,
    });

    if (artwork) {
      const buyerConfirmation = () =>
        this.http.post(this.emailApiUrl, {
          service_id: this.serviceId,
          template_id: this.confirmationTemplateId,
          user_id: this.userId,
          template_params: buyerTemplateParams,
        });

      return emailToAlejandro.pipe(
        switchMap((alejandroRes) =>
          timer(1000).pipe(
            switchMap(() => buyerConfirmation()),
            concatMap((buyerRes) => of([alejandroRes, buyerRes]))
          )
        )
      );
    }

    return emailToAlejandro;
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
