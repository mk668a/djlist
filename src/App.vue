<template>
<div id="app">
  <main id="top">
    <Header />
    <router-view :toItem="toItem" :toform="toform" :items="items" :item="item" :getItems="getItems" :unixTime2ymd="unixTime2ymd" :confirmLiked="confirmLiked" :like="like" />
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
      // this.item = obj
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

      if (this.confirmLiked(userId, item.popular)) {
        console.log("削除");
        firebase.database().ref('/items').orderByChild("popular").equalTo(userId).
        on("child_added", function(snapshot) {
          console.log("ijebadfbkjanksjfnkld");
          console.log(snapshot.val());
          // document.querySelector('#'+snapshot.key).remove()
        })
        return
      }

      var postData = {
        uid: userId,
      }

      var newPostKey = firebase.database().ref().child('posts').push().key;

      var updates = {};
      updates['/items/' + itemId + '/popular/' + newPostKey] = postData;
      // console.log(updates);

      firebase.database().ref().update(updates);
    },
  },
  created() {
    this.getItems()
  }
}
</script>

<style>
@font-face {
  font-family: "Kingthings_Foundation";
  src: url(https://dl.dropboxusercontent.com/s/junww0gr4uxkc9h/Kingthings_Foundation.otf);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
}

body {
  margin: 0;
}

h1 {
  font-family: 'Kingthings_Foundation';
  font-size: 20px;
  cursor: pointer;
}

h2 {}

h3 {}

a {
  cursor: pointer;
}

p {}
</style>
