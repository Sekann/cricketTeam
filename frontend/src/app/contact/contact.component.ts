import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SupabaseService } from '../services/supabase/supabase.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
 form = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  enviado = false;
  errorForm = false;
  errorServidor = false;

  constructor(private supabase: SupabaseService) {}

  async enviarFormulario(form: NgForm) {
    if (form.invalid) {
      this.errorForm = true;
      return;
    }

    this.errorForm = false;
    this.errorServidor = false;

    try {
      const { error } = await this.supabase.enviarMensajeContacto({
        name: this.form.nombre,
        email: this.form.email,
        message: this.form.mensaje
      });

      if (error) throw error;

      this.enviado = true;
      form.resetForm();
      this.form = { nombre: '', email: '', mensaje: '' };
      setTimeout(() => (this.enviado = false), 4000);
    } catch (e) {
      console.error('Error al enviar mensaje:', e);
      this.errorServidor = true;
    }
  }
}