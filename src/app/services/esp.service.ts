import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorData } from '../models/lectura.model';
import { ControlState } from '../models/lectura.model';
import { ApiStatus } from '../models/lectura.model';
import { interval, Observable,Subscription, switchMap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EspService {
  private baseUrl = 'https://iot-api-pu0c.onrender.com';
  private http = inject(HttpClient);

  latestData: WritableSignal<SensorData | null> = signal(null);
  allData: WritableSignal<SensorData[] | null> = signal(null);
  controls: WritableSignal<ControlState | null> = signal(null);
  status: WritableSignal<any | null> = signal(null);
  health: WritableSignal<ApiStatus | null> = signal(null);

  constructor() { 

    interval(7000)
      .pipe(
        switchMap(() => this.http.get<{ data: SensorData; controls: ControlState }>(`${this.baseUrl}/latest`))
      )
      .subscribe(response => {
        if (JSON.stringify(this.latestData()) !== JSON.stringify(response.data)) {
          this.latestData.set(response.data);
        }
        if (JSON.stringify(this.controls()) !== JSON.stringify(response.controls)) {
          this.controls.set(response.controls);
        }
      });
    
  }


   // Métodos para el manejo de la data del ESP segun la documentación de la API
  fetchLatest(): void {
    this.http.get<SensorData>(`${this.baseUrl}/latest`).subscribe(data => {
      this.latestData.set(data);
    });
    
  }

  fetchAllData(): void {
    this.http.get<SensorData[]>(`${this.baseUrl}/data`).subscribe(data => {
      this.allData.set(data);
    });
  }

  resetData(): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/data/reset`, {}).subscribe();
  }

   // Métodos para el manejo de los controles y set de valores del ESP segun la documentación de la API
  fetchControls(): void {
    this.http.get<ControlState>(`${this.baseUrl}/controls`).subscribe(data => {
      this.controls.set(data);
      console.log('Controls fetched:', data);
    });
  }

  resetControls(): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/controls/reset`, {}).subscribe();
  }

  setAlarm(state: boolean): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/control/alarm`, { value: state }).subscribe();
  }

  setLights(state: boolean): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/control/lights`, { value: state }).subscribe();
  }

  setTemperature(value: number | null): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/control/temperature`, { value }).subscribe();
    console.log('Temperature set to:', value);
  }

  setHumidity(value: number | null): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/control/humidity`, { value }).subscribe();
  }

  setGas(value: number | null): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/control/gas`, { value }).subscribe();
  }

  setMotion(value: boolean | null): void {
    this.http.post<ApiStatus>(`${this.baseUrl}/control/motion`, { value }).subscribe();
  }



   // Métodos que estan en la documentación de la API pero no se que hagan :)
  fetchStatus(): void {
    this.http.get<any>(`${this.baseUrl}/status`).subscribe(data => {
      this.status.set(data);
    });
  }

  fetchHealth(): void {
    this.http.get<ApiStatus>(`${this.baseUrl}/health`).subscribe(data => {
      this.health.set(data);
    });
  }

}
