import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import {createRouter, createWebHashHistory} from 'vue-router'
import Hello from './components/Hello.vue'
import Hello2 from './components/Hello2.vue'

const history = createWebHashHistory();
const router = createRouter({
		history,
		routes: [
				{path: '/', component: Hello},
				{path: '/xxx', component: Hello2}
		]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
