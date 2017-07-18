const BOTTOMLIMIT = boardHeight/2 - 80;

/*------------------------------------ALIEN/MONSTER------------------------------*/
class Alien extends SpaceObject {
	
	constructor(scene,x,y,z){
		'use strict';
		
		super(scene);
		this.material = new THREE.MeshBasicMaterial({ color: 2600544, wireframe: true });
		this.claw_material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
		
		this.addAlienBody(0, 0, -7);
		this.addAlienSupport(8, 0, -2);
		this.addAlienSupport(-8, 0, -2);
		this.addAlienArm(13, 0, -2);
		this.addAlienArm(-13, 0, -2);
		this.addAlienClaw(13, 0, 8);
		this.addAlienClaw(-13, 0, 8);
		
		this.radius = 17;
		//this.addSphere(this.radius);
		
		this.setSpeed(Math.random()*Math.PI*2, 20);

		this.setPosition(x,y,z);
	}
	
	toggleWireframe() {
		this.material.wireframe = !this.material.wireframe;
		this.claw_material.wireframe = !this.claw_material.wireframe;
	}
	
	addAlienBody(x, y, z){
		'use strict';
		var geometry = new THREE.SphereGeometry(8/*, 30, 60*/);
		var mesh = new THREE.Mesh(geometry, this.material);
		mesh.position.set(x, y, z);
		this.add(mesh);
	}
		
	addAlienSupport(x, y, z){
		var geometry = new THREE.CubeGeometry(4,2,2);
		var mesh = new THREE.Mesh(geometry, this.material);
		mesh.position.set(x,y,z);
		this.add(mesh);
	}

	addAlienArm(x, y, z){
		'use strict';
		var geometry = new THREE.CylinderGeometry(3,3,10 /*,60*/);
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 3*(Math.PI/2)) );
		var mesh = new THREE.Mesh(geometry, this.material);
		mesh.position.set(x, y, z);
		this.add(mesh);
	}
	
	addAlienClaw(x, y, z){
		'use strict';

		var geometry = new THREE.CylinderGeometry(0,2,10/*,40*/);
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI/2) );
		var mesh = new THREE.Mesh(geometry, this.claw_material);
		mesh.position.set(x, y, z);
		this.add(mesh);
	}
	
	update(deltatime) {
		//Collision with boarders
		if(this.getPositionX()-this.getRadius() <= -boardWidth/2 || this.getPositionX()+this.getRadius() >= boardWidth/2) {
			this.setSpeed(Math.PI - this.getSpeedDirectionX0Z(), this.getSpeed());
			this.getBackToLastPosition();
		}
		else if(this.getPositionZ()+this.getRadius() >= BOTTOMLIMIT || this.getPositionZ()-this.getRadius() <= -boardHeight/2) {
			this.setSpeed(-this.getSpeedDirectionX0Z(), this.getSpeed());
			this.getBackToLastPosition();
		}		
		
		super.update(deltatime);
	}
}