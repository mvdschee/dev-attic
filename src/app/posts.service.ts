import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { posts } from './posts';

export interface Post {
  title: string;
  file: string;
  content: string;
  image: string;
  medium: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private static list: Observable<Post[]> = null;
  private static postUrl = environment.route;

  constructor() { }

  public getPostList(): Observable<Post[]> {
    let postList = new Observable<Post[]>();
    if (PostsService.list != null) {
      postList = PostsService.list;
    } else {
      postList = this.listBuilder(PostsService.postUrl);
    }

    return postList;
  }

  private listBuilder(url) {
   const list: Post[] = [];

    posts.forEach(element => {
      list.push({
        title: element.title,
        file: PostsService.postUrl + element.file,
        content: element.content,
        image: PostsService.postUrl + element.image,
        medium: element.medium
      });
    });
    return of(list.reverse());
  }
}
