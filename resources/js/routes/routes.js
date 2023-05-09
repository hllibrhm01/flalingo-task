import { lazy } from 'react';


export default [
  {
    path: 'home',
    component: lazy(() => import('../components/HomePage')),
    exact: true,
  },
  {
    path: 'create-task',
    component: lazy(() => import('../components/CreateTaskPage')),
    exact: true,
  },
  {
    path: 'edit-task/:id',
    component: lazy(() => import('../components/EditTaskPage')),
    exact: true,
  },
]
