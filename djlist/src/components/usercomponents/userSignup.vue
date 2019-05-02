<template>
<div class="userSignup">
  <h2>ユーザー登録</h2>
  <form>
    <div>
      <!-- <v-icon name="mail" style="height:24px;"></v-icon> -->
      <input type="text" placeholder="メールアドレス" v-model="email" required />
    </div>
    <!-- <div>
      <v-icon name="user" style="height:24px;"></v-icon>
      <input type="text" placeholder="ユーザー名" v-model="username" required />
    </div> -->
    <div>
      <!-- <v-icon name="unlock" style="height:24px;"></v-icon> -->
      <input type="password" placeholder="パスワード" v-model="password" required />
    </div>
    <!-- <div>
      <v-icon name="lock" style="height:24px;"></v-icon>
      <input type="password" placeholder="パスワード(確認)" v-model="passwordConfirm" required />
    </div> -->
    <!-- <span>
      <a style="color:#c1c1c1">*大文字と記号を1つ以上含めてください</a>
    </span> -->
    <button style="boder:solid 1px #c1c1c1; border-radius: .3em; width:100px; height:40px;" @click="singup">登録</button>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'userSignup',
  props: {
    // 'width': Number,
    // 'display': Function
  },
  data() {
    return {
      email: '',
      password: '',
      username: '',
      passwordConfirm: ''
    }
  },
  methods: {
    singup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(res => {
        // this.$notify({
        //   title: '確認コードを入力してください',
        //   message: this.email + 'に確認コードを送信しました',
        //   type: 'success'
        // })
        // 登録に成功したら、確認コードの入力画面を表示
        console.log('Create account: ', res.user.email)
        this.$router.push('userLogin')
      }).catch(error => {
        console.log(error.message)
        // this.$notify.error({
        //   title: ' パスワードが一致しません',
        //   message: 'パスワードが一致しているか確認してください'
        // })
      })
    }
  }
}
</script>

<style>
.userSignup {
  background: no-repeat url("../../assets/backgroundimg.png");
  background-size: contain;
  background-position: top;
}

.userSignup>form {
  margin: 120px auto auto;
  display: block;
}

.userSignup>h2 {
  margin: 0;
  padding: 30px;
  background: #F1F4F7;
}

.userSignup>form>* {
  display: block;
}

.userSignup>form>div {
  border-bottom: 1px solid #c1c1c1;
  width: 480px;
  margin: 30px auto;
  padding-bottom: 10px;
  text-align: left;
  display: flex;
}

.userSignup>form>div>.icon {
  vertical-align: bottom;
  color: #c1c1c1;
}

.userSignup>form>div>input {
  width: 100%;
  border: 0px;
  font-size: 18px;
  outline: none;
  padding-left: 10px;
  background-color: rgba(255, 0, 0, 0);
}

.userSignup>form>button {
  width: 240px;
  height: 40px;
  margin: 60px auto;
  border: solid 1px #f2cf01;
  border-radius: .3em;
  background: #f2cf01;
  font-size: 18px;
  color: white;
}

.userSignup>button {
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

.userSignup>button a:visited {
  color: inherit;
}

@media screen and (max-width:768px) {
  .userSignup>form>div {
    width: 240px !important;
  }

  .userSignup>form>button {
    width: 180px;
  }

  .userSignup>button {
    width: 180px;
  }
}
</style>
