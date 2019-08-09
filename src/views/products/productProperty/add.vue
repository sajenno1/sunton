<template>
  <div>
    <el-dialog title="添加产品属性" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">

        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>

        <!--<el-form-item label="是否为销售属性" :label-width="formLabelWidth">
          <el-checkbox v-model="form.isSaleProp">是</el-checkbox>
        </el-form-item>-->

        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sort" auto-complete="off"></el-input>
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
  name: 'products-productProperty-add',
  data () {
    return {
      show: false,
      form: {},
      formLabelWidth: '120px'
    }
  },
  methods: {
    open () {
      this.form = {}
      this.show = true
    },
    create () {
      this.form.isSaleProp = true
      this.$http.post(api.addProductProperty, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
