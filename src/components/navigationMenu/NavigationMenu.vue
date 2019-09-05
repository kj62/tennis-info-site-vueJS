<template>
    <nav class='navbar'>
        <div class='nav-container'>
            <ul v-bind:class='{"navbar-list": true, "small-margin-top": isMarginShorter}'>
                <router-link to='/'><li v-bind:class='{"nav-item": true, "active-card": isHomeActive}' v-on:click='changeCardSelection("home"); activateCard("home")'>Home</li></router-link>
                <router-link to='/players'><li v-bind:class='{"nav-item": true, "active-card": isPlayersActive}' v-on:click='changeCardSelection("players"); activateCard("players")'>Players</li></router-link>
                <router-link to='/tournaments'><li v-bind:class='{"nav-item": true, "active-card": isTournamentsActive}' v-on:click='changeCardSelection("tournaments"); activateCard("tournaments")'>Tournaments</li></router-link>
                <router-link to='/technique'><li v-bind:class='{"nav-item": true, "active-card": isTechniqueActive}' v-on:click='changeCardSelection("technique"); activateCard("technique")'>Technique</li></router-link>
            </ul>
        </div>
    </nav>
</template>

<script>

import LocalStore from '../../localStorage';

const storeKeyHome = 'vue-store-key-home';
const storeKeyPlayers = 'vue-store-key-players';
const storeKeyTournaments = 'vue-store-key-tournaments';
const storeKeyTechnique = 'vue-store-key-technique';

export default {
  name: 'App',
  data () {
    return {
      isHomeActive: LocalStore.getStore(storeKeyHome),
      isPlayersActive: LocalStore.getStore(storeKeyPlayers),
      isTournamentsActive: LocalStore.getStore(storeKeyTournaments),
      isTechniqueActive: LocalStore.getStore(storeKeyTechnique)
    }
  },
  props: {
    marginTopDecreased: Boolean
  },
  methods: {
    changeCardSelection: function(selection) {
      if(selection == 'home'){
        this.$emit('changeCardSelection', 'home');
      }
      else if(selection == 'players'){
        this.$emit('changeCardSelection', 'players');
      }
      else if(selection == 'tournaments'){
        this.$emit('changeCardSelection', 'tournaments');
      }
      else if(selection == 'technique'){
        this.$emit('changeCardSelection', 'technique');
      }
    },
    activateCard: function(card) {
      if(card == 'home') {
        this.isHomeActive = true;
        LocalStore.setStore(storeKeyHome, true);
        this.isPlayersActive = false;
        LocalStore.setStore(storeKeyPlayers, false);
        this.isTournamentsActive = false;
        LocalStore.setStore(storeKeyTournaments, false);
        this.isTechniqueActive = false;
        LocalStore.setStore(storeKeyTechnique, false);
      }
      else if(card == 'players') {
        this.isHomeActive = false;
        LocalStore.setStore(storeKeyHome, false);
        this.isPlayersActive = true;
        LocalStore.setStore(storeKeyPlayers, true);
        this.isTournamentsActive = false;
        LocalStore.setStore(storeKeyTournaments, false);
        this.isTechniqueActive = false;
        LocalStore.setStore(storeKeyTechnique, false);
      }
      else if(card == 'tournaments') {
        this.isHomeActive = false;
        LocalStore.setStore(storeKeyHome, false);
        this.isPlayersActive = false;
        LocalStore.setStore(storeKeyPlayers, false);
        this.isTournamentsActive = true;
        LocalStore.setStore(storeKeyTournaments, true);
        this.isTechniqueActive = false;
        LocalStore.setStore(storeKeyTechnique, false);
      }
      else if(card == 'technique') {
        this.isHomeActive = false;
        LocalStore.setStore(storeKeyHome, false);
        this.isPlayersActive = false;
        LocalStore.setStore(storeKeyPlayers, false);
        this.isTournamentsActive = false;
        LocalStore.setStore(storeKeyTournaments, false);
        this.isTechniqueActive = true;
        LocalStore.setStore(storeKeyTechnique, true);
      }
    }
  },
  computed: {
    isMarginShorter: function() {
      if(this.marginTopDecreased == true) {
        return true;
      }
      return false;
    }
  }
}
</script>

<style lang='scss' scoped>
  @import 'NavigationMenu.scss';
</style>
