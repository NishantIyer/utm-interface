<script setup lang="ts">
import { useRoute } from 'vue-router'
import { englishOnly } from '../logics'

const inactiveStyle = 'opacity-20 hover:opacity-50 font-400'
const activeStyle = 'opacity-100 !font-600'

const route = useRoute()
</script>

<template>
  <div mb-0 flex="~ gap2 sm:gap3 wrap" text-xl sm:text-3xl>
    <RouterLink to="/posts" class="!border-none" w-17 :class="route.path === '/posts' ? activeStyle : inactiveStyle">
      Portena
    </RouterLink>
  </div>
</template>

