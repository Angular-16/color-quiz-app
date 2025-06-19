import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    /** Получение данных */
    getItem<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    /** Сохранение данных */
    setItem(key: string, value: unknown): void {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
    }

    /** Удаление данных */
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}
