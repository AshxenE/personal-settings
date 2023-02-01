<template>
  <label style="width: 100%;">
    <input
        :value="value"
        type="radio"
        :checked="value === modelValue"
        :name="name"
        @change="onchange"
    >
    <div class="tab">
      <div class="tab__text">
        <slot />
      </div>
    </div>
  </label>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

defineProps({
  modelValue: {
    type: [String, Boolean, Object],
    default: true
  },

  height: {
    type: String,
    default: '40px',
  },

  width: {
    type: String,
    default: '100%',
  },

  color: {
    type: String,
    default: '#292929',
  },

  name: {
    type: String,
    default: 'radio'
  },

  value: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const onchange = (evt) => {
  emit('change', evt.target.value)
  emit('update:modelValue', evt.target.value)
}
</script>

<style scoped lang="scss">
.tab {
  width: v-bind(width);
  height: v-bind(height);
  border-left: 2px solid transparent;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  &__text {
    color: v-bind( color );
    padding: 0 10px;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    transition: 0.3s;
  }
}

input {
  display: none;
}

input:checked ~ .tab {
  background: #f5f5f5;
  border-color: transparent;
  border-left-color: blue;

  .tab__text {
    color: black;
  }
}
</style>
