<template>
  <div :class="['input', {'icon-search': search, 'error': errorText,  'password': password }]">
    <div v-if="label" class="input__label">
      {{ label }}
      <span v-if="required" class="input__label_sup">*</span>
    </div>
    <div class="input__inner">
      <input
          :placeholder="placeholder"
          :type="myType"
          :value="modelValue"
          :disabled="disabled"
          @input="change"
          v-maska
          :data-maska="mask"
      />
      <div v-if="search" class="input__icon-search">
        <UiIcon width="17px" height="17px" color="#292929" value="search-input"/>
      </div>
      <transition name="scale" appear>
        <div v-if="password" class="input__eye">
          <UiIcon :color="modelValue ? '#292929' : '#c6c7cb'" width="26px" height="22px" :value="eyeIcon" @click="changeType"/>
        </div>
      </transition>
      <transition name="slide-fade" appear>
        <div v-if="errorText" class="input__error">
          {{ errorText }}
        </div>
      </transition>
      <div v-if="!errorText && text" class="input__text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue'
import { vMaska } from "maska"

import UiIcon from './icon'

const props = defineProps({
  modelValue: [String, Number],

  placeholder: {
    type: String,
    default: 'Заполните поле',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  required: {
    type: Boolean,
    default: false,
  },

  password: {
    type: Boolean,
    default: false,
  },

  search: {
    type: Boolean,
    default: false,
  },

  errorText: {
    type: String,
    default: '',
  },

  text: {
    type: String,
    default: '',
  },

  mask: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  width: {
    type: String,
    default: '100%',
  },

  height: {
    type: String,
    default: 'max-content',
  },

  background: {
    type: String,
    default: '#EDEFF3'
  }
})
const emit = defineEmits(['update:modelValue', 'change'])

const myType = ref(props.type)
const showPassword = ref(false)

if (props.password) {
  myType.value = 'password'
}

const changeType = () => {
  if (props.modelValue) {
    showPassword.value = !showPassword.value
    myType.value = showPassword.value ? 'text' : 'password'
  }
}

const backgroundInput = computed(() => {
  return props.background
})

const eyeIcon = computed(() => {
  return !props.modelValue ? 'eye' : showPassword.value ? 'eye-off' : 'eye'
})

const change = (e) => {
  emit('change', e.target.value)
  emit('update:modelValue', e.target.value)
}
</script>

<style lang="scss" scoped>
.input {
  width: v-bind(width);
  height: v-bind(height);
  background: v-bind(backgroundInput);
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  padding: 3px 12px 8px;


  &__label {
    width: max-content;
    font-weight: 700;
    font-size: 13px;
    line-height: 19px;
    color: #292929;
    white-space: nowrap;
    position: relative;

    &_sup {
      position: absolute;
      top: 0;
      right: -8px;
      font-size: 16px;
      color: red;
    }
  }
  &__inner {
    position: relative;
    height: 19px;

    input {
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
  &__icon {
    &-remove {
      position: absolute;
      right: 0;
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.3s;
    }

    &-search {
      position: absolute;
      left: 0;
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.3s;
    }
  }

  &__eye {
    position: absolute;
    right: 0;
    cursor: pointer;
    top: 2px;
    transform: translateY(-50%);
    transition: 0.3s;
  }

  &__error {
    margin-top: 3px;
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    color: #C93131;
  }

  &__text {
    margin-top: 5px;
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    color: #BEC7D3;
  }

  &.icon-search {
    padding: 0 12px !important;

    .input__inner {
      display: flex;
      height: 100%;
      & input {
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
        padding-left: 26px;
        color: #828D9B;

        &::placeholder {
          font-size: 14px;
          color: #828D9B;
        }
      }
    }
  }

  &.error {
    .input {
      &__label {
        color: #B62424;
      }
    }

    input {
      color: #B62424;

      &::placeholder {
        font-weight: 400;
        color: #B62424;
      }
    }
  }

  &.password {
    input {
      padding-right: 30px;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
