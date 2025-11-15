<script setup>
import { ref } from 'vue'

const cidade = ref('');
const Clima = ref(null);
const dadosErro = ref(null);
const carregando = ref(false);

const buscarClima = async () => {
     Clima.value = null;
     dadosErro.value  = null;

     if(cidade.value.trim() === ''){
       dadosErro.value = 'Digite uma cidade'
       return;
     }
     carregando.value = true;

     try{
        const url = await fetch(`http://localhost:3000/api/clima/${cidade.value.trim()}`);
      
        if(!url.ok){
            const dadosErro = await url.json(); 
            console.log(dadosErro);
            throw new Error(dadosErro.message || `Erro de busca: ${url.status}`);
        };
        
        const resposta = await url.json();

        const {name, sys, main, weather} = resposta;
        
        Clima.value = {name, sys, main, weather};
        console.log(resposta)
   
     }catch(erro){
      dadosErro.value = erro.message;
     }finally{
      carregando.value = false;
     };
}
</script>

<template>
<main class="min-h-screen flex items-center justify-center bg-gray-800  ">

 <div class="bg-gray-800 text-white p-4 rounded-xl shadow-md w-64 border border-gray-600  shadow-lg">
  <div class="mb-5 border-gray-800">
    <input 
     type="text"
     class="w-full p-2 mb-5 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-600 text-black"
     placeholder="Digite a Cidade"
     v-model="cidade"
     @keyup.enter="buscarClima"
     />

     <button @click="buscarClima" :disabled="carregando" class="w-full bg-purple-800 hover:bg-purple-900 rounded-xl p-2 font-semibold">{{carregando ? 'Carregando' : 'Buscar'}}</button>
  </div>

  <p v-if="dadosErro" class="text-red-500 text-medium">
      {{dadosErro}}
  </p>

  <div v-else-if="Clima" >
  <div class="flex justify-between items-center mb-2">
    <h2 class="text-lg font-semibold">{{Clima.name}}</h2>
    <span class="text-gray-400 text-sm">Agora</span>
  </div>

  <div class="flex items-center gap-3">
    <div class="text-4xl font-bold">{{Clima.main.temp}}°C</div>
    <div class="text-gray-300 font-medium leading-tight">
      <p>{{Clima.weather[0].description }}</p>
    </div>
  </div>

  <div class="mt-3 flex justify-between text-gray-300 text-sm">
    <span>🌡 Máx: {{Clima.main.temp_max}}°C</span>
    <span>❄ Min: {{Clima.main.temp_min}}°C</span>
  </div>
</div>

 <div >

 </div>

 </div>
</main>

</template>

<style scoped>
</style>
