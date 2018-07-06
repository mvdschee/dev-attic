import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap, filter, mergeMap} from 'rxjs/operators';
import { MessageService } from './message.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Post } from './post';


@Injectable({
  providedIn: 'root'
})

export class BackendService {

  private postsCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;

  constructor(
    private storage: AngularFireStorage,
    private http: HttpClient,
    private db: AngularFirestore
  ) {
    this.postsCollection = db.collection<Post>('posts');
    this.posts = this.postsCollection.valueChanges();
  }

  getPosts(): Observable<any> {
    return this.posts;
  }
}
