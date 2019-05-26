<template>
<div class="itemComments">
  <h3 style="text-align:left;">
    コメント
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
    <div v-for="(i, index) in commentlist" :key="index">
      <!-- <a v-text="index+1+'.'"></a> -->
      <a>
        {{i.uid}}
      </a>
      <div>
        {{unixTime2ymd(i.created_at)}}
      </div>
      <div>
        {{i.comment}}
      </div>
      <!-- <v-icon name="corner-up-left" style="width:20px;"></v-icon> -->
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
      commentlist: [{
        comment: '',
        created_at: '',
        uid: ''
      }],
      userId: null,
      itemId: null,
      numOfComment: null
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

        this.userId = '匿名'

        var postData = {
          comment: this.commentform,
          created_at: Date.now(),
          uid: this.userId,
        }

        var newPostKey = firebase.database().ref().child('posts').push().key;

        var updates = {};
        updates['/items/' + this.itemId + '/comments/' + newPostKey] = postData;

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
            self.commentlist = snapshot.val().comments
          })
        }
        res = null;
      }
    },
  },
  created() {
    this.commentlist = this.item.comments
    console.log("this.commentlist");
    console.log(this.commentlist);
  }
}
</script>

<style>
.itemComments {
  margin: auto 30px;
}

.itemComments>.commentContainer {
  text-align: left;
  margin-bottom: 30px;
}

.itemComments>.commentContainer>div {
  margin: 10px auto;
  padding: 10px;
  background: #f4f4f4;
  border-radius: .3em;
}

.itemComments>.commentContainer>div>a {
  color: #96d4f4;
  font-size: 18px;
}

.itemComments>.commentContainer>div>div:nth-of-type(1) {
  color: #b1b1b1;
  font-size: 14px;
}

.itemComments>.commentContainer>div>div:nth-of-type(2) {
  color: gray;
}

.itemComments>.commentContainer>div>img.icon.icon-corner-up-left {
  color: #a1a1a1;
  display: block;
  margin-left: auto;
  margin-right: 5px;
}

.commentform {
  display: flex;
}

.commentform>div {
  width: 100%;
}

.commentform>div>.el-input,
.commentform>div>.el-input>.el-input__inner {
  width: 600px;
}

@media screen and (max-width:768px) {
  .itemComments>.el-form>.el-form-item>.el-form-item__content {
    display: flex;
  }

  .itemComments>.el-form>.el-form-item>.el-form-item__content>.el-input>input {
    width: 60px;
    height: 100%
  }

  .itemComments>.el-form>.el-form-item>.el-form-item__content>.el-input>input {
    width: 100%;
  }

  .commentform>div>.el-input,
  .commentform>div>.el-input>.el-input__inner {
    width: 300px;
  }
}
</style>
