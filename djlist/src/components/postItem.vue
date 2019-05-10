<template>
<div class="postItem">
  <form method="postItem">
    <img :src='img' />
    <div>
      <a style="color:white;"></a>画像のURL:
      <el-switch style="display: block" v-model="selectP" active-color="#c1c1c1" inactive-color="#c1c1c1" active-text="URL" inactive-text="アップロード">
      </el-switch>
      <el-input v-if="selectP" class="uploadImgUrl" v-model="img" :rules="[{required: true, type: text}]"></el-input>
      <!-- <el-upload v-else class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="img" :src="img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
      <label v-else class="uploadImgFile">
        ファイルを選択
        <input type="file" @change="selectedFile" style="display:none"></input>
      </label>
    </div>
    <div>
      <a style="color:white; ">必須</a>名　前:
      <el-input type="text " v-model="name " required></el-input>
      *カンマ区切りで入力してください
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
import axios from 'axios'

export default {
  name: 'postItem',
  props: {
    'toCharacter': Function,
  },
  data() {
    return {
      img: '',
      name: '',
      places: [""],
      urls: [""],
      genres: [""],
      pre: '',
      t: false,
      //suggest用
      onFocus: true,
      chosen: '',
      suggestlist: [],
      newsuggest: [],
      datalist: [],
      entered: false,
      backed: false,
      text: '',
      //リンク追加用
      dynamicValidateForm: {
        domains: [{
          name: '',
          link: ''
        }],
        email: ''
      },
      // addlink: false,
      domain: '',
      //
      selectP: true,
      character: {}
    };
  },
  methods: {
    //リンク追加用
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // removeDomain(item) {
    //   var index = this.dynamicValidateForm.domains.indexOf(item);
    //   if (index !== -1) {
    //     this.dynamicValidateForm.domains.splice(index, 1);
    //   }
    // },
    // addDomain() {
    //   // this.addlink = true
    //   this.dynamicValidateForm.domains.push({
    //     name: '',
    //     link: ''
    //   })
    //   console.log(this.dynamicValidateForm.domains);
    // },
    //
    postC() {
      // for (var i = 0; i < this.dynamicValidateForm.domains.length; i++) {
      //   if (this.dynamicValidateForm.domains[i].name == '' || this.dynamicValidateForm.domains[i].link == '') {
      //     this.dynamicValidateForm.domains.slice(i, 1)
      //   }
      // }
      axios
        .post('https://198o53es1f.execute-api.ap-northeast-1.amazonaws.com/dev', {
          name: this.inputname,
          wiki: this.inputwiki,
          product: this.inputproduct,
          url: this.img,
          furigana: this.inputfurigana,
          p_url: this.inputurl
          // oficial: this.inputoficial
        }, {
          headers: {
            Authorization: "Bearer " + this.idToken
          }
        })
        .then(response => {
          console.log(response);
          this.$notify({
            title: 'キャラクターを投稿しました',
            message: this.inputname + 'が投稿されました',
            type: 'success'
          })
          console.log('response.data');
          console.log(response.data);
          this.toCharacter(response.data.new_character)
        })
        .catch(error => {
          (console.log(error))
          this.$notify.error({
            title: '投稿できませんでした',
            message: '全ての必須項目に入力してください'
          })
        })
    },
    postWiki() {
      axios
        .post('https://198o53es1f.execute-api.ap-northeast-1.amazonaws.com/dev/wiki', {
          url: this.inputwiki
        }, {
          headers: {
            Authorization: "Bearer " + this.idToken
          }
        })
        .then(response => {
          this.wiki = response.data
          this.inputwiki = this.wiki.wiki
          this.t = true
          console.log(response);
          // console.log(this.wiki);
        })
        .catch(error => console.log(error))
    },
    //suggest用
    disappear() {
      this.onFocus = false
    },
    appear() {
      if (this.input == '') {
        this.onFocus = true
      }
    },
    IsArrayExists: function(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (value == array[i]) {
          return true;
        }
      }
      return false;
    },
    toform: function(item) {
      // console.log(item);
      // this.inputoficial = ''
      this.inputproduct = item
      this.onFocus = true
    },
    enter() {
      // console.log('enter');
      this.entered = true
    },
    back() {
      // console.log('back');
      this.backed = true
    },
    change(e) {
      // console.log("start axios");
      axios
        .get('https://198o53es1f.execute-api.ap-northeast-1.amazonaws.com/dev/product/s', {
          params: {
            q: e.target.value
          }
        })
        .then(response => {
          console.log(response);
          if (response.data.suggest.length == 0) { //配列が空のとき（変換してる時か、決定した時、または「ひらがな」で入力してるけどない時）
            if (this.entered == true || this.backed == true) { //Enterを押していた場合
              this.entered = false
              this.backed = false
              this.newsuggest = []
              console.log(this.newsuggest);
              for (var i = 0; i < this.datalist.length; i++) {
                if (this.datalist[i].indexOf(this.input) != -1) {
                  this.newsuggest.push(this.datalist[i])
                  this.inputurl = response.data.suggest[i].url
                }
              }
              this.suggestlist = this.newsuggest
              console.log(this.newsuggest);
            }
            return
          } else {
            this.datalist = []
            for (var i = 0; i < response.data.suggest.length; i++) {
              this.datalist.push(response.data.suggest[i].product)
              this.inputurl = response.data.suggest[i].url
            }
            this.suggestlist = this.datalist
          }
          console.log(this.inputurl);
          // console.log(response);
          // console.log(this.suggestlist);
        })
        .catch(error => console.log(error))
    },
    selectedFile(e) {
      e.preventDefault();
      var img = e.target.files;
      this.img = window.URL.createObjectURL(img[0]);
      console.log(this.img);
    },
    blobToFile(theBlob, fileName) {
      //A Blob() is almost a File() - it's just missing the two properties below which we will add
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    }
  },
  mounted() {
    this.idToken = localStorage.getItem("idToken")
  },
  watch: {
    places: {
      handler: function(val) {
        var c = 0
        for(var i=0; i<this.places.length; i++){
          if(this.places[i]!=""){
            c++
          }
        }
        this.places.length = c+1
        this.places[c]=""
        console.log("places");
        console.log(val);
      },
      deep: true
    },
    urls: {
      handler: function(val) {
        var c = 0
        for(var i=0; i<this.urls.length; i++){
          if(this.urls[i]!=""){
            c++
          }
        }
        this.urls.length = c+1
        this.urls[c]=""
        console.log("urls");
        console.log(val);
      },
      deep: true
    },
    genres: {
      handler: function(val) {
        var c = 0
        for(var i=0; i<this.genres.length; i++){
          if(this.genres[i]!=""){
            c++
          }
        }
        this.genres.length = c+1
        this.genres[c]=""
        console.log("genres");
        console.log(val);
      },
      deep: true
    }
  },
}
</script>

