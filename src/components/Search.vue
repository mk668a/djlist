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
$main-color: #ec0d08;

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
                border-radius: 0.1em 0 0 0.1em;
                border: solid 1px $main-color;
                outline: none;
                color: $main-color;

                // placeholder
                &::placeholder {
                    /* Chrome, Firefox, Opera, Safari 10.1+ */
                    color: $main-color;
                    opacity: 0.7;
                    /* Firefox */
                }

                &:-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: $main-color;
                }

                &::-ms-input-placeholder {
                    /* Microsoft Edge */
                    color: $main-color;
                }

            }

            .searchButton {
                display: block;
                background: transparent;
                border: 1px solid $main-color;
                border-left: 0;
                border-radius: 0 0.1em 0.1em 0;
                outline: none;
                cursor: pointer;

                .el-icon-search {
                    &:before {
                        color: $main-color;
                    }
                }
            }
        }
    }

    .tag {
        display: flex;
        .item {
            margin: 3px 5px;
            padding: 1px 3px;
            cursor: pointer;
            color: #fff;
            background: linear-gradient(0deg, #CA5556, #f46566 60%, #fff);
            border-radius: 0.3em;
            font-size: 14px;
            // box-shadow: 10px 10px 10px 1px rgba(0,0,0,0.4);
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
