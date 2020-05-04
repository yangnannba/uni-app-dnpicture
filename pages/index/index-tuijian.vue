<template>
	<scroll-view class="Recommend" v-if="banner.length>0" scroll-y @scrolltolower="scrolltolower">
		<view class="tuijian">
			<navigator v-for="item in banner" :key="item._id" class="tuijian-img" :url="'../zhantiDetails/zhantiDetails?id='+item.target">
				 <image mode="widthFix"  :src="item.thumb" ></image>
			</navigator>
			
			
			
		</view>
		
		
			<view class="title" v-if="banner.length>0" >
				<view>
					<text class="time"  v-if="yuefen.stime">{{yuefen.stime | totime}}</text>
					<text class="h1">{{yuefen.title}}</text>
				</view>
				<view class="more">更多 ></view>
			</view>
			<view class="yuefen">
				<view v-for="(item,index) in yuefen.items" :key="item.id" class="yue-img">
					<to-img :list="yuefen.items" :index="index">
						<image  mode="aspectFill"  :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
					</to-img>
					
				</view>
				
			</view>
			<view class="hot">
				<text>热门</text>
				
			</view>			
			<view class="yuefen">
				<view class="hot-img" v-for="(item,index) in vertical" :key="item.id">
					<to-img :list="vertical" :index="index">
					     <image  mode="widthFix" :src="item.thumb"></image>
					</to-img>
				</view>
				
			</view>	
		
	</scroll-view>
</template>

<script>
	import toImg from '../../components/toImg.vue'
	export default{
		name:"index1",
		data(){
			return {
				banner:[],
				yuefen:{},
				vertical:[],
				canshu:{
					limit:30,
					order:"hot",
					skip:0
				},
				hasmore:true
			}
		},
		methods:{
			getindex1() {
				uni.showLoading({
					title:"加载中",
					mask:true
				})
				uni.request({
					
					// #ifdef H5 
					url:"/image/v3/homepage/vertical",
					//  #endif
					
					// #ifdef MP-WEIXIN 
					url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
					//  #endif					
					data:this.canshu,
					success: (request) => {
						//console.log(request);
						if( request.data.res.vertical.length == 0 ){
							this.hasmore = false;
							uni.showToast({
								title:"数据没有了",
								icon:"none"
								
							})							
							
							return ;
						}
						if(this.banner.length==0){
							this.banner = request.data.res.homepage[1].items;
							this.yuefen = request.data.res.homepage[2];	
							//console.log(this.banner)
						}
						
						this.vertical = [...this.vertical, ...request.data.res.vertical];
						
						
						//console.log(this.vertical);
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			scrolltolower() {
				if(this.hasmore){
					this.canshu.skip += this.canshu.limit;
					this.getindex1();
					//console.log(this.canshu.skip)
				}else{
					uni.showToast({
						title:"数据没有了",
						icon:"none"
						
					})
				}
				
			},

		},
		filters:{
			totime(val) {
				let date = new Date(val);
				let month = date.getMonth()+1;
				let day = date.getDate();
				return  day +"日 / " + month +"月";
			}
		},
		components:{
			toImg
		},
		mounted() {
			this.getindex1();
			
			uni.setNavigationBarTitle({
			    title:'推荐'
			});
		}
	}
</script>

<style lang="scss">
/*  #ifdef   MP-WEIXIN   */	
	.Recommend{
		height: calc(100vh - 56px);
	}
/*  #endif  */

/*  #ifdef  H5   */
	.Recommend{
		height: calc(100vh - 150px);
	}
/*  #endif  */	
	
	
	
	
	.tuijian{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.tuijian-img{
			width: 49%;
			display: block;
			margin-bottom: 15rpx;
			image{
				width:100%;
				height:100%;
				display: block;
			}
		}
	}
	
	.title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		margin: 20rpx 0;
		.time{
			color: #3cc51f;
			font-size: 34rpx;
			font-weight: bold;
			margin-right: 20rpx;
		}
		.h1{
			color: #333333;
			font-size: 30rpx;
		}
		.more{
			color: #333333;
			font-size: 28rpx;	
		
		}
	}
	.yuefen{
		display: flex;
		flex-direction: row;

		flex-wrap: wrap;
		.yue-img{
			width: 33.33%;
			
			border: 1px solid #fff;
			box-sizing: border-box;
			image{
				width: 100%;
				height:300rpx;
				display: block;
				
			}
		}
		.hot-img{
			width: 33.33%;
			border: 1px solid #fff;
			box-sizing: border-box;	
					image{
						width:100%;
						display: block;
					}
		}
	}
	.hot{
		padding: 0 20rpx;
		font-size: 32rpx;
		margin: 30rpx 0 20rpx;
		text{
			border-left: 6rpx solid #4CD964;
			padding-left: 12rpx;
		}
	}

</style>
