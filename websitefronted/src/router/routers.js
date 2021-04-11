import LayOut from '../components/LayOut'

export const loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('../components/Login.vue'),
  meta: {title:"login"}
}

export const appRouters = [
  {
    path: '/',
    name: 'LayOut',
    component: LayOut,
    redirect: '/websites',
    children: [
      {path: 'websites', name: 'websites', component: () => import('../components/Websites'),meta:{title:"websiteguide"}},
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: LayOut,
    redirect: '/admin/group' ,
    children: [
      {path: 'group', name: 'group-manage', component: () => import('../components/Admin/Group/index'),meta:{title:"group"}},
      {path: 'website', name: 'website-manage', component: () => import('../components/Admin/Website/index'),meta:{title:"website"}},
      {path: 'user', name: 'user-manage', component: () => import('../components/System/User/index'),meta:{title:"user"}},
      {path: 'center', name: 'center', component: () => import('../components/Center'),meta:{title:"center"}},
    ]
  },
]

export const routers=[
  loginRouter,
  ...appRouters
]
