var scale = 25;

var fam = [
  "examples/assets/textures/family1.jpg",
  "examples/assets/textures/family2.jpg",
  "examples/assets/textures/family3.jpg",
];

index = 0;
var makeHouse = function(x,y, rot, scene, id , sprite_, texture_) {
  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "bakery.babylon", scene, function (newMeshes) {
    //console.log(name);
    for (var i = 0; i < newMeshes.length; i ++) {
      newMeshes[i].position = new BABYLON.Vector3(x * 80,-1,y * 80);
      newMeshes[i].rotation.y = rot - Math.PI /2;

      newMeshes[i].material.specularColor = new BABYLON.Color3(0,0,0);
      newMeshes[i].material.diffuseTexture = new BABYLON.Texture("examples/assets/textures/" + texture_ + ".png", scene);
      newMeshes[i].material.emissiveTexture = new BABYLON.Texture("examples/assets/textures/" + texture_ + ".png", scene);
      newMeshes[i].material.ambientTexture = new BABYLON.Texture("examples/assets/textures/" + texture_ + ".png", scene);

      var scale = 3;
      newMeshes[i].scaling = new BABYLON.Vector3(newMeshes[i].scaling.x*scale,newMeshes[i].scaling.y*scale,newMeshes[i].scaling.z*scale);

    }

    var boxOptions = {
      width: 35,
      height: 25,
      depth: 35,
    };

    var collider = BABYLON.MeshBuilder.CreateBox("collider", boxOptions, scene);
    collider.position =  new BABYLON.Vector3(x * 80,0,y * 80);
    collider.isVisible = true;

    collider.pickUp = function() {
      console.log("picked up " + this.pickUpId);
      //this.object.updated = false;
      //this.object.isVisible = false;
      collider.object.playAnimation(0,1,false, 100);
    }

    collider.pickUpId = id;
    collider.pickedUp = false;

    var personSheet = new BABYLON.SpriteManager(sprite_,"examples/assets/people/handingout2/" + sprite_ + ".png", 1, {width: 900, height: 1200}, scene);
  //  var personSheet = new BABYLON.SpriteManager(name,"examples/assets/people/handingout2/" + name + ".png", 1, {width: 3036, height: 4048}, scene);
    var sprite = new BABYLON.Sprite(sprite_, personSheet);
    sprite.position = new BABYLON.Vector3(x * 80,5,y * 80);

    if (rot == - Math.PI / 2) {
      sprite.position.x += 20;
    } else if (rot == Math.PI / 2) {
      sprite.position.x -= 20;
    } else if (rot == 0) {
      sprite.position.z -= 20;
    } else {
      sprite.position.z += 20;

    }

    sprite.width = 7.5 * 1.5;
    sprite.height = 10 * 1.5;

    collider.object = sprite;

  });

}

 var makeSign = function (x,y, rot1, e, scene) {
   var parent1 = new BABYLON.MeshBuilder.CreateBox("", 5, scene);
   var parent2 = new BABYLON.MeshBuilder.CreateBox("", 5, scene);
   parent1.isVisible = true; parent2.isVisible = true;
  parent1.rotation.y = rot1;

  parent2.parent = parent1;
  parent2.scaling = new BABYLON.Vector3(4,4,4);
  parent2.position.z += 20;
  parent1.position = new BABYLON.Vector3(x * 80, 0,y * 80);

  //console.log(e);

  let i0 = 0; let i1 = 0; let i2 = 0;
  let j0 = 0; let j1 = 0 ;let j2 = 0;

  e[0].forEach( function (k) {
      BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "sign2.babylon", scene, function (newMeshes) {
        newMeshes[0].parent = parent2;
        newMeshes[0].position = new BABYLON.Vector3(0,(10 - 2 * i0++)/4,0);
        newMeshes[0].rotation.y = 0;
        newMeshes[0].rotation.x = 0;

        var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:440, height:60}, scene);
        var textureContext = textureGround.getContext();
        var materialGround = new BABYLON.StandardMaterial("Mat", scene);
        materialGround.diffuseTexture = textureGround;
        var font = "bold 44px monospace";
        textureGround.drawText(k, 100, 40, font, "black", "white", true, true);
        newMeshes[0].material = materialGround;
      });
      BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "sign.babylon", scene, function (newMeshes) {
        newMeshes[0].parent = parent2;
        newMeshes[0].position = new BABYLON.Vector3(0,(10 - 2 * j0++)/4,0);
        newMeshes[0].rotation.y = Math.PI;
        newMeshes[0].rotation.x = 0;
      });


  });

  e[1].forEach( function (k) {
    //console.log(k);
    BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "sign2.babylon", scene, function (newMeshes) {
      newMeshes[0].parent = parent2;
      newMeshes[0].position = new BABYLON.Vector3(0,(10 - 2 * i1++)/4,0);
      newMeshes[0].rotation.y = -Math.PI/2;
      newMeshes[0].rotation.x = 0;

      var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:440, height:60}, scene);
      var textureContext = textureGround.getContext();
      var materialGround = new BABYLON.StandardMaterial("Mat", scene);
      materialGround.diffuseTexture = textureGround;
      var font = "bold 44px monospace";
      textureGround.drawText(k, 100, 40, font, "black", "white", true, true);
      newMeshes[0].material = materialGround;
    });
    BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "sign.babylon", scene, function (newMeshes) {
      newMeshes[0].parent = parent2;
      newMeshes[0].position = new BABYLON.Vector3(0,(10 - 2 * j1++)/4,0);
      newMeshes[0].rotation.y = Math.PI/2;
      newMeshes[0].rotation.x = 0;

      var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:440, height:60}, scene);
      var textureContext = textureGround.getContext();
      var materialGround = new BABYLON.StandardMaterial("Mat", scene);
      materialGround.diffuseTexture = textureGround;
      var font = "bold 44px monospace";
      textureGround.drawText(k, 50, 40, font, "black", "white", true, true);
      newMeshes[0].material = materialGround;
    });
  });
  e[2].forEach( function (k) {
    //console.log(k);
    let i = 0;
    BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "sign.babylon", scene, function (newMeshes) {
      newMeshes[0].parent = parent2;
      newMeshes[0].position = new BABYLON.Vector3(0,(10 - 2 * i2++)/4,0);
      newMeshes[0].rotation.y = 0;
      newMeshes[0].rotation.x = 0;
      var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:440, height:60}, scene);
      var textureContext = textureGround.getContext();
      var materialGround = new BABYLON.StandardMaterial("Mat", scene);
      materialGround.diffuseTexture = textureGround;
      var font = "bold 44px monospace";
      textureGround.drawText(k, 50, 40, font, "black", "white", true, true);
      newMeshes[0].material = materialGround;
    });
    BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "sign.babylon", scene, function (newMeshes) {
      newMeshes[0].parent = parent2;
      newMeshes[0].position = new BABYLON.Vector3(0,(10 - 2 * j2++)/4,0);
      newMeshes[0].rotation.y = 0;
      newMeshes[0].rotation.x = Math.PI;

    });
  });
 }



