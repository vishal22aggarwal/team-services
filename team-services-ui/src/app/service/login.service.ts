import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, map } from "rxjs";
import { ApiEndpoints } from "../core/config/api-endpoints";
import { User } from "../core/interfaces";
import { SessionStorageService } from "../core/services";
import { AppConstants } from "../core/config/app-constants";
@Injectable({
    providedIn: "root",
})
export class LoginService {
    private loggedinUser: User | undefined;

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService
    ) {
        this.loggedinUser = {
            ...sessionStorageService.getItem(AppConstants.USER_INFO),
        };
        if (!this.loggedinUser?.email) {
            this.loggedinUser = undefined;
        }
        console.log("this.loggedinUser", { ...this.loggedinUser });
    }

    login(email: string, password: string): Observable<User | undefined> {
        return this.http.get<User[]>(ApiEndpoints.USERS).pipe(
            map((users: User[]) => {
                this.loggedinUser = users.find(
                    (u) => u.email === email && u.password === password
                );
                return this.loggedinUser;
            })
        );
    }

    public getLoggedInUser() {
        return this.loggedinUser;
        console.log(this.loggedinUser);
    }
    public getUserRole() {
        if (this.loggedinUser) {
            return this.loggedinUser.role;
        } else {
            return "";
        }
    }
    public getUserId() {
        if (this.loggedinUser) {
            return this.loggedinUser.EmpId;
        } else {
            return "";
        }
    }
    public getUserName() {
        if (this.loggedinUser) {
            return this.loggedinUser.Name;
        } else {
            return "";
        }
    }
    logout(): void {
        this.loggedinUser = undefined;
        this.sessionStorageService.removeItem(AppConstants.USER_INFO);
    }

    addUser(user: any) {
        return this.http.post(ApiEndpoints.USERS, user);
    }
}
