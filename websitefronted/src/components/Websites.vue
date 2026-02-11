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
                <div class="icon-wrapper">
                  <img :src="icon(data.id)" class="website-icon">
                </div>
                <div class="content-wrapper">
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
                    this.$Message.error('请填写正确的网址协议http或https')
                }
            },
            anchorId(id) {
                return 'anchor' + id
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

<style scoped>
  .website-title {
    display: -webkit-box;
    font-size: clamp(14px, 1.5vw, 20px);
    color: #3273C4;
    margin-bottom: 5px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  .website-desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    font-size: clamp(12px, 1.2vw, 16px);
  }

  .card-div {
    word-break: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70px;
    padding: 10px 0;
  }

  /* 图标容器 - 响应式 */
  .icon-wrapper {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 图标图片 - 响应式 */
  .website-icon {
    border-radius: 50%;
    width: clamp(40px, 4vw, 60px);
    height: clamp(40px, 4vw, 60px);
    object-fit: cover;
    transition: transform 0.2s ease;
  }

  .website-icon:hover {
    transform: scale(1.05);
  }

  /* 内容区域 */
  .content-wrapper {
    width: 70%;
    padding-left: 10px;
  }

  /* 响应式布局调整 */
  @media screen and (max-width: 1200px) {
    .website-icon {
      width: clamp(35px, 3.5vw, 50px);
      height: clamp(35px, 3.5vw, 50px);
    }
  }

  @media screen and (max-width: 768px) {
    .website-icon {
      width: clamp(30px, 3vw, 40px);
      height: clamp(30px, 3vw, 40px);
    }
    
    .website-title {
      font-size: clamp(12px, 2.5vw, 14px);
    }
    
    .website-desc {
      font-size: clamp(10px, 2vw, 12px);
    }
  }

  @media screen and (max-width: 480px) {
    .card-div {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .icon-wrapper {
      width: 100%;
      margin-bottom: 8px;
    }
    
    .content-wrapper {
      width: 100%;
      padding-left: 0;
    }
    
    .website-icon {
      width: 40px;
      height: 40px;
    }
  }
</style>
