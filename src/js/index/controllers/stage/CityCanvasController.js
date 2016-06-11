//import stage from '../../models/stage/stage';
import {
	$cityCanvas,
} from '../../models/stage/dom';

let radius = 145;

export default class CityCanvasController {
	constructor() {
	}
	
	init() {
		//-------------------------------------------------
		// Scene
		this.scene = new THREE.Scene();
		this.scene.autoUpdate = false;
		this.scene.fog = new THREE.Fog(0xffffff, 100, 1200);
		
		// Camera
		this.camera = new THREE.PerspectiveCamera(45, $cityCanvas.width() / $cityCanvas.height(), 1, 1000);
		this.camera.position.set(radius/1.5, radius/2.5, radius);
		this.camera.lookAt(this.scene.position);
		
		// Renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize($cityCanvas.width(), $cityCanvas.height());
		$cityCanvas.append(this.renderer.domElement);
		
		// Trackball
		//this.trackball = new THREE.TrackballControls(this.camera, $cityCanvas.get(0));
		//this.trackball.staticMoving = true;
		
		// Directional light
		this.directionalLight = new THREE.DirectionalLight(0xffffff);
		this.directionalLight.position.set(0, 100, 20);
		this.directionalLight.castShadow = true;
		this.scene.add(this.directionalLight);
		
		// Ambient light
		this.ambientLight = new THREE.AmbientLight(0x999999);
		this.scene.add(this.ambientLight);
		
		// Axis helper
		this.axisHelper = new THREE.AxisHelper(500);
		this.scene.add(this.axisHelper);
		
		// Grid helper
		this.gridHelper = new THREE.GridHelper(500, 5);
		this.scene.add(this.gridHelper);
		
		// Call render at first
		this.render();
	}
	
	/**
	 *
	 */
	render() {
		// this.trackball.update();
		this.scene.updateMatrixWorld();
		this.renderer.render(this.scene, this.camera);
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
