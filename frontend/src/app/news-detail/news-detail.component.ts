import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  noticia: any;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNoticia(id);
    }
  }
  async loadNoticia(id: string) {
    try {
      const noticias = await this.newsService.getNoticias();
      const encontrado = noticias.find(n => n.id == id);
      if (encontrado) {
        this.noticia = encontrado;
      } else {
        console.error('Noticia no encontrada');
      }
    } catch (err) {
      console.error('Error al cargar noticia:', err);
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
