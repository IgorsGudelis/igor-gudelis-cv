import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { InfoSectionItemModel } from '@shared/models';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSectionComponent implements OnInit {
  @Input() items: InfoSectionItemModel[] = [];
  @Input() title!: string;

  constructor() {}

  ngOnInit(): void {}
}
