<template lang="pug">
    q-input.q-ma-md(outlined v-model="model" v-bind="$attrs" bg-color="white")
</template>

<script setup>
import {computed} from 'vue';
import {useAppColors} from '~/composables/useProperties';

const appColor = useAppColors();

const props = defineProps({
    modelValue: {
        type:String,
        def:""
    }
})
const emit = defineEmits([
    "update:modelValue"
])

const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})
</script>