var makeBillboard = function (scene, pic, x=0, y=0, z=0, rotation=0, scale=1, poleHeihgt=12, boardWidth=10, boardHeight=5) {
  var poleOptions = {
    height: poleHeihgt * scale,
    diameter: 0.7 * scale
  };

  var pole = BABYLON.MeshBuilder.CreateCylinder("pole", poleOptions, scene);
  pole.position.y = 0.5 * poleOptions.height;


  var mat = new BABYLON.StandardMaterial("mat", scene);
  var texture = new BABYLON.Texture(fam[index++]);
  if (index > 2) {
    index = 0;
  }
  mat.diffuseTexture = texture;
  mat.specularColor = new BABYLON.Color3(0.1,0.1,0.1);
  var faceUV = new Array(6);
  for (var i = 0; i < 6; i++) {
    faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
  }
  faceUV[1] = new BABYLON.Vector4(0, 0, 1, 1);

  var boardOptions = {
    width: boardWidth * scale,
    height: boardHeight * scale,
    depth: 2 * (scale / 2),
    faceUV: faceUV
  };

  var board = BABYLON.MeshBuilder.CreateBox("board", boardOptions, scene);
  board.position.y = poleOptions.height;

  board.material = mat;

  pole.position.x += x;
  pole.position.y += y;
  pole.position.z += z;

  board.position.x += x;
  board.position.y += y;
  board.position.z += z;
  board.rotation.y = rotation;
  return mat;

};

function makeTree(pos, scaling, scene, sheet, tree) {

  var size = 25 + Math.random() * 5;

  var plane1 = new BABYLON.Sprite(sheet.name, sheet);

  //var plane2 = new BABYLON.Sprite(sheet.name, sheet);
  // plane2.rotation.y = Math.PI / 2;

  // var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:size, width: size, sideOrientation:BABYLON.Mesh.DOUBLESIDE}, scene);
  plane1.position = new BABYLON.Vector3(pos.x, pos.y,pos.z);
  plane1.width = 20;
  plane1.height = 20;
  //
  // var plane2 = BABYLON.MeshBuilder.CreatePlane("plane", {height:size, width: size, sideOrientation:BABYLON.Mesh.DOUBLESIDE}, scene);
  // plane2.position = new BABYLON.Vector3(pos.x,0,pos.z);
  // plane2.rotation.y = Math.PI / 2;
  // plane2.material = tree;
  // plane.material = tree;

  // return [plane1, plane2];
  return plane1;

}


function makeBoat(pos, scene) {

  var scale = 5;
  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "boat.babylon", scene, function (newMeshes) {
    //console.log(newMeshes);
    //newMeshes[i].position = new BABYLON.Vector3(x * scale + scale / 2 , 0, y * scale + scale / 2);
    newMeshes[0].position = new BABYLON.Vector3(pos.x , -22, pos.z);
    newMeshes[0].rotation.y = Math.random() * Math.PI;

    newMeshes[0].material.specularColor = new BABYLON.Color3(0,0,0);

    newMeshes[0].scaling.x = newMeshes[0].scaling.x * scale;
    newMeshes[0].scaling.y = newMeshes[0].scaling.y * scale;
    newMeshes[0].scaling.z = newMeshes[0].scaling.z * scale;


  });

}

function makeParasol(pos, scaling) {

  var size = 25;

  var parasol = new BABYLON.StandardMaterial("parasol", scene);
  parasol.diffuseTexture = new BABYLON.Texture("examples/assets/textures/lamp.png", scene);
  parasol.diffuseTexture.hasAlpha = true;
  parasol.specularColor = new BABYLON.Color3(0,0,0);

  var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:size, width: size, sideOrientation:BABYLON.Mesh.DOUBLESIDE}, scene);
  plane.position = new BABYLON.Vector3(pos.x,pos.y + size/2 - 2,pos.z);

  var plane2 = BABYLON.MeshBuilder.CreatePlane("plane", {height:size, width: size, sideOrientation:BABYLON.Mesh.DOUBLESIDE}, scene);
  plane2.position = new BABYLON.Vector3(pos.x,pos.y+ size/2 - 2,pos.z);
  plane2.rotation.y = Math.PI / 2;

  plane.material = parasol;
  plane2.material = parasol;


}

function isIsland(array, targetx, targety, targetvalue) {
  var maxx = array.length;
  var maxy = array.length;

  var up,right,down,left = false;

  for (var i = targety - 1; i >= 0; i--) {
    if (array[i][targetx] != targetvalue) {
      up = true;
      break;
    }
  }

  for (var i = targety + 1; i < maxy; i++) {
    if (array[i][targetx] != targetvalue) {
      down = true;
      break;
    }
  }

  for (var i = targetx + 1; i < maxx; i++) {
    if (array[targety][i] != targetvalue) {
      right = true;
      break;
    }
  }

  for (var i = targetx - 1; i >= 0; i--) {
    if (array[targety][i] != targetvalue) {
      left = true;
      break;
    }
  }

  if (up && down && right && left) {
    return true;
  } else {
    return false;
  }
}

function adj(array, targetx, targety, value) {
  //console.log(array);
  if (targety > 0 && array[targety-1][targetx] == value) {
    // console.log(array[targety-1][targetx]);
    return true
  }
  if (targety < array.length - 1 && array[targety+1][targetx] == value) {
    // console.log(array[targety+1][targetx]);
    return true
  }
  if (targetx > 0 && array[targety][targetx-1] == value) {
    // console.log(array[targety][targetx-1]);
    return true
  }
  if (targetx < array.length - 1 && array[targety][targetx+1] == value) {
    // console.log(array[targety][targetx+1]);
    return true
  }
  return false
}

