<template>
<div class="footer">
  <ul class="footerLilst">
    <li>
      <!-- <a @click="advertisement" v-scroll-to="'#top'">広告掲載</a> -->
      <a v-scroll-to="'#top'">運営</a>
    </li>
    <li>
      <!-- <a　@click="about" v-scroll-to="'#top'">DJ List</a> -->
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
    }
  }
}
</script>

<style>
.footer {
  background: #c1c1c1;
  padding: 10px 0;
}

.footerLilst {
  padding: 0;
}

.footerLilst li {
  text-align: center;
  display: block;
}
</style>
