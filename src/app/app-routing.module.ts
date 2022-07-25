import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  {path: 'palletify', component:MainContentComponent},
  {path: 'palletify/gallery', component:GalleryComponent},
  {path: '', redirectTo: '/palletify', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
