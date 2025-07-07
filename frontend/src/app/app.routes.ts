import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PlayerComponent } from './player/player.component';
import { MatchComponent } from './match/match.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'players',  component:PlayerComponent  },
    { path: 'matches', component:MatchComponent },
    { path: 'news', component: NewsComponent },
    { path: 'contact', component:ContactComponent },
];
