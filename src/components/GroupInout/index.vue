<template>
  <div class="flex w-full justify-between pb-10px">
    <div class="flex">
      <GoBackButton v-if="config!.isBack" class="mr-5px"></GoBackButton>

      <el-button
        v-if="config!.isRefresh"
        icon="RefreshRight"
        type="info"
        @click="emits('onRefresh')"></el-button>

      <slot name="button"></slot>
    </div>
    <el-row class="w-[70%]" justify="end">
      <el-col
        class="pr-5px min-w-180px"
        v-for="item in formItem"
        :key="item.key"
        :span="item.span || 24">
        <div v-if="item.type === 'input'" class="w-full flex">
          <el-input
            v-model.trim="form[item.key]"
            :disabled="item.disabled"
            :placeholder="item.placeholder || ''"
            @change="emits('onRefresh')">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
          <span class="text-center">
            {{ item.unit || "" }}
          </span>
        </div>
        <div v-if="item.type === 'number'" class="w-full flex">
          <el-input
            type="number"
            v-model.number="form[item.key]"
            :class="{ 'w-1/2': item.child && form[item.key] }"
            :disabled="item.disabled"
            @change="emits('onRefresh')" />
          <span v-if="item.unit" class="w-50px text-center">
            {{ item.unit || "" }}
          </span>
        </div>
        <div v-if="item.type === 'select'" class="w-full">
          <el-select
            class="w-full"
            v-model="form[item.key]"
            :placeholder="item.placeholder || ''"
            @change="emits('onRefresh')">
            <el-option
              v-for="group in item.options"
              :key="group.type"
              :label="group.name"
              :value="group.type" />
          </el-select>
        </div>

        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="form[item.key]"
          @change="emits('onRefresh')">
          <el-radio
            v-for="group in item.options"
            :key="group.type"
            :label="group.type">
            {{ group.name }}
          </el-radio>
        </el-radio-group>

        <el-date-picker
          v-if="item.type === 'date'"
          v-model="form[item.key]"
          type="datetime"
          placeholder="请选择时间"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          @change="emits('onRefresh')" />

        <div v-if="item.type === 'switch'">
          <el-switch
            @change="emits('onRefresh')"
            v-model="form[item.key]"
            :inactive-value="0"
            :active-value="1" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import GoBackButton from "@/components/GoBackButton/index.vue";

interface Formitem {
  key: string;
  type: string;
  placeholder?: string;
  options?: { type: string; name: string }[];
  span?: number;
}

interface Prop {
  formItem?: Formitem[] | Record<string, any>;
  form?: Record<string, any>;
  config?: Record<string, any>;
}

const props = withDefaults(defineProps<Prop>(), {
  formItem: () => {
    return [];
  },
  form: () => {
    return { activityName: "" };
  },
  config: () => {
    return {
      isBack: true, // 返回按钮
      isRefresh: true, // 刷新按钮
    };
  },
  rules: {},
});

const emits = defineEmits<{
  (event: "onRefresh"): void;
  (event: "update:form", value: any): void;
}>();
</script>

<style scoped></style>
