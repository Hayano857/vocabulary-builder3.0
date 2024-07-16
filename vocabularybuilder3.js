async function fetchData(url) {
    const response = await fetch(url);
    let words = response.json();
    return words;
    }
    
    function startPage(){
        document.body.innerHTML = "";
        const wordsA = fetchData("./vocabs3.json");
        wordsA.then(wordsA => {
            document.write("<div><h1>Remember words below</h1></div>");
            for(let i=0;i<wordsA.length;i++){
                num = i+1;
                document.write("<div>" + 
                                    String(num) + ". " + wordsA[i].word +
                                "</div>");
                document.write("<div>" + 
                                    "Definition: " + wordsA[i].definitionA +
                                "</div><button onclick=\"detailedDefinitionB(" + i + ")\">Detailed Definition</button><br><br>");
            }
            document.write("<br><button onclick=\"startQuiz()\">Start Quiz</button>");
        });
    }
    function startQuiz(){
        document.body.innerHTML = "";
        const wordsA = fetchData("./vocabs3.json");
        wordsA.then(wordsA => {
            vocabs = [];
            for(let i=0;i<3;i++){
                let num = Math.floor(Math.random() * wordsA.length - 1) + 1;
                newWordA = wordsA[num];
                vocabs.push(newWordA);
                wordsA.splice(num,1);
            }
            let numA = Math.floor(Math.random() * vocabs.length - 1) + 1;
            document.write("<div id=\"questionA\" data-word=" + vocabs[numA].word + "><h2>Please select a definition of the word \"" + vocabs[numA].word + "\"</h2></div><br>");
            for(let i=0;i<vocabs.length;i++){
                txtNum = i+1;
                document.write("<div>" + 
                                    "<input type=\"radio\" name=\"wordlist\" value=" + vocabs[i].word + ">" +
                                    "<label for=" + vocabs[i].word + ">" + String(txtNum)+". "+vocabs[i].definitionA + "</label>" +
                                "</div>");
            }
            document.write("<br><button onclick=\"checkA()\">Answer</button>");
            document.write("<button onclick=\"detailedDefinition()\">Detail</button>")
            document.write("<br><br><button onclick=\"startQuiz()\">Another word</button>");
            document.write("<button onclick=\"startPage()\">Go back to the word list</button>");
        });
    }
    
    
    function checkA(){
        wordA = document.getElementById("questionA").getAttribute("data-word");
        document.getElementsByName("wordlist")
            .forEach(radio => {
                if(radio.checked){
                    wordC = radio.value;
                }
            });
        if(wordA===wordC){
            alert("You are correct");
        }
        else{
            alert("That is the definition of \"" + wordC + "\".");
        }
    }

    function detailedDefinition(){
        let wordA = document.getElementById("questionA").getAttribute("data-word");
        const wordsA = fetchData("./vocabs3.json");
        wordsA.then(wordsA => {
            for(let i=0;i<wordsA.length;i++){
                if(wordsA[i].word===wordA){
                    wordIndex=i;
                    break;
                }
            }
            document.body.innerHTML = "";
            document.write("<div><h2>" + 
                         wordsA[wordIndex].word +
                        "</h2></div>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary.com:</h4></n>" + wordsA[wordIndex].definitionA +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary API:</h4></n>" + wordsA[wordIndex].definitionB +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Etymology:</h4></n>" + wordsA[wordIndex].etymology +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Example sentence:</h4></n>" + wordsA[wordIndex].example +
                        "</div><br>");
            document.write("<div>" + 
                        "<h4>Synonym:</h4></n>" + wordsA[wordIndex].synonym +
                        "</div><br>");
            document.write("<br><br><button onclick=\"startQuiz()\">Another word</button>");
            document.write("<button onclick=\"startPage()\">Go back to the word list</button>");
                })
    }
    function detailedDefinitionB(wordIndex){
        const wordsA = fetchData("./vocabs3.json");
        wordsA.then(wordsA => {
            
            document.body.innerHTML = "";
            document.write("<div><h2>" + 
                         wordsA[wordIndex].word +
                        "</h2></div>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary.com:</h4></n>" + wordsA[wordIndex].definitionA +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Definition from dictionary API:</h4></n>" + wordsA[wordIndex].definitionB +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Etymology:</h4></n>" + wordsA[wordIndex].etymology +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Example sentence:</h4></n>" + wordsA[wordIndex].example +
                        "</div>");
            document.write("<div>" + 
                        "<h4>Synonym:</h4></n>" + wordsA[wordIndex].synonym +
                        "</div>");
            document.write("<br><button onclick=\"startPage()\">Go back to the word list</button>");
                })
    }
    startPage();