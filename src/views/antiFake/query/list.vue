<template>
  <div>
    <el-card>
      <div slot="header">
        <span>防伪查询列表</span>
      </div>
      <div class="searchCon clearfix">
        <el-input v-model="areaName" size="small" placeholder="请输入地区名称"></el-input>

        <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
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
            label="发行代码"
            prop="code">
          </el-table-column>

          <el-table-column
            label="IP"
            prop="ip">
          </el-table-column>

          <el-table-column
            label="IP归属"
            prop="ipLocation">
          </el-table-column>

          <el-table-column
            label="地理位置"
            prop="positioningLocation">
          </el-table-column>

          <el-table-column
            label="省份"
            prop="province">
          </el-table-column>

          <el-table-column
            label="城市"
            prop="city">
          </el-table-column>

          <el-table-column
            label="国家"
            prop="country">
          </el-table-column>

          <el-table-column
            label="地区"
            prop="areaName">
          </el-table-column>

          <el-table-column
            label="昵称"
            prop="nickName">
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
  name: 'antiFake-query-list',
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      areaName: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.antiFakeQueryList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        areaName: this.areaName
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
.page-container {
  margin-top: 10px;
}
.table-container {
  margin-top: 10px;
}
</style>
