<template>
<div class="footer">
  <ul class="footerLilst">
    <li>
      <!-- <a @click="toLink()" >運営</a> -->
      <a v-scroll-to="'#top'">運営</a>
    </li>
    <li>
      <a　@click="routerPush('about')" v-scroll-to="'#top'">DJ Listとは</a>
    </li>
    <li>
      <div class="title">DJ List</div>
    </li>
    <li>
      <a @click="routerPush('termsofservise')" v-scroll-to="'#top'">利用規約</a>
    </li>
    <li>
      <a @click="routerPush('privacypolicy')" v-scroll-to="'#top'">プライバシーポリシー</a>
    </li>
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
      console.log(link);
      if (link != 'null') {
        window.open(link);
      }
    }
  }
}
</script>

<style lang="scss">
@mixin exborder($color:#fff) {
    // 上
    text-shadow: 1px 1px 0 $color, -1px 1px 0 $color, 1px -1px 0 $color, -1px -1px 0 $color;
    // 下
    text-shadow: 1px 1px 1px $color, -1px 1px 1px $color, 1px -1px 1px $color, -1px -1px 1px $color;
}

.footer {
    background: #c1c1c1;
    padding: 10px 0;

    .footerLilst {
        padding: 0;
        li {
            text-align: center;
            display: block;
        }

        .title{
          @include exborder(#EC0D08);
          color: #c1c1c1;
        }
    }
}
</style>
