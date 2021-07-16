<template>
	<div>
		<!-- 标题 class="el-menu-demo"-->
		<el-menu
				:default-active="activeIndex2"
				class="title-info"
				mode="horizontal"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b" >
			<el-menu-item index="1">工单分析</el-menu-item>
		</el-menu>
		<br />


		<div class="content-info">
		<!-- 查询区域 -->
		<el-row style="padding:10px">
			<el-col class="grid">
				<!-- 输入框 -->
				<el-form ref="form" label-width="120px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="6" class="grid">
						<el-form-item label="工单处理人" style="width: 300px"  >
							<el-input v-model="queryParam.responsiblerPerson" placeholder="请输入工单处理人"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>

			<el-col :span="22" class="grid" style="text-align: right">
				<!-- 按钮 -->
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
		<br />

		<!-- 功能按钮 -->
		<el-row style="left: 20px;width: 95%;">
			<el-col :span="1" class="grid" >
				<el-button
						class="add-button"
						type="primary"
						@click="addData()"
						icon="el-icon-circle-plus-outline"
						size="mini" >新增</el-button>
			</el-col>
		</el-row>
		<br />


		<!-- 表格 -->
		<el-table
				:data="dataList"
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
			<el-table-column :show-overflow-tooltip="true"  prop="responsiblerPerson" label="工单处理人"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="responsiblerDepart" label="所属部门"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="completeNum" label="完工工单总数"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="normalCompleteNum" label="正常完工工单总数"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="orderNum" label="工单总数"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="completeRate" label="任务完成率"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="completePlanRate" label="完工计划性"></el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="editData(scope.row)">编辑</el-button>
					<el-button
							type="danger"
							icon="el-icon-delete"
							size="mini"
							@click="delData(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->
		<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page"
				:page-sizes="[5, 10, 15, 20]"
				:page-size="size"
				style="float: right"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
		</el-pagination>


		<!-- 新增弹出框  -->
		<el-dialog title="新增信息"
				   style="text-align: left !important"
				   :visible.sync="dialogAddVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px" :model="insertParam"  :rules="rules"  >
				<el-form-item label="工单处理人" style="width: 500px" prop="responsiblerPerson" >
					<el-input v-model="insertParam.responsiblerPerson"   placeholder="请输入工单处理人"></el-input>
				</el-form-item>
				<el-form-item label="所属部门" style="width: 500px"  >
					<el-input v-model="insertParam.responsiblerDepart"   placeholder="请输入所属部门"></el-input>
				</el-form-item>
				<el-form-item label="完工工单总数" style="width: 500px"  >
					<el-input v-model="insertParam.completeNum"   placeholder="请输入完工工单总数"></el-input>
				</el-form-item>
				<el-form-item label="正常完工工单总数" style="width: 500px"  >
					<el-input v-model="insertParam.normalCompleteNum"   placeholder="请输入正常完工工单总数"></el-input>
				</el-form-item>
				<el-form-item label="工单总数" style="width: 500px"  >
					<el-input v-model="insertParam.orderNum"   placeholder="请输入工单总数"></el-input>
				</el-form-item>
				<el-form-item label="任务完成率" style="width: 500px"  >
					<el-input v-model="insertParam.completeRate"   placeholder="请输入任务完成率"></el-input>
				</el-form-item>
				<el-form-item label="完工计划性" style="width: 500px"  >
					<el-input v-model="insertParam.completePlanRate"   placeholder="请输入完工计划性"></el-input>
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
				<el-form-item label="工单处理人" style="width: 500px" >
					<el-input v-model="editParam.responsiblerPerson"  placeholder="请输入工单处理人" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="所属部门" style="width: 500px" >
					<el-input v-model="editParam.responsiblerDepart"  placeholder="请输入所属部门"  ></el-input>
				</el-form-item>
				<el-form-item label="完工工单总数" style="width: 500px" >
					<el-input v-model="editParam.completeNum"  placeholder="请输入完工工单总数"  ></el-input>
				</el-form-item>
				<el-form-item label="正常完工工单总数" style="width: 500px" >
					<el-input v-model="editParam.normalCompleteNum"  placeholder="请输入正常完工工单总数"  ></el-input>
				</el-form-item>
				<el-form-item label="工单总数" style="width: 500px" >
					<el-input v-model="editParam.orderNum"  placeholder="请输入工单总数"  ></el-input>
				</el-form-item>
				<el-form-item label="任务完成率" style="width: 500px" >
					<el-input v-model="editParam.completeRate"  placeholder="请输入任务完成率"  ></el-input>
				</el-form-item>
				<el-form-item label="完工计划性" style="width: 500px" >
					<el-input v-model="editParam.completePlanRate"  placeholder="请输入完工计划性"  ></el-input>
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
	//下载需要的API
	import { outExportExcel } from "@/api/mainApi";
	//引入API
	import {
			orderAnalysisQueryListByPage,
			orderAnalysisQueryList,
			orderAnalysisInsertList,
			orderAnalysisInsert,
			orderAnalysisUpdateList,
			orderAnalysisUpdate,
			orderAnalysisDelete
	}from "@/api/em-ep/orderAnalysisApi.js";

	export default {
		data() {
			return {
				//控制 新增弹出框是否显示
				dialogAddVisible: false,
				//控制 修改弹出框是否显示
				dialogEditVisible: false,
				//控制 删除弹出框是否显示
				dialogDelVisible: false,
				//tab 页的形式设定
				activeIndex2: "1",
				//下面三个参数事分页需要的参数
				total: 0,
				size: 5,
				page: 1,
				//查询条件
				queryParam:{},
				//后台返回的数据列表
				dataList: [],
				//插入时的参数
				insertParam: {},
				//编辑时的参数
				editParam: {},
				//删除时的参数
				delParam: {},
				//下载导出需要的表头
				tableHeader: [
					"工单处理人",
					"所属部门",
					"完工工单总数",
					"正常完工工单总数",
					"工单总数",
					"任务完成率",
					"完工计划性",
				],
				//下载导出需要的表头对应的key
				tableKey: [
					"responsiblerPerson",
					"responsiblerDepart",
					"completeNum",
					"normalCompleteNum",
					"orderNum",
					"completeRate",
					"completePlanRate",
				],
				//下载导出的数据集合
				tableData: [],
				//必填字段 前面加'*'
				rules: {
					responsiblerPerson:[{ required: true, message: "请输入", trigger: "blur" }],
				}

			};
		},
		watch: {
			//2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
			//可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
			total() {
				if (this.total == (this.page - 1) * this.size && this.total != 0) {
					this.page -= 1;
					this.getDataList();
				}
			},
		},
		methods: {

			handleClose(done) {
				done();
			},

			handleSizeChange(val) {
				this.size = val;
				this.getDataList();
			},

			handleCurrentChange(val) {
				this.page = val;
				this.getDataList();
			},

			//查询
			async getDataList() {
				this.queryParam.pageNum=this.page;
				this.queryParam.pageSize=this.size;
				orderAnalysisQueryListByPage(this.queryParam).then((response) => {
					let resultCode = response.resultCode;
					if ("2000" === resultCode) {
						//这里根据查询结果，赋值给页面
						this.total = response.resultEntity.total
						this.dataList = response.resultEntity.list
					} else {
						//这个分支是错误返回分支
						alert(response.resultMsg);
					}
				});
			},
			//查询条件重置
			resetForm(){
				this.queryParam = {};
				this.queryParam.pageNum = this.page;
				this.queryParam.pageSize = this.size;
			},

			//新增  弹出框
			addData(){
				this.dialogAddVisible = true;
				this.insertParam={};
			},
			//插入
			async insertData(insertParam) {
				orderAnalysisInsert(insertParam).then((response) => {
					let resultCode = response.resultCode;
					if ("2000" === resultCode) {
						//这里根据插入结果，页面提示
						alert(response.resultMsg);
						//新增保存后，关闭窗口
						this.dialogAddVisible = false;
						// 刷新界面
						this.getDataList();
					} else {
						//这个分支是错误返回分支
						alert(response.resultMsg);
					}
				});
			},

			//编辑 弹出框
			editData(row) {
				//这里需要深度克隆，不然，修改时页面会直接一起变
				this.editParam = JSON.parse(JSON.stringify(row));
				this.dialogEditVisible = true;
			},
			//更新
			async updateData(editParam) {
				orderAnalysisUpdate(editParam).then((response) => {
					let resultCode = response.resultCode;
					if ("2000" === resultCode) {
						//这里根据插入结果，页面提示
						alert(response.resultMsg);
						//修改提交后，关闭窗口
						this.dialogEditVisible = false;
						//页面刷新数据
						this.getDataList();
					} else {
						//这个分支是错误返回分支
						alert(response.resultMsg);
					}
				});
			},

			//删除
			delData(row) {
				this.delParam = row;
				this.dialogDelVisible = true;
			},
			//执行删除接口
			async handleDel() {
				let params = {
					responsiblerPerson:this.delParam.responsiblerPerson,
				};
				orderAnalysisDelete(params).then((response) => {
					let resultCode = response.resultCode;
					if ("2000" === resultCode) {
						//这里根据插入结果，页面提示
						alert(response.resultMsg);
						this.dialogDelVisible = false;
						//页面刷新数据
						this.getDataList();
					} else {
						//这个分支是错误返回分支
						alert(response.resultMsg);
					}
				});
			},
			//导出数据为execl
			async exportExecl() {
				//全量查询数据，这里可以后期修改成分页查询等
				let params = {};
				orderAnalysisQueryList(params).then((response) => {
					//数据
					this.tableData = response.resultEntity;
					console.log(this.tableData)
					outExportExcel(this.tableHeader, this.tableKey, this.tableData, "工单分析");
				});
			},
			formatDate(row, column) {
				// 获取单元格数据
				let data = row[column.property]
				if(data == null) {
					return null
				}
				let dt = new Date(data)
				return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
			},

		},
		mounted() {
			this.getDataList();
		},
	};
