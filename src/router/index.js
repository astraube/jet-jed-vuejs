import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import JediList from '@/components/JediList'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
      },
      {
          path: '/jedis',
          name: 'JediList',
          component: JediList
      }
  ]
})
