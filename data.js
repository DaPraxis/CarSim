class Data {
    constructor(userId, todo_style, off_road, speedEngine) {
        // userId: string
        this.userId = userId;
        // settings: object for config options
        this.settings = {};
        // todo style: string representing whether objectives are in todo list,
        //             in single objective format, or etc
        this.settings.todo_style = todo_style;
        // speed engine, with speed offset
        this.speedEngine = speedEngine;
        // off_road: bool representing whether or not the user can go off road
        this.off_road = off_road;
        // dateTime: datetime at start of game
        this.dateTime = Date.now();
        this.time_stamps = [];
        // NPCs: list of NPCs met during the game
        this.NPCs = [];
        this.speed_report = [];
        // collisions: list of objects collided with?
        this.collisions = [];
        // input_aggregate and interactions: aggregate data, to be computed at
        //                                   end of game
        this.input_aggregate = {};
        this.interactions = {};
    }

    get_time_stamps() {
        return this.time_stamps;
    }

    log_time_stamps(start_time, end_time, start_coor, end_coor, operation) {
        let obj = {
            start_time: start_time,
            end_time: end_time,
            start_coor: start_coor,
            end_coor: end_coor,
            operation: operation
        };
        this.time_stamps = [...this.time_stamps, obj]
    }

    get_speed_report() {
        return this.speed_report;
    }

    log_speed_report(start_time, end_time, speed, acc_acceleration) {
        let obj = {
            start_time: start_time,
            end_time: end_time,
            speed: speed,
            instant_end_acceleration: acc_acceleration
        };
        this.speed_report = [...this.speed_report, obj];
    }

    get_NPCs_list() {
        return this.NPCs;
    }

    log_NPC(start_time, NPC, complete) {
        let obj = {
            start_time: start_time,
            NPC: NPC,
            complete: complete
        };
        this.NPCs = [...this.NPCs, obj];
    }

    get_collisions() {
        return this.collisions;
    }

    log_collisions(start_time, end_time, object) {
        let obj = {
            start_time: start_time,
            end_time: end_time,
            object: object
        };
        this.collisions = [...this.collisions, obj];
    }

    // process data will process all data in raw and generate aggregated data,
    // can be overwritten any time
    process(todo_status) {
        this.input_aggregate.num_inputs = this.time_stamps.length;
        let maxTime = 0;
        if (this.time_stamps.length >= 2) {
            for (let i = 1; i < this.time_stamps.length; i += 1) {
                let timeBetween = this.time_stamps[i].start_time - this.time_stamps[i - 1].end_time;
                if (timeBetween > maxTime) {
                    maxTime = timeBetween;
                }
            }
        } 
        this.input_aggregate.max_time_without_input = maxTime;
        
        this.input_aggregate.collisions = this.collisions.length;

        this.input_aggregate.collision_time = 0;
        for (let temp of this.collisions) {
            this.input_aggregate.collision_time += temp.end_time - temp.start_time;
        }
        this.interactions.all_interactions = this.NPCs.length;
        this.interactions.completed_interactions = 0;
        for (let temp of this.NPCs) {
            if (temp.complete) {
                this.interactions.completed_interactions += 1;
            }
        }
        this.todo_finished = todo_status;
    }


}