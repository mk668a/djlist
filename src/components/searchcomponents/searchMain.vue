<template>
<div class="searchMain">
  <h1 class="query">
    {{query}}
  </h1>
  <div class="name">
    <h2>name</h2>
    <Contents :toItem="toItem" :items="searchName" :confirmLiked="confirmLiked" :like="like" />
  </div>
  <div class="genre">
    <h2>genre</h2>
    <Contents :toItem="toItem" :items="searchGenre" :confirmLiked="confirmLiked" :like="like" />
  </div>
  <div class="place">
    <h2>place</h2>
    <Contents :toItem="toItem" :items="searchPlace" :confirmLiked="confirmLiked" :like="like" />
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import Contents from '@/components/Contents'

export default {
  name: 'searchMain',
  props: {
    'toform': Function,
    "toItem": Function,
    "items": Array,
    'confirmLiked': Function,
    'like': Function,
  },
  components: {
    Contents
  },
  data() {
    return {
      query: null,
      searchName: [],
      searchGenre: [],
      searchPlace: []
    }
  },
  methods: {},
  created() {
    this.query = this.$route.query.dev
    let self = this
    let items_ref = firebase.database().ref('/items')

    // getSearchName
    // api
    // items_ref.orderByChild("name").equalTo(self.query).
    // on("child_added", function(snapshot) {
    //   self.searchName = snapshot.val()
    //   console.log("searchName");
    //   console.log(self.searchName);
    // })
    console.log("searchName");
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name == this.query) {
        // console.log(this.items[i]);
        this.searchName.push(this.items[i])
      }
    }
    console.log(this.searchName);

    // getSearchGenre
    console.log("searchGenre");
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; j < Object.keys(this.items[i].genre).length; j++) {
        if (this.items[i].genre[j] != null || this.items[i].genre[j] != '') {
          if (this.items[i].genre[j] == this.query) {
            // console.log(this.items[i]);
            this.searchGenre.push(this.items[i])
          }
        }
      }
    }
    console.log(this.searchGenre);

    // getSearchGenre
    console.log("searchPlace");
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; j < Object.keys(this.items[i].places).length; j++) {
        if (this.items[i].places[j] != null || this.items[i].places[j] != '') {
          if (this.items[i].places[j] == this.query) {
            this.searchPlace.push(this.items[i])
          }
        }
      }
    }
    console.log(this.searchPlace);
  }
}
</script>

<style lang="scss">
.searchMain {
    .query {
        text-align: center;
    }
    .genre,
    .name {
        .contents {
            button {
                display: none;
            }
        }
    }
}
</style>
