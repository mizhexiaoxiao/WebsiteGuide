<template>
  <div :style="{margin: '16px 0 0 0',}">
    <div style="display: flex;justify-content: center;align-items: center;">
      <Input search size="large" style="width: 600px" placeholder="search..." @on-search='search'/>
    </div>
    <div v-for="item in $store.state.websiteList" :key="item.id">
      <Row>
        <Col>
          <div :id="anchorId(item.id)"
               style="line-height: 60px; font-size: 17px;margin-left: 15px;">
            <Icon type="ios-pricetags-outline"/>
            {{item.name}}
          </div>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="6" style="padding: 12px;" v-for="(data,index) in item.websites" :key="index">
          <div style="cursor: pointer;" @click="redirect(data.path)">
            <Card style="border-radius: 30px;">
              <div class="card-div">
                <div style="width: 30%;display: flex;align-items: center">
                  <img :src="icon(data.id)" style="border-radius: 50%;width: 80%;height: 80%;">
                </div>
                <div style="width: 70%;">
                  <div class="website-title">{{data.title}}</div>
                  <p class="website-desc">{{data.description}}</p>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Websites',
        created() {
            this.$Loading.start()
            this.$store.dispatch('getWebsitesList').then(resp => {
                this.$Loading.finish()
            }).catch(error => {
                this.$Loading.error()
            })
        },
        methods: {
            icon(id) {
                return axios.defaults.baseURL + 'api/icon/?id=' + id
            },
            redirect(path) {
                if (path.startsWith('http')) {
                    window.open(path, '_blank')
                } else {
                    this.$Message.error('请填写正确的网络协议http或https')
                }
            },
            anchorId(id) {
                return 'anchor' + id // querySelector锚点跳转方法id不能为纯数字
            },
            search(value) {
                this.$Loading.start()
                this.$store.dispatch('getWebsitesList', {search: value}).then(resp => {
                    this.$Loading.finish()
                }).catch(error => {
                    this.$Loading.error()
                })
            }
        }
    }
</script>
<style>
  .ivu-tooltip {
    display: block;
  }

  .ivu-tooltip-rel {
    display: block;
    position: relative;
    width: inherit;
  }
</style>
<style>
  .website-title {
    display: -webkit-box;
    font-size: 20px;
    color: #3273C4;
    margin-bottom: 5px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all
  }

  .website-desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  .card-div {
    word-break: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    max-height: 70px
  }

</style>
