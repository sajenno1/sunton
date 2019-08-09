<template>
  <div>
    <el-dialog title="添加经销商等级" :visible.sync="show" width="40%">
      <el-form :model="form" style="padding-right:5%;">
        <el-form-item label="等级编号" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="等级名称" :label-width="formLabelWidth" >
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
        <el-button type="primary" @click="create" size="medium" icon="el-icon-success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-dealerLevel-add',
  data () {
    return {
      form: {
        level: 1
      },
      formLabelWidth: '120px',
      show: false,
      optionsDealerLevel: [],
      dealerLevelCount: 0
    }
  },
  methods: {
    open () {
      this.form = {
        level: 1
      }
      // this.getAllDealerLevel()
      this.show = true
      this.getAddDealerLevelStart()
    },
    // getAllDealerLevel () {
    //   this.$http.post(api.dealerLevelAllList).then(res => {
    //     this.optionsDealerLevel = res.data || []
    //     this.dealerLevelCount = res.data.length
    //   })
    // },
    getAddDealerLevelStart () {
      this.$http.post(api.AddDealerLevelStart).then(res => {
        this.form.level = res.data.maxLevel + 1
      })
    },
    create () {
      this.$http.post(api.addDealerLevel, this.form).then(res => {
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
        this.$emit('getList')
        this.show = false
      })
    }
  }
}
</script>

<style>

</style>
