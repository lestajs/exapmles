export default [
  {
    path: '/',
    name: 'home',
    layout: 'general'
  },
  {
    path: '/post/:id',
    name: 'post',
    layout: 'general',
    component: () => import('../pages/post/index.js')
  },
  // {
  //   path: 'profile',
  //   name: 'profile',
  //   layout: 'general',
  //   component: () => import('../pages/profile/index.js'),
  //   async beforeEnter(to, from) {
  //     if (!localStorage.getItem('auth')) return '/'
  //   }
  // }
]