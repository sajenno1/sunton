<template>
  <div>
    <el-dialog title="编辑广告" :visible.sync="show" width="40%">
      <el-form :model="form" label-width="120px" style="padding-right:5%;">

        <el-form-item label="名称">
          <el-input v-model="form.name" readonly></el-input>
        </el-form-item>

        <el-form-item label="位置代码">
          <el-input v-model="form.advertKey" readonly></el-input>
        </el-form-item>

        <el-form-item label="广告类型">
          <el-select v-model="form.advertType" placeholder="请选择类型">
            <el-option label="幻灯片" value="Slide"></el-option>
            <el-option label="图片" value="Banner"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="高">
          <el-input v-model="form.height"></el-input>
        </el-form-item>

        <el-form-item label="宽">
          <el-input v-model="form.width"></el-input>
        </el-form-item>

        <el-form-item label="轮播间隔">
          <el-input v-model="form.interval"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'basic-advert-edit',
  data () {
    return {
      show: false,
      form: {}
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.show = true
      this.getData(row.advertKey)
    },
    getData (advertKey) {
      this.$http.post(api.advertInfo, { advertKey: advertKey }).then(res => {
        this.form = res.data
      })
    },
    update () {
      this.$http.post(api.saveAdvert, this.form).then(res => {
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
