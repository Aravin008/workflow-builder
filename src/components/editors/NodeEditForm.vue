<script setup lang="ts">
import type { ConfigField } from '@/workflow/core/types'

const props = defineProps<{
  schema: ConfigField
  modelValue: Record<string, any>
}>()

console.log("schema", props.schema, props.modelValue)
const emit = defineEmits(['update:modelValue'])

function update(key: string, value: any) {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>

<template>
  <div class="node-config-form space-y-1">
    <div v-for="field in schema" :key="field.key">

      <label class="text-sm font-medium">{{ field.label }}</label>

      <input
        v-if="field.type === 'string'"
        :value="modelValue[field.key]"
        @input="update(field.key, $event.target.value)"
        class="p-1 border rounded w-full"
      />

      <input
        v-else-if="field.type === 'number'"
        type="number"
        :value="modelValue[field.key]"
        @input="update(field.key, Number($event.target.value))"
        class="p-1 border rounded w-full"
      />

      <select
        v-else-if="field.type === 'select'"
        :value="modelValue[field.key]"
        @change="update(field.key, $event.target.value)"
        class="p-1 border rounded w-full"
      >
        <option
          v-for="opt in field.options"
          :key="opt.value"
          :value="opt.value"
          
        >
          {{ opt.label }}
        </option>
      </select>

      <input
        v-else-if="field.type === 'boolean'"
        type="checkbox"
        :checked="modelValue[field.key]"
        @change="update(field.key, $event.target.checked)"
      />

      <textarea
        v-else-if="field.type === 'json'"
        :value="modelValue[field.key]"
        @input="update(field.key, $event.target.value)"
      />
    </div>
  </div>
</template>