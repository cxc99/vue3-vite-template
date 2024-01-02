import { fa } from "element-plus/es/locale";

export const example = ref({
  /** 以下是表单查询配置 GroupInout  */
  form: {},

  formItem: [
    // {
    //   key: "stortActivityId",
    //   type: "input",
    //   placeholder: "请输入活动ID",
    //   span: 6,
    // },
  ],

  /** 以下是查询条件配置 GroupInout*/
  config: {
    isBack: true, // 返回按钮
    isRefresh: true, // 刷新按钮
    isBorder: false, // 边框
  },

  /** 以下是table配置  TableTmp*/
  tableConfig: {
    apiUrl: "/store/activity/getPage", // 请求的url
    apiMethod: "post", // 请求方式
    isBorder: true, // 表格边框
  },

  columns: [
    { title: "活动ID", width: "", field: "stortActivityId" },
    { title: "商城活动名称", width: "", field: "stortActivityName" },
    { title: "商城活动代码", width: "", field: "stortActivityCode" },
    { title: "银行名称", width: "", field: "staffBankName" },
    { title: "银行code", width: "", field: "bankCode" },
    { title: "活动状态", width: "", field: "stortActivityStatus" },
    { title: "活动类型", width: "", field: "stortActivityType" },
    { title: "开始时间", width: "", field: "startTime" },
    { title: "结束时间", width: "", field: "endTime" },
  ], // table
});
