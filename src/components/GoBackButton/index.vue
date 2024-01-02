<template>
  <div @click="onBank">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <el-button icon="ArrowLeft">返回</el-button>
    </template>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const onBank = () => {
  router.go(-1);
};
</script>

<style scoped></style>
