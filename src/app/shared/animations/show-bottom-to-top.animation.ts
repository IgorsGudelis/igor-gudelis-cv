import { animate, style, transition, trigger } from '@angular/animations';

export const showBottomToTopAnimation = trigger('showBottomToTop', [
  transition(
    ':enter',
    [
      style({ transform: '{{translateY}}', opacity: 0 }),
      animate(
        '{{totalTime}} ease-in-out',
        style({ transform: 'translateY(0)', opacity: 1 })
      ),
    ],
    {
      params: {
        totalTime: '1.5s',
        translateY: 'translateY(100%)',
      },
    }
  ),
]);
