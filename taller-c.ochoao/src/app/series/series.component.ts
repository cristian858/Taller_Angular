import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Serie } from './serie.model';
import { SeriesService } from './series.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})

export class SeriesComponent implements OnInit {

  series = signal<Serie[]>([]);
  selectedSerie = signal<Serie | null>(null);
  averageSeasons = signal<number>(0);
  selectedRowIndex = signal<number>(-1);

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.loadSeries();
  }

  private loadSeries(): void {
    this.seriesService.getSeries().subscribe({
      next: (data: Serie[]) => {
        console.log('Desplegando series');
        this.series.set(data);
        this.calculateAverageSeasons(data);
      },
      error: (error) => {
        console.error('Error cargando series:', error);
      }
    });
  }

  private calculateAverageSeasons(series: Serie[]): void {
    const average = this.seriesService.getAverageSeasons(series);
    this.averageSeasons.set(average);
  }

  onRowClick(serie: Serie, index: number): void {
    this.clearSelection();
    this.selectedRowIndex.set(index);
    this.renderDetail(serie);
  }

  private renderDetail(serie: Serie): void {
    this.selectedSerie.set(serie);
  }

  private clearSelection(): void {
    this.selectedRowIndex.set(-1);
  }

  isRowSelected(index: number): boolean {
    return this.selectedRowIndex() === index;
  }

  hasImage(): boolean {
    const serie = this.selectedSerie();
    return serie !== null && serie.poster !== '';
  }

  hasLink(): boolean {
    const serie = this.selectedSerie();
    return serie !== null && serie.webpage !== '';
  }
}