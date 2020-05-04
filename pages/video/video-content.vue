<template>
	<scroll-view scroll-y class="videocontent-wrap" enable-flex  @scrolltolower="scrolltolower">
		<view class="videocontent">
			<view class="item" v-for="item in videolist" :key="item.id" @click="tovideodetails(item)">
				<image mode="aspectFill" :src="item.img"></image>
			</view>			
		</view>

	</scroll-view>
</template>

<script>
	export default{
		name:"videocontent",
		props:["current"],
		data() {
			return {
				myurl:"",
				fullurl:"",
				params:{
						limit:18,
						skip:0,
						order:"hot"					
				},
				videolist:[],
				hasmore:true
				
			}
		},
		watch:{
			current:function() {
				this.videolist = [];
				this.videocontent();
			}
		},
		methods:{
			videocontent() {
				if(this.current == 0){
					this.myurl ="/videoimg/v1/videowp/featured";
					this.fullurl = "http://157.122.54.189:9088/videoimg/v1/videowp/featured";

				}else if(this.current == 1){
					this.myurl ="/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a";
					this.fullurl = "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a";
					this.params.order="new";
					
				}else if(this.current == 2) {
					this.myurl ="/videoimg/v1/videowp/videowp";
					this.fullurl = "http://157.122.54.189:9088/videoimg/v1/videowp/videowp";
					this.params.order="new";						
				}else if(this.current == 3) {
					this.myurl ="/videoimg/v1/videowp/videowp";
					this.fullurl = "http://157.122.54.189:9088/videoimg/v1/videowp/videowp";					
				}
				uni.showLoading({
					title:"数据加载中"
				})
				uni.request({
					
					// #ifdef H5 
					url:this.myurl,
					//  #endif
					
					// #ifdef MP-WEIXIN 
					url:this.fullurl,
					//  #endif	
										
					
					data:this.params,
					success: (result) => {
				//console.log(this.current)
						if(result.data.res.videowp.length == 0){
							this.hasmore =false;
							uni.showToast({
								title:"数据没有了",
								icon:"none"
							})
							return ;
						}
						this.videolist = [...this.videolist,...result.data.res.videowp];
						//console.log(this.videolist);
					},
					complete: () => {
						uni.hideLoading()
					}
				})	
			},
			scrolltolower() {
				if(this.hasmore){
					this.params.skip += this.params.limit;		
					this.videocontent();					
				}else{
					uni.showToast({
						title:"数据没有了",
						icon:"none"
					})					
				}

			},
			tovideodetails(item) {
				getApp().globalData.video = item;
				uni.navigateTo({
					url:"videoDetails/videoDetails",
				})
			}
		},
		mounted() {
			this.videocontent()
		}
	}
</script>

<style lang="scss">
	
/*  #ifdef   MP-WEIXIN   */	
	.videocontent-wrap{		
	height: calc(100vh - 56px);		
	}
/*  #endif  */

/*  #ifdef  H5   */
	.videocontent-wrap{		
	height: calc(100vh - 150px);		
	}
/*  #endif  */		
	
	
	
	

	
	
	.videocontent{

	display:flex;
	flex-direction: row;
	flex-wrap: wrap;
	.item{
		position:relative;
		width:33.33%;
		border:2rpx solid #fff;
		box-sizing: border-box;
		image{
			width:100%;
			display: block;
		}		
	}
	}
</style>
