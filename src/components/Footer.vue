<template>
<div class="footer">
  <ul class="footerLilst">
    <span>
      <li>
        <a @click="routerPush('management')" v-scroll-to="'#top'">運営</a>
      </li>
      <li>
        <a　@click="routerPush('about')" v-scroll-to="'#top'">DJ Listとは</a>
      </li>
    </span>
    <span>
      <li>
        <div class="title">Dj List</div>
      </li>
    </span>
    <span>
      <li>
        <a @click="routerPush('termsofservise')" v-scroll-to="'#top'">利用規約</a>
      </li>
      <li>
        <a @click="routerPush('privacypolicy')" v-scroll-to="'#top'">プライバシーポリシー</a>
      </li>
    </span>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    routerPush(route) {
      this.$router.push(route)
    },
    toLink(link) {
      // console.log(link);
      if (link != 'null') {
        window.open(link);
      }
    }
  }
}
</script>

<style lang="scss">
$main-color: #ec0d08;

@mixin exborder($color:#fff) {
    // 上
    text-shadow: 1px 1px 0 $color, -1px 1px 0 $color, 1px -1px 0 $color, -1px -1px 0 $color;
    // 下
    text-shadow: 1px 1px 1px $color, -1px 1px 1px $color, 1px -1px 1px $color, -1px -1px 1px $color;
}

.footer {
    padding: 50px 0 10px;
    background: linear-gradient(0rad, rgba(#fff, 1) 70%, rgba(#fff, .5) 90%, rgba(#fff, 0));
    font-family: "nicomojiPlus";

    .footerLilst {
        padding: 0;
        z-index: 100;
        li {
            margin-bottom: 20px;
            text-align: center;
            display: block;
            @include exborder(#fff);
        }

        .title {
            font-family: 'Monoton';
            color: $main-color;
        }
    }
}

@media screen and (min-width:768px) {
    .footer {
        .footerLilst {
            display: flex;
            padding: 0 5%;

            span {
                margin: auto;
                display: flex;

                &:nth-of-type(1) {
                    width: 40%;
                }

                &:nth-of-type(2) {
                    width: 20%;
                }

                &:nth-of-type(3) {
                    width: 40%;
                }

                li {
                    margin: auto;
                }

            }
        }
    }
}
</style>