function fillInHelp4(scene, array) {

  var array4 = new Array(array.length * 4)
  for (var i = 0; i < array4.length; i++) {
    array4[i] = new Array(array.length * 4);
  }

  // console.log(array);

  for (var y = 0; y < array.length; y++) {
    for (var x = 0; x < array.length; x++) {
      array4[y*4][x*4] = array[y][x];
      array4[y*4][(x*4)+1] = array[y][x];
      array4[y*4][(x*4)+2] = array[y][x];
      array4[y*4][(x*4)+3] = array[y][x];

      array4[(y*4)+1][(x*4)] = array[y][x];
      array4[(y*4)+1][(x*4)+1] = array[y][x];
      array4[(y*4)+1][(x*4)+2] = array[y][x];
      array4[(y*4)+1][(x*4)+3] = array[y][x];

      array4[(y*4)+2][(x*4)] = array[y][x];
      array4[(y*4)+2][(x*4)+1] = array[y][x];
      array4[(y*4)+2][(x*4)+2] = array[y][x];
      array4[(y*4)+2][(x*4)+3] = array[y][x];

      array4[(y*4)+3][(x*4)] = array[y][x];
      array4[(y*4)+3][(x*4)+1] = array[y][x];
      array4[(y*4)+3][(x*4)+2] = array[y][x];
      array4[(y*4)+3][(x*4)+3] = array[y][x];

    }
  }
  // console.log(array3);

  for (var y = 0; y < array4.length; y++) {
    for (var x = 0; x < array4.length; x++) {
      if (array4[y][x] == -1 && adj(array4, x, y, 0)) {
        array4[y][x] = -2;
      }
    }
  }

  for (var y = 0; y < array4.length; y++) {
    for (var x = 0; x < array4.length; x++) {
      if (array4[y][x] == -2) {
        array4[y][x] = 0;
      }
    }
  }

  for (var index = 0; index < 20; index++) {
    for (var y = 0; y < array4.length; y++) {
      for (var x = 0; x < array4.length; x++) {
        if (array4[y][x] == -1 && adj(array4, x, y, index)) {

          if (Math.random() <= 0.95) {
            //  new_array3[y][x] = index+1;
            array4[y][x] = index+1;
          } else {
            //  new_array3[y][x] = index+;

            array4[y][x] = index;

          }
        } else {
          //new_array3[y][x] = array3[y][x];
          array4[y][x] = array4[y][x];
        }
      }
    }
  }

  for (var y = 0; y < array4.length; y++) {
    for (var x = 0; x < array4.length; x++) {
      if (array4[y][x] == -99 && adj(array4, x, y, 0)) {
        array4[y][x] = -1;
      }
    }
  }

  for (var y = 0; y < array4.length; y++) {
    for (var x = 0; x < array4.length; x++) {
      if (array4[y][x] == -1) {
        array4[y][x] = 0;
      }
    }
  }


  for (var index2 = 0; index2 < 20; index2++) {
    for (var y = 0; y < array4.length; y++) {
      for (var x = 0; x < array4.length; x++) {
        if (array4[y][x] == -99 && adj(array4, x, y, -index2)) {
          if (Math.random() <= 0.9) {
            //  new_array3[y][x] = index+1;
            array4[y][x] = -(index2+1);
          } else {
            //  new_array3[y][x] = index+;
            array4[y][x] = -index2;
          }
        }
      }
    }
  }

  //  console.log(array3);

  return array4;
}

function fillInHelp(scene, array) {
  // array = [
  //   [0,0,0,0,0],
  //   [0,-1,-1,-1,0],
  //   [0,-1,-1,-1,0],
  //   [0,-1,-1,-1,0],
  //   [0,0,0,0,0],
  //
  // ]

  //  console.log(array);


  var array3 = new Array(array.length * 3)
  for (var i = 0; i < array3.length; i++) {
    array3[i] = new Array(array.length * 3);
  }

  // console.log(array);

  for (var y = 0; y < array.length; y++) {
    for (var x = 0; x < array.length; x++) {
      array3[y*3][x*3] = array[y][x];
      array3[y*3][(x*3)+1] = array[y][x];
      array3[y*3][(x*3)+2] = array[y][x];

      array3[(y*3)+1][(x*3)] = array[y][x];
      array3[(y*3)+1][(x*3)+1] = array[y][x];
      array3[(y*3)+1][(x*3)+2] = array[y][x];

      array3[(y*3)+2][(x*3)] = array[y][x];
      array3[(y*3)+2][(x*3)+1] = array[y][x];
      array3[(y*3)+2][(x*3)+2] = array[y][x];

    }
  }
  // console.log(array3);

  for (var y = 0; y < array3.length; y++) {
    for (var x = 0; x < array3.length; x++) {
      if (array3[y][x] == -1 && adj(array3, x, y, 0)) {
        array3[y][x] = -2;
      }
    }
  }

  for (var y = 0; y < array3.length; y++) {
    for (var x = 0; x < array3.length; x++) {
      if (array3[y][x] == -2) {
        array3[y][x] = 0;
      }
    }
  }

  for (var index = 0; index < 20; index++) {
    for (var y = 0; y < array3.length; y++) {
      for (var x = 0; x < array3.length; x++) {
        if (array3[y][x] == -1 && adj(array3, x, y, index)) {

          if (Math.random() <= 0.95) {
            //  new_array3[y][x] = index+1;
            array3[y][x] = index+1;
          } else {
            //  new_array3[y][x] = index+;

            array3[y][x] = index;

          }
        } else {
          //new_array3[y][x] = array3[y][x];
          array3[y][x] = array3[y][x];
        }
      }
    }
  }

  for (var y = 0; y < array3.length; y++) {
    for (var x = 0; x < array3.length; x++) {
      if (array3[y][x] == -99 && adj(array3, x, y, 0)) {
        array3[y][x] = -1;
      }
    }
  }

  for (var y = 0; y < array3.length; y++) {
    for (var x = 0; x < array3.length; x++) {
      if (array3[y][x] == -1) {
        array3[y][x] = 0;
      }
    }
  }


  for (var index2 = 0; index2 < 20; index2++) {
    for (var y = 0; y < array3.length; y++) {
      for (var x = 0; x < array3.length; x++) {
        if (array3[y][x] == -99 && adj(array3, x, y, -index2)) {
          if (Math.random() <= 0.9) {
            //  new_array3[y][x] = index+1;
            array3[y][x] = -(index2+1);
          } else {
            //  new_array3[y][x] = index+;
            array3[y][x] = -index2;
          }
        }
      }
    }
  }

  //  console.log(array3);

  return array3;
}

