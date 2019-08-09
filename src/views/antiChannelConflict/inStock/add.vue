<template>
  <div>
    <el-dialog :visible.sync="show" width="70%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="仓库">
          <el-select v-model="form.warehouseId" placeholder="请选择">
            <el-option
              v-for="item in warehouseList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="openSelectedSKU">添加</el-button>
          <el-table
            :data="productList"
            border
            style="width: 100%; margin-top: 10px;" @current-change="handleCurrentChange">

            <el-table-column
              label="产品名称"
              prop="name">
            </el-table-column>

            <el-table-column
              label="货号">
              <template slot-scope="scope">
                  <el-autocomplete
                  v-model="scope.row.no"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入货号"
                  @select="handleSelect(scope.$index,scope.row)"
                ></el-autocomplete>
              </template>                            
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
              label="数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.count" :min="1" size="small" @change="handleCountChange(scope.$index,scope.row)"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="金额"
              prop="amount">
            </el-table-column>

            <el-table-column
              label="备注"
              prop="remarks">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remarks" :min="1" size="small" @keyup.enter.native="handleKeyUp"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleDelProduct(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
<br>

     <el-table :data="focusRowSKU" style="width: 100%" highlight-current-row>
        <el-table-column label="颜色" align="center" prop="color">
        </el-table-column>
        <el-table-column label="尺码" align="center" prop="size">
        </el-table-column>
        <el-table-column label="数量" align="center" prop="count">
        </el-table-column>
        
      </el-table>

        </el-form-item>

      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">保 存</el-button>
      </div>

    </el-dialog>
      <div>
        <selected-SKU ref="selectedSKU" @selectedSku="handleselectedSKU"/>
      </div>    
  </div>
</template>

