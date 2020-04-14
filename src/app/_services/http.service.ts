import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType, HttpRequest } from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError, finalize } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) { }

  HttpGet<T>(url: string, param: any): any {
    let tokenString = "";
    let httpHeaders = new HttpHeaders();
    const securityToken: string = localStorage.getItem("token");
    if (securityToken != null) {
      tokenString = `Bearer ${securityToken}`;
      httpHeaders = new HttpHeaders()
        .set("authorization", tokenString)
        .set("Content-Type", "application/json");
    } else {
      httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    }

    return this.httpClient
      .get<T>(url, { params: param, headers: httpHeaders })
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => {

        })
      );
  }

  HttpGetNoParam<T>(url: string): any {
    let tokenString = "";
    let httpHeaders = new HttpHeaders();
    const securityToken: string = localStorage.getItem("token");
    if (securityToken != null) {
      tokenString = `Bearer ${securityToken}`;
      httpHeaders = new HttpHeaders()
        .set("authorization", tokenString)
        .set("Content-Type", "application/json");
    } else {
      httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    }

    return this.httpClient
      .get<T>(url, { headers: httpHeaders })
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => {

        })
      );
  }

  HttpGetById<T>(url: string, id: any): any {
    let tokenString = "";
    let httpHeaders = new HttpHeaders();
    const securityToken: string = localStorage.getItem("token");
    if (securityToken != null) {
      tokenString = `Bearer ${securityToken}`;
      httpHeaders = new HttpHeaders()
        .set("authorization", tokenString)
        .set("Content-Type", "application/json");
    } else {
      httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    }
    return this.httpClient
      .get<T>(url + "/" + id, { headers: httpHeaders })
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => {

        })
      );
  }

  HttpPost<T>(url: string, data: any): any {
    let tokenString = "";
    const securityToken: string = localStorage.getItem("token");
    let httpHeaders = new HttpHeaders();
    if (securityToken != null) {
      tokenString = `Bearer ${securityToken}`;
      httpHeaders = new HttpHeaders()
        .set("authorization", tokenString)
        .set("Content-Type", "application/json");        
    } else {
      httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    }
    return this.httpClient.post<T>(url, data, { headers: httpHeaders }).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => {

      })
    );
  }

  HttpPut<T>(url: string, data: any): any {
    let tokenString = "";
    const securityToken: string = localStorage.getItem("token");
    let httpHeaders = new HttpHeaders();
    if (securityToken != null) {
      tokenString = `Bearer ${securityToken}`;
      httpHeaders = new HttpHeaders()
        .set("authorization", tokenString)
        .set("Content-Type", "application/json");
    } else {
      httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    }
    return this.httpClient.put<T>(url, data, { headers: httpHeaders }).pipe(
      catchError(err => this.handleError(err)),
      finalize(() => {

      })
    );
  }

  HttpDelete<T>(url: string, data: any): any {
    let tokenString = "";
    let httpHeaders = new HttpHeaders();
    const securityToken: string = localStorage.getItem("token");
    if (securityToken != null) {
      tokenString = `Bearer ${securityToken}`;
      httpHeaders = new HttpHeaders()
        .set("authorization", tokenString)
        .set("Content-Type", "application/json");
    } else {
      httpHeaders = new HttpHeaders().set("Content-Type", "application/json");
    }

    return this.httpClient
      .delete<T>(url + "/" + data, {
        headers: httpHeaders
      })
      .pipe(
        catchError(err => this.handleError(err)),
        finalize(() => {

        })
      );
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      this.alertService.showWarning("Error", error.error.message);
    } else {
      this.alertService.showWarning("Error", `Backend returned code  ${error.status}, body was: ${error.error}`);
    }
    return throwError(error);
  }
}
