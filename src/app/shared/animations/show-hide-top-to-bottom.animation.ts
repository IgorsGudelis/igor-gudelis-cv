import { animate, style, transition, trigger } from '@angular/animations';

export const showHideTopToBottomAnimation = trigger('showHideTopToBottom', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('250ms ease-out', style({ transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('250ms ease-in', style({ transform: 'translateY(-100%)' })),
  ]),
]);
