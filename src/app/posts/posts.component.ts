import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('postState', [
      state('inactive', style({
        display: 'none'
      })),
      state('active', style({
        display: 'block'
      })),
      transition('* => active', animate('300ms ease-in', keyframes([
        style({ transform: 'scale(0)', opacity: 0, background: 'rgba(0, 0, 0, 0)', offset: 0 }),
        style({ transform: 'scale(0.5)', opacity: 0, background: 'rgba(0, 0, 0, 0)', offset: 0.5 }),
        style({ transform: 'scale(0.9)', opacity: 0.9, background: 'rgba(0, 0, 0, 0)', offset: 0.9 }),
        style({ transform: 'scale(1)', opacity: 1, background: 'rgba(150, 150, 150, 0.7)', offset: 1.0 })
      ]))),
      transition('active => inactive', animate('300ms ease-out', keyframes([
        style({ transform: 'scale(1)', background: 'rgba(150, 150, 150, 0.7)', opacity: 1, offset: 0 }),
        style({ transform: 'scale(0.9)', background: 'rgba(0, 0, 0, 0)', opacity: 0.9, offset: 0.1 }),
        style({ transform: 'scale(0.5)', background: 'rgba(0, 0, 0, 0)', opacity: 0, offset: 0.5 }),
        style({ transform: 'scale(0)', background: 'rgba(0, 0, 0, 0)', opacity: 0, offset: 1.0 })
      ])))
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
    this.selectedPost.state = this.selectedPost.state === 'active' ? 'inactive' : 'active';
  }
}
