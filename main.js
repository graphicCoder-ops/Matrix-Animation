import * as THREE from 'three';

//Materials
const BoxLineMaterial = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});
const StandardMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const LineMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
const SphereMesh = new THREE.SphereGeometry(3,32,16);
const number = prompt("Enter Number of Points");

const BoxMesh= new THREE.BoxGeometry(200,200,200);

const Box = new THREE.Mesh(BoxMesh,BoxLineMaterial);

const spheres=[];
const SpeedVectors=[]

// Creating Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//Borders
scene.add(Box);
// Spawning Spheres
for(var i =0;i<number;i++){
    spheres.push(new THREE.Mesh(SphereMesh,StandardMaterial));
    spheres[i].position.x=Math.random()*200-100;
    spheres[i].position.y=Math.random()*200-100;
    spheres[i].position.z=Math.random()*200-100;
    SpeedVectors.push(new THREE.Vector3(Math.random()*0.3,Math.random()*0.3,Math.random()*0.3));
    scene.add(spheres[i]);
}


// Lights
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

const AmbientLight = new THREE.AmbientLight(0x222222);
scene.add(AmbientLight);


camera.position.z = 0;



function update() {
	requestAnimationFrame( update ); 
    
   for(var i=number;i<scene.children.length;i++){
        if(i>number){
            scene.remove(scene.children[i]);
        }
   }
    for(var i=0;i<number;i++){
        spheres[i].position.add(SpeedVectors[i]);
        // Updating Speed
        if(spheres[i].position.x >100 || spheres[i].position.x < -100){
            SpeedVectors[i].x*=-1;
        }
        if(spheres[i].position.y >100||spheres[i].position.y < -100){
            SpeedVectors[i].y*=-1;
        }
        if(spheres[i].position.z >100||spheres[i].position.z < -100){
            SpeedVectors[i].z*=-1;
        }
        // Adding Lines to nearest 60 units of Distance
        for(var j=0;j<number;j++){
            if(i!=j){
                const Distance=spheres[i].position.distanceTo(spheres[j].position);
                    if(Distance<60){
                    const lineGeometry=new THREE.BufferGeometry().setFromPoints([spheres[i].position,spheres[j].position]);
                    const line=new THREE.Line(lineGeometry,LineMaterial);
                    scene.add(line);
                    
                }
            }
        }
    }
  camera.rotateY(0.01);
	renderer.render( scene, camera );
}

update();