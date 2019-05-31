<template>
<div class="header">
  <div @click="toUser" class="user">
    <i class="el-icon-user"></i>
  </div>
  <h1 @click="routerPush('/')" class="title">
    DJ List
  </h1>
  <div @click="routerPush('postItem')" class="post">
    <i class="el-icon-upload2"></i>
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

.header {
    background: rgba(255, 255, 255, 0.5);
    height: auto;
    padding: 0 10px;
    display: flex;

    .user {
        margin: auto auto auto 0;
    }

    .title {
        margin: auto;
        @include exborder(#EC0D08);
        color: #fff;
    }

    .post {
        margin: auto 0 auto auto;
    }

    i {
        cursor: pointer;
        color: #EC0D08;
        height: 100%;
    }
}
</style>
