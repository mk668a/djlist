<template>
<div class="itemComments">
  <h3 style="text-align:left;">
      コメント
    </h3>
  <div class="commentContainer">
    <div v-for="(item, index) in commentlist" :key="index">
      <a v-text="index+1+'.'"></a>
      <a>
        {{item.name}}
        </a>
      <div>
        {{item.created_at}}
      </div>
      <div>
        {{item.value}}
      </div>
      <!-- <v-icon name="corner-up-left" style="width:20px;"></v-icon> -->
    </div>
  </div>
  <el-form ref="form" v-model="form">
    <el-form-item　class="commentform">
      <el-input placeholder="名前"></el-input>
      <el-input v-model="commentform"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="addComment(commentform)" round>コメントする</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<style>
.itemComments {
  margin: auto 30px;
}

.itemComments>.commentContainer {
  text-align: left;
  margin-bottom: 30px;
}

.itemComments>.commentContainer>div {
  margin: 10px auto;
  padding: 10px;
  background: #f4f4f4;
  border-radius: .3em;
}

.itemComments>.commentContainer>div>a {
  color: #96d4f4;
  font-size: 18px;
}

.itemComments>.commentContainer>div>div:nth-of-type(1) {
  color: #b1b1b1;
  font-size: 14px;
}

.itemComments>.commentContainer>div>div:nth-of-type(2) {
  color: gray;
}

.itemComments>.commentContainer>div>img.icon.icon-corner-up-left {
  color: #a1a1a1;
  display: block;
  margin-left: auto;
  margin-right: 5px;
}

.commentform{
  display: flex;
}

.commentform>div{
  width: 100%;
}

.commentform>div>.el-input:nth-of-type(1),
.commentform>div>.el-input:nth-of-type(1)>.el-input__inner{
  width: 200px;
}

.commentform>div>.el-input:nth-of-type(2),
.commentform>div>.el-input:nth-of-type(2)>.el-input__inner{
  width: 600px;
}

@media screen and (max-width:768px) {
  .itemComments>.el-form>.el-form-item>.el-form-item__content {
    display: flex;
  }

  .itemComments>.el-form>.el-form-item>.el-form-item__content>.el-input>input {
    width: 60px;
    height: 100%
  }

  .itemComments>.el-form>.el-form-item>.el-form-item__content>.el-input>input {
    width: 100%;
  }

  .commentform>div>.el-input:nth-of-type(1),
  .commentform>div>.el-input:nth-of-type(1)>.el-input__inner{
    width: 100px;
  }

  .commentform>div>.el-input:nth-of-type(2),
  .commentform>div>.el-input:nth-of-type(2)>.el-input__inner{
    width: 300px;
  }
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'itemComments',
  props: {
    'item': Object,
    'unixTime2ymd': Function
  },
  data() {
    return {
      form: '',
      commentform: '',
      commentlist: [{}]
    }
  },
  methods: {
    addComment(commentform) {
      this.commentlist.push({
        value: commentform
      })
      axios
        .post('https://198o53es1f.execute-api.ap-northeast-1.amazonaws.com/dev/comment', {
          wiki: this.item.wiki,
          id: this.item.id,
          comment: commentform,
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          (console.log(error))
        })
    }
  },
  created() {
    this.commentlist = this.item.comments
    for (var i = 0; i < this.commentlist.length; i++) {
      this.commentlist[i].created_at = this.unixTime2ymd(this.commentlist[i].created_at)
      if (this.commentlist[i].name == 'none') {
        this.commentlist[i].name = '匿名さん'
      }
    }
    console.log(this.commentlist);
  }
}
</script>
