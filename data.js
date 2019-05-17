var data = {
    userId,
    settings,
    dateTime,
    time_stemp: [],
    speed_report: [],
    NPCs: [],
    collisions: [],
    input_aggregate,
    interactions,
    init(userId,todo_style, off_road){
        this.userId = userId;
        this.settings.todo_style = todo_style;
        this.off_road = off_road;
        this.dateTime = Date.now();
    },

    get get_time_stemp() {
        return this.time_stemp;
    },
    set set_time_stemp(start_time, end_time, start_coor, end_coor, opperation) {
        var obj = new Object();
        obj.start_time  =start_time;
        obj.end_time = end_time;
        obj.start_coor = start_coor;
        obj.end_coor = end_coor;
        obj.opperation = opperation;
        this.time_stemp = [...time_stemp, obj]
    },

    get get_speed_report(){
        return this.speed_report;
    },

    set set_speed_report(start_time, end_time, speed_mode){
        var obj  =new Object();
        obj.start_time = start_time;
        obj.end_time = end_time;
        obj.speed_mode = speed_mode;
        this.speed_report = [...speed_report, obj];
    },

    get get_NPCs(){
        return this.NPCs;
    },

    set set_NPCs(start_time, NPC, complete){
        var obj =  new Object();
        obj.start_time = start_time;
        obj.NPC = NPC;
        obj.complete = complete;
        this.NPCs = [...NPCs, obj];
    },

    get get_collisions(){
        return this.collisions;
    },

    set set_Collisions(start_time, end_time, object){
        var obj = new Object();
        obj.start_time = start_time;
        obj.end_time = end_time;
        obj.object = object;
        this.collisions = [...collisions, obj];
    },

// process data will process all data in raw and generate aggregated data, can be overwrotten any time
    process(todo_status){
        this.input_aggregate.num_inputs = this.time_stemp.length;
        this.input_aggregate.max_time_input = 0;
        for (var temp of this.time_stemp){
            this.input_aggregate.max_time_input += temp.end_time - temp.start_time;
        }
        this.input_aggregate.collisions = this.collisions.length;

        this.input_aggregate.collision_time = 0;
        for (temp of this.collisions){
            this.input_aggregate.collision_time += temp.end_time - temp.start_time;
        }
        this.interactions.all_interactions = this.NPCs.length;
        this.interactions.completed_interactions = 0;
        for (temp of this.NPCs){
            if (temp.complete){
                this.interactions.completed_interactions +=1;
            }
        }
        this.todo_finished = todo_status;

        
    }


}