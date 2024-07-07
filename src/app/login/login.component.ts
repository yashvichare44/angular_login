import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule , provideHttpClient, withFetch } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoginView: boolean = true;

  userRegisterObj: any = {
    userName: '',
    password: '',
  };

  userLogin: any = {
    id: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    this.http.post<any>('http://localhost:8080/users/add', this.userRegisterObj)
      .subscribe({
        next: () => {
          alert("Registration Success");

        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert("Registration failed");
        }
      });
  }
  onLogin() {
    this.http.post('http://localhost:8080/users/login', this.userLogin, { responseType: 'text' })
      .subscribe({
        next: (response: any) => {

          const token = response;

          localStorage.setItem('jwtToken', token);

          this.router.navigate(['/dashboard']);

          alert("Login Success");
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert("User name or password is wrong");
        }
      });
  }
  }
  


