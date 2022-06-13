<template>
  <MyMap  /> 
 
</template>

<script setup>

import { ref } from 'vue'
import MyButton from '@/components/Button.vue'
import MyMap from '@/components/MyMap.vue'
import {useStore} from "vuex";

const store = useStore();

const name = ref('ucode')
const age = ref(4)

const changeState = () =>{
  name.value = 'ucodeeee'
  age.value= 2
}

const clcikEvent = (val, namee)=>{
    name.value = store.state.product.name
  //name.value = namee
  age.value= val
}

</script>

<style >
html, body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
}
</style>

