<template>
  <div>
    <p><span v-for= "d in listeningData" :key="d.position">{{d.position+" "}} </span></p>
    <a href="https://www.jb51.net/article/103461.htm">https://www.jb51.net/article/103461.htm</a>
    <div class="scroll" id="scroll" ref="scroll">
      <div class="bar" id="bar" @mousedown = "barmousedown" ref="bar">
      </div>
      <div class="mask" id="mask" ref="mask"></div>
    </div>
    <p ref="ptxt">{{txt}}</p>
  </div>
</template>

<script setup>
    import {ref} from 'vue';
    const props = defineProps({
      listeningData: Array
    });

    const txt = ref('');
    const scroll = ref(null);
    const bar = ref(null);
    const mask = ref(null);
    const barleft = ref(0);
    function barmousedown(event){
      //var event = event || window.event;
      var leftVal = event.clientX - event.target.offsetLeft;
      //console.log(`event.clientX=${event.clientX},event.target.offsetLeft=${event.target.offsetLeft},leftVal=${leftVal}`);
      //var that = event.target;
      // 拖動一定寫到 down 裡面才可以
      document.onmousemove = function(event){
        //var event = event || window.event;
        barleft.value = event.clientX - leftVal;     
        if(barleft.value < 0)
          barleft.value = 0;
        else if(barleft.value > scroll.value.offsetWidth - bar.value.offsetWidth)
          barleft.value = scroll.value.offsetWidth - bar.value.offsetWidth;
        mask.value.style.width = barleft.value +'px' ;
        bar.value.style.left = barleft.value + "px";
        txt.value = "已經走了" + parseInt(barleft.value/(scroll.value.offsetWidth-bar.value.offsetWidth) * 100) + "%";
        //console.log("已經走了" + parseInt(barleft.value/(scroll.value.offsetWidth-bar.value.offsetWidth) * 100) + "%");
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }

    }
    document.onmouseup = function(){
      document.onmousemove = null; //弹起鼠标不做任何操作
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    .scroll{
      margin:10px;
      width: 500px;
      height: 5px;
      background: #ccc;
      position: relative;
    }
    .bar{
      width: 10px;
      height: 20px;
      background: #369;
      position: absolute;
      top: -7px;
      left: 0;
      cursor: pointer;
    }
    .mask{
      position: absolute;
      left: 0;
      top: 0;
      background: #369;
      width: 0;
      height: 5px;
    }
  </style>  
