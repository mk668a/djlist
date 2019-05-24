<template>
<div class="header">
  <h1 @click="home" class="title">
    DJ List
  </h1>
  <div @click="toPost" class="user">
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
    home() {
      this.$router.push('/')
    },
    toUser() {
      if (firebase.auth().currentUser == null) {
        this.$router.push('userLogin')
      } else {
        this.$router.push('userInfo')
      }
    },
    toPost() {
      this.$router.push('postItem')
    }
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
