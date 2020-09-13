import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Global } from '../app.global';
import { Config } from '../app.config';

import * as MD5 from 'js-md5';

export class BaseService {
  private http: HttpClient;

  constructor(public baseUrl: string = Config.ApiUrl) {
    this.http = Global.Injector.get(HttpClient);
  }

  public get<T>(
    path: string,
    type: 'arraybuffer',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<ArrayBuffer>;
  public get<T>(
    path: string,
    type: 'blob',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<Blob>;
  public get<T>(
    path: string,
    type: 'text',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<string>;
  public get<T>(
    path: string,
    type: 'json',
    params?: any,
    cache?: boolean,
    timeout?: number
  ): Observable<T>;
  public get<T>(
    path: string,
    type: any,
    params?: any,
    cache?: any,
    timeout?: number
  ): any {
    const isCache: boolean = typeof cache !== 'undefined' && cache;

    let key = '';
    if (isCache) {
      if (typeof timeout === 'undefined') {
        timeout = Config.CacheTimeout;
      }
      key = `${this.baseUrl + path}${type}${JSON.stringify(params)}`;
      key = MD5(key);

      const data = window.localStorage.getItem(key);
      if (data) {
        try {
          let response = JSON.parse(decodeURIComponent(atob(data)));
          let cDate = new Date();
          let eDate = response.expireAt;
          if (eDate === -1 || eDate > cDate) {
            return of<T>(response.data);
          } else {
            window.localStorage.removeItem(key);
          }
        } catch (e) {}
      }
    }

    return this.http
      .get<T>(this.baseUrl + path, {
        params: this.getHttpParams(params),
        responseType: type,
      })
      .pipe(
        tap((response) => {
          if (isCache) {
            let exp = -1;
            let d = new Date();
            if (timeout !== -1) {
              exp = d.setMinutes(d.getMinutes() + timeout);
            }
            let data = {
              expireAt: exp,
              data: response,
            };
            window.localStorage.setItem(
              key,
              btoa(encodeURIComponent(JSON.stringify(data)))
            );
            // if (timeout !== -1) {
            //     setTimeout(() => {
            //         window.sessionStorage.removeItem(key);
            //     // }, timeout * 60000);
            //     }, timeout);
            // }
          }
        })
      );
  }

  public post<T>(
    path: string,
    body: T,
    type: 'arraybuffer',
    params?: any
  ): Observable<ArrayBuffer>;
  public post<T>(
    path: string,
    body: T,
    type: 'blob',
    params?: any
  ): Observable<Blob>;
  public post<T>(
    path: string,
    body: T,
    type: 'text',
    params?: any
  ): Observable<string>;
  public post<T, U>(
    path: string,
    body: T,
    type?: 'json',
    params?: any
  ): Observable<U>;
  public post<T, U>(
    path: string,
    body: T,
    type: any,
    params?: any
  ): Observable<U> {
    let h: HttpHeaders = new HttpHeaders();
    h.append('content-type', 'multipart/form-data');
    return this.http.post<U>(this.baseUrl + path, body, {
      params: this.getHttpParams(params),
      headers: h,
      responseType: type,
    });
  }

  public put<T>(
    path: string,
    body: T,
    type: 'arraybuffer',
    params?: any
  ): Observable<ArrayBuffer>;
  public put<T>(
    path: string,
    body: T,
    type: 'blob',
    params?: any
  ): Observable<Blob>;
  public put<T>(
    path: string,
    body: T,
    type: 'text',
    params?: any
  ): Observable<string>;
  public put<T, U>(
    path: string,
    body: T,
    type: 'json',
    params?: any
  ): Observable<U>;
  public put<T, U>(
    path: string,
    body: T,
    type: any,
    params?: any
  ): Observable<U> {
    return this.http.put<U>(this.baseUrl + path, body, {
      params: this.getHttpParams(params),
      responseType: type,
    });
  }

  public delete(
    path: string,
    type: 'arraybuffer',
    params?: any
  ): Observable<ArrayBuffer>;
  public delete(path: string, type: 'blob', params?: any): Observable<Blob>;
  public delete(path: string, type: 'text', params?: any): Observable<string>;
  public delete<T>(path: string, type: 'json', params?: any): Observable<T>;
  public delete<T>(path: string, type: any, params?: any): Observable<T> {
    return this.http.delete<T>(this.baseUrl + path, {
      params: this.getHttpParams(params),
      responseType: type,
    });
  }

  getHttpParams(params: any[]): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    if (params) {
      Object.keys(params).map((x) => {
        httpParams = httpParams.set(x, params[x]);
      });
    }
    return httpParams;
  }

  queryStringBuilder(path: string, data: any): string {
    if (data === null) {
      return this.baseUrl + path;
    } else {
      let searchParams = new URLSearchParams();
      Object.keys(data).forEach((x) => {
        searchParams.append(x, data[x]);
      });
      return this.baseUrl + path.concat('?', searchParams.toString());
    }
  }
}
