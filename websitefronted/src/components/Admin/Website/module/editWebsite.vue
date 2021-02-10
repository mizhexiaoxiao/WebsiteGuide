<template>
  <Modal
    v-model="modal"
    :title="this.rowData.title"
    footer-hide>
    <Form ref="form" :model="form" :label-width="120" :rules="rules">
      <FormItem label="标题" prop="title" @keydown.native.enter.prevent="()=>{}">
        <Input ref="InputGroup" type="text" v-model="form.title" clearable placeholder="请输入标题"
               style="width: 300px;"></Input>
      </FormItem>
      <FormItem label="URL" prop="path" @keydown.native.enter.prevent="()=>{}">
        <Input ref="InputGroup" type="text" v-model="form.path" clearable placeholder="请输入URL"
               style="width: 300px;"></Input>
      </FormItem>
      <FormItem label="描述" prop="description" @keydown.native.enter.prevent="()=>{}">
        <Input ref="InputGroup" type="text" v-model="form.description" clearable placeholder="请输入描述"
               style="width: 300px;"></Input>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="4" offset="14">
            <Button type="primary" @click="handleSubmit('form')">保存</Button>
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
        name: "editWebsite",
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                modal: false,
                form: {
                    title: '',
                    path: '',
                    description: ''
                },
                //{required:true,message:'分组名称不能为空',trigger:'blur'}"
                rules: {
                    title: {
                        required: true, message: '标题不能为空', trigger: 'blur'
                    },
                    path: {
                        required: true, message: 'URL不能为空', trigger: 'blur'
                    },
                    description: {}
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.patch(`api/website/${this.rowData.id}/`, this.form).then(resp => {
                            this.$Message.success('保存成功');
                            this.handleCancel(name)
                            this.$parent.refresh()
                        }).catch(error => {
                            this.$Message.err('保存失败' + error)
                        })

                    }
                })
            },
            handleCancel(name) {
                this.modal = false
                this.$refs[name].resetFields()
            }
        }
    }
</script>

<style scoped>

</style>
