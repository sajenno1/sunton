<template>
  <div>
    <el-dialog title="添加活动" :visible.sync="show" width="40%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="添加活动" name="first">
          <el-form :model="form" label-width="120px" style="padding-right:5%;">

            <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="活动类型">
            <el-select v-model="form.activityType" placeholder="请选择">
              <el-option
                v-for="item in activityTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            </el-form-item>
            <el-form-item label="中奖概率">
            <el-input v-model="form.rate"></el-input>
            </el-form-item>

            <el-form-item label="活动时间">
            <el-date-picker
              v-model="activityTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            </el-form-item>

            <el-form-item label="启用">
            <el-switch v-model="form.isActive">
            </el-switch>
            &nbsp;&nbsp;&nbsp;活动是否开启根据此按钮状态
            </el-form-item>
          
            <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="活动规则">
            <el-input v-model="form.ruleDescription" type="textarea"></el-input>
            </el-form-item>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="关联发行记录" name="second">
          <el-transfer v-model="form.issuerRecordIds" :data="issuerCodeRecords" :titles="['未绑定', '已绑定']"></el-transfer>
        </el-tab-pane>
      </el-tabs>    
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
  name: 'marketing-activity-add',
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      show: false,
      form: {
        issuerRecordIds: []
      },
      activityTime: [ null, null ],
      activityTypeList: [],
      issuerCodeRecords: [],
      activeName: 'first'
    }
  },
  methods: {
    open () {
      this.show = true
      this.getActivityTypeList()
      this.loadIssuerCodeRecords()
    },
    create () {
      this.form.startTime = this.activityTime[0]
      this.form.endTime = this.activityTime[1]
      this.$http.post(api.addActivity, this.form).then(res => {
        this.show = false
        this.$emit('getList')
        this.$notify.success({ title: '成功', message: '添加成功' })
      })
    },
    getActivityTypeList () {
      this.$http.post(api.activityTypeList).then(res => {
        this.activityTypeList = res.data
      })
    },
     // 加载发行记录
    loadIssuerCodeRecords () {
      var _this = this
      this.$http.post(api.loadIssureRecords).then(res => {
        _this.issuerCodeRecords = res.data
      })
    }
  }
}
</script>

<style>

</style>
