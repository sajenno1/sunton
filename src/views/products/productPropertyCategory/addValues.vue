<template>
  <div>
    <el-dialog title="添加关联属性值" :visible.sync="show" width="40%" append-to-body>
      <el-form :model="form" style="padding-right:5%;">

       <el-form-item label="产品属性" :label-width="formLabelWidth">
          <el-select v-model="propertyId" @change="onChange">
            <el-option
              v-for="item in propertys"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="产品属性" :label-width="formLabelWidth">
          <el-select
            v-model="form.propertyId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入产品属性"
            @change="getPropertyValues"
            :remote-method="remoteMethod"
            :loading="loading" 
            size="small"
            >
            <el-option
              v-for="item in propertys"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="产品属性值" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.productValueIds">
            <el-checkbox v-for="item in propertyValues" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'products-productPropertyCategory-addValues',
  data () {
    return {
      show: false,
      form: {},
      propertys: [],
      formLabelWidth: '120px',
      propertyId: '',
      propertyValues: [],
      isSaleProp: true
    }
  },
  methods: {
    open (row, isSaleProp) {
      this.form = {
        categoryId: row.id,
        productValueIds: []
      }
      this.propertyId = ''
      this.propertyValues = []
      this.propertys = []
      this.isSaleProp = isSaleProp
      this.show = true
      this.getPropertys()
    },
    getPropertys () {
      this.$http.post(api.getProductPropertyList, { isSaleProp: this.isSaleProp }).then(res => {
        this.propertys = res.data
      })
    },
    create () {
      this.$http.post(api.relationPropertyValues, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功', type: 'success' })
      })
    },
    onChange (data) {
      this.getPropertyValues(data).then(() => {
        this.getProductValueIds(data)
      })
    },
    getPropertyValues (data) {
      return this.$http.post(api.productPropertyValueList, {
        propertyId: data,
        page: 1,
        pageSize: 1000
      }).then(res => {
        this.propertyValues = res.data.rows
        this.form.productValueIds = res.data.rows.map(x => x.id)
      })
    },
    getProductValueIds (data) {
      this.$http.post(api.getProductPropertyValuesByRootValue, {
        id: this.form.categoryId,
        propertyId: data
      }).then(res => {
        if (res.data.length > 0) {
          this.form.productValueIds = res.data
        }
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.searchPropertyList(query, 500)()
      } else {
        this.propertys = []
      }
    },
    searchPropertyList (query, time) {
      return () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$http.post(api.getProductPropertyList, {
            isSaleProp: this.isSaleProp,
            name: query
          }).then(res => {
            this.loading = false
            this.propertys = res.data
          })
        }, time)
      }
    }
  }
}
</script>

<style>

</style>
