<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
<main class="min-h-screen flex items-center justify-center bg-gray-800  ">

 <div class="bg-gray-800 text-white p-4 rounded-xl shadow-md w-64 border border-gray-600  shadow-lg">
  <div class="mb-5 border-gray-800">
    <input 
     type="text"
     class="w-full p-2 mb-5 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-600 text-black"
     placeholder="Digite a Cidade"/>

     <button class="w-full bg-purple-800 hover:bg-purple-900 rounded-xl p-2 font-semibold">Buscar</button>
  </div>

  <div class="flex justify-between items-center mb-2">
    <h2 class="text-lg font-semibold">Joinville</h2>
    <span class="text-gray-400 text-sm">Agora</span>
  </div>

  <div class="flex items-center gap-3">
    <div class="text-4xl font-bold">22°C</div>
    <div class="text-gray-300 font-medium leading-tight">
      <p>Nublado</p>
    </div>
  </div>

  <div class="mt-3 flex justify-between text-gray-300 text-sm">
    <span>🌡 Máx: 25°C</span>
    <span>❄ Min: 18°C</span>
  </div>
</div>
</main>

</template>

<style scoped>
</style>
