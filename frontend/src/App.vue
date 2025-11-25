<template>
  <div id="app">
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <LoadingFallback />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import LoadingFallback from '@/components/LoadingFallback.vue';

//App principal - El router-view mostrará las diferentes vistas
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}
</style>
