import stage from '../../models/stage/stage';
import StageController from '../stage/StageController';

export default class AppController {
	/**
	 * Setup application
	 */
	setup() {
		// Create stage controller
		stage.controller = new StageController();
		
		// Register init callback of Google maps
		window.initMap = () => {
			stage.mapController.init();
		};
		
		// Register window resize event handler
		$(window).on('resize', this.onResize);
		
		// Call onResize at first
		this.onResize();
		
		// Initialize city canvas
		stage.cityCanvasController.init();
		
		// Initialize building canvas
		stage.buildingCanvasController.init();
	}
	
	/**
	 * Window resize event hanlder
	 */
	onResize() {
		let $window = $(window);
		
		// Stage size
		let width = $window.width();
		let height = $window.height();
		
		// Resize stage
		stage.controller.resizeStage(width, height);
	}
};
