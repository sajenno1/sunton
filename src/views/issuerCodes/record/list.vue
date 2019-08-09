<template>
  <div>
    <el-card>
      <div slot="header">
        <span>发行记录</span>
      </div>
      <div>
        <el-input v-model="no" style="width: 200px; margin-bottom: 10px;" placeholder="请输入编号"></el-input>

        <el-date-picker
          v-model="issueDateTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="发行开始日期"
          end-placeholder="发行结束日期">
        </el-date-picker>

        <el-select v-model="isActived" clearable placeholder="是否激活">
          <el-option key="true" label="是" :value="true"></el-option>
          <el-option key="false" label="否" :value="false"></el-option>
        </el-select>

        <el-date-picker
          v-model="activeDateTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="激活开始日期"
          end-placeholder="激活结束日期"
          v-show="isActived">
        </el-date-picker>

        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>

        <el-button style="float: right;" type="primary" icon="el-icon-plus" @click="openAddDialog">添加</el-button>
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
            label="编号"
            prop="no">
          </el-table-column>

          <el-table-column
            label="数量"
            prop="count">
          </el-table-column>

          <el-table-column
            label="激活" align="center" width="120">
            <template slot-scope="scope">
              <span><el-tag :type="scope.row.isActived ? 'success' : 'danger'">{{ scope.row.isActived ? '已激活' : '未激活' }}</el-tag></span>
            </template>
          </el-table-column>

          <el-table-column
            label="描述"
            prop="description">
          </el-table-column>

          <el-table-column
            label="激活时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.activeDateTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="发行时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.issueDateTime | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | FormattersDateTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="是否启动验证" align="center" width="150">
            <template slot-scope="scope">
              <span><el-tag :type="scope.row.enableCaptcha ? 'true' : 'false'" @click.native="toggleStatus(scope.row)" >{{ scope.row.enableCaptcha ? '打开' : '关闭' }}</el-tag></span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center">
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
      <add-issuer-record
        ref="add"
        @getList="getList"/>

      <edit-issuer-record
        ref="edit"
        @getList="getList"/>
    </div>
  </div>
</template>

<script>
import * as api from '../../../api'
import addIssuerRecord from './add'
import editIssuerRecord from './edit'
export default {
  name: 'issuer-code-list',
  components: { addIssuerRecord, editIssuerRecord },
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      no: '',
      issueDateTime: [ null, null ],
      isActived: null,
      activeDateTime: [ null, null ]
    }
  },
  methods: {
    getList () {
      this.$http.post(api.issuerRecordList, {
        page: this.currentPage,
        pageSize: this.pageSize,
        no: this.no,
        issueDateTime1: this.issueDateTime[0],
        issueDateTime2: this.issueDateTime[1],
        isActived: this.isActived,
        activeDateTime1: this.activeDateTime[0],
        activeDateTime2: this.activeDateTime[1]
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
      this.$refs.add.open()
    },
    handleEdit (index, row) {
      this.$refs.edit.open(row)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该发行记录吗？').then(() => {
        this.$http.post(api.delIssuerRecord, { id: row.id }).then(res => {
          this.getList()
          this.$notify.success({ title: '成功', message: '删除成功' })
        })
      })
    },
    toggleStatus (row) {
      this.$confirm(row.enableCaptcha ? '确定禁用该账号的验证功能吗？' : '确定启用该账号验证功能吗？')
        .then(() => {
          row.enableCaptcha = !row.enableCaptcha
          this.$http.post(api.editIssuerRecord, row)
        })
        .catch(() => {})
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
