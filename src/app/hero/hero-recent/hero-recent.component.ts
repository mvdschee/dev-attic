import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts.service';


@Component({
  selector: 'app-hero-recent',
  templateUrl: './hero-recent.component.html',
  styleUrls: ['./hero-recent.component.scss']
})
export class HeroRecentComponent implements OnInit {

  public posts: object[] = null;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): any {
    this.postsService.getPostList()
      .subscribe((response) => {
        this.posts = response.slice(0, 2);
      },
      error => {
        console.log(error);
      });
  }
}
