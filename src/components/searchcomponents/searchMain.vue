<template>
<div class="searchMain">
  <div class="searchSpan">
    <Search :toform='toform' />
  </div>
  <div class="resultSpan">
    <div class="query">
      <h2>{{query}}</h2>
      <div class="paipu">
        <div>
        </div>
      </div>
      <h2　class="shadow">{{query}}</h2>
    </div>
    <div class="eachResult">
      <div class="none" v-show="showNone">
        <h3>Did not match any people</h3>
      </div>
      <div class="name" v-show="showName">
        <h3>name</h3>
        <Contents :toItem="toItem" :items="searchName" :confirmLiked="confirmLiked" :like="like" />
      </div>
      <div class="genre" v-show="showGenre">
        <h3>genre</h3>
        <Contents :toItem="toItem" :items="searchGenre" :confirmLiked="confirmLiked" :like="like" />
      </div>
      <div class="place" v-show="showPlace">
        <h3>place</h3>
        <Contents :toItem="toItem" :items="searchPlace" :confirmLiked="confirmLiked" :like="like" />
      </div>
    </div>
  </div>
  <div class="searchMainMargin">
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import Contents from '@/components/Contents'
import Search from '@/components/Search'

export default {
  name: 'searchMain',
  props: {
    "toItem": Function,
    'toform': Function,
    "items": Array,
    'confirmLiked': Function,
    'like': Function,
  },
  components: {
    Contents,
    Search
  },
  data() {
    return {
      query: null,
      searchName: [],
      searchGenre: [],
      searchPlace: [],
      showName: false,
      showGenre: false,
      showPlace: false,
      showNone: false
    }
  },
  methods: {
  },
  created() {
    this.query = this.$route.query.dev
    let self = this
    let items_ref = firebase.database().ref('/items')

    // searchName
    // console.log("searchName");
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name == this.query) {
        this.searchName.push(this.items[i])
        this.showName = true
      }
    }
    // console.log(this.searchName);

    // searchGenre
    // console.log("searchGenre");
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; j < Object.keys(this.items[i].genre).length; j++) {
        if (this.items[i].genre[j] != null || this.items[i].genre[j] != '') {
          if (this.items[i].genre[j] == this.query) {
            // console.log(this.items[i]);
            this.searchGenre.push(this.items[i])
            this.showGenre = true
          }
        }
      }
    }
    // console.log(this.searchGenre);

    // searchPlace
    // console.log("searchPlace");
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; j < Object.keys(this.items[i].places).length; j++) {
        if (this.items[i].places[j] != null || this.items[i].places[j] != '') {
          if (this.items[i].places[j] == this.query) {
            this.searchPlace.push(this.items[i])
            this.showPlace = true
          }
        }
      }
    }
    // console.log(this.searchPlace);

    if (this.showName == false && this.showGenre == false && this.showPlace == false) {
      this.showNone = true
    }
  }
}
</script>

<style lang="scss">
$paipu-size: 200;
$main-color: #ec0d08;

.searchMain {
    min-height: 100vh;

    .searchSpan {
        position: fixed;
        margin-top: 42px;
        width: 100%;
        z-index: 100;
    }

    .resultSpan {
        z-index: 0;
        position: relative;
        top: 160px;

        .query {
            text-align: center;
            position: fixed;
            width: 100%;
            z-index: 100;
            line-height: 0;

            h2 {
                font-size: 5vw;
            }

            .shadow {
                position: relative;
                bottom: 34px;
                transform: rotateX(70deg);
                color: rgba($main-color, .5);
            }

            .paipu {
                bottom: 10px;
                width: 100%;
                height: auto;
                display: flex;
                position: relative;
                // reflect
                -webkit-box-reflect: below 4px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(0.5, transparent), to(rgba(0,0,0,0.8)));
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #fff975;

                div {
                    margin: 0 auto;
                    width: #{$paipu-size}px;
                    height: #{$paipu-size/10}px;
                    background: no-repeat url("../../assets/paipu.png");
                    background-size: contain;
                }
            }
        }

        .eachResult {
            z-index: 0;
            position: relative;
            top: 100px;

            div {
                h3 {
                    padding-left: 20px;
                    margin-bottom: 0;
                }
            }

            .genre,
            .name {
                .contents {
                    button {
                        display: none;
                    }
                }
            }
        }
    }

    .searchMainMargin {
        height: 260px;
    }
}
</style>
