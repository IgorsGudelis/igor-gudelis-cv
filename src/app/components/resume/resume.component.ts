import { Component } from '@angular/core';
import { CAREER_INFO, EDUCATION_INFO } from '@shared/fixtures';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  CAREER_INFO = CAREER_INFO;
  EDUCATION_INFO = EDUCATION_INFO;
}
