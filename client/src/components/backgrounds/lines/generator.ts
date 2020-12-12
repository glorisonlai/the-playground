interface Constants {
	numCircles: number;
	maxMaxRad: number;
	minMaxRad: number;
	minRadFactor: number;
	iterations: number;
	numPoints: number;
	drawsPerFrame: number;
	fullTurn: number;
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
	twistAmount: number;
	stepsPerSegment: number;
	maxColorValue: number;
	minColorValue: number;
	lineAlpha: number;
	lineWidth: number;
};

interface Coord {
	first: Coord;
	x: number;
	y: number;
	next: Coord;
};

interface Circle {
	centerX: number;
	centerY: number;
	maxRad: number;
	minRad: number;
	phase: number;
	pointArray: Array<number>;
};

type Nullable<T> = T | null;

const generator = {
	height: window.screen.height as number,
	width: window.screen.width as number,
	context: <CanvasRenderingContext2D>{},
	constants: {} as Constants,
	circles: [] as Array<Circle>,
	colors: [] as Array<string>,
	timer: null as Nullable<number>,
	lineNumber: 0 as number,

	init() {
		this.context = (<HTMLCanvasElement> document.getElementById('screen')).getContext('2d') as CanvasRenderingContext2D;
		this.initConstants(this.constants);
		this.circles = this.setCircles(this.circles, this.constants);
		this.colors = this.setColors(this.colors, this.constants);
		this.resetCanvas(this.context);
		this.generate(this.context, this.constants, this.circles, this.colors, this.timer);
	},

	initConstants(constants: Constants) {
		constants.numCircles = 15;
		constants.maxMaxRad = 10;
		constants.minMaxRad = 10;
		constants.minRadFactor = 0.9;
		constants.iterations = 11;
		constants.numPoints = Math.pow(2, constants.iterations)+1;
		constants.drawsPerFrame = 4;
		constants.fullTurn = Math.PI * 2 * constants.numPoints / (1+constants.numPoints);
		constants.minX = -constants.maxMaxRad;
		constants.maxX = this.width + constants.maxMaxRad;
		constants.minY = this.height/2 - 80;
		constants.maxY = this.height/2 + 80;
		constants.twistAmount = 0.67*Math.PI*2;
		constants.stepsPerSegment = Math.floor(300 / constants.numCircles);
		constants.maxColorValue = 80;
		constants.minColorValue = 20;
		constants.lineAlpha = 0.02;
		constants.lineWidth = 1.9;
	},

	resetCanvas(context: CanvasRenderingContext2D) {
		this.lineNumber = 0;
		context.setTransform(1,0,0,1,0,0);
		context.clearRect(0, 0, this.width, this.height);
	},

	setLinePoints (iterations: number) {
		const pointList= {} as Coord;
		const pointArray = [] as Array<number>;
		pointList.first = {x:0, y:1} as Coord;
		const lastPoint = {x:1, y:1} as Coord;
		let minY: number = 1;
		let maxY: number = 1;
				
		pointList.first.next= lastPoint as Coord;

		for (let i = 0; i < iterations; i++) {
			let point = pointList.first as Coord;
			while (point.next != null) {
				const nextPoint: Coord = point.next;
				
				const dx: number = nextPoint.x - point.x;
				const newX: number = 0.5*(point.x + nextPoint.x);
				const newY: number = 0.5*(point.y + nextPoint.y) + dx*(Math.random() * 2 - 1);
				
				const newPoint = {x: newX, y: newY} as Coord;
				
				if (newY < 1) minY = newY;
				if (newY > 1) maxY = newY;

				newPoint.next = nextPoint as Coord;
				point.next = newPoint as Coord;
				
				point = nextPoint as Coord;
			};
		};
		
		//normalize to values between 0 and 1
		//Also store y values in array here.
		const normalizeRate: number = (maxY === minY) ? 0 : 1/(maxY - minY);

		let point: Coord = pointList.first;
		while (point != null) {
			point.y = normalizeRate > 0 ? normalizeRate * (point.y - minY) : 1;
			pointArray.push(point.y);
			point = point.next;
		};
				
		return pointArray;		
	},

	setCircles(circles: Array<Circle>, constants: Constants) {
		circles = [];
		
		for (let i = 0; i < constants.numCircles; i++) {
			const maxR = constants.minMaxRad + Math.random() * (constants.maxMaxRad - constants.minMaxRad);
			const minR = constants.minRadFactor * maxR;
			
			var newCircle: Circle = {
				centerX: constants.minX + i/(constants.numCircles-1)*(constants.maxX - constants.minX),
				centerY: constants. minY + i/(constants.numCircles-1)*(constants.maxY - constants.minY),
				maxRad : maxR,
				minRad : minR,
				phase : i/(constants.numCircles-1)*constants.twistAmount,
				pointArray : this.setLinePoints(constants.iterations)
				};
			circles.push(newCircle);
		}

		return circles;
	},

	setColors(colors: Array<string>, { minColorValue, maxColorValue, lineAlpha, iterations }: Constants) {
		colors = [];
		
		const r0: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const g0: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const b0: number = minColorValue + Math.random()*(maxColorValue-minColorValue);;
		
		const r1: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const g1: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const b1: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		
		var colorParamArray: Array<number> = this.setLinePoints(iterations);
		
		for (let i = 0; i < colorParamArray.length; i++) {
			const param = colorParamArray[i];
			
			const r: number = Math.floor(r0 + param*(r1 - r0));
			const g: number = Math.floor(g0 + param*(g1 - g0));
			const b: number = Math.floor(b0 + param*(b1 - b0));
				
			const newColor = `rgba(${r},${g},${b},${lineAlpha})`;
			
			colors.push(newColor);
		}
		
		return colors;
	},

	generate(context: CanvasRenderingContext2D, constants: Constants, circles: Array<Circle>, colors: Array<string>, timer: number) {
		if (!!timer) clearInterval(timer);
		const _this = this;
		this.timer = window.setInterval(this.draw, 1, _this, context, constants, circles, colors);
		console.log('Finished');
	},

	draw( _this, context: CanvasRenderingContext2D, {numCircles, drawsPerFrame, numPoints, fullTurn, lineWidth, stepsPerSegment}: Constants, circles: Array<Circle>, colors: Array<string>) {
		const xSqueeze = 0.75;
		const {lineNumber, timer} = _this;
		
		for (let k = 0; k < drawsPerFrame; k++) {
			const theta: number = lineNumber / (numPoints-1) * fullTurn;
			
			context.globalCompositeOperation = "lighter";
			context.lineJoin = "miter";
			
			context.strokeStyle = colors[lineNumber];
			context.lineWidth = lineWidth;
			context.beginPath();
			
			//move to first point
			const centerX = circles[0].centerX;
			const centerY = circles[0].centerY;
			const rad = circles[0].minRad + circles[0].pointArray[lineNumber] * (circles[0].maxRad - circles[0].minRad);
			const phase = circles[0].phase;
			const x0 = centerX + xSqueeze * rad * Math.cos(theta + phase);
			const y0 = centerY + rad * Math.sin(theta + phase);
			context.moveTo(x0,y0);
			
			for (let i = 0; i < numCircles-1; i++) {
				//draw between i and i+1 circle
				const rad0 = circles[i].minRad + circles[i].pointArray[lineNumber]*(circles[i].maxRad - circles[i].minRad);
				const rad1 = circles[i+1].minRad + circles[i+1].pointArray[lineNumber]*(circles[i+1].maxRad - circles[i+1].minRad);
				const phase0 = circles[i].phase;
				const phase1 = circles[i+1].phase;
				
				for (let j = 0; j < stepsPerSegment; j++) {
					const linParam = j / (stepsPerSegment - 1);
					const cosParam = 0.5 - 0.5 * Math.cos(linParam * Math.PI);
					
					//interpolate center
					const centerX = circles[i].centerX + linParam*(circles[i+1].centerX - circles[i].centerX);
					const centerY = circles[i].centerY + cosParam*(circles[i+1].centerY - circles[i].centerY);
					
					//interpolate radius
					const rad = rad0 + cosParam*(rad1 - rad0);
					
					//interpolate phase
					const phase = phase0 + cosParam*(phase1 - phase0);
					
					const x0 = centerX + xSqueeze*rad*Math.cos(theta + phase);
					const y0 = centerY + rad*Math.sin(theta + phase);
					
					context.lineTo(x0,y0);
				}
			}
			
			context.stroke();

			_this.lineNumber++;
			if (_this.lineNumber > numPoints-1) {
				clearInterval(timer);
				_this.timer = null;
				console.log('hello');
				break;
			};
		};
	},
};

export default generator;