</script>

<style lang="scss" scoped>
	#app {
		font-family: Helvetica, sans-serif;
		text-align: center;
	}

	//覆盖 el-button 样式
	.serach-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
	}

	.refresh-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
	}

	.export-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
	}

	.add-button{
		color:white;
		background: #0F6CC3 ;
		opacity: 0.8;
		border-radius: 3px;
	}

	.planWorkorderInfo-container{
		background: #F3F3F3;
		height: 100%;
		display: flex;
		flex-direction: column;
		.title-info{
			height: 20px;
			padding: 20px 0px 0px 20px;
		}
		.content-info{
			flex: 1;
			background: white;
			margin: 10px;
		}
		::v-deep{
			.el-breadcrumb__inner {
				color: #313E5D;
				font-size: 17px;
			}

			.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
				font-weight: 400;
				color: #313E5D;
				cursor: text;
			}

			.el-breadcrumb__separator {
				margin: 0 9px;
				font-weight: 700;
				color: #313E5D;
			}

			.el-input__inner {
				-webkit-appearance: none;
				background-color: #FFF;
				background-image: none;
				border-radius: 4px;
				border: 1px solid #DCDFE6;
				box-sizing: border-box;
				color: #606266;
				display: inline-block;
				font-size: inherit;
				height: 30px;
				line-height: 30px;
				outline: 0;
				padding: 0 15px;
				transition: border-color .2s cubic-bezier(.645,.045,.355,1);
				width: 100%;
			}

			.el-form-item {
				margin-bottom: 10px;
			}

			.el-table__empty-block {
				text-align: center;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.el-pagination {
				white-space: nowrap;
				padding: 10px 10px;
				color: #303133;
				font-weight: 700;
			}
			.el-table .double-row{
				background:#C3D2E6
			}

			.el-table__body, .el-table__footer, .el-table__header {
				table-layout: fixed;
				border-collapse: separate;
				color: #313E5D;
			}
		}
	}
</style>