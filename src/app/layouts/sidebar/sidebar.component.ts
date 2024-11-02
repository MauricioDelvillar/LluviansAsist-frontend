import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed: boolean = false;
  userRole: string | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Escucha el rol del usuario
    this.subscriptions.add(
      this.authService.getRole().subscribe(role => {
        this.userRole = role;
        console.log('User Role:', this.userRole); // Verifica el rol
      })
    );

    // Escucha el estado de autenticación
    this.subscriptions.add(
      this.authService.isLoggedIn().subscribe(isAuthenticated => {
        if (!isAuthenticated) {
          this.userRole = null;
          console.log("Usuario no autenticado");
        }
      })
    );
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  ngOnDestroy() {
    // Desuscribirse para evitar fugas de memoria
    this.subscriptions.unsubscribe();
  }
}
