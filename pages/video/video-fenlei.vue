<template>
	<scroll-view scroll-y class="videocategory">
		<view class="category">
			<view v-for="item in category" class="category-item" @click="tocategory(item.id)">
				<image mode="aspectFill" :src="item.cover"></image>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name:"videocategory",
		data() {
			return {
				category:[]
			}
		},
		methods:{
			getcategory() {
				uni.request({
					// #ifdef H5 
					url:"/videoimg/v1/videowp/category",
					//  #endif
					
					// #ifdef MP-WEIXIN 
					url:"http://157.122.54.189:9088/videoimg/v1/videowp/category",
					//  #endif	
					
					success: (result) => {
						//console.log(result);
						this.category =result.data.res.category;
					}
				})
			},
			tocategory(id) {
				uni.navigateTo({
					url:"./videoCategory/videoCategory?id="+id
				})
			}
		},
		mounted() {
			this.getcategory()
		}
	}
</script>

<style lang="scss">

/*  #ifdef   MP-WEIXIN   */	
	.videocategory{		
	height: calc(100vh - 56px);		
	}
/*  #endif  */

/*  #ifdef  H5   */
	.videocategory{		
	height: calc(100vh - 150px);		
	}
/*  #endif  */			
	
	
	.category{
		display:flex;
		flex-direction: row;
		flex-wrap: wrap;
		.category-item{
			position:relative;
			width:50%;
			border:2rpx solid #fff;
			box-sizing: border-box;
			image{
				width:100%;
				
				display: block;
			}	
			.name{
				font-size: 30rpx;
				color:#fff;
				position: absolute;
				bottom:0;
				left:0;
				width:100%;
				line-height: 50rpx;
				height:50rpx;
				text-indent: 6rpx;
			}
		}		
	}
</style>
