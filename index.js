var femWords = {
    'contribute': ['chip in', 'give', 'supply'],
    'interpersonal': 'social',
    'encourage': ['reassure', 'support'],
    'helpful': ['advantageous', 'conducive', 'effective', 'useful'],
    'sincere': ['authentic', 'genuine'],
    'meaningful': ['important', 'relevant', 'significant', 'substantial'],
    'empathy': ['appreciation', 'compassion', 'insight'],
    'kindness': ['courtesy', 'decency', 'understanding'],
    'balancing': ['evening', 'stabilising'],
    'supportive': ['encouraging', 'accommodating'],
    'catalyst': ['impetus', 'incentive', 'motivation'],
    'caring': null,
    'collaborative': 'reciprocal',
    'family': null,
    'families': null,
    'our team': null,
    'passion for making': null,
    'interpersonal skills': ['social skills'],
    'take care of': ['deal with', 'look after'],
    'passion for making': null
  }

var maleWords = {
    'manage': ['handle', 'lead', 'run'],
    'proven': ['confirmed', 'shown', 'tried', 'validated'],
    'competitive': ['bold', 'daring', 'high reaching'],
    'enforce': ['carry out', 'implement', 'make sure'],
    'phenomenal': ['excellent', 'extraordinary', 'outstanding'],
    'manage': ['handle', 'lead', 'run'],
    'unrivalled': ['extraordinary', 'standout', 'stands on its own'],
    'tackle': ['aim', 'pursue', 'seek', 'take on'],
    'outstanding': ['excellent', 'extraordinary'],
    'extraordinary': ['exceptional', 'outstanding'],
    'managing': ['handling', 'leading', 'running'],
    'expert': ['authority', 'guide'],
    'aggressively': ['boldly', 'energetically', 'enthusiastically', 'passionately', 'purposefully'],
    'superior': null,
    'exceptional': 'uncommon',
    'best-in-class': ['elite', 'exclusive', 'premier'],
    'drive for': ['commit to', 'work towards', 'aim for'],
    'under pressure': null,
    'manage relationships': ['be a great partner', 'handle relationships', 'maintain relationships'],
    'best in class': ['premier', 'elite', 'exclusive'],
    'proven track record': ['consistent record', 'consistent track record'],
    'command respect': ['earn respect', 'garner respect', 'have respect'],
    'a strong track record': ['a consistent track record', 'a strong background'],
    'owning the': ['being responsible for the', 'leading the']
}
  
  var findWords = (oldCaretPosition, oldCaretNode) => {

    var userText = document.getElementById('userContent').textContent;
  
    var femWordsArr = Object.keys(femWords);
    var maleWordsArr = Object.keys(maleWords);

    var maleWordsJoined = maleWordsArr.join('|');
    var maleRegex = new RegExp('\\b(' + maleWordsJoined + ')', 'gi');
    
    var femWordsJoined = femWordsArr.join('|');
    var femRegex = new RegExp('\\b(' + femWordsJoined + ')', 'gi'); 
    newText = userText.replace(femRegex, function(matched){
        if(femWords[matched] == null){
            return '<div class=purpleBorder>'+matched+'</div>';
        }
        var altWords = femWords[matched];
        var altElements = '';
        for(var i=0; i<altWords.length; i++){

          altElements += '<li>'+altWords[i]+'</li>'
        }
        return '<div class=purpleBorder>'+matched+'<ul class=hidden>'+altElements+'</ul></div>';
      });

    newText = newText.replace(maleRegex, function(matched){
        if(maleWords[matched] == null){
            return '<div class=blueBorder>'+matched+'</div>';
        }
        var altWords = maleWords[matched];
        var altElements ='';
        for(var i=0; i<altWords.length; i++){
            altElements += '<li>'+altWords[i]+'</li>'
        }
        return '<div class=blueBorder>'+matched+ '<ul class=hidden>'+altElements+'</ul></div>';
    });
    
    var userContent = document.getElementById('userContent');
    userContent.innerHTML = newText;
    setCaretPosition(oldCaretPosition, oldCaretNode);
    biasedWordCount(userContent);
    displayAltWords(userContent);
  }

  function biasedWordCount(userContent){
    var femCount = userContent.getElementsByClassName('purpleBorder').length;
    if (femCount) {
        document.getElementById('femCircle').innerText = femCount;
    } else {
        document.getElementById('femCircle').innerText = 0;
    }
    
    var maleCount = userContent.getElementsByClassName('blueBorder').length;
    if(maleCount) {
        document.getElementById('maleCircle').textContent = maleCount;
    } else {
        document.getElementById('maleCircle').textContent = 0;
    }
  }
  

  function displayAltWords(userContent){
    var femSpans = userContent.getElementsByClassName('purpleBorder');
    showSpans(femSpans);
    var menSpans = userContent.getElementsByClassName('blueBorder');
    showSpans(menSpans);
    replaceBiasWordWithAltWord();
  }

  function showSpans(typeofSpan){
    if(typeofSpan.length > 0){
        for(i=0; i<typeofSpan.length; i++) {
            typeofSpan[i].addEventListener('mouseover', function(){
                if(this.childNodes[1]){
                    this.childNodes[1].classList.replace('hidden', 'visible');
                }
            });
            typeofSpan[i].addEventListener('mouseout', function(){
                if(this.childNodes[1]){
                    this.childNodes[1].classList.replace('visible', 'hidden');
                }   
            })
        }
    }
  }
  
  var replaceBiasWordWithAltWord = () => {
        var highlightedText = document.getElementById('userContent');
        var biasedWords = highlightedText.getElementsByTagName('div');
        for(var i=0; i<biasedWords.length; i++) {
            var childrenAltWords = biasedWords[i].getElementsByTagName('li');
            for(var j=0; j<childrenAltWords.length; j++) {
                childrenAltWords[j].addEventListener('click', function(e){
                    if(this.parentElement.parentElement.className === 'purpleBorder'){
                        this.parentElement.parentElement.classList.remove('purpleBorder');
                    } else if(this.parentElement.parentElement.className === 'blueBorder'){
                        this.parentElement.parentElement.classList.remove('blueBorder');
                    }                    
                    this.parentElement.parentElement.textContent = this.textContent;
                })
            }
        }
  };




  var removeHtmlFormatting = (oldCaretPosition) =>{
    var alteredUserContent = document.getElementById('userContent');
    
    //code below removes the uls
    var listOfSpans = alteredUserContent.getElementsByTagName('div');
    for(var i=0; i<listOfSpans.length; i++){
        while(listOfSpans[i].childNodes[1]) listOfSpans[i].removeChild(listOfSpans[i].childNodes[1])
    }

    //this code removes the spans
    var withoutUls = document.getElementById('userContent');
    var highlightedContainer = withoutUls.getElementsByTagName('div');
    while(highlightedContainer.length){
        var parent = highlightedContainer[0].parentNode;
        while(highlightedContainer[0].firstChild) {
            parent.insertBefore(highlightedContainer[0].firstChild, highlightedContainer[0]);
        }
        parent.removeChild(highlightedContainer[0]);
    }
  }

  //when user chooses an alternative word this resets the counter
  document.getElementById('userContent').addEventListener('click', function() {
    biasedWordCount(document.getElementById('userContent'));
  });

  
  
  document.getElementById('userContent').addEventListener('keyup', function(e) {
    if(e.keyCode === 32 || e.keyCode === 46){
        var {caretPos: oldCaretPosition, caretNodeIndex: oldCaretNode} = getCaretPosition(document.getElementById('userContent'));
        if(document.getElementById('userContent').children.length > 0){
            removeHtmlFormatting(oldCaretPosition);
            findWords(oldCaretPosition);
        } else {
            findWords(oldCaretPosition, oldCaretNode);
        }
    }
  });


  function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range, caretNodeIndex;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        caretPos = range.startOffset;
        var caretNode = range.endContainer;
        caretNodeIndex = Array.from(range.commonAncestorContainer.parentNode.childNodes).indexOf(caretNode)

        for (let i = 0; i < caretNodeIndex; i++) {
            var childNode = range.commonAncestorContainer.parentNode.childNodes[i]

            caretPos += getTextNode(childNode).textContent.length
        }

        console.log('caretPos', caretPos, 'nodes', range.commonAncestorContainer.parentNode.childNodes, 'caretNode', caretNode)
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return {caretPos, caretNodeIndex}
  }

  function getTextNode(node) {
    if (node.className === 'purpleBorder' || node.className === 'blueBorder') {
        node = node.childNodes[0]
    }
    return node
  }

  function getSelectionNode(userContentNode, caretPosition) {
    var currentNode = userContentNode.childNodes[0]
    var i = 0

    while (caretPosition > getTextNode(currentNode).textContent.length) {
        caretPosition -= getTextNode(currentNode).textContent.length
        currentNode = userContentNode.childNodes[++i]
    }

    return {currentNode, caretPosition}
  }
  
  function setCaretPosition(oldCaretPosition){
    var el = document.getElementById("userContent");
    console.log(oldCaretPosition, el);
    var {currentNode, caretPosition} = getSelectionNode(el, oldCaretPosition)
    console.log(currentNode)
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(getTextNode(currentNode), caretPosition);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }