import { Component, inject, OnInit } from '@angular/core';
import { AlertaService } from '../services/alerta-service.service';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-config-modal',
  templateUrl: './alert-config-modal.component.html',
  styleUrls: ['./alert-config-modal.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AlertConfigModalComponent  implements OnInit {
  private alertaService = inject(AlertaService);
  alertasActivas = this.alertaService.getAlertasActivas();
  modalController = inject(ModalController);

  constructor() { }

  ngOnInit() {}

   cambiarEstado(tipo: string, evento: CustomEvent) {
    this.alertaService.toggleAlerta(tipo as any, evento.detail.checked);
  }

  closeModal() {
    this.modalController.dismiss(this.alertasActivas());
  }
}
