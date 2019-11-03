<template>
  <div class="main">
    <div class="searchSpan" :style="searchHiddenStyle">
      <Search v-if="done" :items="items" :toform="toform" :done="done" />
    </div>
    <div class="toAboutSpan" :style="aboutHiddenStyle">
      <toAbout :deleteAbout="deleteAbout" :about="about" />
    </div>
    <div class="contentsSpan">
      <Contents
        :toItem="toItem"
        :items="items"
        :confirmLiked="confirmLiked"
        :like="like"
        :about="about"
      />
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Contents from "@/components/Contents";
import toAbout from "@/components/toAbout";

export default {
  name: "Main",
  components: {
    Search,
    Contents,
    toAbout
  },
  data() {
    return {
      targetRect: 0,
      searchHiddenStyle: {},
      aboutHiddenStyle: {}
    };
  },
  props: {
    toItem: Function,
    toform: Function,
    items: Array,
    confirmLiked: Function,
    like: Function,
    about: Boolean,
    deleteAbout: Function,
    done: Boolean
  },
  methods: {
    handleScroll() {
      const content = document.querySelector(".contentsSpan");
      const search = document.querySelector(".searchSpan");
      const about = document.querySelector(".toAboutSpan");

      const rect = content.getBoundingClientRect().top;

      this.targetRect = rect;

      if (this.targetRect < 20) {
        this.$set(this.searchHiddenStyle, "visibility", "hidden");
        search.classList.add("head-animation");

        this.$set(this.aboutHiddenStyle, "visibility", "hidden");
        about.classList.add("head-animation");
      } else {
        this.$set(this.searchHiddenStyle, "visibility", "visible");
        search.classList.remove("head-animation");

        this.$set(this.aboutHiddenStyle, "visibility", "visible");
        about.classList.remove("head-animation");
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
$main-color: #ec0d08;

// .fade-leave {
//     opacity: 1;
// }
// .fade-leave-to {
//     opacity: 0;
// }
// .fade-leave-active {
//     transition: opacity 300ms ease-out;
// }

.head-animation {
  transform: translateY(-200%);
}

.main {
  min-height: 100vh;

  .searchSpan {
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: fixed;
    margin-top: 30px;
    width: 100%;
    z-index: 100;
    background: transparent;
  }

  .toAboutSpan {
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
    margin-top: 190px;
    position: fixed;
    width: 100%;
  }

  .contentsSpan {
    z-index: 0;
    position: relative;

    .contents {
      transition: 0.3s;
      padding-top: 170px;
    }
    .contents.active {
      padding-top: 280px;
    }
  }
}

@media screen and (max-width: 370px) {
  .main {
    .toAboutSpan {
      margin-top: 240px;
    }
  }
}
</style>
