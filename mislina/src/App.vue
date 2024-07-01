<template>

  <NavCMP />
  <RouterView />
  <Footer></Footer>

</template>


<script setup>
import NavCMP from './components/NavCMP.vue';
import Footer from './components/FooterCMP.vue';


</script>
<style>
body {
  background-color: rgba(204, 232, 215, 0.53) !important;
}
</style>