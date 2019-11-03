<template>
  <div class="about" id="footerContens">
    <div id="flex">
      <h2>ABOUT</h2>
    </div>
    <div id="content">
      <p>
        DJ Listは、日本を含め世界中で活動する
        <br />「DJのリストを集めたユーザー投稿型サイト」です。
        <br />投稿はログインしなくてもできます。
        <br />プロのDJだけでなく地方のDJ、個人で趣味でやっている方などが見れるといいので投稿お待ちしています。
      </p>
    </div>
  </div>
</template>

<style lang="scss">
#footerContens {
  margin-top: 100px;
  padding: 0 8vw;
  min-height: 100vh;

  h2 {
    margin: auto auto 40px;
    font-family: "nicomojiPlus";
  }

  h3 {
    font-size: 18px;
  }

  a,
  p {
    font-size: 14px;
    padding: 0;
  }

  #content {
    border-radius: 15px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.5);
  }
}

.about {
  p {
    text-align: center;
  }
}

@media screen and (min-width: 768px) {
  #footerContens {
    padding: 0 20%;

    a,
    p {
      font-size: 20px;
    }
  }
}
</style>


<script>
export default {
  name: "about"
};
</script>
