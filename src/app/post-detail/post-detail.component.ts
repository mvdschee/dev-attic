import { Component, OnInit, Input} from '@angular/core';
import { Post } from '../post';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post;

  constructor(private postcomponent: PostsComponent) {
  }

  toggleState() {
    this.postcomponent.state = this.postcomponent.state === 'active' ? 'inactive' : 'active';

    if (this.postcomponent.state === 'inactive') {
      document.body.style.overflowY = 'initial';
    }

  }

  ngOnInit() {
  }

}
