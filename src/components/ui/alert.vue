<template>
  <Transition appear name="slide-fade">
    <div
        v-if="modelValue"
        class="alert"
        :class="{'alert__error': error }"
    >
      <UiIcon v-if="error" value="error" color="#EA7644" width="20px" height="20px" />
      <UiIcon v-else value="success" color="#2767B6" width="20px" height="20px" />
      <div class="alert__text">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {defineProps, defineEmits, watch, toRef} from "vue";
import UiIcon from '@/components/ui/icon'

const props = defineProps({
  error: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  },
})

const emit = defineEmits(['update:modelValue'])
const value = toRef(props, 'modelValue')

watch(value, (val) => {
  if (val) {
    setTimeout(() => {
      emit('update:modelValue', false)
    }, 2000)
  }
});

</script>

<style scoped lang="scss">
.alert {
  background: #DBEBFF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 10px 12px;
  box-sizing: border-box;
  width: fit-content;
  position: fixed;
  top: 20px;
  right: 20px;
  transition: 0.3s;

  &__error {
    background: #FFDBDB;

    .alert__text {
      color: #B62424;
    }
  }

  &__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #20579A;
    max-width: 300px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
