<template>
<div class="about">
  <div id="flex">
    <h2>ABOUT</h2>
  </div>
  <p>
    DJ Listは、日本を含め世界中で活動する
    <br />
    「DJのリストを集めたユーザー投稿型サイト」です。
    <br />
    投稿はログインしなくてもできます。
    <br />
    プロのDJ、地方のDJ、個人で趣味でやっている方など、どんな方でもいいのでどんどん投稿してください！
  </p>
</div>
</template>

<style lang="scss">
.about {
    margin-top: 100px;
    padding: 0 8vw;
    min-height: 100vh;

    h2 {
        margin: auto auto 50px;
        font-family: "nicomojiPlus";
    }

    p {
        text-align: center;
    }
}

@media screen and (min-width:768px) {
    .about {
        padding: 0 20%;
    }
}
</style>


<script>
export default {
  name: 'about',
}
</script>
