import { InfoProgressModel, InfoSectionModel } from '@shared/models';

export const CAREER_INFO: InfoSectionModel = {
  title: 'Career',
  items: [
    {
      label: 'March 2020 - Present',
      mainLabel: 'Front-End Developer',
      techStack: 'HTML/SCSS, Angular 13, Angular Material, RxJS, NGXS',
      text: `<a href="https://stratuseeg.com/" target="_blank">Stratus EEG</a> is dedicated and secure EEG cloud services offering functional “on demand” review software that connects
            patients with expert reading physicians. EEG cloud service is used worldwide by physicians in hospitals, private practice, intensive care, neonatal care,
            emergency care, and to advance epilepsy and neuro research.`,
      title: 'Freelance',
    },
    {
      label: 'September 2018 - March 2020',
      mainLabel: 'Front-End Developer',
      techStack: 'HTML/SCSS, Angular 8, Angular Material, RxJS, NGXS, NX, Docker',
      text: `The platform for personnel/news management of the company.
      The mono repository consisted of two separate applications - the administrative and client parts,
      and the main idea was to provide the most convenient and functional interface for site users, both employees and administrators`,
      title: 'Cactus Soft',
    },
    {
      label: 'September 2018 - September 2019',
      mainLabel: 'Front-End Developer',
      techStack: 'HTML/SCSS, Angular 2+, Angular Universal(SSR), RxJS, NgRx',
      text: `<a href="https://car4you.by" target="_blank">Car4you</a> is a new project of the Austrian banking group Raiffeisen Group.
      The purpose of the project is to provide information on the list of cars and their characteristics for leasing.`,
      title: 'VRP Consalting',
    },
    {
      label: 'November 2016 - September 2018',
      mainLabel: 'Front-End Developer',
      techStack: 'HTML/SCSS, Angular 2+, RxJS',
      text: `Сompleted internship with subsequent placement in the company.
      Developed the official website of the company`,
      title: 'Ais Novations',
    },
  ],
};

export const EDUCATION_INFO: InfoSectionModel = {
  title: 'Education',
  items: [
    {
      label: 'April 2020',
      mainLabel: 'Front-End Web Developer',
      text: `
      A program offered by W3Cx, in collaboration with edX.<br>
      <a href="https://credentials.edx.org/credentials/5680d2019edc4423bf32c0089bd222e3" target="_blank">Certificate link</a>`,
      title: 'W3Cx courses',
    },
  ],
};

export const SKILLS_INFO: InfoSectionModel = {
  title: 'Skills',
  items: [
    {
      label: '',
      mainLabel: '',
      text: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Inventore vero quidem nobis maxime dolorem aliquam quisquam eum ipsum amet. Vitae aut atque fuga dolorem.
          Vel voluptatibus fugiat nam. Impedit aperiam nesciunt facilis! Porro architecto dicta inventore tempora ratione quia odio.`,
      title: '',
    },
  ],
};

export const SKILLS_PROGRESS: InfoProgressModel[] = [
  {
    title: 'Html',
    progress: 80,
  },
  {
    title: 'CSS/SCSS',
    progress: 80,
  },
  {
    title: 'Javascript',
    progress: 70,
  },
  {
    title: 'Typescript',
    progress: 60,
  },
  {
    title: 'Angular',
    progress: 70,
  },
  {
    title: 'Angular Material',
    progress: 50,
  },
  {
    title: 'RxJS',
    progress: 60,
  },
  {
    title: 'Ngrx/Ngxs',
    progress: 55,
  },
];