function fillIn(scene, array, assetsManager) {
  var x;
  var y;

  var open = false;
  var num = 0;
  var openYX = null;

  //png stuff
  var canvas = document.getElementById('myCanvas');
  var height=array.length * 4;
  var width=array[0].length * 4;
  // var height=array.length * 3;
  // var width=array[0].length * 3;

  canvas.height=height;
  canvas.width=width;
  // getting the context will allow to manipulate the image
  var context = canvas.getContext("2d");
  var imageData=context.createImageData(width, height);
  var data=imageData.data;

  var mmdata = context.createImageData(width, height);
  var mixMap=mmdata.data;

  for (var i=0; i<height*width; i++) {
    data[i*4+0]=Math.random()*256 | 0; // Red
    data[i*4+1]=Math.random()*256 | 0; // Green
    data[i*4+2]=Math.random()*256 | 0; // Blue
    data[i*4+3]=100; // alpha (transparency)

  }

  var new_arr = new Array(array.length);
  for (var i = 0; i < new_arr.length; i++) {
    new_arr[i] = new Array(array.length);
    for (var j = 0; j < new_arr.length; j++) {
      new_arr[i][j] = 0;
    }
  }

  for (y = 0; y < array.length; y ++) {
    for (x = 0; x < array[0].length; x++) {
      if (array[y][x] == 0) {
        if (isIsland(array, x, y, 0)) {
          new_arr[y][x] = -1;
        } else {
          new_arr[y][x] = -99;
        }
      }
    }
  }

  array = fillInHelp4(scene, new_arr);
  // we put this random image in the context
  var divider = 30;

  for (y = 0; y < array.length; y++) {
    for (x = 0; x < array[0].length; x++) {

      if (array[y][x] < 0) {
        mixMap[(y * array.length + x) * 4 + 0] = 0;
        mixMap[(y * array.length + x) * 4 + 1] = 256;
        mixMap[(y * array.length + x) * 4 + 2] = 0;
        mixMap[(y * array.length + x) * 4 + 3] = 256;
      } else if (array[y][x] <= 2) {
        mixMap[(y * array.length + x) * 4 + 0] = 0;
        mixMap[(y * array.length + x) * 4 + 1] = 256;
        mixMap[(y * array.length + x) * 4 + 2] = 256;
        mixMap[(y * array.length + x) * 4 + 3] = 256;
      } else if (array[y][x] <= 3) {
        mixMap[(y * array.length + x) * 4 + 0] = 200;
        mixMap[(y * array.length + x) * 4 + 1] = 0;
        mixMap[(y * array.length + x) * 4 + 2] = 200;
        mixMap[(y * array.length + x) * 4 + 3] = 256;
      } else if (array[y][x] <= 5) {
        mixMap[(y * array.length + x) * 4 + 0] = 256;
        mixMap[(y * array.length + x) * 4 + 1] = 0;
        mixMap[(y * array.length + x) * 4 + 2] = 100;
        mixMap[(y * array.length + x) * 4 + 3] = 256;
      } else if (array[y][x] <= 6) {
        mixMap[(y * array.length + x) * 4 + 0] = 256;
        mixMap[(y * array.length + x) * 4 + 1] = 0;
        mixMap[(y * array.length + x) * 4 + 2] = 0;
        mixMap[(y * array.length + x) * 4 + 3] = 256;
      } else {
        mixMap[(y * array.length + x) * 4 + 0] = 256;
        mixMap[(y * array.length + x) * 4 + 1] = 0;
        mixMap[(y * array.length + x) * 4 + 2] = 0;
        mixMap[(y * array.length + x) * 4 + 3] = 256;
      }
      data[(y * array.length + x) * 4 + 0] = (array[y][x] + divider / 2) / divider * 256 | 0;
      data[(y * array.length + x) * 4 + 1] = (array[y][x] + divider / 2) / divider * 256 | 0;
      data[(y * array.length + x) * 4 + 2] = (array[y][x] + divider / 2) / divider * 256 | 0;
      data[(y * array.length + x) * 4 + 3] = 256;



    }
  }


  context.putImageData(imageData, 0, 0); // at coords 0,0
  var img = new Image();
  img.src = canvas.toDataURL();
  document.body.appendChild(img);

  context.putImageData(mmdata, 0, 0); // at coords 0,0
  var mm = new Image();
  mm.src = canvas.toDataURL();
  document.body.appendChild(mm);

  var ground = new BABYLON.StandardMaterial("ground", scene);
  ground.specularColor = new BABYLON.Color3(0,0,0);

  var groundTask = assetsManager.addTextureTask("ground", "examples/assets/textures/leaves.jpg");
  groundTask.onSuccess = task=> ground.diffuseTexture = task.texture;

  var tree1 = new BABYLON.SpriteManager("tree1","examples/assets/textures/tree.png", 1000, {width: 200, height: 200}, scene);
  var tree2 = new BABYLON.SpriteManager("tree2","examples/assets/textures/tree2.png", 1000, {width: 700, height: 920}, scene);
  var tree3 = new BABYLON.SpriteManager("tree3","examples/assets/textures/tree3.png", 1000, {width: 1200, height: 1600}, scene);

  var bush1 = new BABYLON.SpriteManager("tree3","examples/assets/textures/bush.png", 300, {width: 563, height: 486}, scene);

  var trees = [1000];
  var tree_index = 0;
  var scale = 80;
  var hm = BABYLON.Mesh.CreateGroundFromHeightMap("ground", img.src, 1200, 1200, 40, 0, 100, scene, false, function () {});
  //console.log(array[0].length);
  //console.log(array.length);

  for (y = 0; y < array.length; y++) {
    for (x = 0; x < array[0].length; x++) {
      if (array[y][x] > - 1 && array[y][x] < 2) {
        if (Math.random() > 0.8) {
          rand = Math.random();

          var link = rand < 0.3 ? tree1 : rand > 0.6 ? tree2 : tree3;
          //var link = tree1;
          var tree = makeTree(new BABYLON.Vector3((x - 30) * 25, -10, (y - 30) * 25), 1, scene, link, link);
          //console.log(tree.position);
          trees[tree_index++] = tree;
        }
      } else if (array[y][x] >= 2) {
        //console.log("hello");
        if (Math.random() > 0.2) {
          rand = Math.random();

          var link = rand < 0.3 ? tree1 : rand > 0.6 ? tree2 : tree3;
          //var link = tree1;
          var tree = makeTree(new BABYLON.Vector3((x - 30) * 25, -10, (y - 30) * 25), 1, scene, link, link);
          //console.log(tree.position);
          trees[tree_index++] = tree;
        }

      }
    }
  }


  hm.position = new BABYLON.Vector3(0,-51,0);
  hm.rotation.y = Math.PI;
  hm.scaling.x = -1;

  //TODO MIX MAP STUFF
  var terrainMaterial = new BABYLON.TerrainMaterial("terrainMaterial", scene);
  terrainMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
  //  terrainMaterial.specularPower = 64;

  //terrainMaterial.mixTexture = new BABYLON.Texture("examples/assets/textures/mixMap.png", scene);
  terrainMaterial.mixTexture = new BABYLON.Texture(mm.src, scene);

  var floorTask = assetsManager.addTextureTask("floor", "examples/assets/textures/rock.jpg");
  floorTask.onSuccess = task=> {
    terrainMaterial.diffuseTexture1 = task.texture;
    terrainMaterial.diffuseTexture1.uScale = terrainMaterial.diffuseTexture1.vScale = 15;

  }

  var rockTask = assetsManager.addTextureTask("rock", "examples/assets/textures/rock.png");
  rockTask.onSuccess = task=> {
    terrainMaterial.diffuseTexture2 = task.texture;
    terrainMaterial.diffuseTexture2.uScale = terrainMaterial.diffuseTexture2.vScale = 15;

  }

  var grassTask = assetsManager.addTextureTask("grass", "examples/assets/textures/grass.png");
  grassTask.onSuccess = function(task) {
    terrainMaterial.diffuseTexture3 = task.texture;
    terrainMaterial.diffuseTexture3.uScale = terrainMaterial.diffuseTexture3.vScale = 30;
  }

  hm.material = terrainMaterial;

  return trees;
}

