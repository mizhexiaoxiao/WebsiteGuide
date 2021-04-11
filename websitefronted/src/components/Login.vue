<style scoped>
  .login_back {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: #0a246a;
    /*url(../images/background.jpg) repeat ;*/
    /* padding-top:200px;*/
  }

  .login_self {
    width: 430px;
    height: 330px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 5px;
  }

  .form_center {
    width: 300px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding-top: 50px;
  }
</style>

<template>
  <div class="login_back" v-wechat-title="$route.meta.title">
    <div class='login_self'>
      <Form ref="loginForm" :model="loginData" class='form_center' :rules="loginRules">
        <FormItem style="text-align: center">
            <h1>Login</h1>
        </FormItem>
        <FormItem prop="username">
          <Input type="text" clearable placeholder="Username" v-model='loginData.username' size="large" @on-enter='login("loginForm")'>
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" clearable placeholder="Password" v-model='loginData.password' size="large" @on-enter='login("loginForm")'>
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button :loading="loading" type="primary" long @click='login("loginForm")' size="large">
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'login',
        data: function () {
            return {
                loginData: {
                    username: '',
                    password: '',
                },
                loginRules: {
                    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
                },
                loading: false
            }
        },
        methods: {
            login(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('login', this.loginData).then(resp => {
                            this.loading = false
                            this.$router.push({name: 'admin'})
                        }).catch(error => {
                            this.loading = false
                            this.$Notice.error(
                                {
                                    title: "登录失败",
                                    desc: error.response.data.detail
                                }
                            )
                        })
                    }
                })
            }
        }
    }
</script>
