<template>
  <div id="app">
    <discPanel />
    <main id="top" v-if="done">
      <Header :toform="toform" />
      <div class="container">
        <router-view
          :toItem="toItem"
          :toform="toform"
          :items="items"
          :item="item"
          :getItems="getItems"
          :unixTime2ymd="unixTime2ymd"
          :confirmLiked="confirmLiked"
          :like="like"
          :toRenew="toRenew"
          :about="about"
          :deleteAbout="deleteAbout"
          :done="done"
        />
      </div>
      <Footer />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import discPanel from "@/components/discPanel";
import firebase from "firebase";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    discPanel
  },
  data() {
    return {
      idToken: "",
      logined: true,
      items: [],
      item: {},
      database: {},
      about: true,
      done: false
    };
  },
  methods: {
    deleteAbout() {
      this.about = false;
    },
    toItem(obj) {
      this.item = obj;
      this.$router.push({
        path: "/itemMain",
        query: {
          name: obj.name
        }
      });
      window.scrollTo(0, 0);
    },
    toform(item) {
      var elem = document.activeElement.tagName;
      if (event.keyCode !== 13 && elem == "INPUT") {
        return;
      } else {
        if (item != "") {
          this.input = item;
          this.onFocus = true;
          if (this.$route.name == "searchMain") {
            this.$router.push({
              path: "/searchMain",
              query: {
                dev: this.input
              }
            });
            location.reload();
          } else {
            this.$router.push({
              path: "/searchMain",
              query: {
                dev: this.input
              }
            });
          }
        }
      }
    },
    toRenew(obj) {
      this.$router.push({
        path: "/renewItem",
        query: {
          name: obj.name
        }
      });
    },
    getItems() {
      firebase
        .database()
        .ref("/items")
        .on("value", snapshot => {
          if (snapshot) {
            const responsedata = snapshot.val();
            let items = [];
            // データオブジェクトを配列に変更する
            Object.keys(responsedata).forEach((val, key) => {
              items.push(responsedata[val]);
            });

            this.items = items;
            this.done = true;
            console.log(this.items);

            for (var i = 0; i < this.items.length; i++) {
              this.imgCheck(i);
            }
          }
        });
    },
    imgCheck(i) {
      var newImage = new Image();
      newImage.src = this.items[i].img;
      var self = this;
      newImage.onerror = function() {
        self.items[i].img =
          "https://firebasestorage.googleapis.com/v0/b/djlist-5d87e.appspot.com/o/noimg.png?alt=media&token=b45524bd-00b2-46f7-bacd-fa04710c6c62";
      };
    },
    unixTime2ymd(intTime) {
      var d = new Date(intTime);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hour = ("0" + d.getHours()).slice(-2);
      var min = ("0" + d.getMinutes()).slice(-2);
      var sec = ("0" + d.getSeconds()).slice(-2);
      return year + "/" + month + "/" + day + " (" + hour + ":" + min + ")";
    },
    confirmLiked(popular) {
      // console.log(popular);
      var userId = null;
      if (firebase.auth().currentUser == null) {
        return false;
      } else {
        userId = firebase.auth().currentUser.uid;
      }

      if (popular == undefined) {
        return false;
      }
      var flag = false;
      var obj = [];
      Object.keys(popular).forEach((val, key) => {
        obj.push(popular[val]);
      });
      // console.log(obj);
      for (var i = 0; i < obj.length; i++) {
        // console.log(obj[i].uid);
        if (obj[i].uid == userId && userId != undefined) {
          flag = true;
          break;
        }
      }
      // console.log(flag);
      return flag;
    },
    like(item) {
      // ログインしてるか確認
      if (firebase.auth().currentUser == null) {
        this.$notify.error({
          title: "ログインしてください",
          message: "お気に入りするにはログインが必要です"
        });
        return;
      }

      var userId = firebase.auth().currentUser.uid;

      let self = this;
      var itemId = null;

      firebase
        .database()
        .ref("/items")
        .orderByChild("name")
        .equalTo(item.name)
        .on("child_added", function(snapshot) {
          itemId = snapshot.key;
        });
      // console.log(itemId);

      // like済みの場合
      if (this.confirmLiked(item.popular)) {
        // console.log("削除");

        var likedId;
        firebase
          .database()
          .ref("/items/" + itemId + "/popular/")
          .orderByChild("uid")
          .equalTo(userId)
          .on("child_added", function(snapshot) {
            likedId = snapshot.key;
            // document.querySelector('#'+snapshot.key).remove()
          });
        console.log(likedId);

        var updates = {};
        updates["/items/" + itemId + "/popular/" + likedId] = null;
        // console.log(updates);
        firebase
          .database()
          .ref()
          .update(updates);
      } else {
        var postData = {
          uid: userId
        };

        var newPostKey = firebase
          .database()
          .ref()
          .child("posts")
          .push().key;

        var updates = {};
        updates["/items/" + itemId + "/popular/" + newPostKey] = postData;
        // console.log(updates);

        firebase
          .database()
          .ref()
          .update(updates);
      }
    }
  },
  created() {
    this.getItems();
  }
};
</script>

