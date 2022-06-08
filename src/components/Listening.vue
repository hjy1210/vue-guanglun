<template>
  <div v-for="d in datas" :key="d.position">
    <p>{{d.position}} {{d.volume}} {{d.startTime}} {{d.endTime}} <button @click="edit(d)">Edit</button></p>
  </div>
  <p class="lunwen">{{original}}</p>
  <p class="jieshi">{{explanation}}</p>
  <form>
  <div style="border:solid 1px;">
  <p>
  <label for="position">Position</label>
  <input v-model="position" />
  <label for="volume">Volume</label>
  <input v-model="volume" />
  <label for="startTime">Start Time</label>
  <input v-model="startTime" /> 
  </p>
  <p><textarea class="lunwen" v-model="original" rows="5" cols="50"/>
  <textarea class="jieshi" v-model="explanation"  rows="5" cols="50"/></p>
  <p><label for="endTime">End Time</label>
  <input v-model="endTime" />
  </p>
   <p><button @click.prevent="addData">{{addOrUpdate}}</button></p>
 </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
const position = ref('');
const original = ref('');
const explanation = ref('');
const volume=ref('');
const startTime=ref('');
const endTime=ref('');
const currentPosition = ref('');
const addOrUpdate = ref('add')
const datas = ref([
{position:'P031L04C19', volume:'018A', startTime:'01:22', endTime:'02:49',original:`如朵壠巴對於善知識畫師，每來謁見便降呵責，畫師弟子摩瓦云：「此阿闍黎於我師徒，特為瞋恚。」畫師告云：「汝尚聽為是呵責耶，我每受師如此賜教一次，如得黑茹迦一次加持。」`, 
explanation:`那個朵巴對他的一個弟子，善師，是他的弟子。他那個善師每次去見他老師朵壠巴的時候，總歸把他罵一頓，罵一頓。那個時候那個弟子善師，他自己本身也是已經有成就了，帶了一大堆人來。結果這個善師倒沒什麼，那個善師的弟子就受不了了，就跟他師父說：「哎呀！那個師公是怎麼一回事情呀？對我們好像有成見。我們每次跑得來，他對我們倆是特別地大發脾氣啊！」畫師怎麼告訴他？「汝尚聽為是呵責耶」，「哎呀！你還以為他在罵你，你真不懂啊！我啊每次到這地方，聽見我的老師這麼罵我一趟，是受最好的一次教訓，最好的一次教誡，最好的一次加持。」`},
{position:'P031L04C19-2',volume:'018A', startTime:'02:49', endTime:'03:38', original:'', explanation:`「黑茹迦」是什麼？黑茹迦就是本尊，那個本尊哪，現忿怒相的這個本尊。比如說我們說文殊師利菩薩，文殊師利菩薩他現兩種身：一個就是文殊師利菩薩的，這個叫「寂靜尊」；另外一個大威德金剛，就是他現的那個「忿怒身」，就是他現的忿怒相。所以這個現忿怒相，這個一定是什麼？一定是報身，一定是報身。「你把他這個老師說的話把它聽成罵，我聽的就是最好的一次加持啊！」看看喏，這個地方有大文章，這個地方有大文章哦！`}
]);

function edit(d) {
  position.value=d.position;
  volume.value = d.volume;
  startTime.value = d.startTime;
  endTime.value = d.endTime;
  original.value = d.original;
  explanation.value = d.explanation;
  currentPosition.value=d.position;
  addOrUpdate.value="update";
}
function addData(){
  //alert(currentPosition.value);
  if (position=='' || volume.value=='' || startTime.value=='' || endTime.value=='' || (original.value=='' && explanation.value==''))
    return;
  if (currentPosition.value=='') {
    datas.value.push({position:position.value, volume:volume.value, startTime: startTime.value, endTime: endTime.value, original:original.value, explanation:explanation.value});
  } else {
    //alert(currentPosition.value)
    let ds= datas.value.filter(x=>x.position==currentPosition.value);
    //alert(ds.length);
    let d = ds[0];
    //alert(d.startTime);
    //alert(startTime.value);
    d.position=position.value;
    d.volume=volume.value;
    d.startTime=startTime.value;
    d.endTime=endTime.value;
    d.original=original.value;
    d.explanation=explanation.value;
    currentPosition.value=''
    addOrUpdate.value="add";
  }
  position.value='';
  original.value='';
  explanation.value='';
  volume.value='';
  startTime.value='';
  endTime.value='';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.lunwen {
  font-family:'Times New Roman', Times, serif, '標楷體';
  font-size:18pt;
}
.jieshi {
  font-family:Arial, Helvetica, sans-serif, '細明體'
}
</style>
