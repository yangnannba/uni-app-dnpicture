<template>
	<view 
	@touchstart="touchstart"
	@touchend="touchend"
	>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"mywiper",
	    data() {
			return {
				startTime:0,
				startX:0,
				startY:0
			}
		},
		methods:{
			touchstart(e) {
				//console.log(e.changedTouches[0].clientX);
				//console.log(e.changedTouches[0].clientY);
				this.startX = e.changedTouches[0].clientX;
				this.startY = e.changedTouches[0].clientY;
				this.startTime = Date.now();
			},
			touchend(e) {
				
			    let endX = e.changedTouches[0].clientX;
				let endY = e.changedTouches[0].clientY;
				let endTime =Date.now();
				let direction;
				//console.log(endTime);
				if(endTime - this.startTime > 2000){
					return ;
				} 
				    //console.log(endTime);
				if( Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY) < 10 ){
					//console.log(endTime);
					direction = (endX > this.startX) ? "right" : "left";
				}else{
					return ;
				}
				this.$emit('swierAction',{direction})
			}
		}
	}
</script>

<style>
</style>
