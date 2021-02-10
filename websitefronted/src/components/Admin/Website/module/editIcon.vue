<template>
  <Modal
    v-model="modal"
    title="替换图标"
    @on-ok="uploadIcon"
    @on-cancel="cancel">
    <div>
      <Upload
        ref="upload"
        :before-upload="handleUpload"
        action="">
        <Button icon="ios-cloud-upload-outline">上传图标</Button>
      </Upload>
      <div v-if="file !== null">Upload file: {{ file.name }}
      </div>
    </div>
  </Modal>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "editIcon",
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                modal: false,
                file: null,
            }
        },

        methods: {
            handleUpload(file) {
                this.file = file;
                return false;
            },
            uploadIcon() {
                if (this.file == null) {
                    this.$Message.warning('请先上传文件')
                } else {
                    let data = new FormData();
                    data.append('id', this.rowData.id)
                    data.append('name', this.file.name)
                    data.append('file', this.file)
                    axios({
                        method: 'post',
                        url: `api/icon/`,
                        data: data,
                    }).then(resp => {
                        this.file = null
                        if (resp.data.code > 200) {
                            this.$Message.error(resp.data.msg)
                        } else {
                            this.$Message.success("替换成功")
                        }
                    }).catch(error => {
                        console.log(error)
                        this.$Message.error('替换失败')
                    })
                }

            },
            cancel() {
                this.file = null
            }
        }
    }
</script>

<style scoped>

</style>
