var timer = 256;
var tickRate = 16;
var tickRate2 = 1000;
var tickRate3 = 5000;
var tickRate4 = 15000;
var visualRate = 256;
var resources = {"gold" : 0, "pickaxe" : 1, "enemies" : 0, "mana" : 0, "magicLevel" : 1};
var enemy = {"enemy" : 0};
var bossExist = false;
var superBossExist = false;
var playerDead = false;
var hasAppeared = false;
var magicExist = false;
var playerDefHP = 40000;
var bossDefHP = 60000;
var dmgReduction = 1;
var freezeOn = false;



var magicMult = 1;
var bossLevel = 1;


var bossLimit = {"limit" : 350};

var costs = {"pickaxe" : 25, "miner" : 200, "miner_pickaxe" : 15, "armor" : 150, "magicUP1" : 0};
var growthRate = {"pickaxe" : 1.25, "miner" : 1.25, "miner_pickaxe" : 1.75, "armor" : 1.95, "magicUP2" : 1.75};

var increments = [{"input": ["miner", "miner_pickaxe"],
		   "output" : "gold", "outputi" : "enemies"}];

var unlocks = { "pickaxe" : {"gold" : 20},
                "miner" : {"gold" : 150},
	           "miner_pickaxe" : {"miner" : 1},
               "armor" : {"boss" : 1},
               "boss" : {"enemies" : 1000},
               "playerHP" : {"boss" : 1},
               "bossHP" : {"boss" : 1},
               "mana" : {"enemies" : 500},
               "magic" : {"mana" : 1000},
               "health" : {"boss" : 1},
               "heal" : {"boss" : 1},
               "freeze" : {magicLevel : 4, "boss" : 1},
               "boss1" : {"boss" : 1},
                "boss2" : {"boss": 2},
                "boss3" : {"boss" : 3},
                "boss4" : {"boss" : 4},
                "boss5" : {"boss" : 5},
                "boss6" : {"boss" : 6},
                 "boss7" : {"boss" : 7},
                "boss8" : {"boss" : 8},
                "boss9" : {"boss" : 9},
                "boss10" : {"boss" : 10},
                "boss11" : {"boss" : 11},
                "boss12" : {"boss" : 12}


};



function updateText() {
    "use strict";
    for (var key in unlocks) {
	   var unlocked = true;
	   for (var criterion in unlocks[key]){
	    unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
	   }
	   if (unlocked){
            for (var element of document.getElementsByClassName("show_" + key)){
               
                element.style.display = "block"; 
                
	       }
	   }
        
    }

    
    for (var key in resources){
	 for (var element of document.getElementsByClassName(key)){
	    element.innerHTML = resources[key].toFixed(2)
	}
    }
    for (var key in enemy) {
        for (var element of document.getElementsByClassName(key)) {
            element.innerHTML = enemy[key].toFixed(0)
        }
    }
    for (var key in costs){
	for (var element of document.getElementsByClassName(key+"_cost")){
	    element.innerHTML = costs[key].toFixed(2)
	}
    }

};

function mineGold(num) { //attack
    "use strict";
   // if (playerDead == false) {
  //  var myMusic= document.getElementById("music");
    //function play() {
      //  myMusic.play();
    //}

    resources["gold"] += num * resources["pickaxe"];
    if (bossExist == false) {
        resources["enemies"] += num * resources["pickaxe"];
        enemy["enemy"] += num * resources["pickaxe"];
    }
    else {
    
    resources["bossHP"] -= num * resources["pickaxe"];
    document.getElementById("health-bar").value -= num * resources["pickaxe"];
        if (resources["bossHP"] <= 0) {
        bossExist = false;
        resources["bossHP"] = 0;
            switch(resources["boss"]) {
                case 1:
                    document.getElementById("header").style.visibility = "hidden"
                    break;
                case 2:
                    document.getElementById("boss2").style.visibility = "hidden"
                    break;
                case 3:
                    document.getElementById("boss3").style.visibility = "hidden"
                    break;
                case 4:
                    document.getElementById("boss4").style.visibility = "hidden"
                    break;
                case 5:
                    document.getElementById("boss5").style.visibility = "hidden"
                    break;
                case 6:
                    document.getElementById("boss6").style.visibility = "hidden"
                    break;
                case 7:
                    document.getElementById("boss7").style.visibility = "hidden"
                    break;
                case 8:
                    document.getElementById("boss8").style.visibility = "hidden"
                    break;
                case 9:
                    document.getElementById("boss9").style.visibility = "hidden"
                    break;
                case 10:
                    document.getElementById("boss10").style.visibility = "hidden"
                    break;
                case 11:
                    document.getElementById("boss11").style.visibility = "hidden"
                    break;
            }
        updateText();
        if (superBossExist == false) {
            alert("You defeated this boss! You ain't done yet, tho!")
        }
        let bossBut = document.getElementById("boss1")
        bossBut.style.visibility = "visible";
            if (superBossExist == true) {
                            alert("You win! You've killed all the demons of the world! Thank you for playing!");
                            window.location.reload(true);
                            
                        }
            if (bossLevel >= 12) { // this doesnt work yet tho
                        if (superBossExist == false) {
                            alert("Final boss!!");
                        }
                        superBossTime(1);
                        let bossBut = document.getElementById("boss1")
                        bossBut.style.visibility = "hidden";
             }
         //window.close();
         //window.location.reload(true);
    }

    }
   // }
    updateText();
    
};


