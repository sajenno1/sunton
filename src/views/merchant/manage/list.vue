<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="createdVisible = !createdVisible">开通商户</el-button>

    <div class="table-container">
      <el-table
        :data="list"
        border
        style="width: 100%">

        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>

        <el-table-column
          label="公众号AppId"
          prop="merchantAppId">
        </el-table-column>

        <el-table-column
          label="AppId"
          prop="appId">
        </el-table-column>

        <el-table-column
          label="AppSecret"
          prop="appSecret">
        </el-table-column>

        <el-table-column
          label="商户余额"
          prop="balance">
        </el-table-column>

        <el-table-column
          label="状态"
          prop="status">
          <!-- <template slot-scope="scope">
            <el-tag :type="scope.row.IsActive ? 'success' : 'danger'" @click.native="toggleStatus(scope.row)">
              {{ scope.row.IsActive ? '启用' : '禁用'}}
            </el-tag>
          </template> -->
        </el-table-column>

        <el-table-column
          label="创建时间"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createDate | FormattersDateTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="hendledetail(scope.row)">详情</el-button>
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
      <el-dialog title="开通商户" :visible.sync="createdVisible" width="40%">
        <el-form :model="createdFrom" style="padding-right:5%;">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="createdFrom.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="公众号AppId" :label-width="formLabelWidth">
            <el-input v-model="createdFrom.merchantAppId" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createdVisible = false">取 消</el-button>
          <el-button type="primary" @click="createdMerchant">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑商户" :visible.sync="updatedVisible" width="40%">
        <el-form :model="updatedForm" style="padding-right:5%;">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="updatedForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="公众号AppId" :label-width="formLabelWidth">
            <el-input v-model="updatedForm.merchantAppId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="updatedForm.status" placeholder="请选择状态">
              <el-option key="Approved" label="已审核" value="Approved"></el-option>
              <el-option key="Freeze" label="冻结" value="Freeze"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updatedVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatedMerchant">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="商户详情" :visible.sync="showDetali" width="40%">
        <div class="text item">{{'名称：' + merchantDetail.name}}</div>
        <div class="text item">{{'商户AppId：' + merchantDetail.merchantAppId}}</div>
        <div class="text item">{{'AppId：' + merchantDetail.appId}}</div>
        <div class="text item">{{'AppSecret：' + merchantDetail.appSecret}}</div>
        <div class="text item">{{'余额：' + merchantDetail.balance}}</div>
        <div class="text item">{{'状态：' + merchantDetail.status}}</div>
        <div class="text item">创建时间：{{ merchantDetail.createDate | FormattersDateTime }}</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showDetali = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'merchant-manage-list',
  data () {
    return {
      list: [],
      formLabelWidth: '120px',
      createdVisible: false,
      updatedVisible: false,
      createdFrom: {},
      updatedForm: {},
      merchantDetail: {},
      showDetali: false,
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    getList () {
      return this.$http.post(api.merchantList, {
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
      this.$http.post(api.merchantInfo, { id: row.id }).then(res => {
        this.updatedForm = res.data
        this.updatedVisible = true
      })
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商户吗？')
        .then(() => {
          this.$http.post(api.delMerchant, { id: row.id }).then(res => {
            this.getList()
            this.$notify({ title: '成功', message: '删除成功！', type: 'success' })
          })
        })
        .catch(() => {})
    },
    createdMerchant () {
      this.$http.post(api.addMerchant, this.createdFrom).then(res => {
        this.getList()
        this.createdVisible = false
        this.$notify({ title: '成功', message: '开通成功！', type: 'success' })
      })
    },
    updatedMerchant () {
      this.$http.post(api.editMerchant, this.updatedForm).then(res => {
        this.getList()
        this.$notify({ title: '成功', message: '保存成功！', type: 'success' })
        this.updatedVisible = false
      })
    },
    toggleStatus (merchant) {
      this.$confirm(merchant.IsActive ? '确定禁用该商户吗？' : '确定启用该商户吗？')
        .then(_ => {
          this.$http.post('/sd', { Id: merchant.Id, Status: !merchant.IsActive }).then(res => {
            merchant.IsActive = !merchant.IsActive
          })
        })
        .catch(_ => {})
    },
    hendledetail (row) {
      this.$http.post(api.merchantInfo, { id: row.id }).then(res => {
        this.merchantDetail = res.data
        this.showDetali = true
      })
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
