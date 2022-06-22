<template>
    <div style="z-index:999; position: absolute" class=" btn-vertical ">
        <button class=" btn btn-secondary mt-2 mx-2" @click="storeOSMData">
            Store
        </button>
        <button class=" btn btn-primary mt-2 mx-2" @click="retrieveOSMData">
            Retrieve
        </button>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();

const storeOSMData = () =>{
    store.dispatch("getTreesOSM/getGeomArea")
}

const retrieveOSMData = () =>{
    store.dispatch("getTreesOSM/retrieveTrees")
}

</script>


<style scoped>

</style>