<script setup>
import usePropiedades from '../composables/usePropiedades';
import Propiedad from '../components/Propiedad.vue';
import { formatearPrecio } from '../helpers';

const { alberca, filterItems } = usePropiedades()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Nuestras propiedades</h1>
  <v-card flat class="py-10">
    <v-card-title class="text-h5">
      Busqueda
      <v-checkbox label="Alberca" v-model="alberca" />
    </v-card-title>
    <v-row>
      <Propiedad v-for="propiedad in filterItems" :key="propiedad.id" :propiedad="propiedad" :formatearPrecio="formatearPrecio"/>
    </v-row>
  </v-card>
  
</template>
