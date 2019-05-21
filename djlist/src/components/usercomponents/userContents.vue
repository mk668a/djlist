<template>
<div class="userContents">
  <masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 2}" :gutter="{default: '30px', 700: '20px'}">
    <div v-for="(item, index) in postItems" :key="index" class="item">
      <div class="data-img">
        <div class="filter"></div>
        <img v-lazy="item.img" style="max-width: 100%" v-scroll-to="'#top'" @click="toItem(item)" />
      </div>
      <!-- <div class="data-product">
        <a v-text="item.product" @click="toLink(item.url)">
        </a>
      </div <div class="data-name"> -->
      <a v-text="item.name" v-scroll-to="'#top'">
      </a>
      <div v-if="!confirmLiked(item.uid)" @click="like(item)">
        <i class="el-icon-star-off"></i>
      </div>
      <div v-else="s">
        <i class="el-icon-star-on"></i>
      </div>
      <div v-else>
        <i class="el-icon-star-on"></i>
      </div>
      <a>{{item.popular}}</a>
    </div>
  </masonry>
  <el-button icon="el-icon-arrow-up" href="#" v-scroll-to="'#top'" circle></el-button>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'userContents',
  props: {
    "postItems": Array
  },
  methods: {
    confirmLiked(id) {
      if (id in localStorage) {
        return true
      } else {
        return false
      }
    },
    like(item) {
      if (item.id in localStorage) {
        return true
      } else {
        console.log(item.popular);
        item.popular = item.popular + 1
        axios
          .post('https://198o53es1f.execute-api.ap-northeast-1.amazonaws.com/dev/good', {
            target: 'character',
            wiki: item.wiki,
            id: item.id
          })
        localStorage.setItem(item.id, true);
        console.log(item.popular);
        this.s = true
      }
    },
    toLink(link) {
      console.log(link);
      if (link != 'null') {
        window.open(link);
      }
    }
  }
}
</script>

<style>
.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.userContents {
  margin: 30px 100px !important;
}

.userContents>div:nth-of-type(3) {
  margin: auto 40px !important;
}

.userContents>div>div>.item {
  margin: 0 auto 30px auto;
  width: auto;
  height: auto;
  cursor: pointer;
  border-radius: 0.5em;
  overflow: hidden;
  position: relative;
  background: #c3c3c3;
}

.userContents>div>div>.item>.data-name {
  margin-top: 10px;
  margin-left: 20px;
  text-align: left;
  font-weight: bold;
  display: flex;
}

.userContents>div>div>.item>.data-name>a {
  color: #f2cf01;
}

.userContents>div>div>.item>.data-name>div {
  margin-left: auto;
  margin-right: 5px;
}

.userContents>div>div>.item>.data-img>img {
  border-radius: 0.5em;
  background: #e6e6e6;
  filter: brightness(95%);
  transition: all 0.4s ease;
}

.userContents>div>div>.item:hover img {
  -webkit-transform: scale(1);
  /* 元の大きさに戻す */
  filter: brightness(0.8);
  transition: all 0.4s ease;
}

.userContents>.original {
  display: flex;
}

.userContents>button {
  margin: 30px auto;
  display: flex;
}

@media screen and (max-width:768px) {
  .userContents {
    margin: auto 1em !important;
  }

  .userContents>div>div>.item:hover .data-product {
    bottom: 50px;
  }

  .userContents>div>div>.item>.data-product {
    display: none;
  }
}

@media screen and (min-width:630px) {
  .userContents>div>div>.item:hover .data-product {
    left: 0px;
    bottom: 30px;
  }

  .userContents>div>div>.item>.data-product {
    width: 100%;
    height: 60px;
    position: absolute;
    left: -320px;
    /* 枠の上に置いて表示しない */
    bottom: 30px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

  .userContents>div>div>.item>.data-product>a {
    color: #f2cf01;
    padding-top: 10px;
    text-align: center;
    background-color: white;
    border-radius: 0.5em;
    padding: 10px 5px;
    font-size: 10px;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
