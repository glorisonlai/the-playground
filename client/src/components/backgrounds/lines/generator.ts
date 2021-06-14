// @ts-nocheck

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
	xSqueeze: number;
};

interface ScreenConstants {
	height: number,
	width: number,
	context: CanvasRenderingContext2D,
	constants: Constants,
	circles: Array<Circle>,
	colors: Array<string>,
	lineNumber: number,
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

const generateLines = () => {
	const screenConstants: ScreenConstants = {
		height: window.screen.height,
		width: window.screen.width,
		context: {} as CanvasRenderingContext2D,
		constants: {} as Constants,
		circles: [],
		colors: [],
		lineNumber: 0,
	};

	const init = ( screenConstants: ScreenConstants ): void => {
		const canvas = document.getElementById('screen') as HTMLCanvasElement;
		screenConstants.context = canvas.getContext('2d') as CanvasRenderingContext2D;
		screenConstants.constants = initConstants();
		screenConstants.circles = setCircles(screenConstants.constants);
		screenConstants.colors = setColors(screenConstants.constants);
		resetCanvas(screenConstants);
		generate(screenConstants);
	};

	const initConstants = (): Constants => {
		const constants = {} as Constants;
		constants.numCircles = Math.floor(8 + Math.random() * 7);
		constants.maxMaxRad = 8;
		constants.minMaxRad = 5;
		constants.minRadFactor = 0.9;
		constants.iterations = 11;
		constants.numPoints = Math.pow(2, constants.iterations)+1;
		constants.drawsPerFrame = 6;
		constants.fullTurn = Math.PI * 2 * constants.numPoints / (5+constants.numPoints);
		constants.minX = -constants.maxMaxRad;
		constants.maxX = screenConstants.width + constants.maxMaxRad;
		constants.minY = screenConstants.height/2 - 100;
		constants.maxY = screenConstants.height * 7/8;
		constants.twistAmount = 1.3 * Math.PI;
		constants.stepsPerSegment = Math.floor(600 / constants.numCircles);
		constants.maxColorValue = 1000;
		constants.minColorValue = 0;
		constants.lineAlpha = 0.01;
		constants.lineWidth = 2.5;
		constants.xSqueeze = 1;

		return constants;
	};

	const resetCanvas = (screenConstants: ScreenConstants): void => {
		window.cancelAnimationFrame(draw);
		screenConstants.lineNumber = 0;
		screenConstants.context.setTransform(1,0,0,1,0,0);
		screenConstants.context.clearRect(0, 0, screenConstants.width, screenConstants.height);
	};

	const setLinePoints = (iterations: number) => {
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
	};

	const setCircles = (constants: Constants) => {
		const circles = [];
		
		for (let i = 0; i < constants.numCircles; i++) {
			const maxR = constants.minMaxRad + Math.random() * (constants.maxMaxRad - constants.minMaxRad);
			const minR = constants.minRadFactor * maxR;
			
			var newCircle: Circle = {
				centerX: constants.minX + (i * constants.maxX - constants.minX)/(constants.numCircles-1),
				centerY: constants.minY + Math.floor((Math.random() * constants.maxX - constants.minX))/(constants.numCircles-1),
				maxRad : maxR,
				minRad : minR,
				phase : i/(constants.numCircles-1)*constants.twistAmount,
				pointArray : setLinePoints(constants.iterations)
				};
			circles.push(newCircle);
		}

		return circles;
	};

	const setColors = ({ minColorValue, maxColorValue, lineAlpha, iterations }: Constants) => {
		const colors = [];
		
		const r0: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const g0: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const b0: number = minColorValue + Math.random()*(maxColorValue-minColorValue);;
		
		const r1: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const g1: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		const b1: number = minColorValue + Math.random()*(maxColorValue-minColorValue);
		
		var colorParamArray: Array<number> = setLinePoints(iterations);
		
		for (let i = 0; i < colorParamArray.length; i++) {
			const param = colorParamArray[i];
			
			const r: number = Math.floor(r0 + param*(r1 - r0));
			const g: number = Math.floor(g0 + param*(g1 - g0));
			const b: number = Math.floor(b0 + param*(b1 - b0));
				
			const newColor = `rgba(${r},${g},${b},${lineAlpha})`;
			
			colors.push(newColor);
		}
		
		return colors;
	};

	const generate = (screenConstants: ScreenConstants) => {
		console.time('Drawing');
		draw();
	};

	const draw = () => {
		const {context, constants, circles, colors} = screenConstants;
		const {numCircles, drawsPerFrame, numPoints, fullTurn, lineWidth, stepsPerSegment, xSqueeze} = constants;
		
		for (let k = 0; k < drawsPerFrame; k++) {
			const lineNumber = screenConstants.lineNumber;
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
				};
			};
			
			context.stroke();

			screenConstants.lineNumber++;
		};
		
		if (screenConstants.lineNumber > numPoints-1) {
			console.timeEnd('Drawing');
			console.log('Finished animating');
			return;
		};
		window.requestAnimationFrame(draw);
		
	};

	init(screenConstants);
};

export default generateLines;