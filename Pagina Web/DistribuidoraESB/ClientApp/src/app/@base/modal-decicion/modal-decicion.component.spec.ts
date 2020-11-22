import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDecicionComponent } from './modal-decicion.component';

describe('ModalDecicionComponent', () => {
  let component: ModalDecicionComponent;
  let fixture: ComponentFixture<ModalDecicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDecicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDecicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