//THE ONE
function makeRoad2(scene, assetsManager, car) {

//console.log(car);
  // var array = [
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,3,3,1,1,3,3,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,3,4,0,0,4,3,0,0,0],
  //   [0,0,0,3,3,1,1,6,5,0,4,3,0,0,0,0,1,0,0,0],
  //   [0,0,0,3,4,0,0,5,5,1,3,3,0,0,0,0,1,0,0,0],
  //   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0],
  //   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
  //   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0],
  //   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0],
  //   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
  //   [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0,0],
  //   [0,0,5,5,0,0,0,0,0,3,3,6,5,0,0,0,6,5,0,0],
  //   [0,0,6,5,0,0,0,0,0,3,4,5,5,1,1,1,9,0,0,0],
  //   [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0],
  //   [0,0,9,1,1,7,9,1,1,9,0,0,0,0,0,0,7,0,0,0],
  //   [0,0,1,0,0,0,1,0,0,3,4,0,0,0,0,0,1,0,0,0],
  //   [0,0,3,4,0,4,3,0,0,3,3,6,5,0,0,4,3,0,0,0],
  //   [0,0,3,3,1,3,3,0,0,0,0,5,5,1,1,3,3,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  // ];

  var array = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,3,3,1,9,1,1,1,9,1,3,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,3,1,9,1,9,1,9,1,3,3,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,10,9,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,3,3,1,9,1,9,1,9,1,3,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,4,0,1,0,0,0,1,0,4,3,0,0],
    [0,0,3,3,1,9,1,1,1,9,1,3,3,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];


  var trees = [];
  var trees = fillIn(scene, array, assetsManager);

  var scale = 80;
  let x;
  let y;


  var start;
  var sinas = [];
  var sina_index = 0;

  var spriteManagerSinatra = new BABYLON.SpriteManager("Frank Sinatra","examples/assets/animations/sinatra_sheet.png", 100, {width: 666, height: 735}, scene);
  var spriteManagerHepburn = new BABYLON.SpriteManager("Audrey Hepburn","examples/assets/animations/hepburn_sheet.png", 100, {width: 1200, height: 921}, scene);

  for (y = 0; y < array.length; y++) {
    for (x = 0; x < array[0].length; x++) {
      //  console.log(array[y][x]);

      var posX = x - 7;
      var posY = y - 7;

      if (array[y][x] == 1) {

        addRoad1(x,y,posX, posY, scene, scale, array);
        //start = new BABYLON.Vector3(x * scale, 0, y * scale);

        // var sina = new Animation(scene,spriteManagerSinatra);
        //
        // var r1 = Math.random() < 0.5 ? -1 : 1;
        // var r2 = (Math.random() - 0.5) * 20;
        // if (array[y][x-1] != 0 && array[y][x+1] != 0) {
        //   sina.updatePos(new BABYLON.Vector3(x * scale + r2, 2.5, y * scale + r1 * 20), scene);
        // } else {
        //   sina.updatePos(new BABYLON.Vector3(x * scale + r1 * 20, 2.5, y * scale + r2), scene);
        // }
        //
        // sinas[sina_index++] = sina;

      }

      if (array[y][x] == 2) {
        addRoad2(x, y, scene, scale, array);
      }

      if (array[y][x] == 4) {
        addRoad3(x, y, posX, posY, scene, scale, array);

        // var sina = new Animation(scene,spriteManagerHepburn);
        // var angle = Math.PI / 4;
        // var len = Math.random() < 0.5 ? 108 : 147;
        //
        // if (array[y][x-1] == 3 && array[y+1][x-1] == 3 && array[y+1][x] == 3) {
        //   sina.updatePos(new BABYLON.Vector3(x * scale + scale/2 - Math.sin(angle) * len, 2.5, y * scale - scale/2 + Math.cos(angle) * len), scene);
        // }
        //
        // else if (array[y][x-1] == 3 && array[y-1][x-1] == 3 && array[y-1][x] == 3) {
        //   sina.updatePos(new BABYLON.Vector3(x * scale + scale/2 - Math.sin(angle) * len, 2.5, y * scale + scale/2 - Math.cos(angle) * len), scene);
        // }
        //
        // else if (array[y][x+1] == 3 && array[y-1][x+1] == 3 && array[y-1][x] == 3) {
        //   sina.updatePos(new BABYLON.Vector3(x * scale - scale/2 + Math.sin(angle) * len, 2.5, y * scale + scale/2 - Math.cos(angle) * len), scene);
        // } else {
        //   sina.updatePos(new BABYLON.Vector3(x * scale - scale/2 + Math.sin(angle) * len, 2.5, y * scale - scale/2 + Math.cos(angle) * len), scene);
        // }
        //
        // sinas[sina_index++] = sina;

      }

      if (array[y][x] == 6) {
        addRoad4(x, y, scene, scale, array);

        if (array[y][x-1] == 5 && array[y+1][x-1] == 5 && array[y+1][x] == 5) {
          makeBillboard(scene, "examples/assets/textures/family1.jpg", (x-3/4) * scale, 0, y * scale , - 3 * Math.PI / 4, 1, 12, 20, 10);

        } else if (array[y][x-1] == 5 && array[y-1][x-1] == 5 && array[y-1][x] == 5) {
          makeBillboard(scene, "examples/assets/textures/family1.jpg", x * scale, 0, (y-3/4) * scale , 3 * Math.PI / 4, 1, 12, 20, 10);
        } else if (array[y][x+1] == 5 && array[y-1][x+1] == 5 && array[y-1][x] == 5) {
          makeBillboard(scene, "examples/assets/textures/family1.jpg", (x+3/4) * scale, 0, y * scale , Math.PI / 4, 1, 12, 20, 10);

        } else {
          makeBillboard(scene, "examples/assets/textures/family1.jpg", x * scale, 0, (y+3/4) * scale , -Math.PI / 4, 1, 12, 20, 10);

        }
      }


      //3way
      if (array[y][x] == 9) {

        addRoad3way(x, y, posX, posY, scene, scale, array);

      }

      if (array[y][x] == 7) {
        var item = BABYLON.MeshBuilder.CreateSphere("house", {diameter: 5}, scene);

        item.position = new BABYLON.Vector3(x * scale, 2.5, y * scale);
        if (array[y][x-1] != 0 && array[y][x+1] != 0) {
          item.position.z += 25;
        } else {
          item.position.x -= 25;
        }

        item.collected = false;
        item.item_id = "book"

        addRoadHouse(x, y, scene, scale, array, item);

      }

      if (array[y][x] == 10) {
        addRoadBegin(x,y,posX,posY, scene, scale, array);
      }

    }
  }

  // TODO LIST!!

  const todoList = document.querySelector("#todoList");
  let itemsArray = [];

  //console.log(todoList.children);
  for (let item of todoList.children) {
    //console.log(item.textContent);
    itemsArray.push(item.textContent);
  }

  console.log(itemsArray);
  //let babylonArray = [];
  let spriteArray = [];
  let textureArray = [];
  let shopNameArray = [];

  var list = ["bread", "milk", "VHS", "book", "flowers", "bananas", "coffee", "music cd"];

  for (var i =0; i < itemsArray.length; i++) {
    console.log(itemsArray[i]);
    switch (itemsArray[i]) {
      case "bread":
        spriteArray.push("sina_bread_gif");
        textureArray.push("bread");
        shopNameArray.push("Bakery");
      break;
      case "book":
        spriteArray.push("sina_book_gif");
        textureArray.push("book");
        shopNameArray.push("Library");
      break;
      case "flowers":
        spriteArray.push("sina_flowers_gif");
        textureArray.push("flowers");
        shopNameArray.push("Florist");
      break;
      case "milk":
        spriteArray.push("sina_milk_gif");
        textureArray.push("milk");
        shopNameArray.push("Dairy Farmer");
      break;
      case "VHS":
        spriteArray.push("sina_vhs_gif");
        textureArray.push("vhs");
        shopNameArray.push("Movie Store");
      break;
      case "bananas":
        spriteArray.push("martin_banana_gif");
        textureArray.push("banana");
        shopNameArray.push("Fruiterer");
      break;
      case "coffee":
        spriteArray.push("martin_coffee_gif");
        textureArray.push("coffee");
        shopNameArray.push("Coffee Shop");
      break;
      case "music cd":
        spriteArray.push("martin_cd_gif");
        textureArray.push("cd");
        shopNameArray.push("Music Store");
      break;
      default:

    }
  }

  console.log(spriteArray);
  console.log(textureArray);

  makeHouse((7-7), (2-7), 0, scene, itemsArray[0], spriteArray[0], textureArray[0] );                       //1
  makeHouse((12-7), (3.5-7), -Math.PI / 2, scene, itemsArray[1], spriteArray[1], textureArray[1]);       //2
  makeHouse((9-7), (3.5-7), -Math.PI / 2, scene, itemsArray[2], spriteArray[2], textureArray[2]);      //3
  makeHouse((5-7), (3.5-7), Math.PI / 2, scene, itemsArray[3], spriteArray[3], textureArray[3]);           //4
  makeHouse((2-7), (3.5-7), Math.PI / 2, scene, itemsArray[4], spriteArray[4], textureArray[4]); //5

  console.log(itemsArray);
  var a = [
    [shopNameArray[1]],
    [shopNameArray[2]],
    [shopNameArray[0], shopNameArray[3], shopNameArray[4]]
  ];
  var b = [
    [shopNameArray[0], shopNameArray[2], shopNameArray[1]],
    [shopNameArray[3]],
    [shopNameArray[4]]
  ];
  var c = [
    [shopNameArray[3], shopNameArray[4]],
    [shopNameArray[2], shopNameArray[0]],
    [shopNameArray[1]]
  ];
  var d = [
    [shopNameArray[4]],
    [shopNameArray[0], shopNameArray[3]],
    [shopNameArray[1], shopNameArray[2]]
  ];
  var e = [
    [shopNameArray[1], shopNameArray[2]],
    ["Memory Lane"],
    [shopNameArray[3], shopNameArray[4], shopNameArray[0]],
  ];

  var start = [
    ["Memory"],
    [],
    ["Shopping"],
  ]

  makeSign(2, -5, Math.PI, a, scene);
  makeSign(-2, -5, Math.PI, b, scene);
  makeSign(2, -2, 0, c, scene);
  makeSign(-2, -2, 0, d, scene);
  makeSign(0, -2, Math.PI, e, scene);


  makeSign(0, 0, Math.PI / 2, start, scene);

  //jimmy stewart
  makePeople(scene, "JimmyStewart", 1750, 2200, 7.5, 10, new BABYLON.Vector3(0-80, 4.7, 160 -20));

  //louis armstrong
  makePeople(scene, "Louis Armstrong ", 321, 800, 4, 10, new BABYLON.Vector3(0+80, 5, 160 - 20));

  //Judy Garland
  makePeople(scene, "Judy Garland", 800, 800, 10, 10, new BABYLON.Vector3(0+80*3, 5, 160 + 20));

  //Laurel _ Hardy
  makePeople(scene, "Laurel _ Hardy ", 413, 500, 8, 10, new BABYLON.Vector3(0, 5.3, 160 + 80*3 + 20));


  //Jackie Gleason 2
  makePeople(scene, "Jackie Gleason 2", 604, 612, 12, 12, new BABYLON.Vector3(0-80*3, 4.5, 160 + 20));

  makePeople(scene, "carygrant", 888, 1094, 10, 12, new BABYLON.Vector3(0-80*2 - 20, 6, 160 + 80 + 40));

  makePeople(scene, "debbiereynolds", 435, 580, 10, 12, new BABYLON.Vector3(0+80*2 + 20, 6, 160 + 80 + 40));

  makePeople(scene, "elvis", 571, 1000, 5.7, 10, new BABYLON.Vector3(0+80*5 + 20, 5, 160 + 80 + 40));

  makePeople(scene, "marilynmonroe", 345, 517, 6.8, 10, new BABYLON.Vector3(0-80*5 - 20, 5, 160 + 80 + 40));

  makePeople(scene, "threestooges", 230, 353, 6.8, 10, new BABYLON.Vector3(0-80*3, 5, 160 + 80 * 3 + 20));

  makePeople(scene, "popeye", 425, 717, 6.8, 10, new BABYLON.Vector3(0+80*3, 5, 160 + 80 * 3 + 20));

  makePet(scene, "cat", 1039, 1104, 5, 5, new BABYLON.Vector3(80*2, 2.5, 80*2 - 20), new BABYLON.Vector3(80*3.5, 2.5, 80*2 - 20), 1200, 0.3, true);

  makePet(scene, "dog", 1650, 782, 10, 5, new BABYLON.Vector3(-80*2, 2.5, 80*2 - 20), new BABYLON.Vector3(-80*3.5, 2.5, 80*2 - 20), 600, 1.0, false);

  makePet(scene, "dog2", 4123, 3572, 7, 5, new BABYLON.Vector3(-80*2 + 20, 3, 80*3), new BABYLON.Vector3(-80*2 + 20, 3, 80*5), 600, 1.0, false);

  makePet(scene, "cat2", 2021, 1428, 6, 4, new BABYLON.Vector3(+80*2 - 20, 2.5, 80*3), new BABYLON.Vector3(+80*2 - 20, 2.5, 80*5), 1200, 1.0, false);

  makePet(scene, "dog3", 2955, 1953, 7, 4, new BABYLON.Vector3(- 80 - 40, 3, 80*5 - 20), new BABYLON.Vector3(80 + 40, 3, 80*5 - 20), 2000, 1.0, true);


  //
  // makeHouse((7-7), (12-7), Math.PI, scene, "libraryText.babylon" , "book", "examples/assets/babylons/library.png");
  // makeHouse((5-7), (10.5-7), Math.PI / 2, scene, "meatText.babylon", "meat", "examples/assets/babylons/meatStore.png");
  // makeHouse((2-7), (10.5-7), Math.PI / 2, scene, "movieText.babylon",  "VHS", "examples/assets/babylons/movieShop.png");
  // makeHouse((9-7), (10.5-7), -Math.PI / 2, scene, "musicText.babylon", "record", "examples/assets/babylons/musicStore.png");
  // makeHouse((12-7), (10.5-7), -Math.PI / 2, scene, "floristtext.babylon", "flowers", "examples/assets/babylons/florist.png");

  return [sinas, trees];
}

