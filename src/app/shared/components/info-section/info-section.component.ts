import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InfoSectionModel } from '@shared/models';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSectionComponent {
  @Input() info!: InfoSectionModel;
}
