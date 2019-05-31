<template>
<div class="contents">
  <div class="masonry">
    <masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 2}" :gutter="{default: '30px', 700: '20px'}">
      <div v-for="(item, index) in items" :key="index" class="item">
        <div class="dataName">
          <a v-text="item.name">
          </a>
        </div>
        <div class="dataImg">
          <div class="filter"></div>
          <img v-lazy="item.img" style="max-width: 100%" v-scroll-to="'#top'" @click="toItem(item)" />
        </div>
        <div v-if="!confirmLiked(item.uid, item.popular)" class="popular" @click="like(item)">
          <!-- <i class="el-icon-star-off"></i> -->
          <a>☆{{getPopular(item)}}</a>
        </div>
        <div v-else class="popular" @click="like(item)">
          <!-- <i class="el-icon-star-on"></i> -->
          <a>★{{getPopular(item)}}</a>
        </div>
      </div>
    </masonry>
  </div>
  <div class="arrowUp">
    <el-button icon="el-icon-arrow-up" href="#" v-scroll-to="'#top'" circle></el-button>
  </div>
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

<style lang="scss">
$margin-size: 10;
@mixin exborder($color:#fff) {
    // 上
    text-shadow: 1px 1px 0 $color, -1px 1px 0 $color, 1px -1px 0 $color, -1px -1px 0 $color;
    // 下
    text-shadow: 1px 1px 1px $color, -1px 1px 1px $color, 1px -1px 1px $color, -1px -1px 1px $color;
}

.contents {

    .masonry {

        .item {
            padding: 0 10px;
            margin: auto auto 20px;
            background: #FFE306;
            box-shadow: 10px 10px 10px 1px rgba(0,0,0,0.4);

            .dataName {
                text-align: center;
                z-index: 100;
                position: relative;

                a {
                    font-weight: bold;
                    color: #ec0d08;
                    font-size: #{$margin-size*2}px;
                    line-height: 0;
                    @include exborder(#FFE306);
                }
            }

            .dataImg {
                margin: 0;

                img {
                    width: 100%;
                    margin-top: -#{$margin-size}px;
                }
            }

            .popular {
                text-align: left;
                display: flex;
                margin: -18.5px 0 0;

                a {
                    color: #ec0d08;
                    font-weight: bold;
                    @include exborder(#FFE306);
                }

            }
        }
    }

    .arrowUp {
        display: flex;

        .el-button {
            margin: auto;
        }

    }
}
</style>
