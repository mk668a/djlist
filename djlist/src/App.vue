<template>
<div id="app">
  <main id="top">
    <Header />
    <router-view :toItem="toItem" :responsedata="responsedata" :items="items" />
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
      database: {},
      responsedata: [{
          imgPath: "@/assets/diagram.jpg",
          product: "product",
          name: "name1",
          url: "",
          id: "1",
          popular: "123"
        },
        {
          imgPath: "@/assets/diagram.jpg",
          product: "product",
          name: "name2",
          url: "",
          id: "1",
          popular: "123"
        },
        {
          imgPath: "@/assets/diagram.jpg",
          product: "product",
          name: "name3",
          url: "",
          id: "1",
          popular: "123"
        }
      ]
    }
  },
  methods: {
    toItem(obj) {
      this.characterdata = obj
      this.$router.push('/itemMain')
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
    }
  },
  mounted() {
    this.getItems()
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
}

body {
  margin: 0;
}

h1 {
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
