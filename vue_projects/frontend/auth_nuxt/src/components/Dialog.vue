<template lang="pug">
    q-dialog(v-model="confirm" persistent)
      q-card
        q-card-section.row.items-center
          q-avatar(icon="signal_wifi_off" color="primary" text-color="white")
          span.q-ml-sm {{message}}

        q-card-actions(align="right")
          q-btn(flat label="Cancel" color="primary" v-close-popup @click="cancel")
          q-btn(flat label="Confirm" color="primary" v-close-popup @click="ok")
</template>
<script setup>
import {computed} from 'vue';

const props = ({
    modelValue: Boolean,
    message:{
        type: String,
        def: "Removing your acount will free my DB"
    }
})

const emit = defineEmits([
    "update:modelValue",
    "confirm",
    "cancel"
])

const confirm = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

function ok(){
    emit('confirm')
    emit("update:modelValue",false)
}

function cancel(){
    emit('cancel')
    emit("update:modelValue",false)
}
</script>