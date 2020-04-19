function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if(e.which == 13) {
        fetchMemory()
    }
}


function removeHighlight(){
    var highlights = document.getElementsByClassName("highlight");
    while (highlights.length){
        highlights[0].classList.remove("highlight");
    }
}


function fetchMemory(){
    let address = +document.getElementById('address').value;

    // ignore invalid input
    if (address < 0 || address > 63){
        alert("Invalid Address:\n\nPlease enter a 2 Digit Address (00-63 in Decimal).");
        return;
    }

    removeHighlight()

    // the + 1 to ignore header row
    let set = address % 4 + 1;
    
    let tag = address.toString(2).padStart(6, '0').substr(0,4);
    let leftTag = document.getElementById('cache').rows[set].cells[1];
    let rightTag = document.getElementById('cache').rows[set].cells[3];
    
    let mainMemoryDataColumn = Math.trunc(address / 16) * 2 + 1;

    // the + 1 to ignore header row
    let mainMemoryDataRow = address % 16 + 1;

    let data = document.getElementById('memory').rows[mainMemoryDataRow].cells[mainMemoryDataColumn].textContent

    // set display status
    document.getElementById('lastAddressInDecimal').textContent = address.toString().padStart(2, '0');
    document.getElementById('lastAddressInBinary').textContent = address.toString(2).padStart(6, '0');
    document.getElementById('lastTag').textContent = tag;
    document.getElementById('lastSet').textContent = address.toString(2).padStart(6, '0').substr(4,6);;
    document.getElementById('lastData').textContent = data;

    // check if either cache piece has the tag
    if (leftTag.textContent == tag || rightTag.textContent == tag){
        document.getElementById('hitMiss').textContent = "Hit!";
        document.getElementById('hitMiss').className = 'hit';

        // highlight left data of set
        if (leftTag.textContent == tag){
            document.getElementById('cache').rows[set].cells[2].classList.add("highlight");
        // highlight right data of set
        }else{
            document.getElementById('cache').rows[set].cells[4].classList.add("highlight");
        }
    }else{
        document.getElementById('hitMiss').textContent = "Miss!";
        document.getElementById('hitMiss').className = 'miss';

        // highlighting
        document.getElementById('memory').rows[mainMemoryDataRow].cells[mainMemoryDataColumn].classList.add("highlight");
       // document.getElementById('memory').rows[mainMemoryDataRow].cells[mainMemoryDataColumn-1].classList.add("highlight");

        // both spots open or leftmost empty or leftmost oldest
        if ((leftTag.dataset.update === undefined && rightTag.dataset.update === undefined) 
        || leftTag.dataset.update === undefined 
        || (leftTag.dataset.update < rightTag.dataset.update)){
            leftTag.textContent = tag;
            leftTag.dataset.update = Date.now();
            document.getElementById('cache').rows[set].cells[2].textContent = data;
        }else{
            rightTag.textContent = tag;
            rightTag.dataset.update = Date.now();
            document.getElementById('cache').rows[set].cells[4].textContent = data;
        }
    }

}