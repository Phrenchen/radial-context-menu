import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Memo } from './model/Memo';
import { GenericMemo } from './model/GenericMemo';

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  private url = 'http://localhost:4000/memo';   // api target

  constructor(private http: HttpClient) { }


  // MEMOS
  public addMemo(title: string, description: string, memoHashtags: string): Observable<any> {
    const memo = new Memo<GenericMemo>(
      title,
      description,
      memoHashtags
    );
    // console.log(memo);

    return this.http.post(`${this.url}/addMemo`, memo);
  }

  public getMemos(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  public deleteMemo(id: string): Observable<any> {
    return this.http.get(`${this.url}/deleteMemo/${id}`);
  }

  // EVOS
  public addEvo(memoId: string, title: string, description: string, memoHashtags: string): Observable<any> {
    const evo = new Memo (
      title,
      description,
      memoHashtags
      );
    // console.log(memo);

    return this.http.post(`${this.url}/addEvo`, evo);
  }
}
