import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service'; 

@Injectable({ providedIn: 'root' })
export class NewsService {

  constructor(private supabaseService: SupabaseService) {}

  async getNoticias(limit = 3): Promise<any[]> {
    const { data, error } = await this.supabaseService.client
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }

    return data.map((n) => ({
      id: n.id,
      titulo: n.title,
      resumen: n.content,
      img: n.image_url || 'assets/default-news.png'
    }));
  }
  
}
