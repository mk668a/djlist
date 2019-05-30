<template>
<div class="header">
  <h1 @click="routerPush('/')" class="title">
    DJ List
  </h1>
  <div @click="routerPush('postItem')" class="user">
    post
  </div>
  <div @click="toUser" class="user">
    user
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

<style>
.header {
  background: #c1c1c1;
  height: 30px;
  padding: 10px 0;
  display: flex;
}

.header .title {
  margin: auto auto auto 10px;
}

.header .user {
  margin: auto 10px auto auto;
}
</style>
