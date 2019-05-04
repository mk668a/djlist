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
      firebase.auth().signOut().then(function() {
        console.log("logout");
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
      this.$router.push('userLogin')
    }
  },
  mounted() {
    this.email = firebase.auth().currentUser.email
    console.log("currentUser");
    console.log(firebase.auth().currentUser);
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

.userContent button {
  margin-bottom: 100px;
}

.userContent>form>* {
  margin: 30px;
}

.userContent>form>div>.el-input {
  width: 200px;
}

.userContent button>a:visited {
  color: inherit;
}
</style>
