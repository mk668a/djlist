<template>
<div class="userLogin">
  <div id="flex">
    <h2>LOGIN</h2>
  </div>
  <form class="purple" id="block">
    <div id="flex">
      <v-icon name="mail"></v-icon>
      <div>
        <input type="text" placeholder="メールアドレス" v-model="email" required />
      </div>
    </div>
    <div id="flex">
      <v-icon name="lock"></v-icon>
      <div>
        <input type="password" placeholder="パスワード" v-model="password" required />
      </div>
    </div>
    <div id="flex">
      <button @click="login">ログイン</button>
      <button @click="toUsrSignUp">ユーザー登録</button>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'userLogin',
  data() {
    return {
      email: '',
      password: '',
      id: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // console.log('Success!')
            this.$router.push('userInfo')
          },
          err => {
            console.log(err.message);
            if (this.email != '' && this.password != '') {
              this.$notify.error({
                title: ' ログインできません',
                message: 'メールアドレスかまたはパスワードが違います'
              })
            }
          }
        )
    },
    toUsrSignUp() {
      this.$router.push('userSignup')
    }
  }
}
</script>

<style lang="scss">
.userLogin {
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
                &:nth-of-type(1) {
                    margin: auto 10px auto auto;
                }
                &:nth-of-type(2) {
                    margin: auto auto auto 10px;
                }
            }
        }
    }
}
</style>
