import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class UserService{
    private _localStorageEmailKey: string = 'email';
    private _localStorageVerifiedKey: string = 'verified';

    constructor(){}

    public storeEmail(email: string){
        localStorage.setItem(this._localStorageEmailKey, email);
    }

    public loadEmail(): string | null{
        return localStorage.getItem(this._localStorageEmailKey)
    }

    public storeVerified(verified: string){
        localStorage.setItem(this._localStorageVerifiedKey, verified);
    }

    public loadVerified(): string | null{
        return localStorage.getItem(this._localStorageVerifiedKey)
    }

}