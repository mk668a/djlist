<template>
<div class="userInfo">

  <h3>ユーザー情報</h3>

  <div class="userData">
    <div>
      <table>
        <tr>
          <td>メール</td>
          <td>{{email}}</td>
        </tr>
        <tr v-if="getUsername">
          <td>ユーザー名</td>
          <td>{{username}}</td>
        </tr>
        <div v-else class="purple" id="flex">
          <input type="text" placeholder="ユーザー名" v-model="username" />
          <button type="button" @click="CreateUsrename">登録</button>
        </div>
      </table>
    </div>
    <form class="purple">
      <button type="button" @click="logout">ログアウト</button>
    </form>
  </div>

  <div class="resultSpan">
    <div class="seachResult">
      <div class="liked">
        <h3>お気に入り</h3>
        <Contents :toItem="toItem" :items="likedItems" :confirmLiked="confirmLiked" :like="like" />
      </div>
      <div class="posted">
        <h3>投稿したitem</h3>
        <Contents :toItem="toItem" :items="postItems" :confirmLiked="confirmLiked" :like="like" />
      </div>
    </div>
  </div>

</div>
</template>

<script>
import firebase from 'firebase'
import Contents from '@/components/Contents'

export default {
  name: 'userInfo',
  components: {
    Contents
  },
  props: {
    "items": Array,
    "toItem": Function,
    'confirmLiked': Function,
    'like': Function
  },
  data() {
    return {
      obj: [],
      username: '',
      email: '',
      uid: '',
      postItems: [],
      likedItems: [],
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
      if (this.username != '' && this.username != 'anonymous') {
        let self = this
        firebase.auth().currentUser.updateProfile({
          displayName: self.username
        }).then(function() {
          // console.log("Update successful");
          this.$notify({
            title: 'ユーザーネームを登録しました',
            message: 'ユーザーネーム"' + this.username + '"を登録しました',
            type: 'success'
          })
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
    getPostItems(uid, items) {
      for (var i in items) {
        if (items[i].uid == firebase.auth().currentUser.uid) {
          this.postItems.push(items[i])
        }
      }
    },
    getLikedItems(uid, items) {
      for (var i in items) {
        for (var j in items[i].popular) {
          if (items[i].popular[j].uid == uid) {
            this.likedItems.push(items[i])
          }
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
          self.getPostItems(self.uid, items)
          self.getLikedItems(self.uid, items)
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
      this.getPostItems(firebase.auth().currentUser.uid, this.items)
      this.getLikedItems(firebase.auth().currentUser.uid, this.items)
    }
    console.log(this.obj);
    console.log(this.postItems);
  }
}
</script>

<style lang="scss">
$main-color: #ec0d08;

.userInfo {
    width: 100%;
    margin-top: 100px;

    h3 {
        margin-bottom: 0;
        padding-left: 20px;
    }

    .userData {
        display: block;
        width: 100%;
        margin-bottom: 40px;

        div {
            width: 80%;
            margin: 20px auto 10px;
            background: rgba(#fff, .5);
            padding: 20px 10px;
            border-radius: 0.5em;

            table {
                width: 100%;

                tr {
                    display: flex;
                    td {
                        font-size: 16px;
                        &:nth-of-type(1) {
                            width: 30%;
                            padding-right: 20px;
                        }
                    }
                }

                .purple {
                    background: transparent;
                    margin: 0;
                    padding: 20px 0;
                    width: 100%;

                    input {
                        width: 60%;
                        height: auto;
                    }

                    button {
                        width: 40%;
                    }
                }
            }
        }

        .purple {
            width: 80%;
            margin: auto;

            button {
                width: 200px;
            }
        }

    }

    .resultSpan {
        min-height: 100vh;
        z-index: 0;
        position: relative;
        top: 0;

        .seachResult {
            z-index: 0;
            position: relative;
            top: 0;

            .contents {
                min-height: 0;
            }

            div {
                h3 {
                    padding-left: 20px;
                    margin-bottom: 0;
                }
            }

            .genre,
            .name,
            .place {
                .contents {
                    button {
                        display: none;
                    }
                }
            }
        }

        .arrowUp {
            display: none;
        }
    }
}
</style>
