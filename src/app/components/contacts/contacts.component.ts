import { Component } from '@angular/core';
import { INFO_SOCIAL } from '@shared/fixtures';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  INFO_SOCIAL = INFO_SOCIAL;

  onTalk(): void {
    alert('in progress...');
  }
}
