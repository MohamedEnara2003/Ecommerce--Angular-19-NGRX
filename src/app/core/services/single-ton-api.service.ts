import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SingleTonApiService {

  constructor(private httpClient : HttpClient) {}

  getData<G>(typeData : string) : Observable<G> {
  return this.httpClient.get<G>(`${environment.API_URL}${typeData}`) ;
  }
  
  getDataBy<G>(typeData : string , id : number) : Observable<G> {
  return this.httpClient.get<G>(`${environment.API_URL}${typeData}/${id}`) ;
  }

  postData<G>(typeData : string , data : G) : Observable<G> {
  return this.httpClient.post<G>(`${environment.API_URL}${typeData}`, data);
  }

  putData<G>(typeData : string  , id : number, data : G) : Observable<G> {
  return this.httpClient.put<G>(`${environment.API_URL}${typeData}/${id}`, data);
  }

  removeData(typeData : string  , id : number, ) : Observable<void> {
  return this.httpClient.delete<void>(`${environment.API_URL}${typeData}/${id}`);
  }
  
}
