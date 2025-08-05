import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertaService {

  private alertasActivas = signal({
    temperatura: true,
    humedad: true,
    gas: true,
    movimiento: true,
  });

  getAlertasActivas() {
    return this.alertasActivas.asReadonly();
  }

  toggleAlerta(tipo: keyof ReturnType<AlertaService['getAlertasActivas']>, activa: boolean) {
    this.alertasActivas.update((estado) => ({
      ...estado,
      [tipo]: activa,
    }));
  }
}
