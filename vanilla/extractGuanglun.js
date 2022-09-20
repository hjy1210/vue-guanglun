///// 先將本檔案內容,抄入廣論時時聽的開發人員工具console頁面，
///// 執行它會把廣論原文與時間標記存成一個文字檔。
function extractGuanglunTextOneVol() {
    function getVolName(){
        let div = document.querySelector("div.MuiGrid-root.MuiGrid-item");
        let h6 = div.querySelector("h6.MuiTypography-root");
        let text = h6.innerText;
        let start = text.indexOf("[");
        let end = text.indexOf("]");
        let vol = text.substr(start+1,end-start-1);
        return vol.toLowerCase();
    }
    let div = document.querySelector("div.jss41.jss42")
    console.log(div.tagName);
    let res = "";
    if (!div) return res;
    let eles = div.children;
    let startIndex, endIndex;
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
    downloadlink.download=`gl-${getVolName()}.txt`;
    downloadlink.href = url;
    downloadlink.click();
    URL.revokeObjectURL(url);
}
extractGuanglunTextOneVol();

