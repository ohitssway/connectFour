(function(doc){
    start = function(){
        finished = false;
        changePlayer();
    },  		
    newGame = function(message){
        if (confirm(message)){
            start();
            forAllCells(emptyField);
        }
    },
    element = function(id){
        return doc.getElementById(id);
    },
    value = function(el){
        return element(el).innerHTML;
    },                        
    cell = function(i,j){
        return element(`c-${i}-${j}`);
    },       
    forAllCells = function(action){
        for (var i = 1;i < 7;i++){
            for (var j = 1;j < 8;j++){
                action(i, j);
            }
        }
    },                     
    sameColor = function(i,j){
        return testClass(i,j,players[current]);
    },                        
    changePlayer = function(){
        element("c").innerHTML = players[current = (current + 1) % 2];
    },                           
    horizontalWon = function(i,j){
        var count = 0;
        for(var jdx = 1;jdx < 8;jdx++){
            if(!sameColor(i, jdx)){
                count = 0;
            }else{
                count += 1;
            }
            if(count == 4){
                return true;
            }
        }
        return false;
    },                 
    verticalWon = function(i,j){
        if(i > 3){
            return false;
        }
        for(var idx = i + 1;idx < i + 4; idx++) {
            console.log(cell(idx,j));
            if (!sameColor(idx,j)) {
                return false;
            }
        }
        return true;
    },                        
    diagonalWon = function(i,j){
        count = 0;
        var idx = i;
        var jdx = j;
        while(idx < 7 && jdx > -1){
            if(!sameColor(idx, jdx)){
                count = 0;
            }else{
                count += 1;
            }
            if(count == 4){
                return true;
            }
            idx += 1;
            jdx -= 1;
        }
        count = 0;
        idx = i;
        jdx = j;
        while(idx > - 1 && jdx < 8){
            if(!sameColor(idx, jdx)){
                count = 0;
            }else{
                count += 1;
            }
            if(count == 4){
                return true;
            }
            idx -= 1;
            jdx += 1;
        }

        return false;
    },         
    colorField = function(i,j,rapper){
        cell(i,j).className = rapper;
    },                      
    emptyField = function(i,j){
        colorField(i,j,'');
    },
    testClass = function(i,j,value){
        return cell(i,j).className == value;
    },
    addCellBehavior = function(i,j){
        cell(i,j).onclick = function(j){
            return function(){
                if(!finished){
                    for (var t = 6;t>0;t--){
                        if(testClass(t,j,'')){
                            colorField(t,j,players[current]);
                            if(horizontalWon(t,j) || verticalWon(t,j) || diagonalWon(t,j)){
                                finished = true;
                                newGame(newGameMessage);
                            } else {
                                changePlayer();
                            }
                            break;
                        }
                    }
                }
            }
        }(j);
    },
    players = [value("a"),value("b")],
    current = 0,
    newGameMessage = value("n"),
    wonMessage = value("w"),
    finished = false;
    start();
    forAllCells(addCellBehavior);
    element("r").onclick = function(){
        newGame(newGameMessage)
    };
})(document);