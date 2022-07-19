import Layout from '@/layout'

const salaryRouter = {
  path: '/salary',
  component: Layout,
  name: 'salarys',
  children: [
    {
      path: '',
      component: () => import('@/views/salary'),
      name: 'salarys',
      meta: {
        title: '工资',
        icon: 'star'
      }
    },
    {
      path: 'setting',
      component: () => import('@/views/salary/setting'),
      name: 'salarySetting',
      hidden: true,
      meta: {
        title: '设置'
      }
    },
    {
      path: 'details/:yearMonth/:id',
      component: () => import('@/views/salary/detail'),
      name: 'salaryDetails',
      hidden: true,
      meta: {
        title: '详情'
      }
    },
    {
      path: 'historicalArchiving',
      component: () => import('@/views/salary/historical'),
      name: 'salaryHistorical',
      hidden: true,
      meta: {
        title: '历史归档'
      }
    },
    {
      path: 'monthStatement',
      component: () => import('@/views/salary/month'),
      name: 'salaryMonthStatement',
      hidden: true,
      meta: {
        title: '月报表'
      }
    }
  ]
}
export default salaryRouter
