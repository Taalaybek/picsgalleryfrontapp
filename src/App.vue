<template>
  <v-app id="picsgallery">
    <top-menu></top-menu>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TopMenu from '@/components/TopMenu'
export default {
  name: 'App',

  components: {
    TopMenu
  },

  data: () => ({
    //
  })
};
</script>
