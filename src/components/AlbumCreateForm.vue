<template>
	<!-- album create form -->
	<v-layout d-flex column>
		<v-system-bar color="primary" light height="45px" class="white--text subtitle-1 px-4">
			{{ title }}
			<v-spacer></v-spacer>
			<v-btn v-if="dialog" x-small icon text>
				<v-icon v-on:click="$emit('closeDialog')" class="white--text">mdi-close</v-icon>
			</v-btn>
		</v-system-bar>
		<v-card flat tile>
			<v-card-subtitle>{{ subtitle }}</v-card-subtitle>
			<v-card-text>
				<!-- album inputs -->
				<v-text-field name="album_name" type="text" label="album name" 
				class="required-input" v-model="album_name" v-validate="'required|min:6|max:255'" 
				:error-messages="errors.has('album_name')?errors.first('album_name'):''" required outlined append-icon="mdi-asterisk"></v-text-field>
				<v-textarea name="album_description" label="Album description" v-model="album_description" v-validate="'min:10|max:400'" 
				:error-messages="errors.has('album_description')?errors.first('album_description'):''" auto-grow outlined clearable></v-textarea>
				<!-- end album inputs -->

				<!-- photo inputs -->
				<template v-if="withPhoto">
					<photo-create-form @file-processing="fileProcessing" />
				</template>
				<!-- end photo inputs -->
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text class="grey--text" @click="clearForm">Clear</v-btn>
				<v-btn color="primary" :disabled="$validator.errors.any() || isComplete() || disableAlbumForm" @click="submit" outlined>{{ btnTitle }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-layout>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { ErrorBag } from 'vee-validate'
import PhotoCreateForm from '@/components/PhotoCreateForm'

export default {
	name: 'album-create-form',

	components: {
		PhotoCreateForm
	},

	data: () => ({
		album_name: '',
		album_description: '',
		disableAlbumForm: false
	}),

	props: {
		dialog: {
			default: false,
			type: Boolean
		},
		title: String,
		subtitle: String,
		btnTitle: String,
		withPhoto: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		...mapGetters(['getRequest'])
	},

	methods: {
		...mapActions('album', ['createNewAlbum']),

		submit() {
			const albumData = {}
			if (!this.$validator.errors.any()) {
				this.$store.commit('requestTrue')
				albumData['name'] = this.album_name
				if (this.album_description) {
					albumData['description'] = this.album_description
				}

				if (this.$store.getters['photo/getTemporaryPhotosId'].length > 0) {
					albumData['photos'] = this.$store.getters['photo/getTemporaryPhotosId']
				}H

				this.createNewAlbum(albumData)
					.then(res => {
						this.$notify.set({content: process.env.VUE_APP_RESOURCE_CREATED, color: 'success'})
						this.$store.commit('requestFalse')
						this.$store.commit('photo/clearPhotoTemps')
						this.clearForm()
					})

			} else {

				this.$notify.set({ content: process.env.VUE_APP_ENTER_VALID_DATA, color: 'error' })
			}
		},

		clearForm() {
			this.album_name = ''
			this.album_description = ''
			this.$validator.reset()
		},

		isComplete() {
			return this.album_name.length == 0
		},

		fileProcessing() {
			this.disableAlbumForm = !this.disableAlbumForm
		}
	}
}
</script>
<style >
	.required-input .v-input__append-inner .v-input__icon .v-icon {
		font-size: 12px;
		color: red !important;
	}
</style>