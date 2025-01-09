import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (!item) return null;
    return JSON.parse(item);
  }

  hasItem(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
