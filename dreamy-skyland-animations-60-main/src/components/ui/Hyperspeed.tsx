
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';

import './Hyperspeed.css';

// Define types for our classes to make TypeScript happy
interface HyperspeedOptions {
  onSpeedUp?: (ev: MouseEvent) => void;
  onSlowDown?: (ev: MouseEvent) => void;
  distortion: string | any;
  length: number;
  roadWidth: number;
  islandWidth: number;
  lanesPerRoad: number;
  fov: number;
  fovSpeedUp: number;
  speedUp: number;
  carLightsFade: number;
  totalSideLightSticks: number;
  lightPairsPerRoadWay: number;
  shoulderLinesWidthPercentage: number;
  brokenLinesWidthPercentage: number;
  brokenLinesLengthPercentage: number;
  lightStickWidth: number[];
  lightStickHeight: number[];
  movingAwaySpeed: number[];
  movingCloserSpeed: number[];
  carLightsLength: number[];
  carLightsRadius: number[];
  carWidthPercentage: number[];
  carShiftX: number[];
  carFloorSeparation: number[];
  colors: {
    roadColor: number;
    islandColor: number;
    background: number;
    shoulderLines: number;
    brokenLines: number;
    leftCars: number | number[];
    rightCars: number | number[];
    sticks: number | number[];
  };
  isHyper?: boolean;
}

// Export presets for reuse
export const hyperspeedPresets = {
  one: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  },
  two: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'mountainDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff102a, 0xEB383E, 0xff102a],
      rightCars: [0xdadafa, 0xBEBAE3, 0x8F97E4],
      sticks: 0xdadafa,
    }
  },
  three: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'xyDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 3,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 30,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.02, 0.05],
    lightStickHeight: [0.3, 0.7],
    movingAwaySpeed: [20, 50],
    movingCloserSpeed: [-150, -230],
    carLightsLength: [400 * 0.05, 400 * 0.2],
    carLightsRadius: [0.03, 0.08],
    carWidthPercentage: [0.1, 0.5],
    carShiftX: [-0.5, 0.5],
    carFloorSeparation: [0, 0.1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0x7D0D1B, 0xA90519, 0xff102a],
      rightCars: [0xF1EECE, 0xE6E2B1, 0xDFD98A],
      sticks: 0xF1EECE,
    }
  },
  four: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'LongRaceDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 5,
    lanesPerRoad: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 70,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xFF5F73, 0xE74D60, 0xff102a],
      rightCars: [0xA4E3E6, 0x80D1D4, 0x53C2C6],
      sticks: 0xA4E3E6,
    }
  },
  five: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xDC5B20, 0xDCA320, 0xDC2020],
      rightCars: [0x334BF7, 0xE5E6ED, 0xBFC6F3],
      sticks: 0xC5E8EB,
    }
  },
  six: {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'deepDistortion',
    length: 400,
    roadWidth: 18,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xFF322F, 0xA33010, 0xA81508],
      rightCars: [0xFDFDF0, 0xF3DEA0, 0xE2BB88],
      sticks: 0xFDFDF0,
    }
  }
};

interface HyperspeedProps {
  effectOptions?: HyperspeedOptions;
}

