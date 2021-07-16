<template>
  <div>
    <button
      @click="handeleOutExportExcel"
      class="export-btn"
      size="mini"
      type="primary"
    >
      导出数据
    </button>
  </div>
</template>

<script>
// 引入上文中公众文件方法中的导出功能，注意文件路径
import { outExportExcel } from "@/api/roleInfoApi";
export default {
  data() {
    return {
      tableData: [
        {
          number: 1,
          name: "王大锤",
          grade: 98,
        },
        {
          number: 2,
          name: "兆丰都",
          grade: 76,
        },
        {
          number: 3,
          name: "吕凤丹",
          grade: 82,
        },
      ],
    };
  },

  created() {
    // ..... 从后端请求表格数据
  },

  methods: {
    handeleOutExportExcel() {
      const { tableData } = this;
      const tableHeader = ["学号", "姓名", "语文成绩"];
      const tableKey = ["number", "name", "grade"];

      console.log(tableData)
      console.log(this.tableData)
      outExportExcel(tableHeader, tableKey, tableData, "蓝思同学学校成绩报");
    },
  },
};
</script>