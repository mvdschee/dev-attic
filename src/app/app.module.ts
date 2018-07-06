import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BackendService } from './backend.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MarkdownModule.forRoot({ loader: HttpClientModule })
  ],
  providers: [
    BackendService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
