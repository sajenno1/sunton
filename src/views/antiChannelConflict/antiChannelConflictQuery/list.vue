<template>
  <div>
    <el-card>
      <div slot="header">
        <span>防窜查询列表</span>
      </div>

      <div class="toolbar">
        <div class="right">
          <el-input v-model="code" style="width: 200px;" size="small" placeholder="请输入防窜码"></el-input>

          <el-button type="primary" @click="getList" size="small" icon="el-icon-search">搜索</el-button>
        </div>
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          style="width: 100%;">

          <el-table-column
            label="防窜码"
            prop="code">
          </el-table-column>

          <el-table-column
            label="用户名"
            prop="userName">
          </el-table-column>

          <el-table-column
            label="用户的IP"
            prop="iP">
          </el-table-column>

          <el-table-column
            label="用户IP的地区"
            prop="iPLocation">
          </el-table-column>

          <el-table-column
            label="定位地区"
            prop="positioningLocation">
          </el-table-column>

          <el-table-column
            label="国家"
            prop="country">
          </el-table-column>

          <el-table-column
            label="省"
            prop="province">
          </el-table-column>

          <el-table-column
            label="市"
            prop="city">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiChannelConflict-antiChannelConflictQuery-list',
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      code: null
    }
  },
  methods: {
    getList () {
      this.$http.post(api.antiChannelConflictQueryList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        code: this.code
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 10px;
}
</style>

