import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  _id: string;
  constructor() {
    this._id = uuidV4() as string;
  }

  get id(): string {
    return this._id;
  }

}
