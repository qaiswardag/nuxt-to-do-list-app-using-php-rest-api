<template>
  <div>
    <Navigation></Navigation>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>


<script setup>
import {useUsersStore} from "./stores";

const userStore = computed(() => {
  return useUsersStore()
})


</script>
