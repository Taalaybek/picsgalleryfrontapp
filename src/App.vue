<template>
  <v-app id="picsgallery">
    <top-menu></top-menu>
    <v-content>
      <v-container class="fill-height">
        <v-overlay :value="overlay" absolute light z-index="5">
          <v-progress-circular indeterminate color="primary" :value="20"></v-progress-circular>
        </v-overlay>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-notify></v-notify>
    <template v-if="checkAuth">
      <AlbumFormWrapper></AlbumFormWrapper>
    </template>
  </v-app>
</template>

<script>
import TopMenu from '@/components/TopMenu'
import AlbumFormWrapper from '@/components/AlbumFormWrapper'
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    TopMenu,
    AlbumFormWrapper
  },

  data: () => ({
    //
  }),

  created(){
    
  },

  computed: {
    ...mapGetters(['overlay', 'checkAuth'])
  } 
};
</script>
