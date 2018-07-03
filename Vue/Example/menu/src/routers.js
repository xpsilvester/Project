// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const List = resolve => {
    require.ensure(['./views/list.vue'], () => {
        resolve(require('./views/list.vue'));
    });
};

const routers = [{
    path: '/list',
    name: 'list',
    component: List
}, {
    path: '*',
    component: List
}];

export default routers;