function upgradeMinerPickaxe(num){ //upgrade merc weapons
    //if(playerDead == false) {
   
    if (resources["gold"] >= costs["miner_pickaxe"]*num){
	resources["miner_pickaxe"] += num
	resources["gold"] -= num * costs["miner_pickaxe"]
	
	costs["miner_pickaxe"] *= growthRate["miner_pickaxe"]
    
	
	updateText();
    }
    
  //  }
};

function upgradePickaxe(num){ //upgrade sword
    //if (playerDead == false) {
    if (resources["gold"] >= costs["pickaxe"]*num){
	resources["pickaxe"] += num
	resources["gold"] -= num*costs["pickaxe"]
	
	costs["pickaxe"] *= growthRate["pickaxe"]
	
	updateText();

    }
    // }
};
function hireMiner(num){ //hire merc
    // if(playerDead == false) {
    if (resources["gold"] >= costs["miner"]*num){
	if (!resources["miner"]){
	    resources["miner"] = 0
	}
	if (!resources["miner_pickaxe"]){
	    resources["miner_pickaxe"] = 1
	}
	resources["miner"] += num
	resources["gold"] -= num*costs["miner"]
	
	costs["miner"] *= growthRate["miner"]
	
	updateText();
    }
   // }
};
function addArmor(num) { //armor
  if (resources["gold"] >= costs["armor"]*num) {
      if(!resources["armor"]){
        resources["armor"] = 0;
      }
      if (resources["armor"] <= 9) {
        dmgReduction -= 0.01;
        resources["armor"] += num;
        resources["gold"] -= num*costs["armor"];

        costs["armor"] *= growthRate["armor"];
        
        updateText();
      } 
      
}   
};
function bossTime(num) { //boss button
   // if (playerDead == false) {
    bossExist = true;


    if (!resources["boss"]) {
        resources["boss"] = 1;
    }
        
    if(!resources["playerHP"]){
        resources["playerHP"] = 9000;
      }
    if(!resources["bossHP"]){
        resources["bossHP"] = 10000 * (bossLevel);
        resources["bossTotalHP"] = 10000 * (bossLevel);
        document.getElementById("health-bar").value = 10000 * (bossLevel);
        document.getElementById("health-bar").max = 10000 * (bossLevel);
      }
    resources["boss"] = bossLevel
    bossLevel++;
    updateText();
  //  }
    let bossBut = document.getElementById("boss1")
    bossBut.style.visibility = "hidden";
    // bossBut.document.getElementById("boss1").onclick = "bossTime2(1)";
    
};
function superBossTime(num) { // final boss
   // if (playerDead == false) {
    resources["boss"] = 12;

    superBossExist = true;
    bossExist = true;
    
   // if (!resources["boss"]) {
    //}
        
   if(!resources["playerHP"]){
        resources["playerHP"] = 9000;
      }
    if(!resources["bossHP"]){
        resources["bossHP"] = 150000;
        resources["bossTotalHP"] = 150000;
        document.getElementById("health-bar").value = 150000;
        document.getElementById("health-bar").max = 150000;
      }
    
    updateText();
  //  }
    let bossBut = document.getElementById("boss1")
    bossBut.style.visibility = "hidden"; 
};

function magicTime(num) { //upgrade magic
 //   if (playerDead == false) {
    magicExist = true;
    if(costs["magicUP1"] == 0) {
        costs["magicUP1"] +=100;
    }
    
if (resources["gold"] >= costs["magicUP1"]*num){
	//resources["magicUP2"] += num
	resources["gold"] -= num * costs["magicUP1"]
	
	costs["magicUP1"] *= growthRate["magicUP2"]
    growthRate["magicUP2"] += .1
    //updateText();
    }
    
    
    
    if (!resources["magic"]) {
        resources["magic"] = 1;
        resources["mana"] += 1000;
    }
    else {
        
        magicMult++;
        resources["magicLevel"] = magicMult;
    }
    
    updateText();
// }
};

