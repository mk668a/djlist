<template>
<div class="userConfirm">
  <h2>確認コード入力</h2>
  <form @submit.prevent="confirm">
    <div>
      <!-- <v-icon name="mail" style="height:24px;"></v-icon> -->
      <input type="text" placeholder="メールアドレス" v-model="username" required />
    </div>
    <div>
      <!-- <v-icon name="check" style="height:24px;"></v-icon> -->
      <input type="text" placeholder="確認コード" v-model="confirmationCode" required />
    </div>
    <button>確認</button>
  </form>
  <button type="warning" plain>
    <router-link to="userSignup" style="text-decoration:none;">ユーザー登録</router-link>
  </button>
</div>
</template>

<script>
import userSignup from '@/components/usercomponents/userSignup'

export default {
  name: 'userConfirm',
  components: {
    userSignup,
  },
  props: {
    'width': Number,
    'display': Function
  },
  data() {
    return {
      username: '',
      confirmationCode: ''
    }
  },
  methods: {
    confirm() {
      this.$cognito.confirmation(this.username, this.confirmationCode)
        .then(result => {
          console.log('success')
          this.$notify({
            title: '登録完了',
            message: this.username + 'の登録が完了しました',
            type: 'success'
          })
          this.$router.replace('/userMain')
        })
        .catch(err => {
          this.error = err
          this.$notify.error({
            title: ' 確認できません',
            message: 'メールアドレスかまたは確認コードが違います'
          })
        })
    }
  }
}
</script>

<style>
.userConfirm {
  background: no-repeat url("../../assets/backgroundimg.png");
  background-size: contain;
  background-position: top;
}

.userConfirm>form {
  margin: 120px auto auto;
  display: block;
}

.userConfirm>h2 {
  margin: 0;
  padding: 30px;
  background: #F1F4F7;
}

.userConfirm>form>* {
  display: block;
}

.userConfirm>form>div:nth-of-type(1),
.userConfirm>form>div:nth-of-type(2) {
  border-bottom: 1px solid #c1c1c1;
  width: 480px;
  margin: 30px auto;
  padding-bottom: 10px;
  text-align: left;
  display: flex;
}

.userConfirm>form>div>.icon {
  vertical-align: bottom;
  color: #c1c1c1;
}

.userConfirm>form>div>input {
  width: 100%;
  border: 0px;
  font-size: 18px;
  outline: none;
  padding-left: 10px;
  background-color: rgba(255, 0, 0, 0);
}

.userConfirm>form>button {
  width: 240px;
  height: 40px;
  margin: auto;
  margin-top: 60px;
  border: solid 1px #f2cf01;
  border-radius: .3em;
  background: #f2cf01;
  font-size: 18px;
  color: white;
}

.userConfirm>button {
  width: 240px;
  height: 40px;
  margin: 50px auto;
  margin-bottom: 200px;
  boder: solid 1px #c1c1c1;
  border-radius: .3em;
  border: solid 1px #f2cf01;
  font-size: 18px;
  color: #757575;
  background: white;
}

.userConfirm>button a:visited {
  color: #757575;
}

@media screen and (max-width:768px) {
  .userConfirm>form>div {
    width: 240px !important;
  }

  .userConfirm>form>button {
    width: 180px;
  }

  .userConfirm>button {
    width: 180px;
  }

}
</style>
