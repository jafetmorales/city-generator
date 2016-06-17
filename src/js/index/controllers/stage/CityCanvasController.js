import stage from '../../models/stage/stage';
//import cities from '../../models/stage/cities';
import {
	$cityCanvas,
} from '../../models/stage/dom';
//import GridHelper from '../../models/stage/GridHelper';
import deviceUtil from '../../utils/deviceUtil';

let radius = 145;
let cameraHeight = 80;
let theta = 0;

export default class CityCanvasController {
	constructor() {
	}
	
	init() {
		// Renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize($cityCanvas.width(), $cityCanvas.height());
		this.renderer.setPixelRatio(deviceUtil.getPixelRatio());
		$cityCanvas.append(this.renderer.domElement);
		
		// Generate EnvMap
		let envMapUrls = [];
		envMapUrls.push('assets/img/env/top-right.png');  // left is left
		envMapUrls.push('assets/img/env/top-right.png');  // right is right
		envMapUrls.push('assets/img/env/bottom-right.png');  // top is back
		envMapUrls.push('assets/img/env/black.png');  // bottom is front
		envMapUrls.push('assets/img/env/black.png');  // back is bottom
		envMapUrls.push('assets/img/env/black.png');  // front is top
		this.envMap = THREE.ImageUtils.loadTextureCube(envMapUrls);
		
		// Build scene
		//this.rebuild();
	}
	
	rebuild(city) {
		//-------------------------------------------------
		// Save the city
		this.city = city;
		
		//-------------------------------------------------
		// Scene
		if (this.scene) {
			delete this.scene;
		}
		this.scene = new THREE.Scene();
		this.scene.autoUpdate = false;
		this.scene.fog = new THREE.Fog(0xffffff, 10, 500);
		
		// Camera
		if (this.camera) {
			delete this.camera;
		}
		this.camera = new THREE.PerspectiveCamera(45, $cityCanvas.width() / $cityCanvas.height(), 1, 1000);
		this.camera.position.set(0, -radius, cameraHeight);
		this.camera.lookAt(this.scene.position);
		
		//-------------------------------------------------
		// Trackball
		if (this.trackball) {
			delete this.trackball;
		}
		this.trackball = new THREE.TrackballControls(this.camera, $cityCanvas.get(0));
		this.trackball.staticMoving = true;
		
		//-------------------------------------------------
		// Directional light
		if (this.directionalLight) {
			delete this.directionalLight;
		}
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		//this.directionalLight.position.set(8, 10, 20);
		this.directionalLight.position.set(-80, 100, 200);
		//this.directionalLight.castShadow = true;
		this.scene.add(this.directionalLight);
		
		// Ambient light
		if (this.ambientLight) {
			delete this.ambientLight;
		}
		//this.ambientLight = new THREE.AmbientLight(0x999999);
		this.ambientLight = new THREE.AmbientLight(0xffffff);
		this.scene.add(this.ambientLight);
		
		//-------------------------------------------------
		// Axis helper
		/*
		if (this.axisHelper) {
			delete this.axisHelper;
		}
		this.axisHelper = new THREE.AxisHelper(500);
		this.scene.add(this.axisHelper);
		//*/
		
		// Grid helper
		/*
		if (this.gridHelper) {
			delete this.gridHelper;
		}
		if (this.city) {
			this.gridHelper = new GridHelper(this.city.bounds.end.x, this.city.bounds.end.y, 2);
		} else {
			this.gridHelper = new GridHelper(100, 100, 2);
		}
		this.scene.add(this.gridHelper);
		//*/
		
		// Directional Light Helper
		/*
		this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);
		this.scene.add(this.directionalLightHelper);
		*/
		
		//-------------------------------------------------
		// Call render at first
		this.render();
		
		// Start animation
		//this.animate();
	}
	
	/**
	 *
	 */
	render() {
		let self = stage.cityCanvasController;
		
		// Control
		self.trackball.update();
		
		// Render
		self.scene.updateMatrixWorld();
		self.renderer.render(self.scene, self.camera);
	}
	
	/**
	 *
	 */
	animate() {
		let self = stage.cityCanvasController;
		
		theta += 0.01;
		console.log(theta);
		
		for (let type in self.city.meshes) {
			let intensity = Math.cos(theta + parseInt(type) * 1.5) * 0.8;
			if (intensity < 0) {
				intensity = 0;
			}
			self.city.meshes[type].material.emissiveIntensity = intensity;
		}
		
		self.render();
		
		if (!self.stopAnimationSignal) {
			self.requestId = requestAnimationFrame(self.animate);
		}
	}
	
	/**
	 *
	 */
	stopAnimation() {
		let self = stage.cityCanvasController;
		
		if (self.requestId) {
			cancelAnimationFrame(self.requestId);
		}
	}
	
	/**
	 *
	 */
	resize(width, height) {
		if (this.camera && this.renderer) {
			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(width, height);
		}
	}
}
