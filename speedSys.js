 class speedEngine{
    constructor(gameMode){
        // depends on gameMode : game difficulties (now, we have todolist and objectivetodolist)
        this.gameMode = gameMode;
        this.minSpeed = 0;
        switch(gameMode){
            case "List":
                this.acceleration = 0.005;
                this.maxSpeed = 1;
                this.speed = 0;
                this.deceleration = -0.01;
                this.friction = -0.005;
                this.acc_acceleration = 0.0005;
                this.dcc_deceleration = -0.002;
                break;
            case "Objective":
                this.acceleration = 0.009;
                this.maxSpeed = 2.0;
                this.speed = 0;
                this.deceleration = -0.02;
                this.acc_acceleration = 0.0008;
                this.dcc_deceleration = -0.005;
                this.friction = -0.005;
                break;
            default:
                this.acceleration = 0.02;
                this.maxSpeed = 2.5;
                this.speed = 0;
                this.deceleration = -0.05;
                this.friction = -0.005;
                this.acc_acceleration = 0.005;
                this.dcc_deceleration = -0.002;
        }
    }

    gas(duration){
        this.speed = Math.min(this.speed + this.acceleration + duration*this.acc_acceleration, this.maxSpeed);
    }

    brake(duration){
        this.speed = Math.max(this.speed + this.deceleration + duration*this.dcc_deceleration, this.minSpeed);
    }

    friction(){
        this.speed = Math.max(this.speed + this.friction, this.minSpeed);
    }

    getAcceleration(dir, duration){
        switch(dir){
            case "Right"||"Left":
                return this.acceleration;
            case "Gas":
                return this.acceleration+duration*this.acc_acceleration;
            case "Brake":
                return this.deceleration+duration*this.dcc_deceleration;
            default:
                return 0;
        }
    }

    setSpeed(newSpeed){
        this.speed = newSpeed;
    }

    getSpeed(){
        return this.speed;
    }

}