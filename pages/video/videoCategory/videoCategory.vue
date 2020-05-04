<template>
	<view>
		
		<view class="uni-segmented-control">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
		</view>
        
        <scroll-view scroll-y class="content"  @scrolltolower="scrolltolower">
			<view class="vertical">
				<view class="vertical-item" v-for="item in videowp" @click="tovideodetails(item)">
					<image :src="item.img"></image>
				</view>
			</view>
         </scroll-view>		
		
		

		
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	
	export default {
		data() {
			return {
				items: ['最新','热门'],
				current: 0,
				id:0,
				params:{
					limit:18,
					skip:0,
					order:"new"
				},
				videowp:[],
				hasmore:true
			}
		},
		methods: {
			getvertical() {
				uni.showLoading({
					title:"加载中"
				})
				uni.request({
					// #ifdef H5 
					url:"/videoimg/v1/videowp/category/"+this.id,
					//  #endif
					
					// #ifdef MP-WEIXIN 
					url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/"+this.id,
					//  #endif
					data:this.params,
					success: (result) => {
						//console.log(result);
						if( result.data.res.videowp.length == 0 ){
							uni.showToast({
								title:"数据没有了",
								icon:"none"
							})
							this.hasmore = false;
							return;
						}
						this.videowp = [...this.videowp,...result.data.res.videowp];
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			onClickItem(e) {
				
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				if(this.current == 0){
					this.params.order = 'new';
					this.params.skip = 0;
					this.videowp =[];
					
				}else{
					this.params.order = 'hot';
					this.params.skip = 0;
					this.videowp =[];
										
				}
				
				
				this.getvertical();
			},
			scrolltolower() {
				if(this.hasmore) {
					this.params.skip += this.params.limit;
					this.getvertical();				
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
					url:"../videoDetails/videoDetails",
				})
			}
		},
		components: {
			uniSegmentedControl
		},
		onLoad(options) {
			this.id = options.id;
			this.getvertical();
		}
	}
</script>

<style lang="scss">
	.uni-segmented-control{
		padding: 10px 120rpx;
		position: relative;
	}
.vertical{
	display:flex;
	flex-direction: row;
	flex-wrap: wrap;
	.vertical-item{
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



/*  #ifdef   MP-WEIXIN   */	
	.content{
		height: calc(100vh - 56px);
	}
/*  #endif  */

/*  #ifdef  H5   */
	.content{
		height: calc(100vh - 100px);
	}
/*  #endif  */	

</style>
