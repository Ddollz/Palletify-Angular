import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorBlockListComponent } from './color-block-list.component';

describe('ColorBlockListComponent', () => {
  let component: ColorBlockListComponent;
  let fixture: ComponentFixture<ColorBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorBlockListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
