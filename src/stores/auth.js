import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

  const auth = useFirebaseAuth()

  const authUser = ref({})
  const errorMessage = ref('')

  const errorCodes = {
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "El password es incorrecto"
  }

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
    .then( userCredential => {
      const user = userCredential.user
      authUser.value = user

      // TODO: Redirigir a Panel de Administración
    })
    .catch(error => {
      errorMessage.value = errorCodes[error.code]
    })
  }

  const hasError = computed(() => {
    return errorMessage.value
  })

  return {
    login,
    hasError,
    errorMessage
  }
})