import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../post';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  selectedPost: Post;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.backendService.getPosts()
    .subscribe(posts => this.posts = posts, error => console.log('error'), () => console.log('succes'));
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }
}
