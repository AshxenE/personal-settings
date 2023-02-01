<template>
  <div class="account-settings">
    <div class="container">
      <h1 class="account-settings__title">Настройки аккаунта</h1>
      <div class="account-settings__content">
        <div class="account-settings__tabs">
          <UiTab v-model="tabValue" value="profile">Редактировать профиль</UiTab>
          <UiTab v-model="tabValue" value="password">Изменить пароль</UiTab>
        </div>
        <EditUser v-if="tabValue === 'profile'" />
        <ChangePassword v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import UiTab from '../components/ui/tab'
import EditUser from '../components/templates/EditProfile'
import ChangePassword from '../components/templates/ChangePassword'

const tabValue = ref('profile')
</script>

<style lang="scss" scoped>
.account-settings {
  padding: 40px 0;
  background: #EDEFF3;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &__title {
    font-weight: 600;
    font-size: 34px;
    line-height: 38px;
    color: #212121;
    margin-bottom: 40px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 40px;
  }

  &__tabs {
    display: flex;
    flex-direction: column;
  }
}
</style>
