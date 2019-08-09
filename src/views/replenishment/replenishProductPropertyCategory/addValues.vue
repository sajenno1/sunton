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
  name: 'replenishment-replenishProductPropertyCategory-addValues',
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
      this.$http.post(api.getReplenishProductPropertyList, { isSaleProp: this.isSaleProp }).then(res => {
        this.propertys = res.data
      })
    },
    create () {
      this.$http.post(api.relationReplenishPropertyValues, this.form).then(res => {
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
      return this.$http.post(api.replenishProductPropertyValueList, {
        propertyId: data,
        page: 1,
        pageSize: 1000
      }).then(res => {
        this.propertyValues = res.data.rows
      })
    },
    getProductValueIds (data) {
      this.$http.post(api.getReplenishProductPropertyValuesByRootValue, {
        id: this.form.categoryId,
        propertyId: data
      }).then(res => {
        this.form.productValueIds = res.data
      })
    }
  }
}
</script>

<style>

</style>
