<template>
<div class="itemMain">
  <itemContent :item="itemobj" :unixTime2ymd="unixTime2ymd" :width="width" :toform="toform" />
  <itemLink :item="itemobj"></itemLink>
  <itemComments :item="itemobj" :unixTime2ymd="unixTime2ymd"></itemComments>
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
    'item': Object,
    'unixTime2ymd': Function,
    'width': Number,
    'toform': Function,
    'logined': Boolean,
    // 'idToken': String,
    'suggestlist': Array
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
      itemobj: {}
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
      if (Object.keys(this.item).length == 0) {
        let self = this
        firebase.database().ref('/items').orderByChild("name").equalTo(self.query).
        on("child_added", function(snapshot) {
          self.itemobj = snapshot.val()
          console.log(self.itemobj);
        })
      }
    }
  },
  created() {
    console.log(this.item);
    this.itemobj = this.item
    this.getItem()
    // this.load = false
    // this.imagelist.push(this.item.imgPath)
    // if (this.imgcheck(this.item.wikiImg) == false) {
    //   this.imagelist.push(this.item.wikiImg)
    // } else {
    //   this.imagelist.push("../../assets/noimg.png")
    // }
    // this.idToken = localStorage.getItem("idToken")
  }
}
</script>
