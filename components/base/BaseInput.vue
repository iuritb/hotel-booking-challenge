<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
             focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      :class="{ 'bg-gray-50 cursor-not-allowed': disabled }"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'; 
const props = withDefaults(defineProps<{
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string; 
}>(), {
  type: 'text',
  placeholder: '',
  required: false,
  disabled: false,
  error: '',
});

const emit = defineEmits(['update:modelValue']);

const id = `input-${nanoid()}`;

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

</script>

<style scoped>
</style>
