<template>
	<div class="box-container">

		<el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0px 15px 0px 15px;background:#F3F3F3;font-weight: bold;">
			<el-tab-pane label="账号管理" name="first"></el-tab-pane>
		</el-tabs>

		<div class="content-info" v-if="activeName === 'first'">
		<!-- 查询区域 -->
		<el-row style="margin-top: 20px;">
			<el-col class="grid" style="width:50%;float:left">
				<!-- 输入框 -->
				<el-form ref="form" label-width="120px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="8" class="grid">
						<el-form-item label="账号编码:" style="width: 300px"  >
							<el-input v-model="queryParam.userCode" placeholder="请输入账号编码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" class="grid">
						<el-form-item label="账号姓名:" style="width: 300px"  >
							<el-input v-model="queryParam.userName" placeholder="请输入账号姓名"></el-input>
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
			<el-table-column :show-overflow-tooltip="true" prop="userCode" label="账号编码"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="userName" label="账号姓名"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="userSex" label="性别"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="roleInfoList" label="角色">
				<template slot-scope="scope">
					<span @click="changeRoleEvent(scope.row)" style="color:#409eff;cursor:pointer">{{ scope.row.roleInfoList && scope.row.roleInfoList.length > 0 ? scope.row.roleInfoList[0].roleName : '--'}}</span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="idCard" label="身份证ID"></el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true" prop="eMail" label="E_Mail"></el-table-column> -->
			<el-table-column :show-overflow-tooltip="true" prop="phoneNumber" label="电话号码"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="workStation" label="工作站">
				<template slot-scope="scope">
					<span> {{ stationFilter(scope.row.workStation)}} </span>
				</template>
			</el-table-column>

			<el-table-column :show-overflow-tooltip="true" prop="departId" label="部门">
				<template slot-scope="scope">
					<span> {{ departFilter(scope.row.departId)}} </span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="userStatus" label="用户状态">
				<template slot-scope="scope">
					<span> {{scope.row.userStatus === '0' ? '启用' : scope.row.userStatus === '-1' ? '冻结' : '锁定'}} </span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="loginErrNum" label="错误登录次数"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="lockTime" label="锁定时间"></el-table-column>

			<!-- <el-table-column :show-overflow-tooltip="true" prop="openId" label="微信凭证"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="profession" label="职业"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="departId" label="部门Id"></el-table-column> -->

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
					<el-button
							type="warning"
							icon="el-icon-refresh"
							size="mini"
							@click="resetPassword(scope.row)"></el-button>
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
				<el-form-item label="账号编码" style="width: 50%;float: left;" :required="rules.userCode" >
					<el-input v-model="insertParam.userCode" placeholder="请输入账号编码"></el-input>
				</el-form-item>
				<el-form-item label="账号姓名" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.userName" placeholder="请输入账号姓名"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.passWord" placeholder="请输入登录密码"></el-input>
				</el-form-item>
				<el-form-item label="性别：0男，1女" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.userSex" placeholder="请输入性别：0男，1女"></el-input>
				</el-form-item>
				<!-- <el-form-item label="年龄" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.userAge" placeholder="请输入年龄"></el-input>
				</el-form-item> -->
				<el-form-item label="身份证ID" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.idCard" placeholder="请输入身份证ID"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="insertParam.userStatus" placeholder="请选择用户状态">
							<el-option
							v-for="item in userStatusList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="E_Mail" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.eMail" placeholder="请输入E_Mail"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.phoneNumber" placeholder="请输入电话号码"></el-input>
				</el-form-item>
				<!-- <el-form-item label="微信登录时获取的唯一凭证" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.openId" placeholder="请输入微信登录时获取的唯一凭证"></el-input>
				</el-form-item> -->
				<el-form-item label="职业" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.profession" placeholder="请输入职业"></el-input>
				</el-form-item>
				<!-- <el-form-item label="头像" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.imgUrl" placeholder="请输入头像"></el-input>
				</el-form-item> -->
				<el-form-item label="工作站" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="insertParam.workStation" placeholder="请选择工作站">
							<el-option
							v-for="item in workstationList"
							:key="item.stationId"
							:label="item.stationName"
							:value="item.stationId"/>
						</el-select>
				</el-form-item>
				<el-form-item label="部门" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="insertParam.departId" placeholder="请选择部门">
							<el-option
							v-for="item in departmentInfoList"
							:key="item.departId"
							:label="item.departName"
							:value="item.departId"/>
						</el-select>
				</el-form-item>
				<el-form-item label="备注" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.remarks" placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-form-item label="标注用户类型 0:所有平台，1，PC端，2移动端" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.userType" placeholder="请输入标注用户类型 0:所有平台，1，PC端，2移动端"></el-input>
				</el-form-item>

				<el-form-item label="注册时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.createTime"
						type="datetime"
						placeholder="请输入注册时间">
					</el-date-picker>
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
				<el-form-item label="账号编码" style="width: 50%;float: left;" >
					<el-input v-model="editParam.userCode" placeholder="请输入账号编码" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="账号姓名" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.userName" placeholder="请输入账号姓名"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.passWord" placeholder="请输入登录密码"></el-input>
				</el-form-item>
				<el-form-item label="性别：0男，1女" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.userSex" placeholder="请输入性别：0男，1女"></el-input>
				</el-form-item>
				<!-- <el-form-item label="年龄" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.userAge" placeholder="请输入年龄"></el-input>
				</el-form-item> -->
				<el-form-item label="身份证ID" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.idCard" placeholder="请输入身份证ID"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="editParam.userStatus" placeholder="请选择用户状态">
							<el-option
							v-for="item in userStatusList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="E_Mail" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.eMail" placeholder="请输入E_Mail"></el-input>
				</el-form-item>
				<el-form-item label="电话号码" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.phoneNumber" placeholder="请输入电话号码"></el-input>
				</el-form-item>
				<el-form-item label="职业" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.profession" placeholder="请输入职业"></el-input>
				</el-form-item>
				<!-- <el-form-item label="头像" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.imgUrl" placeholder="请输入头像"></el-input>
				</el-form-item> -->
				<el-form-item label="部门" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="editParam.departId" placeholder="请选择部门">
							<el-option
							v-for="item in departmentInfoList"
							:key="item.departId"
							:label="item.departName"
							:value="item.departId"/>
						</el-select>
				</el-form-item>
				<el-form-item label="工作站" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="editParam.workStation" placeholder="请选择工作站">
							<el-option
							v-for="item in workstationList"
							:key="item.stationId"
							:label="item.stationName"
							:value="item.stationId"/>
						</el-select>
				</el-form-item>
				<el-form-item label="备注" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.remarks" placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-form-item label="标注用户类型 0:所有平台，1，PC端，2移动端" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.userType" placeholder="请输入标注用户类型 0:所有平台，1，PC端，2移动端"></el-input>
				</el-form-item>
				<el-form-item label="注册时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="editParam.createTime"
						type="datetime"
						placeholder="请输入注册时间">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateData(editParam)">提交</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<el-dialog
				title="角色分配"
				style="text-align: left !important"
				:visible.sync="dialogChangeVisible"
				:before-close="handleClose" >
				<el-form ref="form" label-width="200px">
				<el-form-item label="账号编码">
					<el-select v-model="roleCode" placeholder="请选择">
						<el-option
						v-for="item in roleInfoList"
						:key="item.roleCode"
						:label="item.roleName"
						:value="item.roleCode">
						</el-option>
					</el-select>
				</el-form-item>
				</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleChange()">确定</el-button>
				<el-button type="primary" @click="dialogChangeVisible = false">取消</el-button>
			</span>
		</el-dialog>

		<!-- 密码重置  -->
		<el-dialog
				title="提示"
				style="text-align: left !important"
				:visible.sync="dialogResetVisible"
				:before-close="handleClose" >
			<span>你确定重置密码吗?</span>
			<span slot="footer" class="dialog-footer">
        <el-button @click="handleReset()">确定</el-button>
        <el-button type="primary" @click="dialogResetVisible = false">取消</el-button>
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
  accountInfoQueryListByPage,
  accountInfoQueryList,
  accountInfoInsertList,
  accountInfoInsert,
  accountInfoUpdateList,
  accountInfoUpdate,
  accountInfoDelete,
  resetPassword,
  deleteUserRole,
  insertUserRole
} from '@/api/login/accountInfoApi.js'

