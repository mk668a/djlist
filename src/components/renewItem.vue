<template>
<div class="renew">
  <div id="flex">
    <h2>CHANGE INFO</h2>
  </div>

  <div class="postImg">
    <div>
      <img :src='item.img' />
    </div>
  </div>

  <form class="purple">

    <div id="flex">
      <div class="itemName" id="flex">
        <h4>
          名前
        </h4>
      </div>
      <div style="width: 226px; padding-left:10px;">
        <h4>{{item.name}}</h4>
      </div>
    </div>

    <div id="flex">
      <div class="itemName" id="flex">
        <p></p>
        <h4>
          活動場所
        </h4>
      </div>
      <div id="block" class="dynamicInput">
        <input v-for="(place, index) in places" :key="index" type="url" v-model="places[index]" required></input>
      </div>
    </div>

    <div id="flex">
      <div class="itemName" id="flex">
        <p></p>
        <h4>
          リンク
        </h4>
      </div>
      <div id="block" class="dynamicInput">
        <input v-for="(url, index) in urls" :key="index" type="url" v-model="urls[index]" required></input>
      </div>
    </div>

    <div id="flex">
      <div class="itemName" id="flex">
        <p></p>
        <h4>
          ジャンル
        </h4>
      </div>
      <div id="block" class="dynamicInput">
        <input v-for="(genre, index) in genres" :key="index" type="url" v-model="genres[index]" required></input>
      </div>
    </div>

    <div class="button" id="block">
      <div id="flex">
        <button type="button" @click="postC">更新</button>
      </div>
    </div>

    <div class="button" id="block">
      <div id="flex">
        <button type="button" @click="toItem(item)" href="#" v-scroll-to="'#top'">キャンセル</button>
      </div>
    </div>

  </form>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'renew',
  props: {
    'toItem': Function,
  },
  data() {
    return {
      item: {},
      places: [""],
      urls: [""],
      genres: [""]
    };
  },
  methods: {
    cancel() {

    },
    postC() {
      var itemId
      firebase.database().ref('/items').orderByChild("name").equalTo(this.item.name).
      on("child_added", function(snapshot) {
        console.log(snapshot.val());
        itemId = snapshot.key
      })

      var places = {};
      places['/items/' + itemId + "/places"] = this.places.slice(0, -1)
      firebase.database().ref().update(places)

      var url = {};
      url['/items/' + itemId + "/url"] = this.urls.slice(0, -1)
      firebase.database().ref().update(url)

      var genre = {};
      genre['/items/' + itemId + "/genre"] = this.genres.slice(0, -1)
      firebase.database().ref().update(genre)

      this.$notify({
        title: '更新しました',
        message: this.query + 'が更新されました',
        type: 'success'
      })
      this.toItem(this.item)
    },
    getItem() {
      this.query = this.$route.query.name
      console.log(this.query);
      // if (Object.keys(this.item).length == 0) {
      let self = this
      firebase.database().ref('/items').orderByChild("name").equalTo(self.query).
      on("child_added", function(snapshot) {
        self.item = snapshot.val()
        if (self.item.places != undefined) self.places = self.item.places
        if (self.item.url != undefined) self.urls = self.item.url
        if (self.item.genre != undefined) self.genres = self.item.genre
        console.log(self.item);
      })
      // }
    }
  },
  mounted() {
    this.getItem()
  },
  watch: {
    places: {
      handler: function(val) {
        var array = []
        for (var i in this.places) {
          if (this.places[i] != "") {
            array.push(this.places[i])
          }
        }
        array.push("")
        for (var i in array) {
          this.places[i] = array[i]
        }
        this.places.length = array.length
      },
      deep: true
    },
    urls: {
      handler: function(val) {
        var array = []
        for (var i in this.urls) {
          if (this.urls[i] != "") {
            array.push(this.urls[i])
          }
        }
        array.push("")
        for (var i in array) {
          this.urls[i] = array[i]
        }
        this.urls.length = array.length
      },
      deep: true
    },
    genres: {
      handler: function(val) {
        var array = []
        for (var i in this.genres) {
          if (this.genres[i] != "") {
            array.push(this.genres[i])
          }
        }
        array.push("")
        for (var i in array) {
          this.genres[i] = array[i]
        }
        this.genres.length = array.length
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">
$main-color: #EC0D08;

.renew {

    button,
    h4,
    span {
        font-family: "nicomojiPlus";
    }

    min-height: 100vh;
    width: 100%;
    margin-top: 100px;

    div {
        h2 {
            margin: auto auto 20px;
            font-family: "nicomojiPlus";
        }
    }

    .postImg {
        display: flex;
        height: auto;
        width: 100%;

        div {
            width: 80%;
            height: 80%;
            margin: auto;

            img {
                width: 100%;
                height: auto;
                margin-bottom: 30px;
                border-radius: 0.5em;
            }
        }

    }

    .purple {

        .itemName {
            width: 30%;
            margin-right: 0;
            margin-left: auto;

            .required {
                font-size: 10px;
                border: solid 1px $main-color;
                border-radius: 0.5em;
                background: $main-color;
                color: #fff;
                margin: auto 3px;
                height: 18px;
                padding: 1px;
            }

            h4 {
                &:nth-of-type(2) {
                    font-weight: bold;
                }
            }
        }

        #flex {
            .dynamicInput {
                width: 236px;

                input {
                    margin-bottom: 10px;
                }
            }
        }

        .uploadImgUrl,
        input {
            width: 210px;
            margin-left: 0;
            margin-right: auto;
        }

        .uploadImgUrl {
            text-align: center;
            padding: 8px 5px;
            cursor: pointer;
            font-size: 18px;
            height: 24px;
            border-radius: 0.5em;
            border: solid 3px #a458ec;
            font-weight: bold;
            outline: none;
            color: #fff;
            background: #a458ec;
            transition: 0.3s;

            &:hover {
                color: #a458ec;
                background: #fff;
                border-color: #a458ec;
            }
            &:active {
                background: #a458ec;
                color: #fff;
                border-color: #a458ec;
                transition: 0.3s;
            }
        }

        .button {
            div {
                width: 100%;

                button {
                    margin: auto auto 20px;
                    width: 200px;
                }
            }
        }

        svg {
            margin-left: auto;
            margin-right: 10px;
        }

        div {
            margin-bottom: 20px;

            div {
                margin-right: auto;
                margin-left: 0;
            }
        }

        .imageSwitch {
            h4 {
                width: 30%;
                margin-right: 0;
                margin-left: auto;
            }

            .el-switch__core {
                background: transparent;
                border-color: #a458ec;
                border-width: 2px;
                height: 24.5px;
                width: 50px!important;
                border-radius: 30px;

                &:after {
                    background: transparent;
                    border: 2px solid #a458ec;
                    top: 1.5px;
                    width: 14px;
                    height: 14px;
                }
            }

            .el-switch {

                .el-switch__label.is-active {
                    color: #a458ec;
                }

                .is-checked .el-switch__core {
                    border-color: #a458ec;
                    border-width: 2px;

                    &::after {
                        margin-left: -20px!important;
                    }
                }
            }

        }
    }

}
</style>
