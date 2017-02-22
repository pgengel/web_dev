import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosComponent } from './photos.component';
import { PhotosDetailsComponent } from './photos-details.component';

const routes: Routes = [
  { path: 'photos/:id', component: PhotosDetailsComponent },
  { path: 'photos', component: PhotosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosRoutingModule { }