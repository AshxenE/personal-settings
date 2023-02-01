<template>
  <div ref="datepicker" class="datepicker">
    <div v-if="label" class="datepicker__label">{{ label }}:</div>
    <div class="datepicker__inner">
      <VueCtkDateTimePicker
          v-model="dateValue"
          :formatted="format"
          :label="placeholder"
          locale="ru"
          overlay
          onlyDate
          no-button-now
      />
      <div class="datepicker__icon-date">
        <UiIcon value="calendar" width="36px" height="36px" />
      </div>
      <transition name="slide-fade" appear>
        <div v-if="error && errorText" class="input__error">
          {{ errorText }}
        </div>
      </transition>
    </div>
  </div>

</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'

import UiIcon from './icon'

defineEmits(['update:modelValue', 'change'])

defineProps({
  modelValue: [String, Number],
  placeholder: {
    type: String,
    default: 'Заполните поле',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  format: {
    type: String,
    default: 'MM.DD.YYYY',
  },

  error: {
    type: Boolean,
    default: false,
  },

  errorText: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  width: {
    type: String,
    default: '100%',
  },

  height: {
    type: String,
    default: '48px',
  },

  background: {
    type: String,
    default: '#EDEFF3'
  }
})
const dateValue = ref(null)

onMounted(() => {
  console.log(document.querySelector('.datepicker-button'));
})
</script>

<style lang="scss" scoped>
.datepicker {
  width: v-bind(width);
  height: v-bind(height);
  background: v-bind(background);
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  padding: 3px 12px 8px;

  &__label {
    font-weight: 700;
    font-size: 13px;
    line-height: 19px;
    color: #292929;
    white-space: nowrap;
  }
  &__inner {
    height: 19px;

    :deep(input) {
      background: v-bind(backgroundInput);
      border: none;
      width: 100%;
      outline: none;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #292929;
      &::placeholder {
        font-size: 16px;
        color: #292929;
      }
    }
  }

  &__icon-date {
    display: flex;
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__error {
    margin-top: 3px;
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    color: #C93131;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :deep(.date-time-picker) {
    .field {
      height: 20px;
    }
    .field-input {
      padding: 0 !important;
      outline: none !important;
      border: none !important;
    }
    .field-label, .field-clear-button {
      display: none;
    }

    .datetimepicker {
      left: -10px;
      top: calc(100% + 10px) !important;
    }

    .datepicker {
      width: 300px!important;
      max-width: 300px!important;
      min-width: 300px!important;
    }

    .datepicker-container {
      width: 100%!important;
    }
  }
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

