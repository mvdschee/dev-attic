import { Component, OnInit, AfterViewInit} from '@angular/core';
import { BackendService } from '../backend.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit {

  posts: Post[];
  selectedPost: Post;
  // intersectionObserver = new IntersectionObserver(entries => {
  //   if (entries[0].intersectionRatio <= 0) {
  //     return;
  //   }

  //   console.log('Loaded new items');
  // });

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    // console.log('showshit');
  }

  getPosts(): void {
    this.backendService.getPosts()
    .subscribe(posts => this.posts = posts, error => {}, () => {
      // console.log('fire');

      // if (this.posts) {
      //   this.posts.forEach(post => {
      //     console.log(document.getElementById(post.id));
      //     this.intersectionObserver.observe(document.getElementById(post.id));
      //   });
      // }
    });
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.selectedPost.state = this.selectedPost.state === 'active' ? 'inactive' : 'active';

    if (this.selectedPost.state === 'active') {
      document.body.style.overflowY = 'hidden';
    }
  }

}
