<template>
  <div v-bind:class="{'technique': true, 'font-decreased': isAppBoxWidthSmall}" ref="technique">
    <div class="technique-box">
      <div class="technique-1">
        <div v-if="isLoading" class="lds-dual-ring"></div>
        <iframe v-if="!isLoading" width="640" height="360" v-bind:src="setVidSrc(currentTechniqueIndex)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p v-if="fetchedTechniqueArray.technique" class="technique-1-para technique-name">{{ fetchedTechniqueArray.technique[currentTechniqueIndex].stroke }}</p>
        <p v-if="fetchedTechniqueArray.technique" class="technique-1-para">Stroke type: {{ fetchedTechniqueArray.technique[currentTechniqueIndex].type }}</p>
      </div>
      <div class="technique-2">
        <div v-if="isLoading" class="lds-dual-ring"></div>
        <iframe v-if="!isLoading" width="640" height="360" v-bind:src="setVidSrc(currentTechniqueIndex + 1)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p v-if="fetchedTechniqueArray.technique" class="technique-2-para technique-name">{{ fetchedTechniqueArray.technique[currentTechniqueIndex + 1].stroke }}</p>
        <p v-if="fetchedTechniqueArray.technique" class="technique-2-para">Stroke type: {{ fetchedTechniqueArray.technique[currentTechniqueIndex + 1].type }}</p>
      </div>
    </div>
    <div class="nav-buttons">
      <div v-if="currentTechniqueIndex" v-on:click="decrementTechniqueVidIndex" class="prev-btn">
        Previous
      </div>
      <div v-if="!isElementLast" v-on:click="incrementTechniqueVidIndex" class="next-btn">
        Next
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const dataUrl = '/static/atp-ranking.json';

export default {
  name: 'Technique',
  data () {
    return {
      appBoxSize: {
        width: 0,
        appBoxWidthFlag: 0
      },
      fetchedTechniqueArray: [],
      currentTechniqueIndex: 0,
      clipsSrc: [
        "https://www.youtube.com/embed/g08vWMFbPoc?rel=0",
        "https://www.youtube.com/embed/oUIa6-wQADA",
        "https://www.youtube.com/embed/Now4OFySdC4?rel=0",
        "https://www.youtube.com/embed/z1ze7NMfaN0",
        "https://www.youtube.com/embed/_YE-k1QwZfg",
        "https://www.youtube.com/embed/8LBNv93fwPk",
        "https://www.youtube.com/embed/nrvkqIVbiDE",
        "https://www.youtube.com/embed/NZxgD1z3lrA",
        "https://www.youtube.com/embed/XNJ-uaytATI",
        "https://www.youtube.com/embed/Ht3hOqFPxz0",
        "https://www.youtube.com/embed/smXwpViLrS8",
        "https://www.youtube.com/embed/GZ5GH9spSa8",
        "https://www.youtube.com/embed/6HECCLBKeCk",
        "https://www.youtube.com/embed/H1F8YxcdfKo"
      ],
      isLoading: false
    }
  },
  methods: {
    incrementTechniqueVidIndex: function() {
      if(this.currentTechniqueIndex < 12) {
        this.currentTechniqueIndex = this.currentTechniqueIndex + 2;
      }
    },
    decrementTechniqueVidIndex: function() {
      if(this.currentTechniqueIndex >= 2) {
        this.currentTechniqueIndex = this.currentTechniqueIndex - 2;
      }
    },
    getAppBoxWidth: function($event) {
      this.appBoxSize.width = this.$refs['technique'].clientWidth;   
      if(this.appBoxSize.width <= 750) {
        this.appBoxSize.appBoxWidthFlag = 1;
      }
      else{
        this.appBoxSize.appBoxWidthFlag = 0;
      }
    },
    setVidSrc: function(techniqueIndex) {
      return this.clipsSrc[techniqueIndex];
    },
    getTechnique: function(url) {
      axios.get(url)
          .then(
              (response) => {
                  this.fetchedTechniqueArray = response.data;
                  this.isLoading = false;
                  console.log(this.fetchedTechniqueArray);
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
    this.getTechnique(dataUrl);
  },
  computed: {
    isAppBoxWidthSmall: function() {
      if(this.appBoxSize.appBoxWidthFlag == 1){
        return true;
      }
      return false;
    },
    isElementLast: function() {
      if(this.currentTechniqueIndex < 12){
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
  @import "Technique.scss";
</style>