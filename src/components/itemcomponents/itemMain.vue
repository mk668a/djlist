<template>
<div class="itemMain">
  <itemContent :item="item" :unixTime2ymd="unixTime2ymd" :width="width" :toSearch="toSearch" />
  <itemLink :item="item"></itemLink>
  <itemComments :item="item" :unixTime2ymd="unixTime2ymd"></itemComments>
</div>
</template>

<script>
import itemContent from './itemContent'
import itemLink from './itemLink'
import itemComments from './itemComments'

export default {
  name: 'itemMain',
  props: {
    'item': Object,
    'unixTime2ymd': Function,
    'width': Number,
    'toSearch': Function,
    'logined': Boolean,
    // 'idToken': String,
    'suggestlist' : Array
  },
  components: {
    itemContent,
    itemLink,
    itemComments
  },
  data() {
    return {
      load: false,
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
    }
  },
  created() {
    console.log(this.item);
    this.load = false
    if (!this.item.name) {
      this.item = JSON.parse(localStorage.getItem("item"))
    } else {
      this.item = this.item
    }
    localStorage.setItem("item", JSON.stringify(this.item))

    if (this.item.name == undefined) {
      this.$router.push('/')
    }
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
