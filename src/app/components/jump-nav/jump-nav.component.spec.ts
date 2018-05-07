import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpNavComponent } from './jump-nav.component';

describe('JumpNavComponent', () => {
  let component: JumpNavComponent;
  let fixture: ComponentFixture<JumpNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JumpNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumpNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