function makePeople(scene, filename, filewidth, fileheight, width, height, position) {
  var spriteSheet = new BABYLON.SpriteManager(filename,"examples/assets/people/" + filename + ".png", 1, {width: filewidth, height: fileheight}, scene);
  var sprite = new BABYLON.Sprite(filename, spriteSheet);
  sprite.position = position;
  sprite.width = width;
  sprite.height = height;

  var collider = BABYLON.MeshBuilder.CreateSphere("person", {diameter: 40}, scene);
  collider.isVisible = true;
  collider.position = position;
  collider.object = sprite;
  collider.personName = filename;

  var sound = new BABYLON.Sound("sound", "examples/assets/music/quotes/" + filename + ".mp3", scene, null, {loop: false, volume: 0.3, autoplay: false});
  collider.sound = sound;
  //add the sound
}

function makePet(scene, filename, filewidth, fileheight, width, height, position, target, speed, volume, inverted) {
  var spriteSheet = new BABYLON.SpriteManager(filename,"examples/assets/people/" + filename + ".png", 1, {width: filewidth, height: fileheight}, scene);
  var sprite = new BABYLON.Sprite(filename, spriteSheet);
  sprite.position = position;
  sprite.width = width;
  sprite.height = height;

  var collider = BABYLON.MeshBuilder.CreateSphere("pet", {diameter: 40}, scene);
  collider.isVisible = true;
  collider.position = position;
  collider.object = sprite;

  collider.origin = position;
  collider.target = target;
  collider.counter = 0;
  collider.counter_max = speed;

  collider.counter_sound = 240;
  collider.counter_sound_max = 240;

  collider.inverted = inverted;

  if (inverted ) {
    collider.object.invertU = -1;
  }

  var sound = new BABYLON.Sound("sound", "examples/assets/music/pets/" + filename + ".mp3", scene, null, {loop: false, volume: volume, autoplay: false});
  collider.sound = sound;

  collider.update = function (playerPos) {
    //console.log("pet updating");

    collider.counter ++;

    if (collider.counter < collider.counter_max / 2) {
      if (collider.inverted) {
        collider.object.invertU = -1;
      } else {
        collider.object.invertU = 0;
      }
      collider.object.position.x -= (collider.origin.x - collider.target.x) / collider.counter_max * 2
      collider.object.position.y -= (collider.origin.y - collider.target.y) / collider.counter_max * 2
      collider.object.position.z -= (collider.origin.z - collider.target.z) / collider.counter_max * 2
    //  collider.object.position.y += 0.1;
    } else if (collider.counter < collider.counter_max) {
      if (collider.inverted) {
        collider.object.invertU = 0;
      } else {
        collider.object.invertU = -1;
      }
      collider.object.position.x += (collider.origin.x - collider.target.x) / collider.counter_max * 2
      collider.object.position.y += (collider.origin.y - collider.target.y) / collider.counter_max * 2
      collider.object.position.z += (collider.origin.z - collider.target.z) / collider.counter_max * 2

    } else {
      collider.counter = 0;

    }

    collider.counter_sound = Math.min(collider.counter_sound +1, collider.counter_sound_max);

    //console.log(BABYLON.Vector3.Distance(collider.object.position, playerPos));
    if (BABYLON.Vector3.Distance(collider.object.position, playerPos) < 40) {
      if (collider.counter_sound >= collider.counter_sound_max) {
        console.log("meow");
        collider.sound.play();
        collider.counter_sound = 0;
      }
    }

  }
}

