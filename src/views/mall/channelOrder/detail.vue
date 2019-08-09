  
  <style>
  


.order{
  padding:  0 0 2% 0;
}
.order .title{
  padding: 2% 3%;
  border-bottom: 1px solid #E8E8E8;
  font-size: 20px;

}
.order .main{
  padding: 0 5%
}
.order .el-steps{
  border-bottom: 1px solid #E8E8E8;
  padding: 3% 5%

}
.order .el-steps .el-step__line{
  background-color: #E8E8E8

}
.order .info .info-title{
  font-weight: bold
}
.order .info .info-left{
    padding: 2% 3% 2% 0;
    border-right: 1px solid #E8E8E8
}
.order .info .info-right{
  padding: 2% 3% 2% 3%;
}
.order .info .info-line{
  width: 100%;
  border: 1px dashed #E8E8E8;
}
.order .info .grid-content>div{
  margin-bottom: 20px;
  display: flex;
}
.order .info .grid-content>.info-item>span{
  color:#6C6C6D;
  flex: 1;
  margin-left: 10px!important
}
.order .info .info-right .grid-content>div>span{
  margin-left: 0;
  color:#6C6C6D
}
.order .info .info-title i{
  color: #1890FF;
  font-size: 26px;
  line-height: 17px;
  margin-left: -25px;

}
.order .info .info-title>span{
  color: #333!important
}
.order .el-table .img-box{
  width: 40px;
  height: 40px;
  background-color: #fff;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center
}
.order .el-table .img-box img{
  width: 100%;
}
.order .el-table{
  border-top: 1px solid #E8E8E8
}
.order .el-table th {
  background-color: #fafafa;
  color: #333
}
.order .table-bottom{
  padding: 1.2% 2%;
  text-align: right;
  border-bottom: 1px solid #E8E8E8;
  color: #6C6C6D
}
.order .order-table{
  margin: 0 2%;
  padding-top: 1%;
  border-top: 1px solid #E8E8E8
}
.red-font{
  color: red!important
}
.order .info .info-item .el-button{
  padding: 0;
  margin-left: 10px
}
.order .order-table .el-button{
  padding: 0
}
.order .order-dialog .el-dialog__body,.order .wuliu-dialog .el-dialog__body{
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  padding:20px 0 0 0;
  flex-wrap: wrap;  
}
.order .detail-dialog .el-dialog__body{
  margin-top:-2%
}
.order .wuliu-dialog .el-dialog__body{
   height:28vw;
   overflow-y: scroll;
}
.order .order-dialog  .el-form {
  width: 60%;
  height: 35vh

}
.order .wuliu-dialog .el-dialog__body{
  padding: 20px 0 50px 0
}
.order .wuliu-dialog  .el-table{
  margin: 0 4%;
}
.order .el-dialog__header,.order  .el-dialog__footer{
  padding: 15px 25px;
}
.order .el-dialog__title{
  color: rgba(0, 0, 0, 0.647058823529412);
  font-size: 16px;
  font-weight: 700;
}
.order .el-icon-close{
  font-size: 20px;
}
.order .el-dialog .el-select{
  width: 100%;
}
.order .el-dialog .dialog-attention{
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  width: 85%;
  border: 1px solid #FFA39E;
  background-color: #FFF2F1;
  border-radius: 4px;
  margin-bottom: 3%
}
.order .el-dialog .dialog-attention i{
  color: #FFA39E;
  margin-right: 5px
}

