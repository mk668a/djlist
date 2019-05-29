<template>
<div class="itemMain">
  <itemContent :item="item" :unixTime2ymd="unixTime2ymd" :width="width" :toform="toform" :confirmLiked="confirmLiked" :like="like" :toRenew="toRenew" />
  <itemLink :item="item"></itemLink>
  <itemComments :item="item" :unixTime2ymd="unixTime2ymd"></itemComments>
</div>
</template>

<script>
import firebase from 'firebase'
import itemContent from './itemContent'
import itemLink from './itemLink'
import itemComments from './itemComments'

export default {
  name: 'itemMain',
  props: {
    'unixTime2ymd': Function,
    'width': Number,
    'toform': Function,
    'logined': Boolean,
    'suggestlist': Array,
    'confirmLiked': Function,
    'like': Function,
    'toRenew': Function
  },
  components: {
    itemContent,
    itemLink,
    itemComments
  },
  data() {
    return {
      // load: false,
      query: null,
      item: {}
    }
  },
  methods: {
    imgcheck(img) {
      console.log(img);
      if (img == "none") {
        return false
      } else {
        return true
      }
    },
    getItem() {
      this.query = this.$route.query.name
      // if (Object.keys(this.item).length == 0) {
      let self = this
      firebase.database().ref('/items').orderByChild("name").equalTo(self.query).
      on("child_added", function(snapshot) {
        self.item = snapshot.val()
        console.log(self.item);
      })
      // }
    }
  },
  created() {
    this.getItem()
  }
}
</script>
