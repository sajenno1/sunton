<template>
  <div>
    <el-card>
      <div slot="header">
        <span>新闻列表</span>
      </div>

      <div>
        <el-button style="margin-bottom: 20px; float: right;" size="small" type="primary" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
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
            label="图片">
            <template slot-scope="scope">
              <img v-if="scope.row.picture" :src="scope.row.picture" :alt="scope.row.name" style="max-width: 64px; max-height: 64px;">
            </template>
          </el-table-column>

          <el-table-column
            label="新闻标题"
            prop="title">
          </el-table-column>

          <el-table-column
            label="新闻摘要"
            prop="summary">
          </el-table-column>

          <el-table-column
            label="新闻内容"
            prop="newsContent">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="是否有效"
            prop="vaildFlag">
          </el-table-column>

          <el-table-column
            label="操作"
            width="180">
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
        <news-add
          ref="add"
          @getList="getList"/>
        <news-edit
          ref="edit"
          @getList="getList"/>          
      </div>

    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import newsAdd from './add'
import newsEdit from './edit'
export default {
  name: 'wechatexcellent-news-list',
  components: { newsAdd, newsEdit },
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      list: []
    }
  },
  methods: {
    getList () {
      this.$http.post(api.weChatExcellentNewsList, {
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.rows
      })
    },
    openAddDialog () {
      this.$refs.add.open()
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该新闻吗？')
        .then(() => {
          console.log(row.id)
          this.$http.post(api.weChatExcellentNewsDelete, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    handleEdit (index, row) {
      this.show = true
      setTimeout(() => {
        this.$refs.edit.open(row)
      }, 500)
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
