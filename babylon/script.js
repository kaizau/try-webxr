const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

async function createScene() {
  const scene = new BABYLON.Scene(engine);

  // Set up camera
  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  // Set up lighting
  const light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  // Create geometry
  const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
  sphere.position.y = 1;

  const env = scene.createDefaultEnvironment();

  // Init Web XR helper
  const xr = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [env.ground],
  });

  // Init render loop
  engine.runRenderLoop(function onRender() {
    scene.render();
  });

  return scene;
}

createScene();

window.addEventListener("resize", function onResize() {
  engine.resize();
});
