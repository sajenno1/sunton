/* eslint-disable no-array-constructor */
<template>
  <div>
    <el-card>
      <div slot="header">
        <span>产品列表</span>
      </div>
      <div class="searchCon clearfix">
        <div>
          <el-input v-model="name" placeholder="请输入名称"></el-input>
          <el-input v-model="no" placeholder="请输入编号"></el-input>
          <el-select v-model="deliveryTemplateId" placeholder="请选择运费模板">
            <el-option v-for="item in deliveryTemplateList" v-bind:key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div style="padding-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="openCreate">添加</el-button>
          <el-button style="margin-left: 5px;" size="small" type="danger" icon="el-icon-delete"
            @click="batchDeleteItems">批量删除</el-button>

          <span style="display: inline-block;">
            <el-upload :action="uploadUrl" :show-file-list="false" :on-success="handleUploadSuccess" :headers="headers"
              :on-error="handleUploadError">
              <el-button size="small" type="primary">导入</el-button>
            </el-upload>
          </span>
          <el-button style="margin-left: 0px;" type="primary" size="small" @click="openUpdateDelivery">修改运费模板
          </el-button>

          <el-button size="small" type="primary" icon="el-icon-download" @click="exportExcel">导出</el-button>

        </div>

      </div>
      <div class="table-container">
        <el-table :data="list" border style="width: 100%" v-on:selection-change="handleSelectionChange">

          <el-table-column type="selection" width="40" align="center">
          </el-table-column>

          <el-table-column width="130" label="产品">
            <template slot-scope="scope">
              <div>
                <img v-if="scope.row.photo" :src="scope.row.photo" style="max-width: 64px; max-height: 64px;">
              </div>
              <div> {{scope.row.no}} </div>
            </template>
          </el-table-column>

          <!-- <el-table-column
            width="120"
            label="产品二维码">
            <template slot-scope="scope">
              <div>
                <qrcode-vue
                  :value="'http://' + delWword() + '/MallWeb/Product/Detail?id=' + scope.row.id"
                  :size="QRCodeSize"
                  level="H">
                </qrcode-vue>
              </div>
            </template>
          </el-table-column> -->

          <!-- <el-table-column
            label="品牌"
            :alt="scope.row.name"
            prop="brandName">
          </el-table-column> -->

          <!--<el-table-column
            label="编号"
            prop="no">
          </el-table-column>-->

          <el-table-column label="名称" prop="name">
          </el-table-column>

          <el-table-column label="规格" prop="specification">
          </el-table-column>

          <el-table-column width="60" label="单位" prop="unit" align="center">
          </el-table-column>

          <!-- <el-table-column
            label="规格"
            prop="specification" width="90" align="center">
          </el-table-column> -->

          <el-table-column label="价格" width="70">
            <template slot-scope="scope">
              <div class="alignRight fontRed">
                <span>{{ scope.row.price | UnsignedCurrency }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="消费的积分" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.customeIntegral }}</span>
              </div>
            </template>
          </el-table-column> -->

          <!-- <el-table-column
            label="会员获得积分" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.rewardIntegral }}</span>
              </div>
            </template>
          </el-table-column> -->

          <!-- <el-table-column
            label="销售员获得积分" width="120" align="center">
            <template slot-scope="scope">
              <div class="alignRight">
                <span>{{ scope.row.sellRewardIntegral }}</span>
              </div>
            </template>
          </el-table-column> -->

          <!-- <el-table-column
            label="防窜库存"
            prop="scanQuota" align="center">
          </el-table-column> -->

          <el-table-column label="推荐首页" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.isPropelling? '是' : '否'}}</span>
            </template>
          </el-table-column>


          <!--deliveryTemplateName-->
          <!--ProductDeliveryTemplateNames-->
          <el-table-column prop="deliveryTemplateName" label="运费模板" width="120px" align="center"></el-table-column>
          <!-- <el-table-column
            label="运费模板"
            width="120px"
            align="center">
            <template slot-scope="scope">
              <div v-html="scope.row.productDeliveryTemplateNames.join('<br/>')"></div>
            </template>
          </el-table-column> -->

          <el-table-column label="状态" width="80px" align="center">
            <template slot-scope="scope">
              <div>{{getProductStatus(scope.row.productStatus)}}</div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" align="center" width="130px">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDate }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handlePrice(scope.$index, scope.row)">价格</el-button>
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handlePullOff(scope.$index, scope.row)"
                v-if="scope.row.productStatus === 'PutOn'">下架</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handlePutOn(scope.$index, scope.row)"
                v-else>上架</el-button> -->

              <el-dropdown>
                <el-button type="text" class='more' style="margin-left:10px">...</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-on:click.native="handleDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item v-on:click.native="handlePullOff(scope.$index, scope.row)"
                    v-if="scope.row.productStatus === 'PutOn'">下架</el-dropdown-item>
                  <el-dropdown-item v-on:click.native="handlePutOn(scope.$index, scope.row)" v-else>上架
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="handleQRCode(scope.$index, scope.row)">二维码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-container" v-if="total > pageSize">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 50, 100, 1000, 10000]" layout="prev, pager, next, sizes, total" :total="total">
        </el-pagination>
      </div>

      <div>
        <product-add ref="add" @getList="getList">
        </product-add>

        <product-edit ref="edit" @getList="getList">
        </product-edit>

        <product-dealerLevelPrice ref="dealerLevelPrice" @getList="getList">
        </product-dealerLevelPrice>

        <sku-list ref="sku" />
      </div>
    </el-card>

    <el-dialog
      :visible.sync="bShowQRCode"
      :width="QRCodeSize + 40 + 'px'"
      title="二维码">
      <template>
        <div :style="{height: QRCodeSize + 'px'}">
          <qrcode-vue
            :value="'http://' + delWword() + '/MallWeb/Product/Detail?id=' + QRCodeId"
            :size="QRCodeSize"
            level="H">
          </qrcode-vue>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-bind:visible.sync="bShowUpdateDelivery" width="30%" title="批量修改运费模板">
      <ul class="ulUpdateDelivery">
        <li>
          <el-select v-model="updateDeliveryId" placeholder="请选择运费模板">
            <el-option v-for="item in deliveryTemplateList" v-bind:key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-button size="small" type="primary" @click="batchUpdateProductDelivery">修改选中项</el-button>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
  import * as api from '../../../api'
  import productAdd from './add'
  import productEdit from './edit'
  import skuList from './sku'
  import productDealerLevelPrice from './dealerLevelPrice'
  import QrcodeVue from 'qrcode.vue'
  import XLSX from 'xlsx'

  export default {
    name: 'products-brand-list',
    components: {
      productAdd,
      productEdit,
      skuList,
      productDealerLevelPrice,
      QrcodeVue
    },
    data () {
      return {
        list: [],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        name: '',
        no: '',
        uploadUrl: this.$http.defaults.baseURL + api.importProducts,
        headers: {},
        selectedItems: [],
        deliveryTemplateId: null,
        updateDeliveryId: null,
        // --UpdateDelivery
        deliveryTemplateList: [],
        bShowUpdateDelivery: false,
        // --
        // --QRCode
        QRCodeSize: 200,
        QRCodeId: '',
        bShowQRCode: false
        // --
      }
    },
    methods: {
      handleQRCode (index, row) {
        this.QRCodeId = row.id
        this.bShowQRCode = true
      },
      exportExcel () {
        this.$message('正在请求,请稍后......')
        this.$http.post(api.productListAll, {
          name: this.name,
          no: this.no,
          deliveryTemplateId: this.deliveryTemplateId
        }).then(res => {
          // 由于js是单线程的，所以当前端需要处理的数据过大的时候，会造成卡顿
          let aoa = []
          let cols = ['no', 'name', 'specification', 'unit', 'price']
          aoa.push(['产品', '名称', '规格', '单位', '价格', '产品二维码'])
          let arr = res.data
          for (let i in arr) {
            let o = arr[i]
            let a = []
            for (let i in cols) {
              a.push(o[cols[i]])
            }
            a.push('http://' + this.delWword() + '/MallWeb/Product/Detail?id=' + o['id'])
            aoa.push(a)
          }
          let wb = XLSX.utils.book_new()
          let ws = XLSX.utils.aoa_to_sheet(aoa)
          // 导出的excel的列宽
          ws['!cols'] = [{
            wpx: 60
          }, {
            wpx: 120
          }, {
            wpx: 60
          }, {
            wpx: 60
          }, {
            wpx: 60
          }, {
            wpx: 500
          }]
          XLSX.utils.book_append_sheet(wb, ws, 'products')
          XLSX.writeFile(wb, 'products.xlsx')
        })
      },
      delWword () {
        var domain = document.domain.split('.')
        return `${domain[0].substr(0, domain[0].length - 1)}.${domain.splice(1).join('.')}`
      },
      getList () {
        this.$http.post(api.productList, {
          page: this.currentPage,
          pageSize: this.pageSize,
          name: this.name,
          no: this.no,
          deliveryTemplateId: this.deliveryTemplateId
        }).then(res => {
          this.list = res.data.rows
          this.total = res.data.total
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.currentPage = 1
        this.getList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getList()
      },
      handleEdit (index, row) {
        this.$refs.edit.open(row.id)
      },
      handleDelete (index, row) {
        this.$confirm('确定删除该商品吗？')
          .then(() => {
            this.$http.post(api.delProduct, {
              id: row.id
            }).then(res => {
              this.getList()
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              })
            })
          })
          .catch(() => {})
      },
      openCreate () {
        this.$refs.add.open()
      },
      handlePrice (index, row) {
        this.$refs.dealerLevelPrice.open(row)
      },
      handleSku (index, row) {
        this.$refs.sku.open(row)
      },
      handlePullOff (index, row) {
        this.$http.post(api.editProductStatus, {
          id: row.id,
          productStatus: 'PullOff'
        }).then(res => {
          this.$notify.success({
            title: '成功',
            message: '下架成功'
          })
          row.productStatus = 'PullOff'
        })
      },
      handlePutOn (index, row) {
        this.$http.post(api.editProductStatus, {
          id: row.id,
          productStatus: 'PutOn'
        }).then(res => {
          this.$notify.success({
            title: '成功',
            message: '上架成功'
          })
          row.productStatus = 'PutOn'
        })
      },
      getProductStatus (status) {
        switch (status) {
          case 'PutOn':
            return '已上架'
          case 'PutOff':
            return '已下架'
        }
        return ''
      },
      handleUploadError (err, file) {
        this.$notify.error({
          title: `错误码:${err.status}`,
          message: err.message
        })
      },
      handleUploadSuccess (res, file) {
        this.$notify.success({
          title: '成功',
          message: '导入成功'
        })
        this.getList()
      },
      handleSelectionChange (selectedItems) {
        this.selectedItems = selectedItems
      },
      batchDeleteItems () {
        if (this.selectedItems.length === 0) {
          this.$notify({
            title: '错误',
            message: '请先选择操作项！',
            type: 'error'
          })
          return
        }
        this.$confirm('确定要删除 吗?', '提示').then(() => {
          var sIds = this.selectedItems.map(function (item) {
            return item.id
          })
          this.$http.post(api.batchRemoveProduct, sIds).then(response => {
            if (response.status === 200) {
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              })
              this.getList()
            } else {
              this.$notify({
                title: '失败',
                message: response.message,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
      },
      search () {
        this.currentPage = 1
        this.total = 0
        this.getList()
      },
      //
      getDeliveryTemplateList () {
        this.$http.post(api.deliveryTemplateList, {
          page: 1,
          pageSize: 1000
        }).then(res => {
          this.deliveryTemplateList = res.data.rows
        })
      },
      openUpdateDelivery () {
        this.bShowUpdateDelivery = true
      },
      batchUpdateProductDelivery () {
        if (this.selectedItems.length === 0) {
          this.$notify({
            title: '错误',
            message: '请先选择操作项！',
            type: 'error'
          })
          return
        }
        if (this.updateDeliveryId === null) {
          this.$notify({
            title: '错误',
            message: '请先选择修改的运费模板！',
            type: 'error'
          })
          return
        }
        this.$confirm('确定要修改所选的产品的运费模板 吗?', '提示').then(() => {
          var sIds = this.selectedItems.map(function (item) {
            return item.id
          })
          this.$http.post(api.batchUpdateProductDelivery, {
            deliveryTemplateId: this.updateDeliveryId,
            productIds: sIds
          }).then(response => {
            if (response.status === 200) {
              this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success'
              })
              this.getList()
              this.bShowUpdateDelivery = false
            } else {
              this.$notify({
                title: '失败',
                message: response.message,
                type: 'error'
              })
            }
          })
        }).catch(() => {})
      }
      //
    },
    mounted () {
      this.getList()
      this.getDeliveryTemplateList()
      this.headers['access-token'] = this.$store.state.account.access_token
    }
  }
</script>

<style>
  .ulUpdateDelivery {
    padding: 0 2px;
  }

  .ulUpdateDelivery li {
    padding: 10px 10px;
    list-style-type: none;
  }

</style>

<style lang="scss" scoped>
  .page-container {
    margin-top: 10px;
  }

  .table-container {
    margin-top: 10px;
  }

  .el-card__body .searchCon {
    height: 63px;
  }

</style>
