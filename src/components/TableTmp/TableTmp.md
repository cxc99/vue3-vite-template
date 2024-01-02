### 有点东西的表格使用案例

```vue
<template>
  <!-- 模板使用 -->
  <div class="bg-[#ffffff] p-10px">
    <!-- ## GroupInout 文档请看 /components/GroupInout/index.vue -->
    <GroupInout
      @onRefresh="onRefresh"
      v-model:form="example.form"
      :formItem="example.formItem"
      :config="example.config"></GroupInout>
    <TableTmp
      ref="table"
      :form="example.form"
      :columns="example.columns"
      :config="example.tableConfig">
      <!-- 动态插槽例子 -->
      <!-- <template #staffBankName="{ value }">
        {{ value + " 审核" }}
      </template> -->

      <template #handle>
        <vxe-column title="操作" width="330">
          <template #default="{ row }">
            <div class="text-[#1a7eea]">
              <span class="cursor-pointer">录入记录</span>
            </div>
          </template>
        </vxe-column>
      </template>
    </TableTmp>
  </div>
</template>

<script setup lang="ts">
import TableTmp from "@/components/TableTmp/index.vue";

import GroupInout from "@/components/GroupInout/index.vue";

import { example } from "@/components/TableTmp/example"; // 自己配置

const table = ref(null) as any;

const onRefresh = () => {
  table.value.init();
};
</script>

<style lang="less" scoped></style>
```

## 表格的配置

```ts
export const example = ref({
  /** 以下是表单查询配置 GroupInout  */
  form: { stortActivityId: "" },

  formItem: [
    {
      key: "stortActivityId",
      type: "input",
      placeholder: "请输入活动ID",
      span: 6,
    },
  ],

  /** 以下是查询条件配置 GroupInout*/
  config: {
    isBack: true, // 返回按钮
    isRefresh: true, // 刷新按钮
  },

  /** 以下是table配置  TableTmp*/
  tableConfig: {
    apiUrl: "/store/activity/getPage", // 请求的url
    apiMethod: "post", // 请求方式
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
```

# Props

| 名称    | 类型                | 描述           | 默认值 |
| ------- | ------------------- | -------------- | ------ |
| columns | any[]               | 表格数据 title | []     |
| form    | Record<string, any> | 查询数据       | {}     |
| config  | Config              | 表格配置       | {}     |

# ts

```ts
interface Config {
  apiUrl: string;
  apiMethod: string;
}
```

# 动态插槽的使用

因为考虑到表格下的的每一项可能会涉及到定制样式或者判断 故而采用动态插槽

插槽会抛出 value 对应的值

动态插槽作用域插槽批配的名称是 columns 集合里面的 field 值

```vue
<template #staffBankName="{ value }">
  {{ value + " 审核" }}
</template>
```

# 固定插槽 handle

基本上用于最后一项表格的操作

```vue
<template #handle>
  <vxe-column title="操作" width="330">
    <template #default="{ row }">
      <div class="text-[#1a7eea]">
        <span class="cursor-pointer">录入记录</span>
      </div>
    </template>
  </vxe-column>
</template>
```

#### defineExpose

| 名称 | 类型    | 描述         |
| ---- | ------- | ------------ |
| init | funtion | 调用数据接口 |
