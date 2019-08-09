<template>
  <div class="dialog-box">
    <el-dialog title="SKU选择" :visible.sync="show" width="38%">
        <el-table :data="colorItems" style="width: 100%" highlight-current-row>
          <el-table-column prop="id" label="序" width="50" align="center">
          </el-table-column>
          <el-table-column label="颜色" align="center">
            <el-table-column prop="code" label="编号" width="100" align="center">
          </el-table-column>
          <el-table-column prop="color" label="名称" width="120" align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="size" :label="sumCount" align="center">
            <template v-for="(col, index) in sizeItems">
              <el-table-column :label="col.name" align="center" :key="col.id">
                <template slot-scope="scope">
                  <div class="borderNone">
                    <el-input size="small" type="number" @change="handleCountChange(index,scope.row,col,$event)" :key="col.id"></el-input>
                  </div>
            </template>
            
          </el-table-column>
        </template>
          </el-table-column>
          
        </el-table>
        <el-table style="width: 100%" empty-text="  ">
        <!-- <el-table-column label="小计" align="center"></el-table-column> -->
        <el-table-column label="小计"  width="50" align="center">
        </el-table-column>
        <el-table-column label="" width="100" align="center">
        </el-table-column>
        <el-table-column label="" width="120" align="center">
        </el-table-column>
          <template v-for="(col, index) in sumInputData">
            <el-table-column :label="col.count" align="center" :key="col.id">
              <template slot-scope="scope">
                <div class="borderNone">
                  <el-input type="number" size="small" @change="handleCountChange(index,scope.row,col,$event)" :key="col.id"></el-input>
                </div>
              </template>
          </el-table-column>
        </template>

      </el-table>
      <div align="right">
        <el-button type="primary" v-on:click="selectSkuItems">确定</el-button>
      </div>
      
    </el-dialog>

  </div>
 