function addRoadBegin(x,y, posX, posY, scene, scale, array) {
  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "road_start.babylon", scene, function (newMeshes) {
    for (var i = 0; i < newMeshes.length; i ++) {
      newMeshes[i].position = new BABYLON.Vector3(posX * scale, 0, posY * scale);
      newMeshes[i].scaling.x = newMeshes[i].scaling.x * 4;
      newMeshes[i].scaling.y = newMeshes[i].scaling.y * 4;
      newMeshes[i].scaling.z = newMeshes[i].scaling.z * 4;


      if (array[y][x-1] != 0) {
        newMeshes[i].rotation.y = Math.PI / 2;
      } else if (array[y][x+1] != 0) {
        newMeshes[i].rotation.y = Math.PI / 2;
      }

      if (newMeshes[i].id.includes("Cube")) {
        newMeshes[i].isVisible = true;
      } else {
        newMeshes[i].material.specularColor = new BABYLON.Color3(0,0,0);
      }
    }
  });
}

function addRoad1(x, y,posX,posY, scene, scale, array) {
  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "road1_.babylon", scene, function (newMeshes) {
    for (var i = 0; i < newMeshes.length; i ++) {

      newMeshes[i].position = new BABYLON.Vector3(posX * scale, 0, posY * scale);
      newMeshes[i].scaling.x = newMeshes[i].scaling.x * 4;
      newMeshes[i].scaling.y = newMeshes[i].scaling.y * 4;
      newMeshes[i].scaling.z = newMeshes[i].scaling.z * 4;

      if (array[y][x-1] != 0 && array[y][x+1] != 0) {
        newMeshes[i].rotation.y = Math.PI / 2;
      }

      if (newMeshes[i].id.includes("Cube")) {
        newMeshes[i].isVisible = true;
      } else {
        newMeshes[i].material.specularColor = new BABYLON.Color3(0,0,0);
      }
    }
  });
}

function addRoadHouse(x,y,scene,scale, array, item) {
  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "road_house.babylon", scene, function (newMeshes) {
    for (var i = 0; i < newMeshes.length; i ++) {

      newMeshes[i].position = new BABYLON.Vector3(x * scale, 0, y * scale);
      newMeshes[i].scaling.x = newMeshes[i].scaling.x * 4;
      newMeshes[i].scaling.y = newMeshes[i].scaling.y * 4;
      newMeshes[i].scaling.z = newMeshes[i].scaling.z * 4;

      if (array[y][x-1] != 0 && array[y][x+1] != 0) {
        newMeshes[i].rotation.y += Math.PI / 2;
      }
      if (newMeshes[i].id.includes("Cube")) {
        newMeshes[i].isVisible = true;
      }
      if (newMeshes[i].id.includes("house")) {
        var houseCollider = BABYLON.MeshBuilder.CreateSphere("house", {diameter: 40}, scene);
        houseCollider.position = new BABYLON.Vector3(x * scale, 0, y * scale);
        houseCollider.isVisible = true;

        newMeshes[i].material.specularColor = new BABYLON.Color3(0,0,0);

        // newMeshes[i].material = house;
        if (array[y][x-1] != 0 && array[y][x+1] != 0) {
          houseCollider.position.z += 25;
        } else {
          houseCollider.position.x -= 25;
        }

        houseCollider.item = item;
      }
    }
  });
}

