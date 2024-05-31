<template>
    <div id="app">
        <input type="button" value="走你" @click="go">
        <input type="button" value="@" @click="show" />
        <input type="button" value="停止" @click="stop">
        <h4>{{ msg }}</h4>
    </div>
</template>
<script>
export default {
    data() {
        return {  //data 属性中，存放的就是el中要用到的数据
            msg: '欢迎访问我的主页，感谢您的关注',   //通过Vue提供是指令，把数据渲染到页面，无需再手动操作DOM元素
            intervalId: null
        }      //在data上绑定一个定时器id
    },
    methods: {   //定义当前Vue实例的所有方法
        show: function () {
            alert('hello');
        },

        go() {
            if (this.intervalId != null) return;
            this.intervalId = setInterval(() => {
                var start = this.msg.substring(0, 1);
                var end = this.msg.substring(1);
                this.msg = end + start;
            }, 200)
        },
        stop() {
            //清除定时器
            clearInterval(this.intervalId)
            //将定时器id重置为null
            this.intervalId = null;
        }
    }
}

</script>