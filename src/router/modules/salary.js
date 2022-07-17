import Layout from '@/layout'

export default {
  path: '/salary',
  name: 'salarys',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/salary'),
    meta: {
      title: '工资',
      icon: 'star'
    }
  }]
}
