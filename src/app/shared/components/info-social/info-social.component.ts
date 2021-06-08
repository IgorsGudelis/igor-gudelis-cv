import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoSocial } from '@shared/models';

@Component({
  selector: 'app-info-social',
  templateUrl: './info-social.component.html',
  styleUrls: ['./info-social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSocialComponent {
  @Input() items: InfoSocial[] = [];
}