function fireMagic(num) {

   // if (playerDead == false) {
    if(resources["mana"] >= 100) {
            document.getElementById("header2").style.visibility = "visible"
            setTimeout(function() {
                document.getElementById("header2").style.visibility = "hidden"
            }, 950);
        if(bossExist == true) {
            resources["bossHP"] -= 85 * magicMult;
            document.getElementById("health-bar").value -= 85 * magicMult;
            resources["gold"] += 85;
            if (resources["bossHP"] <= 0) {
                bossExist = false;
                resources["bossHP"] = 0;

                switch(resources["boss"]) {
                    case 1:
                        document.getElementById("header").style.visibility = "hidden"
                        break;
                    case 2:
                        document.getElementById("boss2").style.visibility = "hidden"
                        break;
                    case 3:
                        document.getElementById("boss3").style.visibility = "hidden"
                        break;
                    case 4:
                        document.getElementById("boss4").style.visibility = "hidden"
                        break;
                    case 5:
                        document.getElementById("boss5").style.visibility = "hidden"
                        break;
                    case 6:
                        document.getElementById("boss6").style.visibility = "hidden"
                        break;
                    case 7:
                        document.getElementById("boss7").style.visibility = "hidden"
                        break;
                    case 8:
                        document.getElementById("boss8").style.visibility = "hidden"
                        break;
                    case 9:
                        document.getElementById("boss9").style.visibility = "hidden"
                        break;
                    case 10:
                        document.getElementById("boss10").style.visibility = "hidden"
                        break;
                    case 11:
                        document.getElementById("boss11").style.visibility = "hidden"
                        break;
                }

                updateText();
                if(superBossExist == false) {
                alert("You defeated this boss! You ain't done yet, tho!")
                }
                let bossBut = document.getElementById("boss1")
                bossBut.style.visibility = "visible";
                if (superBossExist == true) {
                            alert("You win! You've killed all the demons of the world! Thank you for playing!")
                            window.location.reload(true);
                            
                        }
                    if (bossLevel >= 12) { // this doesnt work yet tho
                        if (superBossExist == false) {
                        alert("Final boss!!");
                        }
                        superBossTime(1);
                        let bossBut = document.getElementById("boss1")
                        bossBut.style.visibility = "hidden";
                    }
                //window.location.reload(true);
                 //window.close();
            }
        }
        else {
            enemy["enemy"] += 15;
            resources["enemies"] += 15 * magicMult;
            resources["gold"] += 15;
        }
        
        resources["mana"] -= 100;
        document.getElementById("mana-bar").value -= 100;
        
        updateText();
    }
   // }
};

function healMagic(num) {
   // if(playerDead == false) {
    if(resources["mana"] >= 100) {
        document.getElementById("header3").style.visibility = "visible"
        setTimeout(function() {
            document.getElementById("header3").style.visibility = "hidden"
        }, 950);

        resources["playerHP"] += 300 * magicMult;
        document.getElementById("player-bar").value += 300 * magicMult;
            if (resources["playerHP"] >= 9000) {
            resources["playerHP"] = 9000;
            document.getElementById("player-bar").value = 9000;   
        }
        resources["mana"] -= 100;
        document.getElementById("mana-bar").value -= 100;
        updateText();
    }
   // }
};

function freezeHP(num) {
    freezeOn = true;
    if(resources["mana"] >= 100) {
        resources["mana"] -= 100;
         document.getElementById("mana-bar").value -= 100;
    }
    document.getElementById("header5").style.visibility = "visible"
    setTimeout(function() {
        document.getElementById("header5").style.visibility = "hidden"
    }, 5000);

    var seconds = 15, $seconds = document.querySelector('#countdown');
    if(seconds > 0) {
        (function countdown() {
            $seconds.textContent = seconds + ' second' + (seconds == 1 ?  '' :  's')
            document.getElementById("countdown").disabled = true;

            if(seconds-- > 0) {
                setTimeout(countdown, 1000);
                if (seconds <= 10) 
                    freezeOn = false;
            }
            else{
                document.getElementById("countdown").disabled = false;
                $seconds.textContent = " ";
                var img = document.createElement("img");
                img.src = "freeze.png";
                img.height = 35;
                img.width = 35;
                var src = document.getElementById("countdown");
                src.appendChild(img)
            }
        })();
    }
}

