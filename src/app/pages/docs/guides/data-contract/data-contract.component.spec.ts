import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataContractComponent } from './data-contract.component';

describe('DataContractComponent', () => {
  let component: DataContractComponent;
  let fixture: ComponentFixture<DataContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
