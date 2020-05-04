<template>
	<view class="video">
		<div class="img-wrap">
			<image class="img" :src="video.img"></image>
		</div>
		<view class="btn-wrap">
			<view :class="{stop:muted}" @click="totoggle"><uni-icons type="sound" size="30" color="#fff"></uni-icons></view>
			<view><uni-icons type="redo" size="30" color="#fff"></uni-icons><button open-type="share"></button></view>
		</view>
		<view class="video-wrap">
			<video :src="video.video" object-fit="cover" :muted="muted"></video>
			<!--<image :src="video.img"></image>-->
		</view>
		<view class="downvideo" @click='downvideo'>下载视频</view>
	</view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue"
export default {
	data() {
		return {
			video:{},
			muted:false
		}
	},
	methods: {
		downvideo() {

			uni.showLoading({
				title:"下载中"
			})
			
			uni.downloadFile({
				url:this.video.video,
				success:(result) => {
					uni.saveVideoToPhotosAlbum({
						filePath:result.tempFilePath,
						success: () => {
							uni.showToast({
								title:"保存成功"
							})
						},
						complete: () => {
							uni.hideLoading()
						}						
					})
				}
			})
			/*
			uni.downloadFile({
				url:this.video.img,
				success:(result) => {
					uni.saveImageToPhotosAlbum({
						filePath:result.tempFilePath,
						success: () => {
							uni.showToast({
								title:"保存成功"
							})
						},
						complete: () => {
							uni.hideLoading()
						}							
					})
				}
			})*/
			
		},
		totoggle() {
			this.muted = !this.muted;
		}
	},
	onLoad() {
		this.video = getApp().globalData.video;
		//console.log(this.video)
	},
	components: {
		uniIcons
	}
}
</script>

<style lang="scss">
.video{
	position: relative;
	.img-wrap{
		position: absolute;
		top:0;
		left:0;
		width:100vw;
		z-index: -1;
		
		image{
			width:100%;
			
			
/*  #ifdef   MP-WEIXIN   */	
	
	height: 100vh;		

/*  #endif  */

/*  #ifdef  H5   */
	
	height:calc(100vh - 56px);		

/*  #endif  */					
			
			
			
			
			filter: blur(10px);
			display: block;
		}
	}
	.btn-wrap{
		display: flex;
		justify-content: flex-end;
		.stop{
			text-decoration:line-through;
		}
		view{
			width:80rpx;
			height:80rpx;
			border: 1px solid #fff;
			display: inline-block;
			border-radius: 50%;
			color:#fff;
			background: rgba(0,0,0,0.3);
			margin-right:10rpx;
			line-height: 80rpx;
			text-align: center;
			position: relative;
			button{
				position: absolute;
				top:0;
				right:0;
				bottom:0;
				left:0;
				opacity: 0;
			}
		}
	}
	.video-wrap{
		width:360rpx;
		height:600rpx;
		margin:0 auto;
		video,image{
			width:360rpx;
			height:600rpx;			
		}
	}
	.downvideo{
		width:360rpx;
		height:80rpx;
		line-height: 80rpx;
		background: rgba(0,0,0,0.4);
		color:#fff;
		text-align: center;
		margin:30rpx auto 0;
		border-radius: 100rpx;
		font-size: 40rpx;
		border:1px solid #fff;
		
	}
}
</style>
