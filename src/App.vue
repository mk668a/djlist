<template>
<div id="app">
  <main id="top">
    <Header />
    <router-view :toItem="toItem" :items="items" :item="item" :unixTime2ymd="unixTime2ymd" />
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
          name: this.item.name
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