var intervalId = window.setInterval(function(){ //
    timer += tickRate

    
    for (var increment of increments){
	total = 1
	for (var input of increment["input"]){
	    total *= resources[input]
	    
	}
	if (total){
	    console.log(total)
	    resources[increment["output"]] += total/tickRate
        if (bossExist == false) {
            enemy["enemy"] += total/tickRate
            resources[increment["outputi"]] += total/tickRate
        }
        
        else {
        resources["bossHP"] -= total/tickRate;
        document.getElementById("health-bar").value -= total/tickRate;
        if (resources["bossHP"] <= 0) {
            bossExist = false;
            resources["bossHP"] = 0;

            switch(resources["boss"]) {
                case 1:
                    document.getElementById("header").style.visibility = "hidden"
                    break;
                case 2:
                    document.getElementById("boss2").style.visibility = "hidden"
                    break;
                case 3:
                    document.getElementById("boss3").style.visibility = "hidden"
                    break;
                case 4:
                    document.getElementById("boss4").style.visibility = "hidden"
                    break;
                case 5:
                    document.getElementById("boss5").style.visibility = "hidden"
                    break;
                case 6:
                    document.getElementById("boss6").style.visibility = "hidden"
                    break;
                case 7:
                    document.getElementById("boss7").style.visibility = "hidden"
                    break;
                case 8:
                    document.getElementById("boss8").style.visibility = "hidden"
                    break;
                case 9:
                    document.getElementById("boss9").style.visibility = "hidden"
                    break;
                case 10:
                    document.getElementById("boss10").style.visibility = "hidden"
                    break;
                case 11:
                    document.getElementById("boss11").style.visibility = "hidden"
                    break;
            }

            updateText();
            if (superBossExist == false) {
                alert("You defeated this boss! You ain't done yet, tho!")
            }
            let bossBut = document.getElementById("boss1")
            bossBut.style.visibility = "visible";
            if (superBossExist == true) {
                            alert("You win! You've killed all the demons of the world! Thank you for playing!")
                            window.location.reload(true);
                            
                        }
            if (bossLevel >= 12) { // this doesnt work yet tho
                        
                        if (superBossExist == false) {
                            alert("Final boss!!");
                        }
                        superBossTime(1);
                        let bossBut = document.getElementById("boss1")
                        bossBut.style.visibility = "hidden";
                    }
            // window.close();
            //window.location.reload(true);
        }
        }
        
        
	}
    }
    
    if (timer > visualRate){
	timer -= visualRate;
    
    
	updateText();
    }
  

}, tickRate)



    
var intervalId2 = window.setInterval(function() { //normal boss attack
        if (freezeOn == false) {
            if(bossExist == true) {
                if(!resources["armor"]) {
                    resources["playerHP"] -= 20 * (bossLevel + 0.05);
                    document.getElementById("player-bar").value -= 20 * (bossLevel + 0.05);
                }
                else {
                    var damage = 20 * (bossLevel + 0.75) * dmgReduction;
                    resources["playerHP"] -= damage;
                    document.getElementById("player-bar").value -= damage;
                }
            if (resources["playerHP"] <= 0) {
                resources["playerHP"] = 0;
                playerDead = true;
                updateText();
                alert("Game Over!")
                tickRate2 = 0;
                window.clearInterval(intervalId2);
                //window.close();
                window.location.reload(true);
            }
            updateText();
            }   
        }
}, tickRate2)

window.setInterval(function() { //mana regen
    
    if(magicExist == true) {
        if(resources["mana"] < 1000) {
            resources["mana"] += 10 * magicMult;
             document.getElementById("mana-bar").value += 10 * magicMult;
            if (resources["mana"] >= 1000) {
                resources["mana"] = 1000;
                document.getElementById("mana-bar").value = 1000;
            }
        }
        if(resources["mana"] == 0) {
            resources["mana"] += 10 * magicMult;
            document.getElementById("mana-bar").value += 10 * magicMult;
        }
    }
    updateText();
}, tickRate3)

var intervalId3 = window.setInterval(function() { //crit damage
    if (freezeOn == false) {
        if (bossExist == true) {


            document.getElementById("header4").style.visibility = "visible"
            setTimeout(function() {
                document.getElementById("header4").style.visibility = "hidden"
            }, 950);
            document.getElementById("critMessage").style.visibility = "visible"
            setTimeout(function() {
                document.getElementById("critMessage").style.visibility = "hidden"
            }, 950);

            resources["playerHP"] -= 75 * (bossLevel + 0.25);
            document.getElementById("player-bar").value -= 75 * (bossLevel + 0.25);
            if (resources["playerHP"] <= 0) {
                resources["playerHP"] = 0;
                playerDead = true;
                updateText();
                alert("Game Over!")
                tickRate4 = 0;
                window.clearInterval(intervalId3);
                // window.close();
                window.location.reload(true);
            }
        updateText();
        }
    }
}, tickRate4)