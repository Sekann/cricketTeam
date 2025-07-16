import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PlayerComponent } from './player/player.component';
import { MatchComponent } from './match/match.component';
import { ContactComponent } from './contact/contact.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'players',  component:PlayerComponent  },
    { path: 'players/:id', component: PlayerDetailComponent },
    { path: 'matches', component:MatchComponent },
    { path: 'matches/:id', component: MatchDetailComponent },
    { path: 'news/:id', component: NewsDetailComponent },
    { path: 'contact', component:ContactComponent },
];
