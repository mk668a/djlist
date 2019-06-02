<template>
<div class="main">
  <div class="searchSpan" :style="searchHiddenStyle">
    <Search :toform='toform' />
  </div>
  <div class="toAboutSpan" :style="aboutHiddenStyle">
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
  data() {
    return {
      targetRect: 0,
      searchHiddenStyle: {},
      aboutHiddenStyle: {},
    }
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
  methods: {
    handleScroll() {
      const content = document.querySelector('.contentsSpan');
      const search = document.querySelector('.searchSpan');
      const about = document.querySelector('.toAboutSpan');

      const rect = content.getBoundingClientRect().top;
      // console.log(rect);

      this.targetRect = rect;

      // if (this.targetRect < -150) {
      //   this.$set(this.searchHiddenStyle, 'visibility', 'hidden');
      //   search.classList.add('head-animation');
      //   console.log(this.searchHiddenStyle);
      // } else {
      //   this.$set(this.searchHiddenStyle, 'visibility', 'visible');
      //   search.classList.remove('head-animation');
      // }

      if (this.targetRect < -20) {
        this.$set(this.searchHiddenStyle, 'visibility', 'hidden');
        search.classList.add('head-animation');

        this.$set(this.aboutHiddenStyle, 'visibility', 'hidden');
        about.classList.add('head-animation');
        console.log(this.aboutHiddenStyle);
      } else {
        this.$set(this.searchHiddenStyle, 'visibility', 'visible');
        search.classList.remove('head-animation');

        this.$set(this.aboutHiddenStyle, 'visibility', 'visible');
        about.classList.remove('head-animation');
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
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

.head-animation {
    transform: translateY(-200%);
}

.main {
    display: block;
    // margin-top: 100px;
    .searchSpan {
        transition: 0.3s cubic-bezier(.4, 0, .2, 1);
        position: fixed;
        margin-top: 50px;
        width: 100%;
        z-index: 100;
        // background: linear-gradient(0rad, rgba(#fff, 0) , rgba(#FDE816, .5) 50%, rgba(#fff, 1));
        background: transparent;
    }

    .toAboutSpan {
        transition: 0.3s cubic-bezier(.4, 0, .2, 1);
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
            padding-top: 300px;
        }
    }
}
</style>
