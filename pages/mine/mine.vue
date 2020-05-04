<template>
	<view class="my">
		<view class="info-wrap">
			<image :src="avatarUrl"></image>
			<view>{{nickName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:"昵称",
				avatarUrl:"/static/logo.png"
			}
		},
		methods: {
			mylogin() {
				console.log(11)
				uni.login({
					provider:"weixin",
					success: (res) => {
						//console.log(res)
						uni.getUserInfo({
							provider:"weixin",
							success: (result) => {
								console.log(result.userInfo);
								this.nickName = result.userInfo.nickName;
								this.avatarUrl = result.userInfo.avatarUrl;
							}
						})
					}
				})
				console.log(222)
			}
		},
		onLoad() {
			this.mylogin();
		}
	}
</script>

<style lang="scss">
.my{
	position: relative;
	width:100vw;
	
	
/*  #ifdef   MP-WEIXIN   */	
	height: 100vh;		
/*  #endif  */

/*  #ifdef  H5   */
	height:calc(100vh - 94px);		
/*  #endif  */		
	
	
	display: flex;
	justify-content: center;
	align-items: center;
	background:#6db976 url(../../static/bg.png);
	
		
	.info-wrap{
		text-align: center;
		image{
			width:160rpx;
			height:160rpx;
			display: block;
			border-radius:50%;
		}
		view{
			font-size: 36rpx;
			margin-top:30rpx;
		}
	}
	
}
</style>
