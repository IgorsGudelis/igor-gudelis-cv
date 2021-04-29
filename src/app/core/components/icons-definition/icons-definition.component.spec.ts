import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsDefinitionComponent } from './icons-definition.component';

describe('IconsDefinitionComponent', () => {
  let component: IconsDefinitionComponent;
  let fixture: ComponentFixture<IconsDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
