<template>
  <div>
    <button @click="playpause">{{status}}</button>
    <audio  ref="audio1" @timeupdate="updated" @ended="ended"></audio>
    <p><span v-for= "d in listeningData" :key="d.position">{{d.position+" "}} </span></p>
    <p v-for= "d in volperiods" :key="d.volume">{{d.volume}} {{d.startTime}} {{d.endTime}} {{d.duration}} </p>
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
    import {ref, computed} from 'vue';
    const props = defineProps({
      listeningData: Array
    });
    const message = ref('');
    const txt = ref('');
    const scroll = ref(null);
    const bar = ref(null);
    const mask = ref(null);
    const barleft = ref(0);
    const status = ref('play');
    const leading = "http://bwglobal.inetfile.org/LR-mp3/001-160/";
    //const source = ref([]);
    const audio1 = ref(null)
    const index = ref(0);
    const currentTime = ref(0);
    function barmousedown(event){
      //var event = event || window.event;
      var leftVal = event.clientX - event.target.offsetLeft;
      //console.log(`event.clientX=${event.clientX},event.target.offsetLeft=${event.target.offsetLeft},leftVal=${leftVal}`);
      //var that = event.target;
      // 拖動一定寫到 down 裡面才可以
      document.onmousemove = function(event){
        //var event = event || window.event;
        audio1.value.pause();
        barleft.value = event.clientX - leftVal;     
        if(barleft.value < 0)
          barleft.value = 0;
        else if(barleft.value > scroll.value.offsetWidth - bar.value.offsetWidth)
          barleft.value = scroll.value.offsetWidth - bar.value.offsetWidth;
        mask.value.style.width = barleft.value +'px' ;
        bar.value.style.left = barleft.value + "px";
        var percent = barleft.value/(scroll.value.offsetWidth-bar.value.offsetWidth);
        setIndexCurrentTime(percent);
        txt.value = "已經走了" + parseInt(barleft.value/(scroll.value.offsetWidth-bar.value.offsetWidth) * 100) + "%";
        //console.log("已經走了" + parseInt(barleft.value/(scroll.value.offsetWidth-bar.value.offsetWidth) * 100) + "%");
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }

    }
    document.onmouseup = function(){
      document.onmousemove = null; //弹起鼠标不做任何操作
      if (status.value == "pause"){
        status.value = "play";
        playpause();
      }
    }
    const volperiods=computed(()=>{
      var res = [];
      var vol = "";
      var current = null;
      console.log(props.listeningData.length);
      for (var i=0; i< props.listeningData.length; i++){
        console.log(props.listeningData[i].volume);
        if (props.listeningData[i].volume!=vol){
          current = {volume:props.listeningData[i].volume, startTime:timeinseconds(props.listeningData[i].startTime),
            endTime:timeinseconds(props.listeningData[i].endTime)};
          vol = props.listeningData[i].volume;
          res.push(current);
        } else {
          current.endTime=timeinseconds(props.listeningData[i].endTime);
        }
      }
      res.forEach(element => {
        element.duration = element.endTime-element.startTime;
        //source.value.push(leading+element.volume+'.mp3');
      });
      //res.forEach(e=>{console.log(e.duration)});
      currentTime.value=res[0].startTime;
      return res;
    })
    const duration = computed(()=>{
      var d = 0;
      volperiods.value.forEach(element => {
        d+=element.duration;
      });
      console.log(d);
      return d;
    });
    function percentage(){
      if(index.value==0){
        return (currentTime.value-volperiods.value[0].startTime)/duration.value;
      } else {
        return (volperiods.value[0].duration + currentTime.value-volperiods.value[1].startTime)/duration.value;
      }
    }
    function setBarPosition(percent){
      barleft.value = (scroll.value.offsetWidth-bar.value.offsetWidth)*percent;
      mask.value.style.width = barleft.value +'px' ;
      bar.value.style.left = barleft.value + "px";
    }
    function setIndexCurrentTime(percent){
      var dur = duration.value * percent;
      if (dur>volperiods.value[0].duration){
        index.value = 1;
        currentTime.value = dur - volperiods.value[0].duration + volperiods.value[1].startTime;
      } else {
        index.value = 0;
        currentTime.value = dur + volperiods.value[0].startTime;
      }
    }
    function updated(){
      console.log(audio1.value.currentTime)
      console.log(volperiods.value[index.value].endTime)
      currentTime.value = audio1.value.currentTime;
      var percent = percentage();
      setBarPosition(percent);
      txt.value = "已經走了" + Math.round(percent * 100) + "%";

      if (audio1.value.currentTime > volperiods.value[index.value].endTime){
        audio1.value.pause();
        console.log(volperiods.value.length);
        console.log(index.value);
        if (volperiods.value.length>1 && index.value==0){
          index.value=1;
          playindex(volperiods.value[index.value].startTime);
        }
      }
    }
    function ended(){
      console.log(audio1.value.currentTime)
      console.log(volperiods.value[index.value].endTime)
      console.log(volperiods.value.length);
      console.log(index.value);
      if (volperiods.value.length>1 && index.value==0){
        index.value=1;
        playindex(volperiods.value[index.value].startTime);
      }
    }

    function timeinseconds(timeinminsec){
      var minsec=timeinminsec.split(':');
      return parseInt(minsec[0])*60+parseInt(minsec[1]);
    }
    function playpause(){
      if(status.value=='play'){
        //source1.value = leading+volperiods.value[0].volume+'.mp3';
        //console.log(source.value[0].value);
        playindex(currentTime.value);
        status.value = 'pause'
      } else {
        audio1.value.pause();
        currentTime.value = audio1.value.currentTime;
        status.value='play';
      }
    }
    function playindex(currentTime){
        console.log(volperiods.value.length);
        console.log(index.value);
        console.log(volperiods.value[index.value].startTime);
        audio1.value.src = leading+volperiods.value[index.value].volume+'.mp3';
        //audio1.value.currentTime = volperiods.value[index.value].startTime;
        audio1.value.currentTime = currentTime;
        audio1.value.load();
        //audio1.value.ontimeupdate=updated;
        //audio1.value.onended= ended;
        audio1.value.play();

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
