import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpClient = inject(HttpClient);
  private baseUrl : string = 'https://peticiones.online/api/users';


  constructor() {}  

  getAllWithPromises(): Promise<User[]> {
    return lastValueFrom(this.httpClient.get<{ results: User[] }>(this.baseUrl)).then(response => response.results);
  }

  getById(_id: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}/${_id}`));
  }
  
  delete(_id: string): Promise<User> {
    return lastValueFrom(this.httpClient.delete<User>(`${this.baseUrl}/${_id}`));
  }

  insert(user: User): Promise<User>{
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl, user));
  }

  update(_id: string, user: User): Promise<User> {
    return lastValueFrom(this.httpClient.put<User>(this.baseUrl + "/" +user._id, user));
  }

}


