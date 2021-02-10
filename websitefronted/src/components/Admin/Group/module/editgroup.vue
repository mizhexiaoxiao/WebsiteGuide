<template>
  <Modal
    v-model="modal3"
    title="编辑分组名称"
    footer-hide>
    <Form ref="form3" :model="form3" :label-width="120">
      <FormItem label="分组名称" prop="name" :rules="{required:true,message:'分组名称不能为空',trigger:'blur'}"
                @keydown.native.enter.prevent="()=>{}">
        <Input ref="InputGroup" type="text" v-model="form3.name" clearable placeholder="请输入分组名称"
               style="width: 300px;"></Input>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="4" offset="14">
            <Button type="primary" @click="handleSubmit('form3')">保存</Button>
          </Col>
          <Col span="4">
            <Button type="error" @click="handleCancel('form3')" style="margin-left: 8px">取消</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "editgroup",
        data() {
            return {
                modal3: false,
                id:'',
                form3: {
                    name:''
                },
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.put(`api/group/${this.id}/`,this.form3).then(resp=>{
                            this.$Message.success('保存成功');
                            this.handleCancel(name)
                            this.$parent.init()
                        }).catch(error=>{
                            this.$Message.err('保存失败'+error)
                            console.log(error)
                        })

                    }
                })
            },
            handleCancel(name) {
                this.modal3 = false
                this.$refs[name].resetFields()
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
