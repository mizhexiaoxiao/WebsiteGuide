<template>
  <div class="container">
    <Content :style="{padding: '0 30px'}">
      <Card dis-hover>
        <div :style="{padding:'10px 0'}">
          <Row>
            <Col span="8">
              <div style="margin-bottom: 16px">
                <Button type="primary" size="default" icon="md-add"  @click="addGroup">新增</Button>
              </div>
            </Col>
            <Col span="6" offset="10">
              <Input v-model="searchValue" search enter-button  placeholder="search..."
                     @on-search="search"/>
            </Col>
          </Row>
          <Table :loading="loading" :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="action">
              <Button type="primary" @click="addWebsite(row)">添加网址</Button>
              <Button type="info" @click="editGroup(row)">编辑</Button>
              <Button type="error" @click="remove(row)">删除</Button>
            </template>
          </Table>
          <br>
          <Page :total="total" :page-size="size" show-sizer show-total style="text-align: center"
                @on-change="pageNum" @on-page-size-change="pageSize"></Page>
        </div>
      </Card>
    </Content>
    <addgroupform ref="addgroupform"></addgroupform>
    <addwebsiteform ref="addwebsiteform" :rowData="rowData"></addwebsiteform>
    <editgroup ref="editgroup"></editgroup>
  </div>
</template>

<script>
    import addgroupform from "./module/addgroupform"
    import addwebsiteform from "./module/addwebsiteform"
    import editgroup from "./module/editgroup";
    import init from "@/mixins/init";
    import axios from 'axios'

    export default {
        components: {addgroupform, addwebsiteform, editgroup},
        mixins: [init],
        data() {
            return {
                rowData: {
                    rowId: null,
                    rowName: ''
                },
                searchValue:'',
                columns: [
                    {
                        type: 'index',
                        title: '序号',
                        width: '100',
                    },
                    {
                        title: '分组名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                    },
                ],
            }
        },
        created() {
            this.init()
        },
        methods: {
            beforeInit() {
                this.url = 'api/group/'
                this.params = {page: this.page, size: this.size}
                return true
            },
            search(val) {
                if (val) {
                    axios.get(`api/group/?page=1&size=${this.size}&search=${this.searchValue}`).then(resp => {
                        this.total = resp.data.count
                        this.data = resp.data.results
                    })
                } else {
                    this.page = 1
                    this.init()
                }
            },
            addGroup() {
                this.$refs.addgroupform.modal1 = true
                //Input框聚焦
                this.$refs.addgroupform.inputFocus()
            },

            addWebsite(row) {
                this.rowData.rowId = row.id
                this.rowData.rowName = row.name
                this.$refs.addwebsiteform.modal2 = true
            },
            editGroup(row) {
                this.$refs.editgroup.id = row.id
                this.$refs.editgroup.form3.name = row.name
                this.$refs.editgroup.modal3 = true
                this.$refs.editgroup.inputFocus()
            },
            remove(row) {
                this.$Modal.confirm({
                    title: `确定删除 ${row.name} ?`,
                    content: '<p>此分组下的数据都将被删除</p>',
                    onOk: () => {
                        axios.delete(`api/group/${row.id}/`).then(resp => {
                            this.$Message.success('删除成功')
                            this.init()
                        }).catch(error => {
                            this.$Message.error('删除失败' + error)
                        });
                    },
                    onCancel: () => {
                    }
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

