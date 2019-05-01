<template>
<div class="itemMain">
  <itemContent :itemobject="itemobject" :unixTime2ymd="unixTime2ymd" :display="display" :width="width" :toSearch="toSearch" :idToken="idToken" />
  <itemLink :itemobject="itemobject"></itemLink>
  <itemComments :itemobject="itemobject" :unixTime2ymd="unixTime2ymd"></itemComments>
</div>
</template>

<script>
import axios from 'axios'
import itemContent from './itemContent'
import itemLink from './itemLink'
import itemComments from './itemComments'

export default {
  name: 'itemMain',
  props: {
    'itemdata': Object,
    'unixTime2ymd': Function,
    'width': Number,
    'display': Function,
    'toSearch': Function,
    'logined': Boolean,
    'idToken': String,
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
      itemobject: {},
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
    this.load = false
    if (!this.itemdata.name) {
      this.itemobject = JSON.parse(localStorage.getItem("item"))
    } else {
      this.itemobject = this.itemdata
    }
    localStorage.setItem("item", JSON.stringify(this.itemobject))

    if (this.itemobject.name == undefined) {
      this.$router.push('/')
    }
    // this.imagelist.push(this.itemobject.imgPath)
    // if (this.imgcheck(this.itemobject.wikiImg) == false) {
    //   this.imagelist.push(this.itemobject.wikiImg)
    // } else {
    //   this.imagelist.push("../../assets/noimg.png")
    // }
    this.idToken = localStorage.getItem("idToken")
  }
}
</script>
