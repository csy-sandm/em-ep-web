<template>
	<div class="box-container">
		<el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0px 15px 0px 15px;background:#F3F3F3;font-weight: bold;">
			<el-tab-pane label="站点管理" name="first"></el-tab-pane>
		</el-tabs>

		<div class="content-info" v-if="activeName === 'first'">
		<el-row style="margin-top: 20px;">
			<el-col class="grid" style="width:70%;float:left">
				<!-- 输入框 -->
				<el-form ref="form" label-width="120px" >
					<!-- 如果怎加查询条件个数，复制以下  el-col 块 进行修改即可 -->
					<el-col :span="6" class="grid">
						<el-form-item label="站点编号:" style="width: 300px"  >
							<el-input v-model="queryParam.siteId" placeholder="请输入站点编号"></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="6" class="grid">
						<el-form-item label="责任部门:" style="width: 300px"  >
							<el-input v-model="queryParam.responsiblerDepart" placeholder="请输入责任部门"></el-input>
						</el-form-item>
					</el-col> -->

					<el-col :span="6" class="grid">
						<el-form-item label="责任部门:" style="width: 300px"  >
							<el-select v-model="queryParam.responsiblerDepart" placeholder="请选择责任部门">
							<el-option
							v-for="item in responsiblerDepartListAll"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="6" class="grid">
						<el-form-item label="站点类型:" style="width: 300px"  >
							<el-select v-model="queryParam.siteType" placeholder="请选择站点类型">
							<el-option
							v-for="item in siteTypeListAll"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="6" class="grid">
						<el-form-item label="运维责任人:" style="width: 300px"  >
							<el-input v-model="queryParam.responsiblerPerson" placeholder="请输入运维责任人"></el-input>
						</el-form-item>
					</el-col>

					<!-- <el-col :span="6" class="grid">
						<el-form-item label="MN编号状态:" style="width: 300px"  >
							<el-select v-model="queryParam.status" placeholder="请选择MN编号状态">
							<el-option
							v-for="item in statusList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
						</el-form-item>
					</el-col> -->

					<el-col :span="6" class="grid">
						<el-form-item label="MN编号:" style="width: 300px"  >
							<el-input v-model="queryParam.mnCode" placeholder="请输入MN编号"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="6" class="grid">
						<el-form-item label="运维状态:" style="width: 300px"  >
							<el-select v-model="queryParam.status" placeholder="请选择运维状态">
							<el-option
							v-for="item in statusListAll"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="6" class="grid">
						<el-form-item label="多少天未运维:" style="width: 300px"  >
							<el-select v-model="queryParam.time" placeholder="请选择时间">
							<el-option
							v-for="item in timeList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
						</el-form-item>
					</el-col>

				</el-form>
			</el-col>

			<el-col :span="22" class="grid" style="width:30%;float:left;text-align: right">
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
			<el-table-column :show-overflow-tooltip="true"  prop="siteId" label="站点编号"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="siteName" label="站点名称"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="siteType" label="站点类型"></el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true"  prop="responsiblerDepart" label="责任部门"></el-table-column> -->
			<el-table-column :show-overflow-tooltip="true"  prop="responsiblerPerson" label="责任人"></el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true"  prop="remark" label="备注"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="mnCode" label="现场MN编号"></el-table-column> -->
			<el-table-column :show-overflow-tooltip="true"  prop="status" label="运维状态"></el-table-column>
			<!-- <el-table-column :show-overflow-tooltip="true"  prop="siteLon" label="站点经度"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="siteLat" label="站点纬度"></el-table-column> -->
			<!-- <el-table-column :show-overflow-tooltip="true" :formatter="formatDate" prop="lastServicesTime" label="最后一次服务时间"></el-table-column> -->
			<!-- <el-table-column :show-overflow-tooltip="true" :formatter="formatDate" prop="createTime" label="创建时间"></el-table-column>
			<el-table-column :show-overflow-tooltip="true"  prop="creator" label="创建人"></el-table-column> -->
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button
							type="primary"
							icon="el-icon-info"
							size="mini"
							@click="viewData(scope.row)"></el-button>
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

		<!-- 新增弹出框  -->
		<el-dialog title="新增信息"
				   style="text-align: left !important"
				   :visible.sync="dialogAddVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px" :model="insertParam"  :rules="rules"  >
				<el-form-item label="站点编号" style="width: 50%;float: left;" prop="siteId" >
					<el-input v-model="insertParam.siteId"   placeholder="请输入站点编号"></el-input>
				</el-form-item>
				<el-form-item label="站点名称" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.siteName"   placeholder="请输入站点名称"></el-input>
				</el-form-item>
				<el-form-item label="站点类型" style="width: 50%;float: left;"  >
					<el-select v-model="insertParam.siteType" placeholder="请选择站点类型" style="width: 100%;">
						<el-option
						v-for="item in siteTypeList"
						:key="item.value"
						:label="item.name"
						:value="item.value"/>
					</el-select>
				</el-form-item>
				<el-form-item label="责任部门" style="width: 50%;float: left;"  >
					<el-select v-model="insertParam.responsiblerDepart" placeholder="请选择责任部门" style="width: 100%;">
						<el-option
						v-for="item in responsiblerDepartList"
						:key="item.value"
						:label="item.name"
						:value="item.value"/>
					</el-select>
					<!-- <el-input v-model="insertParam.responsiblerDepart"   placeholder="请输入责任部门"></el-input> -->
				</el-form-item>
				<el-form-item label="关系责任人" style="width: 50%;float: left;"  >
					<el-select v-model="insertParam.responsiblerPerson" placeholder="请选择关系责任人" style="width: 100%;">
						<el-option
						v-for="item in accountInfoList"
						:key="item.value"
						:label="item.name"
						:value="item.value"/>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.remark"   placeholder="请输入备注"></el-input>
				</el-form-item>
				<el-form-item label="现场机MN编号" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.mnCode"   placeholder="请输入现场机MN编号"></el-input>
				</el-form-item>
				<el-form-item label="设备地址" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.address" placeholder="请选择设备地址"></el-input>
				</el-form-item>
				<div style="width: 50%;float: left;height: 40px;margin-left:72%"><div @click="handleMapPointEvent()" style="color:#0000EE;">地图选点</div></div>
				<el-form-item label="站点经度" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.siteLon"   placeholder="请输入站点经度"></el-input>
				</el-form-item>
				<el-form-item label="站点纬度" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.siteLat"   placeholder="请输入站点纬度"></el-input>
				</el-form-item>
				<el-form-item label="运维状态" style="width: 50%;float: left;"  >
					<el-select v-model="insertParam.status" placeholder="请选择运维状态" style="width: 100%;">
							<el-option
							v-for="item in statusList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="最后一次服务时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.lastServicesTime"
						type="datetime"
						placeholder="请输入最后一次服务时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="创建时间" style="width: 50%;float: left;"  >
					<el-date-picker
						style="width: 100%;"
						v-model="insertParam.createTime"
						type="datetime"
						placeholder="请输入创建时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="创建人" style="width: 50%;float: left;"  >
					<el-input v-model="insertParam.creator"   placeholder="请输入创建人"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer" >
        <el-button type="success" @click="insertData(insertParam)">保存</el-button>
        <el-button type="primary" @click="dialogAddVisible = false">取消</el-button>
      </span>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog :title="editSwitch === true ? '修改信息' : '查看信息'"
				   style="text-align: left !important"
				   :visible.sync="dialogEditVisible"
				   :before-close="handleClose">
			<el-form ref="form" label-width="200px">
				<el-form-item label="站点编号" style="width: 50%;float: left;" >
					<el-input v-model="editParam.siteId"  placeholder="请输入站点编号" :disabled="true" ></el-input>
				</el-form-item>
				<el-form-item label="站点名称" style="width: 50%;float: left;" >
					<el-input v-model="editParam.siteName"  placeholder="请输入站点名称" :disabled="!editSwitch"></el-input>
				</el-form-item>
				<el-form-item label="站点类型" style="width: 50%;float: left;" >
					<el-select v-model="editParam.siteType" placeholder="请选择站点类型" :disabled="!editSwitch" style="width: 100%;">
						<el-option
						v-for="item in siteTypeList"
						:key="item.value"
						:label="item.name"
						:value="item.value"/>
					</el-select>
				</el-form-item>
				<el-form-item label="责任部门" style="width: 50%;float: left;" >
					<el-select v-model="editParam.responsiblerDepart" placeholder="请选择责任部门" :disabled="!editSwitch" style="width: 100%;">
						<el-option
						v-for="item in responsiblerDepartList"
						:key="item.value"
						:label="item.name"
						:value="item.value"/>
					</el-select>

					<!-- <el-input v-model="editParam.responsiblerDepart"  placeholder="请输入责任部门"  ></el-input> -->
				</el-form-item>
				<el-form-item label="关系责任人" style="width: 50%;float: left;" >
					<el-select v-model="editParam.responsiblerPerson" placeholder="请选择关系责任人" :disabled="!editSwitch" style="width: 100%;">
						<el-option
						v-for="item in accountInfoList"
						:key="item.value"
						:label="item.name"
						:value="item.value"/>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" style="width: 50%;float: left;" >
					<el-input v-model="editParam.remark"  placeholder="请输入备注"  :disabled="!editSwitch"></el-input>
				</el-form-item>
				<el-form-item label="现场机MN编号" style="width: 50%;float: left;" >
					<el-input v-model="editParam.mnCode"  placeholder="请输入现场机MN编号" :disabled="!editSwitch" ></el-input>
				</el-form-item>
				<el-form-item label="设备地址" style="width: 50%;float: left;" :disabled="!editSwitch" >
					<el-input v-model="editParam.address" placeholder="请选择设备地址"></el-input>
				</el-form-item>
				<div style="width: 50%;float: left;height: 40px;margin-left:72%"><div @click="handleMapPointEvent()" style="color:#0000EE;">地图选点</div></div>
				<el-form-item label="站点经度" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.siteLon"  placeholder="请输入站点经度"  :disabled="!editSwitch"></el-input>
				</el-form-item>
				<el-form-item label="站点纬度" style="width: 50%;float: left;"  >
					<el-input v-model="editParam.siteLat"  placeholder="请输入站点纬度"  :disabled="!editSwitch"></el-input>
				</el-form-item>
				<el-form-item label="运维状态" style="width: 50%;float: left;" >
					<el-select v-model="editParam.status" placeholder="请选择运维状态" :disabled="!editSwitch" style="width: 100%;">
							<el-option
							v-for="item in statusList"
							:key="item.value"
							:label="item.name"
							:value="item.value"/>
						</el-select>
				</el-form-item>
				<el-form-item label="最后一次服务时间" style="width: 50%;float: left;" >
					<el-date-picker
						:disabled="!editSwitch"
						style="width: 100%;"
						v-model="editParam.lastServicesTime"
						type="datetime"
						placeholder="请输入最后一次服务时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="创建时间" style="width: 50%;float: left;" >
					<el-date-picker
						:disabled="!editSwitch"
						style="width: 100%;"
						v-model="editParam.createTime"
						type="datetime"
						placeholder="请输入创建时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="创建人" style="width: 50%;float: left;" >
					<el-input v-model="editParam.creator"  placeholder="请输入创建人" :disabled="!editSwitch"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button type="success" @click="updateData(editParam)" v-if="editSwitch">提交</el-button>
        <el-button type="primary" @click="dialogEditVisible = false" v-if="editSwitch">取消</el-button>
		<el-button type="primary" @click="dialogEditVisible = false" v-if="!editSwitch">确定</el-button>
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

		<el-dialog
			title="请选择坐标点"
			style="text-align: left !important"
			:visible.sync="mapVisible"
			:before-close="handleClose" >
			<div class="map-dialog">
				<div class="toolbar">
					当前坐标: {{ lng }}, {{ lat }}
					address: {{ address ? address : '暂无'}}
					<el-button style="margin-left:40px" type="primary" @click="handleSelectEvent()">确定</el-button>
				</div>
				<el-amap vid="amap" :zoom="11" :plugin="plugin" class="amap-demo" :center="center" :events="events">
				</el-amap>
			</div>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="mapVisible = false">确定</el-button>
				<el-button type="primary" @click="mapVisible = false">取消</el-button>
			</span> -->
		</el-dialog>

		</div>
	</div>
