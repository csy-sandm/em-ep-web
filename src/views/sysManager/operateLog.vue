<template>
	<div class="box-container">
		<!-- 标题 -->
		<el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0px 15px 0px 15px;background:#F3F3F3;font-weight: bold;">
			<el-tab-pane label="操作日志" name="first"></el-tab-pane>
		</el-tabs>

		<div class="content-info" v-if="activeName === 'first'">
		<!-- 查询区域 -->
		<el-row style="margin-top: 20px;">
			<el-col class="grid" style="width:50%;float:left">
				<!-- 输入框 -->
				<el-form ref="form" label-width="120px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="6" class="grid">
						<el-form-item label="日志ID:" style="width: 300px"  >
							<el-input v-model="queryParam.logId" placeholder="请输入日志ID"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>

			<el-col :span="22" class="grid" style="width:50%;float:left;text-align: right">
				<!-- 按钮 -->
				<el-button
						class="add-button"
						type="primary"
						@click="addData()"
						icon="el-icon-circle-plus-outline"
						size="mini" >新增</el-button>
				<el-button
						class="serach-button"
						type="primary"
						@click="getDataList()"
						icon="el-icon-search"
						size="mini" >查询</el-button>
				<el-button
						class="refresh-button"
						type="primary"
						@click="resetForm()"
						icon="el-icon-refresh"
						size="mini" >重置</el-button>
				<el-button
						class="export-button"
						type="primary"
						@click="exportExecl()"
						icon="el-icon-download"
						size="mini" >导出</el-button>
			</el-col>
		</el-row>

		<!-- 表格 -->
		<el-table
				:data="dataList"
				style="width: 100%"
				:header-cell-style="{color:'#313E5D',background:'#C3D2E6',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px'}"
				ref="multipleTable"
				tooltip-effect="dark">
			<el-table-column label="序号" type="index" width="80px" align="center">
				<template slot-scope="scope">
					<span>{{ (page - 1) * size + scope.$index + 1 }}</span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logId" label="日志ID"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logType" label="日志类别"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logOperateType" label="操作类型"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logContent" label="日志内容"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logPerson" label="日志发生人"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logPersonName" label="操作用户名"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logTime" label="日志时间"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logLevel" label="日志级别"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="logIp" label="ip"></el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="editData(scope.row)"></el-button>
					<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="delData(scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<div class="page-container">
		  <!-- 分页 -->
		  <el-pagination
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="page"
			  :page-sizes="[5, 10, 15, 20]"
			  :page-size="size"
			  style="float: right;margin-top:15px;"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="total">
		  </el-pagination>
		</div>
		</div>

		<!-- 新增弹出框  -->
		<el-dialog title="新增信息"
				   style="text-align: left !important"
				   :visible.sync="dialogAddVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px" >
				<el-form-item label="日志ID" style="width: 50%;float: left;" :required="rules.logId" >
					<el-input v-model="insertParam.logId" placeholder="请输入日志ID"></el-input>
				</el-form-item>
				<el-form-item label="日志类别" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.logType" placeholder="请输入日志类别"></el-input>
				</el-form-item>
				<el-form-item label="操作类型" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.logOperateType" placeholder="请输入操作类型"></el-input>
				</el-form-item>
				<el-form-item label="日志内容" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.logContent" placeholder="请输入日志内容"></el-input>
				</el-form-item>
				<el-form-item label="日志发生人" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.logPerson" placeholder="请输入日志发生人"></el-input>
				</el-form-item>
				<el-form-item label="操作用户名" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.logPersonName" placeholder="请输入操作用户名"></el-input>
				</el-form-item>
				<el-form-item label="日志时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.logTime"
						type="datetime"
						placeholder="请输入日志时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="日志级别" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.logLevel" placeholder="请输入日志级别"></el-input>
				</el-form-item>
				<el-form-item label="ip" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.logIp" placeholder="请输入ip"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer" >
        <el-button type="success" @click="insertData(insertParam)">保存</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="修改信息"
				   style="text-align: left !important"
				   :visible.sync="dialogEditVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px">
				<el-form-item label="日志ID" style="width: 50%;float: left;" >
					<el-input v-model="editParam.logId" placeholder="请输入日志ID" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="日志类别" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.logType" placeholder="请输入日志类别"></el-input>
				</el-form-item>
				<el-form-item label="操作类型" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.logOperateType" placeholder="请输入操作类型"></el-input>
				</el-form-item>
				<el-form-item label="日志内容" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.logContent" placeholder="请输入日志内容"></el-input>
				</el-form-item>
				<el-form-item label="日志发生人" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.logPerson" placeholder="请输入日志发生人"></el-input>
				</el-form-item>
				<el-form-item label="操作用户名" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.logPersonName" placeholder="请输入操作用户名"></el-input>
				</el-form-item>
				<el-form-item label="日志时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="editParam.logTime"
						type="datetime"
						placeholder="请输入日志时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="日志级别" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.logLevel" placeholder="请输入日志级别"></el-input>
				</el-form-item>
				<el-form-item label="ip" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.logIp" placeholder="请输入ip"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateData(editParam)">提交</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<!-- 删除弹出框  -->
		<el-dialog
				title="提示"
				style="text-align: left !important"
				:visible.sync="dialogDelVisible"
				:before-close="handleClose" >
			<span>你确定要删除这条数据吗?</span>
			<span slot="footer" class="dialog-footer">
        <el-button @click="handleDel()">确定</el-button>
        <el-button type="primary" @click="dialogDelVisible = false">取消</el-button>
      </span>
		</el-dialog>

	</div>
