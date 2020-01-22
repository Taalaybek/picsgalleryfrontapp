<template>
	<div>
		<v-snackbar v-model="show" :color="color" :timeout="timeout">
			{{ content }}
			<v-btn color="white" text @click="show=false">Close</v-btn>
		</v-snackbar>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Notify',

	data() {
		return {
			timeout: 3000,
			show: false,
			content: '',
			color: ''
		}
	},

	created() {
		this.$store.subscribe((mutation, state) => {
			if (mutation.type === 'setNotifyData') {
				this.color = state.notify.color
				this.content = state.notify.content
				this.show = true
			}
		})

		setTimeout(() => {
			this.show = false
			this.$store.commit('clearNotification')
		}, this.timeout);
	},
}
</script>