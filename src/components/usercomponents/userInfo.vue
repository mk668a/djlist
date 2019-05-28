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
  <button @click="logout">ログアウト</button>
  <userContents :postItems="postItems" :toItem="toItem"/>
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
    "toItem": Function
  },
  data() {
    return {
      obj: [],
      username: '',
      email: '',
      uid: '',
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
    },
    getUser() {
      let self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("currentUser");
          console.log(firebase.auth().currentUser);

          var currentUser = firebase.auth().currentUser

          self.email = currentUser.email
          self.username = currentUser.displayName
          self.uid = currentUser.uid

          if (currentUser != null) {
            self.getUsername = true
            console.log("getUsername: " + self.username);
          }
        }
      })
    },
    getUserItems(uid, items) {
      for (var i in items) {
        if (items[i].uid == firebase.auth().currentUser.uid) {
          this.postItems.push(items[i])
        }
      }
    },
    getItems() {
      console.log(this.items.length);
      let self = this
      firebase.database().ref('/items').on('value', snapshot => {
        if (snapshot) {
          const responsedata = snapshot.val()
          let items = []
          // データオブジェクトを配列に変更する
          Object.keys(responsedata).forEach((val, key) => {
            items.push(responsedata[val])
          })
          self.obj = items
          self.getUserItems(self.uid, items)
        }
      })
    }
  },
  created() {
    this.obj = this.items
    this.getUser()
    if (this.items.length == 0) {
      this.getItems()
    } else {
      this.getUserItems(firebase.auth().currentUser.uid, this.items)
    }
    console.log(this.obj);
    console.log(this.postItems);
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
