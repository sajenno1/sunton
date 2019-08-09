<template>
  <div class="dialog-box">
    <!-- <el-dialog :visible.sync="show" width="70%"> -->
      <el-form :model="form" label-width="120px" style="padding-right:5%;">
<keep-alive>
  <router-view>
      </router-view>
</keep-alive>
<el-form-item label="仓库">
        <el-select v-model="form.warehouseId" placeholder="请选择仓库">
            <el-option
              v-for="item in warehouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
        </el-select>
</el-form-item>
<el-form-item label="说明">
  <el-input v-model="form.describe" placeholder="请写说明" clearable></el-input>
</el-form-item>
        <el-button style="margin-left:120px;" size="small" type="primary" @click="selectProduct">选择商品</el-button>
        <el-form-item class="aaa" label="货号信息">
          <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="openSelectedSKU">添加</el-button> -->
          <el-table
            :data="productList"
            border
            show-summary
            style="width: 100%; margin-top: 10px;" @current-change="handleCurrentChange">

            <el-table-column
              label="品名"
              prop="name">
            </el-table-column>

            <el-table-column
              label="货号" prop="no">
              <!-- <template slot-scope="scope">
                  <el-autocomplete
                  v-model="scope.row.no"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入货号"
                  @select="handleSelect(scope.$index,scope.row)"
                ></el-autocomplete>
              </template>                             -->
            </el-table-column>            

            <el-table-column
              label="单位"
              prop="unit">
            </el-table-column>

            <el-table-column
              label="单价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" size="small" @change="handlePriceChange(scope.$index,scope.row)"></el-input>
              </template>              
            </el-table-column>                        

            <el-table-column
              label="数量"
              prop="count">
              <template slot-scope="scope">
                <el-input readonly="true" v-model="scope.row.count" :min="1" size="small" @change="handleCountChange(scope.$index,scope.row)"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="金额"
              prop="amount">
            </el-table-column>

            <el-table-column
              label="备注"
              prop="remarks">
              <!-- <template slot-scope="scope">
                <el-input v-model="scope.row.remarks" :min="1" size="small" @keyup.enter.native="handleKeyUp(scope.$index)"></el-input>
              </template> -->
              <template slot-scope="scope">
                <el-input v-model="scope.row.remarks" :min="1" size="small" ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="150"
              align="center">
              <template slot-scope="scope">
                <div class="bbb">
                  <!-- <el-button
                  type="primary"
                  size="mini"
                  @click="handleKeyUp(scope.$index)" icon="el-icon-plus"></el-button> -->

                  <el-button
                    type="danger"
                    size="mini"
                    @click="handleDelProduct(scope.$index, scope.row)" icon="el-icon-minus"></el-button>
                </div>
              </template>
            </el-table-column>            
          </el-table>
    <br>【{{no}}】SKU信息

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
          <template v-for="(col,index) in sizeItems">
            <el-table-column :label="col.name" align="center" :key="col.id">
              <template slot-scope="scope">
                <div v-for="prop in scope.row.props" class="borderNone" :key="prop.id">
                    <el-input type="number" v-if="prop.size === col.name" :value="prop.qty"  @change="handleSKUQTYChange(index,scope.row,col,$event)"></el-input>
                </div>
          </template>
          
        </el-table-column>
      </template>
        </el-table-column>
        
      </el-table>

        </el-form-item>

      </el-form>
      
      <div slot="footer" class="dialog-footer dialog-button">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">保 存</el-button>
      </div>

    <!-- </el-dialog> -->
      <div>
        <selected-SKU ref="selectedSKU" @selectedSku="handleselectedSKU"/>
      </div>    
  </div>
</template>

