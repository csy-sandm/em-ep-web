<template>
	<div class="box-container">
		<el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0px 15px 0px 15px;background:#F3F3F3;font-weight: bold;">
			<el-tab-pane label="工单审核" name="first"></el-tab-pane>
		</el-tabs>

		<div class="content-info" v-if="activeName === 'first'">
		<!-- 查询区域 -->
		<el-row style="margin-top: 20px;">
			<el-col class="grid" style="width:70%;float:left">
				<!-- 输入框 -->
				<el-form ref="form" label-width="120px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="6" class="grid">
						<el-form-item label="工单编码:" style="width: 300px"  >
							<el-input v-model="queryParam.uId" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6" class="grid">
						<el-form-item label="运维站点:" style="width: 300px"  >
							<el-input v-model="queryParam.siteId" placeholder="请输入运维站点"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>

			<el-col :span="22" class="grid" style="width:30%;float:left;text-align: right">
				<!-- 按钮 -->
				<!-- <el-button
						class="add-button"
						type="primary"
						@click="addData()"
						icon="el-icon-circle-plus-outline"
						size="mini" >新增</el-button> -->
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
				border
				style="width: 100%"
				:header-cell-style="{color:'#313E5D',background:'#C3D2E6',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px'}"
				stripe
				ref="multipleTable"
				tooltip-effect="dark">
			<el-table-column label="序号" type="index" width="80px" align="center">
				<template slot-scope="scope">
					<span>{{ (page - 1) * size + scope.$index + 1 }}</span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="orderId" label="工单编号"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="orderType" label="工单类型"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="siteName" label="运维站点"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="instrumentId" label="关联设备"></el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true" prop="instrumentId" label="关联设备"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="responsiblerPerson" label="工单责任人"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="collaborator" label="工单协同人"></el-table-column> -->
			<el-table-column :show-overflow-tooltip="true" prop="orderDesc" label="任务描述"></el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true" prop="orderImg" label="相关照片"></el-table-column> -->
			<el-table-column :show-overflow-tooltip="true" prop="priority" label="优先级"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="orderStatus" label="审核状态"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="planCompletionDay" label="计划完工日">
				<template slot-scope="scope">
					{{ getYMDHMS(scope.row.completionTime) }}
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="receiveTime" label="接单时间">
				<template slot-scope="scope">
					{{ getYMDHMS(scope.row.receiveTime) }}
				</template>
			</el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true" prop="startWorkTime" label="开工时间"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="completionTime" label="完工时间"></el-table-column> -->
			<el-table-column :show-overflow-tooltip="true" prop="createTime" label="工单创建时间">
				<template slot-scope="scope">
					{{ getYMDHMS(scope.row.createTime) }}
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="creator" label="工单创建人"></el-table-column>
			<el-table-column label="操作" width="300" align="center">
				<template slot-scope="scope">
					<el-button
							type="primary"
							icon="el-icon-info"
							size="mini"
							@click="editData(scope.row)"></el-button>

					<el-button
							type="success"
							icon="el-icon-check"
							size="mini"
							@click="okData(scope.row)"></el-button>

					<el-button
							type="warning"
							icon="el-icon-close"
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
			<el-form ref="form" label-width="200px" :model="insertParam"  :rules="rules"  >
				<el-form-item label="工单编号" style="width: 50%;float: left;" prop="orderId" >
					<el-input v-model="insertParam.orderId" placeholder="请输入工单编号"></el-input>
				</el-form-item>
				<el-form-item label="工单类型" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.orderType" placeholder="请输入工单类型"></el-input>
				</el-form-item>
				<el-form-item label="运维站点" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.siteId" placeholder="请输入运维站点"></el-input>
				</el-form-item>
				<el-form-item label="关联设备" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.instrumentId" placeholder="请输入关联设备"></el-input>
				</el-form-item>
				<el-form-item label="工单责任人" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.responsiblerPerson" placeholder="请输入工单责任人"></el-input>
				</el-form-item>
				<el-form-item label="工单协同人" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.collaborator" placeholder="请输入工单协同人"></el-input>
				</el-form-item>
				<el-form-item label="任务描述" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.orderDesc" placeholder="请输入任务描述"></el-input>
				</el-form-item>
				<el-form-item label="相关照片" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.orderImg" placeholder="请输入相关照片"></el-input>
				</el-form-item>
				<el-form-item label="优先级" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.priority" placeholder="请输入优先级"></el-input>
				</el-form-item>
				<el-form-item label="工单状态" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.orderStatus" placeholder="请输入工单状态"></el-input>
				</el-form-item>
				<el-form-item label="计划完工日" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.planCompletionDay"
						type="date"
						placeholder="请输入计划完工日">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="接单时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.receiveTime"
						type="datetime"
						placeholder="请输入接单时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="开工时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.startWorkTime"
						type="datetime"
						placeholder="请输入开工时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="完工时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.completionTime"
						type="datetime"
						placeholder="请输入完工时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="工单创建时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.createTime"
						type="datetime"
						placeholder="请输入工单创建时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="工单创建人" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.creator" placeholder="请输入工单创建人"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer" >
        <el-button type="success" @click="insertData(insertParam)">保存</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="详细信息"
				   style="text-align: left !important"
				   :visible.sync="dialogEditVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px"  :disabled="true">
				<el-form-item label="工单编号" style="width: 50%;float: left;" >
					<el-input v-model="editParam.orderId" placeholder="请输入工单编号" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="工单类型" style="width: 50%;float: left;"  >
						<el-select style="width: 100%;" v-model="editParam.orderType" :disabled="true" placeholder="请选择工单类型">
							<el-option
							v-for="item in orderTypeListS"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="运维站点" style="width: 50%;float: left;"  >
						<el-select style="width: 100%;" v-model="editParam.siteId" :disabled="true" placeholder="请选择运维站点">
							<el-option
							v-for="item in siteListS"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="关联设备" style="width: 50%;float: left;"  >
						<el-select style="width: 100%;" v-model="editParam.instrumentId" :disabled="true" placeholder="请选择关联设备">
							<el-option
							v-for="item in deviceListS"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="工单责任人" style="width: 50%;float: left;"  >
						<el-select style="width: 100%;" v-model="editParam.responsiblerPerson" :disabled="true" placeholder="请选择工单负责人">
							<el-option
							v-for="item in accountListS"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="工单协调人" style="width: 50%;float: left;"  >
						<el-select style="width: 100%;" v-model="editParam.collaborator" :disabled="true" placeholder="请选择工单协调人">
							<el-option
							v-for="item in accountListS"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="任务描述" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.orderDesc" placeholder="请输入任务描述"></el-input>
				</el-form-item>
				<el-form-item label="相关照片" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.orderImg" placeholder="请输入相关照片"></el-input>
				</el-form-item>
				<el-form-item label="优先级" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.priority" placeholder="请输入优先级"></el-input>
				</el-form-item>
				<el-form-item label="工单状态" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.orderStatus" placeholder="请输入工单状态"></el-input>
				</el-form-item>
				<el-form-item label="计划完工日" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="editParam.planCompletionDay"
						type="datetime"
						placeholder="请输入计划完工日">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="接单时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="editParam.receiveTime"
						type="datetime"
						placeholder="请输入接单时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="开工时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="editParam.startWorkTime"
						type="datetime"
						placeholder="请输入开工时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="完工时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="editParam.completionTime"
						type="datetime"
						placeholder="请输入完工时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="工单创建时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="editParam.createTime"
						type="datetime"
						placeholder="请输入工单创建时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="工单创建人" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.creator" placeholder="请输入工单创建人"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateData(editParam)">提交</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<!-- 通过弹出框  -->
		<el-dialog
				title="提示"
				style="text-align: left !important"
				:visible.sync="dialogOkVisible"
				:before-close="handleClose" >
			<span>你确定要通过这条工单吗?</span>
			<span slot="footer" class="dialog-footer">
        <el-button @click="handleOk()">确定</el-button>
        <el-button type="primary" @click="dialogOkVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<!-- 驳回弹出框  -->
		<el-dialog
				title="提示"
				style="text-align: left !important"
				:visible.sync="dialogNoVisible"
				:before-close="handleClose" >
			<span>你确定要驳回这条工单吗?</span>
			<span slot="footer" class="dialog-footer">
        <el-button @click="handleNo()">确定</el-button>
        <el-button type="primary" @click="dialogNoVisible = false">取消</el-button>
      </span>
		</el-dialog>

	</div>
