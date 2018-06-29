import { Component, OnInit, Input} from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post;

  constructor() {}

  toggleState() {
    this.post.state = this.post.state === 'active' ? 'inactive' : 'active';

    if (this.post.state === 'inactive') {
      document.body.style.overflowY = 'initial';
    }

  }

  ngOnInit() {
  }

}
