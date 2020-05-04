<template>
	<scroll-view class="category-wrap" scroll-y>
		<view class="category">
			<view v-for="item in category" :key="item.id" class="category-item" @click="tocategory(item.id)">
				<image mode="aspectFill" :src="item.cover"></image>
				<view class="rname">{{item.rname}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name:"fenlei",
		data() {
			return {
				category:[]
			}
		},
		methods:{
			getcategory() {
				uni.request({
					// #ifdef H5 
					url:"/image/v1/vertical/category",
					//  #endif
					
					// #ifdef MP-WEIXIN 
					url:"http://157.122.54.189:9088/image/v1/vertical/category",
					//  #endif
						
					success: (result) => {
						//console.log(result.data.res.category);
						this.category = result.data.res.category;
					}
				})
			},
			tocategory(id) {
				uni.navigateTo({
					url:"./prctureCategory/prctureCategory?id="+id
				})
			}
		},
		mounted(){
			uni.setNavigationBarTitle({
			    title: '分类'
			});
			this.getcategory();
		},
		
	}
</script>

<style lang="scss">
.category-wrap{


	
/*  #ifdef   MP-WEIXIN   */	
		height: calc(100vh - 56px);
/*  #endif  */

/*  #ifdef  H5   */
		height: calc(100vh - 150px);
/*  #endif  */		
	
	
	
	
	
	
	.category{
		display:flex;
		flex-direction: row;
		flex-wrap: wrap;		
	}
	.category-item{
		position:relative;
		width:33.33%;
		border:2rpx solid #fff;
		box-sizing: border-box;
		image{
			width:100%;
			display: block;
		}
		.rname{
			position: absolute;
			bottom:0;
			left:0;
			width:100%;
			line-height: 50rpx;
			font-size: 36rpx;
			color:#fff;
			background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.3));
			text-indent: 6rpx;
		}
	}
	
}
</style>
