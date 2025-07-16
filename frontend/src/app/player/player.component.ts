import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../services/player/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
allJugadores: any[] = [];
  displayedJugadores: any[] = [];

  itemsPerPage: number = 6;
  currentPage: number = 1;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.loadJugadores();
  }

  async loadJugadores() {
    try {
      const jugadores = await this.playerService.getPlayers();
      this.allJugadores = jugadores;
      this.updateDisplay();
    } catch (error) {
      console.error('Error cargando jugadores:', error);
    }
  }

  updateDisplay() {
    const start = 0;
    const end = this.currentPage * this.itemsPerPage;
    this.displayedJugadores = this.allJugadores.slice(start, end);
  }

  cargarMas() {
    this.currentPage += 3;
    this.updateDisplay();
  }

  resetPagina() {
    this.currentPage = 1;
    this.updateDisplay();
  }

  hayMasParaCargar(): boolean {
    return this.displayedJugadores.length < this.allJugadores.length;
  }

  verDetalleJugador(jugador: any) {
    this.router.navigate(['/players', jugador.id]);
  }
}
