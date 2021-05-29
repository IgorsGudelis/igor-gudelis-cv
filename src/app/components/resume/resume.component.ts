import { Component, OnInit } from '@angular/core';
import { CAREER_INFO } from '@shared/fixtures';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  CAREER_INFO = CAREER_INFO;

  constructor() {}

  ngOnInit(): void {}
}
