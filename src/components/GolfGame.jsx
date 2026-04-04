import { useState, useRef, useEffect, useCallback } from 'react'

// ─────────────────────────────────────────
// OC Builds Golf - Full 3D-style Golf Game
// ─────────────────────────────────────────

// Club definitions: name, maxDistance (yards), loft (affects arc height), accuracy, icon
const CLUBS = [
  { name: 'Driver',  maxDist: 280, loft: 0.35, accuracy: 0.85, icon: '🏌️' },
  { name: '3 Wood',  maxDist: 230, loft: 0.40, accuracy: 0.88, icon: '🪵' },
  { name: '5 Iron',  maxDist: 180, loft: 0.50, accuracy: 0.92, icon: '5' },
  { name: '7 Iron',  maxDist: 140, loft: 0.60, accuracy: 0.94, icon: '7' },
  { name: 'PW',      maxDist: 100, loft: 0.75, accuracy: 0.96, icon: 'P' },
  { name: 'SW',      maxDist: 60,  loft: 0.85, accuracy: 0.93, icon: 'S' },
  { name: 'Putter',  maxDist: 40,  loft: 0.0,  accuracy: 1.0,  icon: '🏒' },
]

// Hole definitions - each hole has terrain segments from left to right
// Segments: { type: 'tee'|'fairway'|'rough'|'bunker'|'water'|'green', start: yards, end: yards }
// elevation: height offset at certain points (for hills)
const HOLES = [
  {
    par: 4, dist: 380, name: 'The Opener',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'fairway', start: 20, end: 340 },
      { type: 'bunker', start: 280, end: 310, side: 'right' },
      { type: 'green', start: 340, end: 380 },
    ],
    pin: 360, elevation: [],
  },
  {
    par: 3, dist: 165, name: 'Short & Sweet',
    segments: [
      { type: 'tee', start: 0, end: 15 },
      { type: 'water', start: 60, end: 100 },
      { type: 'fairway', start: 15, end: 60 },
      { type: 'fairway', start: 100, end: 130 },
      { type: 'bunker', start: 120, end: 140, side: 'left' },
      { type: 'green', start: 130, end: 165 },
    ],
    pin: 148, elevation: [],
  },
  {
    par: 5, dist: 520, name: 'The Beast',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'fairway', start: 20, end: 250 },
      { type: 'rough', start: 250, end: 280 },
      { type: 'fairway', start: 280, end: 470 },
      { type: 'bunker', start: 440, end: 470, side: 'right' },
      { type: 'bunker', start: 380, end: 410, side: 'left' },
      { type: 'green', start: 470, end: 520 },
    ],
    pin: 495, elevation: [{ pos: 300, h: 25 }],
  },
  {
    par: 4, dist: 410, name: 'Dogleg Right',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'fairway', start: 20, end: 220 },
      { type: 'rough', start: 220, end: 250 },
      { type: 'fairway', start: 250, end: 370 },
      { type: 'bunker', start: 350, end: 375, side: 'right' },
      { type: 'green', start: 370, end: 410 },
    ],
    pin: 390, elevation: [],
  },
  {
    par: 3, dist: 195, name: 'Island Green',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'water', start: 20, end: 140 },
      { type: 'bunker', start: 140, end: 155, side: 'both' },
      { type: 'green', start: 155, end: 195 },
    ],
    pin: 175, elevation: [],
  },
  {
    par: 4, dist: 350, name: 'Uphill Battle',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'fairway', start: 20, end: 200 },
      { type: 'bunker', start: 180, end: 210, side: 'left' },
      { type: 'fairway', start: 200, end: 310 },
      { type: 'green', start: 310, end: 350 },
    ],
    pin: 330, elevation: [{ pos: 150, h: 35 }, { pos: 310, h: 50 }],
  },
  {
    par: 5, dist: 490, name: 'The Valley',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'fairway', start: 20, end: 200 },
      { type: 'fairway', start: 200, end: 350 },
      { type: 'water', start: 350, end: 380 },
      { type: 'fairway', start: 380, end: 440 },
      { type: 'green', start: 440, end: 490 },
    ],
    pin: 465, elevation: [{ pos: 100, h: 30 }, { pos: 250, h: -20 }, { pos: 400, h: 15 }],
  },
  {
    par: 4, dist: 370, name: 'Bunker Alley',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'fairway', start: 20, end: 150 },
      { type: 'bunker', start: 150, end: 180, side: 'both' },
      { type: 'fairway', start: 180, end: 280 },
      { type: 'bunker', start: 280, end: 310, side: 'both' },
      { type: 'green', start: 310, end: 370 },
    ],
    pin: 340, elevation: [],
  },
  {
    par: 4, dist: 420, name: 'The Closer',
    segments: [
      { type: 'tee', start: 0, end: 20 },
      { type: 'fairway', start: 20, end: 200 },
      { type: 'water', start: 200, end: 240 },
      { type: 'fairway', start: 240, end: 380 },
      { type: 'bunker', start: 360, end: 385, side: 'right' },
      { type: 'green', start: 380, end: 420 },
    ],
    pin: 400, elevation: [{ pos: 300, h: 20 }],
  },
]

const TOTAL_PAR = HOLES.reduce((s, h) => s + h.par, 0)

// Terrain colors
const COLORS = {
  sky: ['#87CEEB', '#5BA3D9', '#3A7BC8'],
  tee: '#5a9e3f',
  fairway: '#4a8e32',
  rough: '#3a7228',
  bunker: '#e8d68a',
  water: '#2980b9',
  green: '#59b348',
  ground: '#3d6b2e',
  pin: '#E8722A',
}

