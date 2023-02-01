<template>
  <div class="edit-profile">
    <div class="edit-profile__user">
      <div class="edit-profile__cropper cropper">
        <img
            :src="setUserPhoto"
            alt="user-avatar"
            class="edit-profile__user-image"
        />
        <div class="cropper__upload-file upload-image">
          <label v-if="!uploadImage" class="upload-image__label">
            <UiIcon color="white" value="photo" width="20px" height="20px" />
            <input
                ref="fileUpload"
                type="file"
                :accept="['png', 'jpg', 'jpeg']"
                :multiple="false"
                class="upload-image__input-file"
                @change="updateImage"
            />
          </label>
          <UiIcon
              v-else
              @click="clearUploadFile"
              color="white"
              value="close"
              width="18px"
              height="18px"
          />
        </div>
      </div>
      <div class="edit-profile__user-col">
        <p class="edit-profile__user-name">
          {{ user.fullName }}
        </p>
        <label class="upload-image__label">
          <span class="edit-profile__user-item">
            <UiIcon value="photo" width="20px" height="20px" />
            Изменить фото профиля
          </span>
          <input
              ref="fileUpload"
              type="file"
              :accept="['png', 'jpg', 'jpeg']"
              :multiple="false"
              class="upload-image__input-file"
              @change="updateImage"
          />
        </label>
      </div>
    </div>
    <div class="edit-profile__form">
      <UiInput
          v-model="form.fullName"
          label="ФИО"
          required
          :errorText="errors.fullName"
      ></UiInput>
      <UiDatepicker v-model="form.dateBirth" label="Дата рождения"></UiDatepicker>
      <UiInput
          v-model="form.email"
          label="E-mail"
          required
          :errorText="errors.email"
      ></UiInput>
      <UiInput v-model="form.town" label="Город"></UiInput>
      <UiInput
          v-model="form.phone"
          label="Номер телефона"
          mask="+7 (####) ###-##-##"
      ></UiInput>
      <UiAutocomplete
          v-model="form.language"
          label="Владение языками"
          :options="autocompleteInfo"
      />
    </div>
    <UiButton
        @click="saveChanges"
        class="edit-profile__button"
        width="230px"
        :disabled="!meta.valid"
    >Сохранить изменения</UiButton>

    <UiLoader v-if="isOpenLoader"/>
    <UiAlert v-model="isOpenAlert">Пользователи созданные в этой компании и приглашенные в другие, не будут удалены.</UiAlert>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import { useStore } from '@/store'
import { useForm } from 'vee-validate';

import UiAutocomplete from '@/components/ui/autocomplete'
import UiInput from '@/components/ui/input'
import UiButton from '@/components/ui/button'
import UiDatepicker from '@/components/ui/datepicker'
import UiLoader from '@/components/ui/loader'
import UiAlert from '@/components/ui/alert'
import UiIcon from '@/components/ui/icon'

const store = useStore()

const isOpenLoader = ref(false)
const isOpenAlert = ref(false)
const uploadImage = ref('')
const isOpenDialog = ref(false)
const form = reactive({
  fullName: '',
  dateBirth: '',
  email: '',
  town: '',
  phone: '',
  language: '',
  photo: null,
  autocomplete: '',
})
const autocompleteInfo = ref( [
  {
    id: 1,
    text: 'English'
  },
  {
    id: 2,
    text:'Abkhaz'
  },
  {
    id: 3,
    text:'Albanian'
  },
  {
    id: 4,
    text:'Arabic'
  },
  {
    id: 5,
    text:'Portuguese'
  },
  {
    id: 6,
    text:'Armenian'
  },
  {
    id: 7,
    text:'Russian'
  },
  {
    id: 8,
    text:'German'
  },
  {
    id: 9,
    text:'French'
  },
  {
    id: 10,
    text:'Dutch'
  }
])

// validation
const simpleSchema = {
  fullName(value) {
    if (value && value.trim()) {
      return true;
    }

    return 'Обязательные поля';
  },
  email(value) {
    if (!value && !value.trim()) {
      return 'Обязательные поля'
    }

    if (!value.match('^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')) {
      return 'Нет электронной почты'
    }

    return true;
  },
};
const { meta, errors, useFieldModel } = useForm({
  validationSchema: simpleSchema,
});

form.fullName = useFieldModel('fullName');
form.email = useFieldModel('email');

const user = computed(() => {
  return store.getUser
})

const setUserPhoto = computed(() => {
  if (uploadImage.value && !isOpenDialog.value) {
    return uploadImage.value
  }
  if (user.value?.photo) return user.value?.photo

  return require('@/assets/svg/user-account-default-icon.svg')
})

const clearUploadFile = () => {
  uploadImage.value = '';
}
const updateImage = (e) => {
  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = e => {
    uploadImage.value = e.target.result;
    form.photo = e.target.result;
  };
}

const saveChanges = () => {
  store.changeUserInfo(form)

  if (form.fullName && form.email) {
    isOpenLoader.value = true

    setTimeout(() => {
      isOpenLoader.value = false
      isOpenAlert.value = true
    }, 2500)
  }
}

onMounted(() => {
  for (const [key, value] of Object.entries(user.value)) {
    if (key in form) {
      form[key] = value
    }
  }
})

</script>

<style lang="scss" scoped>
.edit-profile {
  max-width: 700px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #EDEFF3;

  &__user {
    display: flex;
    align-items: center;
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid #EDEFF3;
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &-name {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      color: #212121;
      margin-bottom: 16px;
    }
    &-item {
      display: flex;
      align-items: center;

      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #212121;
      cursor: pointer;
      column-gap: 8px;
    }
  }
  &__cropper {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 16px;
    overflow: hidden;
  }
  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 16px;
  }
  &__label {
    font-size: 14px;
    line-height: 20px;
    color: #757575;
    margin-bottom: 8px;
  }

  &__button {
    margin: 20px 0 0 auto;
  }
}
.cropper {
  position: relative;
  &__upload-file {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: rgb(33, 33, 33, 0.46);
    transform: translateY(100%);
    transition: all 0.3s;
  }
  &:hover {
    cursor: pointer;
    .cropper__upload-file {
      transform: translateY(0);
    }
  }
}
.upload-image {
  &__label {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  &__input-file {
    display: none;
  }
}
</style>
