<template>
  <div class="itemChange">
    <div @click="toRenew(item)">情報を変更する</div>
  </div>
</template>

<script>
export default {
  name: "itemChange",
  props: {
    item: Object,
    toRenew: Function
  }
};
</script>

<style lang="scss">
$main-color: #ec0d08;

.itemChange {
  padding: 0 8vw;
  margin: 30px 0;
  text-align: center;

  div {
    cursor: pointer;
    background: #fff;
    padding: 20px 10px;
    border-radius: 0.5em;
    margin-bottom: 10px;
    font-weight: bold;
    color: $main-color;
    transition: 0.6s;

    &:hover {
      color: #fff;
      background: $main-color;
      transition: 0.3s;
    }
  }
}
</style>
