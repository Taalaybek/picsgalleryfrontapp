<template>
	<v-form>
		<v-text-field
			name="photo_name"
			type="text"
			label="Photo name"
			v-model="photo_name"
			v-validate="'min:2|max:40'"
			:error-messages="errors.has('photo_name')?errors.first('photo_name'):''"
			outlined
			clearable
			@change="namedEvent"
		>
		</v-text-field>
		<vue2Dropzone
			ref="dropzone"
			id="dropzone"
			@vdropzone-sending="fileSending"
			@vdropzone-success="uploadedSuccessfully"
			@vdropzone-error="handleFailedUploading"
			@vdropzone-max-files-exceeded="exceededMaxFiles"
			@vdropzone-processing="$emit('file-processing')"
			:options="dropzoneOptions">
		</vue2Dropzone>
		<span class="grey--text text--darken-1" v-show="getTemporaryPhotosId.length > 0">{{ getTemporaryPhotosId.length }}</span>
		<span class="red--text caption-1" v-show="validPhotoName">{{ fileAddedMessage }}</span>
		<div class="d-flex justify-end py-2">
			<v-btn text outlined v-show="photoName" @click="$refs.dropzone.processQueue()" color="primary">Add photo</v-btn>
		</div>
	</v-form>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import TokenService from '@/services/TokenService'

export default {
	name: 'photo-create-form',

	props: {
		albumId: {
			default: null,
			required: false
		}
	},

	components: {
		vue2Dropzone
	},

	data: () => ({
		photo_name: '',
		dropzoneOptions: {
			url: `${process.env.VUE_APP_API_URL}photos/addTemp/new`,
			maxFilesize: 10,
			headers: {'Authorization': TokenService.getFullAuthorization()},
			paramName: 'file',
			clickable: true,
			maxFiles: 10
		},
		fileNamed: false,
		fileAddedMessage: 'Cannot add multiple files when file has name'
	}),

	computed: {
		...mapGetters('photo', ['getTemporaryPhotosId']),
		photoName() {
			return this.photo_name.length > 0
		},

		validPhotoName() {
			return this.photoName && !this.$validator.errors.first('photo_name')
		}
	},

	methods: {
		...mapMutations('photo', ['setTempPhotos']),

		uploadedSuccessfully(file, res) {
			this.$store.commit('photo/setTempPhotos', res)
			this.$emit('file-processing')
			if (this.photo_name || this.fileNamed) {
				this.photo_name = ''
				this.fileNamed = false
				this.$refs.dropzone.setOption('maxFiles', 10)
				this.$refs.dropzone.setOption('clickable', true)
				this.$refs.dropzone.setOption('autoProcessQueue', true)
			}
		},

		fileSending(file, xhr, formData) {
			if (this.validPhotoName) {
				this.fileNamed = true
				this.$refs.dropzone.setOption('clickable', false)

				formData.append('file_name', this.photo_name)
			}
		},

		namedEvent() {
			if (this.validPhotoName) {
				this.fileNamed = true
				this.$refs.dropzone.setOption('maxFiles', 1)
				this.$refs.dropzone.setOption('autoProcessQueue', false)
			}
		},

		handleFailedUploading(file, message, xhr) {
			this.$notify.set({
				content: message,
				color: 'error'
			})
		},

		exceededMaxFiles(file) {
			this.$notify.set({
				content: 'Exceeded max files limit',
				color: 'error'
			})

			setTimeout(_ => {
				this.$refs.dropzone.removeFile(file)
			}, 1100)
		}
	},

	created() {
		this.$store.commit('photo/clearPhotoTemps')
	}
}
</script>
