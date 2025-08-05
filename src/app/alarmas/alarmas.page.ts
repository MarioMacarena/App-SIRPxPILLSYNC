import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspService } from '../services/esp.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertConfigModalComponent } from '../alert-config-modal/alert-config-modal.component';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';




@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.page.html',
  styleUrls: ['./alarmas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class AlarmasPage implements OnInit {
  
  private espService = inject(EspService);
  fb = inject(FormBuilder);
  controlForm: FormGroup;
  modalController = inject(ModalController);
  alarmOn = false;

  constructor() { 
    this.espService.fetchLatest();

    effect(() => {
    const data = this.espService.latestData();
    if (data?.alarm != null) { 
    this.alarmOn = data.alarm;
    console.log('Estado inicial de la alarma:', this.alarmOn);
    }
});

    this.controlForm = this.fb.group({
      gas: [null],
      humidity: [null],        
      temperature: [null], 
      motion: [null],    

    });

    addIcons({
          settingsOutline
        });

  }

  ngOnInit() {
  }

  async openAlertConfigModal() {
  const modal = await this.modalController.create({
    component: AlertConfigModalComponent,
  });
  await modal.present();

  const { data } = await modal.onDidDismiss();
  console.log('Modal cerrado, datos:', data);
}

setTemperature() {
    const value = this.controlForm.get('temperature')?.value;
    if (value !== null && value !== undefined) {
      this.espService.setTemperature(value);
    }
  }

  setHumidity() {
    const value = this.controlForm.get('humidity')?.value;
    if (value !== null && value !== undefined) {
      this.espService.setHumidity(value);
    }
  }

  setGas() {
    const value = this.controlForm.get('gas')?.value;
    if (value !== null && value !== undefined) {
      this.espService.setGas(value);
    }
  }

  setMotion() {
    const value = this.controlForm.get('motion')?.value;
    this.espService.setMotion(value);
  }

 setAlarm(state: boolean) {
  this.espService.setAlarm(state);
  console.log(`Alarma ${state ? 'encendida' : 'apagada'}`);
}

toggleAlarm() {
  this.alarmOn = !this.alarmOn;
  this.setAlarm(this.alarmOn);
}
 
resetControls() {
    this.espService.resetControls();
    console.log('Controles reiniciados');
}

resetForm() {
  this.controlForm.reset();  
  this.resetControls();      
}


}
