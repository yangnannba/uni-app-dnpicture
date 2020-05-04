<template>
	<view class="home">
		<view class="uni-segmented-control">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
			<text class="fangdajing iconfont icon-8-copy"></text>
		</view>
        
        <view class="content">
            <view v-if="current === 0">
                <indexTuijian></indexTuijian>
            </view>
            <view v-if="current === 1">
                 <indexFenlei></indexFenlei>
			</view>
			 <view v-if="current === 2">
					<indexZhuanji></indexZhuanji>
			</view>
         </view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import indexTuijian from "./index-tuijian.vue"
	import indexFenlei from "./index-fenlei.vue"	
	import indexZhuanji from "./index-zhuanji.vue"	
	
	export default {
		data() {
			return {
				items: ['推荐','分类','专题'],
				current: 0
			}
		},
		onLoad() {

		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		},
		onShareAppMessage() {
			
		},
		components: {
			uniSegmentedControl,
			indexTuijian,
			indexFenlei,
			indexZhuanji
		}
	}
</script>

<style lang="scss">
.uni-segmented-control{
	padding: 10px 120rpx;
	position: relative;
	
	.fangdajing{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right:5%;
	}
}
</style>
