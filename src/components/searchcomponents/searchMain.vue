<template>
<div class="searchMain">
  <div class="searchSpan" :style="searchHiddenStyle">
    <Search :items="items" :toform='toform2' />
  </div>
  <div class="query" id="block" :style="searchHiddenStyle">
    <h2>{{query}}</h2>
    <div class="paipu">
      <div>
      </div>
    </div>
    <div　class="shadow">{{query}}</div>
    <div class="paipuShadow">
      <div>
      </div>
    </div>
  </div>
  <div class="resultSpan" v-show="render">
    <div class="seachResult">
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
  <div class="arrowUp">
    <el-button icon="el-icon-arrow-up" href="#" v-scroll-to="'#top'" circle></el-button>
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
    "items": Array,
    'confirmLiked': Function,
    'like': Function,
    'tags': Array,
    'getTags': Function,
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
      showNone: false,
      targetRect: 0,
      searchHiddenStyle: {},
      render: true
      // var seachResult =
    }
  },
  methods: {
    toform2(item) {
      if (item != "") {
        this.$route.query.dev = item
        history.replaceState('', '', 'searchMain?dev=' + item);

        this.render = false
        this.showName = false
        this.showGenre = false
        this.showPlace = false
        this.showNone = false

        this.getSearchResult()
        this.render = true
      }
    },
    handleScroll() {
      const result = document.querySelector('.resultSpan');
      const search = document.querySelector('.searchSpan');
      const query = document.querySelector('.query');

      const rect = result.getBoundingClientRect().top;
      // console.log(rect);

      this.targetRect = rect;

      if (this.targetRect < 200) {
        this.$set(this.searchHiddenStyle, 'visibility', 'hidden');
        search.classList.add('head-animation');
        query.classList.add('head-animation');
      } else {
        this.$set(this.searchHiddenStyle, 'visibility', 'visible');
        search.classList.remove('head-animation');
        query.classList.remove('head-animation');
      }
    },
    getSearchResult() {
      this.searchName = []
      this.searchGenre = []
      this.searchPlace = []

      this.query = this.$route.query.dev

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
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    this.getSearchResult()
  }
}
</script>

<style lang="scss">
$paipu-size: 200;
$main-color: #ec0d08;
@mixin reflect() {
    margin: 0 auto;
    width: #{$paipu-size}px;
    height: #{$paipu-size/10}px;
    background: no-repeat url("../../assets/paipu.png");
    background-size: contain;
    // -webkit-box-reflect: below 4px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(0.5, transparent), to(rgba(0,0,0,0.8)));
    // -webkit-text-stroke-width: 1px;
    // -webkit-text-stroke-color: #fff975;
}

.head-animation {
    transform: translateY(-200%);
}

.searchMain {

    .searchSpan {
        transition: 0.3s cubic-bezier(.4, 0, .2, 1);
        position: fixed;
        margin-top: 42px;
        width: 100%;
        z-index: 100;
    }

    .query {
        transition: 0.3s cubic-bezier(.4, 0, .2, 1);
        top: 240px;
        text-align: center;
        position: fixed;
        width: 100%;
        z-index: 100;
        line-height: 0;

        .shadow {
            position: relative;
            transform: rotateX(70deg);
            color: rgba($main-color, .5);
        }

        .paipuShadow {
            transform: rotateX(70deg);

            width: 100%;
            height: auto;
            display: flex;
            position: relative;

            div {
                @include reflect();
                opacity: 0.5;
            }
        }

        .paipu {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;

            div {
                @include reflect();
            }
        }
    }
    // end query

    .resultSpan {
        min-height: 100vh;
        z-index: 0;
        position: relative;
        top: 200px;

        .seachResult {
            z-index: 0;
            position: relative;
            top: 100px;

            div {
                h3 {
                    padding: 0 10%;
                    margin-bottom: 0;
                }
            }

            .genre,
            .name,
            .place {
                .contents {
                    button {
                        display: none;
                    }
                }
            }
        }
    }

    .arrowUp {
        z-index: 200;
        position: relative;
    }
}

@media screen and (max-width:380px) {
    .searchMain {
        .query {
            top: 260px;
        }
    }
}
</style>
