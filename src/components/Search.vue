<template>
<div class="search">
  <div class="searchform">
    <div class="form">
      <div class="searchInput">
        <input type="text" placeholder="Search" v-model="input" @keydown.enter="toform(input)" />
      </div>
      <el-button type="primary" class="searchButton" icon="el-icon-search" @click="toform(input)">
      </el-button>
    </div>
  </div>
  <div class="tags">
    <div v-for="(item, index) in tags" :key="index" class="tag" @click="toform(item)">
      {{item}}
    </div>
    <div class="flesh-button">
      <i class="el-icon-refresh" @click="getTags(items)"></i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    "items": Array,
    'toform': Function,
  },
  data() {
    return {
      input: "",
      tags: [],
      beforeTags: []
    }
  },
  methods: {
    IsArrayExists(array, value) {
      var flag = true
      for (var i = 0, len = array.length; i < len; i++) {
        if (value == array[i]) {
          flag = false
        }
      }
      return flag;
    },
    getTags(items) {
      // var tags = document.querySelector('.tags');
      this.tags = []

      var tagsWidth = window.innerWidth;

      var width = 0;
      var divide_size = 9

      if (tagsWidth >= 768) {
        divide_size = 15
      }

      while (width < tagsWidth / divide_size) {
        var random = Math.floor(Math.random() * items.length);
        var index = Math.floor(Math.random() * 3);
        var item = ""

        if (index == 0) {
          item = items[random].name
        }
        if (index == 1) {
          var j = Math.floor(Math.random() * items.length);
          item = items[random].places[j]
        }
        if (index == 2) {
          var k = Math.floor(Math.random() * items.length);
          item = items[random].genre[k]
          // console.log(item);
        }

        if (item != undefined && item != "" && this.IsArrayExists(this.tags, item)) {
          this.tags.push(item)
          // console.log(item);

          // tags = document.querySelector('.tags');
          tagsWidth = window.innerWidth
          // console.log(tagsWidth);

          width += item.length
          // console.log(width);
        }

      }
    },
    tagResize: function() {
      var afterTags = []
      var tagsWidth = window.innerWidth;
      var width = 0;

      var divide_size = 9

      if (tagsWidth >= 768) {
        divide_size = 15
      }

      for (var i = 0; i < this.beforeTags.length; i++) {
        if (width > tagsWidth / divide_size) {
          break
        }
        var item = this.beforeTags[i]
        if (item != undefined && item != "") {
          afterTags.push(item)
          width += item.length
        }
      }

      this.tags = afterTags
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.tagResize)
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.tagResize)
  },
  created() {
    this.getTags(this.items)
    this.beforeTags = this.tags
  },
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
                    margin-top: 8px;
                    height: 30px;
                    width: 100%;
                    background: #000;
                    border: 0;
                    font-family: "PixelMplus12", "KSblockblock";
                    font-size: 32px;
                    color: rgba($main-color, 1);
                    caret-color: $main-color;
                    letter-spacing: 4px;
                    @include exborder(#ff0600);
                    outline: none;

                    // reflect
                    -webkit-box-reflect: below 2px -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(0.5, transparent), to(rgba(0,0,0,0.8)));
                    -webkit-text-stroke-width: 1px;
                    -webkit-text-stroke-color: #fff975;

                    // placeholder
                    &::placeholder {
                        color: $main-color;
                        opacity: 0.5;
                        font-family: "PixelMplus12", "KSblockblock";
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

    .tags {
        margin-top: 5px;

        .tag {
            float: left;
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

        .flesh-button {
            float: left;
            margin: 3px 5px;

            &:active {
                animation: spin 0.1s infinite;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            .el-icon-refresh {
                display: flex;
                cursor: pointer;
                height: 19px;
                width: 19px;

                &:before {
                    font-size: 16.5px;
                    font-weight: bold;
                    color: #fff;
                    border-radius: 50px;
                    padding: 2px;
                    background: linear-gradient(0deg, #FDE816 1%, #a458ec 60%, #fff);
                    box-shadow: 3px 3px 10px 1px rgba(0,0,0,0.4);
                }
            }

        }
    }
}

@media screen and (min-width:768px) {
    .search {
        .searchform {
            // width: 45%;

            .form {
                width: 60%!important;
            }
        }

        .tags {
            width: 60%;
            margin: 10px auto;
        }
    }
}
</style>