function getElevation(hole, yardPos) {
  if (!hole.elevation.length) return 0
  let h = 0
  for (const e of hole.elevation) {
    const d = Math.abs(yardPos - e.pos)
    if (d < 100) {
      h += e.h * Math.max(0, 1 - d / 100)
    }
  }
  return h
}

function getTerrainAt(hole, yardPos) {
  for (const seg of hole.segments) {
    if (yardPos >= seg.start && yardPos <= seg.end) return seg.type
  }
  return 'rough'
}

// Suggest best club for distance
function suggestClub(distance, terrain) {
  if (terrain === 'green' || distance <= 40) return 6 // Putter
  if (terrain === 'bunker') return 5 // SW
  for (let i = CLUBS.length - 2; i >= 0; i--) {
    if (CLUBS[i].maxDist >= distance * 0.9) return i
  }
  return 0
}

export default function GolfGame({ onClose }) {
  const canvasRef = useRef(null)
  const W = 640, H = 420

  // Game state ref (mutable for animation loop)
  const g = useRef({
    hole: 0,
    strokes: Array(9).fill(0),
    ballYards: 0,       // distance from tee in yards
    ballHeight: 0,      // height in air (pixels for rendering)
    ballLie: 'tee',     // current terrain
    state: 'club_select', // club_select | aiming | power | swing | flight | rolling | putt_aim | putt_power | putt_roll | holed | scorecard
    club: 0,
    aimAngle: 0,        // -15 to 15 degrees left/right
    aimDir: 1,
    power: 0,
    powerDir: 1,
    swingAccuracy: 0,   // -1 to 1, 0 is perfect
    swingDir: 1,
    // Flight trajectory
    flightStart: 0,
    flightEnd: 0,
    flightPeak: 0,
    flightProgress: 0,
    flightLateral: 0,   // left/right deviation
    // Putting
    puttPower: 0,
    puttDir: 1,
    puttAimAngle: 0,
    puttAimDir: 1,
    puttBallX: 0,       // screen coords for putting
    puttBallY: 0,
    puttPinX: 0,
    puttPinY: 0,
    puttVx: 0,
    puttVy: 0,
    // Animation
    frameId: null,
    message: '',
    messageTimer: 0,
    cameraOffset: 0,     // for scrolling course view
    // Golfer animation
    golferFrame: 0,
    golferTimer: 0,
  })

  const [ui, setUi] = useState({
    hole: 0, strokes: Array(9).fill(0), state: 'club_select',
    club: 0, power: 0, swingAccuracy: 0, aimAngle: 0,
    message: '', ballYards: 0, ballLie: 'tee', showScorecard: false,
    puttPower: 0, puttAimAngle: 0,
  })

  const syncUi = useCallback(() => {
    const gc = g.current
    setUi({
      hole: gc.hole,
      strokes: [...gc.strokes],
      state: gc.state,
      club: gc.club,
      power: gc.power,
      swingAccuracy: gc.swingAccuracy,
      aimAngle: gc.aimAngle,
      message: gc.message,
      ballYards: gc.ballYards,
      ballLie: gc.ballLie,
      showScorecard: gc.state === 'scorecard',
      puttPower: gc.puttPower,
      puttAimAngle: gc.puttAimAngle,
    })
  }, [])

  function initHole(idx) {
    const gc = g.current
    const hole = HOLES[idx]
    gc.hole = idx
    gc.ballYards = 10 // on the tee
    gc.ballHeight = 0
    gc.ballLie = 'tee'
    gc.state = 'club_select'
    gc.club = suggestClub(hole.dist, 'tee')
    gc.aimAngle = 0
    gc.power = 0
    gc.swingAccuracy = 0
    gc.message = `Hole ${idx + 1}: ${hole.name} - Par ${hole.par}, ${hole.dist} yds`
    gc.messageTimer = 180
    gc.cameraOffset = 0
    gc.puttPower = 0
    gc.puttAimAngle = 0
    syncUi()
  }

  // ── Drawing ──

  function yardToScreen(yard, hole) {
    const gc = g.current
    const scale = W / Math.min(hole.dist + 40, 560)
    return 20 + (yard - gc.cameraOffset) * scale
  }

  function drawCourseView(ctx) {
    const gc = g.current
    const hole = HOLES[gc.hole]
    const groundY = H * 0.65

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY)
    skyGrad.addColorStop(0, '#4a90d9')
    skyGrad.addColorStop(0.5, '#7ab8e0')
    skyGrad.addColorStop(1, '#a8d8ea')
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, W, groundY)

    // Sun
    ctx.beginPath()
    ctx.arc(W - 80, 60, 30, 0, Math.PI * 2)
    const sunGrad = ctx.createRadialGradient(W - 80, 60, 5, W - 80, 60, 30)
    sunGrad.addColorStop(0, '#fff8c4')
    sunGrad.addColorStop(1, '#f0d060')
    ctx.fillStyle = sunGrad
    ctx.fill()

    // Clouds
    drawCloud(ctx, 100, 50, 1.0)
    drawCloud(ctx, 300, 35, 0.7)
    drawCloud(ctx, 500, 65, 0.8)

    // Distant trees
    for (let i = 0; i < W; i += 40) {
      const treeH = 25 + Math.sin(i * 0.1) * 10
      ctx.fillStyle = '#2d6030'
      ctx.beginPath()
      ctx.moveTo(i - 15, groundY - 20)
      ctx.lineTo(i, groundY - 20 - treeH)
      ctx.lineTo(i + 15, groundY - 20)
      ctx.fill()
    }

    // Draw terrain segments
    const scale = W / Math.min(hole.dist + 40, 560)

    for (const seg of hole.segments) {
      const x1 = yardToScreen(seg.start, hole)
      const x2 = yardToScreen(seg.end, hole)
      const w = x2 - x1

      let color
      switch (seg.type) {
        case 'tee': color = COLORS.tee; break
        case 'fairway': color = COLORS.fairway; break
        case 'rough': color = COLORS.rough; break
        case 'bunker': color = COLORS.bunker; break
        case 'water': color = COLORS.water; break
        case 'green': color = COLORS.green; break
        default: color = COLORS.rough
      }

      // Elevation offset
      const midYard = (seg.start + seg.end) / 2
      const elev = getElevation(hole, midYard)

      // Main terrain strip
      const segY = groundY - elev * 0.4

      // Draw a 3D-ish ground with perspective
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(x1, segY)
      ctx.lineTo(x2, segY - getElevation(hole, seg.end) * 0.4 + elev * 0.4)
      ctx.lineTo(x2, segY + 60)
      ctx.lineTo(x1, segY + 60)
      ctx.fill()

      // Top edge highlight
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x1, segY)
      ctx.lineTo(x2, segY - getElevation(hole, seg.end) * 0.4 + elev * 0.4)
      ctx.stroke()

      // Water shimmer
      if (seg.type === 'water') {
        ctx.fillStyle = 'rgba(255,255,255,0.1)'
        for (let wx = x1 + 5; wx < x2 - 5; wx += 12) {
          const shimmer = Math.sin(Date.now() / 500 + wx * 0.3) * 2
          ctx.fillRect(wx, segY + 5 + shimmer, 8, 2)
        }
      }

      // Bunker texture
      if (seg.type === 'bunker') {
        ctx.fillStyle = 'rgba(180,150,80,0.4)'
        for (let bx = x1 + 3; bx < x2 - 3; bx += 6) {
          ctx.fillRect(bx, segY + 3, 3, 2)
        }
      }

      // Green - draw flag
      if (seg.type === 'green') {
        // Green edge ring
        ctx.strokeStyle = '#4a9e3a'
        ctx.lineWidth = 2
        ctx.beginPath()
        const greenCX = (x1 + x2) / 2
        ctx.ellipse(greenCX, segY + 8, w / 2, 8, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    // Rough/ground below the course
    ctx.fillStyle = COLORS.ground
    ctx.fillRect(0, groundY + 60, W, H - groundY - 60)

    // Draw pin/flag
    const pinX = yardToScreen(hole.pin, hole)
    const pinElev = getElevation(hole, hole.pin)
    const pinY = groundY - pinElev * 0.4 - 2

    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(pinX, pinY)
    ctx.lineTo(pinX, pinY - 40)
    ctx.stroke()
    // Flag
    ctx.fillStyle = COLORS.pin
    ctx.beginPath()
    ctx.moveTo(pinX, pinY - 40)
    ctx.lineTo(pinX + 18, pinY - 34)
    ctx.lineTo(pinX, pinY - 28)
    ctx.fill()
    // Hole
    ctx.fillStyle = '#111'
    ctx.beginPath()
    ctx.ellipse(pinX, pinY, 5, 2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Draw ball
    const ballX = yardToScreen(gc.ballYards, hole)
    const ballElev = getElevation(hole, gc.ballYards)
    const ballBaseY = groundY - ballElev * 0.4 - 2
    const ballY = ballBaseY - gc.ballHeight

    // Ball shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    ctx.beginPath()
    ctx.ellipse(ballX, ballBaseY, 5 + gc.ballHeight * 0.02, 2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Ball
    const ballGrad = ctx.createRadialGradient(ballX - 1, ballY - 1, 1, ballX, ballY, 6)
    ballGrad.addColorStop(0, '#ffffff')
    ballGrad.addColorStop(1, '#cccccc')
    ctx.fillStyle = ballGrad
    ctx.beginPath()
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2)
    ctx.fill()

    // Draw golfer near the ball (when not in flight)
    if (gc.state !== 'flight') {
      drawGolfer(ctx, ballX - 20, ballBaseY, gc)
    }

    // Flight trail
    if (gc.state === 'flight') {
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath()
      const startX = yardToScreen(gc.flightStart, hole)
      const startY = groundY - getElevation(hole, gc.flightStart) * 0.4 - 2
      ctx.moveTo(startX, startY)

      const steps = 30
      for (let i = 1; i <= steps * gc.flightProgress; i++) {
        const t = i / steps
        const yard = gc.flightStart + (gc.flightEnd - gc.flightStart) * t
        const sx = yardToScreen(yard, hole)
        const peak = gc.flightPeak
        const sy = groundY - getElevation(hole, yard) * 0.4 - 2 - peak * 4 * t * (1 - t)
        ctx.lineTo(sx, sy)
      }
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Distance marker
    const distToPin = Math.round(Math.abs(hole.pin - gc.ballYards))
    if (gc.state !== 'scorecard') {
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(W / 2 - 50, 10, 100, 24)
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`${distToPin} yds to pin`, W / 2, 27)
    }
  }

  function drawCloud(ctx, x, y, scale) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.beginPath()
    ctx.arc(x, y, 15 * scale, 0, Math.PI * 2)
    ctx.arc(x + 18 * scale, y - 5 * scale, 12 * scale, 0, Math.PI * 2)
    ctx.arc(x + 30 * scale, y, 15 * scale, 0, Math.PI * 2)
    ctx.arc(x + 15 * scale, y + 3 * scale, 10 * scale, 0, Math.PI * 2)
    ctx.fill()
  }

  function drawGolfer(ctx, x, baseY, gc) {
    const scale = 0.8
    // Body
    ctx.fillStyle = '#2c3e50'
    ctx.fillRect(x - 3 * scale, baseY - 28 * scale, 6 * scale, 16 * scale)
    // Head
    ctx.fillStyle = '#f5cba7'
    ctx.beginPath()
    ctx.arc(x, baseY - 32 * scale, 5 * scale, 0, Math.PI * 2)
    ctx.fill()
    // Cap
    ctx.fillStyle = COLORS.pin
    ctx.beginPath()
    ctx.arc(x, baseY - 35 * scale, 5 * scale, Math.PI, 0)
    ctx.fill()
    // Legs
    ctx.fillStyle = '#34495e'
    ctx.fillRect(x - 4 * scale, baseY - 12 * scale, 3 * scale, 12 * scale)
    ctx.fillRect(x + 1 * scale, baseY - 12 * scale, 3 * scale, 12 * scale)

    // Club (during swing states)
    if (gc.state === 'power' || gc.state === 'aiming' || gc.state === 'swing') {
      ctx.strokeStyle = '#888'
      ctx.lineWidth = 2
      const clubAngle = gc.state === 'swing' ? -0.5 + gc.golferFrame * 0.3 : -0.8
      ctx.beginPath()
      ctx.moveTo(x + 3 * scale, baseY - 20 * scale)
      ctx.lineTo(
        x + 3 * scale + Math.cos(clubAngle) * 25 * scale,
        baseY - 20 * scale + Math.sin(clubAngle) * 25 * scale
      )
      ctx.stroke()
    }
  }

  function drawPuttingView(ctx) {
    const gc = g.current
    const hole = HOLES[gc.hole]

    // Green background
    const greenGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, 300)
    greenGrad.addColorStop(0, '#5ebd4c')
    greenGrad.addColorStop(1, '#3d8a30')
    ctx.fillStyle = greenGrad
    ctx.fillRect(0, 0, W, H)

    // Green texture - subtle dots
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    for (let px = 0; px < W; px += 8) {
      for (let py = 0; py < H; py += 8) {
        if ((px + py) % 16 === 0) ctx.fillRect(px, py, 2, 2)
      }
    }

    // Green edge
    ctx.strokeStyle = '#2d6a20'
    ctx.lineWidth = 4
    ctx.strokeRect(20, 20, W - 40, H - 40)

    // Fringe
    ctx.strokeStyle = '#4a7e3a'
    ctx.lineWidth = 8
    ctx.strokeRect(16, 16, W - 32, H - 32)

    // Pin/hole
    ctx.fillStyle = '#111'
    ctx.beginPath()
    ctx.ellipse(gc.puttPinX, gc.puttPinY, 10, 10, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#222'
    ctx.beginPath()
    ctx.ellipse(gc.puttPinX, gc.puttPinY, 8, 8, 0, 0, Math.PI * 2)
    ctx.fill()
    // Flag pole
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(gc.puttPinX, gc.puttPinY)
    ctx.lineTo(gc.puttPinX, gc.puttPinY - 45)
    ctx.stroke()
    ctx.fillStyle = COLORS.pin
    ctx.beginPath()
    ctx.moveTo(gc.puttPinX, gc.puttPinY - 45)
    ctx.lineTo(gc.puttPinX + 16, gc.puttPinY - 38)
    ctx.lineTo(gc.puttPinX, gc.puttPinY - 31)
    ctx.fill()

    // Ball shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.beginPath()
    ctx.ellipse(gc.puttBallX + 2, gc.puttBallY + 2, 7, 7, 0, 0, Math.PI * 2)
    ctx.fill()

    // Ball
    const ballGrad = ctx.createRadialGradient(gc.puttBallX - 2, gc.puttBallY - 2, 1, gc.puttBallX, gc.puttBallY, 7)
    ballGrad.addColorStop(0, '#fff')
    ballGrad.addColorStop(1, '#ccc')
    ctx.fillStyle = ballGrad
    ctx.beginPath()
    ctx.arc(gc.puttBallX, gc.puttBallY, 7, 0, Math.PI * 2)
    ctx.fill()

    // Aim line when aiming
    if (gc.state === 'putt_aim' || gc.state === 'putt_power') {
      const angle = gc.puttAimAngle * Math.PI / 180
      const dx = Math.cos(angle)
      const dy = Math.sin(angle)
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(gc.puttBallX, gc.puttBallY)
      ctx.lineTo(gc.puttBallX + dx * 120, gc.puttBallY + dy * 120)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Distance to hole text
    const puttDist = Math.round(Math.hypot(gc.puttPinX - gc.puttBallX, gc.puttPinY - gc.puttBallY) / 8)
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(W / 2 - 40, 10, 80, 24)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 12px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(`${puttDist} ft`, W / 2, 27)
  }

  function drawHUD(ctx) {
    const gc = g.current
    const hole = HOLES[gc.hole]
    const isPutting = gc.state.startsWith('putt')

    // Bottom bar
    ctx.fillStyle = 'rgba(0,0,0,0.7)'
    ctx.fillRect(0, H - 80, W, 80)

    // Hole info
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 13px sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`Hole ${gc.hole + 1}/9`, 15, H - 58)
    ctx.fillStyle = '#aaa'
    ctx.font = '11px sans-serif'
    ctx.fillText(`Par ${hole.par} · ${hole.name}`, 15, H - 42)
    ctx.fillText(`Strokes: ${gc.strokes[gc.hole]}`, 15, H - 26)

    // Club selector (when selecting)
    if (gc.state === 'club_select' && !isPutting) {
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Select Club (← →, Enter to confirm)', W / 2, H - 58)

      const club = CLUBS[gc.club]
      ctx.fillStyle = COLORS.pin
      ctx.font = 'bold 18px sans-serif'
      ctx.fillText(club.name, W / 2, H - 30)
      ctx.fillStyle = '#aaa'
      ctx.font = '11px sans-serif'
      ctx.fillText(`Max: ${club.maxDist} yds`, W / 2, H - 14)

      // Arrows
      ctx.fillStyle = '#fff'
      ctx.font = '20px sans-serif'
      ctx.fillText('◀', W / 2 - 80, H - 28)
      ctx.fillText('▶', W / 2 + 80, H - 28)
    }

    // Power meter
    if (gc.state === 'power' || gc.state === 'putt_power') {
      const meterX = W / 2 - 100
      const meterW = 200
      const meterY = H - 55
      const meterH = 16

      // Background
      ctx.fillStyle = '#333'
      ctx.fillRect(meterX, meterY, meterW, meterH)

      // Power gradient
      const grad = ctx.createLinearGradient(meterX, 0, meterX + meterW, 0)
      grad.addColorStop(0, '#4CAF50')
      grad.addColorStop(0.5, '#FFC107')
      grad.addColorStop(0.8, '#FF5722')
      grad.addColorStop(1, '#f44336')
      ctx.fillStyle = grad
      ctx.fillRect(meterX, meterY, meterW * gc.power, meterH)

      // Marker
      ctx.fillStyle = '#fff'
      ctx.fillRect(meterX + meterW * gc.power - 2, meterY - 3, 4, meterH + 6)

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`Power: ${Math.round(gc.power * 100)}%`, W / 2, H - 25)
      ctx.fillStyle = '#aaa'
      ctx.font = '11px sans-serif'
      ctx.fillText('Press SPACE to set power', W / 2, H - 10)
    }

    // Swing accuracy meter
    if (gc.state === 'swing') {
      const meterX = W / 2 - 100
      const meterW = 200
      const meterY = H - 55
      const meterH = 16

      ctx.fillStyle = '#333'
      ctx.fillRect(meterX, meterY, meterW, meterH)

      // Sweet spot
      const sweetW = 30
      const sweetX = meterX + meterW / 2 - sweetW / 2
      ctx.fillStyle = 'rgba(76,175,80,0.4)'
      ctx.fillRect(sweetX, meterY, sweetW, meterH)

      // Needle
      const needlePos = meterX + meterW / 2 + gc.swingAccuracy * (meterW / 2)
      ctx.fillStyle = '#fff'
      ctx.fillRect(needlePos - 2, meterY - 3, 4, meterH + 6)

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Accuracy - Press SPACE!', W / 2, H - 25)
    }

    // Aim indicator
    if (gc.state === 'aiming') {
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`Aim: ${gc.aimAngle > 0 ? 'Right' : gc.aimAngle < 0 ? 'Left' : 'Straight'} ${Math.abs(Math.round(gc.aimAngle))}°`, W / 2, H - 40)
      ctx.fillStyle = '#aaa'
      ctx.font = '11px sans-serif'
      ctx.fillText('← → to aim, SPACE to confirm', W / 2, H - 22)
    }

    // Putt aim
    if (gc.state === 'putt_aim') {
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Aim your putt (← →, SPACE to set power)', W / 2, H - 35)
    }

    // Message overlay
    if (gc.messageTimer > 0) {
      const alpha = Math.min(1, gc.messageTimer / 30)
      ctx.fillStyle = `rgba(0,0,0,${alpha * 0.6})`
      ctx.fillRect(W / 2 - 160, H / 2 - 50, 320, 40)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.font = 'bold 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(gc.message, W / 2, H / 2 - 25)
    }

    // Score summary (top right)
    const totalStrokes = gc.strokes.reduce((a, b) => a + b, 0)
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(W - 120, 10, 110, 24)
    ctx.fillStyle = '#fff'
    ctx.font = '11px monospace'
    ctx.textAlign = 'right'
    ctx.fillText(`Total: ${totalStrokes} (${totalStrokes - HOLES.slice(0, gc.hole).reduce((s, h) => s + h.par, 0) >= 0 ? '+' : ''}${totalStrokes - HOLES.slice(0, gc.hole).reduce((s, h) => s + h.par, 0)})`, W - 15, 27)
  }

  // ── Update logic ──

  function update() {
    const gc = g.current

    if (gc.messageTimer > 0) gc.messageTimer--

    // Golfer animation
    gc.golferTimer++
    if (gc.golferTimer > 6) {
      gc.golferTimer = 0
      gc.golferFrame = (gc.golferFrame + 1) % 4
    }

    // Power meter oscillation
    if (gc.state === 'power' || gc.state === 'putt_power') {
      gc.power += gc.powerDir * 0.018
      if (gc.power >= 1) { gc.power = 1; gc.powerDir = -1 }
      if (gc.power <= 0) { gc.power = 0; gc.powerDir = 1 }
    }

    // Swing accuracy oscillation
    if (gc.state === 'swing') {
      const speed = 0.04 + gc.power * 0.03
      gc.swingAccuracy += gc.swingDir * speed
      if (gc.swingAccuracy >= 1) { gc.swingAccuracy = 1; gc.swingDir = -1 }
      if (gc.swingAccuracy <= -1) { gc.swingAccuracy = -1; gc.swingDir = 1 }
    }

    // Aim oscillation (auto-sway)
    if (gc.state === 'aiming') {
      // Player manually controls aim now, no auto-sway
    }

    // Putt aim oscillation
    if (gc.state === 'putt_aim') {
      // Player manually controls
    }

    // Ball flight
    if (gc.state === 'flight') {
      gc.flightProgress += 0.015
      if (gc.flightProgress >= 1) {
        gc.flightProgress = 1
        landBall()
      } else {
        const t = gc.flightProgress
        gc.ballYards = gc.flightStart + (gc.flightEnd - gc.flightStart) * t
        gc.ballHeight = gc.flightPeak * 4 * t * (1 - t)
      }
    }

    // Putt rolling
    if (gc.state === 'putt_roll') {
      gc.puttBallX += gc.puttVx
      gc.puttBallY += gc.puttVy
      gc.puttVx *= 0.985
      gc.puttVy *= 0.985

      // Bounds
      if (gc.puttBallX < 30) { gc.puttBallX = 30; gc.puttVx = Math.abs(gc.puttVx) * 0.5 }
      if (gc.puttBallX > W - 30) { gc.puttBallX = W - 30; gc.puttVx = -Math.abs(gc.puttVx) * 0.5 }
      if (gc.puttBallY < 30) { gc.puttBallY = 30; gc.puttVy = Math.abs(gc.puttVy) * 0.5 }
      if (gc.puttBallY > H - 90) { gc.puttBallY = H - 90; gc.puttVy = -Math.abs(gc.puttVy) * 0.5 }

      // Check if holed
      const distToHole = Math.hypot(gc.puttBallX - gc.puttPinX, gc.puttBallY - gc.puttPinY)
      const speed = Math.hypot(gc.puttVx, gc.puttVy)

      if (distToHole < 12 && speed < 4) {
        gc.puttBallX = gc.puttPinX
        gc.puttBallY = gc.puttPinY
        gc.puttVx = 0
        gc.puttVy = 0
        gc.state = 'holed'
        const strokes = gc.strokes[gc.hole]
        const par = HOLES[gc.hole].par
        const diff = strokes - par
        if (strokes === 1) gc.message = 'HOLE IN ONE!!!'
        else if (diff <= -2) gc.message = 'Eagle!'
        else if (diff === -1) gc.message = 'Birdie!'
        else if (diff === 0) gc.message = 'Par'
        else if (diff === 1) gc.message = 'Bogey'
        else if (diff === 2) gc.message = 'Double Bogey'
        else gc.message = `+${diff}`
        gc.messageTimer = 200
        syncUi()
        return
      }

      // Ball stopped
      if (speed < 0.1) {
        gc.puttVx = 0
        gc.puttVy = 0
        gc.state = 'putt_aim'
        // Update yard distance for display
        const puttDistPx = Math.hypot(gc.puttPinX - gc.puttBallX, gc.puttPinY - gc.puttBallY)
        gc.ballYards = HOLES[gc.hole].pin - puttDistPx / 8
        syncUi()
      }
    }
  }

  function landBall() {
    const gc = g.current
    const hole = HOLES[gc.hole]
    gc.ballHeight = 0
    gc.ballYards = gc.flightEnd + gc.flightLateral * 0.3

    // Clamp to course
    gc.ballYards = Math.max(0, Math.min(hole.dist, gc.ballYards))

    const terrain = getTerrainAt(hole, gc.ballYards)
    gc.ballLie = terrain

    if (terrain === 'water') {
      gc.message = 'Splash! 1 stroke penalty'
      gc.messageTimer = 120
      gc.strokes[gc.hole]++
      // Move ball back before water
      for (let y = gc.ballYards - 1; y >= 0; y--) {
        if (getTerrainAt(hole, y) !== 'water') {
          gc.ballYards = y
          break
        }
      }
      gc.ballLie = getTerrainAt(hole, gc.ballYards)
    }

    // Check if on green
    if (terrain === 'green') {
      gc.message = 'On the green!'
      gc.messageTimer = 90
      enterPutting()
      return
    }

    if (terrain === 'bunker') {
      gc.message = 'In the bunker!'
      gc.messageTimer = 90
    }

    // Suggest club for next shot
    const distToPin = Math.abs(hole.pin - gc.ballYards)
    gc.club = suggestClub(distToPin, terrain)
    gc.state = 'club_select'
    gc.power = 0
    gc.swingAccuracy = 0
    gc.aimAngle = 0
    syncUi()
  }

  function enterPutting() {
    const gc = g.current
    const hole = HOLES[gc.hole]

    // Set up putting view coordinates
    // Pin is roughly in center-ish, ball is at a distance proportional to actual yards
    gc.puttPinX = W / 2 + (Math.random() - 0.5) * 60
    gc.puttPinY = H / 2 - 40 + (Math.random() - 0.5) * 40

    const distYards = Math.abs(hole.pin - gc.ballYards)
    const distPx = Math.min(distYards * 8, 200)
    const ang = Math.random() * Math.PI * 2
    gc.puttBallX = gc.puttPinX + Math.cos(ang) * distPx
    gc.puttBallY = gc.puttPinY + Math.sin(ang) * distPx

    // Clamp to green area
    gc.puttBallX = Math.max(40, Math.min(W - 40, gc.puttBallX))
    gc.puttBallY = Math.max(40, Math.min(H - 90, gc.puttBallY))

    // Aim towards the pin
    gc.puttAimAngle = Math.atan2(gc.puttPinY - gc.puttBallY, gc.puttPinX - gc.puttBallX) * 180 / Math.PI

    gc.state = 'putt_aim'
    gc.club = 6 // putter
    gc.power = 0
    gc.puttPower = 0
    syncUi()
  }

  function swing() {
    const gc = g.current
    const hole = HOLES[gc.hole]
    const club = CLUBS[gc.club]

    gc.strokes[gc.hole]++

    // Calculate shot distance
    const accuracyPenalty = Math.abs(gc.swingAccuracy) // 0 = perfect, 1 = terrible
    const effectivePower = gc.power * (1 - accuracyPenalty * 0.4)
    let distance = club.maxDist * effectivePower

    // Terrain penalties
    if (gc.ballLie === 'rough') distance *= 0.75
    if (gc.ballLie === 'bunker') distance *= 0.5

    // Lateral deviation from accuracy
    gc.flightLateral = gc.swingAccuracy * (1 - club.accuracy) * 30 + gc.aimAngle * distance / 100

    gc.flightStart = gc.ballYards
    gc.flightEnd = gc.ballYards + distance
    gc.flightPeak = club.loft * distance * 0.4
    gc.flightProgress = 0
    gc.state = 'flight'

    gc.message = `${club.name}: ${Math.round(distance)} yds`
    gc.messageTimer = 60
    syncUi()
  }

  function putt() {
    const gc = g.current
    gc.strokes[gc.hole]++

    const angle = gc.puttAimAngle * Math.PI / 180
    const force = gc.power * 8

    gc.puttVx = Math.cos(angle) * force
    gc.puttVy = Math.sin(angle) * force
    gc.state = 'putt_roll'
    gc.power = 0
    syncUi()
  }

  // ── Input handling ──

  const handleKey = useCallback((e) => {
    const gc = g.current
    const key = e.key

    if (key === 'Escape') {
      onClose()
      return
    }

    switch (gc.state) {
      case 'club_select':
        if (key === 'ArrowLeft') {
          gc.club = (gc.club - 1 + CLUBS.length) % CLUBS.length
          syncUi()
        } else if (key === 'ArrowRight') {
          gc.club = (gc.club + 1) % CLUBS.length
          syncUi()
        } else if (key === 'Enter' || key === ' ') {
          e.preventDefault()
          gc.state = 'aiming'
          gc.aimAngle = 0
          syncUi()
        }
        break

      case 'aiming':
        if (key === 'ArrowLeft') {
          gc.aimAngle = Math.max(-15, gc.aimAngle - 1)
          syncUi()
        } else if (key === 'ArrowRight') {
          gc.aimAngle = Math.min(15, gc.aimAngle + 1)
          syncUi()
        } else if (key === ' ') {
          e.preventDefault()
          gc.state = 'power'
          gc.power = 0
          gc.powerDir = 1
          syncUi()
        }
        break

      case 'power':
        if (key === ' ') {
          e.preventDefault()
          gc.state = 'swing'
          gc.swingAccuracy = -1
          gc.swingDir = 1
          syncUi()
        }
        break

      case 'swing':
        if (key === ' ') {
          e.preventDefault()
          swing()
        }
        break

      case 'putt_aim':
        if (key === 'ArrowLeft') {
          gc.puttAimAngle -= 2
          syncUi()
        } else if (key === 'ArrowRight') {
          gc.puttAimAngle += 2
          syncUi()
        } else if (key === ' ') {
          e.preventDefault()
          gc.state = 'putt_power'
          gc.power = 0
          gc.powerDir = 1
          syncUi()
        }
        break

      case 'putt_power':
        if (key === ' ') {
          e.preventDefault()
          putt()
        }
        break

      case 'holed':
        if (key === ' ' || key === 'Enter') {
          e.preventDefault()
          if (gc.hole >= 8) {
            gc.state = 'scorecard'
            // Save to leaderboard
            const board = JSON.parse(localStorage.getItem('golf_board') || '[]')
            const total = gc.strokes.reduce((a, b) => a + b, 0)
            board.push({ score: total, date: new Date().toLocaleDateString() })
            board.sort((a, b) => a.score - b.score)
            localStorage.setItem('golf_board', JSON.stringify(board.slice(0, 5)))
            syncUi()
          } else {
            initHole(gc.hole + 1)
          }
        }
        break

      case 'scorecard':
        if (key === ' ' || key === 'Enter') {
          e.preventDefault()
          // Restart
          gc.strokes = Array(9).fill(0)
          initHole(0)
        }
        break
    }
  }, [onClose, syncUi])

  // ── Main loop ──

  useEffect(() => {
    initHole(0)

    function loop() {
      update()
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, W, H)

        const gc = g.current
        const isPutting = gc.state.startsWith('putt') || (gc.state === 'putt_roll')

        if (isPutting) {
          drawPuttingView(ctx)
        } else {
          drawCourseView(ctx)
        }

        drawHUD(ctx)

        // Holed overlay
        if (gc.state === 'holed') {
          ctx.fillStyle = 'rgba(0,0,0,0.5)'
          ctx.fillRect(0, 0, W, H - 80)
          ctx.fillStyle = '#fff'
          ctx.font = 'bold 28px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(gc.message, W / 2, H / 2 - 30)
          ctx.font = '14px sans-serif'
          ctx.fillStyle = '#aaa'
          ctx.fillText(`${gc.strokes[gc.hole]} stroke${gc.strokes[gc.hole] !== 1 ? 's' : ''} on a par ${HOLES[gc.hole].par}`, W / 2, H / 2)
          ctx.fillStyle = COLORS.pin
          ctx.font = 'bold 13px sans-serif'
          ctx.fillText(gc.hole >= 8 ? 'SPACE for scorecard' : 'SPACE for next hole', W / 2, H / 2 + 30)
        }

        // Scorecard overlay
        if (gc.state === 'scorecard') {
          drawScorecard(ctx, gc)
        }
      }

      g.current.frameId = requestAnimationFrame(loop)
    }

    g.current.frameId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(g.current.frameId)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  function drawScorecard(ctx, gc) {
    ctx.fillStyle = 'rgba(0,0,0,0.85)'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Scorecard', W / 2, 40)

    const colW = 56
    const startX = W / 2 - (colW * 5)
    const startY = 65

    // Header
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(startX, startY, colW * 10, 24)

    ctx.font = 'bold 11px monospace'
    ctx.fillStyle = '#aaa'
    ctx.textAlign = 'center'
    const headers = ['Hole', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'TOT']
    headers.forEach((h, i) => {
      ctx.fillText(h, startX + i * colW + colW / 2, startY + 16)
    })

    // Par row
    const parY = startY + 28
    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    ctx.fillRect(startX, parY, colW * 10, 22)
    ctx.fillStyle = '#888'
    ctx.font = '11px monospace'
    ctx.fillText('Par', startX + colW / 2, parY + 16)
    HOLES.forEach((h, i) => {
      ctx.fillText(String(h.par), startX + (i + 1) * colW + colW / 2, parY + 16)
    })
    ctx.fillText(String(TOTAL_PAR), startX + 10 * colW + colW / 2, parY + 16)

    // Score row
    const scoreY = parY + 26
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    ctx.fillRect(startX, scoreY, colW * 10, 22)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 11px monospace'
    ctx.fillText('You', startX + colW / 2, scoreY + 16)
    const totalStrokes = gc.strokes.reduce((a, b) => a + b, 0)
    gc.strokes.forEach((s, i) => {
      const diff = s - HOLES[i].par
      ctx.fillStyle = diff < 0 ? '#4CAF50' : diff > 0 ? '#f44336' : '#fff'
      ctx.fillText(String(s), startX + (i + 1) * colW + colW / 2, scoreY + 16)
    })
    const totalDiff = totalStrokes - TOTAL_PAR
    ctx.fillStyle = totalDiff < 0 ? '#4CAF50' : totalDiff > 0 ? '#f44336' : '#fff'
    ctx.fillText(String(totalStrokes), startX + 10 * colW + colW / 2, scoreY + 16)

    // Final score
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 20px sans-serif'
    const scoreText = totalDiff === 0 ? 'Even Par!' : totalDiff > 0 ? `+${totalDiff} Over` : `${totalDiff} Under Par!`
    ctx.fillText(scoreText, W / 2, scoreY + 60)

    // Leaderboard
    const board = JSON.parse(localStorage.getItem('golf_board') || '[]')
    if (board.length > 0) {
      ctx.fillStyle = '#aaa'
      ctx.font = 'bold 13px sans-serif'
      ctx.fillText('Leaderboard', W / 2, scoreY + 95)

      ctx.font = '11px monospace'
      board.slice(0, 5).forEach((entry, i) => {
        const lbDiff = entry.score - TOTAL_PAR
        ctx.fillStyle = lbDiff < 0 ? '#4CAF50' : lbDiff > 0 ? '#f44336' : '#aaa'
        ctx.fillText(
          `${i + 1}. ${entry.score} (${lbDiff > 0 ? '+' : ''}${lbDiff}) — ${entry.date}`,
          W / 2, scoreY + 115 + i * 18
        )
      })
    }

    // Play again prompt
    ctx.fillStyle = COLORS.pin
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText('Press SPACE to play again', W / 2, H - 30)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a2f23] rounded-2xl shadow-2xl overflow-hidden" style={{ width: W + 20 }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">⛳</span>
            <span className="text-white font-bold text-sm">OC Builds Golf</span>
            <span className="text-white/40 text-xs ml-2">
              {ui.state === 'scorecard' ? 'Final Score' :
                `Hole ${ui.hole + 1}/9 · Par ${HOLES[ui.hole].par} · ${HOLES[ui.hole].name}`}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs font-mono">
              {CLUBS[ui.club].name} · Strokes: {ui.strokes[ui.hole]}
            </span>
            <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors text-lg">✕</button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block"
          style={{ margin: '0 auto' }}
          tabIndex={0}
          onFocus={() => {}}
        />

        <div className="text-center text-white/30 text-xs py-2 border-t border-white/10">
          {ui.state === 'club_select' && '← → Select club · Enter/Space to confirm'}
          {ui.state === 'aiming' && '← → Aim · Space to set power'}
          {ui.state === 'power' && 'Space to set power'}
          {ui.state === 'swing' && 'Space for accuracy — hit the green zone!'}
          {ui.state === 'flight' && 'Ball in flight...'}
          {ui.state === 'putt_aim' && '← → Aim putt · Space to set power'}
          {ui.state === 'putt_power' && 'Space to putt'}
          {ui.state === 'putt_roll' && 'Rolling...'}
          {ui.state === 'holed' && 'Space to continue'}
          {ui.state === 'scorecard' && 'Space to play again · Esc to close'}
        </div>
      </div>
    </div>
  )
}
