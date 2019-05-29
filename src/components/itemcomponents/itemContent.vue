<template>
<div class="itemContent">
  <img :src="item.img" style="width:100%" />
  <h1 v-if="edit">
    {{item.name}}
    <i class="el-icon-edit" style="cursor:pointer; position:absolute; padding-top:7px;" @click="toRenew(item)"></i>
  </h1>
  <el-input v-else type="text" v-model="item.name"></el-input>
  <div class="Cinfo">
    <table>
      <tr>
        <td>人気度:</td>
        <td>{{getPopular(item)}}</td>
        <div v-if="!confirmLiked(item.uid, item.popular)" @click="like(item)">
          <i class="el-icon-star-off"></i>
        </div>
        <div v-else @click="like(item)">
          <i class="el-icon-star-on"></i>
        </div>
      </tr>
      <tr>
        <td>作成日:</td>
        <td>{{unixTime2ymd(item.created_at)}}</td>
      </tr>
      <tr>
        <td>活動場所:</td>
        <td v-for="(i, index) in item.places" @click="toform(i)">{{i}} </td>
      </tr>
      <tr>
        <td>ジャンル:</td>
        <td v-for="(i, index) in item.genre" @click="toform(i)">{{i}} </td>
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
    'width': Number,
    'toform': Function,
    'confirmLiked': Function,
    'like': Function,
    'toRenew': Function
    // 'idToken': String
  },
  data() {
    return {
      edit: true,
    }
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


<style>
.itemContent {
  width: auto;
  margin: 50px !important;
  border: solid 1px #e6e6e6;
  border-radius: 1em;
  display: block;
}

.itemContent h1 {
  padding-top: 30px;
}

/* カルーセル(モバイル) */

.itemContent>div>.el-carousel>.el-carousel__container {
  height: 450px;
}

.itemContent>div>.el-carousel>.el-carousel__container>div {
  height: 450px;
  width: 100%;
  display: flex;
}

.itemContent>div>.el-carousel>.el-carousel__container>div:nth-of-type(1)>img {
  display: block;
  height: 100%;
  margin: auto !important;
  border-radius: .3em;
}

.itemContent>div>.el-carousel>.el-carousel__container>div:nth-of-type(2)>img {
  display: block;
  width: 100%;
  margin: auto !important;
}

.itemContent>div>.el-carousel>ul>li>button {
  width: 70px;
  background: white;
}

.itemContent>div>.el-carousel>ul>li:nth-of-type(1)>button::after {
  content: '擬人化前';
  font-size: 3px;
  background: #f1f4f7;
  border-radius: .5em;
  padding: 3px;
  color: rgb(68, 174, 234);
}

.itemContent>div>.el-carousel>ul>li:nth-of-type(2)>button::after {
  content: '擬人化後';
  font-size: 3px;
  background: #f1f4f7;
  border-radius: .5em;
  padding: 3px;
  color: rgb(68, 174, 234);
}

.itemContent>#Block {
  display: flex;
  margin: auto;
  width: 660px;
}

#Block>div>img {
  width: 300px;
  height: auto;
  border-radius: .3em;
  margin: auto;
  filter: brightness(95%);
}

#Block>.Oimage {
  display: block;
  margin: auto;
  height: 100%;
}

.itemContent>#Block>.Cinfo {
  width: 100%
}

.itemContent>.Cinfo {
  width: 100%;
  margin: 30px auto;
}

.itemContent>.Cinfo>table {
  margin: auto;
  display: block;
  width: 300px;
}

.itemContent>.Cinfo>table>tr>td:nth-child(1) {
  text-align: left;
  color: #f2cf01;
  width: 150px;
  font-weight: bold;
}

.itemContent>.Cinfo>table>tr>td:nth-child(2) {
  text-align: right;
  width: 300px;
  /* text-decoration: none; */
}

/* point */

.itemContent>.pointC {
  margin: 30px auto;
  width: 100%;
}

.itemContent>.pointC>h2 {
  background: #f1f4f7;
}

.itemContent>.pointC>.pointitems {
  padding-bottom: 30px;
  width: 100%;
  height: auto;
  margin: auto;
  text-align: left;
  display: block;
}

.itemContent>.pointC>.pointitems>div {
  display: block !important;
}

.itemContent>.pointC>.pointitems>div>p {
  font-size: 16px;
  width: 100%;
  height: 100%;
}

.itemContent>.pointC>.pointitems>div>p:nth-of-type(2) {
  display: none;
}

.itemContent>.pointC>.pointitems>div>p:nth-of-type(1) {
  font-weight: bold;
}

.itemContent>.pointC>.pointitems>div {
  width: auto;
  height: auto;
  display: flex;
  margin: auto 30px;
}

.itemContent>button {
  margin-bottom: 30px;
}

@media screen and (max-width:768px) {
  .itemContent {
    margin: 50px 0 !important;
    border: solid 0px #e6e6e6;
  }

  .itemContent h1 {
    font-size: 20px;
  }

  #Block,
  #Block>* {
    display: block !important;
  }

  /* edit */
  /* .editC>div>.el-checkbox {
    width: 300px;
  }

  .editC>div {
    display: block;
  }

  .editC>div>.el-checkbox {
    width: 800px;
    text-align: left;
    margin: 30px auto;
    margin-left: 30px;
  } */
  .itemContent>div>.Cinfo>table>tr>td:nth-child(1) {
    width: 100px;
  }

  .itemContent>div>.Cinfo>table>tr>td:nth-child(2) {
    width: 20px;
  }
}
</style>
