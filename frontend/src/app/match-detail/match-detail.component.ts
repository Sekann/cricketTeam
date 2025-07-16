import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../services/match/match.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './match-detail.component.html',
  styleUrl: './match-detail.component.scss'
})
export class MatchDetailComponent implements OnInit {
  match: any;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.matchService.getMatchById(id).then(data => {
        this.match = data;
        this.cargando = false;
      }).catch(err => {
        console.error('Error cargando partido:', err);
        this.cargando = false;
      });
    }
  }
}
