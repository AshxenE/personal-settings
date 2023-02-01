<template>
  <div class="change-password">
    <UiInput
        v-model="form.oldPassword"
        label="Старый пароль"
        required
        :errorText="errors.oldPassword"
    ></UiInput>
    <UiInput
        v-model="form.newPassword"
        :errorText="errors.newPassword"
        name="password"
        type="password"
        label="новый пароль"
        placeholder="Password"
        ref="password"
    ></UiInput>
    <UiInput
        v-model="form.repeatPassword"
        label="Подтвердите новый пароль"
        required
        type="password"
        :errorText="errors.repeatPassword"
    ></UiInput>
    <UiButton
        @click="saveChanges"
        class="change-password__button"
        width="230px"
        :disabled="!meta.valid"
    >Сохранить изменения</UiButton>

    <UiLoader v-if="isOpenLoader"/>
    <UiAlert v-model="isOpenAlert" >Пользователи созданные в этой компании и приглашенные в другие, не будут удалены.</UiAlert>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import { useForm } from 'vee-validate';
import { useStore } from '@/store'

import UiInput from '@/components/ui/input'
import UiLoader from '@/components/ui/loader'
import UiAlert from '@/components/ui/alert'
import UiButton from '@/components/ui/button'

const store = useStore()

const isOpenLoader = ref(false)
const isOpenAlert = ref(false)

const form = reactive({
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
})

// validation
const simpleSchema = {
  oldPassword(value) {
    if (value && value.trim()) {
      return true;
    }

    return 'Обязательные поля';
  },
  newPassword(value) {
    if (value && value.trim()) {
      return true;
    }

    return 'Обязательные поля';
  },

  repeatPassword(value) {
    if (value && value.trim()) {
      if (value === form.newPassword) {
        return true;
      } else {
        return 'Не соответствует';
      }
    }

    return 'Обязательные поля';
  },
}

const saveChanges = () => {
  store.changeUserInfo(form)

  if (form.repeatPassword && form.oldPassword) {
    isOpenLoader.value = true

    setTimeout(() => {
      isOpenLoader.value = false
      isOpenAlert.value = true
    }, 2500)
  }
}

const { meta, errors, useFieldModel } = useForm({
  validationSchema: simpleSchema,
});

form.oldPassword = useFieldModel('oldPassword');
form.newPassword = useFieldModel('newPassword');
form.repeatPassword = useFieldModel('repeatPassword');

</script>

<style scoped lang-scss>
.change-password {
  display: flex;
  max-width: 700px;
  flex-direction: column;
  row-gap: 20px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #EDEFF3;
}
.change-password__button {
  margin: 20px 0 0 auto;
}
</style>
