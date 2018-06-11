import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post;

  postData: any;
  dataFetched = false;

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const postId = this.post.id;
    this.backendService.getPost(postId)
      .subscribe(response => this.postData = response[0].content,
        error => console.log('error', error),
        () => this.dataFetched = true);
  }

  onClose(): void {
    console.log('click');
    this.dataFetched = false;
  }
}
