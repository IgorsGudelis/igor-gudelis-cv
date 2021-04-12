import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@shared/shared.testing.module';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      SharedTestingModule
    ).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onToggleMenuMobile() should toggle #isMenuMobileShown', () => {
    expect(component.isMenuMobileShown).toBe(false, 'false at first');
    component.onToggleMenuMobile();
    expect(component.isMenuMobileShown).toBe(true, 'on after click');
    component.onToggleMenuMobile();
    expect(component.isMenuMobileShown).toBe(false, 'on after second click');
  });
});
