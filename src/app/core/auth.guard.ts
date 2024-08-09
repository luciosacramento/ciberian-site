import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Utils } from "./utils";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  authenticated: any;

  constructor(
    protected readonly router: Router,
    protected readonly utils:Utils
  ) {
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    console.log("AUTHGUARD!")
    if (!this.authenticated) {
      console.log("1!")


    }
    else {
      console.log("2!")
    }

    return this.authenticated;

  }


}