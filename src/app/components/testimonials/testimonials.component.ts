import { Component } from '@angular/core';
import { TestimonialsSliderItemModel } from '@shared/models';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
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
      name: 'CEO, Microsoft',
      position: 'CEO, Microsoft',
      text: `Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam.
Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio.
Voluptatem dignissimos ut.`,
    },
    {
      imgSrc: '/assets/images/avatars/user-01.jpg',
      name: 'Tim Cook',
      position: 'CEO, Apple',
      text: `Molestiae incidunt consequatur quis ipsa autem nam sit enim magni. Voluptas tempore rem.
Explicabo a quaerat sint autem dolore ducimus ut consequatur neque.  Nisi dolores quaerat fuga rem nihil nostrum.
Laudantium quia consequatur molestias delectus culpa.`,
    },
  ];
}