</template>
<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-outStock-selectedProduct',
  data () {
    return {
      show: false,
      sumCount: '尺码',
      productList: [],
      skuList: [],
      searchKey: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      name: '',
      no: '',
      multipleSelectSku: [],
      retData: {productName: '', skuList: []},
      colorItems: [{id: 1, color: '白', size: '35', code: '001', count: ''},
      {id: 2, color: '红', size: '34', code: '002', count: ''},
      {id: 3, color: '黄', size: '38', code: '003', count: ''}],
      sizeItems: [{id: 1, label: '35', no: '', prop: '35', count: ''}, {id: 2, label: '37', no: '', prop: '37', count: ''}, {id: 3, label: '36', no: '', prop: '36', count: ''}],
      inputData: [],
      skuItems: [{guid: 'guid001', propertyNames: '颜色:白;尺码:35', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'},
      {guid: 'guid003', propertyNames: '颜色:白;尺码:36', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'},
      {guid: 'guid004', propertyNames: '颜色:红;尺码:35', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'},
      {guid: 'guid005', propertyNames: '颜色:红;尺码:36', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'},
      {guid: 'guid006', propertyNames: '颜色:红;尺码:37', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'},
      {guid: 'guid007', propertyNames: '颜色:黄;尺码:35', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'},
      {guid: 'guid008', propertyNames: '颜色:黄;尺码:36', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'},
      {guid: 'guid009', propertyNames: '颜色:黄;尺码:37', count: '', productId: '1', price: '0', marketPrice: '0', posTradePrice: '0', tradePrice: '0'}],
      sumInputData: [{id: 1, size: '35', count: '0'}, {id: 2, size: '37', count: '0'}, {id: 3, size: '36', count: '0'}]

    }
  },
  methods: {
    sumTableClass (row, rowIndex) {
      console.log('获得行' + rowIndex)
      if (rowIndex === 0) {
        return 'sumTable'
      }
      return ''
      // console.log('小计的背景颜色' + rowIndex)
      // return 'sumTable'
    },
    handleCountChange (index, row, col, $event) {
      for (var item in this.skuItems) {
        var property = this.skuItems[item].propertyNames.split(';')
        var color = property[0].split(':')[1]
        var size = property[1].split(':')[1]
        // 检测颜色和尺码并获得guid
        if (color === row.color && size === col.prop) {
          console.log('输入的结果对应的Guid： ' + this.skuItems[item].guid)
          var newGuid = this.skuItems[item].guid
          // 添加到输入数据

          var inputSize = new Set(this.inputData.map(function (x) { return x.guid }).concat(this.skuItems[item].guid)).size
          if (inputSize !== this.inputData.length + 1) {
            this.inputData.every(function (currentValue, index, arrAge) {
              if (currentValue.guid === newGuid) {
                currentValue.count = $event
                return false
              } else {
                return true
              }
            })
            // this.inputData.splice(inputDataIndex, 1, {guid: this.skuItems[item].guid, count: $event})
          } else {
            var newInput = {guid: this.skuItems[item].guid, count: $event, size: col.prop, code: this.no, color: color, productId: this.skuItems[item].productId, price: this.skuItems[item].price, marketPrice: this.skuItems[item].marketPrice, posTradePrice: this.skuItems[item].posTradePrice, tradePrice: this.skuItems[item].tradePrice}
            this.inputData.push(newInput)
          }

          break
        }
        // } else {
        //   var nullInput = {guid: this.skuItems[item].guid, count: 0, size: col.prop, code: this.no, color: color, productId: this.skuItems[item].productId, price: this.skuItems[item].price, marketPrice: this.skuItems[item].marketPrice, posTradePrice: this.skuItems[item].posTradePrice, tradePrice: this.skuItems[item].tradePrice}
        //   this.inputData.push(nullInput)
        // }
        // } else {
        //   var nullInput = {guid: '', count: 0, size: '', code: '', color: '', productId: '', price: 0, marketPrice: 0, posTradePrice: 0, tradePrice: 0}
        //   this.inputData.push(nullInput)
        // }
      }
        // 合计输入总数量
      var sumQTY = 0
      var getSum = function (ar) {
        var arr = ar
        var s = 0
        arr.forEach(function (val, idx, arr) {
          if (val.count !== '') {
            s += parseInt(val.count)
          }
        }, 0)
        return s
      }

      var map = {}
      var dest = []
      for (var i = 0; i < this.inputData.length; i++) {
        var ai = this.inputData[i]
        if (!map[ai.size]) {
          dest.push({size: ai.size, count: ai.count, data: [ai]})
          map[ai.size] = ai
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j]
            if (dj.size === ai.size) {
              dj.data.push(ai)
              break
            }
          }
        }
      }

      for (var d = 0; d < dest.length; d++) {
        var destSize = dest[d].size
        var count = 0
        for (var k = 0; this.sumInputData.length; k++) {
          // var sumItem = this.sumInputData[k]
          if (destSize === this.sumInputData[k].size) {
            for (var c = 0; c < dest[d].data.length; c++) {
              if (dest[d].data[c].count !== '') {
                count += parseInt(dest[d].data[c].count)
              }
            }
            this.sumInputData[k].count = count
            break
          }
          // break
        }
      }

      sumQTY = getSum(this.inputData)
      this.sumCount = '尺码(' + sumQTY + ')'
    },
    open (no) {
      // this.init()
      this.no = no
      this.show = true
      this.skuItems = []
      this.colorItems = []
      this.sizeItems = []
      this.sumInputData = []
      this.inputData = []

      this.getProductPropList()
    },
    init () {
      this.list = []
      this.pageSize = 10
      this.currentPage = 1
      this.total = 0
      this.name = ''
      this.no = ''
    },
    getList () {
      this.$http.post(api.productList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        name: this.searchKey,
        no: this.searchKey
      }).then(res => {
        this.productList = res.data.rows
        this.total = res.data.total
      })
    },
    getProductPropList () {
      this.$http.post(api.SelectSkuData, {
        no: this.no
      }).then(res => {
        this.colorItems = res.data.colorItems
        this.sizeItems = res.data.sizeItems
        this.sumInputData = res.data.sumInputData
        this.skuItems = res.data.skuItems
      })
    },
    search () {
      this.getList()
    },
    getSkuList (productId) {
      this.$http.post(api.productSkuList, {
        id: productId
      }).then(res => {
        this.skuList = res.data
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.name = val.name
      this.getSkuList(val.id)
      // alert(this.skuList[0].preopertyNames)
    },
    handleSelected (index, row) {
      this.$emit('selected', row)
      this.show = false
    },
    handleSelectionChange (index, row) {
      var data = {product: '', skuList: []}
      this.retData.productName = this.name
      this.retData.skuList = index

      data.product = this.name
      data.skuList = index
      this.multipleSelectSku = index
      // this.$emit('selectedSku', data)
      // this.show = false
    },
    selectSkuItems () {
      this.$emit('selectedSku', this.inputData)
      // this.$refs.multipleTable.clearSelection()
      this.$notify.success({title: '成功', message: '添加成功，可继续添加'})
      // this.inputData.splice(0, this.inputData.length)
      this.show = false
    }
  }
}
</script>
<style>
.borderNone .el-input__inner {
  border: none;
}
.dialog-box .el-table td,
.dialog-box .el-table th {
  padding: 0!important;
}
.el-table .sumTable {
  background: #f0ebf9;
}
</style>


