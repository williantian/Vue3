import { createWebHashHistory, createRouter } from "vue-router";
// @ts-ignore
import Home from "./views/Home.vue";
// @ts-ignore
import Doc from './views/Doc.vue';
// @ts-ignore
import SwitchDemo from "./components/SwitchDemo.vue";
// @ts-ignore
import ButtonDemo from './components/ButtonDemo.vue';
// @ts-ignore
import DialogDemo from "./components/DialogDemo.vue";
// @ts-ignore
import TabsDemo from "./components/TabsDemo.vue";
// import DocDemo from "./components/DocDemo.vue";

const history = createWebHashHistory();
export const router = createRouter({
		history: history,
		routes: [
				{ path: "/", component: Home },
				{
						path: "/doc",
						component: Doc,
						children: [
								// { path: "", component: DocDemo },
								{ path: "switch", component: SwitchDemo },
								{ path: "button", component: ButtonDemo },
								{ path: "dialog", component: DialogDemo },
								{ path: "tabs", component: TabsDemo },
						],
				},
		],
});
router.afterEach(() => {
		// console.log("路由切换了");
});
