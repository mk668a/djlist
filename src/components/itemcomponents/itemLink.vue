<template>
<div class="itemLink">
  <h3 style="text-align:left;">
    Links
  </h3>
  <div class="links">
    <ul style="text-align:left;">
      <li v-for="(item, index) in item.url" :key="index">
        <p @click="toLink(item)" style="cursor:pointer;">{{item}}</p>
      </li>
    </ul>
  </div>
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
    padding: 0 8vw;

    .links {
        background: rgba(#fff, .5);
        padding: 20px 10px;
        border-radius: 0.5em;

        ul {

            li {
                p {
                    word-break: break-all;
                    color: #5e5e5e;
                }
            }
        }
    }
}

@media screen and (min-width:768px) {

    .itemLink {
        padding: 0 20%;
    }

}
</style>
