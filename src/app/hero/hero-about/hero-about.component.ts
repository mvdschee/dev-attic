import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-about',
  templateUrl: './hero-about.component.html',
  styleUrls: ['./hero-about.component.scss']
})
export class HeroAboutComponent implements OnInit {

  public title = 'Dev Attic';

  constructor() { }

  ngOnInit() {
  }

}
