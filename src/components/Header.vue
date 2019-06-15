<template>
<div class="header">
  <div @click="toUser" class="user">
    <i class="far fa-smile"></i>
  </div>
  <h1 @click="reload" class="title">
    Dj List
  </h1>
  <div @click="routerPush('postItem')" class="post">
    <i class="far fa-arrow-alt-circle-up"></i>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import Search from '@/components/Search'

export default {
  name: 'Header',
  data() {
    return {
      flagSearch: true,
    }
  },
  components: {
    Search
  },
  props: {
    'toform': Function
  },
  methods: {
    routerPush(route) {
      this.$router.push(route)
    },
    toUser() {
      if (firebase.auth().currentUser == null) {
        this.$router.push('userLogin')
      } else {
        this.$router.push('userInfo')
      }
    },
    reload() {
      if (this.$route.name == 'Main') {
        location.reload();
        this.$router.push('/')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">
$main-color: #ec0d08;
@mixin exborder($color:#fff) {
    // 上
    text-shadow: 1.5px 1.5px 0 $color, -1.5px 1.5px 0 $color, 1.5px -1.5px 0 $color, -1.5px -1.5px 0 $color;
    // 下
    text-shadow: 1.5px 1.5px 1.5px $color, -1.5px 1.5px 1.5px $color, 1.5px -1.5px 1.5px $color, -1.5px -1.5px 1.5px $color;
}
@import url('https://fonts.googleapis.com/css?family=Monoton&display=swap');

.header {
    z-index: 100;
    display: block;
    height: 100px;
    width: 90%;
    padding: 0 5%;
    position: fixed;
    background: #fff;

    // background: rgba(255, 255, 255, 0.5);
    display: flex;

    .user {
        margin: auto auto auto 0;
    }

    .title {
        margin: auto;
        // @include exborder(#EC0D08);
        color: $main-color;
        // font-family: "Kingthings_Foundation";
        font-family: 'Monoton';
    }

    .post {
        margin: auto 0 auto auto;
    }

    i {
        font-size: 28px;
        cursor: pointer;
        color: $main-color;
        height: 100%;
    }
}
</style>
