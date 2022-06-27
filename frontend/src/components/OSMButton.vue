<template>
    <div style="z-index:999; position: absolute" class=" btn-vertical ">
        <!-- Was gibt es noch in OSM, wie stelt man diese Optionen am besten bereit, wie löscht man welche Objekttypen?  -->
        <button class=" btn btn-primary mt-2 mx-2" @click="storeOSMData">
            Mark area for trees
        </button>
        
        <button class=" btn btn-primary mt-2 mx-2" @click="retrieveOSMData">
            Show trees
        </button>

        <button class=" btn btn-primary mt-2 mx-2" @click="deleteTreeData">
            Delete stored trees
        </button>
 <!-- Testing checkboxes

<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
  <label class="form-check-label" for="inlineCheckbox1">Trees</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
  <label class="form-check-label" for="inlineCheckbox2">Pharmacies</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">
  <label class="form-check-label" for="inlineCheckbox3">Schools</label>
</div>
-->

    </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore();

const storeOSMData = () =>{
    store.dispatch("getTreesOSM/getGeomArea")
    //store.dispatch("getTreesOSM/retrieveTrees")    
}

const retrieveOSMData = () =>{
    store.dispatch("getTreesOSM/retrieveTrees")
}

// TODO: Löschen aller Layer, auf denen 3D-Bäume sind

const deleteTreeData = () =>{
    store.dispatch("getTreesOSM/deleteTrees")

    // this should go into store?
    const mapLayer = store.state.map.map.getLayer('tree')
    if(typeof mapLayer !== 'undefined'){
        store.state.map.map.removeLayer('tree')
        store.state.map.map.removeSource('tree')
    }
    for (let i=0; i < store.state.getTreesOSM.ids.length; i++)  {
        let Layer = store.state.map.map.getLayer(store.state.getTreesOSM.ids[i]) 
        store.state.map.map.removeLayer(store.state.getTreesOSM.ids[i])
    }
}


</script>

<style scoped>

</style>