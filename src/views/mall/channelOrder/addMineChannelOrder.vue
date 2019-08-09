<template>
  <div>
    <el-dialog v-bind:visible.sync="showCurrentDialog" width="80%">
      <el-form label-width="120px" style="padding-right:5%;">

        <h1 style="padding:0 0 10px 20px;font-size:16px;">购货订单</h1>


        <div>
          <div v-on:click="showAllAddressOrNot">选择收货地址</div>
          <ul>
            <li v-for="(item,i) in newOrderStartData.userAddressList" v-bind:key="i" v-show="item.isShow">
              <div v-bind:style="item.isDefault ? 'font-weight:bold;':''" v-on:click="onSelectAddress(item)">
              {{item.areaName}} , {{item.address}}
              </div>
            </li>
          </ul>
        </div>
        <el-form-item label="产品">
          <el-button size="small" type="primary" icon="el-icon-plus" v-on:click="openSelectedSKU">添加</el-button>
          <el-table
            :data="productList"
            border
            style="width: 100%; margin-top: 10px;">

            <el-table-column
              label="产品名称"
              prop="name">
            </el-table-column>

            <el-table-column
              label="SKU"
              prop="productSkuName">
            </el-table-column>    

            <el-table-column
              label="价格">
              <template slot-scope="scope">
                <div>{{ scope.row.price | Currency }}</div>
              </template>
            </el-table-column>        

            <el-table-column
              label="数量">
              <template slot-scope="scope">
                <!-- <el-input-number v-model="scope.row.quantity" v-bind:min="1" size="small" ></el-input-number> -->
                <input type="text" v-model="scope.row.quantity" v-on:blur="inputNumberChange()"/>
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
                  v-on:click="handleDelProduct(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>{{ orderAmount | Currency }}</div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" v-on:click="showCurrentDialog = false">取 消</el-button>
        <el-button size="small" type="primary" v-on:click="submitChannelOrder">确 定</el-button>
      </div>

      <div>
        <!-- <selected-dealer ref="selectedDealer" v-on:selected="handleSelectedDealer"/> -->
        <!-- <selected-product ref="selectedProduct" v-on:selected="handleselectedProduct"/> -->
        <selected-SKU ref="selectedSKU" v-on:selectedSku="handleselectedSKU"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
