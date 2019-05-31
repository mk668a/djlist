<template>
<div class="itemLink">
  <h3 style="text-align:left;">
    関連リンク
  </h3>
  <ul style="text-align:left;">
    <li v-for="(item, index) in item.url" :key="index">
      <a @click="toLink(item)" style="cursor:pointer; color:gray">{{item}}</a>
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
  margin: auto 30px !important;
}

.itemLink>ul>li>a {
  word-break: break-all;
}

.itemLink .el-form-item__content>.el-input {
  width: 150px;
}

.itemLink .el-form-item__content>.el-input>.el-input__inner:nth-of-type(1) {
  width: 100px;
}

.itemLink .el-form-item__content>.el-input>.el-input__inner:nth-of-type(1) {
  width: 100px;
}

.itemLink .el-form-item__content>.el-input:nth-of-type(1),
.itemLink .el-form-item__content>.el-input:nth-of-type(1)>.el-input__inner {
  width: 100px !important;
}

.itemLink .el-form-item__content>.el-input:nth-of-type(2),
.itemLink .el-form-item__content>.el-input:nth-of-type(2)>.el-input__inner {
  width: 300px !important;
}

@media screen and (max-width:768px) {

  .itemLink .el-form-item__content>.el-input:nth-of-type(1),
  .itemLink .el-form-item__content>.el-input:nth-of-type(1)>.el-input__inner {
    width: 90px !important;
  }

  .itemLink .el-form-item__content>.el-input:nth-of-type(2),
  .itemLink .el-form-item__content>.el-input:nth-of-type(2)>.el-input__inner {
    width: 210px !important;
  }

  .itemLink .el-form-item__content>.el-button.el-button--default {
    margin-top: 10px;
  }
}
</style>
