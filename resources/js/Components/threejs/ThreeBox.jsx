import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBox = () => {
  const rendererRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1000/ 500, 0.1, 1005);


    // Verifica si ya existe un renderizador
    if (!rendererRef.current) {
      var renderer = new THREE.WebGLRenderer({ alpha: true });

      // Obtén las dimensiones del div printer-model
      const printerModelElement = document.getElementById('printer-model');
      //const width = printerModelElement.clientWidth;
      //const height = printerModelElement.clientHeight;


      // Establecer el nuevo tamaño
      renderer.setSize(200, 100);

      onWindowResize();

      // Asegúrate de que el elemento exista antes de intentar adjuntar el renderizador
      if (printerModelElement) {
        printerModelElement.appendChild(renderer.domElement);
      }

      // Guarda el renderizador en useRef para futuras referencias
      rendererRef.current = renderer;

      
    }

    // Configuración del cubo con un material transparente y bordes blancos
    const cubeSize = 2; // Tamaño del cubo
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Usa MeshToonMaterial para obtener bordes
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x000000, // Color interno (negro en este caso, puedes cambiarlo según tus necesidades)
      transparent: true,
      opacity: 0.5, // Ajusta la opacidad (0 completamente transparente, 1 completamente opaco)
      metalness: 0, // Sin metalness
      roughness: 0.5, // Ajusta la rugosidad según tus preferencias
      clearcoat: 1, // Capa transparente
      clearcoatRoughness: 0.1, // Rugosidad de la capa transparente
    });

    const cube = new THREE.Mesh(geometry, material);

    // Centra el cubo en el escenario
    const edgeGeometry = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

    // Centra el cubo y los bordes en el escenario
    cube.position.set(0, 0, 0);
    edges.position.set(0, 0, 0);

    scene.add(cube);
    scene.add(edges);

    // Configuración de la cámara y la luz
    camera.position.z = 5;


    // Función de animación
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;

      edges.rotation.x += 0.001;
      edges.rotation.y += 0.001;

      // Usa el renderizador almacenado en useRef
      rendererRef.current.render(scene, camera);
    }

    animate();

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    // Limpiar al desmontar el componente
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose(); // Limpia los recursos del renderizador
      }
    };
  }, []);

  return <div className="flex self-center justify-center w-[500px] h-[850px] -z-1" id="printer-model" />;
};

export default ThreeBox;