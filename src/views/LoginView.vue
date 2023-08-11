<script setup>
import { useForm, useField } from 'vee-validate'
import { useAuthStore } from '../stores/auth';
import { loginSchema as validationSchema } from '../validation/loginSchema';

const authStore = useAuthStore()

const { handleSubmit } = useForm({ validationSchema })

const email = useField('email')
const password = useField('password')

const submit = handleSubmit((values) => {
  authStore.login(values)
})

</script>

<template>
    <v-card
      flat
      max-width="600"
      class="mx-auto my-10"
    >
      <v-card-title tag="h4" class="text-h4 text-center font-weight-bold">
        Iniciar Sesión
      </v-card-title>
      <v-card-subtitle class="text-center">
        Ingresa tus credenciales para iniciar sesión
      </v-card-subtitle>

      <v-alert
        v-if="authStore.hasError"
        class="my-5"
        type="error"
        :title="authStore.errorMessage"
      >
      </v-alert>

      <v-form class="mt-5">
        <v-text-field
          type="email"
          label="Email"
          class="mb-3"
          bg-color="blue-gray-lighten-5"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        />

        <v-text-field
          type="password"
          label="Password"
          class="mb-3"
          bg-color="blue-gray-lighten-5"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"

        />

        <v-btn
          block
          color="pink-accent-3"
          @click="submit"
        >
          Iniciar Sesión
        </v-btn>
      </v-form>

    </v-card>
</template>
