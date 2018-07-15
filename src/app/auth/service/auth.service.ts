import {Injectable} from '@angular/core';
import {UserModel} from '../model/user.model';
import {AuthData} from '../model/auth-data.model';
import {Observable, Subject} from 'rxjs';
import {tag} from 'rxjs-spy/operators';
import {Router} from '@angular/router';
import {filter, shareReplay, skip, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  private isAuth$: Subject<UserModel | null> = new Subject();
  auth$: Observable<UserModel | null> = this.isAuth$.asObservable()
    .pipe(
      tag('auth'),
      shareReplay(1)
    );

  constructor(private router: Router) {
    this.auth$.pipe(filter(userModel => userModel !== null), tap(() => this.router.navigate(['/training']))).subscribe();
    this.auth$.pipe(filter(userModel => userModel === null), skip(1), tap(() => this.router.navigate(['/login']))).subscribe();
    this.isAuth$.next(null);
  }

  registerUser(authData: AuthData) {
    this.isAuth$.next({
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    });
  }

  logIn(authData: AuthData) {
    this.isAuth$.next({
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    });
  }

  logOut() {
    this.isAuth$.next(null);
  }
}
