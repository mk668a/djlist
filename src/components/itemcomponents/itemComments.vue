<template>
<div class="itemComments">
  <h3 style="text-align:left;">
    Comments
  </h3>
  <el-form ref="form" v-model="form">
    <el-form-item　class="commentform">
      <el-input v-model="commentform"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="addComment()" round>コメントする</el-button>
    </el-form-item>
  </el-form>
  <div class="commentContainer">
    <div v-for="(i, index) in this.item.comments" :key="index" class="comment">
      <a>
        {{i.username}}
      </a>
      <div>
        {{unixTime2ymd(i.created_at)}}
      </div>
      <div>
        {{i.comment}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'itemComments',
  props: {
    'item': Object,
    'unixTime2ymd': Function
  },
  data() {
    return {
      form: '',
      commentform: '',
      userId: null,
      username: null,
      itemId: null,
    }
  },
  methods: {
    addComment() {
      let self = this
      firebase.database().ref('/items').orderByChild("name").equalTo(this.item.name).
      on("child_added", function(snapshot) {
        self.itemId = snapshot.key
        console.log(self.itemId);
      })

      if (this.commentform != '') {

        if (firebase.auth().currentUser == null) {
          this.userId = 'none'
          this.username = 'anonymous'
        } else {
          this.username = firebase.auth().currentUser.displayName
        }

        var postData = {
          comment: this.commentform,
          created_at: Date.now(),
          uid: this.userId,
          username: this.username
        }

        var newPostKey = firebase.database().ref().child('posts').push().key;

        var updates = {};
        updates['/items/' + this.itemId + '/comments/' + newPostKey] = postData;

        console.log(updates);

        var res = null;
        res = firebase.database().ref().update(updates);
        if (res != null) {
          this.$notify({
            title: '投稿しました',
            message: this.item.name + 'にコメントを投稿しました',
            type: 'success'
          })
          this.commentform = ''
          firebase.database().ref('/items').orderByChild("name").equalTo(this.item.name).
          on("child_added", function(snapshot) {
            self.item.comments = snapshot.val().comments
          })
        }
        res = null;
      }
    },
  },
  created() {}
}
</script>

<style lang="scss">
$main-color: #EC0D08;

.itemComments {
    padding: 0 50px;

    .el-form {
        width: 100%;
        display: flex;
        .el-form-item.commentform {
            width: 70%;
            input {
                background: transparent;
                border: solid 3px #a458ec;

                &:focus {
                    color: $main-color;
                    border-color: $main-color;
                }
            }
        }
        .el-form-item {
            margin-left: 10px;
            .el-form-item__content {
                button {
                    background: transparent;
                    border: solid 3px #a458ec;
                    color: #a458ec;
                    font-weight: bold;

                    &:hover {
                        color: $main-color;
                        border-color: $main-color;
                    }
                    &:focus {
                        background: #a458ec;
                        color: #fff;
                        border-color: #a458ec;
                    }
                }
            }
        }
    }

    .commentContainer {
        max-height: 100vh;
        overflow-y: scroll;

        .comment {
            background: rgba(#fff, .5);
            padding: 20px 10px;
            border-radius: 0.5em;
            margin-bottom: 10px;

            a {
                color: rgba(#a458ec, 0.8);
                font-weight: bold;
                font-size: 150%;
            }

            div {
                &:nth-of-type(1) {
                    color: #939393;
                }

                &:nth-of-type(2) {
                    font-size: 120%;
                }

            }
        }
    }
}
</style>
