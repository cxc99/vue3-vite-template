### 二次封装业务分页组件

```vue
<Pagination v-model:page="page" :fn="init"></Pagination>
```

#### Props

| 名称    | 类型     | 描述     | 默认值                                  |
| ------- | -------- | -------- | --------------------------------------- |
| fn      | function | 回调函数 | -                                       |
| page    | Objeck   | 分页参数 | { pageNo: 1, pageSize: 10, total: 0 }   |
| layout  | string   | 组件功能 | total, sizes, prev, pager, next, jumper |
| sizes   | arrany   | 分页参数 | [10, 20, 50, 100]                       |
| justify | string   | 分页参数 | justify-end justify-center              |
