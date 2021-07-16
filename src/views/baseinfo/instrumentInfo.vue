<template>
	<div>
		<!-- 标题 -->
		<el-menu
				:default-active="activeIndex2"
				class="el-menu-demo"
				mode="horizontal"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b" >
			<el-menu-item index="1">仪器信息表</el-menu-item>
		</el-menu>
		<br />

		<!-- 查询区域 -->
		<el-row  >
			<el-col :span="22" class="grid">
				<!-- 输入框 -->
				<el-form ref="form" label-width="100px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="6" class="grid">
						<el-form-item label="仪器编码" style="width: 300px"  >
							<el-input v-model="queryParam.instrumentCode" placeholder="请输入仪器编码"></el-input>
						</el-form-item>
					</el-col>
				</el-form>
			</el-col>

			<el-col :span="22" class="grid" style="text-align: right">
				<!-- 按钮 -->
				<el-button
						type="success"
						@click="getDataList()"
						icon="el-icon-search"
						size="mini"
						round>查询</el-button>
				<el-button
						type="success"
						@click="resetForm()"
						icon="el-icon-refresh"
						size="mini"
						round>重置</el-button>
				<el-button
						type="success"
						@click="exportExecl()"
						icon="el-icon-download"
						size="mini"
						round>导出</el-button>
			</el-col>
		</el-row>
		<br />

		<!-- 功能按钮 -->
		<el-row style="left: 20px;width: 95%;">
			<el-col :span="1" class="grid" >
				<el-button
						type="success"
						@click="addData()"
						icon="el-icon-circle-plus-outline"
						size="mini"
						round>新增</el-button>
			</el-col>
		</el-row>
		<br />


		<!-- 表格 -->
		<el-table
				:data="dataList"
				border
				style="width: 100%"
				stripe
				ref="multipleTable"
				tooltip-effect="dark">
			<el-table-column label="序号" type="index" width="80px" align="center">
				<template slot-scope="scope">
					<span>{{ (page - 1) * size + scope.$index + 1 }}</span>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="instrumentCode" label="仪器编码"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="instrumentBrand" label="仪器品牌"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="instrumentName" label="仪器名称"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="instrumentStandards" label="规格"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="company" label="公司/单位"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间"></el-table-column>
			<el-table-column label="编辑" width="100">
				<template slot-scope="scope">
					<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="editData(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
			<el-table-column label="删除" width="100">
				<template slot-scope="scope">
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
				<el-form-item label="仪器编码" style="width: 500px" prop="instrumentCode" >
					<el-input v-model="insertParam.instrumentCode" placeholder="请输入仪器编码"></el-input>
				</el-form-item>
				<el-form-item label="仪器品牌" style="width: 500px"  >
					<el-input v-model="insertParam.instrumentBrand" placeholder="请输入仪器品牌"></el-input>
				</el-form-item>
				<el-form-item label="仪器名称" style="width: 500px"  >
					<el-input v-model="insertParam.instrumentName" placeholder="请输入仪器名称"></el-input>
				</el-form-item>
				<el-form-item label="规格" style="width: 500px"  >
					<el-input v-model="insertParam.instrumentStandards" placeholder="请输入规格"></el-input>
				</el-form-item>
				<el-form-item label="公司/单位" style="width: 500px"  >
					<el-input v-model="insertParam.company" placeholder="请输入公司/单位"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" style="width: 500px"  >
					<el-input v-model="insertParam.createTime" placeholder="请输入创建时间"></el-input>
				</el-form-item>
				<el-form-item label="更新时间" style="width: 500px"  >
					<el-input v-model="insertParam.updateTime" placeholder="请输入更新时间"></el-input>
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
				<el-form-item label="仪器编码" style="width: 500px" >
					<el-input v-model="editParam.instrumentCode" placeholder="请输入仪器编码" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="仪器品牌" style="width: 500px"  >
					<el-input v-model="editParam.instrumentBrand" placeholder="请输入仪器品牌"></el-input>
				</el-form-item>
				<el-form-item label="仪器名称" style="width: 500px"  >
					<el-input v-model="editParam.instrumentName" placeholder="请输入仪器名称"></el-input>
				</el-form-item>
				<el-form-item label="规格" style="width: 500px"  >
					<el-input v-model="editParam.instrumentStandards" placeholder="请输入规格"></el-input>
				</el-form-item>
				<el-form-item label="公司/单位" style="width: 500px"  >
					<el-input v-model="editParam.company" placeholder="请输入公司/单位"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" style="width: 500px"  >
					<el-input v-model="editParam.createTime" placeholder="请输入创建时间"></el-input>
				</el-form-item>
				<el-form-item label="更新时间" style="width: 500px"  >
					<el-input v-model="editParam.updateTime" placeholder="请输入更新时间"></el-input>
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
	//下载需要的API
	import { outExportExcel } from "@/api/mainApi";
	//引入API
	import {
			instrumentInfoQueryListByPage,
			instrumentInfoQueryList,
			instrumentInfoInsertList,
			instrumentInfoInsert,
			instrumentInfoUpdateList,
			instrumentInfoUpdate,
			instrumentInfoDelete
	}from "@/api/em-ep/instrumentInfoApi.js";

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
					"仪器编码",
					"仪器品牌",
					"仪器名称",
					"规格",
					"公司/单位",
					"创建时间",
					"更新时间",
				],
				//下载导出需要的表头对应的key
				tableKey: [
					"instrumentCode",
					"instrumentBrand",
					"instrumentName",
					"instrumentStandards",
					"company",
					"createTime",
					"updateTime",
				],
				//下载导出的数据集合
				tableData: [],
				//必填字段 前面加'*'
				rules: {
					instrumentCode:[{ required: true, message: "请输入", trigger: "blur" }],
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
				instrumentInfoQueryListByPage(this.queryParam).then((response) => {
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
				instrumentInfoInsert(insertParam).then((response) => {
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
				instrumentInfoUpdate(editParam).then((response) => {
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
					instrumentCode:this.delParam.instrumentCode,
				};
				instrumentInfoDelete(params).then((response) => {
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
				instrumentInfoQueryList(params).then((response) => {
					//数据
					this.tableData = response.resultEntity;
					console.log(this.tableData)
					outExportExcel(this.tableHeader, this.tableKey, this.tableData, "仪器信息表");
				});
			},


		},
		mounted() {
			this.getDataList();
		},
	};
</script>

<style>
	#app {
		font-family: Helvetica, sans-serif;
		text-align: center;
	}
</style>