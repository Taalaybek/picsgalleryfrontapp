<template>
	<div>
		<v-btn 
      color="pink" dark fixed bottom right fab @click="closeDialog()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="closable" width="600" light>
        <album-create-form 
        v-bind:dialog="true" 
        v-bind:title="'Album create form'" 
        v-bind:subtitle="'You cant store photo before create album'" 
        v-bind:btn-title="'Create'"
        v-bind:with-photo="true"
        v-on:closeDialog="closeDialog()">
        </album-create-form>
      </v-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import AlbumCreateForm from '@/components/AlbumCreateForm'

export default {
	name: 'album-form-wrapper',

	components: {
    AlbumCreateForm
  },

  data: () => ({
    closable: false
  }),

  created(){
    
  },

  computed: {
    ...mapGetters(['checkAuth'])
  },

  methods: {
    closeDialog: function() {
      this.closable = !this.closable
    }
  }
}
</script>