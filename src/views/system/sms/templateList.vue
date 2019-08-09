<template>
  <div>
    <el-dialog :visible.sync="show" width="70%">
      <el-card>
        <div slot="header">
          <span>短信模板</span>
        </div>
        <div>
          <el-button size="small" style="margin: 10px 20px; float: right;" type="primary" icon="el-icon-edit" @click="openAddDialog">添加</el-button>
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
              label="Code"
              prop="code">
            </el-table-column>

            <el-table-column
              label="TemplateCode"
              prop="templateCode">
            </el-table-column>

            <el-table-column
              label="SignName"
              prop="signName">
            </el-table-column>

            <el-table-column
              label="SmsContent"
              prop="smsContent">
            </el-table-column>

            <el-table-column
              label="创建时间"
              align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createDate | FormattersDateTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="180">
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
      </el-card>

      <div>
        <add-template
          ref="add"
          @getList="refresh"></add-template>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import * as api from '../../../api'
import addTemplate from './addTemplate'
export default {
  name: 'system-sms-templateList',
  components: { addTemplate },
  data () {
    return {
      show: false,
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      configId: ''
    }
  },
  methods: {
    open (row) {
      this.list = []
      this.configId = ''
      this.show = true
      this.configId = row.id
      this.getList(row.id)
    },
    getList (id) {
      this.$http.post(api.smsTemplateList, {
        configId: id,
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
    openAddDialog () {
      this.$refs.add.open(this.configId)
    },
    handleEdit (index, row) {

    },
    handleDelete (index, row) {

    },
    refresh () {
      this.getList(this.configId)
    }
  }
}
</script>

<style>

</style>
