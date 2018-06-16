import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter, mergeMap} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Post } from './post';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class BackendService {

  private static apiEndpoint: string = environment.apiUrl;
  private static masterRef: any = null;

  constructor(private http: HttpClient, private messageService: MessageService) { }

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('BackendService: ' + message);
  }

  getPosts(): Observable<Post[]> {
      return this.getDocuments('post', 'type').pipe(
        tap(heroes => this.log(`fetched posts`)),
        catchError(this.handleError('getPosts', [])),
        map(response => {
          return response.results;
        }),
        map(post => {
          const postList: Post[] = [];
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
      tap(heroes => this.log(`fetched post`)),
      catchError(this.handleError('getPost', [])),
      map(response => {
        return response.results;
      }),
      map(post => {
        const postContent = [];
        post.forEach(element => {
          const content = element.data.content;
          content.forEach(text => {
            postContent.push({
              element: this.transformContent(text)
            });
          });
        });
        return postContent;
      })
    );
  }

  transformContent(content: any) {
    const type = content.type;

    switch (type) {
      case 'paragraph': return { tag: 'p', content: content.text};
      // case content.preformatted: return serializePreFormatted(element);
      // case content.strong: return serializeStandardTag('strong', element, children);
      // case content.em: return serializeStandardTag('em', element, children);
      // case content.listItem: return serializeStandardTag('li', element, children);
      // case content.oListItem: return serializeStandardTag('li', element, children);
      // case content.list: return serializeStandardTag('ul', element, children);
      // case content.oList: return serializeStandardTag('ol', element, children);
      case 'image': return {tag: 'img', content: content.url};
      // case content.embed: return serializeEmbed(element);
      // case content.hyperlink: return serializeHyperlink(linkResolver, element, children);
      // case content.label: return serializeLabel(element, children);
      // case content.span: return serializeSpan(content);
      default: return '';
    }

  }
}
