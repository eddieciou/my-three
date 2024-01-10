import * as Three from 'three';
// 導入軌道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useEffect } from 'react';

const App = () => {
	useEffect(() => {
		// 創建場景
		const scene = new Three.Scene();

		// 創建相機
		const camera = new Three.PerspectiveCamera(
			45, // 視角
			window.innerWidth / window.innerHeight, // 寬高比
			0.1, // 近平面
			1000, //	遠平面
		);

		// 創建渲染器
		const renderer = new Three.WebGL1Renderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// 創建幾何體
		const geometry = new Three.BoxGeometry(1, 1, 1);
		// 創建材質
		const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
		// 創建網格
		const cube = new Three.Mesh(geometry, material);
		scene.add(cube);

		// 設定相機位置
		camera.position.z = 5;
		camera.position.y = 2;
		camera.position.x = 2;
		camera.lookAt(0, 0, 0);

		// 添加世界座標輔助器
		const axesHelper = new Three.AxesHelper(5);
		scene.add(axesHelper);

		// 添加軌道控制器
		const controls = new OrbitControls(camera, renderer.domElement);
		// 軌道控制器添加慣性
		controls.enableDamping = true;

		// 渲染函數
		const animate = () => {
			controls.update();
			requestAnimationFrame(animate);
			// cube.rotation.x += 0.01;
			// cube.rotation.y += 0.01;

			// 渲染
			renderer.render(scene, camera);
		};

		animate();
	}, []);

	return <div></div>;
};

export default App;
