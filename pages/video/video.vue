<template>
	<view>
		<view class="uni-segmented-control">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#4cd964"></uni-segmented-control>
		</view>
        
        <view class="content">
            <view v-if="current < 4">
                <videoContext :current="current"></videoContext>
            </view>
			 <view v-if="current === 4">
					<videoFenlei :current="current"></videoFenlei>
			</view>
         </view>
	</view>
</template>

<script>
		import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
		import videoContext from './video-content.vue'
		import videoFenlei from "./video-fenlei.vue"
	export default {
		data() {
			return {
				items: ['推荐','娱乐','最新','热门','分类'],
				current: 0				
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
			
		},
		components:{
			uniSegmentedControl,
			videoContext,
			videoFenlei			
		}
	}
</script>

<style lang="scss">
.uni-segmented-control{
	padding: 10px 60rpx;
	position: relative;
	
}
</style>