</template>

<script>
// 下载需要的API
import { outExportExcel } from '@/api/mainApi'
//引入API
import {
		workorderSumDataQueryListByPage,
		workorderSumDataQueryList,
		workorderSumDataInsertList,
		workorderSumDataInsert,
		workorderSumDataUpdateList,
		workorderSumDataUpdate,
		workorderSumDataDelete
}from "@/api/em-ep/workorderSumDataApi.js";

import {
  siteInfoQueryList
} from '@/api/em-ep/siteInfoApi.js'

import {
  workorderTypeQueryList
} from '@/api/em-ep/workorderTypeApi.js'

import {
  accountInfoQueryList
} from '@/api/login/accountInfoApi.js'

import {
  deviceInfoQueryList
} from '@/api/em-ep/deviceInfoApi.js'

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
	  // 控制 通过弹出框是否显示
	  dialogOkVisible: false,
	  // 控制 驳回弹出框是否显示
	  dialogNoVisible: false,
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
	 // 通过时时的参数
	  okParam: {},
	 // 驳回时的参数
      noParam: {},
      // 删除时的参数
      delParam: {},
      // 下载导出需要的表头
      tableHeader: [
        '工单编号',
        '工单类型',
        '运维站点',
        '关联设备',
        '工单责任人',
        '工单协同人',
        '任务描述',
        '相关照片',
        '优先级',
        '工单状态',
        '计划完工日',
        '接单时间',
        '开工时间',
        '完工时间',
        '工单创建时间',
        '工单创建人'
      ],
      // 下载导出需要的表头对应的key
      tableKey: [
        'orderId',
        'orderType',
        'siteId',
        'instrumentId',
        'responsiblerPerson',
        'collaborator',
        'orderDesc',
        'orderImg',
        'priority',
        'orderStatus',
        'planCompletionDay',
        'receiveTime',
        'startWorkTime',
        'completionTime',
        'createTime',
        'creator'
      ],
      // 下载导出的数据集合
      tableData: [],
      // 必填字段 前面加'*'
      rules: {
        orderId: [{ required: true, message: '请输入', trigger: 'blur' }]
	  },
	  siteList: [],
	  siteListS: [],
	  orderTypeList: [],
	  orderTypeListS: [],
	  accountList: [],
	  accountListS: [],
	  deviceList: [],
	  deviceListS: []

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
	  getYMDHMS (timestamp) {
      if (!timestamp) return '--'
      const time = new Date(timestamp)
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hours = time.getHours()
      let minute = time.getMinutes()
      let second = time.getSeconds()

      if (month < 10) { month = '0' + month }
      if (date < 10) { date = '0' + date }
      if (hours < 10) { hours = '0' + hours }
      if (minute < 10) { minute = '0' + minute }
      if (second < 10) { second = '0' + second }
      return year + '-' + month + '-' + date
    },
	  async deviceInfoQueryList () {
      const params = {}
      deviceInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
		  this.deviceList = []
		  this.deviceListS = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.deviceList.push(info)

          if (response && response.resultEntity) {
			  console.log('444444', response)
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].deviceId
              info.name = response.resultEntity[i].deviceName
			  this.deviceList.push(info)
			  this.deviceListS.push(info)
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
	  async queryAccountList () {
      const params = {}
      accountInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
		  this.accountList = []
		  this.accountListS = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.accountList.push(info)

          if (response && response.resultEntity) {
			  console.log('3333', response)
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].userCode
              info.name = response.resultEntity[i].userName
			  this.accountList.push(info)
			  this.accountListS.push(info)
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    async queryOrderTypeList () {
      const params = {}
      workorderTypeQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
		  this.orderTypeList = []
		  this.orderTypeListS = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.orderTypeList.push(info)

          if (response && response.resultEntity) {
			  console.log('111111', response)
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].typeId
              info.name = response.resultEntity[i].typeName
			  this.orderTypeList.push(info)
			  this.orderTypeListS.push(info)
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    async querySiteList () {
      const params = {}
      siteInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
		  this.siteList = []
		  this.siteListS = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.siteList.push(info)

          if (response && response.resultEntity) {
			  console.log('responseresponse', response)
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].siteId
              info.name = response.resultEntity[i].siteName
			  this.siteList.push(info)
			  this.siteListS.push(info)
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
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
	  this.queryParam.orderStatus = '待审批'

      workorderSumDataQueryListByPage(this.queryParam).then((response) => {
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

    async handleNo () {
	  this.delParam.orderStatus = '驳回'
      workorderSumDataUpdate(this.delParam).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据插入结果，页面提示
          alert(response.resultMsg)
          // 新增保存后，关闭窗口
          this.dialogNoVisible = false
          // 刷新界面
          this.getDataList()
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    async handleOk () {
	  this.okParam.orderStatus = '待处理'
      workorderSumDataUpdate(this.okParam).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据插入结果，页面提示
          alert(response.resultMsg)
          // 新增保存后，关闭窗口
          this.dialogOkVisible = false
          // 刷新界面
          this.getDataList()
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // 插入
    async insertData (insertParam) {
      workorderSumDataInsert(insertParam).then((response) => {
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
      workorderSumDataUpdate(editParam).then((response) => {
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

    // 通过
    okData (row) {
      this.okParam = row
      this.dialogOkVisible = true
    },

    // 驳回
	  delData (row) {
      this.delParam = row
      this.dialogNoVisible = true
    },

    // 执行删除接口
    async handleDel () {
      const params = {
        orderId: this.delParam.orderId
      }
      workorderSumDataDelete(params).then((response) => {
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
      workorderSumDataQueryList(params).then((response) => {
        // 数据
        this.tableData = response.resultEntity
        console.log(this.tableData)
        outExportExcel(this.tableHeader, this.tableKey, this.tableData, '计划工单')
      })
    }

  },
  mounted () {
    this.getDataList()
    this.querySiteList()
    this.queryOrderTypeList()
    this.queryAccountList()
    this.deviceInfoQueryList()
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
