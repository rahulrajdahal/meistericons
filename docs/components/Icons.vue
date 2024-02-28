<template>
    <div v-for="icon in icons">
        {{ parse(`${(icon)}`).toString() }}
    </div>
    
</template>




<script setup lang="ts">
import parse from 'node-html-parser';
defineProps<{ icons: any[] }>()
</script>
