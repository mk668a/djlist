<template>
<div class="main">
  <router-link to="/">DJ Listとは</router-link>
  <Search :toform='toform'/>
  <Contents :toItem="toItem" :items="items" />
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
  },
}
</script>

<style>
.main {}
</style>
