import React, { useEffect, useMemo, useRef } from 'react';
import { MeshProps, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF, useTexture } from '@react-three/drei';

const GLTF: React.FC = () => {
  const size = 20;

  const { nodes, materials } = useGLTF('assets/3D/Wall/scene.gltf');
  const gltf = useGLTF('assets/3D/Wall/scene.gltf');

  const texture = useTexture('assets/3D/Wall/Textures/White_Wall.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(size, size);

  const mormalMap = useTexture('assets/3D/Wall/Textures/White_Wall_NORMAL.jpg');
  mormalMap.wrapS = THREE.RepeatWrapping;
  mormalMap.wrapT = THREE.RepeatWrapping;
  mormalMap.repeat.set(size, size);

  const mesh = useMemo(() => {
    const node = nodes.Cube002 as THREE.Mesh;
    node.castShadow = true;
    node.receiveShadow = true;
    return node;
  }, [nodes]);

  const material = useMemo(() => {
    const m = materials[''] as THREE.MeshStandardMaterial;
    m.side = THREE.DoubleSide;
    m.normalMap = mormalMap;
    m.map = texture;
    // m.color = new THREE.Color(0xffffff);
    // m.metalness = 0;
    // m.roughness = 1;
    return m;
  }, [materials, mormalMap, texture]);

  return (
    <mesh
      position={[0, 0, -25]}
      material={material}
      geometry={mesh.geometry}
      dispose={null}
    />
  );
};

export default GLTF;
