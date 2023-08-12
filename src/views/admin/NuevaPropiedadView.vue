<script setup>
import { useRouter } from 'vue-router';
import { useFirestore } from 'vuefire';
import { collection, addDoc } from 'firebase/firestore'
import { useForm, useField } from 'vee-validate'
import { validationSchema, imageSchema } from '@/validation/propiedadSchema'

const router = useRouter()
const db = useFirestore()

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const wc = useField('wc')
const estacionamiento = useField('estacionamiento')
const descripcion = useField('descripcion')
const alberca = useField('alberca', null, {
  initialValue: false
})

const submit = handleSubmit(async(values) => {
  const {imagen, ...propiedad} = values

  const docRef = await addDoc(collection(db, "propiedades"), {
    ...propiedad,
  })

  if(docRef.id){
    router.push({name: 'admin-propiedades'})
  }
})

const items = [1,2,3,4,5]
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title tag="h4" class="text-h4 text-center font-weight-bold">
      Nueva Propiedad
    </v-card-title>
    <v-card-subtitle class="text-center py-5">
      Ingresa los datos de la propiedad
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field 
        class="mb-5" 
        label="Título propiedad" 
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />

      <v-file-input 
        accept="image/jpeg" 
        label="Fotografía"
        prepend-icon="mdi-camera"
        class="mb-5"  
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
      />

      <v-text-field 
        class="mb-5" 
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-select
            class="mb-5"
            label="Habitaciones"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-select
            class="mb-5"
            label="WC"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-select
            class="mb-5"
            label="Estacionamiento"
            :items="items"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea 
        class="mb-5" 
        label="Descripción"
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      >
      </v-textarea>

      <v-checkbox 
        label="Alberca"
        v-model="alberca.value.value"
        :error-messages="alberca.errorMessage.value" 
      />

      <v-btn 
        color="pink-accent-3" 
        block
        @click="submit"
      >
        Agregar propiedad
      </v-btn>
    </v-form>
  </v-card>
</template>
