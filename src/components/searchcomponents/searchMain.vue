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
    'toform': Function
  },
  components: {
    searchResult
  },
  data() {
    return {
      query: null,
      searcItem: {}
    }
  },
  methods: {},
  created() {
    this.query = this.$route.query.dev
    let self = this
    firebase.database().ref('/items').orderByChild("name").equalTo(self.query).
    on("child_added", function(snapshot) {
      self.searcItem = snapshot.val()
      console.log("searcItem");
      console.log(self.searcItem);
    })
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
