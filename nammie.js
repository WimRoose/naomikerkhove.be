function init() {
        
        var sphere;
        var sphereGeometry;
        var camera;
        var width = 600;
        var height = 480;
        var facebook = [372,373,374,375,376,377,310,311,312,313,436,437,438,439];
        var instagram = [600,601,602,603,605,666,667,668,669,730,731];
        var contact = [966,967,969,1031,1030,1033,1092,1094,1097];
        var calendar = [742,679,678,681,680,743,745,744,806,808,809,811,870,872,934,873,875];
        var scene = new THREE.Scene();
        var clock = new THREE.Clock();
        var rect = document.getElementById("WebGL-output").getBoundingClientRect();
        width = rect.width;
        height = 480;
        var offset_x_left = rect.left;
        var offset_x_right = rect.right;
        var offset_y_top = rect.top;
        //var offset_y_left = rect.right;
        //console.log(document.getElementById("WebGL-output").getBoundingClientRect());
        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000);
        // position and point the camera to the center of the scene
        camera.position.x = 0; // midden
        camera.position.y = 0; // midden
        camera.position.z = 28;
        camera.lookAt(scene.position);
        
        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        var raycaster = new THREE.Raycaster();
        webGLRenderer.setClearColor(new THREE.Color(0xFAFAFA, 1.0)); //=achtergrondkleur
        
	    webGLRenderer.setSize(width,height);

        //webGLRenderer.shadowMapEnabled = true;
        sphereGeometry = new THREE.SphereGeometry(11, 32, 32);
        sphere = createMesh(sphereGeometry, "2048x1024.png");
        scene.add(sphere);

        
        spotLight = new THREE.SpotLight(0xFFFFFF, 0.5);
        spotLight.position.set(20, 80, 30);
        spotLight.castShadow = true;
        spotLight.angle = 0.15;
        spotLight.distance = 160;
        scene.add(spotLight);

        //var ambiLight = new THREE.AmbientLight(0x505050  );  // grootte van de lichtbron. FFFFFF=ganse bol
        var ambiLight = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambiLight);
        
        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
        var orbitControls = new THREE.OrbitControls(camera, webGLRenderer.domElement); // renderer.domElement zorgt ervoor dat mouse events enkel gelden binnen webgl canvas
        orbitControls.autoRotate = true;
        //step=0;
      
        render();
        webGLRenderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
                
        console.log(document.getElementById("WebGL-output").window.innerWidth);
	console.log(window.innerHeight);
        function createMesh(geom, imageFile) {
            var texture = THREE.ImageUtils.loadTexture(imageFile);
            texture.flipY = true;
            //var mat = new THREE.MeshPhongMaterial({vertexColors: THREE.VertexColors});  // vertexcolor in contstructor nodig om faces een kleur te geven!
            var mat = new THREE.MeshPhongMaterial();
            mat.map = texture;
            var mesh = new THREE.Mesh(geom,mat);
            return mesh;
        }
        
        function render() {
            
            var delta = clock.getDelta();
            orbitControls.update(delta);
            //if (ROTATE) {
                //step=step+0.004;
            //}

            webGLRenderer.render(scene, camera);
            //sphere.rotation.y = step;
            //spotLight.target = sphere2;
            //sphere.rotation.x = 50;
            requestAnimationFrame(render);
            
        }
        function onDocumentMouseDown( event ) {

            /*
            console.log(spotLight.position.x);
            console.log(spotLight.position.y);
            console.log(spotLight.position.z);
            
            */

        }
        function onDocumentMouseDownInstagram( event ) {

            webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownInstagram, false );
            window.open("https://instagram.com/naomikerkhove/",'_blank');
                        
        }
        function onDocumentMouseDownFacebook( event ) {

            webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownFacebook, false );
            window.open("https://www.facebook.com/pages/Naomi-Kerkhove/1620440741511353?ref=aymt_homepage_panel",'_blank');
                        
        }
        function onDocumentMouseDownContact( event ) {

            webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownContact, false );
            window.open("http://naomikerkhove.be/contact/", '_self');
                        
        }
        function onDocumentMouseDownCalendar( event ) {

            webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownCalendar, false );
            window.open("https://www.facebook.com/pages/Naomi-Kerkhove/1620440741511353?sk=events",'_blank');
                        
        }

        function onDocumentMouseMove( event ) {

                event.preventDefault();
                var mouse = new THREE.Vector2();
                
                // TO DO: automatisch offset voor clientX en Y achterhalen                
                mouse.x = ((event.clientX - offset_x_left) / width) * 2 - 1;
                mouse.y = - ( (event.clientY - offset_y_top) / height ) * 2 + 1; 

                //console.log(mouse.x);
                //console.log(event.clientX);
                //console.log("ClientY: " + event.clientY);
                //console.log("MouseY: " + mouse.y);
                                
                
                raycaster.setFromCamera( mouse, camera );
                var intersects = raycaster.intersectObjects( scene.children );
                
                // MAPPING: Y = (X-A)/(B-A) * (D-C) + C
                if ( intersects.length > 0 ) {

                        
                        //console.log(intersects[0].faceIndex);

                    if (instagram.indexOf(intersects[0].faceIndex) > -1) {

                        spotLight.position.set(-22.5,15,-11.38);
                        webGLRenderer.domElement.addEventListener( 'mousedown', onDocumentMouseDownInstagram, false );

                    } else if (facebook.indexOf(intersects[0].faceIndex) > -1){

                        spotLight.position.set(16.19,30.38,15.45);
                        webGLRenderer.domElement.addEventListener( 'mousedown', onDocumentMouseDownFacebook, false );

                    } else if (contact.indexOf(intersects[0].faceIndex) > -1){

                        spotLight.position.set(21.16,-1.47,-18.27);
                        webGLRenderer.domElement.addEventListener( 'mousedown', onDocumentMouseDownContact, false );

                    } else if (calendar.indexOf(intersects[0].faceIndex) > -1){

                        spotLight.position.set(-17.82,7.6,20.21);
                        webGLRenderer.domElement.addEventListener( 'mousedown', onDocumentMouseDownCalendar, false ); 

                    } else {
                        webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownInstagram, false );
                        webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownFacebook, false );
                        webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownContact, false );
                        webGLRenderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDownCalendar, false );
                        spotLight.position.set(20,80,30);
                        
                    }
                        
                    
                }
                    

                
                
        }

                
}

 //   window.onload = init;
