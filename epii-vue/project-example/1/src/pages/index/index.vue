<template>
    <div>
        {{title}} 
        <button @click="submit"> alert</button>
        <br>
        <a href="/#/index.html/a">spa-test</a>  
        <br> 
        <a href="index.html/#/a">mpa-test</a>   
    </div>
</template>

<script>
	export default {
		data() {
			return {
				title: '主要功能: \n1、Eapp 的基础实现\n2、页面基础加载epii-loading\n3、软件更新功能\n4、config配置\n'
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.show()
				
			},3000)
			
		},
		methods: {
			submit(){
				 Eapp.ui.alert("alert in Eapp")
			}
		}
	}
</script>
 
