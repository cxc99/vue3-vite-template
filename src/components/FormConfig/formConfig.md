### 封装业务表单组件

```vue
<FormConfig
  ref="basicSettingForm"
  :formItem="formItem"
  :form="form"
  :rules="rules"></FormConfig>
```

```ts
interface Formitem {
  label: string; // 表单名称
  key: string;
  type: string; // 类型 参考el-input
  required: boolean; // 是否必填
  placeholder?: string; // 未填文案
  options?: { type: string; name: string }[]; // 筛选框的opt
  unit?: string; // 单位
  prop?: string; //  el-form-item 的prop
  span?: number; // 占位
  child?: Formitem; // 子集
  disabled?: boolean; // 是否禁用
  note?: string; // 文案
  width?: string; // 标题宽度
}
```

#### Props

| 名称     | 类型                | 描述     | 默认值 |
| -------- | ------------------- | -------- | ------ |
| formItem | Formitem            | 表单配置 | {}     |
| form     | Record<string, any> | 表单数据 | {}     |
| rules    | Object              | 表单校验 | {}     |

#### events

| 名称   | 类型                                | 描述     |
| ------ | ----------------------------------- | -------- |
| submit | (form: Record<string, any>) => void | 提交表单 |
