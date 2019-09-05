<template>
    <div v-bind:class="{'players': true, 'font-decreased': isAppBoxWidthSmall}" ref="players">
        <div class="player">
            <a v-bind:href="setLinkImg(0)" target='_blank'>
                <div v-bind:class="setImgClass(0)">
                </div>
            </a>
            <p v-if="fetchedPlayersArray.players" class="player-para player-name">{{ fetchedPlayersArray.players[currentPlayerIndex].name }}</p>
            <p v-if="fetchedPlayersArray.players" class="player-para">{{ fetchedPlayersArray.players[currentPlayerIndex].attribute }}</p>
        </div>
        <div class="player">
            <a v-bind:href="setLinkImg(1)" target='_blank'>
                <div v-bind:class="setImgClass(1)">
                </div>
            </a>
            <p v-if="fetchedPlayersArray.players" class="player-para player-name">{{ fetchedPlayersArray.players[currentPlayerIndex+1].name }}</p>
            <p v-if="fetchedPlayersArray.players" class="player-para">{{ fetchedPlayersArray.players[currentPlayerIndex+1].attribute }}</p>
        </div>
        <div class="player">
            <a v-bind:href="setLinkImg(2)" target='_blank'>
                <div v-bind:class="setImgClass(2)">
                </div>
            </a>
            <p v-if="fetchedPlayersArray.players" class="player-para player-name">{{ fetchedPlayersArray.players[currentPlayerIndex+2].name }}</p>
            <p v-if="fetchedPlayersArray.players" class="player-para">{{ fetchedPlayersArray.players[currentPlayerIndex+2].attribute }}</p>
        </div>
        <div class="player">
            <a v-bind:href="setLinkImg(3)" target='_blank'>
                <div v-bind:class="setImgClass(3)">
                </div>
            </a>
            <p v-if="fetchedPlayersArray.players" class="player-para player-name">{{ fetchedPlayersArray.players[currentPlayerIndex+3].name }}</p>
            <p v-if="fetchedPlayersArray.players" class="player-para">{{ fetchedPlayersArray.players[currentPlayerIndex+3].attribute }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const dataUrl = '/static/atp-ranking.json';

export default {
    name: 'Players',
    data () {
        return {
            appBoxSize: {
                width: 0,
                appBoxWidthFlag: 0
            },
            fetchedPlayersArray: [],
            currentPlayerIndex: 0
        }
    },
    methods: {
        setImgClass: function(playerIndex) {
            if(playerIndex == 0){
                return "player-img-1";
            }
            else if(playerIndex == 1){
                return "player-img-2";
            }
            else if(playerIndex == 2){
                return "player-img-3";
            }
            else if(playerIndex == 3){
                return "player-img-4";
            }
        },
        setLinkImg: function(playerIndex){
            switch(playerIndex){
                case 0:
                return "https://www.atpworldtour.com/en/players/rafael-nadal/n409/overview";
                case 1:
                return "https://www.atpworldtour.com/en/players/roger-federer/f324/overview";
                case 2:
                return "https://www.atpworldtour.com/en/players/novak-djokovic/d643/overview";
                case 3:
                return "https://www.atpworldtour.com/en/players/juan-martin-del-potro/d683/overview";
            }
        },
        getAppBoxWidth: function($event) {
            this.appBoxSize.width = this.$refs['players'].clientWidth;   
            if(this.appBoxSize.width <= 750) {
                this.appBoxSize.appBoxWidthFlag = 1;
            }
            else{
                this.appBoxSize.appBoxWidthFlag = 0;
            }
        },
        getPlayer: function(url) {
            axios.get(url)
                .then(
                    (response) => {
                        this.fetchedPlayersArray = response.data;
                        console.log(this.fetchedPlayersArray);
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
        this.getPlayer(dataUrl);
    },
    computed: {
        isAppBoxWidthSmall: function() {
            if(this.appBoxSize.appBoxWidthFlag == 1){
                return true;
            }
            return false;
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

<style lang="scss" scoped>
    @import "Players.scss";
</style>