<script>
import * as api from '../../../api'
// import selectedSKU from './selectedSKU'
// import selectedSKU from './selectedDimension'
// import selectedSKU from '../../basic/common/selectedDimension'
import selectedSKU from '../../basic/common/selectedSKU'
export default {
  name: 'antiChannelConflict-inStock-addBySKU',
  components: { selectedSKU },
  data () {
    return {
      sumCount: '尺码',
      currentNo: '',
      show: false,
      no: '',
      form: {amount: 0, describe: '', warehouseId: 0},
      warehouseList: [],
      pageParams: {
        page: 1,
        pageSize: 1000
      },
      pdaAccountList: [],
      productList: [
        // {
        //   productId: '',
        //   name: '',
        //   no: '',
        //   price: 0,
        //   amount: 0,
        //   count: 1,
        //   propertyNames: '',
        //   productSkuId: '',
        //   remarks: '',
        //   unit: ''
        // }
      ],
      productNoList: [],
      sellAreaList: [],
      dealerName: '',
      timeout: null,
      productInfo: {},
      showTable: [{code: '001', color: '白1', size: '35', qty: '1'}, {code: '002', color: '黄', size: '36', qty: '2'}],
      sizeColumns: [{prop: 'qty', lable: '35', id: '1'}, {prop: 'qty', lable: '35', id: '2'}],
      colorItems: [{id: 1, color: '白', size: '35', code: '001', count: '', no: '', props: [{size: '36', qty: '1', id: 1, guid: ''}, {size: '37', qty: '2', id: 2, guid: ''}]},
      {id: 2, color: '红', size: '34', code: '002', count: '', no: '', props: [{size: '37', qty: '3', id: 2, guid: ''}]},
      {id: 3, color: '黄', size: '38', code: '003', count: '', no: '', props: [{size: '38', qty: '1', id: 3, guid: ''}]}],
      // sizeItems: [{id: 1, label: '35', prop: '35', count: '', no: '', guid: '', color: ''}, {id: 2, label: '37', prop: '37', count: '', no: '', guid: '', color: ''}, {id: 3, label: '36', prop: '36', count: '', no: '', guid: '', color: ''}],
      sizeItems: [{name: '36', id: '1', prop: [{color: '白', qty: 1, id: 1}, {color: '红', qty: 2, id: 2}]}, {name: '37', id: '2', prop: [{color: '白', qty: 3, id: 3}, {color: '红', qty: 4, id: 4}]}],
      inputData: [],
      skuItems: [{guid: 'guid001', propertyNames: '颜色:白;尺码:35', count: ''}, {guid: 'guid002', propertyNames: '颜色:白;尺码:37', count: ''},
      {guid: 'guid003', propertyNames: '颜色:白;尺码:36', count: ''},
      {guid: 'guid004', propertyNames: '颜色:红;尺码:35', count: ''},
      {guid: 'guid005', propertyNames: '颜色:红;尺码:36', count: ''},
      {guid: 'guid006', propertyNames: '颜色:红;尺码:37', count: ''},
      {guid: 'guid007', propertyNames: '颜色:黄;尺码:35', count: ''},
      {guid: 'guid008', propertyNames: '颜色:黄;尺码:36', count: ''},
      {guid: 'guid009', propertyNames: '颜色:黄;尺码:37', count: ''}],
      sumInputData: [{id: 1, size: '34', count: '0'}, {id: 2, size: '37', count: '0'}, {id: 3, size: '36', count: '0'}],
      receiveSkuData: []
    }
  },
  methods: {
    getAmount (param) {
      var _this = this
      param.data.forEach((d, index) => {
        _this.form.amount += d.amount
      })
    },
    celldbClickR (row, col, cell, event) {
      console.log('打印双击单元格事件----行')
      console.log(row)
      console.log('打印事件')
      console.log(event)
      event.target.innerHTML = ''
      let cellInput = document.createElement('input')
      cellInput.value = ''
      cellInput.setAttribute('type', 'number')
      // cellInput.style.width = '90%'
      // cellInput.style.height = '90%'
      cell.appendChild(cellInput)
      cellInput.onblur = function () {
        cell.removeChild(cellInput)
        event.target.innerHTML = cellInput.value
      }
      for (var item in this.skuItems) {
        var property = this.skuItems[item].propertyNames.split(';')
        var color = property[0].split(':')[1]
        var size = property[1].split(':')[1]
        // 检测颜色和尺码并获得guid
        if (color === row.color && size === col.prop) {
          var newGuid = this.skuItems[item].guid
          // 添加到输入数据

          var inputSize = new Set(this.receiveSkuData.map(function (x) { return x.guid }).concat(this.skuItems[item].guid)).size
          if (inputSize !== this.receiveSkuData.length + 1) {
            this.receiveSkuData.every(function (currentValue, index, arrAge) {
              if (currentValue.guid === newGuid) {
                currentValue.count = cellInput.value
                return false
              } else {
                return true
              }
            })
          } else {
            var newInput = {guid: this.skuItems[item].guid, count: cellInput.value, size: col.prop, code: this.no, color: color}
            this.receiveSkuData.push(newInput)
          }
          break
        }
      }
      this.computSumQTY(row)

      console.log('双击事件: ')
      console.log(col, row)
    },
    handleCurrentChange (curVal, oldVal) {
      this.no = curVal.no
      this.sizeItems.splice(0, this.sizeItems.length)
      this.colorItems.splice(0, this.colorItems.length)
      this.getProductPropList(this.no, curVal)
    },
    handleSKUQTYChange (index, row, col, qty) {
      for (var item in this.skuItems) {
        var property = this.skuItems[item].propertyNames.split(';')
        var color = property[0].split(':')[1]
        var size = property[1].split(':')[1]
        // 检测颜色和尺码并获得guid
        if (color === row.color && size === col.prop) {
          var newGuid = this.skuItems[item].guid
          // 添加到输入数据

          var inputSize = new Set(this.receiveSkuData.map(function (x) { return x.guid }).concat(this.skuItems[item].guid)).size
          if (inputSize !== this.receiveSkuData.length + 1) {
            this.receiveSkuData.every(function (currentValue, index, arrAge) {
              if (currentValue.guid === newGuid) {
                currentValue.count = qty
                return false
              } else {
                return true
              }
            })
          } else {
            var newInput = {guid: this.skuItems[item].guid, count: qty, size: col.prop, code: this.no, color: color}
            this.receiveSkuData.push(newInput)
          }
          break
        }
      }
      this.computSumQTY(row)
    },
    computSumQTY (row) {
      // 合计输入总数量
      var sumQTY = 0
      var getSum = function (ar, no) {
        var arr = ar
        var s = 0
        arr.forEach(function (val, idx, arr) {
          if (val.count !== '' && val.code === no) {
            s += parseInt(val.count)
          }
        }, 0)
        return s
      }

      // 货号数量合计
      sumQTY += getSum(this.receiveSkuData, this.no)
      for (let d = 0; d < this.productList.length; d++) {
        if (this.productList[d].no === row.no) {
          this.productList[d].count = sumQTY
          this.productList[d].amount = (sumQTY * this.productList[d].price).toFixed(2)
        }
      }
    },
    getProductInfo (no, index) {
      this.$http.post(api.productInfoByNo, {no: no}).then(res => {
        this.productInfo = res.data
        this.productList[index].name = res.data.name
        this.productList[index].unit = res.data.unit
        this.productList[index].price = res.data.price
        this.productList[index].amount = res.data.price
        this.productList[index].productId = res.data.id
        this.productList[index].no = res.data.no
      })
    },
    checkNoExist (no) {
      var c = 0
      this.productList.forEach(function (e) {
        if (e.no === no) {
          c++
        }
      })
      if (c === 1) {
        alert('该货号已经存在！')
        return true
      } else {
        return false
      }
    },
    handleSelect (index, row) {
      if (this.checkNoExist(row.no) === true) {
        return
      }
      this.getProductInfo(row.no, index)
      this.no = row.no
      // 打开sku二维页面
      this.$refs.selectedSKU.open(row.no)
    },
    selectProduct () {
      this.$refs.selectedSKU.open()
    },
    getProductNoLIst (queryString, cb) {
      this.$http.post(api.productList, {
        page: 1,
        pageSize: 30,
        name: queryString,
        no: queryString
      }).then(res => {
        this.productNoList = res.data.rows
        // var restaurants = this.productNoList
        // // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        // clearTimeout(this.timeout)
        // this.timeout = setTimeout(() => {
        //   // cb(results)
        //   cb(restaurants)
        // }, 3000 * Math.random())
      })
    },
    querySearchAsync (queryString, cb) {
      console.log(queryString)
      this.getProductNoLIst(queryString, cb)
      var restaurants = this.productNoList
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
        // cb(restaurants)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    open () {
      this.colorItems = []
      this.sizeItems = []
      this.form = {}
      this.form.amount = 0
      this.warehouseList = []
      this.pdaAccountList = []
      // this.productList = []
      this.sellAreaList = []
      this.dealerName = ''
      this.show = true
      this.getWarehouseList()
      this.getProductNoLIst()
      console.log('开始获得路由信息')
      console.log(this.$route.path)
    },
    handleKeyUp (index) {
      if (index === this.productList.length - 1 && this.productList[index].name !== '') {
        this.productList.push({
          productId: '',
          name: '',
          price: 0,
          amount: 0,
          count: 1,
          propertyNames: '',
          productSkuId: '',
          remarks: '',
          no: ''
        })
      }
    },
    getWarehouseList () {
      this.$http.post(api.warehouseList, this.pageParams).then(res => {
        this.warehouseList = res.data.rows
      })
    },
    create () {
      this.form.items = this.productList.map(x => {
        return {
          productId: x.productId,
          price: x.price,
          amount: x.amount,
          productSkuId: x.productSkuId,
          count: x.count,
          warehouseId: this.form.warehouseId
        }
      })

      this.form.skuItems = this.receiveSkuData.map(d => {
        return {
          productId: d.productId,
          code: d.code,
          guid: d.guid,
          size: d.size,
          count: d.count,
          color: d.color,
          price: d.price,
          marketPrice: d.marketPrice,
          posTradePrice: d.posTradePrice,
          tradePrice: d.tradePrice
        }
      })
      if (this.productList.length > 0) {
        if (this.productList[0].name === '') {
          alert('请选择货号')
          return
        }
      }
      if (this.productList.length === 0) {
        alert('没有选择货号')
        return
      }
      this.computAmount()
      this.$http.post(api.addInStock, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
      this.$router.push('./list')
    },
    handleCountChange (index, row) {
      this.amountValueChange(index, row)
    },
    handlePriceChange (index, row) {
      this.amountValueChange(index, row)
    },
    amountValueChange (index, row) {
      var sumMoney = row.price * row.count
      this.productList[index].amount = sumMoney.toFixed(2)
      this.computAmount()
    },
    computAmount () {
      var _this = this
      _this.form.amount = 0
      this.productList.forEach(item => {
        _this.form.amount += parseFloat(item.amount)
      })
      console.log('总金额.....')
      console.log(this.form.amount)
    },
    openSelectedSKU () {
      this.$refs.selectedSKU.open()
    },
    handleDelProduct (index, row) {
      var _this = this
      // if (this.productList.length === 1) {
      //   return
      // }
      _this.productList.splice(index, 1)
      // 修改总金额
      _this.form.amount -= row.amount
      // 删除sku数据
      for (let i = 0; i < this.receiveSkuData.length; i++) {
        if (this.receiveSkuData[i].code === row.no) {
          this.receiveSkuData.splice(i, 1)
          i--
        }
      }
    },
    handleselectedSKU (row) {
      if (row.length > 0) {
        if (this.checkNoExist(row[0].code) === true) {
          return
        }
      }
      this.sizeItems.splice(0, this.sizeItems.length)
      this.colorItems.splice(0, this.colorItems.length)
      var cNo = ''
      var noQTY = 0
      for (let sku in row) {
        cNo = row[sku].code
        noQTY += Number(row[sku].count)
        this.receiveSkuData.push({
          code: row[sku].code,
          count: row[sku].count,
          guid: row[sku].guid,
          size: row[sku].size,
          color: row[sku].color,
          productId: row[sku].productId,
          price: row[sku].price,
          amount: row[sku].price * row[sku].count,
          marketPrice: row[sku].marketPrice,
          posTradePrice: row[sku].posTradePrice,
          tradePrice: row[sku].tradePrice
        })
      }
      // 当前货号赋值
      this.currentNo = cNo
      this.getProductPropList(this.currentNo, row)
      // 计算当前货号总数量
      // var noData = {no: cNo}
      // this.computSumQTY(noData)

      this.$http.post(api.productInfoByNo, {no: cNo}).then(res => {
        this.productInfo = res.data
        // 单据总金额累加
        this.form.amount += res.data.price * noQTY
        this.productList.push({
          productId: res.data.id,
          unit: res.data.unit,
          name: res.data.name,
          price: res.data.price,
          amount: res.data.price * noQTY,
          no: res.data.no,
          count: noQTY
        })
      })

      // this.computSumQTY(noData)
    },
    getProductPropList (noStr, row) {
      // this.sizeItems.splice(0, this.sizeItems.length)
      this.$http.post(api.SelectSkuData, {
        no: noStr === 'undefined' ? '' : noStr
      }).then(res => {
        this.colorItems = res.data.colorItems
        this.sizeItems = res.data.sizeItems

        var colorItemPropId = 0
        for (let receiItem in this.receiveSkuData) {
          colorItemPropId += 1
          for (let colorItem in this.colorItems) {
            if (this.receiveSkuData[receiItem].color === this.colorItems[colorItem].color && this.receiveSkuData[receiItem].code === noStr) {
              this.colorItems[colorItem].props.push({
                id: colorItemPropId,
                size: this.receiveSkuData[receiItem].size,
                qty: this.receiveSkuData[receiItem].count,
                guid: this.receiveSkuData[receiItem].guid
              })
            }
          }
        }

        this.sumInputData = res.data.sumInputData
        this.skuItems = res.data.skuItems
      })
    }
  },
  mounted () {
    this.open()
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
.el-autocomplete .el-input__inner {
  height: 30px;
  border: 0px;
  margin: 1px 0;
}
.aaa .el-input__inner { 
  border: 0px;
}
.dialog-button {
  float: right;
  padding-right: 5%;
}
.bbb .el-button--mini {
  padding: 7px;
}
/* .dialog-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 134px;
  margin: 0 auto;
  padding-right: 0!important;
  padding-bottom: 30px;
} */
.app-main {
  padding-bottom: 100px;
}
</style>
