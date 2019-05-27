<template>
<div class="userInfo">
  <h2>ユーザー情報</h2>
  <div>
    メール: {{email}}
  </div>
  <div v-if="!getUsername">
    <input type="text" placeholder="ユーザー名" v-model="username" />
    <button @click="CreateUsrename">登録</button>
  </div>
  <div v-else>
    ユーザー名: {{username}}
  </div>
  <userContents :postItems="postItems" />
  <button @click="logout">ログアウト</button>
</div>
</template>

<script>
import firebase from 'firebase'
import userContents from '@/components/usercomponents/userContents'

export default {
  name: 'userInfo',
  components: {
    userContents
  },
  props: {
    "items": Array,
  },
  data() {
    return {
      username: '',
      email: '',
      postItems: [],
      getUsername: false
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
    },
    CreateUsrename() {
      if (this.username != '') {
        let self = this
        firebase.auth().currentUser.updateProfile({
          displayName: self.username
        }).then(function() {
          console.log("Update successful");
          self.getUsername = true
          self.$router.push('userInfo')
        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  },
  created() {
    this.email = firebase.auth().currentUser.email
    this.username = firebase.auth().currentUser.displayName
    if(this.username!=null){
      self.getUsername = true
    }
    console.log("currentUser");
    console.log(firebase.auth().currentUser);
    for (var i in this.items) {
      if (this.items[i].uid == firebase.auth().currentUser.uid) {
        this.postItems.push(this.items[i])
      }
    }
  }
}
</script>

<style>
.userInfo>form {
  margin: 100px auto auto;
}

.userInfo>h2 {
  color: #f2cf01;
  padding-top: 30px;
}

.userInfo button {
  margin-bottom: 100px;
}

.userInfo>form>* {
  margin: 30px;
}

.userInfo>form>div>.el-input {
  width: 200px;
}

.userInfo button>a:visited {
  color: inherit;
}
</style>
