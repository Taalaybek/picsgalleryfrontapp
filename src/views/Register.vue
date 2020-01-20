<template>
	<v-layout>
		<v-row align="start" justify="center">
			<v-col cols="12" sm="8" md="4">
				<v-card elevation="5">
					<v-toolbar
					color="primary"
					flat
					dark>
						<v-toolbar-title>Register form</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form>
							<v-text-field v-model="first_name" label="First Name" type="text" name="first_name" dense counter="12" append-outer-icon="mdi-account" 
							v-validate="'required|alpha|min:3|max:12'" :error-messages="errors.has('first_name')?errors.first('first_name'):''" 
							outlined required clearable autofocus></v-text-field>

							<v-text-field v-model="last_name" label="Last Name" type="text" name="last_name" dense counter="12" append-outer-icon="mdi-account" 
							v-validate="'required|alpha|min:3|max:12'" :error-messages="errors.has('last_name')?errors.first('last_name'):''" 
							outlined required clearable></v-text-field>

							<v-text-field v-model="email" label="Email" type="text" name="email" dense counter="20" append-outer-icon="mdi-at" 
							v-validate="'required|email|min:6|max:60|unique'" :error-messages="errors.has('email')?errors.first('email'):''" 
							outlined required clearable></v-text-field>

							<v-text-field v-model="username" label="Username" type="text" name="username" dense counter="15" append-outer-icon="mdi-account-circle-outline" 
							v-validate="'required|alpha_num|min:6|max:20'" :error-messages="errors.has('username')?errors.first('username'):''" outlined required clearable></v-text-field>

							<v-text-field v-model="password" label="Password" :type="showPassword?'text':'password'" name="password" :append-icon="showPassword?'mdi-eye-off':'mdi-eye'" 
							v-validate="'required|min:8|max:30'" :error-messages="errors.has('password')?errors.first('password'):''" ref="password" @click:append="showPassword = !showPassword"
							dense outlined counter="25" append-outer-icon="mdi-textbox-password" required clearable></v-text-field>

							<v-text-field v-model="confirm_password" label="Confirm password" :type="showConPassword ? 'text' : 'password'" name="confirm_password" 
							v-validate="'required|min:8|max:20|confirmed:password'" :error-messages="errors.has('confirm_password')?errors.first('confirm_password'):''" 
							:append-icon="showConPassword?'mdi-eye-off':'mdi-eye'"  @click:append="showConPassword = !showConPassword" 
							hint="Reenter the password" dense outlined counter="25" append-outer-icon="mdi-textbox-password" required clearable></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn color="primary" :disabled="$validator.errors.any() || !this.isComplete" class="px-3">Submit</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-layout>
</template>
<script>
import { Validator } from 'vee-validate'
import axios from 'axios'

export default {
	name: 'register',

	data () {
		return {
			first_name: '',
			last_name: '',
			email: '',
			username: '',
			showPassword: false,
			showConPassword: false,
			password: '',
			confirm_password: ''
		}
	},

	computed: {
		isComplete() {
			return this.first_name && this.last_name && this.email && this.password && this.confirm_password
		}
	},

	mounted() {
		const isUnique = this.isUnique
		Validator.extend('unique', {
			validate: isUnique,
			getMessage: (field, params, data) => data.message
		})
	},
	methods: {
		isUnique: function (value) {
			return this.$axios.post('common/checkEmail', {email: value})
				.then(response => {
					return {
						valid: true
					}
				})
				.catch(error => {
					return {
						valid: false, 
						data: {
							message: error.response.data.errors.email[0]
						}
					}
				})
		}
	}
}
</script>