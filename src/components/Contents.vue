<template>
<div class="contents">
  <masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 2}" :gutter="{default: '30px', 700: '20px'}">
    <div v-for="(item, index) in items" :key="index" class="item">
      <div class="data-img">
        <div class="filter"></div>
        <img v-lazy="item.img" style="max-width: 100%" v-scroll-to="'#top'" @click="toItem(item)" />
      </div>
      <a v-text="item.name" v-scroll-to="'#top'">
      </a>
      <div v-if="!confirmLiked(item.uid, item.popular)" @click="like(item)">
        <i class="el-icon-star-off"></i>
      </div>
      <div v-else @click="like(item)">
        <i class="el-icon-star-on"></i>
      </div>
      <a>{{getPopular(item)}}</a>
    </div>
  </masonry>
  <el-button icon="el-icon-arrow-up" href="#" v-scroll-to="'#top'" circle></el-button>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Contents',
  props: {
    'toItem': Function,
    "items": Array,
    'item': Object,
    'confirmLiked': Function,
    'like': Function,
  },
  methods: {
    getPopular(item) {
      if (item.popular == undefined) {
        return 0
      } else {
        return Object.keys(item.popular).length
      }
    }
  },
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

.contents {
  margin: 30px 100px !important;
}

.contents>div:nth-of-type(3) {
  margin: auto 40px !important;
}

.contents>div>div>.item {
  margin: 0 auto 30px auto;
  width: auto;
  height: auto;
  cursor: pointer;
  border-radius: 0.5em;
  overflow: hidden;
  position: relative;
  background: #c3c3c3;
}

.contents>div>div>.item>.data-name {
  margin-top: 10px;
  margin-left: 20px;
  text-align: left;
  font-weight: bold;
  display: flex;
}

.contents>div>div>.item>.data-name>a {
  color: #f2cf01;
}

.contents>div>div>.item>.data-name>div {
  margin-left: auto;
  margin-right: 5px;
}

.contents>div>div>.item>.data-img>img {
  border-radius: 0.5em;
  background: #e6e6e6;
  filter: brightness(95%);
  transition: all 0.4s ease;
}

.contents>div>div>.item:hover img {
  -webkit-transform: scale(1);
  /* 元の大きさに戻す */
  filter: brightness(0.8);
  transition: all 0.4s ease;
}

.contents>.original {
  display: flex;
}

.contents>button {
  margin: 30px auto;
  display: flex;
}

@media screen and (max-width:768px) {
  .contents {
    margin: auto 1em !important;
  }

  .contents>div>div>.item:hover .data-product {
    bottom: 50px;
  }

  .contents>div>div>.item>.data-product {
    display: none;
  }
}

@media screen and (min-width:630px) {
  .contents>div>div>.item:hover .data-product {
    left: 0px;
    bottom: 30px;
  }

  .contents>div>div>.item>.data-product {
    width: 100%;
    height: 60px;
    position: absolute;
    left: -320px;
    /* 枠の上に置いて表示しない */
    bottom: 30px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

  .contents>div>div>.item>.data-product>a {
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
