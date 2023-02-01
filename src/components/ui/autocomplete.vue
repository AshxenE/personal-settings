<template>
  <div class="autocomplete">
    <div class="autocomplete__header">
      <div v-if="label" class="autocomplete__label">
        {{ label }}
      </div>
      <div class="autocomplete__inner">
        <input
            :placeholder="placeholder"
            type="text"
            :value="modelValue"
            @input="change"
        />
      </div>
    </div>

    <transition appear name="slide-fade">
      <div v-if="close" class="autocomplete__options">
        <div
            :class="['autocomplete__options-item', { active: item.text === modelValue }]"
            v-for="(item, key) in results"
            :key="key"
            @click="selectItem(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {defineProps, onMounted, computed, ref, defineEmits, nextTick} from 'vue'


const props = defineProps({
  modelValue: [String, Number],

  options: {
    type: Array,
    default: () => []
  },

  placeholder: {
    type: String,
    default: 'Заполните поле',
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
    default: 'max-content',
  },

  background: {
    type: String,
    default: '#EDEFF3'
  }
})
const emit = defineEmits(['update:modelValue', 'change'])

const results = ref([])
const close = ref(false)

const backgroundInput = computed(() => {
  return props.background
})

const selectItem = (item)  => {
  close.value = false
  emit('change', item.text)
  emit('update:modelValue', item.text)
}

const change = (e) => {
  emit('change', e.target.value)
  emit('update:modelValue', e.target.value)

  nextTick(() => {
    filterOptions(props.modelValue)

    close.value = props.modelValue.length >= 3;
  })
}

const filterOptions = (value) => {
  results.value = props.options
  results.value = results.value.filter((post)=> {
    return post.text.toLowerCase().indexOf(value.toLowerCase()) > -1
  })
}

onMounted(() => {
  results.value = props.options
})
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);

  &__header {
    width: v-bind(width);
    height: v-bind(height);
    background: v-bind(backgroundInput);
    padding: 3px 12px 8px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 24px;
  }

  &__options {
    background: v-bind(backgroundInput);
    width: v-bind(width);
    border: 1px solid #DCE1E7;
    box-shadow: 0 2px 2px rgba(255, 255, 255, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    position: absolute;
    top: 101%;
    left: 0;
    margin-top: 5px;
    z-index: 11;
    overflow: hidden;
    transition: 0.3s;
    padding: 3px 0;

    &-item {
      width: 100%;
      padding: 3px 0 3px 12px;
      transition: 0.3s;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #292929;

      &:hover {
        background: #F6F7FA;
        color: #3A7CCA;
      }

      &.active {
        background: #F6F7FA;
        color: #3A7CCA;
      }

      &:first-child {
        padding: 9px 0 4px 12px;
      }

      &:last-child {
        padding: 4px 0 9px 12px;
      }
    }
  }

  &__label {
    width: max-content;
    font-weight: 700;
    font-size: 13px;
    line-height: 19px;
    color: #292929;
    white-space: nowrap;
    position: relative;

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
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
