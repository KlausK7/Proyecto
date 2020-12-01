import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDatailComponent } from './category-datail.component';

describe('CategoryDatailComponent', () => {
  let component: CategoryDatailComponent;
  let fixture: ComponentFixture<CategoryDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDatailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
