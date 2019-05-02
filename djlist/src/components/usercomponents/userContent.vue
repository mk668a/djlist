<template>
<div class="userContent">
  <h2>ユーザー情報</h2>
    <div>
      メール: {{email}}
    </div>
  <button @click="logout">ログアウト</button>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'userContent',
  data() {
    return {
      username: '',
      email: '',
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('jwt')
        this.$router.push('/signin')
      })
    }
  },
  mounted(){
    this.email = firebase.auth().currentUser
  }
}
</script>

<style>
.userContent>form {
  margin: 100px auto auto;
}

.userContent>h2 {
  color: #f2cf01;
  padding-top: 30px;
}

.userContent>button {
  margin-bottom: 100px;
}

.userContent>form>* {
  margin: 30px;
}

.userContent>form>div>.el-input {
  width: 200px;
}

.userContent>button a:visited {
  color: inherit;
}
</style>
