<template>
	<v-layout flex column>
		<div id="columns">
			<div class="card elevation-5 pa-1" v-for="(item, i) in albumList" :key="i">
				<v-img :src="qtyPhotos(item) === 0 ? require('../assets/images/no-photo-available.png') : small(item)" width="100%" class="card-img" height="auto" :alt="albumName(item)">
					<div class="card-actions">
						<span class="card-up-actions px-2 d-flex justify-space-between" v-if="checkAuth && currentUserId == albumCreator(item).id">
							<v-btn small min-width="30" color="grey lighten-3" class="pa-1">
								<v-icon size="20" color="grey darken-1">mdi-delete</v-icon>
							</v-btn>
							<v-btn small min-width="30" color="grey lighten-3" class="pa-1">
								<v-icon size="20" color="grey darken-1">mdi-pencil</v-icon>
							</v-btn>
						</span>

						<!-- USER PAGE LINK -->
						<span class="card-down-actions d-flex justify-space-between align-end px-2">
							<router-link :to="`/album/${item.id}`" class="grey--text text--lighten-4 subtitle-1 card-user-link font-weight-light">
								{{albumName(item)}}
							</router-link>
							<v-btn small min-width="50" class="d-flex justify-space-between pa-1">
								<v-icon size="20" color="grey darken-1">mdi-image-multiple</v-icon> 
								<span class="grey--text text--darken-3 caption">{{ qtyPhotos(item) }}</span>
							</v-btn>
						</span>
					</div>
				</v-img>
			</div>
		</div>
	</v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import {VImg} from 'vuetify'

export default {
	name: 'home',

	data: () => ({
		albumList: {},
		base_url: process.env.VUE_APP_STORAGE_URL,
		meta: {},
		links: {}
	}),

	components: {
		VImg
	},

	computed: {
		...mapGetters(['getRequest', 'checkAuth']),
		...mapGetters('user', ['getUser']),
		...mapGetters('album', ['getCurrentUserAlbums']),
		currentUserId() {
			return this.getUser.id
		}
	},

	created() {
		this.fetchMyAlbums()
	},

	methods: {
		async fetchMyAlbums() {
			await this.$store.dispatch('album/fetchAlbumsOfCurrentUser')
				.then(res => {
					this.albumList = this.getCurrentUserAlbums.data
					this.meta = this.getCurrentUserAlbums.meta
					this.links = this.getCurrentUserAlbums.links
				})
		},

		small(item) {
			return this.base_url + item.included.oldest.attributes.thumbnails.small
		},

		albumName(item) {
			return item.attributes['name']
		},

		qtyPhotos(item) {
			return item.included.count
		},

		albumCreator(item) {
			return item.included.creator
		}
	}
}
</script>

<style lang="scss">
	#columns {
		column-width: 268px;
		column-gap: 10px;
		width: 100%;
		max-width: 1100px;
	}
	#columns div.card {
		position: relative;
		height: auto;
		cursor: pointer;
		margin-bottom: 0.5em;
		transition: opacity .4s ease-in-out;
		-webkit-column-break-inside: avoid;

		:hover {
			div.card-actions {
				width: 100%;
				height: 100%;
				display: block;
				background-color: rgba(97, 97, 97, 0.5);
			}
		}

		.card-img {
			.card-actions {
				display: none;

				.card-up-actions {
					top: 5px;
					right: 0px;
					width: 100%;
					position: absolute;
				}

				.card-down-actions {
					width: 100%;
					bottom: 5px;
					position: absolute;
					.card-user-link {
						text-decoration: none
					}
				}	
			}
		}
	}

	@media screen and (max-width: 750px) { 
		#columns { column-gap: 0px; }
		#columns div { width: 100%; }
	}
</style>
