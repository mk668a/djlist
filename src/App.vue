<template>
<div id="app">
  <discPanel />
  <main id="top">
    <Header :toform="toform" />
    <div class="container">
      <router-view :toItem="toItem" :toform="toform" :items="items" :item="item" :getItems="getItems" :unixTime2ymd="unixTime2ymd" :confirmLiked="confirmLiked" :like="like" :toRenew="toRenew" :about="about" :deleteAbout="deleteAbout" :tags="tags"
        :getTags="getTags" />
    </div>
    <Footer />
  </main>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import discPanel from '@/components/discPanel'
import firebase from 'firebase'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    discPanel
  },
  data() {
    return {
      idToken: '',
      logined: true,
      items: [],
      item: {},
      database: {},
      about: true,
      tags: [],
      tagstyle: "position: absolute; right: -100vw"
    }
  },
  methods: {
    deleteAbout() {
      this.about = false
    },
    toItem(obj) {
      this.item = obj
      this.$router.push({
        path: '/itemMain',
        query: {
          name: obj.name
        }
      })
    },
    toform(item) {
      console.log(this.$route.name);
      // console.log(item);
      if (item != '') {
        this.input = item
        this.onFocus = true
        if (this.$route.name == 'searchMain') {
          this.$router.push({
            path: '/searchMain',
            query: {
              dev: this.input
            }
          })
          location.reload();
        } else {
          this.$router.push({
            path: '/searchMain',
            query: {
              dev: this.input
            }
          })
        }
      }
    },
    toRenew(obj) {
      this.$router.push({
        path: '/renewItem',
        query: {
          name: obj.name
        }
      })
    },
    getItems() {
      firebase.database().ref('/items').on('value', snapshot => {
        if (snapshot) {
          const responsedata = snapshot.val()
          let items = []
          // データオブジェクトを配列に変更する
          Object.keys(responsedata).forEach((val, key) => {
            items.push(responsedata[val])
          })
          this.items = items
          this.getTags(items)
          console.log(this.items);
        }
      })
    },
    IsArrayExists(array, value) {
      var flag = true
      for (var i = 0, len = array.length; i < len; i++) {
        if (value == array[i]) {
          flag = false
        }
      }
      return flag;
    },
    getTags(items) {
      var tags = document.querySelector('.tags');
      this.tags = []

      var tagsWidth = tags.offsetWidth;

      var width = 0;

      while (width < tagsWidth / 10) {
        var random = Math.floor(Math.random() * items.length);
        var index = Math.floor(Math.random() * 3);
        var item = ""

        if (index == 0) {
          item = items[random].name
        }
        if (index == 1) {
          var j = Math.floor(Math.random() * items.length);
          item = items[random].places[j]
        }
        if (index == 2) {
          var k = Math.floor(Math.random() * items.length);
          item = items[random].genre[k]
          // console.log(item);
        }

        if (item != undefined && item != "" && this.IsArrayExists(this.tags, item)) {
          this.tags.push(item)
          // console.log(item);

          tags = document.querySelector('.tags');
          tagsWidth = tags.offsetWidth;
          // console.log(tagsWidth);

          width += item.length
          // console.log(width);
        }

      }
    },
    unixTime2ymd(intTime) {
      var d = new Date(intTime);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hour = ('0' + d.getHours()).slice(-2);
      var min = ('0' + d.getMinutes()).slice(-2);
      var sec = ('0' + d.getSeconds()).slice(-2);
      return (year + '/' + month + '/' + day + ' (' + hour + ':' + min + ')');
    },
    confirmLiked(popular) {
      // console.log(popular);
      var userId = null
      if (firebase.auth().currentUser == null) {
        return false
      } else {
        userId = firebase.auth().currentUser.uid
      }

      if (popular == undefined) {
        return false
      }
      var flag = false
      var obj = []
      Object.keys(popular).forEach((val, key) => {
        obj.push(popular[val])
      })
      // console.log(obj);
      for (var i = 0; i < obj.length; i++) {
        // console.log(obj[i].uid);
        if (obj[i].uid == userId && userId != undefined) {
          flag = true
          break
        }
      }
      // console.log(flag);
      return flag
    },
    like(item) {
      // ログインしてるか確認
      if (firebase.auth().currentUser == null) {
        this.$notify.error({
          title: 'ログインしてください',
          message: 'お気に入りするにはログインが必要です',
        })
        return
      }

      var userId = firebase.auth().currentUser.uid

      let self = this
      var itemId = null

      firebase.database().ref('/items').orderByChild("name").equalTo(item.name).
      on("child_added", function(snapshot) {
        itemId = snapshot.key
      })
      // console.log(itemId);

      // like済みの場合
      if (this.confirmLiked(userId, item.popular)) {
        console.log("削除");

        var likedId
        firebase.database().ref('/items/' + itemId + '/popular/').orderByChild("uid").equalTo(userId).
        on("child_added", function(snapshot) {
          likedId = snapshot.key
          // document.querySelector('#'+snapshot.key).remove()
        })
        console.log(likedId);

        var updates = {};
        updates['/items/' + itemId + '/popular/' + likedId] = null
        // console.log(updates);
        firebase.database().ref().update(updates);

      } else {
        var postData = {
          uid: userId,
        }

        var newPostKey = firebase.database().ref().child('posts').push().key;

        var updates = {};
        updates['/items/' + itemId + '/popular/' + newPostKey] = postData;
        // console.log(updates);

        firebase.database().ref().update(updates);
      }
    },
  },
  created() {
    this.getItems()
  }
}
</script>

