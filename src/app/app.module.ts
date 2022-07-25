import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MainContentComponent } from './main-content/main-content.component';
import { InputRangeComponent } from './main-content/input-range/input-range.component';
import { ColorBlockComponent } from './main-content/card-row/color-block/color-block.component';
import { CardRowComponent } from './main-content/card-row/card-row.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderComponent } from './gallery/header/header.component';
import { PalleteComponent } from './gallery/pallete/pallete.component';
import { ColorBlockListComponent } from './gallery/pallete/color-block-list/color-block-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainContentComponent,
    InputRangeComponent,
    ColorBlockComponent,
    CardRowComponent,
    GalleryComponent,
    HeaderComponent,
    PalleteComponent,
    ColorBlockListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
