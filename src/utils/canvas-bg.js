const { PI, cos, sin, abs, random, atan2 } = Math
const HALF_PI = 0.5 * PI
const rand = n => n * random()
const fadeInOut = (t, m) => {
  const hm = 0.5 * m
  return abs((t + hm) % m - hm) / (hm)
}
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1)
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2

const particleCount = 700
const particlePropCount = 9
const particlePropsLength = particleCount * particlePropCount
const baseTTL = 100
const rangeTTL = 500
const baseSpeed = 0.1
const rangeSpeed = 1
const baseSize = 2
const rangeSize = 10
const baseHue = 210
const rangeHue = 30
const backgroundColor = 'hsla(60,50%,3%,1)'

// canvas
let container
let canvas
let ctx
let center
let tick
let particleProps

function initParticles() {
  tick = 0
  particleProps = new Float32Array(particlePropsLength)

  let i

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    initParticle(i)
  }
}

function initParticle(i) {
  const x = rand(canvas.a.width)
  const y = rand(canvas.a.height)
  const theta = angle(x, y, center[0], center[1])
  const vx = cos(theta) * 6
  const vy = sin(theta) * 6
  const life = 0
  const ttl = baseTTL + rand(rangeTTL)
  const speed = baseSpeed + rand(rangeSpeed)
  const size = baseSize + rand(rangeSize)
  const hue = baseHue + rand(rangeHue)

  particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i)
}

function drawParticles() {
  let i

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    updateParticle(i)
  }
}

function updateParticle(i) {
  const i2 = 1 + i; const i3 = 2 + i; const i4 = 3 + i; const i5 = 4 + i; const i6 = 5 + i; const i7 = 6 + i; const i8 = 7 + i; const i9 = 8 + i

  const x = particleProps[i]
  const y = particleProps[i2]
  const theta = angle(x, y, center[0], center[1]) + 0.75 * HALF_PI
  const vx = lerp(particleProps[i3], 2 * cos(theta), 0.05)
  const vy = lerp(particleProps[i4], 2 * sin(theta), 0.05)
  let life = particleProps[i5]
  const ttl = particleProps[i6]
  const speed = particleProps[i7]
  const x2 = x + vx * speed
  const y2 = y + vy * speed
  const size = particleProps[i8]
  const hue = particleProps[i9]

  drawParticle(x, y, theta, life, ttl, size, hue)

  life++

  particleProps[i] = x2
  particleProps[i2] = y2
  particleProps[i3] = vx
  particleProps[i4] = vy
  particleProps[i5] = life

  life > ttl && initParticle(i)
}

function drawParticle(x, y, theta, life, ttl, size, hue) {
  const xRel = x - (0.5 * size); const yRel = y - (0.5 * size)

  ctx.a.save()
  ctx.a.lineCap = 'round'
  ctx.a.lineWidth = 1
  ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
  ctx.a.beginPath()
  ctx.a.translate(xRel, yRel)
  ctx.a.rotate(theta)
  ctx.a.translate(-xRel, -yRel)
  ctx.a.strokeRect(xRel, yRel, size, size)
  ctx.a.closePath()
  ctx.a.restore()
}

function createCanvas() {
  container = document.querySelector('.login-container')
  canvas = {
    a: document.createElement('canvas'),
    b: document.createElement('canvas')
  }
  canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`
  container.appendChild(canvas.b)
  ctx = {
    a: canvas.a.getContext('2d'),
    b: canvas.b.getContext('2d')
  }
  center = []
}

function renderGlow() {
  ctx.b.save()
  ctx.b.filter = 'blur(8px) brightness(200%)'
  ctx.b.globalCompositeOperation = 'lighter'
  ctx.b.drawImage(canvas.a, 0, 0)
  ctx.b.restore()

  ctx.b.save()
  ctx.b.filter = 'blur(4px) brightness(200%)'
  ctx.b.globalCompositeOperation = 'lighter'
  ctx.b.drawImage(canvas.a, 0, 0)
  ctx.b.restore()
}

function render() {
  ctx.b.save()
  ctx.b.globalCompositeOperation = 'lighter'
  ctx.b.drawImage(canvas.a, 0, 0)
  ctx.b.restore()
}

function draw() {
  // eslint-disable-next-line no-unused-vars
  tick++

  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)

  ctx.b.fillStyle = backgroundColor
  ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height)

  drawParticles()
  renderGlow()
  render()

  window.requestAnimationFrame(draw)
}

export function setupCanvas() {
  createCanvas()
  resizeCanvas()
  initParticles()
  draw()
}

export function resizeCanvas() {
  const { innerWidth, innerHeight } = window

  canvas.a.width = innerWidth
  canvas.a.height = innerHeight

  ctx.a.drawImage(canvas.b, 0, 0)

  canvas.b.width = innerWidth
  canvas.b.height = innerHeight

  ctx.b.drawImage(canvas.a, 0, 0)

  center[0] = 0.5 * canvas.a.width
  center[1] = 0.5 * canvas.a.height
}
