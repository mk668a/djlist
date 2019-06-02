<template>
<div class="main">
  <div class="searchSpan">
    <Search :toform='toform' />
  </div>
  <div class="toAboutSpan">
    <toAbout :deleteAbout="deleteAbout" :about="about" />
  </div>
  <div class="contentsSpan">
    <Contents :toItem="toItem" :items="items" :confirmLiked="confirmLiked" :like="like" :about="about" />
  </div>
</div>
</template>

<script>
import Search from '@/components/Search'
import Contents from '@/components/Contents'
import toAbout from '@/components/toAbout'

export default {
  name: 'Main',
  components: {
    Search,
    Contents,
    toAbout
  },
  props: {
    "toItem": Function,
    "toform": Function,
    "items": Array,
    "confirmLiked": Function,
    "like": Function,
    'about': Boolean,
    'deleteAbout': Function
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
    display: block;
    // margin-top: 100px;
    .searchSpan {
        position: fixed;
        margin-top: 50px;
        width: 100%;
        z-index: 100;
        background: linear-gradient(0rad, rgba(#fff, 0) , rgba(#FDE816, .5) 50%, rgba(#fff, 1));
    }

    .toAboutSpan {
        z-index: 100;
        margin-top: 200px;
        position: fixed;
        width: 100%;
    }

    .contentsSpan {
        z-index: 0;
        position: relative;
        .contents {
            padding-top: 200px;
        }
        .contents.active {
            padding-top: 320px;
        }
    }
}
</style>
