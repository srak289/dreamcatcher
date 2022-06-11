G = THREE;

const scene = new G.Scene();
const cam = new G.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 500 );

const renderer = new G.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// cam.position.z = 5;
cam.position.set( 0, 0, 100 );

cam.lookAt( 0, 0, 0 );

const controls = new G.OrbitControls( cam, renderer.domElement );

rand = (min,max) => {
    return Math.random()*(max-min) + min;
}

class Diamond {
    diamond(x) {
        const inner_points = [];

        inner_points.push( new G.Vector3( -1*x, 0, 0 ) ); 
        inner_points.push( new G.Vector3( 0, -1*x, 0 ) ); 
        inner_points.push( new G.Vector3( 1*x, 0, 0 ) ); 
        inner_points.push( new G.Vector3( 0, 1*x, 0 ) ); 
        inner_points.push( new G.Vector3( -1*x, 0, 0 ) ); 

        return new G.Line(
            new G.BufferGeometry().setFromPoints( inner_points ),
            new G.LineBasicMaterial( { color : Math.floor(Math.random()*16777215) } )
        );
    }

    getGeo() {
        return this.geo;
    }

    update() {
        this.geo.rotateX(this.x_rot);
        this.geo.rotateY(this.y_rot);
    }

    constructor(s,x,y) {
        this.x_rot = x;
        this.y_rot = y;
        this.s = s;
        this.geo = this.diamond(this.s);
    }
}

class DreamCatcher {
    constructor(n) {
        this.n = n;
        this._diamonds = new Array(this.n);

        let i = 0;
        while(i < this.n) {
            let x = rand(0.005,0.02);
            let y = rand(0.005,0.02);
            this._diamonds[i] = new Diamond(i+1,x,y);
            i+=1;
        }
    }

    add_diamonds(scene) {
        for(let x of this._diamonds) {
            scene.add(x.getGeo());
        }
    }

    move_diamonds() {
        for(let x of this._diamonds) {
            x.update();
        }
    }
}

renderer.render(scene, cam);

dreamer = new DreamCatcher(20);

dreamer.add_diamonds(scene);

function animate() {
    requestAnimationFrame(animate);

    dreamer.move_diamonds();

    controls.update();
    renderer.render(scene, cam);
}

animate();
