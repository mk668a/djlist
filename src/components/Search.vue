<template>
<div class="search">
  <div class="searchform">
    <div class="form">
      <input type="text" class="searchInput" placeholder="search" v-model="input" />
      <el-button type="primary" class="searchButton" icon="el-icon-search" @click="toform(input)">
      </el-button>
    </div>
  </div>
  <div class="tag">
    <div v-for="(item, index) in tags" :key="index" class="item" @click="toform(item)">
      {{item}}
    </div>
    <i class="el-icon-refresh"></i>
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

<style lang="scss">
.search {
    margin: 10px 30px 30px;

    .searchform {
        display: flex;

        .form {
            margin: auto;
            display: flex;
            width: 100%;

            .searchInput {
                display: block;
                height: 40px;
                width: 100%;
                font-size: 20px;
                padding: 0 10px;
                border-radius: 0.3em 0 0 0.3em;
                border: solid 1px #c1c1c1;
                outline: none;
            }

            .searchButton {
                display: block;
                background: transparent;
                border: 1px solid #c1c1c1;
                border-left: 0;
                border-radius: 0 0.3em 0.3em 0;
                outline: none;
                cursor: pointer;

                .el-icon-search {
                    &:before {
                        color: #c1c1c1;
                    }
                }
            }
        }
    }

    .tag {
        display: flex;
        .item {
            margin: 3px 5px;
            padding: 0 3px;
            cursor: pointer;
            background: #f1f4f7;
            border-radius: 0.3em;
            font-size: 14px;
        }

        .el-icon-refresh {
            display: flex;

            &:before {
                margin: auto;
            }
        }
    }
}
</style>
