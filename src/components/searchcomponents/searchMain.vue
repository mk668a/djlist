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
      searchName: {},
      searchJenre: {},
      searchPlace: {}
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

    // getSearchJenre
    for (var i = 0; i < this.items.length; i++) {
      for (var j = 0; j < Object.keys(this.items[i].genre).length; j++) {
        console.log(this.items[i].genre[0]);
      }
    }
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
