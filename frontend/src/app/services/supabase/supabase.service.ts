import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rlbzulsjxwqynoovnvbj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsYnp1bHNqeHdxeW5vb3ZudmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNDI5ODcsImV4cCI6MjA2NjcxODk4N30.-x9-kQOs_D6TLnDCQizVctQhrCm_Zlp9FkxnUvZ-YgY';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }
  async enviarMensajeContacto(data: { name: string; email: string; message: string }) {
    return await this.supabase.from('contact_messages').insert([data]);
  }
}