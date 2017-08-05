import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinitivesListComponent } from './infinitives-list.component';

describe('InfinitivesListComponent', () => {
  let component: InfinitivesListComponent;
  let fixture: ComponentFixture<InfinitivesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinitivesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinitivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
