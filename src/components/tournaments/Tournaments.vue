<template>
  <div v-bind:class="{'tournaments': true, 'font-decreased': isAppBoxWidthSmall}" ref="tournaments">
    <div class="tournaments-box">
      <div class="tour-1">
        <div v-if="isLoading" class="lds-dual-ring"></div>
        <a v-if="!isLoading" v-bind:href="setLinkImgOne(currentTournamentIndex)" target='_blank'>
          <div v-bind:class="setImgOneClass(currentTournamentIndex)">
          </div>
        </a>
        <p v-if="fetchedTournamentArray.tournaments" class="tour-1-para tour-name">{{ fetchedTournamentArray.tournaments[currentTournamentIndex].name }}</p>
        <p v-if="fetchedTournamentArray.tournaments" class="tour-1-para">Date: {{ fetchedTournamentArray.tournaments[currentTournamentIndex].date }}</p>
        <p v-if="fetchedTournamentArray.tournaments" class="tour-1-para">Current champion: {{ fetchedTournamentArray.tournaments[currentTournamentIndex].currentChampion }}</p>
      </div>
      <div class="tour-2">
        <div v-if="isLoading" class="lds-dual-ring"></div>
        <a v-if="!isLoading" v-bind:href="setLinkImgTwo(currentTournamentIndex + 1)" target='_blank'>
          <div v-bind:class="setImgTwoClass(currentTournamentIndex)">
          </div>
        </a>
        <p v-if="fetchedTournamentArray.tournaments" class="tour-2-para tour-name">{{ fetchedTournamentArray.tournaments[currentTournamentIndex + 1].name }}</p>
        <p v-if="fetchedTournamentArray.tournaments" class="tour-2-para">Date: {{ fetchedTournamentArray.tournaments[currentTournamentIndex + 1].date }}</p>
        <p v-if="fetchedTournamentArray.tournaments" class="tour-2-para">Current champion: {{ fetchedTournamentArray.tournaments[currentTournamentIndex + 1].currentChampion }}</p>
      </div>
    </div>
    <div class="nav-buttons">
      <div v-if="currentTournamentIndex" v-on:click="decrementTournamentImgIndex" class="prev-btn">
        Previous
      </div>
      <div v-if="!isElementLast" v-on:click="incrementTournamentImgIndex" class="next-btn">
        Next
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const dataUrl = '/static/atp-ranking.json';

export default {
  name: 'Tournaments',
  data () {
    return {
      appBoxSize: {
        width: 0,
        appBoxWidthFlag: 0
      },
      fetchedTournamentArray: [],
      currentTournamentIndex: 0,
      isLoading: false
    }
  },
  methods: {
    incrementTournamentImgIndex: function() {
      if(this.currentTournamentIndex < 12) {
        this.currentTournamentIndex = this.currentTournamentIndex + 2;
      }
    },
    decrementTournamentImgIndex: function() {
      if(this.currentTournamentIndex >= 2) {
        this.currentTournamentIndex = this.currentTournamentIndex - 2;
      }
    },
    setImgOneClass: function(tournamentIndexCtr) {
      if(tournamentIndexCtr == 0){
        return "tour-img-1";
      }
      else if(tournamentIndexCtr == 2){
        return "tour-img-3";
      }
      else if(tournamentIndexCtr == 4){
        return "tour-img-5";
      }
      else if(tournamentIndexCtr == 6){
        return "tour-img-7";
      }
      else if(tournamentIndexCtr == 8){
        return "tour-img-9";
      }
      else if(tournamentIndexCtr == 10){
        return "tour-img-11";
      }
      else if(tournamentIndexCtr == 12){
        return "tour-img-13";
      }
    },
    setImgTwoClass: function(tournamentIndexCtr) {
      if(tournamentIndexCtr == 0){
        return "tour-img-2";
      }
      else if(tournamentIndexCtr == 2){
        return "tour-img-4";
      }
      else if(tournamentIndexCtr == 4){
        return "tour-img-6";
      }
      else if(tournamentIndexCtr == 6){
        return "tour-img-8";
      }
      else if(tournamentIndexCtr == 8){
        return "tour-img-10";
      }
      else if(tournamentIndexCtr == 10){
        return "tour-img-12";
      }
      else if(tournamentIndexCtr == 12){
        return "tour-img-14";
      }
    },
    setLinkImgOne: function(tournamentIndex){
      switch(tournamentIndex){
        case 0:
          return "https://ausopen.com/";
        case 2:
          return "http://www.wimbledon.com/index.html";
        case 4:
          return "https://bnpparibasopen.com/";
        case 6:
          return "http://montecarlotennismasters.com/";
        case 8:
          return "http://www.internazionalibnlditalia.com/";
        case 10:
          return "https://www.wsopen.com/";
        case 12:
          return "https://www.rolexparismasters.com/uk";
      }
    },
    setLinkImgTwo: function(tournamentIndex){
      switch(tournamentIndex){
        case 1:
          return "https://www.rolandgarros.com/en-us/";
        case 3:
          return "https://www.usopen.org/index.html";
        case 5:
          return "http://miamiopen.com/";
        case 7:
          return "https://www.madrid-open.com/";
        case 9:
          return "http://www.rogerscup.com/";
        case 11:
          return "http://en.shanghairolexmasters.com/";
        case 13:
          return "https://www.nittoatpfinals.com/";
      }
    },
    getAppBoxWidth: function($event) {
      this.appBoxSize.width = this.$refs['tournaments'].clientWidth;   
      if(this.appBoxSize.width <= 750) {
        this.appBoxSize.appBoxWidthFlag = 1;
      }
      else{
        this.appBoxSize.appBoxWidthFlag = 0;
      }
    },
    getTournament: function(url) {
      axios.get(url)
          .then(
              (response) => {
                  this.fetchedTournamentArray = response.data;
                  this.isLoading = false;
                  console.log(this.fetchedTournamentArray);
              }
          )
          .catch(
              (error) => {
                  console.log(error);
              }
          )
    }
  },
  created() {
    this.isLoading = true;
    this.getTournament(dataUrl);
  },
  computed: {
    isAppBoxWidthSmall: function() {
      if(this.appBoxSize.appBoxWidthFlag == 1){
        return true;
      }
      return false;
    },
    isElementLast: function() {
      if(this.currentTournamentIndex < 12){
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.getAppBoxWidth);
      //Init
      this.getAppBoxWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getAppBoxWidth);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import "Tournaments.scss";
</style>
