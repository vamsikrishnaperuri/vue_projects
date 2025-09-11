const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/profilePage.vue') },
        { path: '/login', component: () => import('pages/LoginPage.vue') },
        { path: '/signup', component: () => import('pages/SignupPage.vue') },
        { path: '/profile', component: () => import('pages/profilePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
