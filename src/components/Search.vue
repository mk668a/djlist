<template>
<div class="search">
  <div class="searchform">
    <div class="form">
      <!-- :keyup.enter="toform(input)" -->
      <div class="searchInput">
        <input type="text" placeholder="search" v-model="input" />
      </div>
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
      tags: ["dubstep", "house", "Zedd", "Japan"]
    }
  }
}
</script>

<style lang="scss">
$main-color: #ec0d08;
@mixin exborder($color:#fff) {
    // 上
    text-shadow: 1px 1px 0 $color, -1px 1px 0 $color, 1px -1px 0 $color, -1px -1px 0 $color;
    // 下
    text-shadow: 1px 1px 1px $color, -1px 1px 1px $color, 1px -1px 1px $color, -1px -1px 1px $color;
}

.search {
    margin: 30px 5%;
    width: 90%;

    .searchform {
        display: flex;

        .form {
            box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.4);

            margin: auto;
            display: flex;
            width: 100%;

            .searchInput {
                display: block;
                height: 60px;
                width: 100%;
                padding: 0 10px;
                border-radius: 0.1em 0 0 0.1em;
                // border: solid 1px $main-color;
                background: #000;

                input {
                    padding-top: 10px;
                    height: 40%;
                    width: 100%;
                    background: #000;
                    border: 0;
                    font-family: "KSblockblock";
                    font-size: 32px;
                    color: rgba($main-color, 1);
                    caret-color: $main-color;
                    letter-spacing: 4px;
                    @include exborder(#ff0600);
                    outline: none;

                    // reflect
                    -webkit-box-reflect: below 4px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(0.5, transparent), to(rgba(0,0,0,0.8)));
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: #fff975;

                    // placeholder
                    &::placeholder {
                        /* Chrome, Firefox, Opera, Safari 10.1+ */
                        color: $main-color;
                        opacity: 0.5;
                        font-family: "KSblockblock";
                        /* Firefox */
                    }
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
                background: #000;
                border: 1px solid #000;
                border-left: 0;
                border-radius: 0 0.1em 0.1em 0;
                outline: none;
                cursor: pointer;

                .el-icon-search {
                    &:before {
                        color: #fff975;
                        @include exborder(#ff0600);
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .tag {
        display: flex;
        margin-top: 5px;

        .item {
            margin: 3px 5px;
            padding: 2px 5px;
            cursor: pointer;
            color: #fff;
            font-family: "nicomojiPlus";
            background: linear-gradient(0deg, #FDE816 1%, #a458ec 60%, #fff);
            border-radius: 0.3em;
            font-size: 14px;
            box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.4);
        }

        .el-icon-refresh {
            display: flex;
            cursor: pointer;

            &:before {
                font-weight: bold;
                color: #fff;
                border-radius: 50px;
                padding: 2px;
                margin: auto auto 3px;
                background: linear-gradient(0deg, #FDE816 1%, #a458ec 60%, #fff);
                box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.4);
            }
        }
    }
}
</style>
