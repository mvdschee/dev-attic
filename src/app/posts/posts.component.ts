import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
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
    .subscribe(posts => this.posts = posts);
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  onClose() {
    this.selectedPost = null;
  }
}
