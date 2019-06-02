<template>
<div class="userSignup" id="block">
  <div id="flex">
    <h2>SIGNUP</h2>
  </div>
  <form class="purple" id="block">
    <div id="flex">
      <v-icon name="mail"></v-icon>
      <div>
        <input v-model="email" placeholder="e-mail" required></input>
      </div>
    </div>
    <div id="flex">
      <v-icon name="lock"></v-icon>
      <div>
        <input v-model="password" placeholder="password" required></input>
      </div>
    </div>
    <div id="flex">
      <p>
        ※6文字以上
      </p>
    </div>
    <div id="flex">
      <button @click="singup">登録する</button>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'userSignup',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    singup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(res => {
        this.$notify({
          title: 'メールアドレスを確認してください',
          message: this.email + 'に確認コードを送信しました',
          type: 'success'
        })
        // 登録に成功したら、確認コードの入力画面を表示
        console.log('Create account: ', res.user.email)
        this.$router.push('userLogin')
      }).catch(error => {
        console.log(error.message)
        this.$notify.error({
          title: ' 入力エラー',
          message: '正しいメールアドレス, パスワードを入力してください'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.userSignup {
    min-height: 100vh;
    width: 100%;
    margin-top: 100px;

    div {
        h2 {
            margin: auto auto 50px;
            font-family: "nicomojiPlus";
        }
    }
    .purple {

        input {
            margin-bottom: 40px;
        }

        svg {
            margin-left: auto;
            margin-right: 10px;
        }

        div {
            div {
                margin-right: auto;
                margin-left: 0;
            }

            button {
                margin: auto;
            }

            p {
                margin: -30px auto 50px;
            }
        }
    }
}
</style>
