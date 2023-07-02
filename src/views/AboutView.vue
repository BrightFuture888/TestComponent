<template>
  <div class="about">
    <!--  :jsonSourceLeft="leftData" :jsonSourceRight="rightData" -->
    <JsonDiff  ></JsonDiff>
  </div>
</template>

<script setup>
import {ref} from 'vue'

import JsonDiff from '../components/jsonDiff/index'
 
const leftData =ref(JSON.stringify([]))
const rightData =ref(JSON.stringify([]))



</script>

<style scoped>
.about{
  background-color: aqua;
  position: relative;
  width: 100%;
}
</style>