.order .wuliu-dialog .el-table tr:first-child{
  color: #6CA47A
} 
.order .wuliu-dialog .el-dialog__footer{
  height: 70px
}
.order .wuliu-dialog .el-table::before{
  height: 0
}
.order .wuliu-dialog .el-dialog__body{
  display:inherit!important;
}
.order .wuliu-dialog .el-table{
  margin:0!important
}
.order .pro-name{
  color: #1890FF;
  cursor: pointer
}
.order .el-table__row>td:first-child>div{
  display: flex;
  align-items: center;
}
.detail-dialog>.el-dialog{
      margin-top: 8vh!important;
}
</style>
  
  
  <template>
  <div class="order">
     <el-dialog title="订单详情" :visible.sync="showCurrentDialog" width="85%" class='detail-dialog'>
       <div>
         <div class="main">
        <el-steps :active="data.statusNumber">
          <el-step title="买家下单"><!-->:description="data.createDate|FormattersDateTime"<--></el-step>
          <el-step title="等待发货"><!-->:description="data.paidDateTime|FormattersDateTime"<--></el-step>
          <el-step title="等待收货"><!-->:description="data.shipedDateTime|FormattersDateTime"<--></el-step>
          <el-step title="完成"><!-->:description="data.finishedDateTime|FormattersDateTime"<--></el-step>
        </el-steps>

        <el-row class="info">
          <el-col :span="9" class="info-left">
            <div class="grid-content bg-purple">
              <div class="info-title">订单信息</div>
              <div class="info-item">
                <label>订单编号:</label>
                <span>{{ data.no }}</span>
              </div>
              <!--<div class="info-item">
                <label>订单类型:</label>
                <span>普通订单</span>
              </div>-->
              <div class="info-item">
                <label>客户:</label>
                <span>{{data.dealerName}}</span>
              </div>
              <div class="info-item">
                <label>等级:</label>
                <span>{{data.dealerLevel}}</span>
              </div>
              <div class="info-item">
                <label>付款方式:</label>
                <span>{{data.paymentMethod}}</span>
              </div>
              <div class="info-line"></div>
              <div class="info-item">
                <label>配送方式:</label>
                <span>{{data.needExpress? '快递物流': '无需配送'}}</span>
              </div>
              <div class="info-item">
                <label>收货信息:</label>
                <span>{{ data.consigneeContacter }}，{{ data.consigneeMobile }}，{{ data.consigneeAreaName + data.consigneeAddress }}</span>
              </div>
              <div class="info-item">
                <label>买家信息:</label>
                <span>{{ data.buyerInformation }}</span>
              </div>
              <div class="info-item">
                <label>买家留言:</label>
                <span>{{ data.remark }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="15" class="info-right">
            <div class="grid-content bg-purple-light">
              <div class="info-title">
                <label>
                  <i class="iconfont icon-info"></i>
                </label>
                <span> 订单状态：{{getStatusText(data.status)}}</span>
              </div>
              <div>
                <span>买家已通过微信付款，请尽快发货。</span>
              </div>
              <div class="info-btn">
                <el-button type="primary" size="small" v-show="getStatusText(data.status)=='待发货'" v-on:click="setStatusToShiped(0, data)">发货</el-button>
                <!-- data.boolShip &&  v-show="getStatusText(data.status)=='待发货'"-->
                <!-- <el-button type="primary" size="small" @click="FaHuoDialog = true">发货</el-button> -->
                <!-- <el-button v-show="scope.row.boolShip && getStatusText(scope.row.status)=='待发货'" size="mini" type="primary" v-on:click="setStatusToShiped(scope.$index, scope.row)">发货</el-button> -->
                <el-button size="small" v-on:click="showPrint(data)">打印</el-button>
              </div>
              <div class="info-line"></div>
              <!--<div class="info-item">
                <label>发货方式:</label>
                <span>需要物流</span>
              </div>-->
              <div class="info-item">
                <label>物流公司:</label>
                <span>{{ data.expressName }}</span>
              </div>
              <div class="info-item">
                <label>运单编号:</label>
                <span type="text" v-show="data.expressNo!=''&&data.expressNo!=undefined" @click="getExpressInfo" style='color:#409EFF;cursor:pointer'>{{ data.expressNo }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="order-table">
        <el-table  style="width: 100%" v-bind:data="data.items">
          <el-table-column prop="item1" label="商品" width="400">
            <template slot-scope="scope">
                <span class="img-box">
                 <img v-bind:src="scope.row.productPhoto">
                </span>
                <a class="pro-name" v-html="scope.row.productName"></a>
            </template>
          </el-table-column>
          <el-table-column prop="propertyNames" label="商品属性"  >
          </el-table-column>
          <el-table-column label="单价" >
             <template slot-scope="scope">
                <span class="table-money">{{ scope.row.price | Currency}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量"  >
          </el-table-column>
          <el-table-column prop="item5" label="金额" >
            <template slot-scope="scope">
              <div><span>{{ (scope.row.price * scope.row.quantity).toFixed(2) }}</span></div>
              <!-- <el-button type="text">主动退款</el-button>
              <span>有主动退款（-10）</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="memo" label="备注" width="100" >
          </el-table-column>
        </el-table>
        <el-row class="table-bottom">
          <div>订单共计
            <em>{{ data.productCount }}</em>件商品，总计:
            <em class="red-font">{{ data.orderAmount | Currency }}</em>(包含送费{{data.expressAmount | Currency}})</div>
        </el-row>

      </div>
      <!-- <el-dialog title="填写物流信息" :visible.sync="FaHuoDialog" class="order-dialog">
        <div class="dialog-attention">
            <i class="iconfont icon-info"></i>物流信息不支持更正，请仔细填写并核对</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="发货方式：" prop="item1">
            <el-radio v-model="radio" label="1">需要物流</el-radio>
            <el-radio v-model="radio" label="2">无需物流</el-radio>
          </el-form-item>
          <el-form-item label="物流公司：" prop="item4">
            <el-select v-model="ruleForm.item4" placeholder="请选择">
              <el-option label="公司一" value="FF1"></el-option>
              <el-option label="公司二" value="FF2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运单编号：" prop="item2">
            <el-input v-model="ruleForm.item2"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>-->
       </div>
     </el-dialog>
     <order-setStatusToShiped ref="setStatusToShiped" v-on:getList="getList" />
    
    
      <el-dialog title="跟踪物流信息" :visible.sync="WuLiuDialog" width="60%" class="wuliu-dialog">
       <div style='margin:0 4%'>
      <div style='color: #6CA47A'>
      <span>物流当前状态：</span>
      <span>{{logisticsData.stateName}}</span>
      </div>
        <el-table :data="logisticsData.data" style="width: 100%">
          <el-table-column label="时间" width="220">
            <template slot-scope="scope">
              <span>{{scope.row.time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <span>{{scope.row.context}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column prop="item3" label="状态" width="70">
          </el-table-column>-->
        </el-table>
        <div slot="footer" class="dialog-footer"></div>
         </div>
      </el-dialog> 

  </div>
 </template>
  

<script>
import * as api from '../../../api'
import orderSetStatusToShiped from './setStatusToShiped'
// import orderDelivery from './delivery'
export default {
  name: 'mall-order-detail',
  components: { orderSetStatusToShiped }, // orderDelivery
  data () {
    return {
      colorItems: [],
      showSizeList: [],
      billInfo: {},
      showCurrentDialog: false,
      FaHuoDialog: false,
      WuLiuDialog: false,
      radio: '1',
      data: {},
      // orderStatus: {
      //   WaittingForPay: 0,
      //   Paid: 1,
      //   Shipped: 2,
      //   Finished: 3
      // },
      // orderStatusText: {
      //   WaittingForPay: '待支付',
      //   Paid: '已支付',
      //   Shipped: '已发货',
      //   Finished: '已完成',
      //   Closed: '已关闭'
      // },
      id: '',
      logisticsState: ['在途', '揽件', '疑难', '签收', '退签', '派件', '退回'],
      logisticsData: {
        stateName: '暂无物流信息',
        data: [
          { context: '暂无物流信息', time: '' }
        ]
      }
    }
  },
  methods: {
    showPrint (row) {
      var _this = this
      // _this.colorItems = []
      // _this.showSizeList = []
      // console.log('开始打印....')
      // console.log(row)
      this.$http.post(api.mallOrderPrintInfo, { id: row.id }).then(res => {
        console.log(res)
        _this.colorItems = res.data.colorItems
        _this.showSizeList = res.data.showSizeList
        _this.billInfo.acountName = res.data.acountName
        _this.billInfo.apliPay = res.data.apliPay
        _this.billInfo.banckAcount = res.data.banckAcount
        _this.billInfo.createDate = res.data.createDate
        _this.billInfo.customerAddress = res.data.customerAddress
        _this.billInfo.customerName = res.data.customerName
        _this.billInfo.phone = res.data.phone
        _this.billInfo.no = res.data.bill
        _this.printAction(row)
      })
    },
    printAction (row) {
      var _this = this
      var summary = []
      summary.push(row.no)
      summary.push(_this.billInfo.customerAddress)
      summary.push(_this.billInfo.customerName)
      summary.push(_this.billInfo.phone)
      summary.push(_this.billInfo.createDate)
      var printData = {
        title: '发货单',
        no: row.no,
        summary: summary,
        columns: [{
          name: '货号',
          prop: 'code',
          width: '10%'
        }],
        data: _this.colorItems,
        sizeData: _this.showSizeList,
        billInfo: _this.billInfo,
        footer: ['发货方：   ',
          '客户签收：']
      }
      this.$print.preView(printData, {footerColumn: 3})
    },
    open (row) {
      this.showCurrentDialog = true
      this.WuLiuDialog = false
      this.id = row.id
      this.getData(row.id)
    },
    setStatusToShiped (index, row) {
      this.$refs.setStatusToShiped.open(row)
    },
    getList () {
      this.open(this.data)
    },
    getData (id) {
      this.$http.post(api.mallChannelOrderInfo, { id: id }).then(res => {
        this.data = res.data
      })
    },
    getExpressInfo () {
      // if (this.data.status === 'Finishing') {
      this.$http.post(api.mallGetOrderExpressInfo, { id: this.id }).then(res => {
        var loginstics = res.data
        this.logisticsData = loginstics
        if (loginstics.status === '0') {
          this.logisticsData.stateName = '物流单暂无结果'
        } else if (loginstics.status === '1' || loginstics.status === '200') {
          this.logisticsData.stateName = this.logisticsState[loginstics.state]
        } else if (loginstics.status === '2') {
          this.logisticsData.stateName = '接口出现异常'
        } else if (this.logisticsData.data.length <= 0) {
          this.logisticsData = {
            stateName: '暂无物流信息',
            data: [{ context: '暂无物流信息', time: '' }]
          }
        }
      })
      this.WuLiuDialog = true
      // }
    },
    getStatusText (status) {
      switch (status) {
        case 'Checking': return '待审核'
        case 'Shiping': return '待发货'
        case 'Finishing': return '待完成'
        case 'Finished': return '已完成'
        case 'Closed': return '已关闭'
        case 'BackFunding': return '退款中'
      }
      return ''
    },
    formatDate (date1) {
      return this.$common.formatDate(date1)
    },
    formatTime (date1) {
      return this.$common.formatTime(date1)
    },
    // finishShipOrder () {
    //   this.getData(this.id)
    // },
    // payOrder () {
    //   this.$confirm('确认订单已付款,此操作无法撤销, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$http.post(api.mallOrderPay, {
    //       id: this.id
    //     }).then(res => {
    //       this.data = res.data
    //       this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
    //     })
    //   }).catch(() => {})
    // },
    // shipOrder () {
    //   this.$refs.orderDelivery.open(this.id)
    // },
    // completeOrder () {
    //   this.$confirm('确认要完成订单,此操作无法撤销, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$http.post(api.FinishedMallOrder, {
    //       id: this.id
    //     }).then(res => {
    //       this.data = res.data
    //       this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
    //     })
    //   }).catch(() => {})
    // },
    // closeOrder () {
    //   this.$confirm('确认要关闭订单,此操作无法撤销, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$http.post(api.closeMallOrder, {
    //       id: this.id
    //     }).then(res => {
    //       this.data = res.data
    //       this.$notify({ title: '成功', message: '操作成功！', type: 'success' })
    //     })
    //   }).catch(() => {})
    // },
    closeDialog () {
      this.$emit('getList')
    }
  }
}
</script>