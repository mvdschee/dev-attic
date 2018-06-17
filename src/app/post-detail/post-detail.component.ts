import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post;
  @Output() stateChange = new EventEmitter<boolean>();

  postData: any;
  changeDetected = false;

  constructor(private backendService: BackendService,
              private messageService: MessageService) {}

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    if (this.post !== null) {
      this.backendService.getPost(this.post.id)
        .subscribe(response => {this.postData = response; console.log(response);
        },
        error => this.messageService.add(error),
          () => this.changeDetected = true);
    }
  }

  onChange(): void {
    this.stateChange.emit();
  }

}
