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
							<v-text-field v-model="first_name" label="First Name" type="text" dense counter="12" append-outer-icon="mdi-account" outlined required clearable autofocus></v-text-field>
							<v-text-field v-model="last_name" label="Last Name" type="text" dense counter="12" append-outer-icon="mdi-account" outlined required clearable></v-text-field>
							<v-text-field v-model="email" label="Email" type="text" dense counter="20" append-outer-icon="mdi-at" outlined required clearable></v-text-field>
							<v-text-field v-model="username" label="Username" type="text" dense counter="15" append-outer-icon="mdi-account-circle-outline" outlined required clearable></v-text-field>
							<v-text-field v-model="password" label="Password" 
							:type="showPassword?'text':'password'" 
							:append-icon="showPassword?'mdi-eye-off':'mdi-eye'" 
							@click:append="showPassword = !showPassword"
							dense outlined counter="25" append-outer-icon="mdi-textbox-password" required clearable></v-text-field>
							<v-text-field v-model="confirm_password" 
							label="Confirm password" 
							:type="showConPassword ? 'text' : 'password'" 
							:append-icon="showConPassword?'mdi-eye-off':'mdi-eye'" 
							@click:append="showConPassword = !showConPassword" hint="Reenter the password" 
							dense outlined counter="25" append-outer-icon="mdi-textbox-password" required clearable></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn color="primary" class="px-3">Submit</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-layout>
</template>
<script>
export default {
	name: 'register',

	data: () => ({
		first_name: '',
		last_name: '',
		email: '',
		username: '',
		showPassword: false,
		showConPassword: false
	}),

	created () {
		
	}
}
</script>