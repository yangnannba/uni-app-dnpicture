<template>
	<view class="zhuantidetails">
		<view class="banner">
			<image class="banner-img" mode="widthFix" :src="album.cover"></image>
			<view class="info-wrap">
				<view class="name">{{album.name}}</view>
				<view class="guanzhu">+ 关注</view>
			</view>
		</view>
		
		<view>
			<view class="title" v-if="album.user" >
				<image  :src="album.user.avatar" mode="widthFix"></image>
				<text>{{album.user.name}}</text>
			</view>
			<view class="desc">
				<text>{{album.desc}}</text>
			</view>
		</view>
		
		<view class="wallpaper">
			<view class="item" v-for="item in wallpaper">
				<image mode="aspectFill" :src="item.img+item.rule.replace('$<Height>',300)"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				details:{},
				myid:"",
				params:{
					limit:6,
					order:"new",
					skip:0,
					first:1
				},
				album:{},
				wallpaper:[],
				hastrue:true
			}
		},
		methods: {
			getdetails() {
				
				uni.showLoading({
					title:"加载中",
					mask:true
				})				
				
				uni.request({
					url:"/image/v1/wallpaper/album/"+this.myid+"/wallpaper",
					data:this.params,
					success: (result) => {

						if(result.data.res.wallpaper.length == 0){
							
							this.hastrue =false;
							uni.showToast({
								title:"数据没有了",
								icon:"none"
							})
							return;
							
						}
						if(this.params.first == 1){
							this.album = result.data.res.album;
						}
						
						this.wallpaper = [...this.wallpaper,...result.data.res.wallpaper];
						
						//console.log(result.data);
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			}
		},
		onReachBottom() {
			this.params.first = 0;
			if(this.hastrue){
				this.params.skip += this.params.limit
				this.getdetails();	
				//console.log(11);
			}

			
		},
		onLoad(option) {
			this.myid =option.id;
			this.getdetails();
		}
	}
</script>

<style lang="scss">
.banner{
	position: relative;
	.banner-img{
		width: 100%;
	}
	.info-wrap{
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
		
		.name{
			font-size: 28rpx;
			color: #fff;
		}
		.guanzhu{
			width: 120rpx;
			line-height: 54rpx;
			background: $color;
			color: #fff;
			border-radius: 6rpx;
			font-size: 30rpx;
			text-align: center;
		}
	}
}
.title{
	padding:20rpx 20rpx 0;
	image{
		width:60rpx;
		border-radius:50%;
		vertical-align: middle;
		margin-right:16rpx;
	}
	text{
		font-size: 30rpx;
		color:#000;
	}
}
.desc{
	padding:20rpx;
	font-size: 28rpx;
	color:#666;
}
.wallpaper{
	display: flex;
	flex-wrap: wrap;
	.item{
		width:50%;
		flex-grow: 0;
		flex-shrink: 0;
		border:3rpx solid #fff;
		box-sizing:border-box;
		image{
			width:100%;
			display: block;
		}
	}
}
</style>
