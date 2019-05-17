function Car0(scene, camera) {


  sphere = BABYLON.Mesh.CreateBox("sphere1", 2, scene);
  sphere.isVisible = true;
  car = BABYLON.Mesh.CreateBox("car", 2, scene);
  car.parent = sphere;
  car.isVisible = true;

  var carTarget = BABYLON.Mesh.CreateBox("car", 0.2, scene);
  carTarget.parent = car;
  carTarget.position = new BABYLON.Vector3(0, 0, 10);
  carTarget.isVisible = true;

  this.changePosition = function (newPos) {
    sphere.position = newPos;
  }

  this.changeRotation = function (newPos) {
    sphere.rotation = newPos;
  }

  this.getCar = function() {
    return car;
  }

  this.getSphere = function() {
    return sphere;
  }

this.setSpeed = function(newSpeed) {
  speed = newSpeed;
}

  //console.log(car);

  var state = "DRIVING";
//  var state = "DRIVING";
  var speed = 0; //.25
  var maxSpeed = .5; //.25
  var minSpeed = 0; //.25

  var slowed = false;
  var stopped = false;

  //states :
  //STOPPED - DRIVING - TRANSITIONING - RESETTING

  var camParent = BABYLON.Mesh.CreateBox("camParent", 1, scene);
  camParent.parent = sphere;
  camera.parent = camParent;

  let direction_v = BABYLON.MeshBuilder.CreateBox("steer", {width: 10}, scene);
  direction_v.position.y = 2;
  direction_v.rotation.y = Math.PI / 2;
  direction_v.parent = car;
  direction_v.isVisible = true;

  sphere.rotation.y = Math.PI;

  var pickUpSound = new BABYLON.Sound("pickup", "examples/assets/music/sounds/success_sound.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false});


  var a = [1,2,3,4,5,6,7,8,9,10];
  var n;
  var r=[];
  for (n=1; n<=5; ++n)
  {
    var i = Math.floor((Math.random() * (8-n)) );
    r.push(a[i]);
    a[i] = a[8-n];
  }
  //console.log(r);
//  var r = [1,2,3,4,5];

  var list = ["bread", "milk", "VHS", "book", "flowers", "bananas", "coffee", "music cd"];

const todoList = document.querySelector("#todoList");
$(todoList).append(`<div class="todoItem">${list[r[0]-1]}</div>`)
$(todoList).append(`<div class="todoItem">${list[r[1]-1]}</div>`)
$(todoList).append(`<div class="todoItem">${list[r[2]-1]}</div>`)
$(todoList).append(`<div class="todoItem">${list[r[3]-1]}</div>`)
$(todoList).append(`<div class="todoItem">${list[r[4]-1]}</div>`)



  //music STUFF
  var playList = [
    new BABYLON.Sound("song1", "examples/assets/music/playlist/1.mp3", scene, null, {loop: false, volume: 0.3, autoplay: true}),
    new BABYLON.Sound("song2", "examples/assets/music/playlist/2.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
    new BABYLON.Sound("song3", "examples/assets/music/playlist/3.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
    new BABYLON.Sound("song4", "examples/assets/music/playlist/4.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
    new BABYLON.Sound("song5", "examples/assets/music/playlist/5.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
    new BABYLON.Sound("song6", "examples/assets/music/playlist/6.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
    new BABYLON.Sound("song7", "examples/assets/music/playlist/7.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
    new BABYLON.Sound("song8", "examples/assets/music/playlist/8.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
    new BABYLON.Sound("song9", "examples/assets/music/playlist/9.mp3", scene, null, {loop: false, volume: 0.3, autoplay: false}),
  ];

  // var a = [0,1,2,3,4,5,6,7,8];
  //
  // var r=[];
  // for (var n=1; n<=9; ++n)
  // {
  //   var i = Math.floor((Math.random() * (9-n)) );
  //   r.push(a[i]);
  //   a[i] = a[9-n];
  // }
  //
  // var playList = [];
  // console.log(r);
  // for (var i = 0; i < 9; i++) {
  //   playList.push(playListOrdered[r[i]]);
  // }
  //
  // console.log(playList[0]);
  //
  // playList[0].play();
  var currentMusic = 0;

  playList[0].onended = function() {
    playList[1].play();
    currentMusic = 1;
  }
  playList[1].onended = function() {
    playList[2].play();
    currentMusic = 2;
  }
  playList[2].onended = function() {
    playList[3].play();
    currentMusic = 3;
  }
  playList[3].onended = function() {
    playList[4].play();
    currentMusic = 4;
  }
  playList[4].onended = function() {
    playList[5].play();
    currentMusic = 5;
  }
  playList[5].onended = function() {
    playList[6].play();
    currentMusic = 6;
  }
  playList[6].onended = function() {
    playList[7].play();
    currentMusic = 7;
  }
  playList[7].onended = function() {
    playList[8].play();
    currentMusic = 8;
  }
  playList[8].onended = function() {
    playList[0].play();
    currentMusic = 0;
  }


  // Move the sphere upward 1/2 its height
  sphere.position.y = 3.5;

  var map ={}; //object for multiple key presses
  scene.actionManager = new BABYLON.ActionManager(scene);
  scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
  }));
  scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
  }));

  var array = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,3,3,1,9,1,1,1,9,1,3,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,3,1,9,1,9,1,9,1,3,3,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,3,3,1,9,1,9,1,9,1,3,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,3,1,9,1,1,1,9,1,3,3,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];

  var ray1 = new BABYLON.Ray();
  var rayHelper1 = new BABYLON.RayHelper(ray1);

  var ray2 = new BABYLON.Ray();
  var rayHelper2 = new BABYLON.RayHelper(ray2);

  var ray3 = new BABYLON.Ray();
  var rayHelper3 = new BABYLON.RayHelper(ray3);

  var ray4 = new BABYLON.Ray();
  var rayHelper4 = new BABYLON.RayHelper(ray4);

  var ray5 = new BABYLON.Ray();
  var rayHelper5 = new BABYLON.RayHelper(ray5);

  var ray6 = new BABYLON.Ray();
  var rayHelper6 = new BABYLON.RayHelper(ray6);



  var length = 2;

  var localMeshDirection1 = new BABYLON.Vector3(0, 0, 1);
  var localMeshOrigin1 = new BABYLON.Vector3(-0.1, 0, 0);

  var localMeshDirection2 = new BABYLON.Vector3(0, 0, 1);
  var localMeshOrigin2 = new BABYLON.Vector3(0.1,0 , 0);

  var localMeshDirection3 = new BABYLON.Vector3(0.7, 0, 0.7);
  var localMeshOrigin3 = new BABYLON.Vector3(-0.1, 0, 0);

  var localMeshDirection4 = new BABYLON.Vector3(0.7, 0, 0.7);
  var localMeshOrigin4 = new BABYLON.Vector3(0.1,0 , 0);

  var localMeshDirection5 = new BABYLON.Vector3(-0.7, 0, 0.7);
  var localMeshOrigin5 = new BABYLON.Vector3(-0.1, 0, 0);

  var localMeshDirection6 = new BABYLON.Vector3(-0.7, 0, 0.7);
  var localMeshOrigin6 = new BABYLON.Vector3(0.1,0 , 0);


  rayHelper1.attachToMesh(car, localMeshDirection1, localMeshOrigin1, length);
  rayHelper2.attachToMesh(car, localMeshDirection2, localMeshOrigin2, length);
  rayHelper3.attachToMesh(car, localMeshDirection3, localMeshOrigin3, length);
  rayHelper4.attachToMesh(car, localMeshDirection4, localMeshOrigin4, length);
  rayHelper5.attachToMesh(car, localMeshDirection5, localMeshOrigin5, length);
  rayHelper6.attachToMesh(car, localMeshDirection6, localMeshOrigin6, length);

  // rayHelper2.show(scene);
  // rayHelper1.show(scene);
  // rayHelper3.show(scene);
  // rayHelper4.show(scene);
  // rayHelper5.show(scene);
  // rayHelper6.show(scene);

  var ray_f = new BABYLON.Ray();
  var rayhelper_f = new BABYLON.RayHelper(ray_f);
  rayhelper_f.attachToMesh(car, new BABYLON.Vector3(0,-1,0), new BABYLON.Vector3(0,0,.5), 3.5);
  rayhelper_f.show(scene);

  var ray_r = new BABYLON.Ray();
  var rayhelper_r = new BABYLON.RayHelper(ray_r);
  rayhelper_r.attachToMesh(car, new BABYLON.Vector3(0,-1,0), new BABYLON.Vector3(-.5,0,-.5), 3.5);
  rayhelper_r.show(scene);

  var ray_l = new BABYLON.Ray();
  var rayhelper_l = new BABYLON.RayHelper(ray_l);
  rayhelper_l.attachToMesh(car, new BABYLON.Vector3(0,-1,0), new BABYLON.Vector3(.5,0,-.5), 3.5);
  rayhelper_l.show(scene);

  var v;
  var hit = false;
  var direction;

  var direction_name = "None";
  var timer = 120;
  var timer_max = 5;

  var closestCollider = null;
  var closestColliderDistance = null;
  var closestColliderCount = 0;

  var closestColliderPerson = null;
  var previousPerson = null;
  var closestColliderPersonDistance = null;
  var closestColliderPersonCount = 0;

  var previous_road = 1;

  socket.on('wheel left', function(msg){
    //console.log("left");
    if (direction_name == "Right") {
      //  direction_v.rotation.y = Math.PI / 2;
    }
    direction_name = "Left";
    timer = 0;
  });

  socket.on('wheel right', function(msg){
    //console.log("right");
    if (direction_name == "Left") {
      //direction_v.rotation.y = Math.PI / 2;

    }
    direction_name = "Right";
    timer = 0;
  });

  this.update = function () {

    var x = Math.round(sphere.position.x / 80) + 7;
    var y = Math.round(sphere.position.z / 80) + 7;

    if (array[y][x] != previous_road) {
      previous_road = array[y][x];
      if (previous_road > 1) {
        //speed = minSpeed;
        slowed = true;
      } else {
        //speed = maxSpeed;
        slowed = false;
      }
    }

    function predicate(mesh){
      if (mesh.id.includes("Cube")){
        return true;
      }
      else {
        return false;
      }
    }

    function predicateCollider(mesh){
      if (mesh.id.includes("collider") && !mesh.pickedUp){
        return true;
      }
      else {
        return false;
      }
    }

    function predicateColliderPerson(mesh){
      if (mesh.id.includes("person") && (mesh != previousPerson || previousPerson == null)){
        return true;
      }
      else {
        return false;
      }
    }

      function predicateGround(mesh){
        if (mesh.id.includes("Plane")){return true;}
        else {return false;} }

        if (map["a"]) {
          direction_name = "Left";
          timer = 0;
        }

        if (map["d"]) {
          direction_name = "Right";
          timer = 0;
        }

        if (map["c"] || map["w"]) {
          speed = Math.min(speed + 0.01, maxSpeed);
        }

        if (map["b"] || map["s"]) {
          speed = Math.max(speed - 0.01, minSpeed);

        }

        if (direction_name == "Left") {
          //sphere.rotation.y -= 0.05;
          //direction_v.rotation.y -= 0.0008;
          //direction_v.rotation.y = Math.max(direction_v.rotation.y, Math.PI / 2 - Math.PI / 18)
        }
        //if (map["d"]) {
        if (direction_name == "Right") {
          //sphere.rotation.y += 0.05;
          //direction_v.rotation.y += 0.0008;
          //direction_v.rotation.y = Math.min(direction_v.rotation.y, Math.PI / 2 +Math.PI / 18)
        }

        if (timer < timer_max) {
          timer++;
          if (timer == timer_max) {
            direction_name = "None";
            //console.log("back to reality");
            //direction_v.rotation.y = Math.PI / 2;
          }
        }

        if (sphere.rotation.y < -Math.PI) {
          sphere.rotation.y += 2 * Math.PI
          //console.log("loop -")
        }
        if (sphere.rotation.y > Math.PI) {
          sphere.rotation.y -= 2 *Math.PI
          //console.log("loop +")
        }

        var temp = false;

        var hitInfo1 = scene.pickWithRay(ray1,predicate);
        var hitInfo2 = scene.pickWithRay(ray2,predicate);
        var hitInfo3 = scene.pickWithRay(ray3,predicate);
        var hitInfo4 = scene.pickWithRay(ray4,predicate);
        var hitInfo5 = scene.pickWithRay(ray5,predicate);
        var hitInfo6 = scene.pickWithRay(ray6,predicate);

        var hitInfo_f = scene.pickWithRay(ray_f,predicateGround);
        var hitInfo_r = scene.pickWithRay(ray_r,predicateGround);
        var hitInfo_l = scene.pickWithRay(ray_l,predicateGround);

        if (hitInfo_f.hit && hitInfo_l.hit & hitInfo_r.hit) {
          var f = hitInfo_f.pickedPoint;
          var l = hitInfo_l.pickedPoint;
          var r = hitInfo_r.pickedPoint;

          var mid = new BABYLON.Vector3((r.x - l.x) / 2 + l.x, (r.y - l.y) / 2 + l.y,(r.z - l.z) / 2 + l.z)
          direction = new BABYLON.Vector3(f.x - mid.x, f.y -mid.y, f.z -mid.z)

          // console.log(direction);

          car.rotation.x = -direction.y;
          // camParent.rotation.x = -direction.y;

          if (Math.abs(car.rotation.x - camParent.rotation.x) <= 0.001) {
            camParent.rotation.x = -direction.y;
          } else {
            camParent.rotation.x += Math.sign(car.rotation.x - camParent.rotation.x) * 0.001;
          }



          //get the z angle
          var zAngle = new BABYLON.Vector3(l.x - mid.x, l.y - mid.y, l.z - mid.z);

          car.rotation.z = zAngle.y * 2;

          if (Math.abs(car.rotation.z - camParent.rotation.z) <= 0.001) {
            //camParent.rotation.z = zAngle.y * 2;
          } else {
            //camParent.rotation.z += Math.sign(car.rotation.z - camParent.rotation.z) * 0.001;
          }




        } else if (!hitInfo_f.hit || !hitInfo_l.hit || !hitInfo_r.hit) {
          car.rotation.x = 0;
          car.rotation.z = 0;

          var matrix = sphere.getWorldMatrix().m;
          direction = new BABYLON.Vector3(matrix[8], matrix[9], matrix[10])
        }

        if(hitInfo1.hit && hitInfo2.hit){
          temp = true;
          //if (hitInfo1.pickedMesh == hitInfo2.pickedMesh) {
          v = new BABYLON.Vector3(hitInfo2.pickedPoint.x - hitInfo1.pickedPoint.x, hitInfo2.pickedPoint.y - hitInfo1.pickedPoint.y, hitInfo2.pickedPoint.z - hitInfo1.pickedPoint.z)
          // console.log(v);
          // }wd
        }
        if(hitInfo3.hit && hitInfo4.hit){
          temp = true;
          // if (hitInfo3.pickedMesh == hitInfo4.pickedMesh) {
          v = new BABYLON.Vector3(hitInfo3.pickedPoint.x - hitInfo4.pickedPoint.x, hitInfo3.pickedPoint.y - hitInfo4.pickedPoint.y, hitInfo3.pickedPoint.z - hitInfo4.pickedPoint.z)
          // console.log(v);
          //  }
        }
        if(hitInfo5.hit && hitInfo6.hit){
          temp = true;
          // if (hitInfo3.pickedMesh == hitInfo4.pickedMesh) {
          v = new BABYLON.Vector3(hitInfo5.pickedPoint.x - hitInfo6.pickedPoint.x, hitInfo5.pickedPoint.y - hitInfo6.pickedPoint.y, hitInfo5.pickedPoint.z - hitInfo6.pickedPoint.z)
          //  }
        }

        hit = temp;

        var hitInfo1 = scene.pickWithRay(ray1,predicateCollider);
        var hitInfoPerson = scene.pickWithRay(ray1,predicateColliderPerson);

        if (hitInfo1.hit) {
          if (closestCollider != hitInfo1.pickedMesh) {
            console.log("hit");
            closestCollider = hitInfo1.pickedMesh;

            var matrix = carTarget.getWorldMatrix().m;

            var vt = new BABYLON.Vector3(matrix[12], matrix[13], matrix[14]);

            closestColliderDistance = new BABYLON.Vector3((vt.x - closestCollider.object.position.x) / 60, 0, (vt.z - closestCollider.object.position.z)/60);


            //stopText.text = "Stop Here To Pick Up : " + hitInfo1.pickedMesh.pickUpId;
            //stopRectangle.isVisible = true;
            //speed = 0;
            stopped = true;
          }
        }

        if (closestCollider != null) {

          if (closestColliderCount < 60) {
            closestCollider.object.position.x += closestColliderDistance.x;
            closestCollider.object.position.z += closestColliderDistance.z;

            closestColliderCount++;

            if (closestColliderCount == 60) {
              //pick up the object
              closestCollider.pickUp();
              closestCollider.pickedUp = true;
              pickUpSound.play();
              for (var i = 0; i < 5; i++) {
                // if (closestCollider.pickUpId == texts[i].text) {
                if (closestCollider.pickUpId == todoList.children[i].textContent) {
                  // texts[i].color = "green";
                  todoList.children[i].classList.add("crossOut")
                  $(todoList.children[i]).append(`<i class="fas fa-check"></i>`)
                }
              }

            }
          } else if (closestColliderCount < 120){
            closestColliderCount++;
          } else if (closestColliderCount < 180) {
            closestCollider.object.position.x -= closestColliderDistance.x;
            closestCollider.object.position.z -= closestColliderDistance.z;

            closestColliderCount++;

            if (closestColliderCount == 180) {
              closestCollider = null;
              var gameOver = true;
              for (var i = 0; i < 5; i++) {
                gameOver = gameOver && todoList.children[i].classList.contains("crossOut");
              }
              if (gameOver) {
                location.reload();
              }
            //  speed = maxSpeed;
              stopped = false;
              closestColliderCount = 0;
            }
          }
        }

        if (hitInfoPerson.hit) {
          if (closestColliderPerson != hitInfoPerson.pickedMesh) {
            console.log("hitPerson");
            closestColliderPerson = hitInfoPerson.pickedMesh;
            previousPerson = hitInfoPerson.pickedMesh;

            var matrix = carTarget.getWorldMatrix().m;

            var vt = new BABYLON.Vector3(matrix[12], matrix[13], matrix[14]);

            closestColliderPersonDistance = new BABYLON.Vector3((vt.x - closestColliderPerson.object.position.x) / 60, 0, (vt.z - closestColliderPerson.object.position.z)/60);

            //speed = 0;
            stopped = true;
          }
        }

        if (closestColliderPerson != null) {
          if (closestColliderPersonCount < 60) {
            closestColliderPerson.object.position.x += closestColliderPersonDistance.x;
            closestColliderPerson.object.position.z += closestColliderPersonDistance.z;

            closestColliderPersonCount++;

            if (closestColliderPersonCount == 10) {
              playList[currentMusic].pause();
            }

            if (closestColliderPersonCount == 60) {
              //pick up the object
            //  closestCollider.pickUp();
            //  closestCollider.pickedUp = true;
              closestColliderPerson.sound.play();

            }
          } else if (closestColliderPerson.sound.isPlaying){

          } else if (closestColliderPersonCount < 120) {

            if (closestColliderPersonCount == 100) {
              playList[currentMusic].play();
            }
            closestColliderPerson.object.position.x -= closestColliderPersonDistance.x;
            closestColliderPerson.object.position.z -= closestColliderPersonDistance.z;

            closestColliderPersonCount++;

            if (closestColliderPersonCount == 120) {
              closestColliderPerson = null;
              //speed = maxSpeed;
              stopped = false;
              closestColliderPersonCount = 0;
            }
          }
        }


        if (state == "DRIVING") {
          if (!hit) {
            //console.log(direction);

            var rotationSpeed = .01; //.01

            if (!stopped) {
              if (direction_name == "Right") {
                sphere.rotation.y += rotationSpeed;
              } else if (direction_name == "Left") {
                sphere.rotation.y -= rotationSpeed;
              }
            //sphere.rotation.y += (direction_v.rotation.y - Math.PI / 2) / 5

              if (slowed) {
                sphere.position.x += direction.x * speed/2;
                sphere.position.y += direction.y * speed/2;
                sphere.position.z += direction.z * speed/2;
              } else {
                sphere.position.x += direction.x * speed;
                sphere.position.y += direction.y * speed;
                sphere.position.z += direction.z * speed;
              }
            }

          }
          else {

            //do a dot product a1 = a.(b/|b|)
            var m = car.getWorldMatrix().m;
            //var a = new BABYLON.Vector3(m[8] / 10, m[9] / 10, m[10] / 10);
            var a = direction;
            // console.log(a);

            var _b_ = v.length();
            var b = new BABYLON.Vector3(v.x / _b_, v.y / _b_, v.z / _b_);
            //console.log(b);

            var scalar = BABYLON.Vector3.Dot(a, b);
            //  console.log(scalar);

            var dir = new BABYLON.Vector3(b.x * scalar, b.y * scalar, b.z * scalar);

            if (!stopped) {
              if (direction_name == "Right") {
                sphere.rotation.y += 0.01;
              } else if (direction_name == "Left") {
                sphere.rotation.y += -0.01;
              }
              //sphere.rotation.y += (direction_v.rotation.y - Math.PI / 2) / 10;

              sphere.position.x += dir.x * speed / 2;
              sphere.position.y += dir.y * speed / 2;
              sphere.position.z += dir.z * speed / 2;
            }


          }
        }
      }
    }
