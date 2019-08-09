<template>
  <div>
    <el-dialog title="编辑经销商等级" :visible.sync="show" width="40%" :before-close="close">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="等级编号" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="等级名称" :label-width="formLabelWidth">
         <!--:rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"-->
          <el-input v-model="form.title" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上一等级" :label-width="formLabelWidth">
          <el-select v-model="form.parentLevelId" placeholder="请选择上一等级">
            <el-option
              v-for="item in optionsDealerLevel"
              v-bind:key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="讨货折扣" :label-width="formLabelWidth">
          <el-input-number v-model="form.discount" controls-position="right" :min="0" size="small"></el-input-number> %
        </el-form-item>
        <el-form-item label="等级值" :label-width="formLabelWidth">
          <el-input-number v-model="form.level" controls-position="right" :min="1" size="small"></el-input-number>
        </el-form-item>
        <!--<el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" auto-complete="off" size="small"></el-input>
        </el-form-item>-->
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
  name: 'antiChannelConflict-dealerLevel-edit',
  data () {
    return {
      form: {},
      formLabelWidth: '120px',
      dialogCreatedFormVisible: false,
      show: false,
      optionsDealerLevel: [],
      dealerLevelCount: 0
    }
  },
  methods: {
    open (row) {
      this.form = {}
      this.getAllDealerLevel()
      this.getInfo(row.id)
    },
    close (done) {
      this.show = false
      this.$emit('close')
    },
    getAllDealerLevel () {
      this.$http.post(api.dealerLevelAllList).then(res => {
        this.optionsDealerLevel = res.data || []
        this.dealerLevelCount = res.data.length
      })
    },
    getInfo (id) {
      this.$http.post(api.dealerLevelInfo, { id: id }).then(res => {
        this.form = res.data
        // if (res.data.parentLevelId === '00000000-0000-0000-0000-000000000000') {
        //   this.form.parentLevelId = ''
        // }
        this.show = true
      })
    },
    update () {
      this.$http.post(api.editDealerLevel, this.form).then(res => {
        this.$notify({ title: '成功', message: '更新成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    }
  }
}
</script>

<style>

</style>
