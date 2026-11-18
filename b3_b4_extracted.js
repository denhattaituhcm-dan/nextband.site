    /* ==========================================================
       LOGIC BÀI 3: CẤU TRÚC LỚP VỎ ELECTRON NGUYÊN TỬ
       ========================================================== */

    let currentPartB3 = 'part1';

    function switchPartB3(partId) {
      currentPartB3 = partId;
      ['part1', 'part2', 'part3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b3-' + p);
        const sec = document.getElementById('b3-sec-' + p);
        const panel = document.getElementById('b3-panel-' + p);
        if (btn) btn.classList.toggle('active', p === partId);
        if (sec) sec.style.display = (p === partId) ? 'block' : 'none';
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (window.renderMathInElement) {
        const secActive = document.getElementById('b3-sec-' + partId);
        if (secActive) {
          renderMathInElement(secActive, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        }
      }

      setTimeout(() => {
        if (partId === 'part1') {
          resizeB3CloudCanvas();
        } else if (partId === 'part2') {
          resizeB3OrbitalCanvas();
        } else if (partId === 'part3') {
          renderB3OrbitalBoxes();
        }
      }, 50);
    }

    function checkB3Quiz(btn, isCorrect, feedbackText) {
      const parent = btn.closest('.quiz-card');
      const allBtns = parent.querySelectorAll('.opt-btn');
      allBtns.forEach(b => b.classList.remove('selected', 'correct', 'wrong'));
      
      btn.classList.add('selected');
      if (isCorrect) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }

      const fb = parent.querySelector('.quiz-feedback');
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = isCorrect ? '#f0fdf4' : '#fef2f2';
        fb.style.color = isCorrect ? '#166534' : '#991b1b';
        fb.style.border = '1px solid ' + (isCorrect ? '#bbf7d0' : '#fecaca');
        fb.innerHTML = (isCorrect ? '✅ ' : '❌ ') + feedbackText;
      }
    }

    /* ----------------------------------------------------------
       TAB 1: MÔ PHỎNG ĐÁM MÂY ELECTRON VS HÀNH TINH BOHR
       ---------------------------------------------------------- */
    let b3CloudCanvas, b3CloudCtx;
    let b3SimRunning = true;
    let b3CurrentAtom = 'H'; // 'H', 'He', 'C', 'Ne'
    let b3AnimFrameId = null;
    let b3AngleBohr = 0;
    let b3CloudDots = [];

    const ATOM_CONFIGS = {
      'H':  { Z: 1,  name: 'Hydrogen',  electrons: 1,  radius: 90,  color: '#0284c7' },
      'He': { Z: 2,  name: 'Helium',    electrons: 2,  radius: 80,  color: '#0284c7' },
      'C':  { Z: 6,  name: 'Carbon',    electrons: 6,  radius: [60, 110], color: '#0284c7' },
      'Ne': { Z: 10, name: 'Neon',      electrons: 10, radius: [50, 115], color: '#0284c7' }
    };

    function initB3CloudSim() {
      b3CloudCanvas = document.getElementById('b3CloudCanvas');
      if (!b3CloudCanvas) return;
      b3CloudCtx = b3CloudCanvas.getContext('2d');
      resizeB3CloudCanvas();
      generateB3CloudDots();
      startB3CloudLoop();
    }

    function resizeB3CloudCanvas() {
      if (!b3CloudCanvas) return;
      const rect = b3CloudCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b3CloudCanvas.width = rect.width * dpr;
      b3CloudCanvas.height = rect.height * dpr;
      if (b3CloudCtx) b3CloudCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawB3CloudSim();
    }

    function generateB3CloudDots() {
      b3CloudDots = [];
      const numDots = 3000;
      const cfg = ATOM_CONFIGS[b3CurrentAtom];
      
      for (let i = 0; i < numDots; i++) {
        // Phân bố xác suất theo cơ học lượng tử |ψ(r)|² ∝ r² * exp(-2r/a0)
        // Tạo phân bố mật độ cao gần tâm và giảm dần về rìa
        let u1 = Math.random();
        let u2 = Math.random();
        // Box-Muller transform tạo phân bố Gauss hoặc phân bố mũ
        let rNorm = Math.sqrt(-2 * Math.log(u1 + 0.0001));
        let theta = 2 * Math.PI * u2;
        
        let scale = (b3CurrentAtom === 'H' || b3CurrentAtom === 'He') ? 42 : 55;
        let r = rNorm * scale;
        
        // Thêm một chút nhiễu orbital p nếu là C hoặc Ne
        if (b3CurrentAtom === 'C' || b3CurrentAtom === 'Ne') {
          if (Math.random() < 0.6) {
            // định hướng quả tạ px/py
            let pAngle = Math.random() < 0.5 ? 0 : Math.PI/2;
            let pSpread = (Math.random() - 0.5) * 0.8;
            theta = pAngle + pSpread;
            r = (0.5 + Math.random() * 1.5) * 60;
          }
        }

        b3CloudDots.push({
          x: r * Math.cos(theta),
          y: r * Math.sin(theta),
          alpha: 0.15 + Math.random() * 0.55,
          size: 1 + Math.random() * 1.8
        });
      }

      const counter = document.getElementById('b3-cloud-dots-count');
      if (counter) counter.innerText = `${numDots.toLocaleString()} điểm xác suất`;
    }

    function selectB3AtomCloud(atom) {
      b3CurrentAtom = atom;
      ['H', 'He', 'C', 'Ne'].forEach(a => {
        const btn = document.getElementById('b3-atom-' + a);
        if (btn) btn.classList.toggle('active', a === atom);
      });
      generateB3CloudDots();
      drawB3CloudSim();
    }

    function toggleB3CloudSim() {
      b3SimRunning = !b3SimRunning;
      const icon = document.getElementById('b3-sim-icon');
      const text = document.getElementById('b3-sim-text');
      if (icon) icon.innerText = b3SimRunning ? '⏸' : '▶';
      if (text) text.innerText = b3SimRunning ? 'Tạm dừng' : 'Tiếp tục';
      if (b3SimRunning) startB3CloudLoop();
    }

    function resetB3CloudSim() {
      b3AngleBohr = 0;
      generateB3CloudDots();
      drawB3CloudSim();
    }

    function startB3CloudLoop() {
      if (b3AnimFrameId) cancelAnimationFrame(b3AnimFrameId);
      function loop() {
        if (b3SimRunning) {
          b3AngleBohr += 0.035;
          drawB3CloudSim();
          b3AnimFrameId = requestAnimationFrame(loop);
        }
      }
      b3AnimFrameId = requestAnimationFrame(loop);
    }

    function drawB3CloudSim() {
      if (!b3CloudCanvas || !b3CloudCtx) return;
      const w = b3CloudCanvas.parentElement.clientWidth;
      const h = b3CloudCanvas.parentElement.clientHeight;
      const ctx = b3CloudCtx;

      ctx.clearRect(0, 0, w, h);

      // Nền chia đôi: Vết ngăn cách giữa 2 mô hình
      ctx.save();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.restore();

      const cxLeft = w / 4;
      const cxRight = (w * 3) / 4;
      const cy = h / 2;

      // ----------------- VẾ TRÁI: MÔ HÌNH BOHR CỔ ĐIỂN -----------------
      ctx.save();
      // Tiêu đề
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#be123c';
      ctx.textAlign = 'center';
      ctx.fillText('MÔ HÌNH RUTHERFORD - BOHR', cxLeft, 32);
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('(Quỹ đạo đường tròn cố định)', cxLeft, 50);

      // Quỹ đạo đường tròn
      const cfg = ATOM_CONFIGS[b3CurrentAtom];
      const radii = Array.isArray(cfg.radius) ? cfg.radius : [cfg.radius];
      
      radii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cxLeft, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '10.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`Lớp ${idx + 1}`, cxLeft + r + 14, cy - 4);
      });

      // Hạt nhân (Tâm)
      ctx.beginPath();
      ctx.arc(cxLeft, cy, 14, 0, 2 * Math.PI);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`+${cfg.Z}`, cxLeft, cy);

      // Các electron quay trên đường tròn
      ctx.textBaseline = 'alphabetic';
      if (b3CurrentAtom === 'H') {
        const ex = cxLeft + radii[0] * Math.cos(b3AngleBohr);
        const ey = cy + radii[0] * Math.sin(b3AngleBohr);
        drawSingleElectron(ctx, ex, ey, 'e⁻');
      } else if (b3CurrentAtom === 'He') {
        const e1x = cxLeft + radii[0] * Math.cos(b3AngleBohr);
        const e1y = cy + radii[0] * Math.sin(b3AngleBohr);
        const e2x = cxLeft + radii[0] * Math.cos(b3AngleBohr + Math.PI);
        const e2y = cy + radii[0] * Math.sin(b3AngleBohr + Math.PI);
        drawSingleElectron(ctx, e1x, e1y, 'e₁');
        drawSingleElectron(ctx, e2x, e2y, 'e₂');
      } else if (b3CurrentAtom === 'C') {
        // Lớp 1 có 2e
        for (let i = 0; i < 2; i++) {
          let ang = b3AngleBohr * 1.5 + i * Math.PI;
          drawSingleElectron(ctx, cxLeft + radii[0] * Math.cos(ang), cy + radii[0] * Math.sin(ang));
        }
        // Lớp 2 có 4e
        for (let i = 0; i < 4; i++) {
          let ang = -b3AngleBohr + i * (Math.PI / 2);
          drawSingleElectron(ctx, cxLeft + radii[1] * Math.cos(ang), cy + radii[1] * Math.sin(ang));
        }
      } else if (b3CurrentAtom === 'Ne') {
        // Lớp 1 có 2e
        for (let i = 0; i < 2; i++) {
          let ang = b3AngleBohr * 1.8 + i * Math.PI;
          drawSingleElectron(ctx, cxLeft + radii[0] * Math.cos(ang), cy + radii[0] * Math.sin(ang));
        }
        // Lớp 2 có 8e
        for (let i = 0; i < 8; i++) {
          let ang = -b3AngleBohr * 0.8 + i * (Math.PI / 4);
          drawSingleElectron(ctx, cxLeft + radii[1] * Math.cos(ang), cy + radii[1] * Math.sin(ang));
        }
      }
      ctx.restore();

      // ----------------- VẾ PHẢI: MÔ HÌNH ĐÁM MÂY HIỆN ĐẠI (AO) -----------------
      ctx.save();
      // Tiêu đề
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0369a1';
      ctx.textAlign = 'center';
      ctx.fillText('MÔ HÌNH HIỆN ĐẠI (ĐÁM MÂY ELECTRON)', cxRight, 32);
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('(Vùng không gian xác suất tìm thấy ≥ 90%)', cxRight, 50);

      // Đường ranh giới AO 90% (dashed circle tượng trưng)
      ctx.beginPath();
      ctx.arc(cxRight, cy, 105, 0, 2 * Math.PI);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0284c7';
      ctx.fillText('Ranh giới Orbital (90%)', cxRight, cy + 125);

      // Vẽ đám mây các chấm
      b3CloudDots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(cxRight + dot.x, cy + dot.y, dot.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(2, 132, 199, ${dot.alpha})`;
        ctx.fill();
      });

      // Hạt nhân ở tâm
      ctx.beginPath();
      ctx.arc(cxRight, cy, 14, 0, 2 * Math.PI);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`+${cfg.Z}`, cxRight, cy);

      ctx.restore();
    }

    function drawSingleElectron(ctx, x, y, label) {
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#0284c7';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (label) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('-', x, y - 0.5);
      }
    }

    /* ----------------------------------------------------------
       TAB 2: HÌNH HỌC ORBITAL 3D (s, px, py, pz)
       ---------------------------------------------------------- */
    let b3OrbitalCanvas, b3OrbitalCtx;
    let b3RotX = 0.35, b3RotY = -0.55;
    let b3IsDragging = false;
    let b3LastMouseX = 0, b3LastMouseY = 0;
    let b3ActiveOrbitals = { s: true, px: true, py: true, pz: true };

    function initB3Orbital3D() {
      b3OrbitalCanvas = document.getElementById('b3OrbitalCanvas');
      if (!b3OrbitalCanvas) return;
      b3OrbitalCtx = b3OrbitalCanvas.getContext('2d');
      
      const box = document.getElementById('b3-orbital-canvas-box');
      box.addEventListener('mousedown', (e) => {
        b3IsDragging = true;
        b3LastMouseX = e.clientX;
        b3LastMouseY = e.clientY;
        box.style.cursor = 'grabbing';
      });
      window.addEventListener('mousemove', (e) => {
        if (!b3IsDragging) return;
        const dx = e.clientX - b3LastMouseX;
        const dy = e.clientY - b3LastMouseY;
        b3RotY += dx * 0.01;
        b3RotX += dy * 0.01;
        b3LastMouseX = e.clientX;
        b3LastMouseY = e.clientY;
        drawB3Orbital3D();
      });
      window.addEventListener('mouseup', () => {
        b3IsDragging = false;
        if (box) box.style.cursor = 'grab';
      });

      resizeB3OrbitalCanvas();
    }

    function resizeB3OrbitalCanvas() {
      if (!b3OrbitalCanvas) return;
      const rect = b3OrbitalCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b3OrbitalCanvas.width = rect.width * dpr;
      b3OrbitalCanvas.height = rect.height * dpr;
      if (b3OrbitalCtx) b3OrbitalCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawB3Orbital3D();
    }

    function toggleB3OrbitalType(type) {
      b3ActiveOrbitals[type] = !b3ActiveOrbitals[type];
      const btn = document.getElementById('btn-orb-' + type);
      if (btn) btn.classList.toggle('active', b3ActiveOrbitals[type]);
      drawB3Orbital3D();
    }

    function setB3OrbitalPreset(preset) {
      if (preset === 'all_p') {
        b3ActiveOrbitals = { s: false, px: true, py: true, pz: true };
      } else if (preset === 'all') {
        b3ActiveOrbitals = { s: true, px: true, py: true, pz: true };
      }
      ['s', 'px', 'py', 'pz'].forEach(t => {
        const btn = document.getElementById('btn-orb-' + t);
        if (btn) btn.classList.toggle('active', b3ActiveOrbitals[t]);
      });
      drawB3Orbital3D();
    }

    function resetB3Orbital3DView() {
      b3RotX = 0.35;
      b3RotY = -0.55;
      drawB3Orbital3D();
    }

    // Phép chiếu 3D -> 2D Isometric
    function project3D(x, y, z, cx, cy) {
      // Xoay quanh trục Y
      let cosY = Math.cos(b3RotY), sinY = Math.sin(b3RotY);
      let x1 = x * cosY + z * sinY;
      let z1 = -x * sinY + z * cosY;

      // Xoay quanh trục X
      let cosX = Math.cos(b3RotX), sinX = Math.sin(b3RotX);
      let y2 = y * cosX - z1 * sinX;
      let z2 = y * sinX + z1 * cosX;

      // Chiếu phối cảnh nhẹ
      let scale = 1.0;
      return {
        x: cx + x1 * scale,
        y: cy - y2 * scale, // trục Y hướng lên
        depth: z2
      };
    }

    function drawB3Orbital3D() {
      if (!b3OrbitalCanvas || !b3OrbitalCtx) return;
      const w = b3OrbitalCanvas.parentElement.clientWidth;
      const h = b3OrbitalCanvas.parentElement.clientHeight;
      const ctx = b3OrbitalCtx;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const axisLen = 140;

      // 1. VẼ 3 TRỤC TOẠ ĐỘ KHÔNG GIAN OX, OY, OZ
      const origin = project3D(0, 0, 0, cx, cy);
      const axisX = project3D(axisLen, 0, 0, cx, cy);
      const axisY = project3D(0, axisLen, 0, cx, cy);
      const axisZ = project3D(0, 0, axisLen, cx, cy);
      
      const negAxisX = project3D(-axisLen, 0, 0, cx, cy);
      const negAxisY = project3D(0, -axisLen, 0, cx, cy);
      const negAxisZ = project3D(0, 0, -axisLen, cx, cy);

      // Đường âm nét đứt
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      [[negAxisX, origin], [negAxisY, origin], [negAxisZ, origin]].forEach(([p1, p2]) => {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });
      ctx.restore();

      // Đường dương nét liền có mũi tên
      draw3DAxisLine(ctx, origin, axisX, '#ef4444', 'x (Ox)');
      draw3DAxisLine(ctx, origin, axisY, '#10b981', 'y (Oy)');
      draw3DAxisLine(ctx, origin, axisZ, '#0284c7', 'z (Oz)');

      // 2. VẼ CÁC ORBITAL
      // Orbital s: Mặt cầu mờ bao quanh tâm
      if (b3ActiveOrbitals.s) {
        ctx.save();
        const rSphere = 46;
        let grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, rSphere);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
        grad.addColorStop(0.7, 'rgba(14, 165, 233, 0.25)');
        grad.addColorStop(1, 'rgba(2, 132, 199, 0.05)');

        ctx.beginPath();
        ctx.arc(cx, cy, rSphere, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#0369a1';
        ctx.fillText('Orbital s', cx + rSphere + 8, cy);
        ctx.restore();
      }

      // Orbital px: Hình số 8 dọc trục X (Màu cam đỏ)
      if (b3ActiveOrbitals.px) {
        drawLobePair(ctx, cx, cy, 'x', '#f97316', 'px');
      }

      // Orbital py: Hình số 8 dọc trục Y (Màu lục ngọc)
      if (b3ActiveOrbitals.py) {
        drawLobePair(ctx, cx, cy, 'y', '#10b981', 'py');
      }

      // Orbital pz: Hình số 8 dọc trục Z (Màu tím lam)
      if (b3ActiveOrbitals.pz) {
        drawLobePair(ctx, cx, cy, 'z', '#8b5cf6', 'pz');
      }

      // Hạt nhân ở tâm toạ độ
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    function draw3DAxisLine(ctx, pStart, pEnd, color, label) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 11.5px "JetBrains Mono", monospace';
      ctx.fillStyle = color;
      ctx.fillText(label, pEnd.x + 6, pEnd.y + 4);
      ctx.restore();
    }

    // Vẽ 2 thuỳ (lobe) hình quả tạ cho orbital p
    function drawLobePair(ctx, cx, cy, axis, color, label) {
      ctx.save();
      const samples = 36;
      const lobeLen = 78;

      [1, -1].forEach(sign => {
        let pts = [];
        for (let i = 0; i <= samples; i++) {
          let u = (i / samples) * Math.PI; // 0 -> PI
          let d = Math.sin(u) * lobeLen * sign;
          let r = Math.sin(u) * 22; // độ dày của thuỳ

          // tuỳ theo trục
          let x = 0, y = 0, z = 0;
          if (axis === 'x') {
            x = d;
            y = r * Math.cos(u * 2);
            z = r * Math.sin(u * 2);
          } else if (axis === 'y') {
            y = d;
            x = r * Math.cos(u * 2);
            z = r * Math.sin(u * 2);
          } else if (axis === 'z') {
            z = d;
            x = r * Math.cos(u * 2);
            y = r * Math.sin(u * 2);
          }
          pts.push(project3D(x, y, z, cx, cy));
        }

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.closePath();
        
        ctx.fillStyle = color.replace(')', ', 0.35)').replace('rgb', 'rgba').replace('#f97316', 'rgba(249,115,22,0.4)').replace('#10b981', 'rgba(16,185,129,0.4)').replace('#8b5cf6', 'rgba(139,92,246,0.4)');
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.restore();
    }

    /* ----------------------------------------------------------
       TAB 3: Ô ORBITAL & CẤU HÌNH ELECTRON (20 NGUYÊN TỐ)
       ---------------------------------------------------------- */
    const ELEMENTS_20 = [
      { Z: 1,  sym: 'H',  name: 'Hydrogen',   type: 'Phi kim' },
      { Z: 2,  sym: 'He', name: 'Helium',     type: 'Khí hiếm' },
      { Z: 3,  sym: 'Li', name: 'Lithium',    type: 'Kim loại' },
      { Z: 4,  sym: 'Be', name: 'Beryllium',  type: 'Kim loại' },
      { Z: 5,  sym: 'B',  name: 'Boron',      type: 'Phi kim' },
      { Z: 6,  sym: 'C',  name: 'Carbon',     type: 'Phi kim' },
      { Z: 7,  sym: 'N',  name: 'Nitrogen',   type: 'Phi kim' },
      { Z: 8,  sym: 'O',  name: 'Oxygen',     type: 'Phi kim' },
      { Z: 9,  sym: 'F',  name: 'Fluorine',   type: 'Phi kim' },
      { Z: 10, sym: 'Ne', name: 'Neon',       type: 'Khí hiếm' },
      { Z: 11, sym: 'Na', name: 'Sodium',     type: 'Kim loại' },
      { Z: 12, sym: 'Mg', name: 'Magnesium',  type: 'Kim loại' },
      { Z: 13, sym: 'Al', name: 'Aluminium',  type: 'Kim loại' },
      { Z: 14, sym: 'Si', name: 'Silicon',    type: 'Phi kim' },
      { Z: 15, sym: 'P',  name: 'Phosphorus', type: 'Phi kim' },
      { Z: 16, sym: 'S',  name: 'Sulfur',     type: 'Phi kim' },
      { Z: 17, sym: 'Cl', name: 'Chlorine',   type: 'Phi kim' },
      { Z: 18, sym: 'Ar', name: 'Argon',      type: 'Khí hiếm' },
      { Z: 19, sym: 'K',  name: 'Potassium',  type: 'Kim loại' },
      { Z: 20, sym: 'Ca', name: 'Calcium',    type: 'Kim loại' }
    ];

    // Các phân lớp theo thứ tự năng lượng Aufbau đến 20e
    const SUBLEVELS = [
      { name: '1s', n: 1, boxes: 1, maxE: 2 },
      { name: '2s', n: 2, boxes: 1, maxE: 2 },
      { name: '2p', n: 2, boxes: 3, maxE: 6 },
      { name: '3s', n: 3, boxes: 1, maxE: 2 },
      { name: '3p', n: 3, boxes: 3, maxE: 6 },
      { name: '4s', n: 4, boxes: 1, maxE: 2 }
    ];

    let b3CurrentZ = 1;

    function initB3OrbitalLab() {
      buildB3ElementGrid();
      renderB3OrbitalBoxes();
    }

    function buildB3ElementGrid() {
      const grid = document.getElementById('b3-element-grid');
      if (!grid) return;
      grid.innerHTML = '';

      ELEMENTS_20.forEach(el => {
        const btn = document.createElement('button');
        btn.id = 'b3-el-btn-' + el.Z;
        btn.style.cssText = 'padding:6px 2px; border:1px solid #cbd5e1; border-radius:6px; background:#fff; font-family:"JetBrains Mono",monospace; font-size:12px; font-weight:700; cursor:pointer; display:flex; flex-direction:column; align-items:center; transition:all 0.15s;';
        btn.innerHTML = `<span style="font-size:9px; color:#64748b;">${el.Z}</span><span>${el.sym}</span>`;
        btn.onclick = () => selectB3ElementZ(el.Z);
        grid.appendChild(btn);
      });
      updateB3ElementGridUI();
    }

    function updateB3ElementGridUI() {
      ELEMENTS_20.forEach(el => {
        const btn = document.getElementById('b3-el-btn-' + el.Z);
        if (btn) {
          if (el.Z === b3CurrentZ) {
            btn.style.background = '#0284c7';
            btn.style.color = '#fff';
            btn.style.borderColor = '#0284c7';
            btn.querySelector('span').style.color = '#e0f2fe';
          } else {
            btn.style.background = '#fff';
            btn.style.color = '#1e293b';
            btn.style.borderColor = '#cbd5e1';
            btn.querySelector('span').style.color = '#64748b';
          }
        }
      });

      const tag = document.getElementById('b3-element-info-tag');
      const cur = ELEMENTS_20[b3CurrentZ - 1];
      if (tag && cur) {
        tag.innerText = `${cur.name} (${cur.sym}) • Z = ${cur.Z}`;
      }
    }

    function selectB3ElementZ(z) {
      b3CurrentZ = Math.max(1, Math.min(20, z));
      updateB3ElementGridUI();
      renderB3OrbitalBoxes();
    }

    function stepB3Electron(delta) {
      selectB3ElementZ(b3CurrentZ + delta);
    }

    function resetB3Electrons() {
      selectB3ElementZ(1);
    }

    function renderB3OrbitalBoxes() {
      const container = document.getElementById('b3-orbital-boxes-flow');
      if (!container) return;
      container.innerHTML = '';

      let remainingE = b3CurrentZ;
      let fullConfigStr = [];
      let sublevelCounts = {};
      let valenceElectrons = 0;
      let unpairedCount = 0;

      // Phân bổ electron vào từng phân lớp theo Aufbau, Hund, Pauli
      SUBLEVELS.forEach(sub => {
        const putE = Math.min(remainingE, sub.maxE);
        remainingE -= putE;
        sublevelCounts[sub.name] = putE;

        if (putE > 0) {
          fullConfigStr.push(`${sub.name}<sup>${putE}</sup>`);
        }

        // Tạo thẻ UI cho phân lớp
        const subCard = document.createElement('div');
        subCard.style.cssText = 'display:flex; flex-direction:column; align-items:center; gap:6px; background:#f1f5f9; padding:8px 10px; border-radius:8px; border:1px solid #e2e8f0;';

        // Hàng chứa các ô vuông orbital
        const boxRow = document.createElement('div');
        boxRow.style.cssText = 'display:flex; gap:3px;';

        // Phân phối vào từng ô theo quy tắc Hund: Độc thân trước, ghép đôi sau
        let ePerBox = [];
        for (let b = 0; b < sub.boxes; b++) ePerBox.push(0);

        // Lượt 1: điền 1e vào mỗi ô
        for (let b = 0; b < sub.boxes; b++) {
          if (b < putE) ePerBox[b]++;
        }
        // Lượt 2: ghép đôi các electron còn lại
        if (putE > sub.boxes) {
          for (let b = 0; b < sub.boxes; b++) {
            if (sub.boxes + b < putE) ePerBox[b]++;
          }
        }

        // Tạo từng ô HTML
        for (let b = 0; b < sub.boxes; b++) {
          const countInThisBox = ePerBox[b];
          if (countInThisBox === 1) unpairedCount++;

          const boxElem = document.createElement('div');
          boxElem.style.cssText = 'width:34px; height:36px; border:2px solid ' + (countInThisBox > 0 ? '#0284c7' : '#cbd5e1') + '; background:#fff; border-radius:4px; display:flex; align-items:center; justify-content:center; gap:3px; font-weight:700; font-size:15px;';

          if (countInThisBox === 1) {
            boxElem.innerHTML = '<span style="color:#0284c7; transform:translateY(-1px);">↿</span>';
          } else if (countInThisBox === 2) {
            boxElem.innerHTML = '<span style="color:#0284c7; transform:translateY(-1px);">↿</span><span style="color:#e11d48; transform:translateY(1px);">⇂</span>';
          }
          boxRow.appendChild(boxElem);
        }

        subCard.appendChild(boxRow);

        // Nhãn tên phân lớp
        const label = document.createElement('div');
        label.style.cssText = 'font-family:"JetBrains Mono",monospace; font-size:12px; font-weight:700; color:' + (putE > 0 ? '#0369a1' : '#94a3b8');
        label.innerText = sub.name;
        subCard.appendChild(label);

        container.appendChild(subCard);
      });

      // Xác định số e lớp ngoài cùng
      // Lớp ngoài cùng là lớp có n lớn nhất có electron
      let maxN = 1;
      SUBLEVELS.forEach(sub => {
        if (sublevelCounts[sub.name] > 0 && sub.n > maxN) {
          maxN = sub.n;
        }
      });
      SUBLEVELS.forEach(sub => {
        if (sub.n === maxN) {
          valenceElectrons += sublevelCounts[sub.name] || 0;
        }
      });

      // Cập nhật Cấu hình đầy đủ
      const fullConfigElem = document.getElementById('b3-full-config');
      if (fullConfigElem) fullConfigElem.innerHTML = fullConfigStr.join(' ');

      // Cấu hình thu gọn
      const shortConfigElem = document.getElementById('b3-short-config');
      let shortStr = fullConfigStr.join(' ');
      if (b3CurrentZ >= 19) {
        // [Ar] 4s...
        const subStr = fullConfigStr.slice(5).join(' ');
        shortStr = `[Ar] ${subStr}`;
      } else if (b3CurrentZ >= 11) {
        // [Ne] 3s...
        const subStr = fullConfigStr.slice(3).join(' ');
        shortStr = `[Ne] ${subStr}`;
      } else if (b3CurrentZ >= 3) {
        // [He] 2s...
        const subStr = fullConfigStr.slice(1).join(' ');
        shortStr = `[He] ${subStr}`;
      }
      if (shortConfigElem) shortConfigElem.innerHTML = shortStr;

      // Cập nhật các thông số phân tích
      const elInfo = ELEMENTS_20[b3CurrentZ - 1];
      const valElem = document.getElementById('b3-valence-e');
      const unpairElem = document.getElementById('b3-unpaired-e');
      const badge = document.getElementById('b3-property-badge');
      const desc = document.getElementById('b3-property-desc');

      if (valElem) valElem.innerText = `${valenceElectrons} (Lớp n = ${maxN})`;
      if (unpairElem) unpairElem.innerText = `${unpairedCount} electron`;

      if (badge && desc && elInfo) {
        badge.innerText = elInfo.type;
        if (elInfo.type === 'Kim loại') {
          badge.style.background = '#e0f2fe';
          badge.style.color = '#0369a1';
          desc.innerText = `Có ${valenceElectrons}e lớp ngoài cùng, xu hướng nhường ${valenceElectrons}e để tạo cation bền.`;
        } else if (elInfo.type === 'Phi kim') {
          badge.style.background = '#fef3c7';
          badge.style.color = '#92400e';
          desc.innerText = `Có ${valenceElectrons}e lớp ngoài cùng, xu hướng nhận ${8 - valenceElectrons}e hoặc góp chung e.`;
        } else {
          badge.style.background = '#f0fdf4';
          badge.style.color = '#15803d';
          desc.innerText = `Lớp ngoài cùng bão hoà bền vững (${valenceElectrons}e), rất trơ về mặt hoá học.`;
        }
      }
    }





    /* ==========================================================
       LOGIC BÀI 4: ÔN TẬP CHƯƠNG 1 (CẤU TẠO NGUYÊN TỬ)
       ========================================================== */

    let currentPartB4 = 'part1';

    function switchPartB4(partId) {
      currentPartB4 = partId;
      ['part1', 'part2', 'part3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b4-' + p);
        const sec = document.getElementById('b4-sec-' + p);
        const panel = document.getElementById('b4-panel-' + p);
        if (btn) btn.classList.toggle('active', p === partId);
        if (sec) sec.style.display = (p === partId) ? 'block' : 'none';
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (window.renderMathInElement) {
        const secActive = document.getElementById('b4-sec-' + partId);
        if (secActive) {
          renderMathInElement(secActive, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        }
      }

      setTimeout(() => {
        if (partId === 'part1') {
          resizeB4MindmapCanvas();
        } else if (partId === 'part3') {
          renderB4CurrentQuestion();
        }
      }, 50);
    }

    /* ----------------------------------------------------------
       TAB 1: SƠ ĐỒ TƯ DUY TƯƠNG TÁC (CANVAS MINDMAP)
       ---------------------------------------------------------- */
    let b4MindmapCanvas, b4MindmapCtx;
    let b4MmPanX = 0, b4MmPanY = 0;
    let b4MmDragging = false, b4MmLastX = 0, b4MmLastY = 0;
    let b4MmHoverNode = null;
    let b4MmFilter = 'all';

    // Danh sách Node trong mạng lưới kiến thức Chương 1
    const MINDMAP_NODES = [
      // Node Trung tâm
      { id: 'root', x: 0, y: 0, r: 42, label: 'CẤU TẠO\nNGUYÊN TỬ', color: '#0284c7', category: 'all', desc: 'Nguyên tử là hạt vô cùng nhỏ bé cấu tạo nên mọi chất, trung hoà về điện tích, gồm hạt nhân ở tâm và lớp vỏ electron.' },
      
      // Nhánh 1: Hạt nhân
      { id: 'hatnhan', x: -180, y: -90, r: 34, label: 'HẠT NHÂN\n(p & n)', color: '#e11d48', category: 'hatnhan', desc: 'Hạt nhân nằm ở tâm nguyên tử, mang điện tích dương (+Z), chiếm hầu hết khối lượng nguyên tử (> 99.95%).' },
      { id: 'proton', x: -320, y: -140, r: 28, label: 'Proton (p)\nq=+1, 1 amu', color: '#f43f5e', category: 'hatnhan', desc: 'Hạt proton mang điện tích nguyên tố dương (+1e = +1.602×10⁻¹⁹ C), khối lượng xấp xỉ 1 amu (1.672×10⁻²⁷ kg).' },
      { id: 'neutron', x: -320, y: -40, r: 28, label: 'Neutron (n)\nq=0, 1 amu', color: '#64748b', category: 'hatnhan', desc: 'Hạt neutron không mang điện (q=0), khối lượng xấp xỉ 1 amu (1.675×10⁻²⁷ kg). Giữ vai trò liên kết bền vững hạt nhân.' },
      { id: 'sokhoi', x: -180, y: -210, r: 28, label: 'Số khối A\nA = Z + N', color: '#be123c', category: 'hatnhan', desc: 'Số khối A bằng tổng số proton (Z) và số neutron (N) trong hạt nhân: A = Z + N.' },

      // Nhánh 2: Lớp vỏ electron
      { id: 'lopvo', x: 180, y: -90, r: 34, label: 'VỎ NGUYÊN TỬ\n(Electron)', color: '#0284c7', category: 'orbital', desc: 'Lớp vỏ gồm các electron mang điện âm (q=-1), chuyển động cực nhanh xung quanh hạt nhân trong các orbital nguyên tử (AO).' },
      { id: 'electron', x: 320, y: -140, r: 28, label: 'Electron (e)\nq=-1, ≈0 amu', color: '#0ea5e9', category: 'orbital', desc: 'Khối lượng electron rất nhỏ (9.109×10⁻³¹ kg ≈ 0.00055 amu, chỉ bằng khoảng 1/1836 khối lượng proton) nên khối lượng nguyên tử tập trung hầu hết ở hạt nhân.' },
      { id: 'orbital', x: 320, y: -40, r: 28, label: 'Orbital AO\n(s hình cầu, p tạ)', color: '#0369a1', category: 'orbital', desc: 'Orbital nguyên tử là khu vực không gian xung quanh hạt nhân có xác suất tìm thấy electron ≥ 90%. AO s hình cầu, AO p gồm 3 orbital px, py, pz hình số 8 nổi.' },
      { id: 'quytac', x: 180, y: -210, r: 28, label: 'Quy tắc Aufbau\nPauli & Hund', color: '#0284c7', category: 'orbital', desc: 'Aufbau (mức năng lượng từ thấp đến cao), Pauli (tối đa 2e ngược chiều tự quay), Hund (số electron độc thân cực đại).' },

      // Nhánh 3: Nguyên tố hoá học & Đồng vị
      { id: 'nguyento', x: -180, y: 120, r: 34, label: 'NGUYÊN TỐ\n& ĐỒNG VỊ', color: '#f59e0b', category: 'nguyento', desc: 'Tập hợp các nguyên tử có cùng điện tích hạt nhân (cùng số hiệu Z). Kí hiệu nguyên tử: ᴬ_Z X.' },
      { id: 'dongvi', x: -320, y: 100, r: 28, label: 'Đồng vị\nCùng Z, khác N', color: '#d97706', category: 'nguyento', desc: 'Các đồng vị là các nguyên tử của cùng một nguyên tố có cùng số proton nhưng khác số neutron, do đó số khối A khác nhau.' },
      { id: 'ntk_tb', x: -320, y: 180, r: 28, label: 'NTK TB (Ā)\nPhổ MS', color: '#b45309', category: 'nguyento', desc: 'Nguyên tử khối trung bình Ā được tính từ tỷ lệ phần trăm số nguyên tử của từng đồng vị xác định bằng thực nghiệm đo phổ khối lượng (MS).' },

      // Nhánh 4: Cấu hình electron & Tính chất hoá học
      { id: 'cauhinh', x: 180, y: 120, r: 34, label: 'CẤU HÌNH E\n& TÍNH CHẤT', color: '#10b981', category: 'orbital', desc: 'Cấu hình electron biểu diễn sự phân bố e vào các lớp và phân lớp. Số electron ngoài cùng quyết định tính chất hoá học cơ bản.' },
      { id: 'kimloai', x: 320, y: 80, r: 28, label: 'Kim loại\n1, 2, 3 e ngoài', color: '#059669', category: 'orbital', desc: 'Nguyên tử có 1, 2 hoặc 3 electron ở lớp ngoài cùng thường dễ nhường electron trong phản ứng hoá học, mang tính kim loại (trừ H, He, B).' },
      { id: 'phikim', x: 320, y: 160, r: 28, label: 'Phi kim\n5, 6, 7 e ngoài', color: '#047857', category: 'orbital', desc: 'Nguyên tử có 5, 6 hoặc 7 electron ở lớp ngoài cùng có xu hướng nhận thêm electron hoặc góp chung electron, mang tính phi kim.' },
      { id: 'khihiem', x: 230, y: 220, r: 26, label: 'Khí hiếm\n8 e (hoặc 2e)', color: '#0f766e', category: 'orbital', desc: 'Nguyên tử có 8 electron ngoài cùng (hoặc 2e của Helium) đạt cấu trúc bão hoà đặc biệt bền vững, rất khó tham gia phản ứng hoá học.' }
    ];

    const MINDMAP_LINKS = [
      { from: 'root', to: 'hatnhan' },
      { from: 'hatnhan', to: 'proton' },
      { from: 'hatnhan', to: 'neutron' },
      { from: 'hatnhan', to: 'sokhoi' },
      
      { from: 'root', to: 'lopvo' },
      { from: 'lopvo', to: 'electron' },
      { from: 'lopvo', to: 'orbital' },
      { from: 'lopvo', to: 'quytac' },

      { from: 'root', to: 'nguyento' },
      { from: 'nguyento', to: 'dongvi' },
      { from: 'nguyento', to: 'ntk_tb' },

      { from: 'root', to: 'cauhinh' },
      { from: 'cauhinh', to: 'kimloai' },
      { from: 'cauhinh', to: 'phikim' },
      { from: 'cauhinh', to: 'khihiem' }
    ];

    function initB4Mindmap() {
      b4MindmapCanvas = document.getElementById('b4MindmapCanvas');
      if (!b4MindmapCanvas) return;
      b4MindmapCtx = b4MindmapCanvas.getContext('2d');
      
      const box = document.getElementById('b4-mindmap-box');
      box.addEventListener('mousedown', (e) => {
        b4MmDragging = true;
        b4MmLastX = e.clientX;
        b4MmLastY = e.clientY;
        box.style.cursor = 'grabbing';
      });
      window.addEventListener('mousemove', (e) => {
        if (b4MmDragging) {
          b4MmPanX += e.clientX - b4MmLastX;
          b4MmPanY += e.clientY - b4MmLastY;
          b4MmLastX = e.clientX;
          b4MmLastY = e.clientY;
          drawB4Mindmap();
        } else {
          // Check hover node
          checkB4NodeHover(e);
        }
      });
      window.addEventListener('mouseup', () => {
        b4MmDragging = false;
        if (box) box.style.cursor = 'grab';
      });

      box.addEventListener('click', (e) => {
        if (b4MmHoverNode) {
          showB4NodeDetail(b4MmHoverNode);
        }
      });

      resizeB4MindmapCanvas();
    }

    function resizeB4MindmapCanvas() {
      if (!b4MindmapCanvas) return;
      const rect = b4MindmapCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b4MindmapCanvas.width = rect.width * dpr;
      b4MindmapCanvas.height = rect.height * dpr;
      if (b4MindmapCtx) b4MindmapCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawB4Mindmap();
    }

    function resetB4MindmapZoom() {
      b4MmPanX = 0;
      b4MmPanY = 0;
      drawB4Mindmap();
    }

    function filterB4Mindmap(category) {
      b4MmFilter = category;
      ['all', 'hatnhan', 'nguyento', 'orbital'].forEach(cat => {
        const btn = document.getElementById('btn-mm-' + cat);
        if (btn) btn.classList.toggle('active', cat === category);
      });
      drawB4Mindmap();
    }

    function checkB4NodeHover(e) {
      if (!b4MindmapCanvas) return;
      const rect = b4MindmapCanvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cx = (b4MindmapCanvas.parentElement.clientWidth / 2) + b4MmPanX;
      const cy = (b4MindmapCanvas.parentElement.clientHeight / 2) + b4MmPanY;

      let found = null;
      MINDMAP_NODES.forEach(n => {
        let nx = cx + n.x;
        let ny = cy + n.y;
        let dist = Math.hypot(mx - nx, my - ny);
        if (dist <= n.r) {
          found = n;
        }
      });

      if (found !== b4MmHoverNode) {
        b4MmHoverNode = found;
        b4MindmapCanvas.style.cursor = found ? 'pointer' : 'grab';
        drawB4Mindmap();
      }
    }

    function showB4NodeDetail(node) {
      const popover = document.getElementById('b4-node-detail-popover');
      const title = document.getElementById('b4-popover-title');
      const desc = document.getElementById('b4-popover-desc');
      if (popover && title && desc) {
        title.innerText = node.label.replace('\n', ' - ');
        desc.innerText = node.desc;
        popover.style.display = 'block';
      }
    }

    function drawB4Mindmap() {
      if (!b4MindmapCanvas || !b4MindmapCtx) return;
      const w = b4MindmapCanvas.parentElement.clientWidth;
      const h = b4MindmapCanvas.parentElement.clientHeight;
      const ctx = b4MindmapCtx;

      ctx.clearRect(0, 0, w, h);
      const cx = (w / 2) + b4MmPanX;
      const cy = (h / 2) + b4MmPanY;

      // 1. Vẽ các đường nối liên kết (Links)
      MINDMAP_LINKS.forEach(link => {
        const fromNode = MINDMAP_NODES.find(n => n.id === link.from);
        const toNode = MINDMAP_NODES.find(n => n.id === link.to);
        if (!fromNode || !toNode) return;

        const isDim = (b4MmFilter !== 'all' && toNode.category !== b4MmFilter && fromNode.category !== b4MmFilter && toNode.category !== 'all');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx + fromNode.x, cy + fromNode.y);
        ctx.lineTo(cx + toNode.x, cy + toNode.y);
        ctx.strokeStyle = isDim ? '#e2e8f0' : '#cbd5e1';
        ctx.lineWidth = isDim ? 1 : 2;
        ctx.stroke();
        ctx.restore();
      });

      // 2. Vẽ các nút tròn (Nodes)
      MINDMAP_NODES.forEach(node => {
        const isDim = (b4MmFilter !== 'all' && node.category !== b4MmFilter && node.category !== 'all');
        const isHover = (node === b4MmHoverNode);

        const nx = cx + node.x;
        const ny = cy + node.y;

        ctx.save();
        if (isDim) ctx.globalAlpha = 0.25;

        // Vòng bóng đổ hoặc glow khi hover
        if (isHover) {
          ctx.beginPath();
          ctx.arc(nx, ny, node.r + 6, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(2, 132, 199, 0.2)';
          ctx.fill();
        }

        // Vòng tròn node
        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Chữ trong node
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold ' + (node.r > 32 ? '11px' : '9.5px') + ' "Plus Jakarta Sans", sans-serif';

        const lines = node.label.split('\n');
        if (lines.length === 1) {
          ctx.fillText(lines[0], nx, ny);
        } else {
          ctx.fillText(lines[0], nx, ny - 6);
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillText(lines[1], nx, ny + 7);
        }

        ctx.restore();
      });
    }

    /* ----------------------------------------------------------
       TAB 2: HỆ THỐNG HOÁ ĐIỀN KHUYẾT (FILL-IN-THE-BLANKS)
       ---------------------------------------------------------- */
    const BLANKS_CORRECT_ANSWERS = {
      'blank_q_proton': '+1',
      'blank_q_neutron': '0',
      'blank_shape_s': 'cau',
      'blank_shape_p': 'so8',
      'blank_max_ao': 'n2',
      'blank_max_e': '2n2',
      'blank_elem_123': 'kimloai',
      'blank_elem_567': 'phikim'
    };

    function resetB4Blanks() {
      Object.keys(BLANKS_CORRECT_ANSWERS).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.value = '';
          el.style.borderColor = '#cbd5e1';
          el.style.backgroundColor = '#ffffff';
        }
      });
      const scoreBox = document.getElementById('b4-blanks-score-box');
      if (scoreBox) scoreBox.style.display = 'none';
    }

    function checkB4Blanks() {
      let correctCount = 0;
      let total = Object.keys(BLANKS_CORRECT_ANSWERS).length;

      Object.entries(BLANKS_CORRECT_ANSWERS).forEach(([id, correctVal]) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.value === correctVal) {
          correctCount++;
          el.style.borderColor = '#10b981';
          el.style.backgroundColor = '#f0fdf4';
        } else {
          el.style.borderColor = '#ef4444';
          el.style.backgroundColor = '#fef2f2';
        }
      });

      const scoreBox = document.getElementById('b4-blanks-score-box');
      const scoreText = document.getElementById('b4-score-text');
      const scoreTag = document.getElementById('b4-score-tag');

      if (scoreBox && scoreText && scoreTag) {
        scoreBox.style.display = 'block';
        scoreText.innerText = `Bạn đạt: ${correctCount}/${total} ô chính xác (${Math.round(correctCount / total * 100)}%)`;
        if (correctCount === total) {
          scoreTag.innerText = 'Xuất sắc!';
          scoreTag.style.background = '#10b981';
        } else if (correctCount >= 5) {
          scoreTag.innerText = 'Khá tốt! Hãy soát lại các ô đỏ';
          scoreTag.style.background = '#f59e0b';
        } else {
          scoreTag.innerText = 'Cần ôn lại lý thuyết!';
          scoreTag.style.background = '#ef4444';
        }
      }
    }

    /* ----------------------------------------------------------
       TAB 3: ĐẤU TRƯỜNG 11 CÂU SGK TRANG 27 - 28
       ---------------------------------------------------------- */
    const B4_QUESTIONS_DATA = [
      {
        id: 1,
        title: 'Câu 1 (SGK Trang 27): Số hạt cơ bản của Potassium',
        text: 'Số proton, neutron và electron của $^{39}_{19}\\text{K}$ lần lượt là bao nhiêu?',
        options: [
          'A. 19, 19, 20',
          'B. 19, 20, 19',
          'C. 20, 19, 19',
          'D. 19, 39, 19'
        ],
        correct: 1, // B
        explain: 'Nguyên tử K có Z = 19 => số proton = số electron = 19. Số neutron N = A - Z = 39 - 19 = 20. Do đó bộ ba lần lượt là 19, 20, 19.'
      },
      {
        id: 2,
        title: 'Câu 2 (SGK Trang 27): Số electron lớp ngoài cùng',
        text: 'Nguyên tử của nguyên tố nào sau đây có 3 electron thuộc lớp ngoài cùng?',
        options: [
          'A. ²³₁₁Na',
          'B. ¹⁴₇N',
          'C. ²⁷₁₃Al',
          'D. ¹²₆C'
        ],
        correct: 2, // C
        explain: 'Aluminium (Z=13) có cấu hình electron: 1s² 2s² 2p⁶ 3s² 3p¹. Lớp ngoài cùng (n=3) có 2 + 1 = 3 electron.'
      },
      {
        id: 3,
        title: 'Câu 3 (SGK Trang 27): Số orbital chứa electron của Potassium',
        text: 'Nguyên tử của nguyên tố potassium có 19 electron. Ở trạng thái cơ bản, potassium có số orbital chứa electron là bao nhiêu?',
        options: [
          'A. 9',
          'B. 10',
          'C. 11',
          'D. 12'
        ],
        correct: 1, // B
        explain: 'Cấu hình e của K (Z=19): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹. Số orbital chứa electron: 1 (phân lớp 1s) + 1 (2s) + 3 (2p) + 1 (3s) + 3 (3p) + 1 (4s) = 10 orbital.'
      },
      {
        id: 4,
        title: 'Câu 4 (SGK Trang 27): Cấu hình electron của Sodium',
        text: 'Nguyên tử của nguyên tố sodium (Z = 11) có cấu hình electron là gì?',
        options: [
          'A. 1s² 2s² 2p⁶ 3s²',
          'B. 1s² 2s² 2p⁶',
          'C. 1s² 2s² 2p⁶ 3s¹',
          'D. 1s² 2s² 2p⁵ 3s²'
        ],
        correct: 2, // C
        explain: 'Sodium có Z = 11 electron. Điền theo thứ tự mức năng lượng: 1s² 2s² 2p⁶ 3s¹.'
      },
      {
        id: 5,
        title: 'Câu 5 (SGK Trang 28): Bài toán hệ phương trình hạt',
        text: 'Tổng số hạt proton, neutron và electron trong nguyên tử X là 58. Số hạt mang điện nhiều hơn số hạt không mang điện là 18. X là nguyên tố nào?',
        options: [
          'A. Chlorine (Cl)',
          'B. Calcium (Ca)',
          'C. Potassium (K)',
          'D. Sulfur (S)'
        ],
        correct: 2, // C: Potassium
        explain: 'Ta có hệ phương trình: 2Z + N = 58 và 2Z - N = 18. Cộng hai phương trình: 4Z = 76 => Z = 19 (Potassium, K) và N = 20.'
      },
      {
        id: 6,
        title: 'Câu 6 (SGK Trang 28): Đặc điểm lớp vỏ của Chlorine',
        text: 'Nguyên tố chlorine có Z = 17. Hãy xác định số lớp electron, số electron lớp ngoài cùng và số electron độc thân của chlorine.',
        options: [
          'A. 3 lớp e; 7 e ngoài cùng; 1 e độc thân',
          'B. 3 lớp e; 5 e ngoài cùng; 3 e độc thân',
          'C. 2 lớp e; 7 e ngoài cùng; 0 e độc thân',
          'D. 4 lớp e; 1 e ngoài cùng; 1 e độc thân'
        ],
        correct: 0, // A
        explain: 'Cl (Z=17): 1s² 2s² 2p⁶ 3s² 3p⁵ => Có 3 lớp e (n=1,2,3). Lớp ngoài cùng n=3 có 2+5=7e. Phân lớp 3p⁵ có 3 ô orbital: 2 ô chứa cặp e ghép đôi và 1 ô chứa 1e độc thân.'
      },
      {
        id: 7,
        title: 'Câu 7 (SGK Trang 28): Tìm số hiệu Z của nguyên tố có 3 lớp',
        text: 'Nguyên tử nguyên tố X có 3 lớp electron, lớp thứ 3 có 6 electron. Hãy cho biết số hiệu nguyên tử của nguyên tố X.',
        options: [
          'A. Z = 14 (Silicon)',
          'B. Z = 16 (Sulfur)',
          'C. Z = 18 (Argon)',
          'D. Z = 8 (Oxygen)'
        ],
        correct: 1, // B: Sulfur
        explain: 'Vì có 3 lớp electron nên 2 lớp đầu đã bão hoà: lớp 1 có 2e, lớp 2 có 8e. Lớp 3 có 6e => Tổng e = 2 + 8 + 6 = 16 => Z = 16 (Sulfur, S).'
      },
      {
        id: 8,
        title: 'Câu 8 (SGK Trang 28): Số khối đồng vị của Vanadium',
        text: 'Nguyên tử khối trung bình của vanadium (V) là 50.94. Nguyên tố V có 2 đồng vị, trong đó đồng vị ⁵⁰₂₃V chiếm 0.25%. Số khối của đồng vị còn lại là bao nhiêu?',
        options: [
          'A. 51',
          'B. 52',
          'C. 49',
          'D. 53'
        ],
        correct: 0, // A: 51
        explain: 'Đồng vị thứ 2 chiếm 100% - 0.25% = 99.75%. Công thức: Ā = (50 × 0.25 + A₂ × 99.75) / 100 = 50.94 => A₂ ≈ 51 (chính là đồng vị ⁵¹V).'
      },
      {
        id: 9,
        title: 'Câu 9 (SGK Trang 28): So sánh cấu hình electron của X và Y',
        text: 'Cho cấu hình: X: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ và Y: 1s² 2s² 2p⁶ 3s² 3p⁴. Khẳng định nào sau đây là ĐÚNG?',
        options: [
          'A. X là phi kim, Y là kim loại',
          'B. X có 1e lớp ngoài cùng (kim loại K); Y có 6e lớp ngoài cùng (phi kim S)',
          'C. Mức năng lượng của lớp ngoài cùng X thấp hơn Y',
          'D. Cả X và Y đều có 3 lớp electron'
        ],
        correct: 1, // B
        explain: 'X (Z=19) có 1e lớp ngoài cùng (4s¹) => Kim loại potassium. Y (Z=16) có 6e lớp ngoài cùng (3s² 3p⁴) => Phi kim sulfur.'
      },
      {
        id: 10,
        title: 'Câu 10 (SGK Trang 28): Hợp kim nhẹ & Phân tử sinh học',
        text: 'Nguyên tử X chế tạo hợp kim hàng không có cấu hình kết thúc ở 3p¹. Nguyên tử Y trong DNA/RNA có cấu hình kết thúc ở 3p³. X và Y là các nguyên tố nào?',
        options: [
          'A. X là Al (Z=13, kim loại) và Y là P (Z=15, phi kim)',
          'B. X là Na (Z=11) và Y là N (Z=7)',
          'C. X là Mg (Z=12) và Y là S (Z=16)',
          'D. X là Si (Z=14) và Y là Cl (Z=17)'
        ],
        correct: 0, // A
        explain: 'Cấu hình kết thúc ở 3p¹: 1s² 2s² 2p⁶ 3s² 3p¹ => Z = 13 (Aluminium, hợp kim máy bay). Cấu hình kết thúc ở 3p³: 1s² 2s² 2p⁶ 3s² 3p³ => Z = 15 (Phosphorus trong chuỗi DNA/ATP).'
      },
      {
        id: 11,
        title: 'Câu 11 (SGK Trang 28): Bài toán hạt nâng cao',
        text: 'Nguyên tử nguyên tố X có tổng số hạt là 40, trong đó hạt không mang điện bằng 53.85% số hạt mang điện. Xác định số hiệu Z và số khối A của X.',
        options: [
          'A. Z = 13, A = 27 (Aluminium)',
          'B. Z = 12, A = 24 (Magnesium)',
          'C. Z = 13, A = 26',
          'D. Z = 14, A = 28 (Silicon)'
        ],
        correct: 0, // A
        explain: 'Tổng hạt: 2Z + N = 40. Hạt không mang điện: N = 0.5385 × 2Z = 1.077Z. Thế vào: 2Z + 1.077Z = 40 => 3.077Z = 40 => Z = 13 (Aluminium). N = 40 - 2×13 = 14 => A = 13 + 14 = 27.'
      }
    ];

    let b4CurrentQuestionIdx = 0;
    let b4UserAnswers = {}; // { qIdx: selectedOption }

    function initB4QuizArena() {
      buildB4QuestionStrip();
      renderB4CurrentQuestion();
    }

    function buildB4QuestionStrip() {
      const strip = document.getElementById('b4-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B4_QUESTIONS_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b4-q-strip-btn-' + idx;
        btn.style.cssText = 'width:28px; height:28px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.15s;';
        btn.innerText = idx + 1;
        btn.onclick = () => selectB4QuestionIdx(idx);
        strip.appendChild(btn);
      });
      updateB4QuestionStripUI();
    }

    function updateB4QuestionStripUI() {
      B4_QUESTIONS_DATA.forEach((q, idx) => {
        const btn = document.getElementById('b4-q-strip-btn-' + idx);
        if (!btn) return;

        const isAnswered = (b4UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b4CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.borderWidth = '2px';
        } else {
          btn.style.borderColor = '#cbd5e1';
          btn.style.borderWidth = '1px';
        }

        if (isAnswered) {
          const isCorrect = (b4UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#10b981' : '#ef4444';
          btn.style.color = '#ffffff';
        } else {
          btn.style.background = isCurrent ? '#e0f2fe' : '#ffffff';
          btn.style.color = isCurrent ? '#0369a1' : '#334155';
        }
      });

      const prog = document.getElementById('b4-quiz-progress-text');
      const answeredCount = Object.keys(b4UserAnswers).length;
      if (prog) {
        prog.innerText = `Đã làm: ${answeredCount} / ${B4_QUESTIONS_DATA.length} câu`;
      }
    }

    function selectB4QuestionIdx(idx) {
      b4CurrentQuestionIdx = Math.max(0, Math.min(B4_QUESTIONS_DATA.length - 1, idx));
      updateB4QuestionStripUI();
      renderB4CurrentQuestion();
    }

    function stepB4Question(delta) {
      selectB4QuestionIdx(b4CurrentQuestionIdx + delta);
    }

    function renderB4CurrentQuestion() {
      const container = document.getElementById('b4-question-card-container');
      if (!container) return;

      const q = B4_QUESTIONS_DATA[b4CurrentQuestionIdx];
      const userSelected = b4UserAnswers[b4CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, oIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        
        if (isAnswered) {
          if (oIdx === q.correct) {
            optStyle += ' background:#f0fdf4; border-color:#86efac; color:#15803d; font-weight:700;';
          } else if (oIdx === userSelected) {
            optStyle += ' background:#fef2f2; border-color:#fca5a5; color:#b91c1c; font-weight:700;';
          }
        }

        optionsHtml += `<button style="${optStyle}" onclick="chooseB4Option(${oIdx})" ${isAnswered ? 'disabled' : ''}>
          <span>${opt}</span>
          ${isAnswered && oIdx === q.correct ? '<span style="color:#15803d;">✓ Đúng</span>' : ''}
          ${isAnswered && oIdx === userSelected && oIdx !== q.correct ? '<span style="color:#b91c1c;">✕ Bạn đã chọn</span>' : ''}
        </button>`;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px 16px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fffbeb'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fde68a'};">
            <div style="font-weight:700; font-size:13px; color:${isCorrect ? '#166534' : '#92400e'}; margin-bottom:4px;">
              ${isCorrect ? '🎉 Chính xác!' : '💡 Lời giải chi tiết sư phạm:'}
            </div>
            <div style="font-size:12.5px; color:#334155; line-height:1.5;">${q.explain}</div>
          </div>
        `;
      }

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:12px; font-weight:700; background:#e0f2fe; color:#0369a1; padding:3px 10px; border-radius:12px;">CÂU ${b4CurrentQuestionIdx + 1} / ${B4_QUESTIONS_DATA.length}</span>
          <span style="font-size:12px; color:#64748b;">Mục II • SGK Hoá học 10</span>
        </div>
        <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 8px 0;">${q.title}</h3>
        <p style="font-size:13.5px; color:#334155; line-height:1.6; margin:0 0 16px 0;">${q.text}</p>
        <div style="display:flex; flex-direction:column;">${optionsHtml}</div>
        ${explainHtml}
      `;

      if (window.renderMathInElement) {
        renderMathInElement(container, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      }
    }

    function chooseB4Option(optionIdx) {
      if (b4UserAnswers[b4CurrentQuestionIdx] !== undefined) return;
      b4UserAnswers[b4CurrentQuestionIdx] = optionIdx;
      updateB4QuestionStripUI();
      renderB4CurrentQuestion();
    }




