import axios from "axios";

export default {
  data() {
    return {
      loading: true, data: [], total: 0, page: 1, size: 10, url: '', params: {}, query: {}, time: 100
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        this.initData(this.url, this.params).then(res => {
          this.total = res.data.count
          this.data = res.data.results
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    beforeInit() {
      return true
    },
    pageNum(page) {
      this.page = page
      this.init()
    },
    pageSize(size) {
      this.page = 1
      this.size = size
      this.init()
    },
    initData(url, params) {
      return axios({
        url: url,
        method: 'get',
        params
      })
    }
  }
}
