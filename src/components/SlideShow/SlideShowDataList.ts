import DaDaTong_Home_Top from '@/assets/img/dadatong/home_top.png';
import DaDaTong_SEO from '@/assets/img/dadatong/SEO.png';
import DaDaTong_Announcement from '@/assets/img/dadatong/announcement.png';
import { Data } from './SlideShowTypes';

const dataList: Data[] = [
  {
    type: 'normal',
    src: DaDaTong_Home_Top,
    title: 'Refactoring the Website',
    list: [
      `1. Refactor the old DaDaTong from <code>JSP (JavaServer Page)</code> to <code>React.js</code>.`,
      `2. Choose <code>Next.js</code> as the front-end framework in order to optimize the SEO.`,
    ],
  },
  {
    type: 'normal',
    src: DaDaTong_SEO,
    title: 'Search Engine Optimization (SEO)',
    list: [
      `1. By using <code>Google Analytics (GA)</code> <code>Google Tag Manager (GTM)</code> <code>A/B Test</code> to optimize the SEO.`,
      `2. The impression is increased significantly after the new DaDaTong launched on April 2020.`,
    ],
  },
  {
    type: 'localization',
  },
  {
    type: 'normal',
    src: DaDaTong_Announcement,
    title: 'Technical Skills',
    list: [
      `1. The UI design system is based on the <code>material-ui</code>.`,
      `2. Using <code>redux-saga</code> to manage the user authentication.`,
      `3. Using <code>typeScript</code> to build a more robust web application.`,
    ],
  },
];

export default dataList;
