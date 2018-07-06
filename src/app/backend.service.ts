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
  posts: Observable<Post[]>;

  constructor(
    private storage: AngularFireStorage,
    private http: HttpClient,
    private db: AngularFirestore
  ) {
    this.postsCollection = db.collection<Post>('posts');
    this.posts = this.postsCollection.valueChanges();
  }

  getPosts(): Observable<any> {
    return this.posts.pipe(
      map(response => {
        const postsList = [];
        response.forEach( element => {
          postsList.push({
            title: element.title,
            content: this.fetchMarkdown(element.markdownUrl),
            image: element.imgUrl
          });
        });
          console.log(postsList);
          return postsList;
    }));

  }

  fetchMarkdown(url: string) {
     return this.http.get(url, { responseType: 'text' }).subscribe(
      response => {
        console.log(response);
        return response;
      }
    );
  }
}


// getPosts(): Observable < Post[] > {
//   return this.getDocuments('post', 'type').pipe(
//     tap(heroes => this.log(`fetched posts`)),
//     catchError(this.handleError('getPosts', [])),
//     map(response => {
//       return response.results;
//     }),
//     map(post => {
//       const postList = [];

//       post.forEach(element => {
//         postList.push({
//           id: element.id,
//           url: element.data.demo.url,
//           slug: element.slugs[0],
//           title: element.data.title[0].text,
//           content: this.transformContent(element.data.content),
//           image: element.data.post_image.url,
//           state: 'inactive'
//         });
//       });

//       return postList;
//     })
//   );
// }
