<template>
	<view class="home">
		<view class="uni-segmented-control">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
			<text class="fangdajing iconfont icon-8-copy"></text>
		</view>
        
        <view class="content">
            <view v-if="current === 0">
                <index1></index1>
            </view>
            <view v-if="current === 1">
                 <index2></index2>
			</view>
			 <view v-if="current === 2">
					<index3></index3>
			</view>
			 <view v-if="current === 3">
					<index4></index4>
			</view>
         </view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import index1 from './index1.vue'
	import index2 from './index2.vue'	
	import index3 from './index3.vue'	
	import index4 from './index4.vue'	
	
	export default {
		data() {
			return {
				items: ['推荐','分类','最新','专题'],
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
		components: {
			uniSegmentedControl,
			index1,
			index2,
			index3,
			index4
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
