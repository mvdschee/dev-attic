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
    trigger('postState', [
      state('inactive', style({
        position: 'relative',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundColor: '#3d3d3d',
        height: '15rem',
        overflow: 'hidden'
      })),
      state('active', style({
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        zIndex: 2
      })),
      transition('inactive => active', animate('700ms ease-in')),
      transition('active => inactive', animate('700ms ease-out'))
    ])
  ]
})
export class PostsComponent implements OnInit {

  posts: Post[];
  // selectedPost: Post;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.backendService.getPosts()
    .subscribe(posts => this.posts = posts);
  }


  toggleState(stateChange: string) {
    console.log(stateChange);
  }
}
