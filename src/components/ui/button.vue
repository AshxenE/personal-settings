<template>
  <div :class="['button', {disabled: disabled}]" :style="buttonStyle" :disabled="disabled">
    <span class="button__text">
       <slot></slot>
    </span>
  </div>
</template>

<script setup>
  import { defineProps, computed } from 'vue'

  const props = defineProps({
    width:{
      type: String,
      default: '100%'
    },
    height:{
      type: String,
      default: '40px'
    },
    background:{
      type: String,
      default: ''
    },
    color:{
      type: String,
      default: ''
    },
    disabled:{
      type: Boolean,
      default: false
    },
  })

  const buttonStyle = computed(() => {
    return {
      width: props.width,
      height: props.height,
      background: props.background,
      color: props.background,
    }
  })
</script>

<style scoped lang="scss">
.button {
  cursor: pointer;
  background: #346dff;
  border: none;
  box-shadow: inset 0 0 6px rgba(253, 227, 255, 0.44);
  border-radius: 32px;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &.disabled {
    cursor: default;
    opacity: .6;
  }


  &__text {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 52px;
    color: #FFFFFF;
  }
}
</style>
