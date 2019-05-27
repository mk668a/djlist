<template>
<div class="search">
  <div class="form">
    <input type="text" class="searchInput" placeholder="search" v-model="input" @keyup.enter="enter" @keyup.delete="back" @keyup.space="space" @input="change" 　@focus="disappear" @blur="appear" />
    <el-button type="primary" class="searchButton" icon="el-icon-search" @click="toform(input)">
      <!-- <img src="../assets/search.png" /> -->
    </el-button>
  </div>
  <!-- <div class="suggest">
    <div v-for="(item, index) in suggestlist" class="suggestItem" v-if="!onFocus" @click="toform(item)">
      {{item}}
    </div>
  </div> -->
  <div class="tag">
    <div v-for="(item, index) in tags" :key="index" class="item" @click="toform(item)">
      {{item}}
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  props: {
    'responsedata': Array,
  },
  data() {
    return {
      load: false,

      onFocus: true,
      input: '',
      chosen: '',
      suggestlist: [],
      newsuggest: [],
      datalist: [],
      entered: false,
      backed: false,
      spaced: false,
      tags: ["dubstep", "house", "zedd", "japan"]
    }
  },
  methods: {
    // content_router: function() {
    //   this.$router.push({
    //     path: '/searchMain',
    //     query: {
    //       dev: this.input
    //     }
    //   })
    // },
    disappear() {
      this.onFocus = false
    },
    appear() {
      if (this.input == '') {
        this.onFocus = true
      }
    },
    IsArrayExists(array, value) {
      // for (var i = 0, len = array.length; i < len; i++) {
      //   if (value == array[i]) {
      //     return true;
      //   }
      // }
      return false;
    },
    toform(item) {
      // console.log(item);
      if (item != '') {
        this.input = item
        this.onFocus = true
        this.$router.push({
          path: '/searchMain',
          query: {
            dev: this.input
          }
        })
      }
    },
    enter() {
      console.log('enter');
      this.entered = true
    },
    back() {
      console.log('back');
      this.backed = true
    },
    space() {
      console.log('space');
      this.spaced = true
    },
    change(e) {
      //   // console.log(e.target.value);
      //   console.log("start axios");
      //   axios
      //     .get('https://198o53es1f.execute-api.ap-northeast-1.amazonaws.com/dev/s', {
      //       params: {
      //         q: e.target.value
      //       }
      //     })
      //     .then(response => {
      //       console.log(response);
      //       // if (response.data.suggest.length == 0) { //配列が空のとき（変換してる時か、決定した時、または「ひらがな」で入力してるけどない時）
      //       if (this.entered == true || this.backed == true || this.spaced == true) { //Enterを押していた場合
      //         this.entered = false
      //         this.backed = false
      //         this.newsuggest = []
      //         console.log(this.newsuggest);
      //         for (var i = 0; i < this.datalist.length; i++) {
      //           if (this.datalist[i].indexOf(this.input) != -1) {
      //             this.newsuggest.push(this.datalist[i])
      //           }
      //         }
      //         this.suggestlist = this.newsuggest
      //         console.log(this.newsuggest);
      //         // }
      //         // return
      //       } else {
      //         this.datalist = []
      //         for (var i = 0; i < response.data.suggest.length; i++) {
      //           this.datalist.push(response.data.suggest[i].wiki)
      //         }
      //         this.suggestlist = this.datalist
      //       }
      //       // console.log(response);
      //       // console.log(this.suggestlist);
      //     })
      //     .catch(error => console.log(error))
    }
  },
  created() {
    this.load = false

    for (var i = 0; i < 4; i++) {
      // this.tags.push(this.responsedata[Math.floor(Math.random() * this.responsedata.length)].wiki)
    }
    this.load = true
  }
}
</script>

<style>
.search {
  margin: 10px 30px;
}

.search>.form {
  display: flex;
  height: 38px;
}

.search>.form>.searchInput {
  width: 600px;
  font-size: 20px;
  padding: 0 10px;
  border-radius: .3em 0 0 .3em;
  border: solid 1px #c1c1c1;
  outline: none;
}

.search>.form>.searchButton {
  width: 60px;
  background: #c1c1c1;
  border: #5FADE5;
  border-radius: 0 .3em .3em 0;
  outline: none;
  cursor: pointer;
}

.search>.form>.searchButton:hover img {
  transform: scale(1.4);
  transition-duration: 0.3s;
}

.search>.form>.searchButton>img {
  width: 100%;
  height: 100%;
}


.suggest {
  cursor: pointer;
  text-align: left;
  z-index: 3;
  position: relative;
  background: white;
}

.suggest>.suggestItem {
  height: 30px;
  background: #e6e6e6;
}

.suggest>.suggestItem:nth-last-of-type(1) {
  border-radius: 0 0 .3em .3em;
}

.suggest>.suggestItem:hover {
  background: white;
}

.tag {
  display: flex;
  width: 500px;
}

.tag>.item {
  margin: 3px 5px;
  padding: 0 3px;
  cursor: pointer;
  background: #f1f4f7;
  border-radius: .3em;
  font-size: 14px;
}

@media screen and (max-width:768px) {
  .search {
    width: 300px !important;
  }

  .search,
  .el-input-group__append {
    overflow: hidden;
  }

  .searchtext {
    animation: animation01 8s infinite linear 1s both;
    width: 370px;
    margin: 0;
    height: 40px;
    line-height: 40px;
  }

  @keyframes animation01 {
    from {
      transform: translateX(240px);
    }

    to {
      transform: translateX(-340px);
    }
  }
}
</style>
