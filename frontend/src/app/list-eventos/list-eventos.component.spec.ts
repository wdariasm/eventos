import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventosComponent } from './list-eventos.component';

describe('ListEventosComponent', () => {
  let component: ListEventosComponent;
  let fixture: ComponentFixture<ListEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
