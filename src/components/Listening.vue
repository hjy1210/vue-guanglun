<template>
 <audio src="http://bwglobal.inetfile.org/LR-mp3/001-160/018A.mp3" controls ></audio>
  <Progress v-if="datas.length>0" :listening-data="datas"/>
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
import Progress from "./Progress.vue";
const position = ref('');
const original = ref('');
const explanation = ref('');
const volume=ref('');
const startTime=ref('');
const endTime=ref('');
const currentPosition = ref('');
const addOrUpdate = ref('add')
const datas1 = ref([
{position:'P031L04C19', volume:'018A', startTime:'01:22', endTime:'02:49',original:`如朵壠巴對於善知識畫師，每來謁見便降呵責，畫師弟子摩瓦云：「此阿闍黎於我師徒，特為瞋恚。」畫師告云：「汝尚聽為是呵責耶，我每受師如此賜教一次，如得黑茹迦一次加持。」`, 
explanation:`那個朵巴對他的一個弟子，善師，是他的弟子。他那個善師每次去見他老師朵壠巴的時候，總歸把他罵一頓，罵一頓。那個時候那個弟子善師，他自己本身也是已經有成就了，帶了一大堆人來。結果這個善師倒沒什麼，那個善師的弟子就受不了了，就跟他師父說：「哎呀！那個師公是怎麼一回事情呀？對我們好像有成見。我們每次跑得來，他對我們倆是特別地大發脾氣啊！」畫師怎麼告訴他？「汝尚聽為是呵責耶」，「哎呀！你還以為他在罵你，你真不懂啊！我啊每次到這地方，聽見我的老師這麼罵我一趟，是受最好的一次教訓，最好的一次教誡，最好的一次加持。」`},
{position:'P031L04C19-2',volume:'018A', startTime:'02:49', endTime:'03:38', original:'', explanation:`「黑茹迦」是什麼？黑茹迦就是本尊，那個本尊哪，現忿怒相的這個本尊。比如說我們說文殊師利菩薩，文殊師利菩薩他現兩種身：一個就是文殊師利菩薩的，這個叫「寂靜尊」；另外一個大威德金剛，就是他現的那個「忿怒身」，就是他現的忿怒相。所以這個現忿怒相，這個一定是什麼？一定是報身，一定是報身。「你把他這個老師說的話把它聽成罵，我聽的就是最好的一次加持啊！」看看喏，這個地方有大文章，這個地方有大文章哦！`}
]);
const datas = ref([
{position:'P031L04C19', volume:'010B', startTime:'24:41', endTime:'26:10',original:`然遭三毒，極大乾病之所逼迫，病勢極重，我等竟無能知自是病者。」`, 
explanation:`現在我們什麼狀態？我們遭到三毒大病，啊，這個病是大得不得了，大得不得了！我們起心動念很清楚的，好的境相現起的時候，心裡面覺得很歡喜，這是什麼？貪相應法！非常明白。哎呀，你這個歡喜，這個好！在貪當中，跟著它去掉了。不對的境界現起的話，你又覺得這個不對勁，這瞋相應法！不在這個當中，什麼狀態？癡相應法！請問大家每一個人仔細檢點、檢點看，有沒有一個時候跳開這個的？可憐的是，可惜的是還不知道，還不知道，病大得不得了！醒來的時候是如此，睡覺的時候也是如此；上天的時候是如此，下地獄的時候還是如此；小的時候如此，老的時候還是如此。唉，「病勢極重」，我等不知道這個是病，這第一個要知道的。想想看對不對？如果你聽法，對這個不了解，那沒有用。你了解了這個，一心一意才要曉得，我這麼大的病，就會推動你去做了。`},
{position:'P031L04C19-2',volume:'010B', startTime:'26:10', endTime:'27:23', original:'', explanation:`平常我們常常說，哎呀，我現在感覺到要去修行佛法啊！這個的的確確，在座的諸位，不要說出家人是這樣，在家人也是這樣，都是很難得，有善根，要修行，要了生死！但是啊，要修行，但是你真正跑到那裡，覺得：哎呀，提不起來，就是沒勁。為什麼？沒有力量推動你。你不曉得自己病，如果你曉得自己病的話，這個推動的力量，必然。就像比如我們坐在這裡，叫你去動一動，千難萬難。一下忽然地震了，嘿，就是你生病爬不動，站起來跑得個快！我想這個我們人人都會體驗到吧！眼前很簡單，哇，馬上地震了，你馬上跑！頭痛也好，腳痛也好，什麼病都沒有了，因為這個力量推動著你。他現在告訴我們，假定你知道自己有這個病的話，你會一心一意去求了。所以他教我們具六想，它不是空話，有絕大的道理在，本論的真正殊勝的地方也就是這個。`},
{position:'P031L04C19-3',volume:'011A', startTime:'00:13', endTime:'00:30', original:'', explanation:`前面那個過失在的話，你沒用。然後呢過失去掉了，推動的力量沒有。現在告訴你，一步一步地來。現在你有了這個病，進一步要怎麼辦哪？欸，要去找醫生啊！那麼現在這個醫生是什麼？法師。所以說，進一步，`},
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
