import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // login() {
  //   if (this.authService.login(this.username, this.password)) {
  //     const role = this.authService.getRole();
  //     if (role === 'admin') {
  //       this.router.navigate(['/admin']);
  //     } else if (role === 'user') {
  //       this.router.navigate(['/user']);
  //     }
  //   } else {
  //     this.errorMessage = 'Usuario o contraseña incorrectos';
  //   }
  // }
  login() {
    if (this.authService.login(this.username, this.password)) {
      // Nos suscribimos al Observable `getRole` para obtener el rol real del usuario
      this.authService.getRole().pipe(take(1)).subscribe(role => {
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'trainer') {
          this.router.navigate(['/trainer']);
        } else if (role === 'user') {
          this.router.navigate(['/user']);
        }
      });
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
