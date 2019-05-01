<template>
<div id="app">
  <main id="top">
    <Header />
    <router-view :toItem="toItem" :responsedata="responsedata" :itemdata="itemdata" />
    <Footer />
  </main>
</div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
      itemdata: {},
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
    }
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
