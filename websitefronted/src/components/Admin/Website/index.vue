<template>
  <div class="container">
    <Content :style="{padding: '0 30px'}">
      <Card dis-hover>
        <div :style="{padding:'10px 0'}">
          <Row>
            <Col span="4">
              <Button type="primary" size="default" icon="md-refresh"  @click="refresh">刷新
              </Button>
              <Button type="error" @click="remove()">删除</Button>
            </Col>

            <Col span="8">
              <span>分组名称：</span>
              <Select v-model="model" clearable style="width:200px" @on-change="selectGroup">
                <Option v-for="item in group" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Col>
            <Col span="6" offset="6">
              <Input v-model="searchValue" search enter-button placeholder="search..."
                     @on-search="search"/>
            </Col>
          </Row>
          <br>
          <Table :loading="loading" :columns="columns" :data="data" @on-selection-change="selectWebsite">
            <template slot-scope="{ row }" slot="action">
              <Button type="info" @click="editWebsite(row)">编辑</Button>
              <Button type="primary" @click="editIcon(row)">替换图标</Button>
            </template>
          </Table>
          <br>
          <Page v-show="isShow" :total="total" :page-size="size" show-sizer show-total style="text-align: center"
                @on-change="pageNum" @on-page-size-change="pageSize"></Page>
        </div>
      </Card>
    </Content>

    <editWebsite ref="editWebsite" :rowData="rowData"></editWebsite>
    <editIcon ref="editIcon" :rowData="rowData"></editIcon>
  </div>
</template>

<script>
    import axios from 'axios'
    import init from "@/mixins/init";
    import editWebsite from "./module/editWebsite";
    import editIcon from "./module/editIcon";

    export default {
        components: {editWebsite, editIcon},
        mixins: [init],
        data() {
            return {
                rowData: {},
                model: '',
                isShow: true,
                searchValue: '',
                columns: [
                    {
                        type: 'selection',
                        width: 60
                    },
                    {
                        title: '标题',
                        key: 'title',
                        width: '200'
                    },
                    {
                        title: 'URL',
                        key: 'path'
                    },
                    {
                        title: '描述',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                    },
                ],
                dataCopy: [],
                group: [],
                selectId: [],
            }
        },
        created() {
            this.getGroup()
            this.init()
        },
        methods: {
            beforeInit() {
                this.url = 'api/website/'
                this.params = {page: this.page, size: this.size}
                return true
            },
            refresh() {
                this.getGroup()
                this.init()

            },
            // getWebsiteData() {
            //     this.loading = true
            //     axios.get(`api/website/?page=${this.page}&size=${this.size}&search=${this.searchValue}`).then(resp => {
            //         this.data = resp.data.results
            //         this.total = resp.data.count
            //         this.loading = false
            //     }).catch(error => {
            //         this.loading = false
            //         this.$Message.error('请求失败 ' + error.response.status)
            //     })
            // },
            getGroup() {
                axios.get(`api/group/?page=${this.page}&size=${this.size}&search=`).then(resp => {
                    this.group = resp.data.results
                })
            },
            editWebsite(row) {
                this.rowData = row
                this.$refs.editWebsite.form.title = row.title
                this.$refs.editWebsite.form.path = row.path
                this.$refs.editWebsite.form.description = row.description
                this.$refs.editWebsite.modal = true
            },
            editIcon(row) {
                this.rowData = row
                this.$refs['editIcon'].modal = true
            },
            search(val) {
                if (val) {
                    axios.get(`api/website/?page=1&size=${this.size}&search=${this.searchValue}`).then(resp => {
                        this.total = resp.data.count
                        this.data = resp.data.results
                    })
                } else {
                    this.page = 1
                    this.init()
                }
            },
            selectGroup(val) {
                if (val !== undefined) {
                    axios.get(`api/alldata/${val}/`).then(resp => {
                        this.isShow = false
                        this.data = resp.data.websites
                    })
                } else {
                    this.isShow = true
                    this.init()
                }
            },
            selectWebsite(selection) {
                this.selectId = selection.map(item => item.id)
            },
            remove() {
                if (this.selectId.length > 0) {
                    this.$Modal.confirm({
                        title: `确定删除选中项?`,
                        onOk: () => {
                            axios.delete('api/website/delete/?selectId=' + this.selectId).then(resp => {
                                this.$Message.success('删除成功')
                                this.refresh()
                            }).catch(error => {
                                this.$Message.error('删除失败')
                            })
                        },
                        onCancel: () => {
                        }
                    })

                }
            }
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

