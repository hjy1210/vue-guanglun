<<<<<<< HEAD
///// 先將本檔案內容,抄入廣論時時聽的開發人員工具console頁面，
///// 執行它會把廣論原文與時間標記存成一個文字檔。
function extractGuanglunTextOneVol() {
=======
function divContains(div, str) {
    return div.innerText.indexOf(str) >= 0
}

function extractGuanglunText(vol, start, end) {
>>>>>>> 25d1a64f92d72b896a404aa1739dde26ee5477fa
    let div = document.querySelector("div.jss41.jss42")
    console.log(div.tagName);
    let res = "";
    if (!div) return res;
    let eles = div.children;
    let startIndex, endIndex;
<<<<<<< HEAD
    let str="";
    for (let index = 0; index < eles.length; index++) {
        if (eles[index].tagName == "DIV" && eles[index].classList.contains("MuiBox-root")){
            str+=`${eles[index].innerText}\n`;
        }
        if (eles[index].tagName = "P") {
            eles[index].querySelectorAll("span.bold-txt").forEach((s) => str += s.innerText);
            str+="\n";
        }
    }
    
    let blob = new Blob([str], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let downloadlink = document.createElement('a');
    downloadlink.download="gl-01a.txt";
    downloadlink.href = url;
    downloadlink.click();
    URL.revokeObjectURL(url);
}
extractGuanglunTextOneVol();
=======
    for (let index = 0; index < eles.length; index++) {
        if (eles[index].tagName == "DIV" && eles[index].classList.contains("MuiBox-root") && divContains(eles[index], start))
            startIndex = index;
        if (eles[index].tagName == "DIV" && eles[index].classList.contains("MuiBox-root") && divContains(eles[index], end))
            endIndex = index;
        if (startIndex >= 0 && endIndex >= 0 && startIndex < endIndex) {
            for (let ndx = startIndex + 1; ndx < endIndex; ndx++) {
                if (eles[ndx].tagName = "P") {
                    eles[ndx].querySelectorAll("span.bold-txt").forEach((s) => res += s.innerText);
                }
            }
            break;
        }
    }
    console.log(startIndex, endIndex)
    let o = {};
    o.newpar = "false";
    o.source = res;
    o.startvol = vol;
    o.starttime = start;
    o.endtime = end;
    return JSON.stringify(o);
}
// 開啟廣論時時聽58b，在開發者工具的console頁面執行下面指令，
// 可以抓出00:08到12:30之間的楷書部分(即廣論原文的部分)
// extractGuanglunText("58b", "[00:08]", "[12:30]")
>>>>>>> 25d1a64f92d72b896a404aa1739dde26ee5477fa
