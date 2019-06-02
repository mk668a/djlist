<template>
<div class="userSignup" id="block">
  <div id="flex">
    <h2>SIGNUP</h2>
  </div>
  <form class="purple" id="block">
    <div id="flex">
      <v-icon name="mail"></v-icon>
      <div>
        <input v-model="email" placeholder="e-mail"></input>
      </div>
    </div>
    <div id="flex">
      <v-icon name="lock"></v-icon>
      <div>
        <input v-model="password" placeholder="password"></input>
      </div>
    </div>
    <div id="flex" class="sub">
      <p>
        ※6文字以上
      </p>
    </div>
    <div class="button" id="block">
      <div id="flex">
        <button @click="singup">登録</button>
      </div>
      <div id="flex">
        <button @click="toUserLogin">ログイン</button>
      </div>
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
    },
    toUserLogin() {
      this.$router.push('userLogin')
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
        }

        svg {
            margin-left: auto;
            margin-right: 10px;
        }

        div {
          margin-bottom: 20px;

            div {
                margin-right: auto;
                margin-left: 0;
            }

            p{
              margin: auto;
            }
        }

        .sub{
          margin: -30px auto 40px;
        }

        .button {
            div {
                width: 100%;

                button {
                    margin: auto auto 20px;
                    width: 200px;
                }

                &:nth-of-type(2) {
                    button {
                        color: #fff;
                        background: #a458ec;
                        transition: 0.6s;

                        &:hover {
                            color: #a458ec;
                            background: #fff;
                            border-color: #a458ec;
                            transition: 0.3s;
                        }
                    }
                }
            }
        }
    }
}
</style>
