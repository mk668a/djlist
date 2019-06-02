<template>
<div class="contents" :class="{active: about}">
  <transition name="bounce">
    <div class="masonry" v-show="!loading">
      <masonry :cols="{default: 4, 1000: 3, 700: 2, 400: 2}" :gutter="{default: '30px', 700: '20px'}">
        <div v-for="(item, index) in items" :key="index" class="item">
          <div class="dataName">
            <a v-text="item.name">
            </a>
          </div>
          <div class="dataImg" v-scroll-to="'#top'" @click="toItem(item)" >
            <div class="filter"></div>
            <img v-lazy="item.img" style="max-width: 100%" />
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
      loading: true
    }
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
                    font-family: 'ヒラギノ明朝 ProN W6', 'HiraMinProN-W6', 'HiraMinProN-W6', 'Avenir', Helvetica, Arial, sans-serif;
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
                    font-family: 'ヒラギノ明朝 ProN W6', 'HiraMinProN-W6', 'HiraMinProN-W6', 'Avenir', Helvetica, Arial, sans-serif;
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

    .arrowUp {
        display: flex;
        margin: 50px 0;

        .el-button {
            margin: auto;
            color: #fff;
            background: linear-gradient(0deg, #FDE816 1%, #a458ec 60%, #fff);
            border-color: transparent;
            border-width: 0;
            box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.5);

            &:hover {
                width: 55px;
                height: 55px;
                box-shadow: 0 0 10px 1px rgba(0,0,0,0.3);
            }

            &:hover {
                .el-icon-arrow-up {
                    &::before {
                        font-size: 28px;
                    }
                }
            }

            .el-icon-arrow-up {
                &::before {
                    font-size: 30px;
                    font-weight: bold;
                }
            }
        }
    }

    .loading {
        display: flex;
    }
}

// loading
.lds-roller {
    margin: auto;
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
}
.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 32px 32px;
}
.lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $main-color;
    margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
    top: 50px;
    left: 50px;
}
.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
    top: 54px;
    left: 45px;
}
.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
    top: 57px;
    left: 39px;
}
.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
    top: 58px;
    left: 32px;
}
.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
    top: 57px;
    left: 25px;
}
.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
    top: 54px;
    left: 19px;
}
.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
    top: 50px;
    left: 14px;
}
.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
    top: 45px;
    left: 10px;
}
@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
