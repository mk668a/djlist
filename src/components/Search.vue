<template>
<div class="search">
  <div class="form">
    <input type="text" class="searchInput" placeholder="search" v-model="input" />
    <el-button type="primary" class="searchButton" icon="el-icon-search" @click="toform(input)">
    </el-button>
  </div>
  <div class="tag">
    <div v-for="(item, index) in tags" :key="index" class="item" @click="toform(item)">
      {{item}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    'toform': Function
  },
  data() {
    return {
      input: "",
      tags: ["dubstep", "house", "zedd", "japan"]
    }
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
