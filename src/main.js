import './index.html';
import './global.css';
import App from '@/App/App';

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
});

export default app;
