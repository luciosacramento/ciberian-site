import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaPage } from './interna.page';

describe('InternaPage', () => {
  let component: InternaPage;
  let fixture: ComponentFixture<InternaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternaPage]
    });
    fixture = TestBed.createComponent(InternaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
