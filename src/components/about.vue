<template>
<div class="about">
  <div id="flex">
    <h2>ABOUT</h2>
  </div>
  <p>
    日本を含めた世界で活動するDJのリストを集めたページです。
    投稿はログインしなくてもできます。
    プロでやっている方から趣味でやっている方まで投稿していただきたいです。
  </p>
</div>
</template>

<style lang="scss">
.about {
    margin-top: 100px;
    min-height: 100vh;

    h2 {
        margin: auto auto 50px;
        font-family: "nicomojiPlus";
    }

    p{
      padding: 0 50px;
    }
}

@media screen and (max-width:768px) {}
</style>


<script>
export default {
  name: 'about',
}
</script>
