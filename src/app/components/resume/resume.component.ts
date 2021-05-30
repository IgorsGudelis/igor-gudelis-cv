import { Component } from '@angular/core';
import {
  CAREER_INFO,
  EDUCATION_INFO,
  SKILLS_INFO,
  SKILLS_PROGRESS
} from '@shared/fixtures';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  CAREER_INFO = CAREER_INFO;
  EDUCATION_INFO = EDUCATION_INFO;
  SKILLS_INFO = SKILLS_INFO;
  SKILLS_PROGRESS = SKILLS_PROGRESS;
}
