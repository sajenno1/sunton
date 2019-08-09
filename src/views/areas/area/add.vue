<template>
  <div>
    <el-dialog title="添加地区" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="地区代码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="邮政编码">
          <el-input v-model="form.zipCode"></el-input>
        </el-form-item>

        <el-form-item label="地区编码">
          <el-input v-model="form.areaCode"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'areas-area-add',
  data () {
    return {
      show: false,
      form: {},
      data: {}
    }
  },
  methods: {
    open (data) {
      this.data = data
      this.form = {
        parentId: data.id
      }
      this.show = true
    },
    create () {
      this.$http.post(api.addArea, this.form).then(res => {
        this.$emit('getList', this.data, 1)
        this.show = false
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    }
  }
}
</script>

<style>

</style>
