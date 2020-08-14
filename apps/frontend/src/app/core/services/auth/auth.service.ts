import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private isLoggedInSource = new Subject();
	isLoggedIn = this.isLoggedInSource.asObservable();

	constructor() {}

	checkToken(): boolean {
		this.isLoggedInSource.next('_auth' in sessionStorage);
		return '_auth' in sessionStorage;
	}

	getToken() {
		return sessionStorage.getItem('_auth');
	}

	setToken(token: string) {
		sessionStorage.setItem('_auth', token);
		return true;
	}

	removeToken() {
		sessionStorage.clear();
		if (!this.checkToken()) {
			return true;
		}
		return false;
	}

	setUsername(username) {
		sessionStorage.setItem('username', username);
		return true;
	}

	getUsername() {
		return sessionStorage.getItem('username');
	}
}
