<template>
  <div>
    <Navigation></Navigation>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>


<script setup>
// import store
import {useUsersStore} from './stores'

//
//
// user
const userStore = computed(() => {
  return useUsersStore()
})

//
//
</script>
