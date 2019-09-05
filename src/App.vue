<template>
  <div id="app-container" ref="app-container">
    <div id="app">
      <NavigationMenu v-on:changeCardSelection='updateCardSelection($event)' v-bind:marginTopDecreased='isMarginDecreased'></NavigationMenu>
      <transition v-bind:name="transitionHomeElems">
        <div v-show='cardSelectionValue=="home"' v-bind:class='{"home-box": true}'>
          <p v-show='cardSelectionValue=="home"' v-bind:class='{"welcome-text": true, "small-margin-top": isMarginDecreased}'>Welcome to the ATP Tennis World!</p>
          <table class="ranking-list">
            <th class="ranking-row-title">ATP Ranking {{ fetchedRankingArray.year }}</th>
            <tr class="ranking-row-header">
              <td  v-for="header in headersRankingArray">
                {{ header }}
              </td>
            </tr>
            <tr v-show='cardSelectionValue=="home"' v-bind:class='{"ranking-list-elem": true, "small-margin-top": isMarginDecreased}'
              v-for="(position, index) in fetchedRankingArray.ranking">
              <td class="ranking-row-item">{{ index+1 }}.</td>
              <td class="ranking-row-item">{{ position.player }}</td>
              <td class="ranking-row-item">{{ position.country }}</td>
              <td class="ranking-row-item">{{ position.points }}</td>
              <td class="ranking-row-item">{{ position.age }}</td>
            </tr>
          </table>
        </div>
      </transition>
      <div v-show='cardSelectionValue!="home"'>
        <transition v-bind:name="transitionName" mode="out-in">
            <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

import NavigationMenu from './components/navigationMenu/NavigationMenu'
import Tournaments from './components/tournaments/Tournaments'
import Players from './components/players/Players'
import Technique from './components/technique/Technique'
import LocalStore from './localStorage'
import axios from 'axios'

const dataUrl = '/static/atp-ranking.json';
const storeKey1 = 'vue-store-key-1';

export default {
  name: 'App',
  components: {
    'NavigationMenu': NavigationMenu,
    'Tournaments': Tournaments,
    'Players': Players,
    'Technique': Technique
  },
  data () {
    return {
      appContainerSize: {
        width: 0,
        height: 0,
        marginTop: 0
      },
      cardSelectionValue: LocalStore.getStore(storeKey1),
      testCompleted: false,
      transitionName: 'component-fade',
      transitionHomeElems: 'home-elems',
      fetchedRankingArray: [],
      headersRankingArray: ["Rank", "Player", "Country", "ATP Points", "Age"]
    }
  },
  beforeMount() {
    cardSelectionValue: 'home'
  },
  methods: {
    getAppContainerSize: function($event) {
      this.appContainerSize.width = this.$refs['app-container'].clientWidth;
      this.appContainerSize.height = this.$refs['app-container'].clientHeight;
      
      if(this.appContainerSize.width <= 860 || this.appContainerSize.height <= 750) {
        this.appContainerSize.marginTop = 10;
      }
      else{
        this.appContainerSize.marginTop = 0;
      }
    },
    updateCardSelection: function(updatedCardSelection) {
      this.cardSelectionValue = updatedCardSelection;
      if(this.cardSelectionValue == "" || this.cardSelectionValue == undefined || this.cardSelectionValue == null){
        this.cardSelectionValue = "home";
      }
      LocalStore.setStore(storeKey1, this.cardSelectionValue);
    },
    getRanking: function(url) {
      axios.get(url)
          .then(
              (response) => {
                  this.fetchedRankingArray = response.data;
                  console.log(this.fetchedRankingArray);
              }
          )
          .catch(
              (error) => {
                  console.log(error);
              }
          )
    },
  },
  created() {
    this.getRanking(dataUrl);
  },
  computed: {
    isMarginDecreased: function() {
      if(this.appContainerSize.marginTop == 10) {
        return true;
      }
      return false;
    }
  },
  mounted () {
    this.$nextTick(() => {
      cardSelectionValue: 'home'
      window.addEventListener('resize', this.getAppContainerSize);
      //Init
      this.getAppContainerSize();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getAppContainerSize);
  }
}
</script>

<style lang='scss' scoped>
  @import 'app.scss';
</style>
