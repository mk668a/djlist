<template>
<div class="userLogin">
  <div id="flex">
    <h2>LOGIN</h2>
  </div>
  <form class="purple" id="block">
    <div id="flex">
      <v-icon name="mail"></v-icon>
      <div>
        <input type="text" placeholder="e-mail" v-model="email" />
      </div>
    </div>
    <div id="flex">
      <v-icon name="lock"></v-icon>
      <div>
        <input type="password" placeholder="password" v-model="password" />
      </div>
    </div>
    <div class="button" id="block">
      <div id="flex">
        <button @click="login">LOGIN</button>
      </div>
      <div id="flex">
        <button @click="toUsrSignUp">SIGN UP</button>
      </div>
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
                        transition: .6s;

                        &:hover{
                          color: #a458ec;
                          background: #fff;
                          border-color: #a458ec;
                          transition: .3s;
                        }
                    }
                }
            }
        }
    }
}
</style>
