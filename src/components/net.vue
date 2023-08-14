<template>
  <div class="full-screen-image"></div>
</template>

<script>
export default {
  name: 'FullScreenImage',
};
</script>

<style>
.full-screen-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://www.researchgate.net/profile/Herve-Stecq/publication/268631453/figure/fig1/AS:295386695651328@1447437084260/RAJ-02-and-CJE-cooperation-network-2001-2011_Q640.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
