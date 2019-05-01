<template>
<div class="header">
  <h1 @click="home" class="title">
    DJ List
  </h1>
  <div @click="userMain" class="user">
    user
  </div>
</div>
</template>

<script>
export default {
  name: 'Header',
  methods:{
    home(){

      this.$router.push('/')
    },
    userMain(){
      this.$router.push('/userMain')
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
