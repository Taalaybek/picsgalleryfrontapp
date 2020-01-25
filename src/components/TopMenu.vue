<template>
	<div>
		<v-app-bar app absolute light fixed hide-on-scroll>
			<v-btn icon large to="/">
				<v-avatar size="32px" tile item>
					<v-img src="@/assets/images/favicon-32x32.png" />
				</v-avatar>
			</v-btn>
			<v-toolbar-title>PicsGallery</v-toolbar-title>
			
			<v-spacer></v-spacer>
			
			<v-toolbar max-width="430" flat class="d-flex flex-row justify-end">
				<v-toolbar-items class="px-0">
					<v-btn depressed text class="grey--text text--darken-3">Albums</v-btn>
					<v-btn depressed text class="grey--text text--darken-3">Users</v-btn>

					<template v-if="checkAuth">
						<v-btn depressed text to="/home" class="grey--text text--darken-3">Home</v-btn>
						<v-btn depressed text class="grey--text text--darken-3">Account</v-btn>
						<v-btn depressed text @click="submit" class="grey--text text--darken-3">Sign Out</v-btn>
					</template>
					<template v-else>
						<v-btn depressed text to="register" class="pink--text text--lighten-2">Sign Up</v-btn>
						<v-btn depressed text to="login" class="indigo--text text--darken-1">Sign In</v-btn>
					</template>
				</v-toolbar-items>
			</v-toolbar>
		</v-app-bar>
	</div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	name: 'top-menu',

	data: () => ({
		snackbar: false,
		timeout: 1000
	}),

	computed: {
		...mapGetters(['checkAuth'])
	},

	methods: {
		...mapMutations(['clearNotification']),
		...mapActions(['logout']),
		submit: function () {
			this.logout()
				.then(response => {
					this.$router.push('login')
				})
		}
	},
	created() {
		this.$store.dispatch('checkAuthorization')
	}
}
</script>