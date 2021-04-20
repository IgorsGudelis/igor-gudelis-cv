import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(
    ':enter',
    [
      style({ transform: '{{translateY}}', opacity: 0 }),
      animate(
        '{{duration}} ease-in-out',
        style({ transform: 'translateY(0)', opacity: 1 })
      ),
    ],
    {
      params: {
        duration: '350ms',
        translateY: 'translateY(100%)',
      },
    }
  ),
  transition(
    ':leave',
    [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate(
        '{{duration}} ease-in-out',
        style({ transform: '{{translateY}}', opacity: 0 })
      ),
    ],
    {
      params: {
        duration: '350ms',
        translateY: 'translateY(100%)',
      },
    }
  ),
]);
