<template>
	<div>
		<v-tooltip color="success" left>
			<template v-slot:activator="{ on }">
				<v-btn color="pink" dark v-on="on" fixed bottom right fab @click="closeDialog()">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</template>
			<span>Create a new album</span>
		</v-tooltip>

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