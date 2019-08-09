  <style>
    .title {
      padding: 20px 0;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
    }

    .container {
      width: 1200px;
      margin: 0 auto;
    }

    .container .container-ul li {
      float: left;
      width: 33.33%;
      font-size: 16px;
      line-height: 30px;
    }

    .report-form {
      margin-bottom: 20px;
      border: 1px solid #ccc;
    }

    .report-form .report-form-ul {
      padding: 10px;
    }
  </style>
  
  <template>
  <div>

    <el-dialog title="报表打印" :visible.sync="showCurrentDialog" width="70%">
    <!--<el-button type="primary" v-show ="showPrintBtn" v-on:click="printAction">打印</el-button>-->
    <el-button type="primary" v-show ="showPrintBtn" v-on:click="printTest">打印</el-button>
    
<div id="app">
    <div class="report">
      <div class="title">发货单</div>
      <div class="container">
        <ul class="container-ul clearfix">
          <li>
            <span>发货单号：</span>
            <em>{{billInfo.no}}</em>
          </li>
          <li>
            <span>客户地址：</span>
            <em>{{billInfo.customerAddress}}</em>
          </li>
        </ul>
        <ul class="container-ul clearfix">
          <li>
            <span>客户名称：</span>
            <em>{{billInfo.customerName}}</em>
          </li>
          <li>
            <span>客户电话：</span>
            <em>{{billInfo.phone}}</em>
          </li>
          <li>
            <span>开单日期：</span>
            <em>{{billInfo.createDate|FormattersDateTime}}</em>
          </li>
        </ul>
        <div class="report-form">
          <el-table :data="colorItems" show-summary style="width: 100%">
            <el-table-column prop="code" label="货号">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="color" label="颜色">
            </el-table-column>
            <el-table-column label="规格" align="center">

              <template v-for="(col) in ShowSizeList">
                <el-table-column :label="col.label" align="center" :key="col.id">
                  <template slot-scope="scope">
                    <div class="borderNone">
                      <!-- <span>{{scope.row.id == col.id? col.count : ''}}</span> -->
                      <span>{{returnQTY(scope.row, col)}}</span>
                      <!-- <el-input size="small" v-model="col.count"></el-input> -->
                    </div>
                  </template>
                </el-table-column>
              </template>

            </el-table-column>
            <el-table-column label="单位">
              <el-table-column prop="unit">
              </el-table-column>
            </el-table-column>
            <el-table-column label="数量">
              <el-table-column prop="quantity">
              </el-table-column>
            </el-table-column>
            <el-table-column label="单价">
              <el-table-column prop="unitPrice">
              </el-table-column>
            </el-table-column>
            <el-table-column label="金额">
              <el-table-column prop="price">
              </el-table-column>
            </el-table-column>
            <el-table-column label="备注">
              <el-table-column prop="remark">
              </el-table-column>
            </el-table-column>
          </el-table>
          <ul class="report-form-ul">
            <li>备注：如有质量问题7日内调换（不调款），过期恕不处理。联系电话：15805987510</li>
            <li>账号：{{billInfo.banckAcount}}，户名：{{billInfo.acountName}}，支付宝：{{billInfo.apliPay}}</li>
          </ul>
        </div>
        <ul class="container-ul clearfix">
          <li>
            <span>发货方：</span>
            <em></em>
          </li>
          <li>
            <span>客户签收：</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

    </el-dialog>

  </div>

</template>

<script>
import * as api from '../../../api'
// var LODOP = document.getElementById('LODOP_OB')
// import {getLodop} from '../common/LodopFuncs'
// import orderDelivery from './delivery'
// import {getLodop} from '../../basic/common/lodopFuncs'
export default {
  name: 'mall-order-detail',
  components: { }, // orderDelivery
  data () {
    return {
      showPrintBtn: true,
      colorItems: [{sizeItems: [{size: '35', count: '7'}, {size: '37', count: '8'}], quantity: '1', unitPrice: '129.8', remark: '', price: '129.8', unit: '件', name: '上衣', id: 1, color: '白', size: '35', code: '001', count: ''},
      {sizeItems: [{size: '36', count: '3'}, {size: '35', count: '3'}], quantity: '1', unitPrice: '129.8', remark: '', price: '129.8', unit: '件', name: '上衣', id: 2, color: '红', size: '34', code: '002', count: ''},
      {sizeItems: [{size: '36', count: '5'}, {size: '37', count: '3'}], quantity: '1', unitPrice: '129.8', remark: '', price: '129.8', unit: '件', name: '上衣', id: 3, color: '黄', size: '38', code: '003', count: ''}
      ],
      ShowSizeList: [
        {label: '35', prop: '35'},
        {label: '37', prop: '37'},
        {label: '36', prop: '36'}
      ],
      billInfo: {},
      showCurrentDialog: false,
      header: ['M', 'L', 'XL', 'XXL', '3XL'],
      size_list: [
          [1, 2, 3, 4, 5]
      ],
      tableData3: [
        {
          article: 'LF1604160023',
          name: '货号名称货号名称货号名称',
          color: '摩卡灰',
          number: '500',
          unitPrice: '20',
          price: '2000',
          note: '无'
        }
      ],
      data: {

      },
      id: ''
    }
  },
  methods: {
    printTest () {
      // let lodop = getLodop()
      // lodop.PRINT_INIT('test')
      // LODOP.PRINT_INIT("")
      // LODOP.ADD_PRINT_TEXT(1,2,100,20,"Hello,World!")
      // LODOP.PREVIEW()
    },
    printAction () {
      var _this = this
      _this.showPrintBtn = false
      // 打印过程
      var oldHtml = document.body.innerHTML
      document.body.innerHTML = document.all.item('app').innerHTML
      window.print()
      document.body.innerHTML = oldHtml
      _this.showPrintBtn = true
    },
    returnQTY (row, col) {
      // console.log(col)
      var count = ''
      for (var i = 0; i < row.sizeItems.length; i++) {
        if (row.sizeItems[i].size === col.prop) {
          count = row.sizeItems[i].count
          break
        }
      }

      return count
    },
    open (row) {
      this.showCurrentDialog = true
      this.id = row.id
      this.getData(row.id)
    },
    getData (id) {
      var _this = this
      _this.colorItems = []
      _this.sizeItems = []
      this.$http.post(api.mallOrderPrintInfo, { id: id }).then(res => {
        // console.log(res)
        _this.colorItems = res.data.colorItems
        _this.ShowSizeList = res.data.showSizeList
        _this.billInfo.acountName = res.data.acountName
        _this.billInfo.apliPay = res.data.apliPay
        _this.billInfo.banckAcount = res.data.banckAcount
        _this.billInfo.createDate = res.data.createDate
        _this.billInfo.customerAddress = res.data.customerAddress
        _this.billInfo.customerName = res.data.customerName
        _this.billInfo.phone = res.data.phone
        _this.billInfo.no = res.data.bill
      })
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

