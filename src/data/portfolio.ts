export interface Skill {
  title: string;
  description: string;
  technologies: string[];
  learning?: boolean;
}

export interface Work {
  title: string;
  href: string;
  image: string;
}

export const skills: Skill[] = [
  {
    title: 'デザインを、Webのかたちに。',
    description: 'HTML・CSSを使ったコーディング。PCからスマートフォンまで、画面に合わせたレイアウトをつくります。',
    technologies: ['HTML', 'CSS', 'Responsive'],
  },
  {
    title: '触って伝わる、動きをつくる。',
    description: 'ホバーやスクロールに反応する動きなど、Webサイトにインタラクションを加えます。',
    technologies: ['JavaScript', 'jQuery'],
  },
  {
    title: 'コーディングから、開発へ。',
    description: 'コンポーネントや状態管理、型を意識した実装に挑戦中。このポートフォリオでも取り組んでいます。',
    technologies: ['React', 'TypeScript'],
    learning: true,
  },
];

export const works: Work[] = [
  {
    "title": "太平洋工業様ソフトテニスサイト",
    "href": "work/01.html",
    "image": "img/img_work_01.jpg"
  },
  {
    "title": "名古屋観光ホテル様ウエディングサイト",
    "href": "work/02.html",
    "image": "img/img_work_02.jpg"
  },
  {
    "title": "トヨタすまいるライフ様",
    "href": "work/03.html",
    "image": "img/img_work_03.jpg"
  },
  {
    "title": "金印様キャンペーンサイト",
    "href": "work/04.html",
    "image": "img/img_work_04.jpg"
  },
  {
    "title": "中部電力様 交流",
    "href": "work/05.html",
    "image": "img/img_work_05.jpg"
  },
  {
    "title": "ゆうゆう共済様",
    "href": "work/img/work_main_06.jpg",
    "image": "img/img_work_06.jpg"
  }
];
