<template>
  <div>
    <el-dialog :visible.sync="show" append-to-body width="80%">
     <div id="app">
    <div class="skuChoose">
      <div class="title">
        <span>选择SKU</span>
      </div>
      <div class="filterBox clearfix">
        <el-input placeholder="请输入品名或货号" clearable v-model="searchKey" @change="search"></el-input>
        <el-button type="primary" icon="el-icon-search" v-on:click="search">搜索</el-button>
      </div>
      <div class="skuBox clearfix">
        <div class="skuBox-left">
          <el-table ref="singleTable" :data="productList" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
            <el-table-column prop="no" label="货号列表" align="center">
            </el-table-column>
            <el-table-column prop="name" label="品名" align="center">
            </el-table-column>            
          </el-table>
        </div>
        <div class="skuBox-right">
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
                    <el-input size="small" type="number" @change="handleCountChange(index,scope.row,col,$event)" :key="col.id" v-model="col.count"></el-input>
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
          <div style="margin-top: 20px">
            <el-button style="width:120px;" type="primary" v-on:click="selectSkuItems">确定</el-button>
          </div>
        </div>
      </div>
    </div>
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
    open () {
      // this.init()
      // this.no = no
      this.show = true
      this.skuItems = []
      this.colorItems = []
      this.sizeItems = []
      this.sumInputData = []
      this.inputData = []
      this.getList()
      // this.getProductPropList()
    },
    init () {
      this.list = []
      this.pageSize = 10
      this.currentPage = 1
      this.total = 0
      this.name = ''
      this.no = ''
    },
    enterEvent (val) {
      this.getList()
    },
    getList () {
      this.$http.post(api.productList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        key: this.searchKey
        // no: this.searchKey
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
      this.no = val.no
      this.skuItems = []
      this.colorItems = []
      this.sizeItems = []
      this.sumInputData = []
      this.inputData = []
      this.sumCount = '尺码'
      // this.getSkuList(val.id)
      this.getProductPropList()
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
      console.log(this.inputData)
      // this.$refs.multipleTable.clearSelection()
      this.$notify.success({title: '成功', message: '添加成功，可继续添加'})
      // this.inputData.splice(0, this.inputData.length)
      // this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  padding: 10px 15px;
}
.title {
  height: 40px;
  border-bottom: 2px solid #ccc;
  line-height: 40px;
}
.title span {
  padding-left: 5px;
  border-left: 4px solid #1989fa;
  color: #333;
  font-weight: bold;
  font-size: 16px;
}
.skuChoose .filterBox {
  padding: 20px 0;
}
.skuChoose .filterBox .el-input {
  float: left;
  width: 300px;
  height: 40px;
}
.skuChoose .filterBox .el-button {
  float: left;
  height: 40px;
  margin-left: 10px;
}
.skuChoose .skuBox .skuBox-left {
  float: left;
  width: 300px;
  border: 1px solid #eee;
}
.skuChoose .skuBox .skuBox-right {
  float: left;
  width: 500px;
  margin-left: 50px;
}
.skuChoose .skuBox .skuBox-right .el-table {
  border: 1px solid #eee;
}
.page-container {
  margin-top: 10px;
}
.table-container {
  margin-top: 10px;
}
</style>
