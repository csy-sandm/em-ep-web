<template>
	<div class="box-container">
		<el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0px 15px 0px 15px;background:#F3F3F3;font-weight: bold;">
			<el-tab-pane label="角色管理" name="first"></el-tab-pane>
		</el-tabs>

		<div class="content-info" v-if="activeName === 'first'">
		<el-row style="margin-top: 20px;">
			<el-col class="grid" style="width:50%;float:left">
				<!-- 输入框 -->
				<el-form ref="form" label-width="120px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="8" class="grid">
						<el-form-item label="角色编码:" style="width: 300px"  >
							<el-input v-model="queryParam.roleCode" placeholder="请输入角色编码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" class="grid">
						<el-form-item label="角色名称:" style="width: 300px"  >
							<el-input v-model="queryParam.roleName" placeholder="请输入角色名称"></el-input>
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
			<el-table-column :show-overflow-tooltip="true" prop="roleCode" label="角色编码"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="roleName" label="角色名称"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="menuInfoList" label="菜单权限">
        <template slot-scope="scope">
					<span @click="changeMenuEvent(scope.row)" style="color:#409eff;cursor:pointer">{{ scope.row.menuInfoList && scope.row.menuInfoList.length > 0 ? scope.row.menuInfoList[0].menuName : '--'}}</span>
				</template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="workStation" label="工作站">
				<template slot-scope="scope">
					<span> {{ stationFilter(scope.row.workStation)}} </span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="roleStatus" label="角色状态 0:启用 -1:冻结">
        <template slot-scope="scope">
					<span> {{scope.row.roleStatus === '0' ? '启用' : '冻结'}} </span>
				</template>
      </el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="roleRemark" label="备注信息"></el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true" prop="parentRoleCode" label="父级角色ID"></el-table-column> -->
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
				<el-form-item label="角色编码" style="width: 50%;float: left;" :required="rules.roleCode" >
					<el-input v-model="insertParam.roleCode" placeholder="请输入角色编码"></el-input>
				</el-form-item>
				<el-form-item label="角色名称" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.roleName" placeholder="请输入角色名称"></el-input>
				</el-form-item>
        <el-form-item label="工作站" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="insertParam.workStation" placeholder="请选择工作站">
							<el-option
							v-for="item in workstationList"
							:key="item.stationId"
							:label="item.stationName"
							:value="item.stationId"/>
						</el-select>
				</el-form-item>
        <el-form-item label="角色状态" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="insertParam.roleStatus" placeholder="请选择角色状态">
							<el-option
							v-for="item in ruleStatusList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>

				<el-form-item label="备注信息" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.roleRemark" placeholder="请输入备注信息"></el-input>
				</el-form-item>
				<!-- <el-form-item label="父级角色ID" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.parentRoleCode" placeholder="请输入父级角色ID"></el-input>
				</el-form-item> -->
			</el-form>
			<span slot="footer" class="dialog-footer" >
        <el-button type="success" @click="insertData(insertParam)">保存</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">取消</el-button>
      </span>
		</el-dialog>

    <el-dialog
				title="菜单分配"
				style="text-align: left !important"
				:visible.sync="dialogChangeVisible"
				:before-close="handleClose" >
				<el-form ref="form" label-width="200px">

				<el-tree
          v-if="dialogChangeVisible"
          :data="menuList"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          :default-checked-keys="treeDataSelect"
          @check="handleCheckChange">
        </el-tree>

				</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleChange()">确定</el-button>
				<el-button type="primary" @click="dialogChangeVisible = false">取消</el-button>
			</span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="修改信息"
				   style="text-align: left !important"
				   :visible.sync="dialogEditVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px">
				<el-form-item label="角色编码" style="width: 50%;float: left;" >
					<el-input v-model="editParam.roleCode" placeholder="请输入角色编码" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="角色名称" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.roleName" placeholder="请输入角色名称"></el-input>
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
        <el-form-item label="角色状态" style="width: 50%;float: left;"  >
					<el-select style="width: 100%;" v-model="editParam.roleStatus" placeholder="请选择角色状态">
							<el-option
							v-for="item in ruleStatusList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="备注信息" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.roleRemark" placeholder="请输入备注信息"></el-input>
				</el-form-item>
				<!-- <el-form-item label="父级角色ID" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.parentRoleCode" placeholder="请输入父级角色ID"></el-input>
				</el-form-item> -->
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
  roleInfoQueryListByPage,
  roleInfoQueryList,
  roleInfoInsertList,
  roleInfoInsert,
  roleInfoUpdateList,
  roleInfoUpdate,
  roleInfoDelete
} from '@/api/login/roleInfoApi.js'

import {
  menuInfoQueryList
} from '@/api/login/menuInfoApi.js'

import {
  roleMenuDeleteList,
  roleMenuInsertList
} from '@/api/login/roleMenuApi.js'

import {
  workstationInfoQueryList
} from '@/api/login/workstationInfoApi.js'

