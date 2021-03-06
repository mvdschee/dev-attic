import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts: object[] = null;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): any {
    this.postsService.getPostList()
      .subscribe((response) => {
        this.posts = response.slice(2);
      },
      error => {
        console.log(error);
      });
  }

}
