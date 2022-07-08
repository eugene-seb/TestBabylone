const createScene =  () => {
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = buildCamera(scene);
    const light = buildLight(scene);

    const ground = buildGround(scene);

    const village = buildVillage();

    //const music = buildMusic(scene);
    
    return scene;
}

//============== Build Functions =======================================

const buildVillage = (scene) => {

    const positions = listPositions();

    const village = placeHouse(listPositions, scene);

}

/**
 * arrange the houses on the scene by sing the list of positions
 */
const placeHouse = (listPositions, scene) => {

    const originalHouse = buildOriginalHouse(scene);

    //Create instances from the first two that were built 
    const houses = [];
    for (let i = 0; i < listPositions.length; i++) {
        if (listPositions[i][0] === 1) {
            houses[i] = originalHouse[0].createInstance("house" + i);
        }
        else {
            houses[i] = originalHouse[1].createInstance("house" + i);
        }
        houses[i].rotation.y = listPositions[i][1];
        houses[i].position.x = listPositions[i][2];
        houses[i].position.z = listPositions[i][3];
    }

    return houses;
}

/**
 * Set the all the position for the village configuration
 */
const listPositions = () => {
    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
    places.push([2, -Math.PI / 16, -4.5, 3 ]);
    places.push([2, -Math.PI / 16, -1.5, 4 ]);
    places.push([2, -Math.PI / 3, 1.5, 6 ]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
    places.push([1, 5 * Math.PI / 4, 0, -1 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
    places.push([2, Math.PI / 1.9, 4.75, -1 ]);
    places.push([1, Math.PI / 1.95, 4.5, -3 ]);
    places.push([2, Math.PI / 1.9, 4.75, -5 ]);
    places.push([1, Math.PI / 1.9, 4.75, -7 ]);
    places.push([2, -Math.PI / 3, 5.25, 2 ]);
    places.push([1, -Math.PI / 3, 6, 4 ]);

    return places;
}

/**
 * Create the original buildings
 */
const buildOriginalHouse = (scene) => {
    const simpleHouse = buildhouse(1, scene);
    simpleHouse.rotation.y = -Math.PI / 16;
    simpleHouse.position.x = -6.8;
    simpleHouse.position.z = 2.5;

    const doubleHouse = buildhouse(2, scene);
    doubleHouse.rotation.y = -Math.PI / 16;
    doubleHouse.position.x = -6.8;
    doubleHouse.position.z = 2.5;

    return [simpleHouse, doubleHouse];
}


const buildCamera = (scene) => {
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 40, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    return camera;
}

const buildLight = (scene) => {
    const light = new BABYLON.HemisphericLight("light", BABYLON.Vector3(1, 1, 0), scene);

    return light;
}

const buildGround = (scene) => {
    const ground = BABYLON.CreateGround("Ground", {width: 40, height: 40}, scene);

    const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png", scene);
    ground.material = groundMaterial;

    return ground;
}


const buildBox = (width, scene) => {
    //options parameter to set different images on each side
    const faceUV = [];
    if (width == 2) {
        faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
    } else {
        faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    }
    // top 4 and bottom 5 not seen so not set

    // the box
    const box = new BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true}, scene);
    box.position = new BABYLON.Vector3(0, 0.5, 0);

    //texture
    const boxMaterial = new BABYLON.StandardMaterial("box materail", scene);
    if (width == 2) {
       boxMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png") 
    } else {
        boxMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");   
    }
    box.material = boxMaterial;

    return box;
}

const buildRoof = (width, scene) => {
    const roofMaterial = new BABYLON.StandardMaterial("roof material", scene);
    roofMaterial.diffuseTexture = new BABYLON.Texture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwmb79RG714Aby8dJhxAN767G4iy0F4Ri_dg&usqp=CAU", scene);

    const roof = new BABYLON.CreateCylinder("Roof", {diameter: 1.3, height: 1.2, tessellation: 3}, scene);
    roof.scaling.x = 0.75;
    roof.scaling.y = width;
    roof.position = new BABYLON.Vector3(0, 1.22, 0);
    roof.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
    roof.material = roofMaterial;

    return roof;
}

const buildhouse = (width, scene) => {
    const box = buildBox(width, scene);
    const roof = buildRoof(width, scene);

    const house = new BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);

    return house;
}

const buildMusic = (scene) => {
    const music = new BABYLON.Sound("Sound", "sounds/cellolong.wav", scene, null, { loop: true, autoplay: true });

    return music;
}
