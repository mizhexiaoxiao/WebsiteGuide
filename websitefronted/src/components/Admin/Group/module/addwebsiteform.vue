<template>
  <Modal
    v-model="modal2"
    width="700"
    :title="rowData.rowName"
    :closable="false"
    :mask-closable="false"
    footer-hide
    id="modal2">
    <Form ref="form2" :model="form2" :label-width="80" style="width: 700px">
      <FormItem
        v-for="(item,index) in form2.items"
        :key="index"
        :label="''+(index+1)">
        <FormItem>
          <Row>
            <Col span="16">
              <FormItem label="URL" :prop="'items.'+index+'.path'" :rules="rules.path" style="display: flex">
                <Input type="text" v-model="item.path" clearable placeholder="请输入URL" style="width: 300px;"></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <Button v-if="form2.items.length > 1" type="error" @click="handleRemove(index)">Delete</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="16">
              <FormItem label="标题" :prop="'items.'+index+'.title'" :rules="rules.title"
                        style="display: flex;margin-top: 20px">
                <Input type="text" v-model="item.title" clearable placeholder="请输入标题" clearable
                       style="width: 300px"></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="16">
              <FormItem label="描述" :prop="'items.'+index+'.description'" :rules="rules.description"
                        style="display: flex;margin-top: 20px">
                <Input type="text" v-model="item.description" clearable placeholder="请输入描述" clearable
                       style="width: 300px;"></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
<!--        <FormItem>-->
<!--          <Row>-->
<!--            <Col span="16">-->
<!--              <FormItem label="图标" :prop="'items.'+index+'.description'" :rules="rules.description"-->
<!--                        style="display: flex;margin-top: 20px">-->
<!--                <Upload-->
<!--                  :before-upload="handleUpload"-->
<!--                  action="//jsonplaceholder.typicode.com/posts/">-->
<!--                  <Button icon="ios-cloud-upload-outline">上传ICON</Button>-->
<!--                </Upload>-->
<!--                <div v-if="item.file !== null">Upload file: {{ item.file.name }}-->
<!--                  <Button type="text" @click="upload" :loading="loadingStatus">-->
<!--                    {{ loadingStatus ? 'Uploading' : 'Click to upload' }}-->
<!--                  </Button>-->
<!--                </div>-->
<!--              </FormItem>-->
<!--            </Col>-->
<!--          </Row>-->
<!--        </FormItem>-->
      </FormItem>
      <FormItem>
        <Row>
          <Col span="8" offset="4">
            <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="3" offset="16">
            <Button type="primary" @click="handleSubmit('form2')">提交</Button>
          </Col>
          <Col span="3">
            <Button type="error" @click="handleCancel('form2')" style="margin-left: 8px">取消</Button>
          </Col>
        </Row>


      </FormItem>
    </Form>
  </Modal>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'addwebsiteform',
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                modal2: false,
                loadingStatus: false,
                form2: {
                    items: [
                        {
                            path: '',
                            title: '',
                            description: '',
                            website_group: '',
                        }
                    ]
                },
                rules: {
                    path: {required: true, message: 'URL不能为空', trigger: 'blur'},
                    title: {required: true, message: '标题不能为空', trigger: 'blur'},
                    description: {}

                }
            }
        },
        methods: {
            // handleUpload(file) {
            //     console.log(file)
            //     this.file = file;
            //     return false;
            // },
            // upload() {
            //     this.loadingStatus = true;
            //     setTimeout(() => {
            //         this.file = null;
            //         this.loadingStatus = false;
            //         this.$Message.success('Success')
            //     }, 1500);
            // },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.form2.items.map(val => {
                            val.website_group = this.rowData.rowId
                        })
                        axios.post('api/website/', this.form2.items).then(resp => {
                            this.handleCancel(name),
                                this.$Message.success('添加成功')
                            this.$parent.init()
                        }).catch(error => {
                            this.$Modal.warning({
                                title: '异常信息',
                                content: JSON.stringify(error.response.data.detail)
                            })
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleCancel(name) {
                this.modal2 = false
                this.$refs[name].resetFields()
                this.form2.items = [{path: '', title: '', description: '', website_group: ''}]

            },
            handleAdd() {
                this.form2.items.push({
                    path: '',
                    title: '',
                    description: '',
                    website_group: ''
                });
            },
            handleRemove(index) {
                this.form2.items.splice(index, 1)
            }
        }
    }
</script>

<style scoped>

</style>
