import { Component, inject, effect } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle,IonIcon } from '@ionic/angular/standalone';
import { EspService } from '../services/esp.service';
import { addIcons } from 'ionicons';
import { flameOutline, thermometerOutline,checkmarkCircleOutline,warningOutline,waterOutline,walkOutline } from 'ionicons/icons';
import { AlertaService } from '../services/alerta-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonIcon],
})
export class HomePage {
  private espService = inject(EspService);
  private alertaService = inject(AlertaService);
  latestData = this.espService.latestData;
  alertasActivas = this.alertaService.getAlertasActivas();

  temperaturaValue = 0;
  gas = 0;
  motion = false;
  humidity = 0;

  constructor() {
    this.espService.fetchLatest();

    effect(() => {
      const data = this.latestData();
      this.temperaturaValue = data?.temperature ?? 0;
      this.gas = data?.gas_level ?? 0;
      this.motion = data?.motion_detected ?? false;
      this.humidity = data?.humidity ?? 0;
      console.log('Latest data updated:', data);
    });

    addIcons({
      thermometerOutline,flameOutline,checkmarkCircleOutline,warningOutline,waterOutline,walkOutline
    });

  }

  highTemperature(): boolean {
    return this.temperaturaValue > 40;
  }

  gasDetected(): boolean {
    return this.gas > 1500;
  }

  motionDetected(): boolean {
    return this.motion;
  }


}
