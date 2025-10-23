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

  // Signals para manejo reactivo del estado
  series = signal<Serie[]>([]);
  selectedSerie = signal<Serie | null>(null);
  averageSeasons = signal<number>(0);
  selectedRowIndex = signal<number>(-1);

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.loadSeries();
  }

  /**
   * Carga las series desde el servicio
   */
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

  /**
   * Calcula y actualiza el promedio de temporadas
   */
  private calculateAverageSeasons(series: Serie[]): void {
    const average = this.seriesService.getAverageSeasons(series);
    this.averageSeasons.set(average);
  }

  /**
   * Maneja el clic en una fila de la tabla
   */
  onRowClick(serie: Serie, index: number): void {
    this.clearSelection();
    this.selectedRowIndex.set(index);
    this.renderDetail(serie);
  }

  /**
   * Renderiza los detalles de la serie seleccionada
   */
  private renderDetail(serie: Serie): void {
    this.selectedSerie.set(serie);
  }

  /**
   * Limpia la selección actual
   */
  private clearSelection(): void {
    this.selectedRowIndex.set(-1);
  }

  /**
   * Verifica si una fila está seleccionada
   */
  isRowSelected(index: number): boolean {
    return this.selectedRowIndex() === index;
  }

  /**
   * Verifica si hay una imagen para mostrar
   */
  hasImage(): boolean {
    const serie = this.selectedSerie();
    return serie !== null && serie.image !== '';
  }

  /**
   * Verifica si hay un enlace para mostrar
   */
  hasLink(): boolean {
    const serie = this.selectedSerie();
    return serie !== null && serie.link !== '';
  }
}