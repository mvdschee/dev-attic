import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor() { }

  public getPostList(): Observable<Post[]> {
    let postList = new Observable<Post[]>();
    if (PostsService.list != null) {
      postList = PostsService.list;
    } else {
      postList = this.listBuilder();
    }

    return postList;
  }

  private listBuilder() {
   const list: Post[] = [];

    posts.forEach(element => {
      list.push({
        title: element.title,
        file: element.file,
        content: element.content,
        image: element.image,
        medium: element.medium
      });
    });
    return of(list.reverse());
  }
}
