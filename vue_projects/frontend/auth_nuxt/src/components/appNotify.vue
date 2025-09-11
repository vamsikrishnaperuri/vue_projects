<template>
    <div></div>
</template>

<script setup>
import { Notify } from 'quasar';

function notification(type,message){
    Notify.create({
      type: type,
      message: message
    })
}
defineExpose({notification})
</script>