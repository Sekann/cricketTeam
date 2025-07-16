import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from '../services/match/match.service';
import { NewsService } from '../services/news/news.service';
import { PlayerService } from '../services/player/player.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements AfterViewInit, OnInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  jugadores: any[] = [];
  partidos: any[] = [];
  noticias: any[] = [];
  today = new Date();

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private matchService: MatchService,
    private newsService: NewsService
  ) { }

  ngAfterViewInit() {
    if (this.bgVideo?.nativeElement) {
      const video = this.bgVideo.nativeElement;
      video.muted = true;
      video.volume = 0;
      video.play().catch(() => {
        console.warn('Autoplay bloqueado');
      });
    }
  }

  ngOnInit() {
    this.playerService.getPlayers()
      .then(jugadores => {
        this.jugadores = jugadores.slice(0, 3);
        return this.newsService.getNoticias(3);
      })
      .then(noticias => {
        this.noticias = noticias;
        return this.matchService.getAllMatches();
      })
      .then(partidosOriginal => {

        const today = new Date();
        const futuros = partidosOriginal
          .filter(p => new Date(p.fecha) >= today)
          .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

        const pasados = partidosOriginal
          .filter(p => new Date(p.fecha) < today)
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

        const proximos = futuros.slice(0, 3);
        if (proximos.length < 3) {
          const faltantes = 3 - proximos.length;
          const ultimos = pasados.slice(0, faltantes);
          this.partidos = [...proximos, ...ultimos];
        } else {
          this.partidos = proximos;
        }


        // Esperar a que Angular actualice el DOM antes de activar animaciones
        setTimeout(() => this.activarAnimacionesReveal(), 0);
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }

  activarAnimacionesReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  verDetalleNoticia(noticia: any) {
    this.router.navigate(['/news/', noticia.id]);
  }

  verDetallePartido(partido: any) {
    this.router.navigate(['/matches/', partido.id]);
  }

  verTodosPartidos() {
    this.router.navigate(['/matches']);
  }

  verDetalleJugador(jugador: any) {
    this.router.navigate(['/players/', jugador.id]);
  }

  verTodosJugadores() {
    this.router.navigate(['/players']);
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
