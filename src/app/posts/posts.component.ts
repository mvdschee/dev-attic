import { Component, OnInit} from '@angular/core';
import { BackendService } from '../backend.service';
import { Post } from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  selectedPost: Post;
  state = 'inactive';

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.getPosts();
  }


  getPosts(): void {
    this.backendService.getPosts()
    .subscribe(posts => this.posts = posts, error => {}, () => {
      console.log(this.posts);
    });
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.state = this.state === 'active' ? 'inactive' : 'active';

    if (this.state === 'active') {
      document.body.style.overflowY = 'hidden';
    }
  }

}
