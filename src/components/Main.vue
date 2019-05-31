<template>
<div class="main">
  <div v-if="about" class="toAbout">
    <router-link to="/about">DJ Listとは</router-link>
    <button @click="deleteAbout">delete</button>
  </div>
  <Search :toform='toform' />
  <Contents :toItem="toItem" :items="items" :confirmLiked="confirmLiked" :like="like" />
</div>
</template>

<script>
import Search from '@/components/Search'
import Contents from '@/components/Contents'

export default {
  name: 'Main',
  components: {
    Search,
    Contents
  },
  props: {
    "toItem": Function,
    "toform": Function,
    "items": Array,
    "confirmLiked": Function,
    "like": Function,
  },
  data() {
    return {
      about: true
    }
  },
  methods: {
    deleteAbout() {
      this.about = false
    }
  }
}
</script>

<style lang="scss">
.main {
    .toAbout{
      display: flex;
    }
}
</style>