<style>
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

.postItem>form>.suggest {
  cursor: text;
}

.postItem>form>.suggest>a {
  top: 0;
  line-height: 10px;
  height: 10px;
  margin: 16px 10px;
  cursor: text;
}

.postItem>form>.suggest>span {
  margin: 10.5px 0;
  cursor: text;
}

.postItem>form>.suggest {
  display: inline-flex;
  z-index: 3;
  text-align: center;
}

.postItem>form>.el-switch.is-checked,
.postItem>form>.el-switch {
  padding-top: 30px;
}

.postItem>form>.suggest>.box {
  display: block;
  /* width: 100%; */
}

.postItem>form>.suggest>.box>input {
  color: #606266;
}

.postItem>form>.suggest>.box>.suggestItem {
  position: relative;
  text-align: left;
  cursor: pointer;
  background: white;
}

.postItem>form>.suggest>.box>.suggestItem:hover {
  background: #e6e6e6;
}

.postItem {
  height: 100%;
}

.postItem>form>div,
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

.postItem>form>.imgupload {
  background: #d2d2d2;
  padding: 40px;
}

.postItem>form>img {
  margin: 30px auto;
  border-radius: 1em;
  height: 480px;
  width: auto;
}

.postItem>form>div>a {
  border: solid 1px #F56C6C;
  border-radius: 0.5em;
  background-color: #F56C6C;
  font-size: 5px;
  margin: auto 10px;
}

.postItem>form>.preview {
  margin: auto 100px;
}

.postItem>form>div>button {
  padding: 20px 50px;
}

.postItem>form>div>.el-input {
  width: auto;
}

.postItem>form>div>.el-input>input {
  width: 300px;
}

.postItem>form>div>.el-input:nth-child(1)>input {
  margin-left: 45px;
}

.postItemContainer>form>div>input {
  height: 30px;
  border-radius: 1em;
  border: solid 1px #e6e6e6;
}

.postItem>form>.preview>.original {
  border-radius: 1em;
  border: solid 1px #e6e6e6;
  overflow: hidden;
  padding: 50px;
}

.postItem>form>.preview>.original>div {
  display: block;
}

.postItem>form>.preview>.original>img,
.postItem>img {
  width: auto;
  height: 320px;
}

.postItem>form>.preview>.original>.data>h4 {
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
  .postItem>form>.preview {
    margin: auto 20px !important;
  }

  .postItem>form>.preview>.original>div {
    display: block;
  }

  .postItem>form>.suggest {
    display: block;
    margin: auto 37.5px;
    text-align: center;
  }

  .postItem>form>.suggest>.suggestItem:nth-last-of-type(1) {
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

  .postItem>form>.preview>.original>img {
    width: 100%;
    height: auto;
  }

  .postItem>form>img {
    height: 240px;
    width: auto;
  }

  /* .postItem>form>.preview>.original>div>.data>h1::before{
    height: 0;
  } */
  .postItem>form>.preview>.original>.data>h4 {
    margin: 0 !important;
    font-size: 10px;
  }
}
</style>
