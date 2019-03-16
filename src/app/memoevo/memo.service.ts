import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private url = 'http://localhost:4000/memo';   // api target

  constructor(private http: HttpClient) { }


  public addMemo(title: string, description: string, memoHashtags: string): Observable<any> {
    const memo = {
      title: title,
      description: description,
      memoHashtags: memoHashtags
    };
    // console.log(memo);

    return this.http.post(`${this.url}/add`, memo);
  }

  public getMemos(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  public deleteMemo(id: string): Observable<any> {
    return this.http.get(`${this.url}/delete/${id}`);
  }
}
