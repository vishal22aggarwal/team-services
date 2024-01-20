import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: "root",
})
export class SessionStorageService {
    constructor(private cookieService: CookieService) {}

    setItem(key: string, value: any): void {
        this.cookieService.set(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        const item = this.cookieService.get(key);
        return item ? JSON.parse(item) : null;
    }

    removeItem(key: string): void {
        this.cookieService.delete(key);
    }
}
