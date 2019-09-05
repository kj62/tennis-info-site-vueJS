import Vue from 'vue'
import Router from 'vue-router'
import Tournaments from '@/components/tournaments/Tournaments'
import Players from '@/components/players/Players'
import Technique from '@/components/technique/Technique'
import NavigationMenu from '@/components/navigationMenu/NavigationMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/tournaments',
      name: 'Tournaments',
      component: Tournaments
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/technique',
      name: 'Technique',
      component: Technique
    },
    {
      path: '/navigationMenu',
      name: 'NavigationMenu',
      component: NavigationMenu
    }
  ]
})
