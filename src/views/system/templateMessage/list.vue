<template>
  <div>
    <el-card>
      <div slot="header">
        <span>消息模板</span>
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
            label="模板编号唯一ID"
            prop="uniqueId">
          </el-table-column>

          <el-table-column
            label="模板ID"
            prop="templateId"
            width="500">
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            width="220">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120" align="center">
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

      <div class="page-container" v-if="total > pageSize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, sizes, total"
          :total="total">
        </el-pagination>
      </div>

      <div>
        <edit-template-message ref="edit" @getList="getList"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as api from '../../../api'
import editTemplateMessage from './edit'
export default {
  name: 'system-templateMessage-list',
  components: { editTemplateMessage },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    getList () {
      this.$http.post(api.templateMessageList, {
        page: this.currentPage,
        pageSize: this.pageSize
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
