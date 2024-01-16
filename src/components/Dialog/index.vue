<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.title"
    :width="props.width"
    :before-close="onMasking">
    <div>
      <slot></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onMasking">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus";

interface Prop {
  width?: string;
  title?: string;
  show: boolean;
  fn?: Function;
}

const props = withDefaults(defineProps<Prop>(), {
  title: "标题",
  show: false,
  width: "30%",
  fn: () => {},
});
const dialogVisible = ref(false);
const onMasking = () => {
  emits("update:show", false);
};

const onSubmit = async () => {
  await props.fn();
  onMasking();
};
const emits = defineEmits<{
  (event: "update:show", val: boolean): void;
}>();

watch(
  () => props.show,
  () => {
    dialogVisible.value = props.show;
  },
  { immediate: true, deep: true },
);
defineExpose({
  onMasking,
});
</script>

<style scoped></style>
