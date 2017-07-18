import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainersComponent } from './components/container/containers.component';
import { ContainerDetailComponent } from './components/container/container-detail.component';
import { ImagesComponent } from './components/container/images.component';
import { ProfilesComponent } from './components/container/profiles.component';

export const routing: ModuleWithProviders = RouterModule.forRoot([
    { path: '', component: ContainersComponent },
    { path: 'containers', component: ContainersComponent },
    { path: 'container/:id',  component: ContainerDetailComponent },
    { path: 'images',  component: ImagesComponent },
    { path: 'profiles',  component: ProfilesComponent },
    { path: '**',    component: ContainersComponent }
]);