<script>
import * as api from '../../../api'
// import selectedSKU from './selectedSKU'
import selectedSKU from './selectedDimension'
export default {
  name: 'antiChannelConflict-inStock-add',
  components: { selectedSKU },
  data () {
    return {
      sumCount: '尺码',
      currentNo: '',
      show: false,
      no: '',
      form: {},
      warehouseList: [],
      pageParams: {
        page: 1,
        pageSize: 1000
      },
      pdaAccountList: [],
      productList: [
        {
          productId: '',
          name: '',
          no: '',
          price: 0,
          amount: 0,
          count: 1,
          propertyNames: '',
          productSkuId: '',
          remarks: '',
          unit: ''
        }
      ],
      productNoList: [],
      sellAreaList: [],
      dealerName: '',
      timeout: null,
      productInfo: {},
      focusRowSKU: [],
      // showTable: [{code: '001', color: '白1', size: [{name: '35', qty: '1'}, {name: '36', qty: '2'}]}, {code: '002', color: '黄', size: [{name: '35', qty: '1'}, {name: '36', qty: '2'}]}],
      showTable: [{code: '001', color: '白1', size: '35', qty: '1'}, {code: '002', color: '黄', size: '36', qty: '2'}],
      sizeColumns: [{prop: 'qty', lable: '35', id: '1'}, {prop: 'qty', lable: '35', id: '2'}],
      colorItems: [{id: 1, color: '白', size: '35', code: '001', count: ''},
      {id: 2, color: '红', size: '34', code: '002', count: ''},
      {id: 3, color: '黄', size: '38', code: '003', count: ''}],
      // sizeItems: [{id: 1, label: '35', prop: '35', count: '', no: '', guid: '', color: ''}, {id: 2, label: '37', prop: '37', count: '', no: '', guid: '', color: ''}, {id: 3, label: '36', prop: '36', count: '', no: '', guid: '', color: ''}],
      sizeItems: [{name: '36', id: '1'}, {name: '37', id: '2'}],
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
      receiveSkuData: [{code: '', guid: '', size: '', count: '', color: ''}]
    }
  },
  methods: {
    handleCurrentChange (val) {
      console.log('获得行焦点')
      console.log(val)
      var no = val.no
      this.focusRowSKU.splice(0, this.focusRowSKU.length)
      for (var item in this.receiveSkuData) {
        if (this.receiveSkuData[item].code === no) {
          var color = this.receiveSkuData[item].color
          var size = this.receiveSkuData[item].size
          var count = this.receiveSkuData[item].count
          this.focusRowSKU.push({color: color, size: size, count: count})
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
        // this.productList[index].name = res.data.name
        console.log('获取产品数据--名称from resData： ' + res.data.name)
      })
      console.log('获取产品数据--名称： ' + this.productInfo.name)
      // for (var item in this.productInfo) {
      //   console.log('属性： ' + item)
      // }
    },
    handleSelect (index, row) {
      this.getProductInfo(row.no, index)
      var info = this.productInfo
      for (var item in info) {
        console.log('sssssss' + item)
      }
      // this.productList[index] = {name: '333333'}
      console.log('被选中了' + info.name)
      console.log('被选中的row:  ' + row.no)
      console.log('被选中的porductId: ' + row.productId)
      console.log('this.productNoList: =============')
      console.log(this.productNoList)
      console.log('=========================')

      // 打开sku二维页面
      this.$refs.selectedSKU.open(row.no)
    },
    getProductNoLIst (queryString) {
      this.$http.post(api.productList, {
        page: 1,
        pageSize: 30,
        name: queryString,
        no: queryString
      }).then(res => {
        this.productNoList = res.data.rows
      })
    },
    querySearchAsync (queryString, cb) {
      console.log(queryString)
      this.getProductNoLIst(queryString)
      var restaurants = this.productNoList
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
        console.log('results数据： ========')
        console.log(results)
        console.log('================')
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    open () {
      this.form = {}
      this.warehouseList = []
      this.pdaAccountList = []
      // this.productList = []
      this.sellAreaList = []
      this.dealerName = ''
      this.show = true
      this.getWarehouseList()
      this.getProductNoLIst()
    },
    handleKeyUp () {
      this.productList.push({
        productId: '',
        name: '',
        price: 0,
        amount: 0,
        count: 1,
        propertyNames: '',
        productSkuId: '',
        remarks: ''
      })
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

      this.$http.post(api.addInStock, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
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
    },
    openSelectedSKU () {
      this.$refs.selectedSKU.open()
    },
    handleDelProduct (index, row) {
      this.productList.splice(index, 1)
    },
    handleselectedSKU (row) {
      this.sizeItems.splice(0, this.sizeItems.length)
      console.log('接收sku数据')
      console.log('==================')
      console.log(row)
      var cNo = ''
      for (let sku in row) {
        // console.log('接收到的sku细节(code):' + row[sku].guid)
        // 当前的产品货号
        cNo = row[sku].code
        this.receiveSkuData.push({
          code: row[sku].code,
          count: row[sku].count,
          guid: row[sku].guid,
          size: row[sku].size,
          color: row[sku].color
        })
        // this.sizeItems.push({
        //   id: '',
        //   label: row[sku].size,
        //   prop: row[sku].size,
        //   no: row[sku].code,
        //   color: row[sku].color,
        //   count: row[sku].count
        // })
      }
      // 当前货号赋值
      this.currentNo = cNo
      this.getProductPropList(this.currentNo, row)
    },
    getProductPropList (noStr, row) {
      // this.sizeItems.splice(0, this.sizeItems.length)
      this.$http.post(api.SelectSkuData, {
        no: noStr
      }).then(res => {
        console.log('显示传过来的datatable: ')
        console.log(res.data)
        console.log('====================')
        this.colorItems = res.data.colorItems
        // this.sizeItems = res.data.sizeItems
        // var rowCount = 0

        for (let i in res.data.sizeItems) {
          var qty = ''
          var noStr = res.data.sizeItems[i].no
          var prop = res.data.sizeItems[i].prop
          for (let c in this.receiveSkuData) {
            var receiNo = this.receiveSkuData[c].code
            var receiSize = this.receiveSkuData[c].size
            var receiQTY = this.receiveSkuData[c].count
            if (noStr === receiNo && prop === receiSize) {
              qty = receiQTY
              break
            }
          }
          this.sizeItems.push({
            id: '',
            label: res.data.sizeItems[i].label,
            prop: res.data.sizeItems[i].prop,
            no: res.data.sizeItems[i].no,
            count: qty
          })
          console.log('this.sizeItems数据')
          console.log(this.sizeItems)
          console.log('===============')
          // this.sizeItems[i].count = '33'
        }
        this.sumInputData = res.data.sumInputData
        this.skuItems = res.data.skuItems
      })
    }
  }

}
</script>

<style>

</style>
