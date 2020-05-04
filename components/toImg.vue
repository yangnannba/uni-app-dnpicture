<template>
	<view  @click="toimgDetails">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props:{
			list:Array,
			index:Number
		},
		methods:{
			toimgDetails(Id) {
				getApp().globalData.list =this.list;
				getApp().globalData.index =this.index;
				uni.navigateTo({
					//url:"../imgDetails/imgDetails",
					url:"/pages/imgDetails/imgDetails"
				})
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