<style lang="scss">
$main-color: #ec0d08;

@font-face {
  font-family: "nicomojiPlus";
  src: url("https://dl.dropboxusercontent.com/s/2x3b8i1xtub89x7/nicomoji-plus_1.11.ttf");
}

#top {
  z-index: 200;
  position: relative;
}

body {
  background-color: #fde816;
  color: #393939;
  margin: 0;

  #app {
    font-family: "ヒラギノ丸ゴ Pro W4", "ヒラギノ丸ゴ Pro",
      "Hiragino Maru Gothic Pro", "ヒラギノ角ゴ Pro W3",
      "Hiragino Kaku Gothic Pro", "HG丸ｺﾞｼｯｸM-PRO", "HGMaruGothicMPRO";
  }

  h1 {
    font-size: 48px;
    cursor: pointer;
    color: $main-color;
    font-weight: bold;
  }

  h2 {
    color: #ec0d08;
    font-size: 38px;
  }

  h3 {
    color: #ec0d08;
    font-size: 28px;
  }

  h4 {
    font-size: 14px;
  }

  li,
  p,
  td,
  tr {
    font-weight: bold;
    font-size: 18px;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: #393939;
    &:visited {
      color: inherit;
      text-decoration: none;
    }
  }

  td {
    color: rgb(57, 57, 57);
  }

  .container {
    z-index: 0;
    padding: 20px 0;
    position: relative;
  }

  #block {
    display: block;
  }

  #flex {
    display: flex;
  }

  // form
  .purple {
    input {
      width: auto;
      padding: 10px;
      height: 30px;
      border-radius: 0.5em;
      background: transparent;
      border: solid 3px #a458ec;
      outline: none;
      font-size: 18px;

      &:focus {
        color: $main-color;
        border-color: $main-color;
      }

      // placeholder
      &::placeholder {
        color: #a458ec;
        opacity: 0.5;
        font-weight: bold;
      }
    }

    button {
      cursor: pointer;
      font-size: 18px;
      background: transparent;
      border-radius: 0.5em;
      border: solid 3px #a458ec;
      color: #a458ec;
      font-weight: bold;
      transition: 0.3s;
      outline: none;
      padding: 10px 0;

      &:hover {
        color: $main-color;
        border-color: $main-color;
      }
      &:active {
        background: #a458ec;
        color: #fff;
        border-color: #a458ec;
        transition: 0.3s;
      }
    }

    svg {
      margin-right: 10px;
      color: #a458ec;
      height: 35px;
    }
  }
}

// arrowUp
.arrowUp {
  display: flex;
  margin: 50px 0;
  height: 52px;

  .el-button {
    margin: auto;
    color: #fff;
    background: linear-gradient(0deg, #fde816 1%, #a458ec 60%, #fff);
    border-color: transparent;
    border-width: 0;
    box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.5);
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      color: #fff;
      transform: scale(0.95);
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
    }

    .el-icon-arrow-up {
      &::before {
        font-size: 30px;
        font-weight: bold;
        color: #fff;

        &:active {
          color: #fff;
        }
      }
    }
  }
}

// loading
.lds-roller {
  margin: auto;
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $main-color;
  margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
