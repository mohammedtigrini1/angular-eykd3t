import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShapesService } from './shapes.service';
import { DrawService } from './draw.service';
import { MoveService } from './move.service';
import { InitService } from './init.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [ShapesService, DrawService, MoveService, InitService],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
