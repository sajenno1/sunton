<template>
  <div>
    <el-card>
      <div slot="header">
        <span>发行码列表</span>
      </div>
      <div class="searchCon">
        <el-input v-model="issuerRecordId" readonly placeholder="请选择发行记录" @click.native="openIssuerRecord"></el-input>
        <el-input v-model="code" placeholder="请输入发行码"></el-input>
        <el-input v-model="assistCode" placeholder="请输入辅助码"></el-input>
        
        <el-select v-model="isActived" clearable placeholder="是否激活">
          <el-option key="true" label="是" value="true"></el-option>
          <el-option key="false" label="否" value="false"></el-option>
        </el-select>

        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
            label="辅助码"
            prop="assistCode">
          </el-table-column>

          <el-table-column
            label="父级代码"
            prop="parentCode">
          </el-table-column>

          <el-table-column
            label="防伪查询次数"
            prop="antiFakeQueryCount">
          </el-table-column>

          <el-table-column
            label="未激活扫描查询次数"
            prop="unactiveScanQueryCount">
          </el-table-column>

          <el-table-column
            label="防窜查询次数"
            prop="antiChannelConflictQueryCount">
          </el-table-column>

          <el-table-column
            label="激活" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.isActived }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="最后查询时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.lastQueryDateTime | FormattersDateTime }}</span>
            </template>
          </el-table-column> -->

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
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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

    <div>
      <issuer-code-selected
        ref="selected"
        @selected="setIssuerRecordId">
      </issuer-code-selected>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import issuerCodeSelected from './selected'
export default {
  name: 'issuer-code-list',
  components: { issuerCodeSelected },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      assistCode: '',
      isActived: null,
      code: '',
      issuerRecordId: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.issuerCodeList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        assistCode: this.assistCode,
        isActived: this.isActived,
        code: this.code,
        issuerRecordId: this.issuerRecordId
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
    setIssuerRecordId (id) {
      this.issuerRecordId = id
    },
    openIssuerRecord () {
      this.$refs.selected.open()
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
