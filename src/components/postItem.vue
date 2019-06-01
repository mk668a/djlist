<template>
<div class="postItem">
  <form method="postItem">
    <img :src='img' />
    <div>
      <a style="color:white; ">必須</a>画像のURL:
      <el-switch style="display: block" v-model="selectP" active-color="#c1c1c1" inactive-color="#c1c1c1" active-text="URL" inactive-text="アップロード">
      </el-switch>
      <el-input v-if="selectP" class="uploadImgUrl" v-model="img" :rules="[{required: true, type: text}]"></el-input>
      <label v-else class="uploadImgFile">
        ファイルを選択
        <input type="file" @change="selectedFile" style="display:none"></input>
      </label>
    </div>
    <div>
      <a style="color:white; ">必須</a>名　前:
      <el-input type="text " v-model="name " required></el-input>
    </div>
    <div>
      <a style="color:white; "></a>活動場所:
      <el-input v-for="(place, index) in places" :key="index" type="url" v-model="places[index]" required></el-input>
    </div>
    <div>
      <a style="color:white; "></a>リンク:
      <el-input v-for="(url, index) in urls" :key="index" type="url" v-model="urls[index]" required></el-input>
    </div>
    <div>
      <a style="color:white; "></a>ジャンル:
      <el-input v-for="(genre, index) in genres" :key="index" type="url" v-model="genres[index]" required></el-input>
    </div>
    <div>
      <el-button type="primary " style="font-size:20px; " @click="postC">投稿</el-button>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'postItem',
  props: {
    "toItem": Function,
  },
  data() {
    return {
      img: '',
      name: '',
      places: [""],
      urls: [""],
      genres: [""],
      selectP: true,
    }
  },
  methods: {
    postC() {
      var userId = "anonymous"
      if (firebase.auth().currentUser != null) {
        userId = firebase.auth().currentUser.uid;
      }
      console.log(userId);

      if (this.name == "" || this.img == "") {
        this.$notify.error({
          title: '投稿できませんでした',
          message: '全ての必須項目に入力してください'
        })
      } else {
        
        if (this.places != "") {
          this.places = this.places.slice(0, -1)
        }
        if (this.urls != "") {
          this.urls = this.urls.slice(0, -1)
        }
        if (this.genres != "") {
          this.genres = this.genres.slice(0, -1)
        }

        var postData = {
          img: this.img,
          name: this.name,
          places: this.places,
          url: this.urls,
          genre: this.genres,
          created_at: Date.now(),
          uid: userId,
        };
        var newPostKey = firebase.database().ref('items/').push().key;

        var updates = {};
        updates['/items/' + newPostKey] = postData;

        var res = null;
        res = firebase.database().ref().update(updates);
        if (res != null) {
          this.$notify({
            title: '投稿しました',
            message: this.name + 'が投稿されました',
            type: 'success'
          })
          this.toItem(postData)
        }
        res = null;
      }
    },
    selectedFile(e) {
      e.preventDefault();
      var img = e.target.files;
      this.img = window.URL.createObjectURL(img[0]);
      console.log(this.img);
    },
  },
  watch: {
    places: {
      handler: function(val) {
        var array = []
        for (var i in this.places) {
          if (this.places[i] != "") {
            array.push(this.places[i])
          }
        }
        array.push("")
        for (var i in array) {
          this.places[i] = array[i]
        }
        this.places.length = array.length
      },
      deep: true
    },
    urls: {
      handler: function(val) {
        var array = []
        for (var i in this.urls) {
          if (this.urls[i] != "") {
            array.push(this.urls[i])
          }
        }
        array.push("")
        for (var i in array) {
          this.urls[i] = array[i]
        }
        this.urls.length = array.length
      },
      deep: true
    },
    genres: {
      handler: function(val) {
        var array = []
        for (var i in this.genres) {
          if (this.genres[i] != "") {
            array.push(this.genres[i])
          }
        }
        array.push("")
        for (var i in array) {
          this.genres[i] = array[i]
        }
        this.genres.length = array.length
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">
.postItem > form > .el-switch,
.postItem > form > .el-switch.is-checked {
    padding-top: 30px;
}

.postItem {
    height: 100%;
}

.el-form.demo-dynamic,
.postItem > form > div {
    margin: 30px auto;
}

/*  */

.el-form-item__content > .el-input:nth-of-type(1),
.el-form-item__content > .el-input:nth-of-type(1) > .el-input__inner {
    width: 100px;
}

.el-form-item__content > .el-input:nth-of-type(2),
.el-form-item__content > .el-input:nth-of-type(2) > .el-input__inner {
    width: 300px;
}

.el-form-item {
    display: flex;
}

.el-form-item__content:nth-child(1) {
    width: 100%;
}

.el-form-item__label {
    width: 40vw;
    text-align: right;
}

.el-form-item__label {
    font-size: 16px;
}

/*  */

.postItem > form > .imgupload {
    background: #d2d2d2;
    padding: 40px;
}

.postItem > form > img {
    margin: 30px auto;
    border-radius: 1em;
    height: 480px;
    width: auto;
}

.postItem > form > div > a {
    border: solid 1px #F56C6C;
    border-radius: 0.5em;
    background-color: #F56C6C;
    font-size: 5px;
    margin: auto 10px;
}

.postItem > form > .preview {
    margin: auto 100px;
}

.postItem > form > div > button {
    padding: 20px 50px;
}

.postItem > form > div > .el-input {
    width: auto;
}

.postItem > form > div > .el-input > input {
    width: 300px;
}

.postItem > form > div > .el-input:nth-child(1) > input {
    margin-left: 45px;
}

.postItemContainer > form > div > input {
    height: 30px;
    border-radius: 1em;
    border: solid 1px #e6e6e6;
}

.postItem > form > .preview > .original {
    border-radius: 1em;
    border: solid 1px #e6e6e6;
    overflow: hidden;
    padding: 50px;
}

.postItem > form > .preview > .original > div {
    display: block;
}

.postItem > form > .preview > .original > img,
.postItem > img {
    width: auto;
    height: 320px;
}

.postItem > form > .preview > .original > .data > h4 {
    display: block;
    margin: auto 50px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-upload.el-upload--text {
    background-color: #e5e5e5;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #d2d2d2;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.el-upload.el-upload--text::before {
    content: '画像選択';
    white-space: pre;
    position: absolute;
    top: 50px;
    left: 30px;
    color: #d2d2d2;
    font-size: 30px;
}

.el-icon-circle-plus-outline.avatar-uploader-icon::before {
    position: absolute;
    top: 20px;
    left: 75px;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.el-select .el-input {
    width: 110px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

@media screen and (max-width:768px) {
    .postItem > form > .preview {
        margin: auto 20px !important;
    }

    .postItem > form > .preview > .original > div {
        display: block;
    }

    .el-form-item > .el-form-item__content {
        margin: 20px auto !important;
    }

    .el-form-item {
        display: block;
        margin: auto 37.5px;
    }

    .el-form-item__content {
        margin: 0 !important;
    }

    .el-form-item__label {
        width: 300px !important;
        text-align: center;
    }

    .postItem > form > .preview > .original > img {
        width: 100%;
        height: auto;
    }

    .postItem > form > img {
        height: 240px;
        width: auto;
    }

    /* .postItem>form>.preview>.original>div>.data>h1::before{
    height: 0;
  } */
    .postItem > form > .preview > .original > .data > h4 {
        margin: 0 !important;
        font-size: 10px;
    }
}
</style>
