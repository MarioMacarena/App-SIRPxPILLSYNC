import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EspService } from '../services/esp.service';
import { addIcons } from 'ionicons';
import { bulbOutline,bulb } from 'ionicons/icons';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class LucesPage implements OnInit {

  private espService = inject(EspService);

   ledOn: boolean = false;


  constructor() { 
    this.espService.fetchLatest();

    effect(() => {
      const data = this.espService.latestData();
      this.ledOn = data?.lights ?? false;
      console.log('Latest data updated:', data);
    });

    addIcons({
      bulbOutline,bulb
    });
    
  }

  ngOnInit() {
  }

    toggleLed() {
    this.ledOn = !this.ledOn;
    this.espService.setLights(this.ledOn);
    console.log('LED toggled:', this.ledOn);
  }


}