</template>

<script>
// 下载需要的API
import { outExportExcel } from '@/api/mainApi'
// 引入API
import {
  operateLogQueryListByPage,
  operateLogQueryList,
  operateLogInsertList,
  operateLogInsert,
  operateLogUpdateList,
  operateLogUpdate,
  operateLogDelete
} from '@/api/login/operateLogApi.js'

export default {
  data () {
    return {
      activeName: 'first',
      // 控制 新增弹出框是否显示
      dialogAddVisible: false,
      // 控制 修改弹出框是否显示
      dialogEditVisible: false,
      // 控制 删除弹出框是否显示
      dialogDelVisible: false,
      // tab 页的形式设定
      activeIndex2: '1',
      // 下面三个参数事分页需要的参数
      total: 0,
      size: 5,
      page: 1,
      // 查询条件
      queryParam: {},
      // 后台返回的数据列表
      dataList: [],
      // 插入时的参数
      insertParam: {},
      // 编辑时的参数
      editParam: {},
      // 删除时的参数
      delParam: {},
      // 下载导出需要的表头
      tableHeader: [
        '日志ID',
        '日志类别',
        '操作类型',
        '日志内容',
        '日志发生人',
        '操作用户名',
        '日志时间',
        '日志级别',
        'ip'
      ],
      // 下载导出需要的表头对应的key
      tableKey: [
        'logId',
        'logType',
        'logOperateType',
        'logContent',
        'logPerson',
        'logPersonName',
        'logTime',
        'logLevel',
        'logIp'
      ],
      // 下载导出的数据集合
      tableData: [],
      // 必填字段 前面加'*'
      rules: {
        logId: [{ required: true, message: '请输入', trigger: 'blur' }]
      }

    }
  },
  watch: {
    // 2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
    // 可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
    total () {
      if (this.total == (this.page - 1) * this.size && this.total != 0) {
        this.page -= 1
        this.getDataList()
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleClose (done) {
      done()
    },

    handleSizeChange (val) {
      this.size = val
      this.getDataList()
    },

    handleCurrentChange (val) {
      this.page = val
      this.getDataList()
    },

    // 查询
    async getDataList () {
      this.queryParam.pageNum = this.page
      this.queryParam.pageSize = this.size
      operateLogQueryListByPage(this.queryParam).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据查询结果，赋值给页面
          this.total = response.resultEntity.total
          this.dataList = response.resultEntity.list
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // 查询条件重置
    resetForm () {
      this.queryParam = {}
      this.queryParam.pageNum = this.page
      this.queryParam.pageSize = this.size
    },

    // 新增  弹出框
    addData () {
      this.dialogAddVisible = true
      this.insertParam = {}
    },
    // 插入
    async insertData (insertParam) {
      operateLogInsert(insertParam).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据插入结果，页面提示
          alert(response.resultMsg)
          // 新增保存后，关闭窗口
          this.dialogAddVisible = false
          // 刷新界面
          this.getDataList()
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },

    // 编辑 弹出框
    editData (row) {
      // 这里需要深度克隆，不然，修改时页面会直接一起变
      this.editParam = JSON.parse(JSON.stringify(row))
      this.dialogEditVisible = true
    },
    // 更新
    async updateData (editParam) {
      operateLogUpdate(editParam).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据插入结果，页面提示
          alert(response.resultMsg)
          // 修改提交后，关闭窗口
          this.dialogEditVisible = false
          // 页面刷新数据
          this.getDataList()
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },

    // 删除
    delData (row) {
      this.delParam = row
      this.dialogDelVisible = true
    },
    // 执行删除接口
    async handleDel () {
      const params = {
        logId: this.delParam.logId
      }
      operateLogDelete(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据插入结果，页面提示
          alert(response.resultMsg)
          this.dialogDelVisible = false
          // 页面刷新数据
          this.getDataList()
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // 导出数据为execl
    async exportExecl () {
      // 全量查询数据，这里可以后期修改成分页查询等
      const params = {}
      operateLogQueryList(params).then((response) => {
        // 数据
        this.tableData = response.resultEntity
        console.log(this.tableData)
        outExportExcel(this.tableHeader, this.tableKey, this.tableData, '操作日志')
      })
    }

  },
  mounted () {
    this.getDataList()
  }
}
</script>

<style lang="scss" scoped>
.box-container{
    background: white;
    margin: 35px 15px;
}

::v-deep{
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
  flex: 1;
  display: flex;
}

.el-dialog__footer {
    padding: 10px 20px 10px;
    text-align: right;
    box-sizing: border-box;
    background: #C3D2E6;
}

.el-dialog__header {
    padding: 15px;
    background: #C3D2E6;
    font-weight: bold;
}

.el-input__inner:focus{
    border:1px solid #DCDFE6
}

.el-tabs__item.is-active {
    color: #0F6CC3;
}

.el-tabs__item:hover {
    color: #0F6CC3;
}

.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #0F6CC3;
    z-index: 1;
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}
}

	//覆盖 el-button 样式
	.serach-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
		height: 40px;
	}

	.serach-button:hover{
		background: #0F6CC3 ;
		opacity: 0.6;
	}

	.refresh-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
		height: 40px;
	}

  .refresh-button:hover{
		background: #0F6CC3 ;
		opacity: 0.6;
	}

	.export-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
		height: 40px;
	}

	.export-button:hover{
		background: #0F6CC3 ;
		opacity: 0.6;
	}

	.add-button{
		color:white;
		background: #1D9FCA ;
		opacity: 0.8;
		border-radius: 3px;
		height: 40px;
	}

	.add-button:hover{
		background: #1D9FCA ;
		opacity: 0.6;
	}

  .cancel-button{
		color:white;
		background: #1D9FCA ;
		opacity: 0.8;
		border-radius: 3px;
		height: 40px;
	}

	.cancel-button:hover{
		background: #1D9FCA ;
		opacity: 0.6;
	}

  .save-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
		height: 40px;
	}

	.save-button:hover{
		background: #0F6CC3 ;
		opacity: 0.6;
	}

  .page-container{
    width: 100%;
    height: 60px;
    background: white;
  }
</style>
