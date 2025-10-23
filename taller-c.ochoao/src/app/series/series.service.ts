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

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }

  getAverageSeasons(series: Serie[]): number {
    if (series.length === 0) return 0;
    const totalSeasons = series.reduce((sum, s) => sum + s.seasons, 0);
    return Math.round((totalSeasons / series.length) * 100) / 100; 
  }
}