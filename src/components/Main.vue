<template>
<div class="main">
  <router-link to="/about">DJ Listとは</router-link>
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
}
</script>

<style>
.main {}
</style>
