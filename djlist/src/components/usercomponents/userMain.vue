<template>
<div class="userMain">
  <!-- <userLogin v-if="!logined"></userLogin> -->
  <userLogin></userLogin>
</div>
</template>

<script>
import userLogin from '@/components/usercomponents/userLogin'

export default {
  name: 'userMain',
  components: {
    userLogin
  },
  props: {
    // 'width': Number,
    // 'display': Function,
    // 'logined': Boolean,
    // 'idToken': String,
    // 'suggestlist' : Array
  },
  mounted(){
    // if(this.logined==true){
    //   this.$router.push('postMain')
    // }
  }
}
</script>

<style>
.userMain {
  transition-delay: 3s;
}

.userMain>img {
  position: absolute;
  height: 400px;
  width: auto;
}

.userMain>img:nth-of-type(1) {
  top: 200px;
  left: 100px;
}

.userMain>img:nth-of-type(2) {
  right: 100px;
}
</style>
