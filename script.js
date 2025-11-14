document.addEventListener('DOMContentLoaded', function() {
    const shapeContainer = document.getElementById('shapeContainer');
    const shape = document.getElementById('shape');
    const controlBtns = document.querySelectorAll('.control-btn');
    let currentShape = 'cube';
    let rotationX = 0;
    let rotationY = 0;
    let autoRotate = true;
		let isMouseDown = false;
		let lastMouseX = 0;
    let lastMouseY = 0;
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const shapeType = this.getAttribute('data-shape');
            if (shapeType === currentShape) return;
            controlBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            applyShapeTransform(shapeType);
            currentShape = shapeType;
        });
    });
    function applyShapeTransform(shapeType) {
        shape.classList.remove('cube', 'sphere');
        setTimeout(() => {
            shape.classList.add(shapeType);
        }, 10);
    };
		function updateRotation () {
			shapeContainer.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
		}
		function rotateScene() {
			if(autoRotate) {
				rotationX += .2;
				rotationY += .3;
				updateRotation();
			}
			requestAnimationFrame(rotateScene);
		}
		rotateScene();

		//mouse

		shapeContainer.addEventListener('mousedown', function(event) {
			isMouseDown = true;
			lastMouseX = event.clientX;
			lastMouseY = event.clientY;
			autoRotate = false;
		});

		shapeContainer.addEventListener('mousemove', function(event) {
			if (!isMouseDown) return;
			const deltaX = event.clientX - lastMouseX;
			const deltaY = event.clientY - lastMouseY;
			rotationY += deltaX * .5;
			rotationX += deltaY * .5;
			updateRotation();
			lastMouseX = event.clientX;
			lastMouseY = event.clientY;
		});

		document.addEventListener('mouseup', function() {
			isMouseDown =  false;
 			setTimeout(() => {
				if (!isMouseDown) autoRotate = true;
			}, 1000);
		});

		//mobile
			shapeContainer.addEventListener('touchstart', function(event) {
			isMouseDown = true;
			lastMouseX = event.touches[0].clientX;
			lastMouseY = event.touches[0].clientY;
			autoRotate = false;
			event.preventDefault();
		});

		shapeContainer.addEventListener('touchmove', function(event) {
			if (!isMouseDown) return;
			const deltaX = event.touches[0].clientX - lastMouseX;
			const deltaY = event.touches[0].clientY - lastMouseY;
			rotationY += deltaX * .5;
			rotationX += deltaY * .5;
			updateRotation();
			lastMouseX = event.touches[0].clientX;
			lastMouseY = event.touches[0].clientY;
		});

				document.addEventListener('touched', function() {
			isMouseDown =  false;
 			setTimeout(() => {
				if (!isMouseDown) autoRotate = true;
			}, 1000);
		});


});