import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinitivesComponent } from './infinitives.component';

describe('InfinitivesComponent', () => {
  let component: InfinitivesComponent;
  let fixture: ComponentFixture<InfinitivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinitivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
