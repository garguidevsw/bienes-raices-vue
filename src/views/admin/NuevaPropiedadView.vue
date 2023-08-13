<script setup>
import { useRouter } from "vue-router";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";
import { useForm, useField } from "vee-validate";

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

import { validationSchema, imageSchema } from "@/validation/propiedadSchema";
import useImage from "../../composables/useImage";
import useLocationMap from '../../composables/useLocationMap'

const { zoom, center, pin } = useLocationMap()

const router = useRouter();
const db = useFirestore();

//Composable
const { uploadImage, image, url } = useImage();

const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
    ubicacion: center.value
  },
});

const titulo = useField("titulo");
const imagen = useField("imagen");
const precio = useField("precio");
const habitaciones = useField("habitaciones");
const wc = useField("wc");
const estacionamiento = useField("estacionamiento");
const descripcion = useField("descripcion");
const alberca = useField("alberca", null, {
  initialValue: false,
});

const submit = handleSubmit(async (values) => {
  const { imagen, ...propiedad } = values;

  console.log(imagen);

  const docRef = await addDoc(collection(db, "propiedades"), {
    ...propiedad,
    imagen: url.value,
  });

  if (docRef.id) {
    router.push({ name: "admin-propiedades" });
  }
});

const items = [1, 2, 3, 4, 5];
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
        @change="uploadImage"
      />

      <div v-if="image" class="my-5">
        <p class="font-weight-bold">Imagen propiedad:</p>
        <img class="w-50" :src="image" />
      </div>

      <v-text-field
        class="mb-5"
        label="Precio"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="Habitaciones"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            class="mb-5"
            label="WC"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
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

      <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
      <div class="mb-10" style="height: 600px;">
        <LMap
          v-model:zoom="zoom" 
          :center="center" 
          :use-global-leaflet="false"
        >
          <LMarker
            :lat-lng="center"
            draggable
            @moveend="pin"
          />
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></LTileLayer>
        </LMap>
      </div>

      <v-btn color="pink-accent-3" block @click="submit"> Agregar propiedad </v-btn>
    </v-form>
  </v-card>
</template>
