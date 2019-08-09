<template>
  <div>
    <el-dialog title="编辑销售会员" :visible.sync="show" width="40%" :before-close="close">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="销售会员名" :label-width="formLabelWidth">
          <el-input v-model="form.sellerName" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.sellerMobile" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="form.sellerSex" label="男">男</el-radio>
            <el-radio v-model="form.sellerSex" label="女">女</el-radio>
        </el-form-item>
       <el-form-item label="销售点" :label-width="formLabelWidth">
          <el-select
            v-model="form.posId"
            filterable
            remote
            placeholder="请输入销售点名称"
            :remote-method="remoteMethod"
            :loading="loading"
            @change="selected">
            <el-option
              v-for="item in posOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="update" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'sales-posSeller-edit',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      loading: false,
      timer: null,
      show: false,
      list: [],
      posOptions: []
    }
  },
  methods: {
    open (id) {
      this.form = {}
      this.getInfo(id)
    },
    close (done) {
      this.show = false
      this.$emit('close')
    },
    getInfo (id) {
      this.$http.post(api.possellerInfo, { id: id }).then(res => {
        this.form = res.data
        this.form.posId = res.data.posName
        this.show = true
      })
    },
    update () {
      this.$http.post(api.editPOSSeller, this.form).then(res => {
        this.$notify({ title: '成功', message: '编辑成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.searchPOS(query, 500)()
      } else {
        this.posOptions = []
      }
    },
    searchPOS (query, time) {
      return () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$http.post(api.posNameList, { name: query }).then(res => {
            this.loading = false
            this.posOptions = res.data.map(x => {
              return {
                label: x.name,
                value: x.id
              }
            })
          })
        }, time)
      }
    },
    selected () {
      console.log(this.form.posId)
    }
  }
}
</script>

<style>

</style>
