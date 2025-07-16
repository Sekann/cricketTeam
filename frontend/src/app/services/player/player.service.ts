import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service'; 

@Injectable({ providedIn: 'root' })
export class PlayerService {

  constructor(private supabaseService: SupabaseService) {}

  async getPlayers(): Promise<any[]> {
    const { data, error } = await this.supabaseService.client.from('players').select('*');

    if (error) {
      console.error('Error fetching players:', error);
      return [];
    }

    return data.map((p) => ({
      id: p.id,
      nombre: p.full_name,
      numero: p.number,
      estadisticaBateo: p.batting_stats || "Estadisticas de bateo no disponibles",
      estadisticaBoleo: p.bowling_stats || "Estadisticas de bowling no disponibles",
      posicion: p.role,
      foto: p.image_url || 'assets/default-player.jpg'
    }));
  }
}
