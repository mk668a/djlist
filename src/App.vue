<template>
<div id="app">
  <main id="top">
    <Header />
    <div class="container">
      <router-view :toItem="toItem" :toform="toform" :items="items" :item="item" :getItems="getItems" :unixTime2ymd="unixTime2ymd" :confirmLiked="confirmLiked" :like="like" :toRenew="toRenew" />
    </div>
    <Footer />
  </main>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import firebase from 'firebase'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      idToken: '',
      logined: true,
      items: [],
      item: {},
      database: {},
    }
  },
  methods: {
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
      // console.log(item);
      if (item != '') {
        this.input = item
        this.onFocus = true
        this.$router.push({
          path: '/searchMain',
          query: {
            dev: this.input
          }
        })
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
          console.log(this.items);
        }
      })
    },
    unixTime2ymd(intTime) {
      var d = new Date(intTime);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hour = ('0' + d.getHours()).slice(-2);
      var min = ('0' + d.getMinutes()).slice(-2);
      var sec = ('0' + d.getSeconds()).slice(-2);
      return (year + '年' + month + '月' + day + '日 ' + hour + ':' + min + ':' + sec);
    },
    confirmLiked(userId, popular) {
      // console.log(popular);
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

body {
    margin: 10px;
    background-color: #FDE816;

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

    }

    h3 {
        color: #EC0D08;
    }

    a {
        cursor: pointer;
        /* color: #EC0D08; */
    }

    p {
        color: #EC0D08;
    }

    .container {
        padding: 20px;
    }
}
</style>
