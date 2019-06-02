<template>
<div class="itemLink">
  <h3 style="text-align:left;">
    Links
  </h3>
  <ul style="text-align:left;">
    <li v-for="(item, index) in item.url" :key="index">
      <p @click="toLink(item)" style="cursor:pointer; color:gray">{{item}}</p>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'itemLink',
  props: {
    'item': Object,
  },
  data() {
    return {
      LinkForm: {
        links: [{
          name: '',
          link: ''
        }]
      },
    }
  },
  methods: {
    toLink(link) {
      console.log(link);
      if (link != 'null') {
        window.open(link);
      }
    }
  },
  created() {
    this.LinkForm.links = this.item.links
  }
}
</script>

<style lang="scss">
.itemLink {
    padding: 0 20px;

    ul {
        li {
            p {
                word-break: break-all;
            }
        }
    }
}
</style>
