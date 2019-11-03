<template>
  <div class="postItem">
    <div id="flex">
      <h2>POST</h2>
    </div>

    <div class="postImg">
      <div>
        <img :src="img" />
      </div>
    </div>

    <form class="purple">
      <div id="flex" class="imageSwitch">
        <h4></h4>
        <el-switch
          style="display: block"
          v-model="selectP"
          active-text="URL"
          inactive-text="アップロード"
        ></el-switch>
      </div>

      <div id="flex">
        <div class="itemName" id="flex">
          <h4>
            <a style="color:#ec0d08">*</a>画像のURL
          </h4>
        </div>
        <input v-if="selectP" v-model="img" :rules="[{required: true}]" />
        <label v-else class="uploadImgUrl">
          ファイルを選択
          <input type="file" @change="selectedFile" style="display:none" />
        </label>
      </div>

      <div id="flex">
        <div class="itemName" id="flex">
          <h4>
            <a style="color:#ec0d08">*</a>名前
          </h4>
        </div>
        <input type="text " v-model="name " required />
      </div>

      <div id="flex">
        <div class="itemName" id="flex">
          <p></p>
          <h4>活動場所</h4>
        </div>
        <div id="block" class="dynamicInput">
          <input
            v-for="(place, index) in places"
            :key="index"
            type="url"
            v-model="places[index]"
            required
          />
        </div>
      </div>

      <div id="flex">
        <div class="itemName" id="flex">
          <p></p>
          <h4>リンク</h4>
        </div>
        <div id="block" class="dynamicInput">
          <input
            v-for="(url, index) in urls"
            :key="index"
            type="url"
            v-model="urls[index]"
            required
          />
        </div>
      </div>

      <div id="flex">
        <div class="itemName" id="flex">
          <p></p>
          <h4>ジャンル</h4>
        </div>
        <div id="block" class="dynamicInput">
          <input
            v-for="(genre, index) in genres"
            :key="index"
            type="url"
            v-model="genres[index]"
            required
          />
        </div>
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
import firebase from "firebase";

export default {
  name: "postItem",
  props: {
    toItem: Function
  },
  data() {
    return {
      img: "",
      localimg: {},
      name: "",
      places: [""],
      urls: [""],
      genres: [""],
      selectP: true
    };
  },
  methods: {
    postimg() {
      var storageRef = firebase.storage().ref();
      var ImagesRef = storageRef.child(
        "images/" + Date.now() + "_" + this.localimg[0].name
      );
      ImagesRef.put(this.localimg[0]).then(function(snapshot) {
        // console.log(snapshot);
      });
      return ImagesRef;
    },
    postC() {
      var userId = "anonymous";
      var date = Date.now();
      if (firebase.auth().currentUser != null) {
        userId = firebase.auth().currentUser.uid;
      }
      // console.log(userId);

      if (this.name == "" || this.img == "") {
        this.$notify.error({
          title: "投稿できませんでした",
          message: "全ての必須項目に入力してください"
        });
      } else {
        if (this.places != "") {
          this.places = this.places.slice(0, -1);
        }
        if (this.urls != "") {
          this.urls = this.urls.slice(0, -1);
        }
        if (this.genres != "") {
          this.genres = this.genres.slice(0, -1);
        }

        var tentetive_postData = {
          img: this.img,
          name: this.name,
          places: this.places,
          url: this.urls,
          genre: this.genres,
          created_at: date,
          uid: userId
        };

        if (this.selectP == false) {
          var img = this.postimg();
          var name = img.name;
          var bucket = img.bucket;
          var ref =
            "https://firebasestorage.googleapis.com/v0/b/" +
            bucket +
            "/o/images%2F" +
            name;
          var url = ref + "?alt=media&token=" + ref.downloadTokens;
          this.img = url;
        }

        var postData = {
          img: this.img,
          name: this.name,
          places: this.places,
          url: this.urls,
          genre: this.genres,
          created_at: date,
          uid: userId
        };
        // var newPostKey = firebase.database().ref('items/').push().key;

        var updates = {};
        updates["/items/" + this.name + "_" + date] = postData;

        var res = null;
        res = firebase
          .database()
          .ref()
          .update(updates);
        if (res != null) {
          this.$notify({
            title: "投稿しました",
            message: this.name + "が投稿されました",
            type: "success"
          });
          this.toItem(tentetive_postData);
        }
        res = null;
      }
    },
    selectedFile(e) {
      e.preventDefault();
      this.localimg = e.target.files;
      this.img = window.URL.createObjectURL(e.target.files[0]);
      // console.log(this.localimg);
    }
  },
  watch: {
    places: {
      handler: function(val) {
        var array = [];
        for (var i in this.places) {
          if (this.places[i] != "") {
            array.push(this.places[i]);
          }
        }
        array.push("");
        for (var i in array) {
          this.places[i] = array[i];
        }
        this.places.length = array.length;
      },
      deep: true
    },
    urls: {
      handler: function(val) {
        var array = [];
        for (var i in this.urls) {
          if (this.urls[i] != "") {
            array.push(this.urls[i]);
          }
        }
        array.push("");
        for (var i in array) {
          this.urls[i] = array[i];
        }
        this.urls.length = array.length;
      },
      deep: true
    },
    genres: {
      handler: function(val) {
        var array = [];
        for (var i in this.genres) {
          if (this.genres[i] != "") {
            array.push(this.genres[i]);
          }
        }
        array.push("");
        for (var i in array) {
          this.genres[i] = array[i];
        }
        this.genres.length = array.length;
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
$main-color: #ec0d08;

.postItem {
  button,
  h4,
  span {
    font-family: "nicomojiPlus";
  }

  min-height: 100vh;
  width: 100%;
  margin-top: 100px;

  div {
    h2 {
      margin: auto auto 20px;
      font-family: "nicomojiPlus";
    }
  }

  .postImg {
    display: flex;
    height: auto;
    width: 100%;

    div {
      width: 80%;
      height: 80%;
      margin: auto;

      img {
        width: 100%;
        height: auto;
        margin-bottom: 30px;
        border-radius: 0.5em;
      }
    }
  }

  .purple {
    .itemName {
      width: 30%;
      margin-right: 0;
      margin-left: auto;
      padding-left: 10px;

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

    #flex {
      .dynamicInput {
        width: 236px;

        input {
          margin-bottom: 10px;
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
      padding: 10px;
      cursor: pointer;
      font-size: 18px;
      height: 30px;
      border-radius: 0.5em;
      border: solid 3px #a458ec;
      font-weight: bold;
      outline: none;
      color: #fff;
      background: #a458ec;
      transition: 0.3s;

      &:hover {
        color: #a458ec;
        background: #fff;
        border-color: #a458ec;
      }
      &:active {
        background: #a458ec;
        color: #fff;
        border-color: #a458ec;
        transition: 0.3s;
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

    .imageSwitch {
      h4 {
        width: 30%;
        margin-right: 0;
        margin-left: auto;
      }

      .el-switch__core {
        background: transparent;
        border-color: #a458ec;
        border-width: 2px;
        height: 24.5px;
        width: 50px !important;
        border-radius: 30px;

        &:after {
          background: transparent;
          border: 2px solid #a458ec;
          top: 1.5px;
          width: 14px;
          height: 14px;
        }
      }

      .el-switch {
        .el-switch__label.is-active {
          color: #a458ec;
        }

        .is-checked .el-switch__core {
          border-color: #a458ec;
          border-width: 2px;

          &::after {
            margin-left: -20px !important;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .postImg {
    div {
      width: 40% !important;
      height: 40% !important;
    }
  }
}
</style>
