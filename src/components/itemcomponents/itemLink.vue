<template>
<div class="itemLink" v-if="edit">
  <h3 style="text-align:left;">
    関連リンク
  </h3>
  <!-- if -->
  <ul style="text-align:left;">
    <li v-for="(item, index) in item.url" :key="index">
      <!-- </a>{{index}}: </a> -->
      <a @click="toLink(item)" style="cursor:pointer; color:gray">{{item}}</a>
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'itemLink',
  props: {
    'item': Object,
  },
  data() {
    return {
      idToken: '',
      edit: true,
      LinkForm: {
        links: [{
          name: '',
          link: ''
        }]
      },
      commentlist: [{}],
      editlink: true,
    }
  },
  methods: {
    removeLink(item) {
      var index = this.LinkForm.links.indexOf(item);
      if (index !== -1) {
        this.LinkForm.links.splice(index, 1);
      }
    },
    addLink() {
      this.LinkForm.links.push({
        name: '',
        link: ''
      })
      console.log(this.LinkForm.links);
    },
    toLink(link) {
      console.log(link);
      if (link != 'null') {
        window.open(link);
      }
    },
    postL() {
      axios
        .put('https://198o53es1f.execute-api.ap-northeast-1.amazonaws.com/dev', {
          wiki: this.item.wiki,
          id: this.item.id,
          features: this.item.features,
          links: this.LinkForm.links
        })
        .then(response => {
          console.log(response);
          this.$notify({
            title: '関連リンクを更新しました',
            // message: this.inputname + 'の情報が更新されました',
            type: 'success'
          })
          this.editlink = !this.editlink
        })
        .catch(error => {
          (console.log(error))
          this.$notify.error({
            title: '更新できませんでした',
            // message: '全ての必須項目に入力してください'
          })
        })
    }
  },
  created() {
    this.LinkForm.links = this.item.links
  }
}
</script>

<style>
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
