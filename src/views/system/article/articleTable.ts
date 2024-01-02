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
    apiUrl: '/blogsArticle/page/info', // 请求的url
    apiMethod: 'get', // 请求方式
    isBorder: true, // 表格边框
  },

  columns: [
    { title: '标题', width: '', field: 'title' },
    { title: '发布人', width: '', field: 'userName' },
    { title: '阅读量', width: '', field: 'count' },
    { title: '发布时间', width: '', field: 'created' },
    { title: '更新时间', width: '', field: 'updatedTime' },
  ], // table
})
