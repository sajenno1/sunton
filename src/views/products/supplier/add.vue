<template>
  <div>
    <el-dialog title="添加供应商" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">
        <el-form-item label="供应商编码">
          <el-input v-model="form.no"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contactName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="form.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="2" v-model="form.memo"></el-input>
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
  name: 'products-supplier-add',
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open () {
      this.form = {}
      this.show = true
    },
    create () {
      this.$http.post(api.addSupplier, this.form).then(res => {
        this.$emit('getList')
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
