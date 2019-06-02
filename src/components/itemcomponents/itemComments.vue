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
    <div v-for="(i, index) in this.item.comments" :key="index">
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
          this.username = '匿名'
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
.itemComments{
  padding: 0 20px;
}
</style>
