import { Component, OnInit} from '@angular/core';
import { BackendService } from '../backend.service';
import { HttpClient } from '@angular/common/http';

export interface Post {
  title: string;
  image: string;
  content: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  selectedPost: Post;
  state = 'inactive';

  constructor(
    private backendService: BackendService,
    private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
  }


  getPosts(): void {
    this.backendService.getPosts().subscribe(posts => {
      this.posts = [];
      posts.forEach(element => {
        this.http.get(element.markdownUrl, {responseType: 'text'}).subscribe(
            response => {
              this.posts.push({
                title: element.title,
                image: element.imgUrl,
                content: response
              });
            },
            error => {},
            () => {
              document.getElementById('posts').classList.remove('loading');
            }
          );
      });
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
