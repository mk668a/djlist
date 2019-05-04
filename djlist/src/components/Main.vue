<template>
<div class="main">
  <Search />
  <Contents :toItem="toItem" :responsedata="responsedata" :items="items"/>
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
  props:{
    "toItem": Function,
    "responsedata": Array,
    "items": Array
  },
}
</script>

<style>
.main {
}
</style>
