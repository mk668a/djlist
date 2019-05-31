<template>
<div class="renew">
  <form method="renew">
    <img :src='item.img' />
    <div>
      <a style="color:white; ">必須</a>名　前:{{item.name}}
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
      <el-button type="primary " style="font-size:20px; " @click="postC">更新</el-button>
      <a @click="toItem(item)" v-scroll-to="'#top'">キャンセル</a>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'renew',
  props: {
    'toItem': Function,
  },
  data() {
    return {
      item: {},
      places: [""],
      urls: [""],
      genres: [""]
    };
  },
  methods: {
    cancel() {

    },
    postC() {
      var itemId
      firebase.database().ref('/items').orderByChild("name").equalTo(this.item.name).
      on("child_added", function(snapshot) {
        console.log(snapshot.val());
        itemId = snapshot.key
      })

      var places = {};
      places['/items/' + itemId + "/places"] = this.places.slice(0, -1)
      firebase.database().ref().update(places)

      var url = {};
      url['/items/' + itemId + "/url"] = this.urls.slice(0, -1)
      firebase.database().ref().update(url)

      var genre = {};
      genre['/items/' + itemId + "/genre"] = this.genres.slice(0, -1)
      firebase.database().ref().update(genre)

      this.$notify({
        title: '更新しました',
        message: this.query + 'が更新されました',
        type: 'success'
      })
      this.toItem(this.item)
    },
    getItem() {
      this.query = this.$route.query.name
      console.log(this.query);
      // if (Object.keys(this.item).length == 0) {
      let self = this
      firebase.database().ref('/items').orderByChild("name").equalTo(self.query).
      on("child_added", function(snapshot) {
        self.item = snapshot.val()
        if (self.item.places != undefined) self.places = self.item.places
        if (self.item.url != undefined) self.urls = self.item.url
        if (self.item.genre != undefined) self.genres = self.item.genre
        console.log(self.item);
      })
      // }
    }
  },
  mounted() {
    this.getItem()
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
#suggestform {
  height: 40px;
  width: 300px;
  border-radius: .3em;
  border: 1px solid #DCDFE5;
  outline: none;
  font-size: 14px;
}

#suggestform:hover {
  transition-duration: 0.3s;
  border: 1px solid #c1c1c1;
}

/* #suggestform:active{
  transition-duration: 0.3s;
  border: 1px solid #569EF8!important;
} */

.renew>form>.suggest {
  cursor: text;
}

.renew>form>.suggest>a {
  top: 0;
  line-height: 10px;
  height: 10px;
  margin: 16px 10px;
  cursor: text;
}

.renew>form>.suggest>span {
  margin: 10.5px 0;
  cursor: text;
}

.renew>form>.suggest {
  display: inline-flex;
  z-index: 3;
  text-align: center;
}

.renew>form>.el-switch.is-checked,
.renew>form>.el-switch {
  padding-top: 30px;
}

.renew>form>.suggest>.box {
  display: block;
  /* width: 100%; */
}

.renew>form>.suggest>.box>input {
  color: #606266;
}

.renew>form>.suggest>.box>.suggestItem {
  position: relative;
  text-align: left;
  cursor: pointer;
  background: white;
}

.renew>form>.suggest>.box>.suggestItem:hover {
  background: #e6e6e6;
}

.renew {
  height: 100%;
}

.renew>form>div,
.el-form.demo-dynamic {
  margin: 30px auto;
}

/*  */

.el-form-item__content>.el-input:nth-of-type(1),
.el-form-item__content>.el-input:nth-of-type(1)>.el-input__inner {
  width: 100px;
}

.el-form-item__content>.el-input:nth-of-type(2),
.el-form-item__content>.el-input:nth-of-type(2)>.el-input__inner {
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

.renew>form>.imgupload {
  background: #d2d2d2;
  padding: 40px;
}

.renew>form>img {
  margin: 30px auto;
  border-radius: 1em;
  height: 480px;
  width: auto;
}

.renew>form>div>a {
  border: solid 1px #F56C6C;
  border-radius: 0.5em;
  background-color: #F56C6C;
  font-size: 5px;
  margin: auto 10px;
}

.renew>form>.preview {
  margin: auto 100px;
}

.renew>form>div>button {
  padding: 20px 50px;
}

.renew>form>div>.el-input {
  width: auto;
}

.renew>form>div>.el-input>input {
  width: 300px;
}

.renew>form>div>.el-input:nth-child(1)>input {
  margin-left: 45px;
}

.renewContainer>form>div>input {
  height: 30px;
  border-radius: 1em;
  border: solid 1px #e6e6e6;
}

.renew>form>.preview>.original {
  border-radius: 1em;
  border: solid 1px #e6e6e6;
  overflow: hidden;
  padding: 50px;
}

.renew>form>.preview>.original>div {
  display: block;
}

.renew>form>.preview>.original>img,
.renew>img {
  width: auto;
  height: 320px;
}

.renew>form>.preview>.original>.data>h4 {
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
  .renew>form>.preview {
    margin: auto 20px !important;
  }

  .renew>form>.preview>.original>div {
    display: block;
  }

  .renew>form>.suggest {
    display: block;
    margin: auto 37.5px;
    text-align: center;
  }

  .renew>form>.suggest>.suggestItem:nth-last-of-type(1) {
    border-radius: 0 0 .3em .3em;
  }

  .el-form-item>.el-form-item__content {
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

  .renew>form>.preview>.original>img {
    width: 100%;
    height: auto;
  }

  .renew>form>img {
    height: 240px;
    width: auto;
  }

  /* .renew>form>.preview>.original>div>.data>h1::before{
    height: 0;
  } */
  .renew>form>.preview>.original>.data>h4 {
    margin: 0 !important;
    font-size: 10px;
  }
}
</style>
