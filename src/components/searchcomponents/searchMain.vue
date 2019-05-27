<template>
<div class="searchMain">
  <h1 class="query">
    {{query}}
  </h1>
  <searchResult />
</div>
</template>

<script>
import firebase from 'firebase'
import searchResult from "@/components/searchcomponents/searchResult"

export default {
  name: 'searchMain',
  props: {
    'toform': Function,
    "items": Array,
  },
  components: {
    searchResult
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
    items_ref.orderByChild("name").equalTo(self.query).
    on("child_added", function(snapshot) {
      self.searchName = snapshot.val()
      console.log("searchName");
      console.log(self.searchName);
    })

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
}
</style>
