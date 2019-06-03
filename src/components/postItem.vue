<template>
<div class="postItem">
  <div class="postImg">
    <img :src='img' />
  </div>
  <form class="purple">

    <el-switch style="display: block" v-model="selectP" active-color="#c1c1c1" inactive-color="#c1c1c1" active-text="URL" inactive-text="アップロード">
    </el-switch>

    <div id="flex">
      <div class="itemName" id="flex">
        <h4 class="required">必須</h4>
        <h4>
          画像のURL
        </h4>
      </div>
      <input v-if="selectP" v-model="img" :rules="[{required: true, type: text}]"></input>
      <label v-else class="uploadImgUrl">
        ファイルを選択
        <input type="file" @change="selectedFile" style="display:none"></input>
      </label>
    </div>

    <div id="flex">
      <div class="itemName" id="flex">
        <h4 class="required">必須</h4>
        <h4>
          名前
        </h4>
      </div>
      <input type="text " v-model="name " required></input>
    </div>

    <div id="flex">
      <div class="itemName" id="flex">
        <p></p>
        <h4>
          活動場所
        </h4>
      </div>
      <input v-for="(place, index) in places" :key="index" type="url" v-model="places[index]" required></input>
    </div>

    <div id="flex">
      <div class="itemName" id="flex">
        <p></p>
        <h4>
          リンク
        </h4>
      </div>
      <input v-for="(url, index) in urls" :key="index" type="url" v-model="urls[index]" required></input>
    </div>

    <div id="flex">
      <div class="itemName" id="flex">
        <p></p>
        <h4>
          ジャンル
        </h4>
      </div>
      <input v-for="(genre, index) in genres" :key="index" type="url" v-model="genres[index]" required></input>
    </div>

    <div class="button" id="block">
      <div id="flex">
        <button type="button" @click="postC">投稿</button>
      </div>
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
$main-color: #EC0D08;

.postItem {
    min-height: 100vh;
    width: 100%;
    margin-top: 100px;

    div {
        h2 {
            margin: auto auto 50px;
            font-family: "nicomojiPlus";
        }
    }
    .purple {

        .itemName {
            width: 30%;
            margin-right: 0;
            margin-left: auto;

            .required {
                font-size: 10px;
                border: solid 1px $main-color;
                border-radius: 0.5em;
                background: $main-color;
                color: #fff;
                margin: auto 3px;
                height: 18px;
                padding: 1px;
            }

            h4 {
                &:nth-of-type(2) {
                    font-weight: bold;
                }
            }
        }

        .uploadImgUrl,
        input {
            width: 210px;
            margin-left: 0;
            margin-right: auto;
        }

        .uploadImgUrl {
            text-align: center;
            padding: 8px 5px;
            cursor: pointer;
            font-size: 18px;
            height: 24px;
            border-radius: 0.5em;
            border: solid 3px #a458ec;
            font-weight: bold;
            outline: none;
            color: #fff;
            background: #a458ec;
            transition: 0.6s;

            &:hover {
                color: #a458ec;
                background: #fff;
                border-color: #a458ec;
                transition: 0.3s;
            }
            &:focus {
                background: #a458ec;
                color: #fff;
                border-color: #a458ec;
            }
        }

        .button {
            div {
                width: 100%;

                button {
                    margin: auto auto 20px;
                    width: 200px;
                }
            }
        }

        svg {
            margin-left: auto;
            margin-right: 10px;
        }

        div {
            margin-bottom: 20px;

            div {
                margin-right: auto;
                margin-left: 0;
            }
        }
    }
}
</style>
