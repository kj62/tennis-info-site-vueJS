// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Tournaments from './components/tournaments/Tournaments'
import Players from './components/players/Players'
import Technique from './components/technique/Technique'
import NavigationMenu from './components/navigationMenu/NavigationMenu'
import router from './router'
import LocalStore from './localStorage'

Vue.config.productionTip = false
/* eslint-disable no-new */
// eslint-disable-next-line
/* eslint-disable */
/* eslint no-undef: 0 */

new Vue({
  el: '#app',
  router,
  components: { 
    App,
    Tournaments,
    Players,
    NavigationMenu,
    Technique
  },
  template: '<App/>',
  LocalStore
})
