<template>
  <div>
    <el-dialog :visible.sync="show" width="80%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="经销商(客户)">
          <el-input v-model="dealerName">
            <el-button slot="append" @click="openSelectedDealer">选择</el-button>
          </el-input>
        </el-form-item>

        <!-- <el-form-item label="销售地区">
          <el-select v-model="form.sellAreaId">
            <el-option
              v-for="item in sellAreaList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="PDA账号">
          <el-select v-model="form.pdaAccountId" placeholder="请选择">
            <el-option
              v-for="item in pdaAccountList"
              :key="item.id"
              :label="item.userName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->

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
            show-summary="true"
            style="width: 100%; margin-top: 10px;">

            <el-table-column
              label="产品名称"
              prop="name">
            </el-table-column>

            <el-table-column
              label="编码" prop="no">
            </el-table-column>

            <el-table-column
              label="SKU">
              <template slot-scope="scope">
                <span>{{ getSkuData(scope.row.propertyNames) }}</span>
              </template>
            </el-table-column>            

            <el-table-column
              label="数量" prop="count">
              <template slot-scope="scope">
                <el-input type="number"  v-model="scope.row.count" :min="1" size="small" @change="handleCountChange(scope.$index,scope.row)"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="单价" prop="price">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" :min="1" size="small" @change="handlePriceChange(scope.$index,scope.row)"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              label="金额"
              prop="amount">
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
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>

      <div>
        <selected-dealer ref="selectedDealer" @selectedDealer="handleSelectedDealer"/>
        <!-- <selected-product ref="selectedProduct" @selected="handleselectedProduct"/> -->
        <selected-SKU ref="selectedSKU" @selectedSku="handleselectedSKU"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
import selectedDealer from './selectedDealer'
// import selectedProduct from './selectedProduct'
import selectedSKU from './selectedSKU'
import common from '../../../filter/common'
export default {
  name: 'antiChannelConflict-outStock-add',
  components: { selectedDealer, selectedSKU },
  data () {
    return {
      show: false,
      form: {},
      warehouseList: [],
      pageParams: {
        page: 1,
        pageSize: 1000
      },
      pdaAccountList: [],
      productList: [],
      sellAreaList: [],
      dealerName: '',
      discount: 100
    }
  },
  methods: {
    handleCountChange (index, row) {
      this.amountValueChange(index, row)
    },
    handlePriceChange (index, row) {
      this.amountValueChange(index, row)
    },
    amountValueChange (index, row) {
      console.log('-----------')
      var sumMoney = row.price * row.count
      this.form.OrderAmount = 0
      this.productList[index].amount = sumMoney.toFixed(2)
      this.updateAmount()
    },
    updateAmount () {
      this.productList.forEach(item => {
        this.form.OrderAmount += parseFloat(item.amount)
      })
    },
    getSkuData (sku) {
      return common.removeSkuData(sku)
    },
    open () {
      this.form = {}
      this.form.OrderAmount = 0
      this.warehouseList = []
      this.pdaAccountList = []
      this.productList = []
      this.sellAreaList = []
      this.dealerName = ''
      this.show = true
      this.getWarehouseList()
      this.getPDAAccountList()
    },
    getWarehouseList () {
      this.$http.post(api.warehouseList, this.pageParams).then(res => {
        this.warehouseList = res.data.rows
      })
    },
    getPDAAccountList () {
      this.$http.post(api.pdaAccountList, this.pageParams).then(res => {
        this.pdaAccountList = res.data.rows
      })
    },
    create () {
      this.form.items = this.productList.map(x => {
        return {
          productId: x.productId,
          skuId: x.id,
          count: x.count
        }
      })

      this.$http.post(api.addOutStock, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
    },
    openSelectedDealer () {
      this.$refs.selectedDealer.open()
    },
    handleSelectedDealer (row) {
      this.dealerName = row.name
      this.form.dealerId = row.id
      this.$http.post(api.dealerSellAreaList, { id: row.id }).then(res => {
        this.sellAreaList = res.data
      })
      this.$http.post(api.dealerLevelInfo, {id: row.dealerLevelId}).then(res => {
        if (res.data !== null) {
          this.discount = res.data.discount
        }
      })
    },
    openselectedProduct () {
      this.$refs.selectedProduct.open()
    },
    openSelectedSKU () {
      if (this.dealerName === '') {
        this.$notify.error({title: '错误', message: '请先选择经销商'})
        return
      }
      this.$refs.selectedSKU.open()
    },
    handleDelProduct (index, row) {
      this.productList.splice(index, 1)
    },
    // handleselectedProduct (row) {
    //   if (this.productList.findIndex(x => x.id === row.id) !== -1) {
    //     this.$notify.error({ title: '错误', message: '该产品已选中' })
    //     return
    //   }
    //   this.productList.push({
    //     id: row.id,
    //     name: row.name,
    //     count: 1,
    //     price: row.price
    //   })
    // },
    handleselectedSKU (row) {
      // for (let i in row.skuList) {
      //   if (this.productList.findIndex(x => x.id === row.skuList[i].id)) {
      //     // alert('productListId: ' + this.productList[i].id)
      //     this.$notify.error({title: '错误', message: '选择重复的sku'})
      //     return
      //   }
      // }

      for (let sku in row.skuList) {
        this.productList.push({
          id: row.skuList[sku].id,
          name: row.productName,
          no: row.no,
          count: 1,
          amount: row.price,
          price: row.price * this.discount / 100,
          productId: row.skuList[sku].productId,
          propertyNames: row.skuList[sku].propertyNames
        })
      }
    }
  }
}
</script>

<style>

</style>
