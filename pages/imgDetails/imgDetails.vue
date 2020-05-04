<template>
	<view>
		<view class="user">
			<view class="user-avatar">
				<image :src="imgDetails.user.avatar"></image>
			</view>
			<view class="user-info"> 
				<view class="name">{{imgDetails.user.name}}</view>
				<view class="viptime" v-if="imgDetails.user">{{imgDetails.user.viptime | totime}}</view>
			</view>
		</view>
		<view class="thumb">
			<mySwiper @swierAction="handerswierAction">
				<image mode="widthFix" :src="imgDetails.thumb"></image>
			</mySwiper>
		</view>
		<view class="danzan-shoucang">
			<view class="danzan"><uni-icons type="hand-thumbsup" size="18"></uni-icons>{{imgDetails.user.follower}}</view>
			<view class="shoucang"><uni-icons type="heart" size="18"></uni-icons>收藏</view>
		</view>
		<view class="xiangguan" v-if="album">
			<view class="title"><uni-icons type="eye" size="18"></uni-icons>相关</view>
			<view v-for="item in album" :key="item.id" class="item">
				<view class="cover">
					<image :src="item.cover"></image>
				</view>
				<view class="name-wrap">
					<view class="zhuanji">专辑</view>
					<view class="name">{{item.name}}</view>
				</view>
				<view class='icon-right'><uni-icons type="arrowright" size="18"></uni-icons></view>
			</view>
		</view>
		
		<view class="pinglun" v-if="comment.length > 0">
			<view class="title"><uni-icons type="chat" size="18"></uni-icons>最新评论</view>
			<view v-for="item in comment" :key="item.id" class="item-wrap">
				<view  class="item">
					<view class="avatar">
						<image :src="item.user.avatar"></image>
					</view>
					<view class="name-wrap">
						<view class="ping-name">{{item.user.name}}</view>
						<view class="atime">{{item.atime  | totime}}</view>
					</view>
				</view>
				<view class="content-wrap">
					<view class="content">{{item.content}}</view>
					<view class="following"><uni-icons type="hand-thumbsup" size="18"></uni-icons>{{item.user.follower}}</view>
				</view>				
			</view>
		</view>	
		
		<view class="pinglun" v-if="hot.length>0">
			<view class="title"><uni-icons type="chat" size="18"></uni-icons>最热评论</view>
			<view v-for="item in hot" :key="item.id" class="item-wrap">
				<view  class="item">
					<view class="avatar">
						<image :src="item.user.avatar"></image>
					</view>
					<view class="name-wrap">
						<view class="ping-name">{{item.user.name}}</view>
						<view class="atime">{{item.atime  | totime}}</view>
					</view>
				</view>
				<view class="content-wrap">
					<view class="content">{{item.content}}</view>
					<view class="following"><uni-icons type="hand-thumbsup" size="18"></uni-icons>{{item.user.follower}}</view>
				</view>				
			</view>
		</view>	
		
		<view class="downpicture" @click="downpicture">
			下载图片
		</view>
			
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import mySwiper from '../../components/myswiper.vue'
	export default {
		data() {
			return {
				imgDetails:"",
				album:[],
				comment:[],
				hot:[],
				index:0
			}
		},
		filters:{
			totime(val) {
				let date = new Date(val);
				let month = date.getMonth()+1;
				let day = date.getDate();
				return  day +"日 / " + month +"月";
			}
		},
		methods: {
			getimgdetails() {
				let {list} = getApp().globalData;
				this.imgDetails = list[this.index];
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				uni.request({
					url:"/image/v2/wallpaper/wallpaper/"+ this.imgDetails.id +"/comment",
					success: (result) => {
						//console.log(result.data.res);
						this.album = result.data.res.album;
						this.comment = result.data.res.comment;
						this.hot = result.data.res.hot;
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			handerswierAction(e) {
				//console.log(e);
				let {list} = getApp().globalData;
				if(e.direction == 'left' && this.index < (list.length-1) ){
					this.index++;
					//this.imgDetails = list[this.index];
					this.getimgdetails();
				}else if(e.direction == 'right' && this.index >0 ){
					this.index--;
					//this.imgDetails = list[this.index];
					this.getimgdetails();
				}else{
					uni.showToast({
						title:"没有数据了",
						icon:"none"
					})
				}
			},
		    downpicture() {
				uni.showLoading({
					title:"下载中"
				})
				uni.downloadFile({
					url: this.imgDetails.thumb,
					success:(result) => {
						//console.log(result.tempFilePath)
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
				})
			}
		},
		onLoad(options) {
			let { index} = getApp().globalData;
			this.index = index;	
			this.getimgdetails();
		},
		components: {
			uniIcons,
		    mySwiper
		}
	}
</script>

<style lang="scss">
.user{
	padding: 30rpx;
	display: flex;
	.user-avatar{
		width:100rpx;
		height:100rpx;
		flex-shrink: 0;
		margin-right:10rpx;
		image{
			width:100%;
			height:100%;
			border-radius: 50%;
		}
	}
	.user-info{
		display: flex;
		flex-direction: column;
		justify-content: center;
		.name{
			color:#000;
			font-size: 32rpx;
		}
		.viptime{
			font-size: 26rpx;
			color:#999;
		}
	}
}
.thumb{
	width:100%;
	border-bottom:1px solid #eee;
	image{
		width:100%;
		display: block;
	}
}
.danzan-shoucang{
	display: flex;
	font-size: 30rpx;
	border-bottom:1px solid #ddd;
	line-height: 80rpx;
	margin-bottom:30rpx;
	.danzan,.shoucang{
		width:50%;
		text-align: center;
		vertical-align: middle;
		.uni-icons{
			vertical-align: middle;
			margin-right:8rpx;
		}
	}
	
}


.xiangguan{
	padding:20rpx;
	.title{
		font-size: 36rpx;
		margin-bottom:30rpx;
		.uni-icons{
			margin-right:10rpx;
		}
	}
	.item{
		
		display: flex;
		border-bottom:1px solid #ddd;
		padding-bottom:20rpx;
		position:relative;
		.icon-right{
			position: absolute;
			top:70rpx;
			right:30rpx;
		}
		.cover{
			width:200rpx;
			height:200rpx;
			flex-shrink: 0;
			margin-right:12rpx;
			image{
				width:100%;
				height:100%;
			}
		}
		.name-wrap{
			.zhuanji{
				display: inline-block;
				background: $color;
				color: #fff;
				font-size: 30rpx;
				padding:4rpx 10rpx;
			}
			.name{
				font-size: 32rpx;
				color:#333;
			}
			
		}

	}
	
}

.pinglun{
	padding:20rpx;
	.title{
		font-size: 36rpx;
		margin-bottom:30rpx;
		.uni-icons{
			margin-right:10rpx;
		}
	}
	.item-wrap{
		border-bottom:1px solid #ddd;		
		margin-bottom:20rpx;
	}
	.item{
		
		display: flex;

		padding-bottom:20rpx;
		position:relative;


		.name-wrap{

			.ping-name{
				font-size: 30rpx;
				color:#333;
			}
			.atime{
				font-size: 32rpx;
				color:#999;
			}
			
		}
		.avatar{
			width:80rpx;
			height:80rpx;
			flex-shrink: 0;
			margin-right:12rpx;
			image{
				width:100%;
				height:100%;
			}			
			
		}
	}
	.content-wrap{
		padding:20rpx 60rpx 20rpx 90rpx;
		position: relative;
		.content{
			font-size: 32rpx;
			color:#000;
		}
		.following{
			font-size: 30rpx;
			position:absolute;
			bottom:20rpx;
			right:0;
		}
	}
	
}
.downpicture{
	height:80rpx;
	line-height: 80rpx;
	background: $color;
	color:#fff;
	font-size: 32rpx;
	text-align: center;
	margin:0 20rpx 30rpx;
}
</style>
