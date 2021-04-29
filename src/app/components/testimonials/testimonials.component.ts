import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScreenWidth } from '@shared/enums';
import { TestimonialsSliderItemModel } from '@shared/models';
import { ScreenService } from '@shared/services';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  ScreenWidth = ScreenWidth;
  sliderItems: TestimonialsSliderItemModel[] = [
    {
      imgSrc: '/assets/images/avatars/user-01.jpg',
      name: 'Tim Cook',
      position: 'CEO, Apple',
      text: `Molestiae incidunt consequatur quis ipsa autem nam sit enim magni. Voluptas tempore rem.
Explicabo a quaerat sint autem dolore ducimus ut consequatur neque.  Nisi dolores quaerat fuga rem nihil nostrum.
Laudantium quia consequatur molestias delectus culpa.`,
    },
    {
      imgSrc: '/assets/images/avatars/user-02.jpg',
      name: 'Sundar Pichai',
      position: 'CEO, Google',
      text: `Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci.
Nisi eaque consequatur. Voluptatem dignissimos ut ducimus accusantium perspiciatis.
Quasi voluptas eius distinctio. Atque eos maxime.`,
    },
    {
      imgSrc: '/assets/images/avatars/user-03.jpg',
      name: 'Satya Nadella',
      position: 'CEO, Microsoft',
      text: `Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam.
Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio.
Voluptatem dignissimos ut.`,
    },
  ];

  constructor(
    public screenService: ScreenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onScreenInnerWidthChange();
  }

  private onScreenInnerWidthChange(): void {
    this.screenService.screenInnerWidth$
      .pipe(
        tap(() => this.cdr.markForCheck()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
