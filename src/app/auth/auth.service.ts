import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest } from './auth-request.model';
import { TokenService } from './token.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _loginEndpoint: string =  "http://localhost:8080/api/auth/login"
  private _registerEndpoint: string =  "http://localhost:8080/api/auth/register"
  // private _loginEndpoint: string = 'http://s1149514.student.inf-hsleiden.nl:29514/api/auth/login';
  // private _registerEndpoint: string = 'http://s1149514.student.inf-hsleiden.nl:29514/api/auth/register';
  
  public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private tokenService: TokenService, private userService: UserService) {
    if(this.tokenService.isValid() && this.userService.loadVerified() != null){
      this.$userIsLoggedIn.next(true);
    }
  }


  public login(authRequest: AuthRequest): Observable<AuthResponse>{
    return this.http
      .post<AuthResponse>(this._loginEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.tokenService.storeToken(authResponse.token);
          this.$userIsLoggedIn.next(true);
          this.userService.storeEmail(authRequest.email);
          this.userService.storeVerified("Is verified");
        })
      );
  }

  public register(authRequest: AuthRequest): Observable<AuthResponse>{ 
    return this.http
    .post<AuthResponse>(this._registerEndpoint, authRequest)
    .pipe(
      tap((authResponse: AuthResponse) => {
        this.tokenService.storeToken(authResponse.token);
        this.userService.storeEmail(authRequest.email);
      })
    );
  }

  public logOut(): void{
    localStorage.clear();
    this.$userIsLoggedIn.next(false);
  }
}
