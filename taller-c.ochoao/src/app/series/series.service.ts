import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Serie } from './serie.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private apiUrl = 'https://gist.githubusercontent.com/josejbocanegra/8490b48961a69dcd2bfd8a360256d0db/raw/34ff30dbc32392a69eb0e08453a3fc975a3890f0/series.json';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las series desde la API
   * @returns Observable<Serie[]>
   */
  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }

  /**
   * Calcula el promedio de temporadas de todas las series
   * @param series Array de series
   * @returns Promedio de temporadas
   */
  getAverageSeasons(series: Serie[]): number {
    if (series.length === 0) return 0;
    const totalSeasons = series.reduce((sum, s) => sum + s.seasons, 0);
    return Math.round((totalSeasons / series.length) * 100) / 100; // Redondea a 2 decimales
  }

  /**
   * Obtiene una serie por ID
   * @param id ID de la serie
   * @returns Observable<Serie | undefined>
   */
  getSerieById(id: number): Observable<Serie | undefined> {
    return new Observable<Serie | undefined>(observer => {
      this.getSeries().subscribe({
        next: (series) => {
          const serie = series.find(s => s.id === id);
          observer.next(serie);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }
}