function addRoad3way(x, y, posX, posY, scene, scale, array) {

  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "road_3way.babylon", scene, function (newMeshes, particleSystems, skeletons) {

    for (var i = 0; i < newMeshes.length; i ++) {

      newMeshes[i].position = new BABYLON.Vector3(posX * scale, 0, posY * scale);
      newMeshes[i].scaling.x = newMeshes[i].scaling.x * 4;
      newMeshes[i].scaling.y = newMeshes[i].scaling.y * 4;
      newMeshes[i].scaling.z = newMeshes[i].scaling.z * 4;

      if (array[y][x-1] != 0 && array[y][x+1] != 0 && array[y+1][x] != 0) {
        newMeshes[i].rotation.y += Math.PI;
      } else if (array[y][x-1] != 0 && array[y-1][x] != 0 && array[y+1][x] != 0) {
        newMeshes[i].rotation.y += Math.PI / 2;
      } else if (array[y][x+1] != 0 && array[y-1][x] != 0 && array[y+1][x] != 0) {
        newMeshes[i].rotation.y -= Math.PI / 2;
      }

      if (newMeshes[i].id.includes("Cube")) {
        //   if (newMeshes[i].id.includes("from")) {
        //   } else {
        newMeshes[i].isVisible = true;
      }
      // } else if (newMeshes[i].id.includes("stop")) {
      //   stop = newMeshes[i]
      //   newMeshes[i].isVisible = false;
      // } else if (newMeshes[i].id.includes("trigger")) {
      //   newMeshes[i].parent = parent;
      //   newMeshes[i].isVisible = false;
      //
      // }
      else if (newMeshes[i].id.includes("direction")) {
        if (newMeshes[i].id.includes("right")) {
          var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:440, height:60}, scene);
          var textureContext = textureGround.getContext();

          var materialGround = new BABYLON.StandardMaterial("Mat", scene);
          materialGround.diffuseTexture = textureGround;
          var font = "bold 44px monospace";
          textureGround.drawText("Library", 50, 40, font, "black", "white", true, true);
          newMeshes[i].material = materialGround;
        } else if (newMeshes[i].id.includes("left")) {
          var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:440, height:60}, scene);
          var textureContext = textureGround.getContext();

          var materialGround = new BABYLON.StandardMaterial("Mat", scene);
          materialGround.diffuseTexture = textureGround;
          var font = "bold 44px monospace";
          textureGround.drawText("Bakery", 260, 40, font, "black", "white", true, true);
          newMeshes[i].material = materialGround;
        }

        //Add text to dynamic texture
      } else {
        //newMeshes[i].material = texture;
        newMeshes[i].material.specularColor = new BABYLON.Color3(0,0,0);
        //  newMeshes[i].material.disableLighting = true;
      }

    }

  });


}




function addRoad2(x, y, scene, scale, array) {

  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "road2_.babylon", scene, function (newMeshes) {
    newMeshes[0].position = new BABYLON.Vector3(x * scale, 0, y * scale);
    //  newMeshes[0].material.specularColor = new BABYLON.Color3(0,0,0);
    newMeshes[0].scaling.x = newMeshes[0].scaling.x * 4;
    newMeshes[0].scaling.y = newMeshes[0].scaling.y * 4;
    newMeshes[0].scaling.z = newMeshes[0].scaling.z * 4;
    if (array[y-1][x] != 0 && array[y][x-1] != 0) {
      newMeshes[0].rotation.y = Math.PI / 2;
    } else if (array[y+1][x] != 0 && array[y][x-1] != 0) {
      newMeshes[0].rotation.y = Math.PI;
    } else if (array[y+1][x] != 0 && array[y][x+1] != 0) {
      newMeshes[0].rotation.y = - Math.PI / 2 ;
    }

  });
}

function addRoad3(x, y, posX, posY, scene, scale, array) {

  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "road3_.babylon", scene, function (newMeshes) {
    for (var i = 0; i < newMeshes.length; i ++) {

      //newMeshes[i].position = new BABYLON.Vector3(x * scale + scale / 2 , 0, y * scale + scale / 2);
      newMeshes[i].position = new BABYLON.Vector3(posX * scale , 0, posY * scale);
      newMeshes[i].rotation.y = - Math.PI / 2;




      //  newMeshes[0].material.specularColor = new BABYLON.Color3(0,0,0);
      newMeshes[i].scaling.x = newMeshes[i].scaling.x * 4;
      newMeshes[i].scaling.y = newMeshes[i].scaling.y * 4;
      newMeshes[i].scaling.z = newMeshes[i].scaling.z * 4;

      if (array[y][x-1] == 3 && array[y+1][x-1] == 3 && array[y+1][x] == 3) {
        //  newMeshes[i].position = new BABYLON.Vector3(x * scale - scale / 2 , 0, y * scale + scale / 2);
        newMeshes[i].rotation.y = Math.PI;
      }

      if (array[y][x-1] == 3 && array[y-1][x-1] == 3 && array[y-1][x] == 3) {
        //  newMeshes[i].position = new BABYLON.Vector3(x * scale - scale / 2 , 0, y * scale - scale / 2);
        newMeshes[i].rotation.y = Math.PI / 2;
      }

      if (array[y][x+1] == 3 && array[y-1][x+1] == 3 && array[y-1][x] == 3) {
        //  console.log("hi");
        //  newMeshes[i].position = new BABYLON.Vector3(x * scale + scale / 2 , 0, y * scale - scale / 2);
        //newMeshes[0].position.y = 20;
        newMeshes[i].rotation.y =  Math.PI + Math.PI;
      }

      if (newMeshes[i].id.includes("Cube")) {
        //  newMeshes[i].rotation.x = -Math.PI;
        newMeshes[i].rotation.y +=  Math.PI/2;
        newMeshes[i].isVisible = true;


      } else {
        newMeshes[i].material.specularColor = new BABYLON.Color3(0,0,0);

      }

    }
    //
    // var x_offset = 10;
    // var y_offset = 10;
  });
}

function addRoad4(x, y, scene, scale, array) {

  BABYLON.SceneLoader.ImportMesh("", "examples/assets/babylons/", "road4_.babylon", scene, function (newMeshes) {
    for (var i = 0; i < newMeshes.length; i ++) {

      //  newMeshes[i].position = new BABYLON.Vector3(x * scale + scale / 2 , 0, y * scale + scale / 2);
      newMeshes[i].position = new BABYLON.Vector3(x * scale , 0, y * scale );
      newMeshes[i].scaling.x = newMeshes[i].scaling.x * 4;
      newMeshes[i].scaling.y = newMeshes[i].scaling.y * 4;
      newMeshes[i].scaling.z = newMeshes[i].scaling.z * 4;



      if (array[y][x-1] == 5 && array[y+1][x-1] == 5 && array[y+1][x] == 5) {
        //  newMeshes[i].position = new BABYLON.Vector3(x * scale - scale / 2 , 0, y * scale + scale / 2);

        //  newMeshes[i].scaling.x = -newMeshes[i].scaling.x;

        //  if (newMeshes[i].id.includes("Cube")) {
        //  newMeshes[i].rotation.y +=  Math.PI;
        //  }
      }

      else if (array[y][x-1] == 5 && array[y-1][x-1] == 5 && array[y-1][x] == 5) {
        //  newMeshes[i].position = new BABYLON.Vector3(x * scale - scale / 2 , 0, y * scale - scale / 2);
        newMeshes[i].rotation.y = Math.PI;
        newMeshes[i].scaling.x = -newMeshes[i].scaling.x;

        //if (newMeshes[i].id.includes("Cube")) {
        //  newMeshes[i].rotation.y +=  Math.PI;
        //}
      }

      else if (array[y][x+1] == 5 && array[y-1][x+1] == 5 && array[y-1][x] == 5) {
        //  newMeshes[i].position = new BABYLON.Vector3(x * scale + scale / 2 , 0, y * scale - scale / 2);
        newMeshes[i].rotation.y = Math.PI;

        //newMeshes[i].rotation.y = Math.PI / 2;
        //newMeshes[i].scaling.x = -newMeshes[i].scaling.x;
        //newMeshes[i].scaling.z = -newMeshes[i].scaling.z;
      } else {
        newMeshes[i].rotation.y = Math.PI / 2;

      }

      if (newMeshes[i].id.includes("Cube")) {
        //newMeshes[i].rotation.y -=  Math.PI/2;
        newMeshes[i].isVisible = true;
      }

    }
  });
}
