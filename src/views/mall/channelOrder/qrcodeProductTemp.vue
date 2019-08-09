<template>
  <div>
    <el-dialog v-bind:visible.sync="showCurrentDialog" width="80%">
      <div>
        <div slot="header">
          <span>qrcode</span>
        </div>

        <div class="searchCon clearfix">         
          <div style="float:left;display:inline-block;width:13%;">
            <el-input v-model="searchData.no" size="small" placeholder="请输入产品代码"></el-input>
          </div> 
          <div style="float:left;display:inline-block;width:15%;">
            <el-input v-model="searchData.name" size="small" placeholder="请输入品名"></el-input>
          </div>
          <div style="float:right;display:inline-block;width:28%;">
            <el-button type="primary" size="small" v-on:click="doSearch" icon="el-icon-search">搜索</el-button>
          </div>
        </div>

        <div class="table-container">
          <el-table v-bind:data="list" style="width: 100%;">

            <el-table-column label="产品代码" width="190px" prop="productNo">
            </el-table-column>

            <el-table-column label="产品名称" width="190px" prop="productName">
            </el-table-column>

            <el-table-column label="产品属性" width="190px" prop="productSkuName">
            </el-table-column>

            <el-table-column label="产品属性代码" width="190px" prop="productSkuCode">
            </el-table-column>

            <el-table-column label="发行码" width="190px" prop="code">
            </el-table-column>

            <el-table-column label="二维码" align="center">
              <template slot-scope="scope">
                <div v-bind:id="'qrImage'+scope.$index">
                  <!--{{ 'http://basic.c/asdfsd?c='+scope.row.code+'&p='+scope.row.productNo+'&s='+scope.row.productSkuCode }}
                  -->
                </div>
              </template>
            </el-table-column>

          </el-table>
          
        </div>
        
      </div>
      <div slot="footer" class="dialog-footer">
          <el-input v-model="orderNo" style="width:300px" placeholder="请输入单号"></el-input>
            <el-button @click="changeState('back')">后退状态</el-button>
            <el-button type="primary" @click="changeState('advance')">前进状态</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import QRcode from 'qrcodejs2'
// import 'jQuery'
// import jQuery from '../../../../static/js/jquery-3.3.1.min'
// import '../../../../static/js/qrcode.js'
// import '../../../../static/js/jquery.qrcode.js'

export default {
  name: '',
  components: {},
  data () {
    //
    return {
      list: [],
      showCurrentDialog: false,
      searchData: {
        pageSize: 10,
        page: 1,
        name: ''
      },
      total: 0,
      orderNo: ''
    }
  },
  methods: {
    show () {
      this.showCurrentDialog = true
    },
    getList () {
      var _this = this
      this.$http.post('/Admin/Mall/QrcodeTempProducts', this.searchData).then(res => {
        // res.data.rows.forEach((item) => {
        //   item.boolShip = false
        // })
        // _this.list = res.data.rows
        // _this.total = res.data.total
        _this.list = res.data
        _this.total = 0
        setTimeout(() => {
          for (var i = 0; i < _this.list.length; i++) {
            var row = _this.list[i]
            // _this.qrcode('qrImage' + i, // _this.list[i].
            _this.qrcode(document.getElementById('qrImage' + i), // _this.list[i].
            'http://basic.c/asdfsd?c=' + row.code + '&p=' + row.productNo + '&s=' + row.productSkuCode
            )
          }
        }, 1000)
      })
    },
    doSearch () {
      // console.log(jQuery)
      // console.log(jQuery)
      // console.log(jQuery('input')[0].outerHTML)
      // console.log(jQuery('input').qrcode)
      // console.log(QRcode)
      // var a = true
      // if (a) return
      this.list = []
      var _this = this
      setTimeout(() => {
        _this.searchData.page = 1
        _this.total = 0
        _this.getList()
      }, 1500)
    },
    qrcode (id, text) {
      // console.log(QRcode)
      // let qrcode = 1
      let qrcode = new QRcode(id, { // 'qrcode'
        width: 100,
        height: 100, // 高度
        text: text, // 二维码内容
        image: ''
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      if (qrcode) {}
      // console.log(qrcode)
    },
    handleSizeChange (val) {
      this.searchData.pageSize = val
      this.searchData.page = 1
      this.getList()
    },
    changeState (val) {
      this.$http.post('/Admin/Mall/ChangeOrderState', {
        orderNo: this.orderNo,
        direction: val
      }).then(res => {
        // this.showCurrentDialog = false
        // this.getList()
        this.$notify({ title: '成功', message: '状态更新成功！', type: 'success' })
      })
    },
    handleCurrentChange (val) {
      this.searchData.page = val
      this.getList()
    }
  }
}
</script>