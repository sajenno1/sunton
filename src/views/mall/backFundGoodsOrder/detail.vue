  
  <style>
  


.order{
  padding:  0 0 2% 0;
}
.order .title{
  padding: 2% 3%;
  border-bottom: 1px solid #E8E8E8;
  font-size: 20px;

}
.detail-dialog .el-dialog{
  height: 68vh;
  overflow-y: scroll;
}
.detail-dialog .el-dialog .el-dialog__header{
    position: fixed;
    width: 66%;
    z-index: 20;
    background-color: #fff;
}
.detail-dialog .el-dialog .el-dialog__body{
  margin-top: 4%
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
.order .el-table .table-item1{
  display: flex;
  align-items: center;
  
}
.order .el-table .table-item1>span:first-child{
  width: 40px;
  height: 40px;
  background-color: #E8E8E8;
  margin-right: 10px
}
.order .el-table .table-item1 img{
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
</style>
  
  
  <template>
  <div class="order">
     <el-dialog title="退货退款详情" :visible.sync="showCurrentDialog" width="70%" class='detail-dialog'>
       <div>
         <div class="main">
        <el-steps :active="statusIndex">
          <el-step title="买家申请"><!-->:description="data.createDate|FormattersDateTime"<--></el-step>
          <el-step title="待商家审核"><!-->:description="data.createDate|FormattersDateTime"<--></el-step>
          <el-step title="待买家发货"><!-->:description="data.createDate|FormattersDateTime"<--></el-step>
          <el-step title="退款完成"><!-->:description="data.finishedDateTime|FormattersDateTime"<--></el-step>
        </el-steps>

        <el-row class="info">
          <el-col :span="8" class="info-left">
            <div class="grid-content bg-purple">
              <div class="info-title">退款信息</div>
              <div class="info-item">
                <label>编号:</label>
                <span>{{ data.no }}</span>
              </div>
              <div class="info-item">
                <label>客户:</label>
                <span>{{data.dealerName}}</span>
              </div>
              <div class="info-item">
                <label>审核人:</label>
                <span>{{data.managerName}}</span>
              </div>
              <div class="info-line"></div>
              <div class="info-item">
                <label>退款金额:</label>
                <span>{{ data.applyAmount | Currency }}</span>
              </div>
              <div class="info-item">
                <label>退款原因:</label>
                <span>{{ data.applyReason }}</span>
              </div>
              <div class="info-item">
                <label>申请日期:</label>
                <span>{{ data.applyDate | FormattersDate }}</span>
              </div>
              <div class="info-item">
                <label>关联单据号:</label>
                <span>{{ data.orderNo }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="16" class="info-right">
            <div class="grid-content bg-purple-light">
              <div class="info-title">
                <label>
                  <i class="iconfont icon-info"></i>
                </label>
                <span> 退款状态：{{getStatusText(data.status)}}</span>
              </div>
              <div>
                <span v-show="getStatusText(data.status)=='新申请'">买家已提交退款申请，请及时审核。</span>
                <span style="color:blue" v-show="getStatusText(data.status)=='退款成功'">{{getStatusText(data.status)}}</span>
                <span style="color:blue" v-show="getStatusText(data.status)=='退款失败'">该退货单已被驳回，驳回原因：{{data.rejectReason}}</span>
                <span style="color:blue" v-show="getStatusText(data.status)=='退款取消'">买家已经取消退款。</span>
              </div>
              <div class="info-btn">
                <el-button type="primary" size="small" v-show="getStatusText(data.status)=='新申请'" v-on:click="changeStatus(data.id, 'SellerAgreeShip', '同意退货')">通过</el-button>
                <el-button size="small" v-show="getStatusText(data.status)=='新申请'" v-on:click="dialogFormVisible = true">拒绝</el-button>
                <el-button size="small" v-show="getStatusText(data.status)==='买家已发货'" v-on:click="changeStatus(data.id, 'SellerBackFundGoodsSuccess', '完成退款')">确定退款</el-button>
              </div>
              <div class="info-line"></div>
                <div class="info-item">
                  <label>买家发货信息</label>
                </div>
                <div class="info-item">
                  <label>物流公司:</label>
                  <span>{{ data.expressName }}</span>
                </div>
                <div class="info-item">
                  <label>运单编号:</label>
                  <span><span type="text" v-show="data.expressNumber!=''&&data.expressNumber!=undefined" @click="getExpressInfo" style='color:#409EFF;cursor:pointer'>{{ data.expressNumber }}</span></span>
                </div>
              <!--<div class="info-item">
                <label>发货方式:</label>
                <span>需要物流</span>
              </div>-->
              <!--<div class="info-item">
                <label>物流公司:</label>
                <span>{{ data.expressName }}</span>
              </div>
              <div class="info-item">
                <label>运单编号:</label>
                <span type="text" style='color:#409EFF;cursor:pointer'>{{ data.expressNo }}</span>
              </div>-->
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="order-table">
        <el-table  style="width: 100%" v-bind:data="data.items">
          <el-table-column prop="item1" label="商品">
            <template slot-scope="scope">
              <div class="table-item1">
                <span>
                 <img v-bind:src="scope.row.productPhoto">
                </span>
                <el-button type="text" v-html="scope.row.productName"></el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="productSkuName" label="商品属性">
          </el-table-column>
          <el-table-column label="单价">
             <template slot-scope="scope">
                <span class="table-money">{{ scope.row.price | Currency}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量">
          </el-table-column>
          <el-table-column prop="item5" label="金额">
            <template slot-scope="scope">
              <div><span>{{ scope.row.price * scope.row.quantity }}</span></div>
              <!-- <el-button type="text">主动退款</el-button>
              <span>有主动退款（-10）</span> -->
            </template>
          </el-table-column>
          <!-- <el-table-column prop="orderNo" label="关联订单号">
          </el-table-column> -->
        </el-table>
        <el-row class="table-bottom">
          <div>申请共计
            <em>{{ data.productAllQuantity }}</em>件商品，总计:
            <em class="red-font">{{ data.applyAmount | Currency }}</em></div>
        </el-row>

      </div>
       </div>
     </el-dialog>
     <el-dialog title="请填写拒绝的原因" :visible.sync="dialogFormVisible">
        <el-form>
            <el-form-item label="拒绝原因" :label-width="formLabelWidth">
            <el-input v-model="rejectReason" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeStatus(data.id, 'SellerBackFundGoodsFail')">确 定</el-button>
        </div>
      </el-dialog>

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

export default {
  name: 'mall-order-detail',
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
      id: '',
      statusIndex: 1,
      rejectReason: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
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
    open (id) {
      this.showCurrentDialog = true
      this.dialogFormVisible = false
      this.WuLiuDialog = false
      this.id = id
      this.getData(id)
    },
    setStatusToShiped (index, row) {
      this.$refs.setStatusToShiped.open(row)
    },
    getList () {
      this.open(this.data)
    },
    getExpressInfo () {
      // if (this.data.status === 'Finishing') {
      this.$http.post(api.mallGetBackGoodsOrderExpressInfo, { id: this.id }).then(res => {
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
    changeStatus (id, status, title) {
      this.dialogFormVisible = false
      if (status === 'SellerBackFundGoodsSuccess') {
        this.rejectReason = ''
      }
      this.$confirm('确定要 ' + title + ' 该退货订单吗？')
        .then(() => {
          this.$http.post(api.mallBackFundGoodsChangeStatus, {id: id, status: status, content: this.rejectReason}).then(res => {
            if (status === 'SellerBackFundGoodsSuccess') {
              this.$notify({ title: '成功', message: '退款审核通过成功！', type: 'success' })
            }
            if (status === 'SellerBackFundGoodsFail') {
              this.$notify({ title: '成功', message: '退款审核拒绝成功！', type: 'success' })
            }
            this.$emit('getList')
            var _this = this
            setTimeout(function () {
              _this.open(_this.id)
            }, 500)
          })
        })
        .catch(() => {})
    },
    getData (id) {
      this.$http.post(api.mallBackFundGoodsOrderInfo, { id: id }).then(res => {
        this.data = res.data
        this.statusIndex = this.data.statusIndex
        console.log(this.statusIndex)
        // if (res.data.status === 'SellerBackFundGoodsSuccess' || res.data.status === 'SellerBackFundGoodsFail') {
        //   this.statusIndex = 3
        // }
        // if (res.data.status === 'BuyerCancel') {
        //   this.statusIndex = 3
        // }
      })
    },
    getStatusText (status) {
      switch (status) {
        // case 'Paying': return '待付款'
        case 'BuyerApplyFundGoods': return '新申请'
        case 'BuyerCancel': return '用户取消'
        case 'SellerBackFundGoodsSuccess': return '退款成功'
        case 'SellerBackFundGoodsFail': return '退款失败'
        case 'SellerAgreeShip': return '卖家已同意退款'
        case 'BuyerShip': return '买家已发货'
      }
      return ''
    },
    formatDate (date1) {
      return this.$common.formatDate(date1)
    },
    formatTime (date1) {
      return this.$common.formatTime(date1)
    },
    closeDialog () {
      this.$emit('getList')
    }
  }
}
</script>