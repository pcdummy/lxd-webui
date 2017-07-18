import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routes';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { ContainersComponent } from './components/container/containers.component';
import { ContainerDetailComponent } from './components/container/container-detail.component';
import { ImagesComponent } from './components/container/images.component';
import { ProfilesComponent } from './components/container/profiles.component';
import { CreateContainerModalComponent } from './components/container/create-container-modal.component';
import { HeaderComponent } from './menu.component';
import { FileSizeFormatPipe } from  './filters/fileSize';

import { AppConfig } from './services/config.service';
import { ContainerService } from './services/container.service';
import { ImagesService } from './services/images.service';
import { ProfilesService } from './services/profiles.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainersComponent,
    ContainerDetailComponent,
    ImagesComponent,
    ProfilesComponent,
    CreateContainerModalComponent,
    HeaderComponent,
    FileSizeFormatPipe
  ],
  entryComponents: [
    CreateContainerModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ToastyModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    CollapseModule.forRoot(),
    MomentModule
  ],
  providers: [
    AppConfig,
    ContainerService,
    ImagesService,
    ProfilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
