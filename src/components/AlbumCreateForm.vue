<template>
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
					<!-- photo description text input -->
					<v-text-field name="photo_name" type="text" label="Photo name" v-model="photo_name" 
					v-validate="'min:2|max:40'" :error-messages="errors.has('photo_name')?errors.first('photo_name'):''" outlined clearable></v-text-field>

					<!-- photo file input -->
					<v-file-input name="photo_file" label="Photo file" v-model="file" accept="image/png, image/jpeg, image/bmp" id="photo_file" class="required-input" 
					v-validate="'size:10000|image|mimes:image/png,jpeg,bmp'" :error-messages="errors.has('photo_file')?errors.first('photo_file'):''" chips show-size outlined counter append-icon="mdi-asterisk" clearable></v-file-input>
				</template>
				<!-- end photo inputs -->
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text class="grey--text" @click="clearForm">Clear</v-btn>
				<v-btn color="primary" :disabled="$validator.errors.any()" @click="submit" outlined>{{ btnTitle }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-layout>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { RESOURCE_CREATED, VALID_DATA } from '@/services/constants'
export default {
	name: 'album-create-form',

	data: () => ({
		album_name: '',
		album_description: '',
		photo_name: '',
		file: null
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
		...mapActions('photo', ['createNewPhoto']),

		submit() {
			const albumData = {}
			const photoData = new FormData()
			if (!this.$validator.errors.any()) {
				this.$store.commit('requestTrue')
				albumData['name'] = this.album_name
				if (this.album_description) {
					albumData['description'] = this.album_description
				}

				this.createNewAlbum(albumData, this.file)
					.then(res => {
						if (this.file) {
							photoData.append('file', this.file, this.file.name)

							if (this.photo_name) {
								photoData.append('file_name', this.photo_name)
							}

							this.createNewPhoto(photoData)
							.then(res => {
								this.$notify.set({content: RESOURCE_CREATED, color: 'success'})
								this.$store.commit('requestFalse')
								this.clearForm()
							})
						} else {
							this.$notify.set({content: RESOURCE_CREATED, color: 'success'})
							this.$store.commit('requestFalse')
							this.clearForm()
						}
					})

			} else {

				this.$notify.set({ content: VALID_DATA, color: 'error' })
			}
		},

		clearForm() {
			this.album_name = ''
			this.album_description = ''
			this.photo_name = ''
			this.file = null
			this.$validator.reset()
		}
	},
}
</script>
<style >
	.required-input .v-input__append-inner .v-input__icon .v-icon {
		font-size: 12px;
		color: red !important;
	}
</style>