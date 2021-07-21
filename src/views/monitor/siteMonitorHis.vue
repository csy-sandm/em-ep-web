<template>
	<div class="his-container">
		<!-- 标题 class="el-menu-demo"-->
		<!-- <el-menu
				:default-active="activeIndex2"
				class="title-info"
				mode="horizontal"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b" >
			<el-menu-item index="1">站点历史数据</el-menu-item>
		</el-menu>
		<br /> -->
		<el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0px 15px 0px 15px;background:#F3F3F3;font-weight: bold;">
			<el-tab-pane label="站点历史数据" name="first"></el-tab-pane>
		</el-tabs>

		<div class="content-info" v-if="activeName === 'first'">
		<!-- 查询区域 -->
		<el-row style="margin-top: 20px;">
			<el-col class="grid" style="width:50%;float:left">
				<!-- 输入框 -->
				<el-form ref="form" label-width="120px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="6" class="grid">
						<el-form-item label="数据唯一标识:" style="width: 300px"  >
							<el-input v-model="queryParam.uId" placeholder="请输入数据唯一标识"></el-input>
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
        stripe
				style="width: 100%;margin-top:10px"
				:header-cell-style="{color:'#313E5D',background:'#C3D2E6',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px'}"
				:row-class-name="tabRowClassName"
				ref="multipleTable"
				tooltip-effect="dark">
			<el-table-column label="序号" type="index" width="80px" align="center">
				<template slot-scope="scope">
					<span>{{ (page - 1) * size + scope.$index + 1 }}</span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="uId" label="数据唯一标识"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="siteId" label="站点编码"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="dataKey" label="数据因子编号"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="dataName" label="监测因子名称"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="dataValue" label="数据值"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" :formatter="formatDate" prop="dataTime" label="数据采集时间"></el-table-column>
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

		<!-- 新增弹出框  -->
		<el-dialog title="新增信息"
				   style="text-align: left !important;margin-top: 15vh;"
				   :visible.sync="dialogAddVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="150px" :model="insertParam"  :rules="rules"  >
				<el-form-item label="数据唯一标识" style="width: 50%;float: left;" prop="uId" >
					<el-input v-model="insertParam.uId"   placeholder="请输入数据唯一标识"></el-input>
				</el-form-item>
				<el-form-item label="站点编码" style="width: 50%;float: left;">
					<el-input v-model="insertParam.siteId"   placeholder="请输入站点编码"></el-input>
				</el-form-item>
				<el-form-item label="数据因子编号" style="width: 50%;float: left;">
					<el-input v-model="insertParam.dataKey"   placeholder="请输入数据因子编号"></el-input>
				</el-form-item>
				<el-form-item label="监测因子名称" style="width: 50%;float: left;">
					<el-input v-model="insertParam.dataName"   placeholder="请输入监测因子名称"></el-input>
				</el-form-item>
				<el-form-item label="数据值" style="width: 50%;float: left;">
					<el-input v-model="insertParam.dataValue"   placeholder="请输入数据值"></el-input>
				</el-form-item>
				<el-form-item label="数据采集时间" style="width: 50%;float: left;">
          <el-date-picker
            style="width: 100%;"
            v-model="insertParam.dataTime"
            type="datetime"
            placeholder="请输入数据采集时间">
          </el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer" >
        <el-button class="save-button" type="success" @click="insertData(insertParam)">保存</el-button>
        <el-button class="cancel-button" type="primary" @click="dialogAddVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="修改信息"
				   style="text-align: left !important"
				   :visible.sync="dialogEditVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px">
				<el-form-item label="数据唯一标识" style="width: 500px" >
					<el-input v-model="editParam.uId"  placeholder="请输入数据唯一标识" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="站点编码" style="width: 500px" >
					<el-input v-model="editParam.siteId"  placeholder="请输入站点编码"  ></el-input>
				</el-form-item>
				<el-form-item label="数据因子编号" style="width: 500px" >
					<el-input v-model="editParam.dataKey"  placeholder="请输入数据因子编号"  ></el-input>
				</el-form-item>
				<el-form-item label="监测因子名称" style="width: 500px" >
					<el-input v-model="editParam.dataName"  placeholder="请输入监测因子名称"  ></el-input>
				</el-form-item>
				<el-form-item label="数据值" style="width: 500px" >
					<el-input v-model="editParam.dataValue"  placeholder="请输入数据值"  ></el-input>
				</el-form-item>
				<el-form-item label="数据采集时间" style="width: 500px" >
					<el-input v-model="editParam.dataTime" type="datetime-local" placeholder="请输入数据采集时间"  ></el-input>
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
	</div>
</template>

<script>
// 下载需要的API
import { outExportExcel } from '@/api/mainApi'
// 引入API
import {
  siteMonitorHisQueryListByPage,
  siteMonitorHisQueryList,
  siteMonitorHisInsertList,
  siteMonitorHisInsert,
  siteMonitorHisUpdateList,
  siteMonitorHisUpdate,
  siteMonitorHisDelete
} from '@/api/em-ep/siteMonitorHisApi.js'

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
      size: 10,
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
        '数据唯一标识',
        '站点编码',
        '数据因子编号',
        '监测因子名称',
        '数据值',
        '数据采集时间'
      ],
      // 下载导出需要的表头对应的key
      tableKey: [
        'uId',
        'siteId',
        'dataKey',
        'dataName',
        'dataValue',
        'dataTime'
      ],
      // 下载导出的数据集合
      tableData: [],
      // 必填字段 前面加'*'
      rules: {
        uId: [{ required: true, message: '请输入', trigger: 'blur' }]
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
    tabRowClassName ({ row, rowIndex }) {
      const index = rowIndex + 1
      if (index % 2 == 0) {
        return 'double-row'
      }
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
      siteMonitorHisQueryListByPage(this.queryParam).then((response) => {
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
      siteMonitorHisInsert(insertParam).then((response) => {
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
      siteMonitorHisUpdate(editParam).then((response) => {
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
        uId: this.delParam.uId
      }
      siteMonitorHisDelete(params).then((response) => {
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
      siteMonitorHisQueryList(params).then((response) => {
        // 数据
        this.tableData = response.resultEntity
        console.log(this.tableData)
        outExportExcel(this.tableHeader, this.tableKey, this.tableData, '站点历史数据')
      })
    },
    formatDate (row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (data == null) {
        return null
      }
      const dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
    }

  },
  mounted () {
    this.getDataList()
  }
}
</script>

<style lang="scss" scoped>
.his-container{
    background: white;
    margin: 10px 15px;
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
