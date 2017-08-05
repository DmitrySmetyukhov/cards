import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInfinitivesComponent } from './create-infinitives.component';

describe('CreateInfinitivesComponent', () => {
  let component: CreateInfinitivesComponent;
  let fixture: ComponentFixture<CreateInfinitivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInfinitivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInfinitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
