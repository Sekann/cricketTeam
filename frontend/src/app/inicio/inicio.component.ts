import { CommonModule } from '@angular/common';
import { AfterViewInit, ViewChild,Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  constructor(private router: Router) {}
  ngAfterViewInit() {
  if (this.bgVideo && this.bgVideo.nativeElement) {
    const video = this.bgVideo.nativeElement;
    video.muted = true;
    video.volume = 0;
    video.play().catch(() => {
      console.warn('Autoplay bloqueado');
    });
  }

  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active'); // 👈 vuelve a ocultar al salir
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

verDetalleNoticia(noticia: any) {
  console.log('Ver más noticia:', noticia);
}

verTodasNoticias() {
  
  this.router.navigate(['/news']);
}

verDetallePartido(partido: any) {
  console.log('Ver más partido:', partido);
}

verTodosPartidos() {
  this.router.navigate(['/matches']);
}

verDetalleJugador(jugador: any) {
  console.log('Ver más jugador:', jugador);
}

verTodosJugadores() {
this.router.navigate(['/players']);}
  
  
  noticias = [
    { titulo: 'Victoria en casa', resumen: 'El equipo se impone 3-1 en un partido vibrante.', img: 'assets/Aqib.jpg' },
    { titulo: 'Entrenamiento abierto', resumen: 'El club organiza sesión para fans y prensa.', img: 'assets/Aqib.jpg' },
    { titulo: 'Nuevo fichaje', resumen: 'Bienvenido a la familia, Saeed Ahmed.', img: 'assets/Aqib.jpg' },
  ];

  partidos = [
    { local: 'Madrid United', visitante: 'Valencia Cricket', fecha: new Date('2025-07-10') },
    { local: 'Barcelona Lions', visitante: 'Madrid United', fecha: new Date('2025-07-17') },
    { local: 'Madrid United', visitante: 'Zaragoza Smashers', fecha: new Date('2025-07-24') },
  ];

  jugadores = [
    { nombre: 'Ali Khan', posicion: 'Bateador', foto: 'assets/Aqib.jpg' },
    { nombre: 'Rashid Patel', posicion: 'Lanzador', foto: 'assets/Aqib.jpg' },
    { nombre: 'Juan López', posicion: 'Wicket Keeper', foto: 'assets/Aqib.jpg' },
  ];

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

