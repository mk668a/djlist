<template>
<div class="management">
  <div id="flex">
    <h2>management</h2>
  </div>
  <div id="management">
    <p>
      運営者のメールアドレス
    </p>
    <p>
      <a href="mailto:msftoaa@gmail.com">
        msftoaa@gmail.com
      </a>
    </p>
  </div>
</div>
</template>

<style lang="scss">
.management {
    margin: 100px 5% 50px;
    min-height: 70vh;

    h2 {
        margin: auto auto 40px;
        font-family: "nicomojiPlus";
    }

    h3 {
        font-size: 18px;
    }

    a,
    p {
        font-size: 20px;
        padding: 0;
    }

    #management {
        display: flex;

        a{
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

@media screen and (min-width:768px) {
    .management {
        padding: 0 20%;
    }
}
</style>


<script>
export default {
  name: 'management',
}
</script>
