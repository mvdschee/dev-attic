import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HeroComponent } from './hero/hero.component';
import { HeroAboutComponent } from './hero/hero-about/hero-about.component';
import { HeroRecentComponent } from './hero/hero-recent/hero-recent.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeroComponent,
    HeroAboutComponent,
    HeroRecentComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
