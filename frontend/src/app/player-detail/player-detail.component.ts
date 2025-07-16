import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../services/player/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PlayerDetailComponent implements OnInit {
  player: any = null;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPlayer(id);
    }
  }

  async loadPlayer(id: string) {
    try {
      const jugadores = await this.playerService.getPlayers();
      const encontrado = jugadores.find(j => j.id == id);
      if (encontrado) {
        this.player = encontrado;

      }
    } catch (err) {
      console.error('Error al cargar jugador:', err);
    }
  }
}
