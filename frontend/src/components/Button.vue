<template>
    <button @click="btnClicked">{{ props.text }}</button>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: 'click on me!'
    }
})

const emit = defineEmits(['btnClicked'])
const btnClicked = ()=>{
    emit('btnClicked', 10, 'u_code')
}
</script>
