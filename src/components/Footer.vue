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
.footer {
    background: #c1c1c1;
    padding: 10px 0;

    .footerLilst {
        padding: 0;
        li {
            text-align: center;
            display: block;
        }
    }
}
</style>
