<template>
<div class="itemContent">
  <div class="itemImage">
    <div>
      <img :src="item.img" />
    </div>
  </div>
  <div class="itemName">
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
    <div class="table">
      <div class="tr">
        <div class="td">Popular</div>
        <div class="td">{{getPopular(item)}}</div>
      </div>
      <div class="tr">
        <div class="td">Creted Date</div>
        <div class="td">{{unixTime2ymd(item.created_at)}}</div>
      </div>
      <div class="tr area">
        <div class="td">Area</div>
        <div class="tag">
          <div class="item" v-for="(i, index) in item.places" @click="toform(i)">{{i}} </div>
        </div>
      </div>
      <div class="tr genre">
        <div class="td">Genre</div>
        <div class="tag">
          <div class="item" v-for="(i, index) in item.genre" @click="toform(i)">{{i}} </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
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
    padding: 0 8vw;
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
                border-radius: 0.5em;
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

            a {
                color: rgba($main-color, 0.7);
                font-weight: bold;
                font-size: 38px;
                margin: auto;
                display: block;
            }

            .on {
                color: rgba($main-color, 1);
            }
        }
    }

    .Cinfo {
        background: rgba(#fff, .5);
        padding: 20px 10px;
        border-radius: 0.5em;

        .table {
            width: 100%;

            .tr {
                display: flex;
                .td {
                    &:nth-of-type(1) {
                        width: 30%;
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

    .area,
    .genre {

        .tag {
            width: 70%;
            height: auto;
            margin-top: 5px;
            display: flex;
            flex-wrap: wrap;

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

@media screen and (min-width:768px) {

    .itemContent {
        padding: 0 20%;
    }

}

@media screen and (max-width:530px) {

    .itemContent {

        .itemName {

            * {
                height: 5vw;
            }

            h2 {
                font-size: 5vw;
            }

            .popular {

                a {
                    font-size: 5vw;
                }
            }
        }

        .Cinfo {

            .table {

                .tr {
                    display: block;
                    margin-bottom: 10px;

                    .tag {
                        width: 100%!important;
                    }

                    .td {
                        display: block;
                        width: 100%!important;
                    }
                }
            }
        }

        .area,
        .genre {

            .tag {

                .item {}
            }
        }
    }

}
</style>
