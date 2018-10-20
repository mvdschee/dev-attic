import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroRecentComponent } from './hero-recent.component';

describe('HeroRecentComponent', () => {
  let component: HeroRecentComponent;
  let fixture: ComponentFixture<HeroRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
