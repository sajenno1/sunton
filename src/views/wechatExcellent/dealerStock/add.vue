<template>
  <div>
    <el-dialog title="添加经销商库存" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="经销商" :label-width="formLabelWidth"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
          <el-select
            size="small"
            v-model="form.dealer.id"
            popper-class="select-remote"
            filterable
            remote
            reserve-keyword
            placeholder="请输入经销商"
            :remote-method="remoteMethodDealer"
            :loading="loading">
            <el-option
              v-for="item in optionsDealer"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <div class="name">{{ item.name }}</div>
              <span class="sub">{{ item.areaName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
           <el-select
            size="small"
            v-model="form.product.id"
            popper-class="select-remote"
            filterable
            remote
            reserve-keyword
            placeholder="请输入商品名称"
            :remote-method="remoteMethodProduct"
            @change="changeProduct"
            :loading="loading">
            <el-option
              v-for="item in optionsProduct"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <div class="name">{{ item.name }}</div>
              <span class="sub">{{ item.no }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="Sku" :label-width="formLabelWidth">
          <el-select v-model="form.productSkuId" placeholder="请选择产品Sku">
            <el-option
              v-for="item in optionsProductSku"
              :key="item.id"
              :label="item.propertyNames"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="增加数量" :label-width="formLabelWidth">
          <el-input-number v-model="form.quantity" controls-position="right" :min="1" size="small"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="create" size="medium" icon="el-icon-success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'wechatExcellent-dealerStock-add',
  data () {
    return {
      form: {
        quantity: 1,
        dealer: {
          id: ''
        },
        product: {
          id: ''
        }
      },
      optionsDealer: [],
      optionsProduct: [],
      optionsProductSku: [],
      formLabelWidth: '120px',
      show: false,
      loading: false
    }
  },
  methods: {
    open () {
      this.show = true
    },
    remoteMethodDealer (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.$http.post(api.loadDealerList, { name: query }).then(res => {
            this.loading = false
            this.optionsDealer = res.data
          })
        }, 200)
      } else {
        this.optionsDealer = []
      }
    },
    remoteMethodProduct (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.$http.post(api.productList, { name: query, no: '', page: 1, pageSize: 1000 }).then(res => {
            this.loading = false
            this.optionsProduct = res.data.rows
          })
        }, 200)
      } else {
        this.optionsProduct = []
      }
    },
    changeProduct (data) {
      if (!data) {
        this.optionsProductSku.length = 0
        return
      }
      this.$http.post(api.productSkuList, { id: data }).then(res => {
        this.optionsProductSku = res.data
      })
    },
    create () {
      let data = {
        productSkuId: this.form.productSkuId,
        productId: this.form.product.id,
        dealerId: this.form.dealer.id,
        quantity: this.form.quantity
      }
      this.$http.post(api.dealerStockIncrease, data).then(res => {
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-remote li {
  line-height: normal;
  padding: 7px;
  height: 60px;
  border-bottom: 1px solid #eeeeee
}
.select-remote .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.select-remote   .sub {
  font-size: 12px;
  color: #b4b4b4;
}

.select-remote .highlighted .sub {
  color: #ddd;
}

</style>
