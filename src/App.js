import './App.scss';
import {useRef,useState,useEffect} from 'react';
import {Canvas , useFrame,useThree} from 'react-three-fiber';
import {useSpring,a} from 'react-spring/three';
import {softShadows} from '@react-three/drei';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

softShadows();

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};


const Mesh = ({pos,color,args})=> {
  const mesh = useRef(null)
  console.log(mesh)
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand,setExpand] = useState(false)
  const props = useSpring({scale : expand ? [1.5,1.5,1.5] : [1,1,1] , rotation : expand ? [3,3,3] : [1,1,1] })

    return(
      <a.mesh onClick={() => {setExpand(!expand)}} rotation={props.rotation} scale={props.scale} castShadow position={pos} ref={mesh}>
        <boxBufferGeometry attach="geometry" args={args} />
        <meshStandardMaterial attach="material" color={color} />
      </a.mesh>);
}

function App() {

  return (
    <>
    <Canvas shadowMap colorManagement camera={{position:[-5,5,12], fov:30}}>
      <ambientLight intensity={0.2} />


      <directionalLight castShadow position={[0,10,0]} 
      intensity={1} 
      shadow-mapSize-width={1024} 
      shadow-mapSize-height={1024} 
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      />


      <pointLight position={[-10,0,-20]} intensity={0.6} />

      <group>
        <mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0,-3,0]} > 
          <planeBufferGeometry attach='geometry' args={[100,100]} />
          <shadowMaterial attach="material" opacity={0.5} />
        </mesh>
      </group>

      <Mesh pos={[0,1,0]} color="lightred" args={[3,2,1]} />
      <Mesh pos={[-2,1,-5]} color="lightblue" />
      <Mesh pos={[5,1,-2]} color="lightgreen" />
      <CameraController />
    </Canvas>
    </>
  );
}

export default App;
