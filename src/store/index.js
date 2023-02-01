import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        user: {
            fullName: 'Asd',
            photo: '',
            dateBirth: '',
            email: 'asd@mail.ru',
            town: '',
            phone: '',
            language: '',
        },
    }),

    actions: {
        changeUserInfo(info) {
            for (const [key, value] of Object.entries(info)) {
                if (key in this.user) {
                    this.user[key] = value
                }
            }
            console.log(this.user);
        },
    },

    getters: {
        getUser: (state) => state.user,
    },
})
