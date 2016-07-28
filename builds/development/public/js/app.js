(function(){
    'use strict';

    var gameModule = (function(){

        var initModule,
            tankPosition = {},
            socket = io.connect('http://localhost:3001');

        initModule = function(){

            socketConnection();

            var level = new Level(levelPlan);

            //socket.emit('runGame', level);

            addEventListener("keydown", function(event) {
                if (event.keyCode === 39)
                    Tank.prototype.runForward();
                    var tankContainer = document.getElementsByClassName("tankContainer")[0];
                    container.removeChild(tankContainer);
                    var tank = new Tank(tankPosition);
            });

            addEventListener("keydown", function(event) {
                if (event.keyCode === 37)
                    Tank.prototype.runBackward();
                    var tankContainer = document.getElementsByClassName("tankContainer")[0];
                    container.removeChild(tankContainer);
                    var tank = new Tank(tankPosition);
            });
        }


        var levelPlan = [
            "wwwwwwwwwwwwwwwwwwwwwwwwwwww",   // (1)
            "wT                         w",   // (2)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (3)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (4)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (5)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (6)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (7)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (8)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (9)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (9)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (9)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (10)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (11)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (12)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (13)
            "w wwwwwwwwwwwwwwwwwwwwwwww w",   // (14)
            "wT                         w",   // (15)
            "wwwwwwwwwwwwwwwwwwwwwwwwwwww",   // (16)
        ];

        function Level(plan) {

            //this.width = plan[0].length*45 + "px";
            //this.height = plan.length*45 + "px";
            for (var i = 0; i < plan.length; i++) {
                for (var j = 0; j < plan[i].length; j++) {

                    if (plan[i][j] === "T") {
                        if (!tankPosition.posX) {
                            var posObject = new Position(j, i);
                            tankPosition.posX = posObject.planObjPosX;
                            tankPosition.posY = posObject.planObjPosY;
                        }
                        var tank = new Tank(tankPosition);
                    }

                    if (plan[i][j] === "w") {
                        var posObject = new Position(j, i);
                        var wall = new Wall(posObject.planObjPosX, posObject.planObjPosY);
                    }

                }
            }
        }

        function Wall(wallPosX, wallPosY) {
            this.posX = wallPosX;
            this.posY = wallPosY;

            var wallContainer = document.createElement("div");
            container.appendChild(wallContainer);
            wallContainer.className = "wallContainer";
            wallContainer.style.left = this.posX + "px";
            wallContainer.style.top = this.posY + "px";

        }

        function Position(planObjPosX, planObjPosY) {
            this.planObjPosX = planObjPosX*45;
            this.planObjPosY = planObjPosY*45;
        }

        function Tank(tankPos) {
            this.posX = tankPos.posX;
            this.posY = tankPos.posY;
            var tankContainer = document.createElement("div");
            container.appendChild(tankContainer);
            tankContainer.className = "tankContainer";
            tankContainer.style.left = this.posX + "px";
            tankContainer.style.top = this.posY + "px";

        }

        Tank.prototype.runForward = function() {
            //Tank.prototype.checkWay(levelPlan);
            if (tankPosition.posX < 1180) {
                tankPosition.posX = tankPosition.posX + 5;
            }
        }

        Tank.prototype.runBackward = function() {
            if (tankPosition.posX > 45  ) {
                tankPosition.posX = tankPosition.posX - 5;
            }
        }

        function socketConnection() {

          socket.on('connect', function(){
            //socket.emit('addme', prompt('Who are you?'));
          });

          socket.on('game', function(username, data){

          });
        }



        return {
            initModule: initModule
        }
    })();

    $(document).ready(function () {
        gameModule.initModule();
    });


}());