export default {
  data () {
    return {
      ruleStatusList: [
        {
          value: '0',
		  name: '启用'
        },
        {
          value: '-1',
		  name: '冻结'
        }
      ],
      workstationList: [],
      menuList: [],
      treeDataSelect: [],
      menuCode: '',
      menuParams: [],
      dialogChangeVisible: false,
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
        '角色编码',
        '角色名称',
        '角色状态 0:启用 -1:冻结',
        '备注信息',
        '父级角色ID'
      ],
      // 下载导出需要的表头对应的key
      tableKey: [
        'roleCode',
        'roleName',
        'roleStatus',
        'roleRemark',
        'parentRoleCode'
      ],
      // 下载导出的数据集合
      tableData: [],
      // 必填字段 前面加'*'
      rules: {
        roleCode: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      selectedObj: []
    }
  },
  watch: {
    // 2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
    // 可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
    total () {
      if (this.total === (this.page - 1) * this.size && this.total !== 0) {
        this.page -= 1
        this.getDataList()
      }
    }
  },
  methods: {
    handleCheckChange (nodeObj, selectedObj) {
      this.selectedObj = selectedObj.checkedKeys
    },
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
    async handleChange () {
      console.log('this.menuParams', this.menuParams)
	  if (this.menuParams && this.menuParams.menuInfoList && this.menuParams.menuInfoList.length > 0) {
        const menuId = []
        for (const item of this.menuParams.menuInfoList) {
          menuId.push(item.menuId)
          if (item && item.menuInfoEntity) {
            for (const entity of item.menuInfoEntity) {
              menuId.push(entity.menuId)
            }
          }
        }

        const params = []
        for (const item of menuId) {
          const p = {}
          p.menuId = item
          p.roleCode = this.menuParams.roleCode
          params.push(p)
        }
        // const params = {
        //   roleCode: this.menuParams.roleCode,
        //   menuId: menuId
        // }
        await roleMenuDeleteList(params).then((response) => {
          const resultCode = response.resultCode
          if (resultCode === '2000') {

          } else {
          // 这个分支是错误返回分支
            alert(response.resultMsg)
          }
        })
	  }

      const ids = []
      for (const item of this.selectedObj) {
        console.log('item', item, item.length)
        if (item.length === 7) {
          ids.push(item.substr(0, 4))
        }
      }

      for (const id of ids) {
        if (this.selectedObj.indexOf(id) === -1) {
          this.selectedObj.unshift(id)
        }
      }

      const params = []
      for (const item of this.selectedObj) {
        const p = {}
        p.menuId = item
        p.roleCode = this.menuParams.roleCode
        params.push(p)
      }

      console.log('paramsparams', params)
      // const params = {
      //     roleCode: this.menuParams.roleCode,
      //     menuId: this.selectedObj
      //   }
      await roleMenuInsertList(params).then((response) => {
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
    async queryMenuList () {
      const params = {}
      menuInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          // 这里根据查询结果，赋值给页面
          const menuInit = response.resultEntity
          const menuDeal = []
          for (const item of menuInit) {
            if (item.parentId === '') {
              item.id = item.menuId
              item.label = item.menuName
              item.children = []
              menuDeal.push(item)
            }
          }

          for (const menu of menuInit) {
            if (menu.parentId !== '') {
              for (const deal of menuDeal) {
                if (deal.menuId === menu.parentId) {
                  menu.id = menu.menuId
                  menu.label = menu.menuName
                  deal.children.push(menu)
                }
              }
            }
          }
          this.menuList = menuDeal

          console.log('menuListmenuList', this.menuList)
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    changeMenuEvent (row) {
      console.log('rowrow', row.menuInfoList)
      // return
      this.menuParams = { ...row }
      this.treeDataSelect = []
      if (row.menuInfoList && row.menuInfoList.length > 0) {
        for (const item of this.menuParams.menuInfoList) {
          if (item && !item.menuInfoEntity) {
            this.treeDataSelect.push(item.menuId)
          }
          if (item && item.menuInfoEntity) {
            for (const entity of item.menuInfoEntity) {
              this.treeDataSelect.push(entity.menuId)
            }
          }
        }
      }

      this.treeDataSelect = JSON.parse(JSON.stringify(this.treeDataSelect))
      console.log('treeDataSelect', this.treeDataSelect)
      // return
      this.$nextTick(() => {
        this.$forceUpdate()
        // dom元素更新后执行，因此这里能正确打印更改之后的值
        this.dialogChangeVisible = true
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
      roleInfoQueryListByPage(this.queryParam).then((response) => {
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
      roleInfoInsert(insertParam).then((response) => {
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
      roleInfoUpdate(editParam).then((response) => {
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
        roleCode: this.delParam.roleCode
      }

      roleInfoDelete(params).then((response) => {
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
      roleInfoQueryList(params).then((response) => {
        // 数据
        this.tableData = response.resultEntity
        console.log(this.tableData)
        outExportExcel(this.tableHeader, this.tableKey, this.tableData, '角色表')
      })
    }

  },
  async mounted () {
    await this.workstationInfoQueryList()
    this.getDataList()
    this.queryMenuList()
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
