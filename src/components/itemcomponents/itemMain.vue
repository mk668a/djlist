<template>
<div class="itemMain">
  <itemContent :item="itemobj" :unixTime2ymd="unixTime2ymd" :toform="toform" :confirmLiked="confirmLiked" :like="like" :toRenew="toRenew" />
  <itemLink :item="itemobj"></itemLink>
  <itemComments :item="itemobj" :unixTime2ymd="unixTime2ymd"></itemComments>
  <itemChange :item="itemobj" :toRenew="toRenew" />
  <div class="arrowUp">
    <el-button icon="el-icon-arrow-up" href="#" v-scroll-to="'#top'" circle></el-button>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import itemContent from './itemContent'
import itemLink from './itemLink'
import itemComments from './itemComments'
import itemChange from './itemChange'

export default {
  name: 'itemMain',
  props: {
    'unixTime2ymd': Function,
    'toform': Function,
    'confirmLiked': Function,
    'like': Function,
    'toRenew': Function,
    'item': Object,
  },
  components: {
    itemContent,
    itemLink,
    itemComments,
    itemChange
  },
  data() {
    return {
      // load: false,
      query: null,
      itemobj: {}
    }
  },
  methods: {
    // imgcheck(img) {
    //   console.log(img);
    //   if (img == "none") {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    getItem() {
      this.query = this.$route.query.name
      let self = this
      firebase.database().ref('/items').orderByChild("name").equalTo(self.query).
      on("child_added", function(snapshot) {
        self.itemobj = snapshot.val()
        console.log(self.itemobj);
      })
    }
  },
  created() {
    if (Object.keys(this.item).length == 0) {
      this.getItem()
    } else {
      this.itemobj = this.item
    }
  }
}
</script>

<style lang="scss">
.itemMain {
    margin-top: 130px;
    padding: 0;

    .el-icon-edit {
        margin: auto 0;
        color: #a458ec;
        position: static!important;
    }
}
</style>
