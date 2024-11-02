import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {
    const savedAuthState = this.getFromLocalStorage('isAuthenticated');
    const savedRole = this.getFromLocalStorage('userRole');

    if (savedAuthState === 'true' && savedRole) {
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next(savedRole);
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123456') {
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next('admin');
      this.saveToLocalStorage('isAuthenticated', 'true');
      this.saveToLocalStorage('userRole', 'admin');
      return true;
    } else if (username === 'trainer' && password === '123456') {
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next('trainer');
      this.saveToLocalStorage('isAuthenticated', 'true');
      this.saveToLocalStorage('userRole', 'trainer');
      return true;
    } else if (username === 'user' && password === '123456') {
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next('user');
      this.saveToLocalStorage('isAuthenticated', 'true');
      this.saveToLocalStorage('userRole', 'user');
      return true;
    }
    return false;
  }

  // Obtener el rol como un observable
  getRole() {
    return this.userRoleSubject.asObservable();
  }

  // Verificar si el usuario está autenticado como observable
  isLoggedIn() {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Cerrar sesión
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
    this.removeFromLocalStorage('isAuthenticated');
    this.removeFromLocalStorage('userRole');
    this.router.navigate(['/login']);
  }

  private saveToLocalStorage(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  private getFromLocalStorage(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private removeFromLocalStorage(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }
}

