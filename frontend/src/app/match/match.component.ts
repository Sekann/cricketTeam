import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from '../services/match/match.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  allMatches: any[] = [];
  displayedMatches: any[] = [];
  itemsPerPage = 6;
  currentPage = 1;
  loading = false;
  error = '';
  today= new Date();


  constructor(
    private router: Router,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.loadMatches();
  }

  async loadMatches() {
    this.loading = true;
    this.error = '';
    try {
      const matchesOriginal = await this.matchService.getAllMatches();

      // Ordenamos: primeros futuros, luego pasados
      const today = new Date();
      const futuros = matchesOriginal
        .filter(p => new Date(p.fecha) >= today)
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

      const pasados = matchesOriginal
        .filter(p => new Date(p.fecha) < today)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      this.allMatches = [...futuros, ...pasados];

      // Inicializamos la lista visible
      this.displayedMatches = this.allMatches.slice(0, this.itemsPerPage);
    } catch (err) {
      console.error('Error loading matches:', err);
      this.error = 'No se pudieron cargar los partidos. Intenta nuevamente.';
    } finally {
      this.loading = false;
    }
  }

  cargarMas() {
  const totalToShow = this.displayedMatches.length + 3;
  this.displayedMatches = this.allMatches.slice(0, totalToShow);
}

  hayMasParaCargar(): boolean {
    return this.displayedMatches.length < this.allMatches.length;
  }

  verDetallePartido(partido: any) {
    this.router.navigate(['/matches', partido.id]);
  }
  resetPagina() {
  this.currentPage = 1;
  this.displayedMatches = this.allMatches.slice(0, this.itemsPerPage);
}
}