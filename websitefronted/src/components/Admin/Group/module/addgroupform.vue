<template>
  <Modal
    v-model="modal1"
    title="新增分组"
    footer-hide>
    <Form ref="form1" :model="form1" :label-width="120">
      <FormItem label="分组名称"  prop="name" :rules="{required:true,message:'分组名称不能为空',trigger:'blur'}" @keydown.native.enter.prevent ="()=>{}">
        <Input ref="InputGroup" type="text"  v-model="form1.name" clearable  placeholder="请输入分组名称" style="width: 300px;" ></Input>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="4" offset="14">
            <Button type="primary" @click="handleSubmit('form1')">确定</Button>
          </Col>
          <Col span="4">
            <Button type="error" @click="handleCancel('form1')" style="margin-left: 8px">取消</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "addgroupform",
        data() {
            return {
                modal1: false,
                form1: {
                    name: ''
                },
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post('api/group/',this.form1).then(resp=>{
                            this.$Message.success('添加成功');
                            this.handleCancel(name)
                            console.log(this.$parent)
                            this.$parent.init()
                        }).catch(error=>{
                            this.$Message.err('添加失败'+error)
                            console.log(error)
                        })
                    }
                })
            },
            handleCancel(name) {
                this.modal1 = false
                this.$refs[name].resetFields()
                this.form1={name: ''}
            },
            inputFocus() {
                this.$nextTick(() => {
                    this.$refs['InputGroup'].focus()
                })
            }
        }
    }
</script>

<style scoped>

</style>
