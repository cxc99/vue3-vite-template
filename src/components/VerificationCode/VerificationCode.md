### 验证 code 例子

```vue
<template>
  <VerificationCode
    v-model:pass="formCode.pass"
    :code="formCode.code"></VerificationCode>
</template>
```

```ts
import VerificationCode from '@/components/VerificationCode/index.vue'

const formCode = ref({
  pass: false,
  code: '',
})
```

# Props

| 名称 | 类型    | 描述                | 默认值 |
| ---- | ------- | ------------------- | ------ |
| pass | boolean | 是否输入正确的 code | false  |
| code | string  | 输入的 code         | ''     |

# Events

| 名称        | 类型         | 描述         |
| ----------- | ------------ | ------------ |
| update:pass | v-model:pass | 绑定是否成功 |
