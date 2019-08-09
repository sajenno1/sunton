<template>
  <div>
    <el-card>
      <div class="headerCon clearfix" slot="header">
        <span>支付配置</span>
        <el-button class="right" size="small" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
        
        <span style="display: inline-block; float: right;">
          <el-upload
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :headers="headers"
            :on-error="handleUploadError">
            <el-button size="small" type="primary">导入证书</el-button>
          </el-upload>
        </span>

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
            label="Partner"
            prop="partner">
          </el-table-column>

          <el-table-column
            label="AppId"
            prop="appId">
          </el-table-column>

          <el-table-column
            label="状态"
            prop="status">
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
      <add-config
        ref="add"
        @getList="getList">
      </add-config>

      <edit-config
        ref="edit"
        @getList="getList">
      </edit-config>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import addConfig from './addConfig'
import editConfig from './editConfig'
export default {
  name: 'system-payment-configList',
  components: { addConfig, editConfig },
  data () {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      uploadUrl: this.$http.defaults.baseURL + api.uploadPaymentCert,
      total: 0
    }
  },
  methods: {
    getList () {
      this.$http.post(api.paymentConfigList, {
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    handleUploadSuccess (res, file) {
      this.$notify.success({ title: '成功', message: '导入成功' })
      this.getList()
    },
    handleUploadError (err, file) {
      this.$notify.error({ title: `错误码:${err.status}`, message: err.message })
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
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该配置吗？').then(() => {
        this.$http.post(api.delPaymentConfig, { id: row.id }).then(res => {
          this.getList()
          this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
        })
      })
    },
    openAddDialog () {
      this.$refs.add.open()
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
