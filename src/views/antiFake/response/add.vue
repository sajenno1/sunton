<template>
  <div>
    <el-dialog title="添加防伪回复" :visible.sync="show" width="50%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设置回复" name="first">
          <el-form :model="form" label-width="120px" style="padding-right:5%;">

            <el-form-item label="正品回复">
              <el-input v-model="form.genuineMessage" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="假货回复">
              <el-input v-model="form.fakeMessage" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="默认">
              <el-switch
                v-model="form.isDefault">
              </el-switch>
              &nbsp;&nbsp;&nbsp;系统所有未关联的发行记录将默认使用本提示内容
            </el-form-item>

            <el-form-item label="销毁">
              <el-switch
                v-model="form.isDestroy">
              </el-switch>
              &nbsp;&nbsp;&nbsp;销毁后将提示假货回复
            </el-form-item>

            <el-form-item>
               <el-card style="padding-top: 10px;">
                <div>
                  <el-table
                  :data="form.antiFakeAnswers"
                  border
                  style="margin-top: 10px;">

                  <el-table-column
                    label="防伪开始次数"
                    width="200"
                    prop="startNum">
                  </el-table-column>

                  <el-table-column
                    label="防伪结束次数"
                    width="200"
                    prop="endNum">
                  </el-table-column>

                  <el-table-column
                    label="防伪回复"
                    width="200"
                    prop="answer">
                  </el-table-column>

                  <el-table-column
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="text" @click="answerDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                  </el-table-column>

                  </el-table>
                  <el-button type="text" @click="openAnswerDialog(-1)"><i class="el-icon-plus"></i>为特定防伪查询次数设置回复</el-button>
                  <el-dialog title="为特定防伪查询次数设置回复" :visible.sync="showAnswer" width="40%" append-to-body>
                    <div>
                      <el-form label-width="120px" :model="answers" style="padding-right:5%;">
                        
                        <el-form-item label="防伪开始次数">
                          <el-input v-model="answers.startNum" type="textarea"></el-input>
                        </el-form-item>

                        <el-form-item label="防伪结束次数">
                          <el-input v-model="answers.endNum" type="textarea"></el-input>
                        </el-form-item>

                        <el-form-item label="防伪回复">
                          <el-input v-model="answers.answer" type="textarea"></el-input>
                        </el-form-item>

                      </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="showAnswer = false">取 消</el-button>
                      <el-button type="primary" @click="confirm">确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
               </el-card>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="关联发行记录" name="second">
          <el-transfer v-model="form.issuerRecordIds" :data="issuerCodeRecords" :titles="['未绑定', '已绑定']"></el-transfer>
        </el-tab-pane>
      </el-tabs>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="create" size="medium" icon="el-icon-success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '../../../api'
export default {
  name: 'antiFake-response-add',
  data () {
    return {
      show: false,
      showAnswer: false,
      form: {
        issuerRecordIds: [],
        antiFakeAnswers: []
      },
      data: {},
      // 发行记录
      issuerCodeRecords: [],
      answers: [],
      antiFakeAnswers: [],
      activeName: 'first'
    }
  },
  methods: {
    open () {
      this.show = true
      this.loadIssuerCodeRecords()
    },
    create () {
      this.$http.post(api.addAntiFakeResponse, this.form).then(res => {
        this.$emit('getList', this.data, 1)
        this.show = false
        this.form = {}
        this.$notify({ title: '成功', message: '添加成功！', type: 'success' })
      })
    },
    confirm () {
      if (this.selectedIndex === -1) {
        var item = {
          startNum: this.answers.startNum,
          endNum: this.answers.endNum,
          answer: this.answers.answer
        }
        this.form.antiFakeAnswers.push(item)
        this.showAnswer = false
        this.answers = []
        return
      }
      this.showAnswer = false
    },
    openAnswerDialog (index) {
      this.selectedIndex = -1
      this.showAnswer = true
      if (index >= 0) {
        this.selectedIndex = index
      }
    },
    answerDelete (index, rows) {
      this.form.antiFakeAnswers.splice(index, 1)
    },
    // 加载发行记录
    loadIssuerCodeRecords () {
      var _this = this
      this.$http.post(api.loadUnRelationshipIssuerRecords).then(res => {
        _this.issuerCodeRecords = res.data
      })
    }
  }
}
</script>

<style>

</style>
