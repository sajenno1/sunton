<template>
  <div>
    <el-dialog title="添加经销商黑名单" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;" :label-width="formLabelWidth" >
        <el-form-item label="经销商名称">
          <el-select
            v-model="form.dealerId"
            filterable
            remote
            placeholder="请输入经销商名称"
            :remote-method="remoteMethod"
            :loading="loading"
            popper-class="dealerOptions-class"
            >
            <el-option
              v-for="item in dealerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.no }}</span>
              </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="原因" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
         <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.remark"></el-input>
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
  name: 'wechatexcellent-dealerblack-add',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      show: false,
      loading: false,
      timer: null,
      dealerOptions: []
    }
  },
  methods: {
    open () {
      this.form = {}
      this.show = true
    },
    create () {
      this.$confirm('确定要添加到黑名单吗？')
        .then(() => {
          this.$http.post(api.weChatExcellentAddDealerBlack, this.form).then(res => {
            this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
            this.$emit('getList')
            this.show = false
          })
        })
        .catch(() => {})
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        this.searchDealer(query, 500)()
      } else {
        this.dealerOptions = []
      }
    },
    searchDealer (query, time) {
      return () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$http.post(api.weChatExcellentGetDealerList, { name: query }).then(res => {
            this.loading = false
            this.dealerOptions = res.data.map(x => {
              return {
                label: x.name,
                value: x.id,
                no: x.no
              }
            })
          })
        }, time)
      }
    }
  }
}
</script>

<style>
.dealerOptions-class
{
  min-width: 300px;
}
</style>
