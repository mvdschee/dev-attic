import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter , mergeMap} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Post } from './post';


@Injectable({
  providedIn: 'root'
})

export class BackendService {

  private static apiEndpoint: string = environment.apiUrl;
  private static masterRef: any = null;

  constructor(private http: HttpClient) { }

  private getMasterRef(): Observable<any> {
    let ret = new Observable<any>();
    if (BackendService.masterRef != null) {
      ret = of(BackendService.masterRef.ref);

    } else {
      ret = this.http.get(BackendService.apiEndpoint);
    }

    return ret;
  }

  private requestWithMasterRef(endpoint: string): Observable<any> {
    return this.getMasterRef().pipe(mergeMap(refData => {

      let mref = '';
      if (refData.refs) {
        for (let i = 0; i < refData.refs.length; i++) {
          if (refData.refs[i].id === 'master') {
            BackendService.masterRef = refData.refs[i];
            mref = BackendService.masterRef.ref;
            break;
          }
        }
      } else {
        mref = BackendService.masterRef.ref;
      }
      return this.http.get(endpoint + '&ref=' + mref);
    }));
  }

  private getDocuments(doc: string, type: string): Observable<any> {
    const endpoint = BackendService.apiEndpoint + '/documents/search?format=json&q=';
    return this.requestWithMasterRef(endpoint + encodeURIComponent(`[[at(document.${type}, "${doc}")]]`));
  }

  getPosts(): Observable<Post[]> {
      return this.getDocuments('post', 'type').pipe(
        map(response => {
          return response.results;
        }),
        map(post => {
          const postList = [];
          post.forEach(element => {
            postList.push( {
              id: element.id,
              url: element.href,
              slug: element.slugs[0],
              title: element.data.title[0].text,
              content: element.data.content,
              image: element.data.post_image.url
            });
          });
          return postList;
        })
      );
    }

  getPost(postId): Observable<Post[]> {
    return this.getDocuments(postId , 'id').pipe(
      map(response => {
        return response.results;
      }),
      map(post => {
        const postContent = [];
        post.forEach(element => {
          postContent.push({
            content: element.data.content
          });
        });
        return postContent;
      })
    );
  }
}