<style lang="scss">
$main-color: #EC0D08;

@font-face {
    font-family: "Kingthings_Foundation";
    src: url("https://dl.dropboxusercontent.com/s/junww0gr4uxkc9h/Kingthings_Foundation.otf");
}

@font-face {
    font-family: "KSblockblock";
    src: url("https://dl.dropboxusercontent.com/s/r5sdu2jjwpx4zbn/KSblockblock.otf");
}

@font-face {
    font-family: "nicomojiPlus";
    src: url("https://dl.dropboxusercontent.com/s/2x3b8i1xtub89x7/nicomoji-plus_1.11.ttf");
}

@font-face {
    font-family: "Canterbury";
    src: url("https://dl.dropboxusercontent.com/s/h5a6qi2p7qvcv7t/Canterbury.ttf");
}

#top {
    z-index: 200;
    position: relative;
}

body {
    background-color: #FDE816;
    color: #393939;
    // background: url("./assets/lightshow.jpg") no-repeat center;
    // background-size: cover;
    margin: 0;

    #app {
        font-family: "ヒラギノ丸ゴ Pro W4","ヒラギノ丸ゴ Pro","Hiragino Maru Gothic Pro","ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","HG丸ｺﾞｼｯｸM-PRO","HGMaruGothicMPRO";
        // letter-spacing: 1.2px;
        // font-family: 'Avenir', Helvetica, Arial, sans-serif;
        // font-family: 'ヒラギノ明朝 ProN W6', 'HiraMinProN-W6', 'HiraMinProN-W6', 'Avenir', Helvetica, Arial, sans-serif;
        /* -webkit-font-smoothing: antialiased; */
        /* -moz-osx-font-smoothing: grayscale; */
    }

    h1 {
        font-size: 48px;
        cursor: pointer;
        color: $main-color;
        font-weight: bold;
    }

    h2 {
        color: #EC0D08;
        font-size: 38px;
    }

    h3 {
        color: #EC0D08;
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
        cursor: pointer;
        /* color: #EC0D08; */
    }

    td {
        color: rgb(57, 57, 57);
    }
    .container {
        z-index: 0;
        padding: 20px 0;
        position: relative;
    }

    #blok {
        display: block;
    }

    #flex {
        display: flex;
    }

    // form
    .purple {
        input {
            width: auto;
            padding: 5px;
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
</style>
