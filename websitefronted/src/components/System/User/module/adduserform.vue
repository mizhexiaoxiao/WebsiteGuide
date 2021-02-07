<template>
  <Modal
    v-model="modal"
    title="新增用户"
    :closable="false"
    footer-hide>
    <Form ref="form" :model="form" :label-width="120" :rules="rules">
      <FormItem label="用户名" prop="username">
        <Input type="text" autoComplete="off" v-model="form.username" clearable placeholder="请输入用户名"
               style="width: 300px;"></Input>
      </FormItem>
      <FormItem label="姓名" prop="alias">
        <Input type="text"  v-model="form.alias" clearable placeholder="请输入姓名"
               style="width: 300px;"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="form.password" clearable placeholder="请输入密码"
               style="width: 300px;"></Input>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="4" offset="14">
            <Button type="primary" @click="handleSubmit('form')">确定</Button>
          </Col>
          <Col span="4">
            <Button type="error" @click="handleCancel('form')" style="margin-left: 8px">取消</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "adduserform",
        data() {
            return {
                modal: false,
                form: {
                    username: '',
                    alias:'',
                    password:''
                },
                rules:{
                    username:{required:true,message:'用户名不能为空',trigger:'blur'},
                    alias:{required:true,message:'姓名不能为空',trigger:'blur'},
                    password:{required:true,message:'密码不能为空',trigger:'blur'}
                }
            }
        },
        mounted(){
        },
        methods: {
            handleSubmit() {
                axios.post('api/user/',this.form).then(resp =>{
                    this.modal = false
                    this.$Message.success('添加成功')
                    this.$parent.init()
                }).catch(error =>{
                    this.$Notice.error({
                        title:'添加失败',
                        desc:JSON.stringify(error.response.data)
                    })
                })
            },
            handleCancel(name) {
                this.modal = false
                this.$refs[name].resetFields()
                this.form = {
                    username: '',
                    alias:'',
                    password: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
