import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({ providedIn: 'root' })
export class MatchService {
  constructor(
    private supabaseService: SupabaseService,
    private http: HttpClient
  ) { }
  async getAllMatches(): Promise<any[]> {
    const { data, error } = await this.supabaseService.client
      .from('matches')
      .select(`
        *,
        opponent:opponent_id (name, logo_url)
      `);

    if (error) {
      console.error('Error fetching matches:', error);
      return [];
    }

    return data.map((match) => ({
      id: match.id,
      local: 'Madrid United CC',
      logoLocal: 'assets/logo.jpg',
      visitante: match.opponent?.name || 'Desconocido',
      logoVisitante: match.opponent?.logo_url || 'assets/default-logo.png',
      fecha: new Date(match.date),
      resultado: match.result || null
    }));
  }
  async getMatchById(id: string): Promise<any> {
    const { data, error } = await this.supabaseService.client
      .from('matches')
      .select(`
      *,
      opponent:opponent_id (name, logo_url)
    `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching match by ID:', error);
      throw error;
    }

    return {
      id: data.id,
      local: 'Madrid United CC',
      logoLocal: 'assets/logo.jpg',
      visitante: data.opponent?.name || 'Desconocido',
      logoVisitante: data.opponent?.logo_url || 'assets/default-logo.png',
      fecha: new Date(data.date),
      resultado: data.result || null,
      descripcion: data.summary || 'Descripción no disponible',
      estadio: data.location || 'Estadio no especificado',
      mejorBateador: data.best_batsman || 'No disponible',
      mejorBowler: data.best_bowler || 'No disponible',
    };
  }

}
