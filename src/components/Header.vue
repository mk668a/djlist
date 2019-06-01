<template>
<div class="header">
  <div @click="toUser" class="user">
    <i class="far fa-smile"></i>
  </div>
  <h1 @click="reload" class="title">
    DJ List
  </h1>
  <div @click="routerPush('postItem')" class="post">
    <i class="far fa-arrow-alt-circle-up"></i>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Header',
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
      this.$router.push('/')
      location.reload();
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
    // background: rgba(255, 255, 255, 0.5);
    height: auto;
    padding: 0 10px;
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
