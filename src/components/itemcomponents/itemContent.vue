<template>
<div class="itemContent">
  <div class="itemImage">
    <div>
      <img :src="item.img" />
    </div>
  </div>
  <div class="itemName">
    <i class="el-icon-edit" style="cursor:pointer; position:absolute; padding-top:7px;" @click="toRenew(item)"></i>
    <h2>
      {{item.name}}
    </h2>
    <div v-if="!confirmLiked(item.popular)" class="popular" @click="like(item)">
      <a class="off">☆{{getPopular(item)}}</a>
    </div>
    <div v-else class="popular" @click="like(item)">
      <a class="on">★{{getPopular(item)}}</a>
    </div>
  </div>
  <div class="Cinfo">
    <table>
      <tr>
        <td>Popular</td>
        <td>{{getPopular(item)}}</td>
      </tr>
      <tr>
        <td>Creted Date</td>
        <td>{{unixTime2ymd(item.created_at)}}</td>
      </tr>
      <tr class="area">
        <td>Area</td>
        <div class="tag">
          <div class="item" v-for="(i, index) in item.places" @click="toform(i)">{{i}} </div>
        </div>
      </tr>
      <tr class="genre">
        <td>Genre</td>
        <div class="tag">
          <div class="item" v-for="(i, index) in item.genre" @click="toform(i)">{{i}} </div>
        </div>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'itemContent',
  props: {
    'item': Object,
    'unixTime2ymd': Function,
    'toform': Function,
    'confirmLiked': Function,
    'like': Function,
    'toRenew': Function
  },
  methods: {
    getPopular(item) {
      if (item.popular == undefined) {
        return 0
      } else {
        return Object.keys(item.popular).length
      }
    }
  },
  created() {}
}
</script>


<style lang="scss">
$main-color: #EC0D08;

.itemContent {
    padding: 0 20px;
    display: block;

    .itemImage {
        display: flex;
        width: 100%;
        height: auto;

        div {
            margin: auto;
            width: 80%;
            height: 100%;
            img {
                width: 100%;
                height: auto;
            }
        }
    }

    .itemName {
        font-size: 38px;

        display: flex;
        * {
            height: 38px;
        }

        h2 {
            padding-right: 10px;
        }

        .popular {
            margin: auto auto auto 0;
            line-height: 45px;

            a {
                color: rgba($main-color, 0.7);
                font-family: 'ヒラギノ明朝 ProN W6', 'HiraMinProN-W6', 'HiraMinProN-W6', 'Avenir', Helvetica, Arial, sans-serif;
                font-weight: bold;
                font-size: 38px;
            }

            .on {
                color: rgba($main-color, 1);
            }
        }

        .el-icon-edit {
            margin: auto 0;
            color: #a458ec;
            position: static!important;
        }
    }

    .Cinfo {
        width: 100%;
        table {
            width: 100%;

            tr {
                td {
                    &:nth-of-type(1) {
                        font-size: 20px;
                        padding-right: 20px;
                    }
                }
            }
        }
    }

    a {
        font-weight: bold;
    }

    .genre, .area {
        width: 100%;

        .tag {
            width: 100%;
            height: auto;
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

}
</style>
