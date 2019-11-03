<template>
  <div class="management" id="footerContens">
    <div id="flex">
      <h2>management</h2>
    </div>
    <div id="content">
      <p>運営者のメールアドレス</p>
      <p>
        <a href="mailto:msftoaa@gmail.com">msftoaa@gmail.com</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.management {
  #content {
    a {
      color: blue;
      border-bottom: 1px solid blue;
    }

    p {
      &:nth-of-type(1) {
        margin-right: 10px;
        margin-left: auto;
      }
      &:nth-of-type(2) {
        margin-right: auto;
        margin-left: 0;
      }
    }
  }
}

@media screen and (max-width: 530px) {
  .management {
    #content {
      display: block;

      p {
        margin: 0 !important;
        text-align: center;
      }
    }
  }
}
</style>


<script>
export default {
  name: "management"
};
</script>
