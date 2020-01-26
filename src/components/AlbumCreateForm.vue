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
				:error-messages="errors.has('album_name')?errors.first('album_name'):''" required autofocus outlined append-icon="mdi-asterisk"></v-text-field>
				<v-textarea name="album_description" label="Album description" v-model="album_description" v-validate="'min:10|max:400'" 
				:error-messages="errors.has('album_description')?errors.first('album_description'):''" auto-grow outlined clearable></v-textarea>
				<!-- end album inputs -->

				<!-- photo inputs -->
				<template v-if="withPhoto">
					<v-text-field name="photo_name" type="text" label="Photo name" v-model="photo_name" 
					v-validate="'min:2|max:10'" :error-messages="errors.has('photo_name')?errors.first('photo_name'):''" outlined clearable></v-text-field>
					<v-file-input name="photo_file" label="Photo file" accept="image/png, image/jpeg, image/bmp" id="photo_file" class="required-input" 
					v-validate="'size:10000|image|mimes:image/png,jpeg,bmp'" :error-messages="errors.has('photo_file')?errors.first('photo_file'):''" chips show-size outlined append-icon="mdi-asterisk" clearable></v-file-input>
				</template>
				<!-- end photo inputs -->
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" :disabled="$validator.errors.any()" outlined>{{ btnTitle }}</v-btn>
			</v-card-actions>
		</v-card>
	</v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'album-create-form',

	data: () => ({
		album_name: '',
		album_description: '',
		photo_name: '',
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
	}
}
</script>
<style >
	.required-input .v-input__append-inner .v-input__icon .v-icon {
		font-size: 12px;
		color: red !important;
	}
</style>