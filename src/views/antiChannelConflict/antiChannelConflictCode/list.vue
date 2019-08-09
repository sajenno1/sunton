<template>
  <div>
    <el-card>
      <div slot="header">
        <span>防窜码</span>
      </div>

      <div class="toolbar">
        <div class="right">
          <el-input v-model="code" style="width: 200px;" size="small" placeholder="请输入防窜码"></el-input>

          <el-select v-model="label" size="small" clearable placeholder="请选择标签类型">
            <el-option label="大标" value="Large"></el-option>
            <el-option label="中标" value="Middle"></el-option>
            <el-option label="小标" value="Small"></el-option>
            <el-option label="散标" value="Alone"></el-option>
            <el-option label="废标" value="Discard"></el-option>
          </el-select>

          <el-select v-model="used" size="small" clearable placeholder="是否使用">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>

          <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
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
            label="防窜码"
            prop="code">
          </el-table-column>

          <el-table-column
            label="父级代码"
            prop="parentCodes">
          </el-table-column>

          <el-table-column
            label="地区"
            prop="areaName">
          </el-table-column>

          <el-table-column
            label="是否已使用"
            prop="used">
          </el-table-column>

          <el-table-column
            label="标签类型"
            prop="label">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
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
  name: 'antiChannelConflict-antiChannelConflictCode-list',
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      code: null,
      label: null,
      used: null
    }
  },
  methods: {
    getList () {
      this.$http.post(api.antiChannelConflictCodeList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        code: this.code,
        label: this.label,
        used: this.used
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
    },
    search () {
      this.currentPage = 1
      this.total = 0
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

