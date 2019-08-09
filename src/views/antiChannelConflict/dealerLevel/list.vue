<template>
  <div>
    <el-card>
      <div slot="header">
        <span>经销商等级</span>
      </div>

      <div class="searchCon clearfix">
        <div>
          <el-input v-model="title" size="small" placeholder="请输入名称"></el-input>
          <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div style="margin-top:10px">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="dealerProductPriceReset">重置价格</el-button>
        </div>
        <!-- <div class="left">
          <el-input v-model="title" size="small" placeholder="请输入名称"></el-input>
          <el-button type="primary" size="small" @click="search" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="right">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
        </div> -->
      </div>

      <div class="table-container">
        <el-table
          :data="list"
          border
          stripe
          style="width: 100%">

          <el-table-column
            type="selection"
            width="48"
            align="center"
            >
          </el-table-column>

          <el-table-column
            label="等级编号"
            width="150"
            prop="code">
          </el-table-column>

          <el-table-column
            label="等级名称"
            width="160"
            prop="title">
          </el-table-column>

          <!-- <el-table-column
            label="上一等级"
            width="160"
            prop="parentLevelName">
          </el-table-column> -->

          <el-table-column
            width="130"
            label="讨货折扣">
            <template slot-scope="scope">
              <div>{{scope.row.discount}}%</div>
            </template>
          </el-table-column>

          <el-table-column
            label="等级值"
            width="160"
            prop="level">
          </el-table-column>

          <el-table-column
            label="创建时间"
            width="240"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

      <div>
        <antiChannelConflict-dealerlevel-add
          ref="add"
          @getList="getList" >
        </antiChannelConflict-dealerlevel-add>

        <anti-channel-conflict-dealerlevel-edit
          ref="edit"
          @getList="getList"
          v-if="show"
          @close="close">
        </anti-channel-conflict-dealerlevel-edit>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import antiChannelConflictDealerlevelAdd from './add'
import antiChannelConflictDealerlevelEdit from './edit'
export default {
  name: 'antiChannelConflict-dealerLevel-list',
  components: { antiChannelConflictDealerlevelAdd, antiChannelConflictDealerlevelEdit },
  data () {
    return {
      headers: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: [],
      show: true,
      title: ''
    }
  },
  methods: {
    getList () {
      this.$http.post(api.dealerLevelList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        title: this.title
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
    handleEdit (index, row) {
      this.show = true
      setTimeout(() => {
        this.$refs.edit.open(row)
      }, 500)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该经销商等级吗？')
        .then(() => {
          this.$http.post(api.delDealerLevel, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    close () {
      this.show = false
    },
    search () {
      this.currentPage = 1
      this.total = 0
      this.getList()
    },
    dealerProductPriceReset () {
      //
      if (!confirm('要重置价格吗')) return
      this.$http.post(api.DealerProductPriceReset, {}).then(res => {
        console.log(res.data)
      })
    }
  },
  mounted () {
    this.getList()
    this.headers['access-token'] = this.$store.state.account.access_token
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
.el-card__body .searchCon{
  height:65px;
}
</style>
