import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingpagePageRoutingModule } from './onboardingpage-routing.module';

import { OnboardingpagePage } from './onboardingpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingpagePageRoutingModule
  ],
  declarations: [OnboardingpagePage]
})
export class OnboardingpagePageModule {}
