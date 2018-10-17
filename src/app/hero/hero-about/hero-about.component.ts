import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-about',
  templateUrl: './hero-about.component.html',
  styleUrls: ['./hero-about.component.scss']
})
export class HeroAboutComponent implements OnInit {

  title = 'Dev Attic';
  description = 'Here on Dev Attic you can find all Proof of concepts I made for the articles I wrote on Medium, Have fun trying them out!';

  constructor() { }

  ngOnInit() {
  }

}