const Hyperspeed: React.FC<HyperspeedProps> = ({ 
  effectOptions = hyperspeedPresets.one 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bail out early if no container
    if (!containerRef.current) return;

    // Helper functions
    const random = (base: number | number[]) => {
      if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
      return Math.random() * base;
    };

    const pickRandom = (arr: any | any[]) => {
      if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
      return arr;
    };

    const lerp = (current: number, target: number, speed = 0.1, limit = 0.001) => {
      let change = (target - current) * speed;
      if (Math.abs(change) < limit) {
        change = target - current;
      }
      return change;
    };

    const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

    // Distortion uniforms
    const mountainUniforms = {
      uFreq: { value: new THREE.Vector3(3, 6, 10) },
      uAmp: { value: new THREE.Vector3(30, 30, 20) }
    };

    const xyUniforms = {
      uFreq: { value: new THREE.Vector2(5, 2) },
      uAmp: { value: new THREE.Vector2(25, 15) }
    };

    const LongRaceUniforms = {
      uFreq: { value: new THREE.Vector2(2, 3) },
      uAmp: { value: new THREE.Vector2(35, 10) }
    };

    const turbulentUniforms = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
    };

    const deepUniforms = {
      uFreq: { value: new THREE.Vector2(4, 8) },
      uAmp: { value: new THREE.Vector2(10, 20) },
      uPowY: { value: new THREE.Vector2(20, 2) }
    };

    // Distortion functions
    const distortions: Record<string, any> = {
      mountainDistortion: {
        uniforms: mountainUniforms,
        getDistortion: `
          uniform vec3 uAmp;
          uniform vec3 uFreq;
          #define PI 3.14159265358979
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
            );
          }
        `,
        getJS: (progress: number, time: number) => {
          let movementProgressFix = 0.02;
          let uFreq = mountainUniforms.uFreq.value;
          let uAmp = mountainUniforms.uAmp.value;
          let distortion = new THREE.Vector3(
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
            nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
            nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
            nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
            nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z
          );
          let lookAtAmp = new THREE.Vector3(2, 2, 2);
          let lookAtOffset = new THREE.Vector3(0, 0, -5);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      },
      xyDistortion: {
        uniforms: xyUniforms,
        getDistortion: `
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
              0.
            );
          }
        `,
        getJS: (progress: number, time: number) => {
          let movementProgressFix = 0.02;
          let uFreq = xyUniforms.uFreq.value;
          let uAmp = xyUniforms.uAmp.value;
          let distortion = new THREE.Vector3(
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
            Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -
            Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,
            0
          );
          let lookAtAmp = new THREE.Vector3(2, 0.4, 1);
          let lookAtOffset = new THREE.Vector3(0, 0, -3);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      },
      LongRaceDistortion: {
        uniforms: LongRaceUniforms,
        getDistortion: `
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float camProgress = 0.0125;
            return vec3( 
              sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,
              0.
            );
          }
        `,
        getJS: (progress: number, time: number) => {
          let camProgress = 0.0125;
          let uFreq = LongRaceUniforms.uFreq.value;
          let uAmp = LongRaceUniforms.uAmp.value;
          let distortion = new THREE.Vector3(
            Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,
            Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
            Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,
            0
          );
          let lookAtAmp = new THREE.Vector3(1, 1, 0);
          let lookAtOffset = new THREE.Vector3(0, 0, -5);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      },
      turbulentDistortion: {
        uniforms: turbulentUniforms,
        getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.0125),
              getDistortionY(progress) - getDistortionY(0.0125),
              0.
            );
          }
        `,
        getJS: (progress: number, time: number) => {
          const uFreq = turbulentUniforms.uFreq.value;
          const uAmp = turbulentUniforms.uAmp.value;

          const getX = (p: number) =>
            Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
            Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;

          const getY = (p: number) =>
            -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
            Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;

          let distortion = new THREE.Vector3(
            getX(progress) - getX(progress + 0.007),
            getY(progress) - getY(progress + 0.007),
            0
          );
          let lookAtAmp = new THREE.Vector3(-2, -5, 0);
          let lookAtOffset = new THREE.Vector3(0, 0, -10);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      },
      deepDistortion: {
        uniforms: deepUniforms,
        getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x + uTime) * uAmp.x
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `,
        getJS: (progress: number, time: number) => {
          const uFreq = deepUniforms.uFreq.value;
          const uAmp = deepUniforms.uAmp.value;
          const uPowY = deepUniforms.uPowY.value;

          const getX = (p: number) => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;
          const getY = (p: number) =>
            Math.pow(p * uPowY.x, uPowY.y) +
            Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;

          let distortion = new THREE.Vector3(
            getX(progress) - getX(progress + 0.01),
            getY(progress) - getY(progress + 0.01),
            0
          );
          let lookAtAmp = new THREE.Vector3(-2, -4, 0);
          let lookAtOffset = new THREE.Vector3(0, 0, -10);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      }
    };

    // Get the needed distortion
    const getDistortion = typeof effectOptions.distortion === 'string' 
      ? distortions[effectOptions.distortion] 
      : effectOptions.distortion;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      effectOptions.fov,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      10000
    );
    camera.position.z = -5;
    camera.position.y = 8;
    camera.position.x = 0;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true
    });
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight, false);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Setup fog
    const fog = new THREE.Fog(
      effectOptions.colors.background,
      effectOptions.length * 0.2,
      effectOptions.length * 500
    );
    scene.fog = fog;
    
    const fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far }
    };
    
    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new EffectPass(
      camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 1
      })
    );
    
    const smaaPass = new EffectPass(
      camera,
      new SMAAEffect({
        preset: SMAAPreset.MEDIUM
      })
    );
    
    renderPass.renderToScreen = false;
    bloomPass.renderToScreen = false;
    smaaPass.renderToScreen = true;
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(smaaPass);
    
    // Create shader materials
    const carLightsFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      varying vec3 vColor;
      varying vec2 vUv; 
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const carLightsVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv; 
      varying vec3 vColor; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;

        transformed.xy *= radius;
        transformed.z *= myLength;

        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const sideSticksVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) {
        return mat4(	cos(angle),		0,		sin(angle),	0,
                    0,		1.0,			 0,	0,
                -sin(angle),	0,		cos(angle),	0,
                0, 		0,				0,	1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;

        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);

        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

        transformed.z += - uTravelLength + time;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        transformed.y += height / 2.;
        transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const sideSticksFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      varying vec3 vColor;
      void main(){
        vec3 color = vec3(vColor);
        gl_FragColor = vec4(color,1.);
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const roadMarkings_vars = `
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
      highp float random(vec2 co) {
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt = dot(co.xy, vec2(a, b));
        highp float sn = mod(dt, 3.14);
        return fract(sin(sn) * c);
      }
    `;

    const roadMarkings_fragment = `
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes;
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;

      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);

      brokenLines = mix(brokenLines, sideLines, uv.x);
    `;

    const roadBaseFragment = `
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const roadVertex = `
      #define USE_FOG;
      uniform float uTime;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      uniform float uTravelLength;
      varying vec2 vUv; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;  
        
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const islandFragment = roadBaseFragment
      .replace("#include <roadMarkings_fragment>", "")
      .replace("#include <roadMarkings_vars>", "");

    const roadFragment = roadBaseFragment
      .replace("#include <roadMarkings_fragment>", roadMarkings_fragment)
      .replace("#include <roadMarkings_vars>", roadMarkings_vars);

    // Setup elements for the animation
    
    // 1. Car Lights
    class CarLights {
      webgl: any;
      options: any;
      colors: any;
      speed: any;
      fade: any;
      mesh: THREE.Mesh;

      constructor(webgl: any, options: any, colors: any, speed: any, fade: any) {
        this.webgl = webgl;
        this.options = options;
        this.colors = colors;
        this.speed = speed;
        this.fade = fade;
        this.mesh = new THREE.Mesh();
      }

      init() {
        const curve = new THREE.LineCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, -1)
        );
        
        const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        instanced.instanceCount = this.options.lightPairsPerRoadWay * 2;

        const laneWidth = this.options.roadWidth / this.options.lanesPerRoad;
        const aOffset = [];
        const aMetrics = [];
        const aColor = [];

        let colors = this.colors;
        if (Array.isArray(colors)) {
          colors = colors.map((c: number) => new THREE.Color(c));
        } else {
          colors = new THREE.Color(colors);
        }

        for (let i = 0; i < this.options.lightPairsPerRoadWay; i++) {
          const radius = random(this.options.carLightsRadius);
          const length = random(this.options.carLightsLength);
          const speed = random(this.speed);

          const carLane = i % this.options.lanesPerRoad;
          let laneX = carLane * laneWidth - this.options.roadWidth / 2 + laneWidth / 2;

          const carWidth = random(this.options.carWidthPercentage) * laneWidth;
          const carShiftX = random(this.options.carShiftX) * laneWidth;
          laneX += carShiftX;

          const offsetY = random(this.options.carFloorSeparation) + radius * 1.3;
          const offsetZ = -random(this.options.length);

          aOffset.push(laneX - carWidth / 2);
          aOffset.push(offsetY);
          aOffset.push(offsetZ);

          aOffset.push(laneX + carWidth / 2);
          aOffset.push(offsetY);
          aOffset.push(offsetZ);

          aMetrics.push(radius);
          aMetrics.push(length);
          aMetrics.push(speed);

          aMetrics.push(radius);
          aMetrics.push(length);
          aMetrics.push(speed);

          const color = pickRandom(colors);
          aColor.push(color.r);
          aColor.push(color.g);
          aColor.push(color.b);

          aColor.push(color.r);
          aColor.push(color.g);
          aColor.push(color.b);
        }

        instanced.setAttribute(
          "aOffset",
          new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false)
        );
        instanced.setAttribute(
          "aMetrics",
          new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false)
        );
        instanced.setAttribute(
          "aColor",
          new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
        );

        const material = new THREE.ShaderMaterial({
          fragmentShader: carLightsFragment,
          vertexShader: carLightsVertex.replace(
            "#include <getDistortion_vertex>", 
            getDistortion.getDistortion
          ),
          transparent: true,
          uniforms: Object.assign(
            {
              uTime: { value: 0 },
              uTravelLength: { value: this.options.length },
              uFade: { value: this.fade }
            },
            fogUniforms,
            getDistortion.uniforms
          )
        });

        this.mesh = new THREE.Mesh(instanced, material);
        this.mesh.frustumCulled = false;
        scene.add(this.mesh);
      }

      update(time: number) {
        if (this.mesh.material) {
          this.mesh.material.uniforms.uTime.value = time;
        }
      }
    }

    // 2. Light Sticks
    class LightsSticks {
      webgl: any;
      options: any;
      mesh: THREE.Mesh;

      constructor(webgl: any, options: any) {
        this.webgl = webgl;
        this.options = options;
        this.mesh = new THREE.Mesh();
      }

      init() {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry);
        const totalSticks = this.options.totalSideLightSticks;
        instanced.instanceCount = totalSticks;

        const stickoffset = this.options.length / (totalSticks - 1);
        const aOffset = [];
        const aColor = [];
        const aMetrics = [];

        let colors = this.options.colors.sticks;
        if (Array.isArray(colors)) {
          colors = colors.map((c: number) => new THREE.Color(c));
        } else {
          colors = new THREE.Color(colors);
        }

        for (let i = 0; i < totalSticks; i++) {
          const width = random(this.options.lightStickWidth);
          const height = random(this.options.lightStickHeight);
          aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());

          const color = pickRandom(colors);
          aColor.push(color.r);
          aColor.push(color.g);
          aColor.push(color.b);

          aMetrics.push(width);
          aMetrics.push(height);
        }

        instanced.setAttribute(
          "aOffset",
          new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false)
        );
        instanced.setAttribute(
          "aColor",
          new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false)
        );
        instanced.setAttribute(
          "aMetrics",
          new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false)
        );

        const material = new THREE.ShaderMaterial({
          fragmentShader: sideSticksFragment,
          vertexShader: sideSticksVertex.replace(
            "#include <getDistortion_vertex>", 
            getDistortion.getDistortion
          ),
          side: THREE.DoubleSide,
          uniforms: Object.assign(
            {
              uTravelLength: { value: this.options.length },
              uTime: { value: 0 }
            },
            fogUniforms,
            getDistortion.uniforms
          )
        });

        this.mesh = new THREE.Mesh(instanced, material);
        this.mesh.frustumCulled = false;
        scene.add(this.mesh);
      }

      update(time: number) {
        if (this.mesh.material) {
          this.mesh.material.uniforms.uTime.value = time;
        }
      }
    }

    // 3. Road
    class Road {
      webgl: any;
      options: any;
      uTime: { value: number };
      leftRoadWay: THREE.Mesh;
      rightRoadWay: THREE.Mesh;
      island: THREE.Mesh;

      constructor(webgl: any, options: any) {
        this.webgl = webgl;
        this.options = options;
        this.uTime = { value: 0 };
        this.leftRoadWay = new THREE.Mesh();
        this.rightRoadWay = new THREE.Mesh();
        this.island = new THREE.Mesh();
      }

      createPlane(side: number, width: number, isRoad: boolean) {
        const segments = 100;
        const geometry = new THREE.PlaneGeometry(
          isRoad ? this.options.roadWidth : this.options.islandWidth,
          this.options.length,
          20,
          segments
        );
        
        let uniforms = {
          uTravelLength: { value: this.options.length },
          uColor: { value: new THREE.Color(isRoad ? this.options.colors.roadColor : this.options.colors.islandColor) },
          uTime: this.uTime
        };

        if (isRoad) {
          uniforms = Object.assign(uniforms, {
            uLanes: { value: this.options.lanesPerRoad },
            uBrokenLinesColor: { value: new THREE.Color(this.options.colors.brokenLines) },
            uShoulderLinesColor: { value: new THREE.Color(this.options.colors.shoulderLines) },
            uShoulderLinesWidthPercentage: { value: this.options.shoulderLinesWidthPercentage },
            uBrokenLinesLengthPercentage: { value: this.options.brokenLinesLengthPercentage },
            uBrokenLinesWidthPercentage: { value: this.options.brokenLinesWidthPercentage }
          });
        }

        const material = new THREE.ShaderMaterial({
          fragmentShader: isRoad ? roadFragment : islandFragment,
          vertexShader: roadVertex.replace(
            "#include <getDistortion_vertex>", 
            getDistortion.getDistortion
          ),
          side: THREE.DoubleSide,
          uniforms: Object.assign(
            uniforms,
            fogUniforms,
            getDistortion.uniforms
          )
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -this.options.length / 2;
        mesh.position.x +=
          (this.options.islandWidth / 2 + this.options.roadWidth / 2) * side;
        scene.add(mesh);

        return mesh;
      }

      init() {
        this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true);
        this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true);
        this.island = this.createPlane(0, this.options.islandWidth, false);
      }

      update(time: number) {
        this.uTime.value = time;
      }
    }

    // Initialize class instances
    const clock = new THREE.Clock();
    let fovTarget = effectOptions.fov;
    let speedUpTarget = 0;
    let speedUp = 0;
    let timeOffset = 0;
    let disposed = false;

    // Setup road and lights
    const road = new Road({ scene, fogUniforms, options: effectOptions }, effectOptions);
    road.init();

    const leftCarLights = new CarLights(
      { scene, fogUniforms }, 
      effectOptions,
      effectOptions.colors.leftCars,
      effectOptions.movingAwaySpeed,
      new THREE.Vector2(0, 1 - effectOptions.carLightsFade)
    );
    leftCarLights.init();
    leftCarLights.mesh.position.setX(
      -effectOptions.roadWidth / 2 - effectOptions.islandWidth / 2
    );

    const rightCarLights = new CarLights(
      { scene, fogUniforms }, 
      effectOptions,
      effectOptions.colors.rightCars,
      effectOptions.movingCloserSpeed,
      new THREE.Vector2(1, 0 + effectOptions.carLightsFade)
    );
    rightCarLights.init();
    rightCarLights.mesh.position.setX(
      effectOptions.roadWidth / 2 + effectOptions.islandWidth / 2
    );

    const leftSticks = new LightsSticks({ scene, fogUniforms }, effectOptions);
    leftSticks.init();
    leftSticks.mesh.position.setX(
      -(effectOptions.roadWidth + effectOptions.islandWidth / 2)
    );

    // Mouse interactions
    const onMouseDown = (ev: MouseEvent) => {
      if (effectOptions.onSpeedUp) effectOptions.onSpeedUp(ev);
      fovTarget = effectOptions.fovSpeedUp;
      speedUpTarget = effectOptions.speedUp;
    };

    const onMouseUp = (ev: MouseEvent) => {
      if (effectOptions.onSlowDown) effectOptions.onSlowDown(ev);
      fovTarget = effectOptions.fov;
      speedUpTarget = 0;
    };

    containerRef.current.addEventListener("mousedown", onMouseDown);
    containerRef.current.addEventListener("mouseup", onMouseUp);
    containerRef.current.addEventListener("mouseout", onMouseUp);

    // Helper for responsive resizing
    const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    };

    // Animation loop
    const animate = () => {
      if (disposed || !containerRef.current) return;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      const delta = clock.getDelta();
      
      // Update speed
      let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
      speedUp += lerp(speedUp, speedUpTarget, lerpPercentage, 0.00001);
      timeOffset += speedUp * delta;

      let time = clock.elapsedTime + timeOffset;

      // Update each element
      rightCarLights.update(time);
      leftCarLights.update(time);
      leftSticks.update(time);
      road.update(time);

      // Update camera FOV
      let updateCamera = false;
      let fovChange = lerp(camera.fov, fovTarget, lerpPercentage);
      if (fovChange !== 0) {
        camera.fov += fovChange * delta * 6;
        updateCamera = true;
      }

      // Apply distortion to camera
      if (getDistortion.getJS) {
        const distortion = getDistortion.getJS(0.025, time);
        camera.lookAt(
          new THREE.Vector3(
            camera.position.x + distortion.x,
            camera.position.y + distortion.y,
            camera.position.z + distortion.z
          )
        );
        updateCamera = true;
      }

      if (updateCamera) {
        camera.updateProjectionMatrix();
      }

      // Render the scene
      composer.render(delta);
      
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup on unmount
    return () => {
      disposed = true;
      containerRef.current?.removeEventListener("mousedown", onMouseDown);
      containerRef.current?.removeEventListener("mouseup", onMouseUp);
      containerRef.current?.removeEventListener("mouseout", onMouseUp);
      
      // Clean up THREE.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      
      renderer.dispose();
      
      // Remove canvas
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [effectOptions]);

  return <div id="lights" ref={containerRef}></div>;
};

export default Hyperspeed;
