// A to turn left D to turn right SPACE to accelerate.
//Click on the car before pressing any keys.
if(typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") {

   var resumeAudio = function() {

      if(typeof g_WebAudioContext == "undefined" || g_WebAudioContext == null) return;

      if(g_WebAudioContext.state == "suspended") g_WebAudioContext.resume();

      document.removeEventListener("click", resumeAudio);

   };

   document.addEventListener("click", resumeAudio);

}


    var createScene = function(CONFIG) {
      var scene = new BABYLON.Scene(engine);

      var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 0), scene);
      //camera.rotation.x = 0;

      camera.attachControl(canvas, true);
      scene.activeCameras.push(camera);

      var skybox = BABYLON.Mesh.CreateBox("skyBox", 1500.0, scene);
      var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.disableLighting = true;
      skybox.material = skyboxMaterial;
      skybox.infiniteDistance = true;
      skyboxMaterial.disableLighting = true;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("examples/assets/skybox/sor_sea/skybox", scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

      // scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
      //
      // scene.fogColor = new BABYLON.Color3(1, 1, 1);
      // scene.fogDensity = 0.00001;

      var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 2048, 2048, 16, scene, false);
      waterMesh.position.x = 0;
      waterMesh.position.z = 0;
      waterMesh.position.y = -12;
      var water = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
      water.backFaceCulling = true;
      water.bumpTexture = new BABYLON.Texture("examples/assets/textures/waterbump.png", scene);
      water.windForce = -10;
      water.waveHeight = .5;
      water.bumpHeight = 0.1;
      water.windDirection = new BABYLON.Vector2(1, 1);
      water.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
      water.colorBlendFactor = 0.0;
      water.addToRenderList(skybox);
      waterMesh.material = water;




      // // lights
      // //	var light1 = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(1, 2, 0), scene);
       var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 10, 0), scene);
       var light3 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(-10, 10, 10), scene);
       var light4 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(10, 10, -10), scene);
       //var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1000, 1000, 5000), scene);
      // light0.intensity = 0;
      // // var light3 = new BABYLON.HemisphericLight("light3", new BABYLON.Vector3(0, 20, 0), scene);
      // // var light4 = new BABYLON.HemisphericLight("light4", new BABYLON.Vector3(0, 1, 10), scene);
      // //	light2.intensity = 0.75;
        light2.intensity = 1;
       light3.intensity = .3;
       light4.intensity = .3;


      var assetsManager = new BABYLON.AssetsManager(scene);

      /*****************************Add City********************************************/


      //car = new Car(scene, assetsManager, camera);
      car_ = new Car0(scene, camera);
    //  car_.changePosition( new BABYLON.Vector3(-5,3,0));
      car_.changePosition( new BABYLON.Vector3(-80,6,0));
      car_.changeRotation( new BABYLON.Vector3(0, Math.PI / 2, 0));

      var updatingTrees = false;


      var values = makeRoad2(scene, assetsManager, car_);
      //var values = generateTerrain(scene,assetsManager);
      var sinas = values[0];
      var trees = values[1];

      putTrees = function(tasks) {
      //assetsManager.onFinish = function(tasks) {

        for (var i = 0; i < trees.length; i ++) {
          //console.log(trees[i]);
          //var size = 25 + Math.random() * 10 - 5 ;
          var origin = new BABYLON.Vector3(trees[i].position.x + Math.random() * 10 - 5, 150,trees[i].position.z + Math.random() * 10 - 5);
          var direction = new BABYLON.Vector3(0,-1,0);
          var length = 200;

          var ray = new BABYLON.Ray(origin, direction, length);
          var hits = scene.pickWithRay(ray);

          var y = 0;

          if (hits.hit){
            y = hits.pickedPoint.y;

            if (!hits.pickedMesh.id.includes("ground")) {

              //console.log(hits.pickedMesh.id);
              //trees[i].isVisible = false;
              trees[i].isUpdated = false;
              trees[i].position.y = -50;

            } else {
              trees[i].position.x = origin.x;
              trees[i].position.z = origin.z;
              trees[i].position.y = y + 8;
              trees[i].isUpdated = true;
              //trees[i].position.y = -10;

              //trees[i].isVisible = false;

            }

          } else {
            console.log("no hit");
          }

          updatingTrees = false;

        }
      }


      var driving = new BABYLON.Sound("driving", "examples/assets/music/sounds/driving.mp3", scene, null, {loop: true, volume: 0.3, autoplay: false});
      var car_start = new BABYLON.Sound("car_start", "examples/assets/music/sounds/car_start2.mp3", scene, null, {volume: 0.5, autoplay: false});


      var ambiant = new BABYLON.Sound("ocean", "examples/assets/music/sounds/ocean.mp3", scene, null, {volume: 0.3, loop: true, autoplay: true});



      socket.on('redirect', function(destination) {
        window.location.href = destination;
      });

      socket.on('joystick press', function(msg){
        if (msg.buttonNo === '8'){
        }
        else if (msg.buttonNo === '9'){
        }
        else if (msg.buttonNo === '10'){
        }
        else if (msg.buttonNo === '11'){
        }
      });

      // Calculate the area of a triangle
      function area(A, B, C) {
        // det of the matrix
        var area = Math.abs((A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])) / 2.0)
        return area
      }

      function isInsideRender(A, B, C, P) {
        // P is trees's position
        // Calculate area of triangle ABC
        let A0 = area (A, B, C);
        // Calculate area of triangle PBC
        let A1 = area (P, B, C)
        // Calculate area of triangle PAC
        let A2 = area (P, A, C)
        // Calculate area of triangle PAB
        let A3 = area (P, A, B)
        // Check if sum of A1, A2 and A3
        // is same as A
        // var hello = A1 + A2 + A3
        // console.log(A0, hello)
        //A2 AND A3 DONT WORKd
        if (Math.abs(A0 - ( A1 + A2 + A3)) < 0.1){
          return true
        } else {
          return false
        }
      }

      var render_angle = Math.PI / 3;
      let draw_distance = 1000;
      let middle_distance = draw_distance + 10;
      let t = 0;


      var predicate = function(mesh, wanted) {
        return (mesh.id == wanted);
        };

      scene.registerAfterRender(function() {

        var F = engine.getFps();
        //	console.log(F);
        var vec = new BABYLON.Vector3(camera.getWorldMatrix().m[12], camera.getWorldMatrix().m[13], camera.getWorldMatrix().m[14]);

        car_.update();

        // Apply the shader on all meshes
        scene.meshes.forEach(function(m) {
          if (predicate(m, "pickUp")) {
            //console.log(m.pickUpId);
            m.update();
          }

          if (predicate(m, "pet")) {
            m.update(car_.getSphere().position);
          }
        });

        t++;
        if (t == 360) {
          putTrees(t);
          car_.setSpeed(0.3);
        }

        for (var i = 0; i < sinas.length; i++) {
          // if (BABYLON.Vector3.Distance(car.carBody.position, sinas[i].plane.position) < 100) {
          //   if (sinas[i].activated == false) {
          //     sinas[i].startAnimation();
          //     sinas[i].activated = true;
          //   }
          // } else {
          //   if (sinas[i].activated == true) {
          //     sinas[i].plane.stopAnimation();
          //     sinas[i].activated = true;
          //   }
          // }
        }


        //tree STUFF
        if (updatingTrees) {

          let x = car_.getSphere().position.x;
          let z = car_.getSphere().position.z;

          let forward = car_.getCar().getDirection(BABYLON.Vector3.Forward());
          let rotation =  Math.atan(forward.x / forward.z);

          //console.log(x, z, forward);

          let left_angle = rotation - render_angle;
          let right_angle = rotation + render_angle;
          let middle_angle = rotation;
          if (forward.z < 0) {
            left_angle = rotation - render_angle + Math.PI;
            right_angle = rotation + render_angle + Math.PI;
            middle_angle = rotation + Math.PI;
          }


          let A = [draw_distance * Math.sin(left_angle) + x, draw_distance * Math.cos(left_angle) + z];

          let B = [draw_distance * Math.sin(right_angle) + x, draw_distance * Math.cos(right_angle) + z];

          let M = [middle_distance * Math.sin(middle_angle) + x, middle_distance * Math.cos(middle_angle) + z];

          // for (var i = 0; i < trees.length; i ++) {
          //   if (trees[i].isUpdated) {
          //     if (isInsideRender(A, M,[x,z],[trees[i].position.x, trees[i].position.z]) || isInsideRender(M, B, [x,z], [trees[i].position.x, trees[i].position.z])) {
          //       trees[i].isVisible = true;
          //     } else {
          //       if (trees[i].isVisible) {
          //         trees[i].isVisible = false;
          //       }
          //     }
          //   }
          // }


        }
      });


      assetsManager.load();

      return scene;
    }
