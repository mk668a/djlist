<template>
<div class="main">
  <transition name="fade">
    <div v-if="about" class="toAbout">
      <div @click="toAbout()"><span>click</span>☞About DJ List</div>
      <i class="el-icon-close" @click="deleteAbout"></i>
    </div>
  </transition>
  <Search :toform='toform' />
  <Contents :toItem="toItem" :items="items" :confirmLiked="confirmLiked" :like="like" />
</div>
</template>

<script>
import Search from '@/components/Search'
import Contents from '@/components/Contents'

export default {
  name: 'Main',
  components: {
    Search,
    Contents
  },
  props: {
    "toItem": Function,
    "toform": Function,
    "items": Array,
    "confirmLiked": Function,
    "like": Function,
  },
  data() {
    return {
      about: true
    }
  },
  methods: {
    deleteAbout() {
      this.about = false
    },
    toAbout() {
      this.$router.push('/about')
    }
  },
}
</script>

<style lang="scss">
$main-color: #ec0d08;

.fade-leave {
    opacity: 1;
}
.fade-leave-to {
    opacity: 0;
}
.fade-leave-active {
    transition: opacity 300ms ease-out;
}

.main {
    .toAbout {
        padding: 30px 10px;
        border: 3px solid #000;
        display: flex;
        font-size: 24px;
        color: #000;
        background: #fff;
        line-height: 1;
        margin-bottom: 40px;

        div {
            margin: auto;
            display: flex;
            span {
                height: 12px;
                font-size: 12px;
                margin-top: 2.6px;
                font-weight: bold;
            }
        }

        i {
            cursor: pointer;
            &::before {
                font-weight: bold;
            }
        }
    }
}
</style>
