"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ALGIERS = { lon: 3.06, lat: 36.75 };

function NightEarth() {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const canvas = canvasRef.current;
    if (!mount || !canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d0f);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.z = 3.4;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const texture = new THREE.TextureLoader().load("/textures/earth_night.png");

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 72, 72),
      new THREE.MeshBasicMaterial({ map: texture })
    );

    const latRad = THREE.MathUtils.degToRad(ALGIERS.lat);
    const lonRad = THREE.MathUtils.degToRad(ALGIERS.lon);
    const markerNormal = new THREE.Vector3(
      Math.cos(latRad) * Math.cos(lonRad),
      Math.sin(latRad),
      -Math.cos(latRad) * Math.sin(lonRad)
    ).normalize();
    const group = new THREE.Group();
    group.quaternion.setFromUnitVectors(markerNormal, new THREE.Vector3(0, 0, 1));
    group.add(globe);
    scene.add(group);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.015, 48, 48),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
            gl_FragColor = vec4(0.28, 0.64, 1.0, 1.0) * intensity;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      })
    );
    group.add(atmosphere);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.62, 0.78, 48),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    ring.position.set(markerNormal.x, markerNormal.y, markerNormal.z);
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), markerNormal);
    group.add(ring);

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.02, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x7dd3fc })
    );
    marker.position.set(markerNormal.x, markerNormal.y, markerNormal.z);
    group.add(marker);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
      })
    );
    halo.position.set(markerNormal.x, markerNormal.y, markerNormal.z);
    group.add(halo);

    const resize = () => {
      const width = mount.clientWidth || 480;
      renderer.setSize(width, width, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const render = () => renderer.render(scene, camera);
    renderer.setAnimationLoop(render);

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      renderer.dispose();
      globe.geometry.dispose();
      (globe.material as THREE.Material).dispose();
      atmosphere.geometry.dispose();
      (atmosphere.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      marker.geometry.dispose();
      (marker.material as THREE.Material).dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="mx-auto mt-14 w-full max-w-xl">
      <canvas ref={canvasRef} className="block aspect-square h-auto w-full" aria-label="كرة أرضية حقيقية ليلية في مركزها الجزائر" />
    </div>
  );
}

export default function WorldMap() {
  return (
    <section
      id="delivery"
      className="border-t border-white/10 bg-[#0d0d0f] py-20 sm:py-24"
    >
      <div className="shell-container">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              نصل إليك أينما كنت في العالم
            </h2>
          </div>
          <p className="mt-5 text-base leading-7 text-slate-400">
            نطوّر مشاريعك البرمجية ونُسلّمها من الجزائر إلى أي مكان في العالم،
            بعمل عن بُعد كامل ومتابعة ودعم مستمر بعد التسليم.
          </p>
        </div>

        <NightEarth />

        <div dir="ltr" className="mx-auto mt-6 flex max-w-2xl items-stretch divide-x divide-white/10">
          <span className="flex-1 px-4 py-2 text-center font-mono text-xs text-slate-500">
            36.75&deg; N, 3.06&deg; E
          </span>
          <span className="flex-1 px-4 py-2 text-center text-xs text-slate-400">
            مقرّنا: الجزائر
          </span>
          <span className="flex-1 px-4 py-2 text-center text-xs text-slate-400">
            تطوير وتسليم المشاريع
          </span>
        </div>
      </div>
    </section>
  );
}
