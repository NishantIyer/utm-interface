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
  background-image: url('https://media.discordapp.net/attachments/971299427715272734/1137203762054840330/image.png?width=531&height=378');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
