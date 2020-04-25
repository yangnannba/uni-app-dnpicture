<template>
	<scroll-view scroll-y class="zhuanti" @scrolltolower="scrolltolower">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" circular>
			
			<swiper-item v-for="item in banner" :key="item.id">
				
				<image :src="item.thumb"></image>
			</swiper-item>

		</swiper>
		
		<view class="album">
			<view v-for="item in album" :key="item.id" class="album-item"  @click="tozhuantidetails(item.id)"   >
				<image mode="aspectFill"  :src="item.cover"></image>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="desc">{{item.desc}}</view>
					<view class="guanzhu">详细</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name:"zhuanti",
		data(){
			return {
				banner:[],
				album:[],
				params:{
					limit:10,
					order:"new",
					skip:0				
				},
				hasmore:true
			}
		},
		methods:{
			zhuanti(){
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				uni.request({
					url:"/image/v1/wallpaper/album",
					data:this.params,
					success: (result) => {
						//console.log(result.data.res.album);
						if(result.data.res.album == 0){
							this.hasmore = false;
							return;
						}
						if(this.banner.length == 0){
							this.banner = result.data.res.banner;
						}
						
						this.album = [...this.album,...result.data.res.album];
						
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			scrolltolower() {
				if(this.hasmore){
					this.params.skip += this.params.limit;
					this.zhuanti();				
				}else{
					uni.showToast({
						title:"数据没有了",
						icon:"none"
					})
				}

			},
			tozhuantidetails(id){
				uni.navigateTo({
					url:"../zhantiDetails/zhantiDetails?id="+id,
					success: () => {
						
					}
				})
			}
		},
		mounted(){
			this.zhuanti();
			uni.setNavigationBarTitle({
			    title: '专题'
			});			
		}
	}
</script>

<style lang="scss">
.zhuanti{
		height: calc(100vh - 56px);
}	
	
	
	
	.swiper{
		width: 100%;
		height:333rpx;
		image{
			width: 100%;
			
			height:333rpx;
		}
	}
	.album{
		padding: 20rpx 20rpx 0;
	}
	.album-item{
		display: flex;
		margin-bottom: 18rpx;
		padding-bottom: 18rpx;
		border-bottom: 2rpx solid #C8C7CC;
		&:nth-last-child(1){
			border-bottom: 0rpx solid #C8C7CC;
			margin-bottom: 0;
		}
		
		image{
			width: 220rpx;
			height: 180rpx;
			flex-shrink: 0;
			margin-right:16rpx;
		}
		.info{
			overflow: hidden;
			position: relative;
			flex: 1;
			.name{
				font-size: 34rpx;
				margin-bottom: 0.4rem;
			}
			.desc{
				font-size: 28rpx;
				color: #808080;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.guanzhu{
				color: $color;
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: 30rpx;
				border: 1rpx solid $color;
				border-radius: 4rpx;
				padding: 8rpx 16rpx;
			}
		}
	}
</style>
