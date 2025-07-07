import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOpen = false;

  constructor(public translate: TranslateService) {}

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenuOnMobile() {
    if (this.isMobile()) {
      this.menuOpen = false;
    }
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }
}
