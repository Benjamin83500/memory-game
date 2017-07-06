var array = [ '1','1','2','2','3','3','4','4','5','5','6','6' ];
        var values = [];
        var card_ids = [];
        var flipped = 0;
        var numOfGuess = 0; 
        Array.prototype.shuffle = function() {
            var i = this.length, j, temp;
            while(--i > 0) {
                j = Math.floor(Math.random() * (i+1));
                temp = this[j];
                this[j] = this[i];
                this[i] = temp;
            }
        }  

        // create the clear board
        function clearBoard() {
            values = [];
            card_ids = [];
            flipped = 0;
            numOfGuess = 0;
            document.getElementById("tries_number").innerHTML = 0;
            var output = ""; 
            array.shuffle();

            //create each cards dynamically
            for(var i = 0; i < array.length; i++) {
                output += '<div id="card_'+i+'" onclick="flipCard(this,\''+array[i]+'\')"></div>';
            }
            document.getElementById('board').innerHTML = output; 
        }
            // number of tries          
            function tries(){
                numOfGuess += 0.5;
                document.getElementById("tries_number").innerHTML = Math.floor(numOfGuess);   
            }
            // generate the dynamic of the game 
            function flipCard(card,val) {
                var snd = new Audio("./sound effects/click-on.mp3");
                snd.play();
                tries();
                if(card.innerHTML == "" && values.length < 2) {
                    card.style.background = 'grey';
                    card.style.color = "black";
                    card.innerHTML = val;
                    if(values.length == 0) {
                        values.push(val);
                        card_ids.push(card.id);
                    } else if(values.length == 1) {
                        values.push(val);
                        card_ids.push(card.id);
                        if(values[0] == values[1]) {
                            flipped += 2;
                            values = [];
                            card_ids = [];

                            // if the board is cleared
                            if(flipped == array.length){
                                var snd2 = new Audio("./sound effects/win.mp3");
                                snd2.play();                              
                                setTimeout(function(){
                                    confirm("Congratulations, you won with " + numOfGuess + " tries, try with a new board ?"); 
                                    clearBoard();
                                }, 500);
                            }

                        } else {

                            // if the two cards are not equals..flip the two cards back over
                            function flipBackOver() {
                                var card_1 = document.getElementById(card_ids[0]);
                                var card_2 = document.getElementById(card_ids[1]);
                                card_1.style.background = 'rgba(197, 197, 193, 0.55)';
                                card_1.innerHTML = "";
                                card_2.style.background = 'rgba(197, 197, 193, 0.55)';
                                card_2.innerHTML = "";
                                values = [];
                                card_ids = [];
                            }
                           setTimeout(flipBackOver, 500);
                        }                     
                    }   
                }
            }
            // we call the clear board
             clearBoard();
           

