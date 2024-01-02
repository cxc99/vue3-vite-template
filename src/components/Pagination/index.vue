<template>
  <div class="flex pt-10px" :class="[justify]">
    <el-pagination
      v-model:current-page="page.pageNo"
      v-model:page-size="page.pageSize"
      :page-sizes="sizes"
      :layout="layout"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
interface Page {
  pageNo: number;
  pageSize: number;
  total: number;
}

interface Prop {
  fn?: Function;
  page: Page;
  layout?: string;
  sizes?: number[];
  justify?: string;
}

const props = withDefaults(defineProps<Prop>(), {
  fn: () => {
    console.log(1);
  },
  page: () => {
    return { pageNo: 1, pageSize: 10, total: 0 };
  },
  layout: () => "total, sizes, prev, pager, next, jumper",
  sizes: () => [10, 20, 50, 100],
  justify: () => "justify-center",
});

const emits = defineEmits<{ (event: "update:page", value: Page): void }>();

const handleSizeChange = (val: number) => {
  emits("update:page", { ...props.page, pageSize: val, pageNo: 1 });
  props.fn();
};
const handleCurrentChange = (val: number) => {
  emits("update:page", { ...props.page, pageNo: val });
  props.fn();
};
</script>

<style lang="less" scoped></style>