// import selectedDealer from '../../antiChannelConflict/outStock/selectedDealer'
// import selectedProduct from '../../antiChannelConflict/outStock/selectedProduct'
import selectedSKU from '../../antiChannelConflict/outStock/selectedSKU'
export default {
  name: 'antiChannelConflict-outStock-add',
  components: { selectedSKU }, // selectedDealer,, selectedProduct
  data () {
    return {
      showCurrentDialog: false,
      // form: {},
      // warehouseList: [],
      // pageParams: {
      //   page: 1,
      //   pageSize: 1000
      // },
      // pdaAccountList: [],
      productList: [],
      newOrderStartData: {},
      bShowAllAddress: false,
      orderAmount: 0
      // sellAreaList: [],
      // dealerName: ''
    }
  },
  methods: {
    open () {
      // this.form = {}
      // this.warehouseList = []
      // this.pdaAccountList = []
      this.productList = []
      // this.sellAreaList = []
      // this.dealerName = ''
      this.showCurrentDialog = true
      // this.getWarehouseList()
      // this.getPDAAccountList()
      // console.log(api.warehouseList)
      //
      this.$http.post(api.mallNewChannelOrderStart, []).then(response => {
        // newOrderStartData.userAddressList
        var bIsSelected = false
        response.data.userAddressList.forEach(function (item) {
          item.isShow = item.isDefault
          if (item.isShow) bIsSelected = true
        })
        if (!bIsSelected && response.data.userAddressList.length > 0) response.data.userAddressList[0].isShow = true
        // //
        this.newOrderStartData = response.data
        // //
        this.lastRefresh()
      })
    },
    inputNumberChange () { this.lastRefresh() },
    lastRefresh () {
      var _this = this
      var orderAmount = 0
      // _this.newOrderStartData.shoppingCartInfoList.forEach(function (item2) {
      //   orderAmount += item2.Price * item2.Quantity
      // })
      _this.productList.forEach(function (item2) {
        orderAmount += item2.price * item2.quantity
      })
      _this.orderAmount = orderAmount
      console.log(orderAmount)
    },
    // getWarehouseList () {
    //   this.$http.post(api.warehouseList, this.pageParams).then(res => {
    //     this.warehouseList = res.data.rows
    //   })
    // },
    // getPDAAccountList () {
    //   this.$http.post(api.pdaAccountList, this.pageParams).then(res => {
    //     this.pdaAccountList = res.data.rows
    //   })
    // },
    // create () {
    //   this.form.items = this.productList.map(x => {
    //     return {
    //       productId: x.id,
    //       count: x.count
    //     }
    //   })
    //   this.$http.post(api.addOutStock, this.form).then(res => {
    //     this.show = false
    //     this.$emit('getList')
    //     this.$notify.success({ title: '成功', message: '添加成功' })
    //   })
    // },
    submitChannelOrder () {
      // var _this = this
      // var items = _this.newOrderStartData.shoppingCartInfoList.map(x => { productId: x.id })
      // console.log(_this.newOrderStartData.shoppingCartInfoList)
      // var a = false
      // console.log(this.productList)
      // if (a) return
      //
      var _this = this
      var found = false
      var userAddressId = ''
      for (var item of this.newOrderStartData.userAddressList) {
        if (item.isDefault) {
          userAddressId = item.id
          found = true
          break
        }
      }
      if (!found) {
        this.$notify({ title: '错误', message: '你没有默认的收货地址', type: 'error' })
        return
      }
      // var items = []
      // for (var item2 of this.newOrderStartData.shoppingCartInfoList) {
      //   items.push({shoppingCartId: item2.Id, quantity: item2.Quantity})
      // }
      var items = []
      for (var item2 of this.productList) {
        items.push(item2)
      }

      this.$confirm('确认提交订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'information'
      }).then(() => {
        this.$http.post(api.mallNormalAddChannelOrder, {
          ForCheckOrderAmount: _this.orderAmount,
          UserAddressId: userAddressId,
          Remark: '',
          Items: items
        }).then(res => {
          // row.orderStatus = this.orderStatusText[res.data.orderStatus]
          // this.$notify({ title: '成功', message: '订单关闭成功！', type: 'success' })
          this.$emit('getList')
          this.$notify({ title: '成功', message: '订单提交成功', type: 'success' })
          this.showCurrentDialog = false
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    // openSelectedDealer () {
    //   this.$refs.selectedDealer.open()
    // },
    // handleSelectedDealer (row) {
    //   this.dealerName = row.name
    //   this.form.dealerId = row.id
    //   this.$http.post(api.dealerSellAreaList, { id: row.id }).then(res => {
    //     this.sellAreaList = res.data
    //   })
    // },
    // openselectedProduct () {
    //   this.$refs.selectedProduct.open()
    // },
    openSelectedSKU () {
      this.$refs.selectedSKU.open()
    },
    handleDelProduct (index, row) {
      this.productList.splice(index, 1)
      this.lastRefresh()
    },
    // handleselectedProduct (row) {
    //   if (this.productList.findIndex(x => x.id === row.id) !== -1) {
    //     this.$notify.error({ title: '错误', message: '该产品已选中' })
    //     return
    //   }
    //   this.productList.push({
    //     id: row.id,
    //     name: row.name,
    //     price: 0,
    //     quantity: 1
    //   })
    // },
    handleselectedSKU (data) {
      // for (let i in row.skuList) {
      //   if (this.productList.findIndex(x => x.id === row.skuList[i].id)) {
      //     // alert('productListId: ' + this.productList[i].id)
      //     this.$notify.error({title: '错误', message: '选择重复的sku'})
      //     return
      //   }
      // }
      // console.log(row.skuList)
      var products = []
      for (let sku in data.skuList) {
        products.push(data.skuList[sku].productId)
        this.productList.push({
          productId: data.skuList[sku].productId,
          name: data.productName,
          quantity: 1,
          price: data.price,
          // propertyNames: data.skuList[sku].propertyNames,
          productSkuName: data.skuList[sku].productSkuName,
          productSkuId: data.skuList[sku].id
        })
      }
      // mallProductDeliveryTemplates
      this.lastRefresh()
      // this.$http.post(api.mallProductDeliveryTemplates, {ids: products}).then(res => {
      //   // var a = 1
      //   // console.log(res.data)
      //   for (var key in res.data) {
      //     this.productList.forEach(function (item) {
      //       if (item.productId === key) {
      //         item.deliveryTemplate = res.data[key]
      //       }
      //     })
      //   }
      //   // console.log(this.productList)
      //   this.lastRefresh()
      // })
    },
    showAllAddressOrNot () {
      if (this.bShowAllAddress) {
        this.newOrderStartData.userAddressList.forEach(function (item) {
          if (item.isDefault) item.isShow = true
          else item.isShow = false
        })
      } else {
        this.newOrderStartData.userAddressList.forEach(function (item) {
          item.isShow = true
        })
      }
      this.bShowAllAddress = !this.bShowAllAddress
    },
    onSelectAddress (item) {
      if (!item.isDefault) {
        this.newOrderStartData.userAddressList.forEach(function (item2) {
          if (item2 === item) item2.isDefault = true
          else item2.isDefault = false
        })
        this.showAllAddressOrNot()
      }
    }
  }
}
</script>

<style>

</style>
