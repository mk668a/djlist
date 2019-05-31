<template>
<div class="userLogin">
  <h2>ログイン</h2>
  <form>
    <div>
      <v-icon name="mail" style="height:24px; max-width: 100%;"></v-icon>
      <input type="text" placeholder="メールアドレス" v-model="email" required />
    </div>
    <div>
      <v-icon name="lock" style="height:24px; max-width: 100%;"></v-icon>
      <input type="password" placeholder="パスワード" v-model="password" required />
    </div>
  </form>
  <button @click="login">ログイン</button>
  <button type="warning" plain>
    <router-link to="userSignup" style="text-decoration:none;">ユーザー登録</router-link>
  </button>
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
    }
  }
}
</script>

<style lang="scss">
.userLogin {
  background-size: contain;
  background-position: top;
}

.userLogin>form {
  margin: 120px auto auto;
  display: block;
}

.userLogin>h2 {
  margin: 0;
  padding: 30px;
  background: #F1F4F7;
}

.userLogin>form>* {
  display: block;
}

.userLogin>form>div:nth-of-type(1),
.userLogin>form>div:nth-of-type(2) {
  border-bottom: 1px solid #c1c1c1;
  width: 480px;
  margin: 30px auto;
  padding-bottom: 10px;
  text-align: left;
  display: flex;
}

.userLogin>form>div:nth-of-type(3) {
  width: 480px;
  margin: auto;
  text-align: right;
}

.userLogin>form>div>.confirm {
  font-size: 14px;
  width: 100px;
  margin: auto;
  color: #c1c1c1;
  text-decoration: none;
}

.userLogin>form>div>.icon {
  vertical-align: bottom;
  color: #c1c1c1;
}

.userLogin>form>div>input {
  width: 100%;
  border: 0px;
  font-size: 18px;
  outline: none;
  padding-left: 10px;
  background-color: rgba(255, 0, 0, 0);
}

.userLogin>form button {
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

.userLogin button {
  width: 240px;
  height: 40px;
  margin: 50px auto;
  margin-bottom: 200px;
  border-radius: .3em;
  border: solid 1px #f2cf01;
  font-size: 18px;
  color: #757575;
  background: white;
}

.userLogin button a:visited {
  color: #757575;
}

@media screen and (max-width:768px) {
  .userLogin>form>div {
    width: 240px !important;
  }

  .userLogin>form button {
    width: 180px;
  }

  .userLogin button {
    width: 180px;
  }
}
</style>
