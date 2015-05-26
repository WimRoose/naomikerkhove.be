function init() {
        
        
        var scene = new THREE.Scene();
        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(50, 600/480, 1, 1000);
        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0xFAFAFA, 1.0)); //=achtergrondkleur
	//webGLRenderer.setClearColor(new THREE.Color(0xFFFFFF, 1.0));
        webGLRenderer.setSize(600,480);
        //webGLRenderer.shadowMapEnabled = true;

        var sphere = createMesh(new THREE.SphereGeometry(11, 200, 200), "world2.jpg");
        scene.add(sphere);
        // position and point the camera to the center of the scene
        camera.position.x = 00;
        camera.position.y = 00;
        camera.position.z = 28;
        
        var clock = new THREE.Clock();
        
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        var ambiLight = new THREE.AmbientLight(0x505050  );  // grootte van de lichtbron. FFFFFF=ganse bol
        scene.add(ambiLight);
     //   var quaternion = new THREE.Quaternion();
//quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );

//var vector = new THREE.Vector3( 1, 0, 0 );
//vector.applyQuaternion( quaternion );

        /// LIGHT ///
        //var light = new THREE.DirectionalLight();
        //light.position.set(0, 30, 20);
        //scene.add(light);

        light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
		light.position.set(4000, 4000, 1500);
		light.target.position.set (1000, 3800, 1000);
		scene.add(light);

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
        var orbitControls = new THREE.OrbitControls(camera, webGLRenderer.domElement); // renderer.domElement zorgt ervoor dat mouse events enkel gelden binnen webgl canvas
        orbitControls.autoRotate = false;
        step=0;
        //var rect = document.getElementById("WebGL-output").getBoundingClientRect();
		//console.log(rect.top, rect.right, rect.bottom, rect.left);
        render();
        webGLRenderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
        
        function createMesh(geom, imageFile) {
            var texture = THREE.ImageUtils.loadTexture(imageFile);
            texture.flipY = true;
            var mat = new THREE.MeshPhongMaterial();
            mat.map = texture;
            var mesh = new THREE.Mesh(geom, mat);
            return mesh;
        }
        
        function render() {
            
            var delta = clock.getDelta();
            orbitControls.update(delta);
           step=step+0.004;
            sphere.rotation.y = step;
            sphere.rotation.x = 50;
	//console.log(sphere.rotation.x);
            // render using requestAnimationFrame
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }
        
}
function onDocumentMouseDown( event ) {

                event.preventDefault();

                var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
                projector.unprojectVector( vector, camera );

                var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

                var intersects = ray.intersectObjects( objects );

                if ( intersects.length > 0 ) {

                    intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

                    var particle = new THREE.Particle( particleMaterial );
                    particle.position = intersects[ 0 ].point;
                    particle.scale.x = particle.scale.y = 8;
                    scene.add( particle );

                }

                /*
                // Parse all the faces
                for ( var i in intersects ) {

                    intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

                }
                */
            }
 //   window.onload = init;
