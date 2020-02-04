<template>
	<v-layout>
		<v-row align="start" justify="center">
			<v-col cols="12" sm="8" md="4">
				<v-card elevation="5">
					<v-progress-linear color="teal" :active="getRequest" height="8" :indeterminate="getRequest" bottom></v-progress-linear>

					<v-toolbar color="primary" flat>
						<v-toolbar-title class="white--text">Login form</v-toolbar-title>
					</v-toolbar>

					<v-card-text>
						<v-form>
							<v-text-field v-model="username" label="Username or Email" type="text" name="username" 
							dense counter="60" append-outer-icon="mdi-account" v-validate="'required|min:6|max:60'" 
							:error-messages="errors.has('username')?errors.first('username'):''" outlined required v-on:keyup.enter.shift="handleShiftEnter" clearable></v-text-field>

							<v-text-field v-model="password" label="Password" :type="showPassword?'text':'password'" 
							name="password" :append-icon="showPassword?'mdi-eye-off':'mdi-eye'" dense counter="20" 
							append-outer-icon="mdi-textbox-password" v-validate="'required|min:8|max:30'" 
							:error-messages="errors.has('password')?errors.first('password'):''" @click:append="showPassword = !showPassword" 
							outlined required v-on:keyup.enter.shift="handleShiftEnter" clearable></v-text-field>
						</v-form>
					</v-card-text>

					<v-card-actions>
						<v-spacer />
						<v-btn color="primary" :disabled="$validator.errors.any() || !this.isComplete" @click="submit" class="px-3">Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-layout>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
	name: 'login',

	data () {
		return {
			username: '',
			password: '',
			showPassword: false,
			requestedStatus: true
		}
	},

	computed: {
		...mapGetters(['getRequest']),
		isComplete() {
			return this.username && this.password
		}
	},

	methods: {
		...mapActions(['login']),
		submit: function () {
			const { username, password } = this
			this.login({ username, password })
				.then(response => {
					this.$notify.set({content: process.env.VUE_APP_SUCCESS_LOGIN, color: 'success'})
					this.$router.push('/home')
				})
		},
		handleShiftEnter: function () {
			if (!this.$validator.errors.any()) {
				this.submit()
			} else {
				this.$notify.set({content: process.env.VUE_APP_ENTER_VALID_DATA, color: 'error'})
			}
		}
	}
}
</script>