import {
  roleInfoQueryList
} from '@/api/login/roleInfoApi.js'

import {
  departmentInfoQueryList
} from '@/api/login/departmentInfoApi.js'

import {
  workstationInfoQueryList
} from '@/api/login/workstationInfoApi.js'

export default {
  data () {
    return {
      workstationList: [],
      departmentInfoList: [],
      userStatusList: [
        {
          value: '0',
		  name: '启用'
        },
        {
          value: '-1',
		  name: '冻结'
        },
        {
          value: '1',
		  name: '锁定'
        }
      ],
      roleInfoList: [
		  {
			  roleName: '测试员'
		  },
		  {
			  roleName: '测试员1'
		  },
		  {
			  roleName: '测试员2'
		  }
	  ],
	  dialogChangeVisible: false,
	  roleParams: {},
	  roleCode: '',
      activeName: 'first',
      // 控制 新增弹出框是否显示
      dialogAddVisible: false,
      // 控制 修改弹出框是否显示
      dialogEditVisible: false,
      // 控制 删除弹出框是否显示
      dialogDelVisible: false,
	  dialogResetVisible: false,
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
	  resetParam: {},
      // 下载导出需要的表头
      tableHeader: [
        '账号编码',
        '账号姓名',
        '登录密码',
        '性别：0男，1女',
        '年龄',
        '身份证ID',
        'E_Mail',
        '电话号码',
        '微信登录时获取的唯一凭证',
        '职业',
        '头像',
        '部门Id',
        '备注',
        '标注用户类型 0:所有平台，1，PC端，2移动端',
        '用户状态：0启用,-1冻结,1锁定',
        '错误登录次数',
        '锁定时间',
        '注册时间'
      ],
      // 下载导出需要的表头对应的key
      tableKey: [
        'userCode',
        'userName',
        'passWord',
        'userSex',
        'userAge',
        'idCard',
        'eMail',
        'phoneNumber',
        'openId',
        'profession',
        'imgUrl',
        'departId',
        'remarks',
        'userType',
        'userStatus',
        'loginErrNum',
        'lockTime',
        'createTime'
      ],
      // 下载导出的数据集合
      tableData: [],
      // 必填字段 前面加'*'
      rules: {
        userCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入', trigger: 'blur' }],
        userSex: [{ required: true, message: '请输入', trigger: 'blur' }],
        workStation: [{ required: true, message: '请输入', trigger: 'blur' }],
        userType: [{ required: true, message: '请输入', trigger: 'blur' }]
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
    stationFilter (val) {
      console.log('val', val)
	  console.log('workstationList', this.workstationList)
      if (!val) {
        return '--'
      }
      for (let i = 0; i < this.workstationList.length; i++) {
        if (this.workstationList[i].stationId === val) {
          return this.workstationList[i].stationName
        }
      }
      return val
    },
    departFilter (val) {
      if (!val) {
        return '--'
      }
      for (let i = 0; i < this.departmentInfoList.length; i++) {
        if (this.departmentInfoList[i].departId === val) {
          return this.departmentInfoList[i].departName
        }
      }
      return val
    },
    workstationInfoQueryList () {
      const params = {}
      workstationInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          this.workstationList = response.resultEntity
		  console.log('workstationListworkstationList', this.workstationList)
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    departmentInfoQueryList () {
      const params = {}
      departmentInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          this.departmentInfoList = response.resultEntity
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    async handleChange () {
      console.log('this.roleParams', this.roleParams)
	  if (this.roleParams && this.roleParams.roleInfoList && this.roleParams.roleInfoList.length > 0) {
        const params = {
          userCode: this.roleParams.userCode,
          roleCode: this.roleParams.roleCode
        }
        await deleteUserRole(params).then((response) => {
          const resultCode = response.resultCode
          if (resultCode === '2000') {

          } else {
          // 这个分支是错误返回分支
            alert(response.resultMsg)
          }
        })
	  }

	  const params = {
        userCode: this.roleParams.userCode,
        roleCode: this.roleCode
      }
      await insertUserRole(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
			  // 这里根据插入结果，页面提示
          alert(response.resultMsg)
          // 修改提交后，关闭窗口
          this.dialogChangeVisible = false
          // 页面刷新数据
          this.getDataList()
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    changeRoleEvent (row) {
      this.roleParams = { ...row }
      if (row.roleInfoList && row.roleInfoList.length > 0) {
		  this.roleCode = { ...row.roleInfoList[0].roleCode }
      }
	  this.dialogChangeVisible = true
    },
    roleInfoQueryList () {
      const params = {}
      roleInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          this.roleInfoList = response.resultEntity
          console.log('responseresponse', response)
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // 更新
    async handleReset () {
      resetPassword(this.resetParam).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据插入结果，页面提示
          alert(response.resultMsg)
          // 修改提交后，关闭窗口
          this.dialogResetVisible = false
          // 页面刷新数据
          this.getDataList()
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    resetPassword (row) {
      this.resetParam = row
      this.dialogResetVisible = true
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
      accountInfoQueryListByPage(this.queryParam).then((response) => {
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
      accountInfoInsert(insertParam).then((response) => {
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
      accountInfoUpdate(editParam).then((response) => {
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
        userCode: this.delParam.userCode
      }
      accountInfoDelete(params).then((response) => {
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
      accountInfoQueryList(params).then((response) => {
        // 数据
        this.tableData = response.resultEntity
        console.log(this.tableData)
        outExportExcel(this.tableHeader, this.tableKey, this.tableData, '用户信息表')
      })
    }

  },
  async mounted () {
    await this.departmentInfoQueryList()
    await this.workstationInfoQueryList()
    this.getDataList()
    this.roleInfoQueryList()
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
