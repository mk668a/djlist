<template>
<div class="contents" :class="{active: about}">
  <transition name="bounce">
    <div class="masonry" v-show="!loading">
      <masonry :cols="{default: 4, 1000: 4, 768: 3, 500: 2}" :gutter="{default: '30px', 700: '20px'}">
        <div v-for="(item, index) in items" :key="index" class="item">
          <div class="dataName">
            <a v-text="item.name">
            </a>
          </div>
          <div class="dataImg" v-scroll-to="'#top'" @click="toItem(item)">
            <div class="filter"></div>
            <img :src="item.img" />
          </div>
          <div v-if="!confirmLiked(item.popular)" class="popular" @click="like(item)">
            <a class="off">☆{{getPopular(item)}}</a>
          </div>
          <div v-else class="popular" @click="like(item)">
            <a class="on">★{{getPopular(item)}}</a>
          </div>
        </div>
      </masonry>
    </div>
  </transition>
  <div class="arrowUp" v-show="!loading">
    <el-button icon="el-icon-arrow-up" href="#" v-scroll-to="'#top'" circle></el-button>
  </div>
  <div class="loading" v-show="loading">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Contents',
  props: {
    'toItem': Function,
    "items": Array,
    'item': Object,
    'confirmLiked': Function,
    'like': Function,
    'about': Boolean
  },
  data() {
    return {
      loading: true,
      flag: false
    }
  },
  methods: {
    getPopular(item) {
      if (item.popular == undefined) {
        return 0
      } else {
        return Object.keys(item.popular).length
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
</script>

<style lang="scss">
$margin-size: 10;
$main-color: #ec0d08;
@mixin exborder($color:#fff) {
    // 上
    text-shadow: 1px 1px 0 $color, -1px 1px 0 $color, 1px -1px 0 $color, -1px -1px 0 $color;
    // 下
    text-shadow: 1px 1px 1px $color, -1px 1px 1px $color, 1px -1px 1px $color, -1px -1px 1px $color;
}

.bounce-enter-active {
    animation: bounce-in 1s;
}
.bounce-leave-active {
    animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(.99);
    }
    50% {
        transform: scale(1.01);
    }
    100% {
        transform: scale(1);
    }
}

.contents {

    .masonry {
        max-height: 200vh;
        overflow-y: scroll;
        padding: 0 20px;

        .item {
            padding: 10px 20px;
            margin: 20px 0;
            // background: #FFE306;
            background: no-repeat url("../assets/panel.png");
            box-shadow: 10px 10px 10px 1px rgba(0,0,0,0.4);

            .dataName {
                text-align: center;
                z-index: 100;
                position: relative;

                a {
                    font-weight: bold;
                    color: $main-color;
                    font-size: #{$margin-size*2}px;
                    line-height: 0;
                    @include exborder(#fff);
                }
            }

            .dataImg {
                margin: 0;
                cursor: pointer;

                img {
                    width: 100%;
                    margin-top: -#{$margin-size}px;
                }
            }

            .popular {
                text-align: left;
                display: flex;
                // margin-top: -#{$margin-size*2}px;
                height: 0;

                a {
                    color: rgba($main-color, 0.7);
                    font-weight: bold;
                    font-size: #{$margin-size*2.5}px;
                    @include exborder(#fff);
                    position: relative;
                    top: -10px;
                }

                .on {
                    color: rgba($main-color, 1);
                }
            }

        }
    }

    .loading {
        margin-top: 50px;
        display: flex;
    }
}

@media screen and (min-width:768px) {
    .contents {
        .masonry {
            padding: 0 10%;

            .item {
                padding: 7.5px 15px;

                .dataName {

                    a {
                        font-size: #{$margin-size*1.75}px;
                    }
                }

                .popular {
                    text-align: left;
                    display: flex;
                    // margin-top: -#{$margin-size*2}px;
                    height: 0;

                    a {
                        font-size: #{$margin-size*1.875}px;
                    }
                }
            }
        }
    }
}
</style>
