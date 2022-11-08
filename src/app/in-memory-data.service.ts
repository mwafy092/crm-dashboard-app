import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserInterface, CustomerInterface } from './username';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  /**
   *
   * @CreateDb for app data
   */

  createDb() {
    const usernames = [
      { id: 12, username: 'tarek', email: 'tarek@gmail.com', password: '123' },
      { id: 22, username: 'mwafy', email: 'mwafy@gmail.com', password: '123' },
    ];
    const customers = [
      {
        id: 11,
        name: 'Jack',
        age: '21',
        email: 'jack@gmail.com',
        phone: '09203910',
        role: 'frontend developer',
      },
      {
        id: 14,
        name: 'Sara',
        age: '33',
        email: 'sara@gmail.com',
        phone: '81273123',
        role: 'backend developer',
      },
    ];
    return { usernames, customers };
  }

  genId(customers: CustomerInterface[]): number {
    return customers.length > 0
      ? Math.max(...customers.map((customer) => customer.id)) + 1
      : 11;
  }
}