</template>

<script>
import mapStyle from '../index/map/map.js'
// 下载需要的API
import { outExportExcel } from '@/api/mainApi'
// 引入API
import {
  siteInfoQueryListByPage,
  siteInfoQueryList,
  siteInfoInsertList,
  siteInfoInsert,
  siteInfoUpdateList,
  siteInfoUpdate,
  siteInfoDelete
} from '@/api/em-ep/siteInfoApi.js'

import {
  accountInfoQueryList
} from '@/api/login/accountInfoApi.js'

import {
  departmentInfoQueryList
} from '@/api/login/departmentInfoApi.js'

import {
  siteTypeQueryList
} from '@/api/em-ep/siteTypeApi.js'

import {
  mnStatusQueryList
} from '@/api/em-ep/mnStatusApi.js'

import {
  repairStatusCopyQueryList
} from '@/api/em-ep/repairStatusCopyApi.js'

export default {
  data () {
    const self = this
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
        '站点编号',
        '站点名称',
        '站点类型',
        '责任部门',
        '关系责任人',
        '备注',
        '现场机MN编号',
        '运维状态',
        '最后一次服务时间',
        '创建时间',
        '创建人'
      ],
      // 下载导出需要的表头对应的key
      tableKey: [
        'siteId',
        'siteName',
        'siteType',
        'responsiblerDepart',
        'responsiblerPerson',
        'remark',
        'mnCode',
        'status',
        'lastServicesTime',
        'createTime',
        'creator'
      ],
      // 下载导出的数据集合
      tableData: [],
      // 必填字段 前面加'*'
      rules: {
        siteId: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
	  responsiblerDepartListAll: [],
      responsiblerDepartList: [],
	  siteTypeListAll: [],
      siteTypeList: [],
	  statusListAll: [],
	  statusList: [],
	  accountInfoList: [],
	  accountInfoListAll: [],
	  timeList: [
		  {
			  name: '---',
			  value: '---'
		  },
		  {
			  name: '>10天',
			  value: '>10天'
		  },
		  {
			  name: '>20天',
			  value: '>20天'
		  },
		  {
			  name: '>1个月',
			  value: '>1个月'
		  },
		  {
			  name: '>2个月',
			  value: '>3个月'
		  }
      ],
	  editSwitch: false,
	  mapVisible: false,
	  center: [120.729401, 33.180512],
	  events: {
        init (o) {
          o.setMapStyle('amap://styles/darkblue')
        },
        click (e) {
          const { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      },
	  searchOption: {
        city: '上海',
        citylimit: false
      },
	  address: '',
      lng: 0,
      lat: 0
    }
  },
  watch: {
    // 2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
    // 可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
    total () {
      if (this.total === (this.page - 1) * this.size && this.total != 0) {
        this.page -= 1
        this.getDataList()
      }
    }
  },
  methods: {
    handleSelectEvent () {
      if (this.dialogAddVisible === true) {
        this.insertParam.siteLon = this.lng
        this.insertParam.siteLat = this.lat
        this.insertParam.address = this.address
      } else {
        this.editParam.siteLon = this.lng
        this.editParam.siteLat = this.lat
        this.editParam.address = this.address
	  }
	  this.mapVisible = false
	  console.log('insertParaminsertParam', this.insertParam)
	  this.$forceUpdate()
    },
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi
          lngSum += lng
          latSum += lat
        })
        const center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    },
    handler ({ BMap, map }) {
      // const mapStyle = { style: 'midnight' }
      // map.setMapStyle(mapStyle)
      map.setMapStyle({
        styleJson: mapStyle
      })
    },
    handleMapPointEvent () {
      this.mapVisible = true
    },
    async repairStatusCopyQueryList () {
      const params = {}
      repairStatusCopyQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          this.statusListAll = []
          this.statusList = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.statusListAll.push(info)

          if (response && response.resultEntity) {
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].statusName
              info.name = response.resultEntity[i].statusName
              this.statusList.push(info)
              this.statusListAll.push(info)
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    // async mnStatusQueryList () {
    //   const params = {}
    //   mnStatusQueryList(params).then((response) => {
    //     const resultCode = response.resultCode
    //     if (resultCode === '2000') {
    //       this.statusList = []
    //       const info = {}
    //       info.value = '全部'
    //       info.name = '全部'
    //       this.statusList.push(info)

    //       if (response && response.resultEntity) {
    //         for (let i = 0; i < response.resultEntity.length; i++) {
    //           const info = {}
    //           info.value = response.resultEntity[i].statusName
    //           info.name = response.resultEntity[i].statusName
    //           this.statusList.push(info)
    //         }
    //       }
    //     } else {
    //       // 这个分支是错误返回分支
    //       alert(response.resultMsg)
    //     }
    //   })
    // },
    // 账号
    async accountInfoQueryList () {
      const params = {}
      accountInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          this.accountInfoList = []
		  this.accountInfoListAll = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.accountInfoListAll.push(info)

          if (response && response.resultEntity) {
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].userName
              info.name = response.resultEntity[i].userName
              this.accountInfoList.push(info)
			  this.accountInfoListAll.push(info)
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },

    async siteTypeQueryList () {
      const params = {}
      siteTypeQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          this.siteTypeList = []
		  this.siteTypeListAll = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.siteTypeListAll.push(info)

          if (response && response.resultEntity) {
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].typeName
              info.name = response.resultEntity[i].typeName
              this.siteTypeList.push(info)
			  this.siteTypeListAll.push(info)
            }
          }
        } else {
          // 这个分支是错误返回分支
          alert(response.resultMsg)
        }
      })
    },
    async departmentInfoQueryList () {
      const params = {}
      departmentInfoQueryList(params).then((response) => {
        const resultCode = response.resultCode
        if (resultCode === '2000') {
          this.responsiblerDepartListAll = []
		  this.responsiblerDepartList = []
          const info = {}
          info.value = '全部'
          info.name = '全部'
          this.responsiblerDepartListAll.push(info)

          if (response && response.resultEntity) {
            for (let i = 0; i < response.resultEntity.length; i++) {
              const info = {}
              info.value = response.resultEntity[i].departName
              info.name = response.resultEntity[i].departName
              this.responsiblerDepartListAll.push(info)
			  this.responsiblerDepartList.push(info)
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
    tabRowClassName ({ row, rowIndex }) {
      const index = rowIndex + 1
      if (index % 2 === 0) {
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
      if (this.queryParam && this.queryParam.responsiblerDepart === '全部') {
		  this.queryParam.responsiblerDepart = ''
	  }

	  if (this.queryParam && this.queryParam.siteType === '全部') {
		  this.queryParam.siteType = ''
	  }

	  if (this.queryParam && this.queryParam.status === '全部') {
		  this.queryParam.status = ''
	  }

      siteInfoQueryListByPage(this.queryParam).then((response) => {
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
      this.insertParam.createTime = new Date()
      this.insertParam.creator = localStorage.getItem('userName')
	  this.insertParam.address = ''
    },
    // 插入
    async insertData (insertParam) {
      siteInfoInsert(insertParam).then((response) => {
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
    viewData (row) {
	  this.editSwitch = false
      // 这里需要深度克隆，不然，修改时页面会直接一起变
      this.editParam = JSON.parse(JSON.stringify(row))
      this.dialogEditVisible = true
    },

    // 编辑 弹出框
    editData (row) {
      this.editSwitch = true
      // 这里需要深度克隆，不然，修改时页面会直接一起变
      this.editParam = JSON.parse(JSON.stringify(row))
      //   this.editParam.address = ''
      this.dialogEditVisible = true
    },
    // 更新
    async updateData (editParam) {
      siteInfoUpdate(editParam).then((response) => {
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
        siteId: this.delParam.siteId
      }
      siteInfoDelete(params).then((response) => {
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
      siteInfoQueryList(params).then((response) => {
        // 数据
        this.tableData = response.resultEntity
        console.log(this.tableData)
        outExportExcel(this.tableHeader, this.tableKey, this.tableData, '站点信息')
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
    this.repairStatusCopyQueryList()
    // this.mnStatusQueryList()
    this.siteTypeQueryList()
    this.departmentInfoQueryList()
    this.accountInfoQueryList()
    // this.departInfoQueryList()
    this.getDataList()
  }
}
</script>

<style lang="scss" scoped>
.box-container{
    background: white;
    margin: 35px 15px;
}

.map-dialog{
	width: 100%;
    height: 500px;
    .map {
        width: 100%;
        height: 100%;
    }
}

.amap-demo {
	margin-top: 10px;
	height: 450px;
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
