#### 弹窗组件

```vue
<Dialog
  v-model:show="show"
  :fn="onSubmit"
  width="35%"
  title="绑定活动"
  labelWidth="100px">
    </Dialog>
```

#### Props

| 名称 | 类型 | 描述 | 默认值 |

width | Number | 弹窗宽度 | 100% |

title | String | 弹窗标题 | 空 |

labelWidth | String | 表单标签宽度 | 100px |

show| Boolean | 是否显示弹窗 | false |

fn| Function | 弹窗提交回调 | 空 |

#### defineExpose

| 名称 | 类型 | 描述 |

| onMasking | 弹窗取消 | 弹窗取消时触发 |
