<template>
  <div>
    <el-dialog :visible.sync="show" append-to-body>
     <div id="app">
    <div class="skuChoose">
      <div class="title">
        <span>选择SKU</span>
      </div>
      <div class="filterBox clearfix">
        <el-input placeholder="请输入品名或货号" clearable v-model="searchKey"></el-input>
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
          <el-table ref="multipleTable" :data="skuList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="propertyNames" label="全选">
            </el-table-column>
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
      productList: [],
      skuList: [],
      searchKey: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      name: '',
      peoductId: '',
      no: '',
      multipleSelectSku: [],
      retData: {productName: '', productId: '', skuList: []}
    }
  },
  methods: {
    open () {
      // this.init()
      this.show = true
      if (!this.productList.length) {
        this.getList()
      }
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
      this.productId = val.id
      this.getSkuList(val.id)
      // alert(this.skuList[0].preopertyNames)
    },
    handleSelected (index, row) {
      this.$emit('selected', row)
      this.show = false
    },
    handleSelectionChange (index, row) {
      var data = {productName: '', productId: '', skuList: []}
      this.retData.productName = this.name
      this.retData.productId = this.productId
      this.retData.skuList = index

      console.log(index)
      data.productName = this.name
      data.skuList = index
      this.multipleSelectSku = index
      // this.$emit('selectedSku', data)
      // this.show = false
    },
    selectSkuItems () {
      this.$emit('selectedSku', this.retData)
      this.$refs.multipleTable.clearSelection()
      this.$notify.success({title: '成功', message: '添加成功，可继续添加'})
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
