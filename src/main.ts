import { createApp } from 'vue';
import App from './App.vue';
import '/src/scss/vars.scss';
import '/src/css/bootstrap-grid.css';

// import router from './router/router';
// import store from './store';

const app = createApp(App);
// app.use(router);
// app.use(store);

app.mount('#app');
