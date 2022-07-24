<template>
  <div>{{data.msg}}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  msg:'HelloComponent'
})

</script>

<style scoped>

</style>
