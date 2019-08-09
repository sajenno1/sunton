<template>
  <div>
    <el-card>
      <div slot="header">
        <span>计划任务</span>
      </div>
      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%">

          <el-table-column
            type="selection"
            width="55"
            align="center">
          </el-table-column>

          <el-table-column
            label="名称"
            prop="name">
          </el-table-column>

          <el-table-column
            label="Task的类型"
            prop="taskType">
          </el-table-column>

          <el-table-column
            label="执行间隔"
            prop="interval">
          </el-table-column>

          <el-table-column
            label="已执行次数"
            prop="executedCount" align="center">
          </el-table-column>

          <el-table-column
            label="是否激活" align="center">
            <template slot-scope="scope">
              <span>
                <el-tag type="success" v-if="scope.row.isActivated">是</el-tag>
                <el-tag type="danger" v-else>否</el-tag>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="发生错误是否继续" align="center" width="180">
            <template slot-scope="scope">
              <span>
                <el-tag type="success" v-if="scope.row.continueOnException">是</el-tag>
                <el-tag type="danger" v-else>否</el-tag>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            label="最后执行的开始时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastExecuteStartTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="最后执行的结束时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastExecuteEndTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="最后执行成功的时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastSuccessTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="下一次执行时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.nextExecuteTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="最后出现的错误"
            prop="lastErrorMessage">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <div>
      <edit-scheduling
        ref="edit"
        @getList="getList"/>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import editScheduling from './edit'
export default {
  name: 'system-scheduling-list',
  components: { editScheduling },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getList () {
      this.$http.post(api.scheduledTaskList).then(res => {
        this.list = res.data
      })
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style>

</style>
