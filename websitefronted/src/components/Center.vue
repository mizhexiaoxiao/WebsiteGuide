<template>
  <div class="container">
    <Content :style="{padding: '0 30px'}">
      <Card dis-hover>
        <Row>
          <div>修改密码</div>
        </Row>
        <div :style="{padding:'10px 0'}">
          <Form ref="form" :model="form" :label-width="120" :rules="rules">
            <FormItem label="新密码" prop="password1">
              <Input type="password" v-model="form.password1" autocomplete="off" password placeholder="请输入密码"
                     style="width: 300px;"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="password2">
              <Input type="password" v-model="form.password2" autocomplete="off" password placeholder="请输入密码"
                     style="width: 300px;"></Input>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="4">
                  <Button type="primary" @click="handleSubmit('form')">保存</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </Card>
    </Content>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Center',
  data() {
    return {
      form: {
        password1: '',
        password2: ''
      },
      rules: {
        password1: {required: true, message: '', trigger: 'blur'},
        password2: {required: true, message: '', trigger: 'blur'}
      }
    }
  },
  methods: {
    handleSubmit() {
      axios.post(`api/user/${this.$store.state.userid}/change-passwd/`, this.form).then(resp => {
        this.modal = false
        this.form = {
          password1: '',
          password2: ''
        }
        this.$Message.success('修改密码成功,请重新登录')
        this.$store.dispatch('logout').then(resp => {
          this.$router.push({name: 'login'})
        })
      }).catch(error => {
        this.$Notice.error({
          title: '重置失败',
          desc: JSON.stringify(error.response.data.msg)
        })
      })
    },
  }
}
</script>

<style scoped>
.container {
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
