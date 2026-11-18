
    /* ==========================================================
       VIEW ROUTING LOGIC
       ========================================================== */
    let activeLesson = 'b1';

        function openLesson(lessonId) {
      activeLesson = lessonId;
      document.getElementById('view-dashboard').classList.remove('active');
      const studioIds = [
        'view-studio', 'view-studio-b2', 'view-studio-b3', 'view-studio-b4',
        'view-studio-b5', 'view-studio-b6', 'view-studio-b7', 'view-studio-b8', 'view-studio-b9',
        'view-studio-b10', 'view-studio-b11', 'view-studio-b12', 'view-studio-b13', 'view-studio-b14',
        'view-studio-b15', 'view-studio-b16', 'view-studio-b17', 'view-studio-b18',
        'view-studio-b19', 'view-studio-b20', 'view-studio-b21', 'view-studio-b22', 'view-studio-b23'
      ];
      studioIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
      });

      if (lessonId === 'b1') {
        document.getElementById('view-studio').classList.add('active');
        switchPart('part1a');
        setTimeout(() => { resizeStageCanvas(); }, 50);
      } else if (lessonId === 'b2') {
        document.getElementById('view-studio-b2').classList.add('active');
        switchPartB2('b2_p1');
        setTimeout(() => { resizeStageCanvasB2(); }, 50);
      } else if (lessonId === 'b3') {
        const el = document.getElementById('view-studio-b3');
        if (el) el.classList.add('active');
        switchPartB3('part1');
        setTimeout(() => {
          if (typeof initB3CloudSim === 'function') initB3CloudSim();
          if (typeof initB3Orbital3D === 'function') initB3Orbital3D();
          if (typeof initB3OrbitalLab === 'function') initB3OrbitalLab();
        }, 50);
      } else if (lessonId === 'b4') {
        const el = document.getElementById('view-studio-b4');
        if (el) el.classList.add('active');
        switchPartB4('part1');
        setTimeout(() => {
          if (typeof initB4Mindmap === 'function') initB4Mindmap();
          if (typeof initB4QuizArena === 'function') initB4QuizArena();
        }, 50);
      } else if (lessonId === 'b5') {
        const el = document.getElementById('view-studio-b5');
        if (el) el.classList.add('active');
        switchPartB5('part1');
        setTimeout(() => {
          if (typeof initB5PeriodicTable === 'function') initB5PeriodicTable();
          if (typeof initB5QuizArena === 'function') initB5QuizArena();
        }, 50);
      } else if (lessonId === 'b6') {
        const el = document.getElementById('view-studio-b6');
        if (el) el.classList.add('active');
        switchPartB6('part1');
        setTimeout(() => {
          if (typeof initB6RadiusLab === 'function') initB6RadiusLab();
          if (typeof initB6ElectronegLab === 'function') initB6ElectronegLab();
          if (typeof initB6QuizArena === 'function') initB6QuizArena();
        }, 50);
      } else if (lessonId === 'b7') {
        const el = document.getElementById('view-studio-b7');
        if (el) el.classList.add('active');
        switchPartB7('part1');
        setTimeout(() => {
          if (typeof initB7CompoundLab === 'function') initB7CompoundLab();
          if (typeof initB7BeakerSim === 'function') initB7BeakerSim();
          if (typeof initB7QuizArena === 'function') initB7QuizArena();
        }, 50);
      } else if (lessonId === 'b8') {
        const el = document.getElementById('view-studio-b8');
        if (el) el.classList.add('active');
        switchPartB8('part1');
        setTimeout(() => {
          if (typeof initB8TriangleLab === 'function') initB8TriangleLab();
          if (typeof initB8QuizArena === 'function') initB8QuizArena();
        }, 50);
      } else if (lessonId === 'b9') {
        const el = document.getElementById('view-studio-b9');
        if (el) el.classList.add('active');
        switchPartB9('part1');
        setTimeout(() => {
          if (typeof initB9Mindmap === 'function') initB9Mindmap();
          if (typeof initB9ClozeLab === 'function') initB9ClozeLab();
          if (typeof initB9QuizArena === 'function') initB9QuizArena();
        }, 50);
      } else if (lessonId === 'b10') {
        const el = document.getElementById('view-studio-b10');
        if (el) el.classList.add('active');
        switchPartB10('part1');
        setTimeout(() => {
          if (typeof initB10OctetLab === 'function') initB10OctetLab();
          if (typeof initB10QuizArena === 'function') initB10QuizArena();
        }, 50);
      } else if (lessonId === 'b11') {
        const el = document.getElementById('view-studio-b11');
        if (el) el.classList.add('active');
        switchPartB11('part1');
        setTimeout(() => {
          if (typeof initB11IonLab === 'function') initB11IonLab();
          if (typeof initB11QuizArena === 'function') initB11QuizArena();
        }, 50);
      } else if (lessonId === 'b12') {
        const el = document.getElementById('view-studio-b12');
        if (el) el.classList.add('active');
        switchPartB12('part1');
        setTimeout(() => {
          if (typeof initB12AOLab === 'function') initB12AOLab();
          if (typeof initB12QuizArena === 'function') initB12QuizArena();
        }, 50);
      } else if (lessonId === 'b13') {
        const el = document.getElementById('view-studio-b13');
        if (el) el.classList.add('active');
        switchPartB13('part1');
        setTimeout(() => {
          if (typeof initB13InterLab === 'function') initB13InterLab();
          if (typeof initB13QuizArena === 'function') initB13QuizArena();
        }, 50);
      } else if (lessonId === 'b14') {
        const el = document.getElementById('view-studio-b14');
        if (el) el.classList.add('active');
        switchPartB14('part1');
        setTimeout(() => {
          if (typeof initB14Mindmap === 'function') initB14Mindmap();
          if (typeof initB14ClozeLab === 'function') initB14ClozeLab();
          if (typeof initB14QuizArena === 'function') initB14QuizArena();
        }, 50);
      } else if (lessonId === 'b15') {
        const el = document.getElementById('view-studio-b15');
        if (el) el.classList.add('active');
        switchPartB15('part1');
        setTimeout(() => {
          if (typeof selectB15SampleCompound === 'function') selectB15SampleCompound('Fe2O3');
          if (typeof initB15RedoxSim === 'function') initB15RedoxSim();
          if (typeof initB15QuizArena === 'function') initB15QuizArena();
        }, 50);
      } else if (lessonId === 'b16') {
        const el = document.getElementById('view-studio-b16');
        if (el) el.classList.add('active');
        switchPartB16('part1');
        setTimeout(() => {
          if (typeof initB16Mindmap === 'function') initB16Mindmap();
          if (typeof initB16ClozeLab === 'function') initB16ClozeLab();
          if (typeof initB16QuizArena === 'function') initB16QuizArena();
        }, 50);
      } else if (lessonId === 'b17') {
        const el = document.getElementById('view-studio-b17');
        if (el) el.classList.add('active');
        switchPartB17('part1');
        setTimeout(() => {
          if (typeof setB17SimType === 'function') setB17SimType('neutralize');
          if (typeof initB17EnergyProfile === 'function') initB17EnergyProfile();
          if (typeof calcB17Reaction === 'function') calcB17Reaction('h2_cl2');
        }, 50);
      } else if (lessonId === 'b18') {
        const el = document.getElementById('view-studio-b18');
        if (el) el.classList.add('active');
        switchPartB18('part1');
        setTimeout(() => {
          if (typeof initB18Mindmap === 'function') initB18Mindmap();
          if (typeof initB18ClozeLab === 'function') initB18ClozeLab();
          if (typeof initB18QuizArena === 'function') initB18QuizArena();
        }, 50);
      } else if (lessonId === 'b19') {
        const el = document.getElementById('view-studio-b19');
        if (el) el.classList.add('active');
        switchPartB19('part1');
        setTimeout(() => {
          if (typeof initB19KineticsGraph === 'function') initB19KineticsGraph();
          if (typeof updateB19RateCalc === 'function') updateB19RateCalc();
          if (typeof calcB19Vanthoff === 'function') calcB19Vanthoff();
        }, 50);
      } else if (lessonId === 'b20') {
        const el = document.getElementById('view-studio-b20');
        if (el) el.classList.add('active');
        switchPartB20('part1');
        setTimeout(() => {
          if (typeof initB20Mindmap === 'function') initB20Mindmap();
          if (typeof initB20ClozeLab === 'function') initB20ClozeLab();
          if (typeof initB20QuizArena === 'function') initB20QuizArena();
        }, 50);
      } else if (lessonId === 'b21') {
        const el = document.getElementById('view-studio-b21');
        if (el) el.classList.add('active');
        switchPartB21('part1');
        setTimeout(() => {
          if (typeof initB21HalogenJars === 'function') initB21HalogenJars();
        }, 50);
      } else if (lessonId === 'b22') {
        const el = document.getElementById('view-studio-b22');
        if (el) el.classList.add('active');
        switchPartB22('part1');
        setTimeout(() => {
          if (typeof selectB22Molecule === 'function') selectB22Molecule('HF');
        }, 50);
      } else if (lessonId === 'b23') {
        const el = document.getElementById('view-studio-b23');
        if (el) el.classList.add('active');
        switchPartB23('part1');
        setTimeout(() => {
          if (typeof initB23Mindmap === 'function') initB23Mindmap();
        }, 50);
      }
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 60);
      window.location.hash = lessonId;
    }

    function backToDashboard() {
      document.getElementById('view-studio').classList.remove('active');
      document.getElementById('view-studio-b2').classList.remove('active');
      const studioB3 = document.getElementById('view-studio-b3');
      if (studioB3) studioB3.classList.remove('active');
      const studioB4 = document.getElementById('view-studio-b4');
      if (studioB4) studioB4.classList.remove('active');
      const studioB5 = document.getElementById('view-studio-b5');
      if (studioB5) studioB5.classList.remove('active');
      const studioB6 = document.getElementById('view-studio-b6');
      if (studioB6) studioB6.classList.remove('active');
      const studioB7 = document.getElementById('view-studio-b7');
      if (studioB7) studioB7.classList.remove('active');
      const studioB8 = document.getElementById('view-studio-b8');
      if (studioB8) studioB8.classList.remove('active');
      const studioB9 = document.getElementById('view-studio-b9');
      if (studioB9) studioB9.classList.remove('active');
      const studioB10 = document.getElementById('view-studio-b10');
      if (studioB10) studioB10.classList.remove('active');
      const studioB11 = document.getElementById('view-studio-b11');
      if (studioB11) studioB11.classList.remove('active');
      const studioB12 = document.getElementById('view-studio-b12');
      if (studioB12) studioB12.classList.remove('active');
      const studioB13 = document.getElementById('view-studio-b13');
      if (studioB13) studioB13.classList.remove('active');
      document.getElementById('view-dashboard').classList.add('active');
      window.location.hash = '';
    }

    function renderMathInPage() {
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    }
    // Auto-call if KaTeX finished loading earlier
    if (window.__katexLoaded || window.renderMathInElement) {
      setTimeout(renderMathInPage, 100);
    }

    /* ==========================================================
       BÀI 1: STUDIO PART SWITCHER
       ========================================================== */
    let currentPart = 'part1a';

    function switchPart(part) {
      currentPart = part;
      const tabs = ['part1a', 'part1b', 'part2', 'part3'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        if (btn) btn.className = (t === part) ? 'tab-seg-btn active' : 'tab-seg-btn';

        const content = document.getElementById('content-' + t);
        if (content) content.className = (t === part) ? 'lesson-section-content active' : 'lesson-section-content';

        const footer = document.getElementById('footer-' + t);
        if (footer) footer.style.display = (t === part) ? 'flex' : 'none';
      });

      updateHud();
      renderMathInPage();
    }

    function updateHud() {
      const hud1 = document.getElementById('hud-line1');
      const hud2 = document.getElementById('hud-line2');
      const hud3 = document.getElementById('hud-line3');

      if (currentPart === 'part1a') {
        hud1.innerHTML = `THÍ NGHIỆM: <span>Tia âm cực (J.J. Thomson, 1897)</span>`;
        hud2.innerHTML = `ĐIỆN TRƯỜNG: <span>${electricVal === 0 ? '0 V/cm (Truyền thẳng)' : (electricVal > 0 ? '+' : '') + (electricVal * 150) + ' V/cm'}</span>`;
        hud3.innerHTML = `BẢN CHẤT: <span>Chùm hạt electron mang điện tích âm (-)</span>`;
      } else if (currentPart === 'part1b') {
        hud1.innerHTML = `THÍ NGHIỆM: <span>Tán xạ hạt Alpha qua Lá vàng (Rutherford 1911)</span>`;
        hud2.innerHTML = `CHẾ ĐỘ: <span>${rfViewMode === 'macro' ? 'Góc nhìn vĩ mô (Toàn cảnh)' : 'Cận cảnh vi mô (Lực đẩy Coulomb)'}</span>`;
        hud3.innerHTML = `KẾT LUẬN: <span>Nguyên tử CẤU TẠO RỖNG, hạt nhân tích điện dương (+)</span>`;
      } else if (currentPart === 'part2') {
        hud1.innerHTML = `MÔ HÌNH: <span>Tương quan kích thước Quả bóng rổ & Hạt cát (SGK Trang 15)</span>`;
        hud2.innerHTML = `ĐỘ PHÓNG ĐẠI: <span>${zoomScale}x (Tỉ lệ thực 10.000 lần)</span>`;
        hud3.innerHTML = `KHỐI LƯỢNG: <span>Proton ≈ Neutron (~1 amu), Electron rất nhẹ (~1/1837 amu)</span>`;
      } else {
        hud1.innerHTML = `MÔ HÌNH HẠT NHÂN: <span>Cụm Nucleon 3D (Z proton + N neutron)</span>`;
        hud2.innerHTML = `KÍ HIỆU: <span>${curSym}: Z = ${curZ}, N = ${curN} ➔ Số khối A = ${curZ + curN}</span>`;
        hud3.innerHTML = `ĐẶC ĐIỂM: <span>Số p = Số e = ${curZ} ➔ Nguyên tử TRUNG HOÀ VỀ ĐIỆN</span>`;
      }
    }

    /* ==========================================================
       BÀI 1: CANVAS ENGINE
       ========================================================== */
    const canvas = document.getElementById('stageCanvas');
    const ctx = canvas.getContext('2d');
    let width = 600, height = 500;

    function resizeStageCanvas() {
      const container = canvas.parentElement;
      if (!container || container.clientWidth === 0) return;
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeStageCanvas);

    // 1A. Thomson
    let thomsonPower = false;
    let electricVal = 0;
    let thomsonHits = [];

    function toggleThomsonPower() {
      thomsonPower = !thomsonPower;
      const btn = document.getElementById('btn-power-thomson');
      if (thomsonPower) {
        btn.classList.add('btn-tool-active');
        btn.innerHTML = '<span>⚡ Tắt nguồn cao thế</span>';
      } else {
        btn.classList.remove('btn-tool-active');
        btn.innerHTML = '<span>⚡ Bật nguồn cao thế (15 kV)</span>';
      }
      updateHud();
    }

    function changeElectricField(val) {
      electricVal = parseFloat(val);
      const text = document.getElementById('eFieldLabel');
      if (electricVal > 0) {
        text.innerText = `+${electricVal * 150} V/cm (Cực dương ở TRÊN)`;
        text.style.color = '#0284c7';
      } else if (electricVal < 0) {
        text.innerText = `${electricVal * 150} V/cm (Cực dương ở DƯỚI)`;
        text.style.color = '#dc2626';
      } else {
        text.innerText = '0 V/cm (Không lệch)';
        text.style.color = '#0284c7';
      }
      updateHud();
    }

    function resetThomson() {
      electricVal = 0;
      document.getElementById('eFieldRange').value = 0;
      changeElectricField(0);
      thomsonHits = [];
    }

    function drawThomson() {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const tubeX = 50;
      const tubeY = height * 0.5 - 110;
      const tubeW = width - 100;
      const tubeH = 220;

      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(tubeX + 30, tubeY + tubeH - 20, 20, 45);
      ctx.fillRect(tubeX + tubeW - 50, tubeY + tubeH - 20, 20, 45);

      ctx.save();
      const glassGrad = ctx.createLinearGradient(0, tubeY, 0, tubeY + tubeH);
      glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      glassGrad.addColorStop(0.3, 'rgba(240, 249, 255, 0.5)');
      glassGrad.addColorStop(0.7, 'rgba(224, 242, 254, 0.3)');
      glassGrad.addColorStop(1, 'rgba(203, 213, 225, 0.6)');

      ctx.fillStyle = glassGrad;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(tubeX, tubeY + 45);
      ctx.lineTo(tubeX + tubeW * 0.6, tubeY + 45);
      ctx.lineTo(tubeX + tubeW, tubeY + 10);
      ctx.lineTo(tubeX + tubeW, tubeY + tubeH - 10);
      ctx.lineTo(tubeX + tubeW * 0.6, tubeY + tubeH - 45);
      ctx.lineTo(tubeX, tubeY + tubeH - 45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(tubeX + 15, tubeY + 52);
      ctx.lineTo(tubeX + tubeW * 0.58, tubeY + 52);
      ctx.lineTo(tubeX + tubeW - 15, tubeY + 22);
      ctx.stroke();
      ctx.restore();

      const screenX = tubeX + tubeW - 4;
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(screenX, tubeY + 15);
      ctx.lineTo(screenX, tubeY + tubeH - 15);
      ctx.stroke();

      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 1.5;
      for (let y = tubeY + 25; y <= tubeY + tubeH - 25; y += 15) {
        ctx.beginPath();
        ctx.moveTo(screenX - 8, y);
        ctx.lineTo(screenX, y);
        ctx.stroke();
      }
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 11px Plus Jakarta Sans';
      ctx.fillText('Màn ZnS (Đo độ lệch)', screenX - 120, tubeY + 8);

      const catX = tubeX + 25;
      const catY = tubeY + 60;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(catX, catY, 10, tubeH - 120);
      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 12px Plus Jakarta Sans';
      ctx.fillText('Cathode (-)', catX - 10, tubeY + tubeH - 25);

      const anoX = tubeX + 120;
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(anoX, catY, 10, (tubeH - 120) * 0.5 - 12);
      ctx.fillRect(anoX, catY + (tubeH - 120) * 0.5 + 12, 10, (tubeH - 120) * 0.5 - 12);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText('Anode (+)', anoX - 10, tubeY + tubeH - 25);

      const plateX = tubeX + tubeW * 0.42;
      const plateW = 120;
      const plateH = 7;

      ctx.fillStyle = electricVal > 0 ? '#38bdf8' : (electricVal < 0 ? '#f87171' : '#94a3b8');
      ctx.beginPath();
      ctx.roundRect(plateX, tubeY + 50, plateW, plateH, 3);
      ctx.fill();
      ctx.fillStyle = electricVal > 0 ? '#0284c7' : '#64748b';
      ctx.font = 'bold 11px Plus Jakarta Sans';
      ctx.fillText(electricVal > 0 ? '(+) Bản cực dương' : (electricVal < 0 ? '(-) Bản cực âm' : 'Bản kim loại'), plateX + 10, tubeY + 42);

      ctx.fillStyle = electricVal > 0 ? '#f87171' : (electricVal < 0 ? '#38bdf8' : '#94a3b8');
      ctx.beginPath();
      ctx.roundRect(plateX, tubeY + tubeH - 50 - plateH, plateW, plateH, 3);
      ctx.fill();
      ctx.fillStyle = electricVal < 0 ? '#0284c7' : '#64748b';
      ctx.fillText(electricVal > 0 ? '(-) Bản cực âm' : (electricVal < 0 ? '(+) Bản cực dương' : 'Bản kim loại'), plateX + 10, tubeY + tubeH - 30);

      const centerY = tubeY + tubeH * 0.5;

      if (thomsonPower) {
        ctx.save();
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.4)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(catX + 10, centerY);
        ctx.lineTo(anoX, centerY);
        ctx.stroke();

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(catX + 10, centerY);
        ctx.lineTo(anoX, centerY);
        ctx.stroke();

        const endX = screenX;
        const targetY = centerY - (electricVal * 5.5);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(anoX + 10, centerY);
        ctx.bezierCurveTo(plateX + plateW * 0.5, centerY, plateX + plateW, targetY, endX, targetY);
        ctx.stroke();

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(anoX + 10, centerY);
        ctx.bezierCurveTo(plateX + plateW * 0.5, centerY, plateX + plateW, targetY, endX, targetY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(endX, targetY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.fill();

        if (thomsonHits.length > 30) thomsonHits.shift();
        thomsonHits.push({ x: endX, y: targetY, alpha: 1.0 });
        ctx.restore();
      }

      thomsonHits.forEach(h => {
        ctx.fillStyle = `rgba(16, 185, 129, ${h.alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(h.x - 2, h.y, 4, 0, Math.PI * 2);
        ctx.fill();
        h.alpha *= 0.95;
      });
    }

    // 1B. Rutherford
    let rfRunning = false;
    let rfViewMode = 'macro';
    let rfParticles = [];
    let rfTrails = [];

    function toggleRutherfordBeam() {
      rfRunning = !rfRunning;
      const btn = document.getElementById('btn-fire-rf');
      if (rfRunning) {
        btn.classList.add('btn-tool-active');
        btn.innerHTML = '<span>⏹ Dừng bắn chùm Alpha</span>';
      } else {
        btn.classList.remove('btn-tool-active');
        btn.innerHTML = '<span>💥 Bắn chùm hạt Alpha (α)</span>';
      }
      updateHud();
    }

    function setRutherfordView(mode) {
      rfViewMode = mode;
      document.getElementById('btn-rf-macro').className = (mode === 'macro') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      document.getElementById('btn-rf-micro').className = (mode === 'micro') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      rfParticles = [];
      rfTrails = [];
      updateHud();
    }

    function resetRutherford() {
      rfParticles = [];
      rfTrails = [];
    }

    function drawRutherford() {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const cX = width * 0.54;
      const cY = height * 0.5;

      if (rfViewMode === 'macro') {
        const sRadius = Math.min(width * 0.35, 175);
        ctx.save();
        ctx.strokeStyle = '#a7f3d0';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.arc(cX, cY, sRadius, -Math.PI * 0.82, Math.PI * 0.82);
        ctx.stroke();

        ctx.fillStyle = '#065f46';
        ctx.font = 'bold 12px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText('Màn huỳnh quang ZnS hình trụ tròn', cX, cY - sRadius - 16);
        ctx.restore();

        const boxX = 35;
        const boxY = cY - 26;
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, 55, 52, 6);
        ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(boxX + 12, boxY + 18, 14, 16);
        ctx.fillStyle = '#334155';
        ctx.fillRect(boxX + 26, boxY + 23, 29, 6);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 11px Plus Jakarta Sans';
        ctx.textAlign = 'left';
        ctx.fillText('Hộp chì nguồn α', boxX - 5, boxY + 68);

        ctx.save();
        ctx.fillStyle = '#fde047';
        ctx.strokeStyle = '#ca8a04';
        ctx.lineWidth = 1.5;
        ctx.fillRect(cX - 1.5, cY - 110, 3, 220);
        ctx.strokeRect(cX - 1.5, cY - 110, 3, 220);
        ctx.fillStyle = '#854d0e';
        ctx.font = 'bold 12px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText('Lá vàng siêu mỏng', cX, cY + 130);
        ctx.restore();

        if (rfRunning && Math.random() < 0.75) {
          rfParticles.push({
            x: boxX + 55,
            y: cY + (Math.random() - 0.5) * 6,
            vx: 6.8,
            vy: (Math.random() - 0.5) * 0.1,
            deflected: false,
            trail: []
          });
        }

        for (let i = rfParticles.length - 1; i >= 0; i--) {
          let p = rfParticles[i];
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 6) p.trail.shift();

          p.x += p.vx;
          p.y += p.vy;

          if (!p.deflected && p.x >= cX - 2) {
            p.deflected = true;
            let r = Math.random();
            if (r < 0.985) {
              p.vy += (Math.random() - 0.5) * 0.3;
            } else if (r < 0.998) {
              let ang = (Math.random() > 0.5 ? 1 : -1) * (0.35 + Math.random() * 0.7);
              p.vx = Math.cos(ang) * 6.8;
              p.vy = Math.sin(ang) * 6.8;
            } else {
              let ang = Math.PI - (Math.random() - 0.5) * 0.6;
              p.vx = -Math.cos(ang) * 6.8;
              p.vy = Math.sin(ang) * 6.8;
            }
          }

          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = '#dc2626';
          ctx.fill();

          let d = Math.hypot(p.x - cX, p.y - cY);
          if (d >= sRadius - 7) {
            rfTrails.push({ x: p.x, y: p.y, alpha: 1.0 });
            rfParticles.splice(i, 1);
          }
        }

        for (let i = rfTrails.length - 1; i >= 0; i--) {
          let t = rfTrails[i];
          ctx.beginPath();
          ctx.arc(t.x, t.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${t.alpha})`;
          ctx.fill();
          t.alpha -= 0.03;
          if (t.alpha <= 0) rfTrails.splice(i, 1);
        }
      } else {
        const nucX = cX + 30;
        const nucY = cY;

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(nucX, nucY, 190, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12.5px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText('Không gian rỗng bên trong nguyên tử Vàng (Au)', nucX, nucY - 170);

        ctx.beginPath();
        ctx.arc(nucX, nucY, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Plus Jakarta Sans';
        ctx.fillText('+79', nucX, nucY + 4);

        if (rfRunning && Math.random() < 0.4) {
          rfParticles.push({
            x: 40,
            y: nucY + (Math.random() - 0.5) * 220,
            vx: 4.8,
            vy: 0,
            trail: []
          });
        }

        for (let i = rfParticles.length - 1; i >= 0; i--) {
          let p = rfParticles[i];
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 20) p.trail.shift();

          let dx = p.x - nucX;
          let dy = p.y - nucY;
          let distSq = dx * dx + dy * dy;
          let dist = Math.sqrt(distSq);

          if (dist > 18) {
            let force = 2200 / (distSq + 200);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }

          p.x += p.vx;
          p.y += p.vy;

          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#dc2626';
          ctx.fill();

          if (p.x < 0 || p.x > width + 40 || p.y < 0 || p.y > height + 40) {
            rfParticles.splice(i, 1);
          }
        }
      }
    }

    // 2. Scale Lab
    let zoomScale = 1;

    function changeZoomScale(val) {
      zoomScale = parseInt(val);
      const label = document.getElementById('zoomValLabel');
      if (zoomScale <= 10) {
        label.innerText = `Thu phóng: ${zoomScale}x (Toàn cảnh quả bóng rổ 30 cm)`;
      } else if (zoomScale < 5000) {
        label.innerText = `Thu phóng: ${zoomScale}x (Bắt đầu thấy tâm hạt nhân)`;
      } else {
        label.innerText = `Thu phóng: ${zoomScale}x (Cận cảnh hạt cát ở tâm 0,003 cm!)`;
      }
      updateHud();
    }

    function setPresetZoom(val) {
      document.getElementById('zoomRange').value = val;
      changeZoomScale(val);
    }

    function drawScale() {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const cX = width * 0.38;
      const cY = height * 0.5;
      const baseR = 140;

      ctx.save();
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.arc(cX, cY, baseR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(254, 215, 170, 0.2)';
      ctx.beginPath();
      ctx.arc(cX, cY, baseR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#c2410c';
      ctx.font = 'bold 13px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText('Đường kính Nguyên tử Vàng: Quả bóng rổ (30 cm)', cX, cY - baseR - 16);

      const sandR = Math.max(1.5, (baseR / 10000) * zoomScale);
      ctx.beginPath();
      ctx.arc(cX, cY, sandR, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cX + 10, cY - 10);
      ctx.lineTo(cX + 70, cY - 70);
      ctx.lineTo(cX + 140, cY - 70);
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 12px Plus Jakarta Sans';
      ctx.textAlign = 'left';
      ctx.fillText(`Hạt nhân = Hạt cát (0,003 cm)`, cX + 75, cY - 78);
      ctx.restore();

      const chartX = width * 0.72;
      const chartY = height * 0.28;
      const chartW = width * 0.24;

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(chartX, chartY, chartW, 230, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText('SO SÁNH KHỐI LƯỢNG', chartX + chartW * 0.5, chartY + 28);

      ctx.fillStyle = '#2563eb';
      ctx.fillRect(chartX + 25, chartY + 160 - 90, 24, 90);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px Plus Jakarta Sans';
      ctx.fillText('p', chartX + 37, chartY + 176);

      ctx.fillStyle = '#64748b';
      ctx.fillRect(chartX + chartW * 0.5 - 12, chartY + 160 - 90, 24, 90);
      ctx.fillStyle = '#0f172a';
      ctx.fillText('n', chartX + chartW * 0.5, chartY + 176);

      ctx.fillStyle = '#dc2626';
      ctx.fillRect(chartX + chartW - 49, chartY + 160 - 2, 24, 2);
      ctx.fillStyle = '#0f172a';
      ctx.fillText('e', chartX + chartW - 37, chartY + 176);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 10px Plus Jakarta Sans';
      ctx.fillText('~0 amu', chartX + chartW - 37, chartY + 152);
    }

    // 3. Nucleus Cluster Lab
    let curSym = 'Na';
    let curZ = 11;
    let curN = 12;
    let clusterSpheres = [];

    function generateNucleonCluster(z, n) {
      clusterSpheres = [];
      const total = z + n;
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < total; i++) {
        let isProton = (i < z);
        let y = 1 - (i / (total - 1 || 1)) * 2;
        let radiusAtY = Math.sqrt(1 - y * y);
        let theta = phi * i;

        let rCluster = 42 + Math.cbrt(total) * 12;
        let x = Math.cos(theta) * radiusAtY * rCluster;
        let zPos = Math.sin(theta) * radiusAtY * rCluster;
        let yPos = y * rCluster;

        clusterSpheres.push({
          x: x,
          y: yPos,
          z: zPos,
          isProton: isProton
        });
      }
    }
    generateNucleonCluster(curZ, curN);

    function setNucleusValues(sym, z, n) {
      curSym = sym;
      curZ = z;
      curN = n;
      document.getElementById('sliderZ').value = z;
      document.getElementById('sliderN').value = n;
      document.getElementById('valZ').innerText = z;
      document.getElementById('valN').innerText = n;
      generateNucleonCluster(z, n);
      updateHud();
    }

    function updateNucleusSliders() {
      curZ = parseInt(document.getElementById('sliderZ').value);
      curN = parseInt(document.getElementById('sliderN').value);
      document.getElementById('valZ').innerText = curZ;
      document.getElementById('valN').innerText = curN;

      const symbolMap = {
        1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B', 6: 'C', 7: 'N', 8: 'O',
        9: 'F', 10: 'Ne', 11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
        16: 'S', 17: 'Cl', 18: 'Ar', 19: 'K', 20: 'Ca'
      };
      curSym = symbolMap[curZ] || 'X';
      generateNucleonCluster(curZ, curN);
      updateHud();
    }

    let rotAngle = 0;

    function drawNucleusCalculator() {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const cX = width * 0.40;
      const cY = height * 0.5;

      rotAngle += 0.008;

      const rotated = clusterSpheres.map(s => {
        let cosA = Math.cos(rotAngle);
        let sinA = Math.sin(rotAngle);
        let rx = s.x * cosA - s.z * sinA;
        let rz = s.x * sinA + s.z * cosA;
        return {
          x: rx,
          y: s.y,
          z: rz,
          isProton: s.isProton
        };
      }).sort((a, b) => a.z - b.z);

      rotated.forEach(s => {
        let drawX = cX + s.x;
        let drawY = cY + s.y;
        let sphereR = 12 + (s.z / 80) * 3;

        ctx.save();
        const sphereGrad = ctx.createRadialGradient(drawX - sphereR * 0.3, drawY - sphereR * 0.3, 1, drawX, drawY, sphereR);
        if (s.isProton) {
          sphereGrad.addColorStop(0, '#ffedd5');
          sphereGrad.addColorStop(0.3, '#f97316');
          sphereGrad.addColorStop(1, '#c2410c');
        } else {
          sphereGrad.addColorStop(0, '#ffffff');
          sphereGrad.addColorStop(0.3, '#cbd5e1');
          sphereGrad.addColorStop(1, '#64748b');
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, sphereR, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.fill();
        ctx.restore();
      });

      ctx.fillStyle = '#c2410c';
      ctx.font = 'bold 12px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText(`● ${curZ} Proton (+1)`, cX - 60, cY + 120);

      ctx.fillStyle = '#64748b';
      ctx.fillText(`● ${curN} Neutron (0)`, cX + 60, cY + 120);

      const cardX = width * 0.70;
      const cardY = height * 0.22;
      const cardW = width * 0.26;

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, 260, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 56px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText(curSym, cardX + cardW * 0.58, cardY + 95);

      const curA = curZ + curN;
      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 22px JetBrains Mono';
      ctx.textAlign = 'right';
      ctx.fillText(`${curA}`, cardX + cardW * 0.34, cardY + 70);

      ctx.fillStyle = '#2563eb';
      ctx.fillText(`${curZ}`, cardX + cardW * 0.34, cardY + 105);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 13px Plus Jakarta Sans';
      ctx.fillText(`A = Z + N = ${curZ} + ${curN} = ${curA}`, cardX + cardW * 0.5, cardY + 150);

      ctx.font = '12px Plus Jakarta Sans';
      ctx.fillStyle = '#475569';
      ctx.fillText(`• Số proton (p) = ${curZ}`, cardX + cardW * 0.5, cardY + 180);
      ctx.fillText(`• Số neutron (n) = ${curN}`, cardX + cardW * 0.5, cardY + 202);
      ctx.fillText(`• Số electron (e) = ${curZ}`, cardX + cardW * 0.5, cardY + 224);
    }


    /* ==========================================================
       BÀI 2: LOGIC & CANVAS ENGINE
       ========================================================== */
    let currentPartB2 = 'b2_p1';

    function switchPartB2(part) {
      currentPartB2 = part;
      const tabs = ['b2_p1', 'b2_p2', 'b2_p3'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        if (btn) btn.className = (t === part) ? 'tab-seg-btn active' : 'tab-seg-btn';

        const content = document.getElementById('content-' + t.replace('_', '-'));
        if (content) content.className = (t === part) ? 'lesson-section-content active' : 'lesson-section-content';

        const footer = document.getElementById('footer-' + t.replace('_', '-'));
        if (footer) footer.style.display = (t === part) ? 'flex' : 'none';
      });

      updateHudB2();
      renderMathInPage();
    }

    function updateHudB2() {
      const h1 = document.getElementById('hud-line1-b2');
      const h2 = document.getElementById('hud-line2-b2');
      const h3 = document.getElementById('hud-line3-b2');

      if (currentPartB2 === 'b2_p1') {
        const d = b2Elements[b2CurElem];
        h1.innerHTML = `MÔ HÌNH: <span>Giải phẫu Kí hiệu $^{A}_{Z}\\text{X}$ (${d.name})</span>`;
        h2.innerHTML = `THÔNG SỐ: <span>Z = ${d.Z} (Số hiệu / số p / số e), A = ${d.A} (Số khối)</span>`;
        h3.innerHTML = `QUY TẮC: <span>Số neutron N = A - Z = ${d.A - d.Z}</span>`;
      } else if (currentPartB2 === 'b2_p2') {
        h1.innerHTML = `CHẾ ĐỘ: <span>Mô hình 3D Các Đồng Vị (${currentIsoGroup})</span>`;
        h2.innerHTML = `ĐẶC ĐIỂM: <span>Cùng số proton Z, khác nhau số neutron N</span>`;
        h3.innerHTML = `TÍNH CHẤT: <span>Tính chất hoá học giống nhau, vật lý khác nhau</span>`;
      } else {
        const p = msPresets[currentMsPreset];
        h1.innerHTML = `THÍ NGHIỆM: <span>Máy đo phổ khối lượng (Mass Spectrometry - MS)</span>`;
        h2.innerHTML = `PHỔ ĐO: <span>${p.title}</span>`;
        h3.innerHTML = `NGUYÊN TỬ KHỐI: <span>Trung bình A = ${p.avg} amu</span>`;
      }
    }

    const canvasB2 = document.getElementById('stageCanvasB2');
    const ctxB2 = canvasB2.getContext('2d');
    let widthB2 = 600, heightB2 = 500;

    function resizeStageCanvasB2() {
      const container = canvasB2.parentElement;
      if (!container || container.clientWidth === 0) return;
      widthB2 = container.clientWidth;
      heightB2 = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvasB2.width = widthB2 * dpr;
      canvasB2.height = heightB2 * dpr;
      ctxB2.setTransform(1, 0, 0, 1, 0, 0);
      ctxB2.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeStageCanvasB2);

    // Bài 2 Phần 1: Kí hiệu nguyên tử
    const b2Elements = {
      H: { sym: 'H', name: 'Hydrogen', Z: 1, A: 1 },
      C: { sym: 'C', name: 'Carbon', Z: 6, A: 12 },
      N: { sym: 'N', name: 'Nitrogen', Z: 7, A: 14 },
      O: { sym: 'O', name: 'Oxygen', Z: 8, A: 16 },
      Na: { sym: 'Na', name: 'Sodium', Z: 11, A: 23 },
      Cl: { sym: 'Cl', name: 'Chlorine', Z: 17, A: 35 },
      Fe: { sym: 'Fe', name: 'Iron', Z: 26, A: 56 }
    };
    let b2CurElem = 'Na';

    function selectB2Element(sym) {
      b2CurElem = sym;
      const d = b2Elements[sym];
      document.getElementById('elemNoticeDisplay').innerText = `Z = Số p = Số e = ${d.Z} | N = ${d.A - d.Z}`;
      updateHudB2();
    }

    function drawB2Part1() {
      ctxB2.fillStyle = '#f8fafc';
      ctxB2.fillRect(0, 0, widthB2, heightB2);

      const d = b2Elements[b2CurElem];
      const cX = widthB2 * 0.5;
      const cY = heightB2 * 0.48;

      // Hộp kí hiệu nguyên tử trang nhã
      ctxB2.fillStyle = '#ffffff';
      ctxB2.strokeStyle = '#93c5fd';
      ctxB2.lineWidth = 2.5;
      ctxB2.beginPath();
      ctxB2.roundRect(cX - 130, cY - 140, 260, 260, 18);
      ctxB2.fill();
      ctxB2.stroke();

      // Kí hiệu chữ
      ctxB2.fillStyle = '#0284c7';
      ctxB2.font = 'bold 72px Plus Jakarta Sans';
      ctxB2.textAlign = 'center';
      ctxB2.fillText(d.sym, cX + 22, cY + 28);

      // Số khối A
      ctxB2.fillStyle = '#d97706';
      ctxB2.font = 'bold 30px JetBrains Mono';
      ctxB2.textAlign = 'right';
      ctxB2.fillText(d.A, cX - 45, cY - 32);

      // Số hiệu Z
      ctxB2.fillStyle = '#2563eb';
      ctxB2.fillText(d.Z, cX - 45, cY + 45);

      // Nhãn chú thích với mũi tên chỉ báo
      // A nhãn
      ctxB2.strokeStyle = '#d97706';
      ctxB2.lineWidth = 1.5;
      ctxB2.beginPath();
      ctxB2.moveTo(cX - 55, cY - 40);
      ctxB2.lineTo(cX - 160, cY - 80);
      ctxB2.lineTo(cX - 230, cY - 80);
      ctxB2.stroke();

      ctxB2.fillStyle = '#d97706';
      ctxB2.font = 'bold 12.5px Plus Jakarta Sans';
      ctxB2.textAlign = 'right';
      ctxB2.fillText('SỐ KHỐI (A = Z + N)', cX - 235, cY - 76);
      ctxB2.font = '11px Plus Jakarta Sans';
      ctxB2.fillStyle = '#64748b';
      ctxB2.fillText(`= ${d.Z} + ${d.A - d.Z} = ${d.A}`, cX - 235, cY - 60);

      // Z nhãn
      ctxB2.strokeStyle = '#2563eb';
      ctxB2.beginPath();
      ctxB2.moveTo(cX - 55, cY + 40);
      ctxB2.lineTo(cX - 160, cY + 90);
      ctxB2.lineTo(cX - 230, cY + 90);
      ctxB2.stroke();

      ctxB2.fillStyle = '#2563eb';
      ctxB2.font = 'bold 12.5px Plus Jakarta Sans';
      ctxB2.fillText('SỐ HIỆU NGUYÊN TỬ (Z)', cX - 235, cY + 86);
      ctxB2.font = '11px Plus Jakarta Sans';
      ctxB2.fillStyle = '#64748b';
      ctxB2.fillText(`= Số proton = Số electron = ${d.Z}`, cX - 235, cY + 102);

      // Kí hiệu nhãn
      ctxB2.strokeStyle = '#0284c7';
      ctxB2.beginPath();
      ctxB2.moveTo(cX + 65, cY);
      ctxB2.lineTo(cX + 160, cY);
      ctxB2.lineTo(cX + 220, cY);
      ctxB2.stroke();

      ctxB2.fillStyle = '#0284c7';
      ctxB2.font = 'bold 12.5px Plus Jakarta Sans';
      ctxB2.textAlign = 'left';
      ctxB2.fillText(`KÍ HIỆU HOÁ HỌC: ${d.name}`, cX + 225, cY + 4);
    }

    // Bài 2 Phần 2: Đồng vị (3 dạng Hydrogen)
    let currentIsoGroup = 'H';
    const isotopeGroups = {
      H: [
        { name: 'Protium', sym: '1H', Z: 1, N: 0, A: 1, pct: '99.985%' },
        { name: 'Deuterium (D)', sym: '2H', Z: 1, N: 1, A: 2, pct: '0.015%' },
        { name: 'Tritium (T)', sym: '3H', Z: 1, N: 2, A: 3, pct: 'Vết (Phóng xạ)' }
      ],
      Cl: [
        { name: 'Chlorine-35', sym: '35Cl', Z: 17, N: 18, A: 35, pct: '75.77%' },
        { name: 'Chlorine-37', sym: '37Cl', Z: 17, N: 20, A: 37, pct: '24.23%' }
      ],
      C: [
        { name: 'Carbon-12', sym: '12C', Z: 6, N: 6, A: 12, pct: '98.89%' },
        { name: 'Carbon-13', sym: '13C', Z: 6, N: 7, A: 13, pct: '1.11%' },
        { name: 'Carbon-14', sym: '14C', Z: 6, N: 8, A: 14, pct: 'Vết (Đo tuổi C-14)' }
      ]
    };

    function selectIsotopeGroup(grp) {
      currentIsoGroup = grp;
      document.getElementById('btn-iso-h').className = (grp === 'H') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      document.getElementById('btn-iso-cl').className = (grp === 'Cl') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      document.getElementById('btn-iso-c').className = (grp === 'C') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      updateHudB2();
    }

    function drawB2Part2() {
      ctxB2.fillStyle = '#f8fafc';
      ctxB2.fillRect(0, 0, widthB2, heightB2);

      const isos = isotopeGroups[currentIsoGroup];
      const count = isos.length;
      const cardW = Math.min(180, (widthB2 - 80) / count - 16);
      const startX = (widthB2 - (count * (cardW + 18) - 18)) * 0.5;

      for (let i = 0; i < count; i++) {
        const item = isos[i];
        const cardX = startX + i * (cardW + 18);
        const cardY = heightB2 * 0.22;

        ctxB2.fillStyle = '#ffffff';
        ctxB2.strokeStyle = '#cbd5e1';
        ctxB2.lineWidth = 1.5;
        ctxB2.beginPath();
        ctxB2.roundRect(cardX, cardY, cardW, 260, 14);
        ctxB2.fill();
        ctxB2.stroke();

        ctxB2.fillStyle = '#0f172a';
        ctxB2.font = 'bold 14px Plus Jakarta Sans';
        ctxB2.textAlign = 'center';
        ctxB2.fillText(item.name, cardX + cardW * 0.5, cardY + 28);

        ctxB2.fillStyle = '#0284c7';
        ctxB2.font = 'bold 22px JetBrains Mono';
        ctxB2.fillText(item.sym, cardX + cardW * 0.5, cardY + 60);

        // Minh hoạ hạt nhân với các viên bi p và n
        const nucCenterX = cardX + cardW * 0.5;
        const nucCenterY = cardY + 115;

        // Vòng quỹ đạo electron bao quanh
        ctxB2.strokeStyle = '#94a3b8';
        ctxB2.setLineDash([3, 3]);
        ctxB2.lineWidth = 1;
        ctxB2.beginPath();
        ctxB2.arc(nucCenterX, nucCenterY, 38, 0, Math.PI * 2);
        ctxB2.stroke();
        ctxB2.setLineDash([]);

        // Electron quay trên quỹ đạo
        const eAngle = Date.now() * 0.002 + i;
        ctxB2.beginPath();
        ctxB2.arc(nucCenterX + Math.cos(eAngle) * 38, nucCenterY + Math.sin(eAngle) * 38, 3.5, 0, Math.PI * 2);
        ctxB2.fillStyle = '#2563eb';
        ctxB2.fill();

        // Bi proton ở tâm
        ctxB2.beginPath();
        ctxB2.arc(nucCenterX - (item.N > 0 ? 5 : 0), nucCenterY, 8, 0, Math.PI * 2);
        ctxB2.fillStyle = '#f97316';
        ctxB2.fill();

        // Bi neutron nếu có
        for (let n = 0; n < Math.min(item.N, 4); n++) {
          let nx = nucCenterX + 6 + (n % 2) * 6;
          let ny = nucCenterY - 4 + Math.floor(n / 2) * 8;
          ctxB2.beginPath();
          ctxB2.arc(nx, ny, 7, 0, Math.PI * 2);
          ctxB2.fillStyle = '#64748b';
          ctxB2.fill();
        }

        // Chú thích số hạt
        ctxB2.font = '12px Plus Jakarta Sans';
        ctxB2.fillStyle = '#334155';
        ctxB2.fillText(`• ${item.Z} proton (p)`, cardX + cardW * 0.5, cardY + 180);
        ctxB2.fillText(`• ${item.N} neutron (n)`, cardX + cardW * 0.5, cardY + 202);
        ctxB2.fillText(`• ${item.Z} electron (e)`, cardX + cardW * 0.5, cardY + 224);

        ctxB2.fillStyle = '#059669';
        ctxB2.font = 'bold 11.5px Plus Jakarta Sans';
        ctxB2.fillText(`Tỉ lệ: ${item.pct}`, cardX + cardW * 0.5, cardY + 248);
      }
    }

    // Bài 2 Phần 3: Phổ khối lượng (Mass Spectrometry - MS)
    let currentMsPreset = 'Cl';
    let msRunning = false;
    let msBeamParticles = [];
    let msAnimStep = 0;

    const msPresets = {
      Cl: {
        title: 'Chlorine (Cl)',
        peaks: [
          { m: 35, pct: 75.77, color: '#0284c7' },
          { m: 37, pct: 24.23, color: '#0284c7' }
        ],
        avg: '35.485'
      },
      Ne: {
        title: 'Neon (Ne)',
        peaks: [
          { m: 20, pct: 90.48, color: '#10b981' },
          { m: 21, pct: 0.27, color: '#10b981' },
          { m: 22, pct: 9.25, color: '#10b981' }
        ],
        avg: '20.188'
      },
      Cu: {
        title: 'Copper (Cu)',
        peaks: [
          { m: 63, pct: 73.0, color: '#f59e0b' },
          { m: 65, pct: 27.0, color: '#f59e0b' }
        ],
        avg: '63.540'
      }
    };

    function selectMsPreset(p) {
      currentMsPreset = p;
      document.getElementById('btn-ms-cl').className = (p === 'Cl') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      document.getElementById('btn-ms-ne').className = (p === 'Ne') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      document.getElementById('btn-ms-cu').className = (p === 'Cu') ? 'btn-tool btn-tool-active' : 'btn-tool btn-tool-subtle';
      msBeamParticles = [];
      updateHudB2();
    }

    function toggleMsSimulation() {
      msRunning = !msRunning;
      const btn = document.getElementById('btn-run-ms');
      if (msRunning) {
        btn.classList.add('btn-tool-active');
        btn.innerHTML = '<span>⏹ Dừng chùm ion</span>';
      } else {
        btn.classList.remove('btn-tool-active');
        btn.innerHTML = '<span>▶ Bắn ion hoá phổ MS</span>';
      }
    }

    function drawB2Part3() {
      ctxB2.fillStyle = '#f8fafc';
      ctxB2.fillRect(0, 0, widthB2, heightB2);

      const preset = msPresets[currentMsPreset];

      // Phía Trái: Mô phỏng buồng gia tốc và từ trường làm lệch ion
      const simX = 35;
      const simY = heightB2 * 0.16;
      const simW = widthB2 * 0.44;
      const simH = heightB2 * 0.72;

      ctxB2.fillStyle = '#ffffff';
      ctxB2.strokeStyle = '#e2e8f0';
      ctxB2.lineWidth = 1.5;
      ctxB2.beginPath();
      ctxB2.roundRect(simX, simY, simW, simH, 14);
      ctxB2.fill();
      ctxB2.stroke();

      ctxB2.fillStyle = '#0f172a';
      ctxB2.font = 'bold 12.5px Plus Jakarta Sans';
      ctxB2.textAlign = 'left';
      ctxB2.fillText('BUỒNG PHÂN TÍCH TỪ TRƯỜNG MS', simX + 16, simY + 26);

      // Buồng ion hoá
      ctxB2.fillStyle = '#f1f5f9';
      ctxB2.fillRect(simX + 16, simY + 45, 60, 36);
      ctxB2.fillStyle = '#0284c7';
      ctxB2.font = 'bold 11px Plus Jakarta Sans';
      ctxB2.fillText('Nguồn ion (+)', simX + 18, simY + 68);

      // Nam châm điện tạo từ trường uốn cong quỹ đạo
      ctxB2.fillStyle = 'rgba(254, 240, 138, 0.4)';
      ctxB2.strokeStyle = '#facc15';
      ctxB2.beginPath();
      ctxB2.arc(simX + simW * 0.45, simY + simH * 0.55, 65, 0, Math.PI * 2);
      ctxB2.fill();
      ctxB2.stroke();
      ctxB2.fillStyle = '#854d0e';
      ctxB2.font = 'bold 11px Plus Jakarta Sans';
      ctxB2.fillText('Từ trường (B)', simX + simW * 0.35, simY + simH * 0.55);

      // Đầu dò detector
      ctxB2.fillStyle = '#10b981';
      ctxB2.fillRect(simX + simW - 16, simY + simH * 0.4, 8, 120);

      // Bắn ion
      if (msRunning && Math.random() < 0.6) {
        // Sinh ion theo tỉ lệ phần trăm
        let r = Math.random() * 100;
        let accum = 0;
        let chosenM = preset.peaks[0].m;
        for (let pk of preset.peaks) {
          accum += pk.pct;
          if (r <= accum) {
            chosenM = pk.m;
            break;
          }
        }
        msBeamParticles.push({
          x: simX + 76,
          y: simY + 63,
          vx: 3.5,
          vy: 0,
          m: chosenM
        });
      }

      for (let i = msBeamParticles.length - 1; i >= 0; i--) {
        let p = msBeamParticles[i];
        p.x += p.vx;

        // Khi vào từ trường, ion bị bẻ cong theo tỉ lệ m/z (khối lượng m càng nặng thì bán kính uốn càng lớn)
        if (p.x > simX + simW * 0.3) {
          let curveRatio = 0.045 / (p.m / 25);
          p.vy += curveRatio;
          p.vx = Math.max(1.2, p.vx - 0.01);
        }
        p.y += p.vy;

        ctxB2.beginPath();
        ctxB2.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctxB2.fillStyle = (p.m === preset.peaks[0].m) ? '#0284c7' : '#ea580c';
        ctxB2.fill();

        if (p.x >= simX + simW - 16 || p.y > simY + simH - 10) {
          msBeamParticles.splice(i, 1);
        }
      }

      // Phía Phải: Biểu đồ phổ vạch khối lượng (Mass Spectrum Chart)
      const chartX = widthB2 * 0.52;
      const chartY = heightB2 * 0.16;
      const chartW = widthB2 * 0.44;
      const chartH = heightB2 * 0.72;

      ctxB2.fillStyle = '#ffffff';
      ctxB2.strokeStyle = '#e2e8f0';
      ctxB2.lineWidth = 1.5;
      ctxB2.beginPath();
      ctxB2.roundRect(chartX, chartY, chartW, chartH, 14);
      ctxB2.fill();
      ctxB2.stroke();

      ctxB2.fillStyle = '#0f172a';
      ctxB2.font = 'bold 13px Plus Jakarta Sans';
      ctxB2.textAlign = 'left';
      ctxB2.fillText(`PHỔ KHỐI LƯỢNG (MS) - ${preset.title}`, chartX + 18, chartY + 28);

      // Hệ trục toạ độ
      const axX = chartX + 45;
      const axY = chartY + chartH - 45;
      const axW = chartW - 65;
      const axH = chartH - 90;

      ctxB2.strokeStyle = '#94a3b8';
      ctxB2.lineWidth = 1.5;
      ctxB2.beginPath();
      ctxB2.moveTo(axX, chartY + 45);
      ctxB2.lineTo(axX, axY);
      ctxB2.lineTo(axX + axW, axY);
      ctxB2.stroke();

      // Nhãn trục Y (% Số nguyên tử)
      ctxB2.fillStyle = '#64748b';
      ctxB2.font = '11px Plus Jakarta Sans';
      ctxB2.fillText('% Số nguyên tử', axX - 10, chartY + 40);

      // Nhãn trục X (m/z)
      ctxB2.fillText('Khối lượng m/z (amu)', axX + axW - 80, axY + 30);

      // Vẽ các vạch đỉnh phổ (Peaks)
      const numPeaks = preset.peaks.length;
      for (let k = 0; k < numPeaks; k++) {
        let pk = preset.peaks[k];
        let peakX = axX + (axW / (numPeaks + 1)) * (k + 1);
        let peakH = (pk.pct / 100) * (axH - 20);
        let peakY = axY - peakH;

        // Vạch phổ sắc nhọn
        ctxB2.strokeStyle = pk.color;
        ctxB2.lineWidth = 6;
        ctxB2.beginPath();
        ctxB2.moveTo(peakX, axY);
        ctxB2.lineTo(peakX, peakY);
        ctxB2.stroke();

        // Nhãn đỉnh (% và m/z)
        ctxB2.fillStyle = '#0f172a';
        ctxB2.font = 'bold 12px JetBrains Mono';
        ctxB2.textAlign = 'center';
        ctxB2.fillText(`${pk.pct}%`, peakX, peakY - 8);

        ctxB2.fillStyle = '#0284c7';
        ctxB2.font = 'bold 13px JetBrains Mono';
        ctxB2.fillText(`${pk.m}`, peakX, axY + 18);
      }

      // Khung công thức tính nguyên tử khối trung bình phía dưới
      ctxB2.fillStyle = '#f8fafc';
      ctxB2.strokeStyle = '#bae6fd';
      ctxB2.lineWidth = 1;
      ctxB2.beginPath();
      ctxB2.roundRect(chartX + 16, chartY + chartH - 90, chartW - 32, 40, 8);
      ctxB2.fill();
      ctxB2.stroke();

      ctxB2.fillStyle = '#0284c7';
      ctxB2.font = 'bold 13px JetBrains Mono';
      ctxB2.textAlign = 'center';
      ctxB2.fillText(`Nguyên tử khối trung bình A = ${preset.avg} amu`, chartX + chartW * 0.5, chartY + chartH - 65);
    }


    /* ==========================================================
       MAIN LOOP HỆ THỐNG
       ========================================================== */
    function mainLoop() {
      if (document.getElementById('view-studio').classList.contains('active')) {
        if (currentPart === 'part1a') drawThomson();
        else if (currentPart === 'part1b') drawRutherford();
        else if (currentPart === 'part2') drawScale();
        else drawNucleusCalculator();
      } else if (document.getElementById('view-studio-b2').classList.contains('active')) {
        if (currentPartB2 === 'b2_p1') drawB2Part1();
        else if (currentPartB2 === 'b2_p2') drawB2Part2();
        else drawB2Part3();
      }
      requestAnimationFrame(mainLoop);
    }
    mainLoop();

    /* ==========================================================
       BÀI TẬP SGK: KIỂM TRA ĐÁP ÁN
       ========================================================== */
    function checkEx(element, isCorrect, explanation) {
      const parent = element.closest('.exercise-box');
      const resBox = parent.querySelector('.exercise-result');

      parent.querySelectorAll('.option-item').forEach(opt => {
        opt.classList.remove('correct', 'wrong');
      });

      if (isCorrect) {
        element.classList.add('correct');
        resBox.style.background = '#dcfce7';
        resBox.style.border = '1px solid #86efac';
        resBox.style.color = '#15803d';
        resBox.innerHTML = `<strong>✅ Giải thích chuẩn xác:</strong> ${explanation}`;
      } else {
        element.classList.add('wrong');
        resBox.style.background = '#fee2e2';
        resBox.style.border = '1px solid #86efac';
        resBox.style.color = '#991b1b';
        resBox.innerHTML = `<strong>❌ Chưa đúng:</strong> ${explanation}`;
      }
      resBox.classList.add('show');
    }
  


    /* ==========================================================
       LOGIC BÀI 3: CẤU TRÚC LỚP VỎ ELECTRON NGUYÊN TỬ
       ========================================================== */

    /* ==========================================================
       TAB SWITCHERS FOR LESSONS 3, 4, 5 (STANDARDIZED)
       ========================================================== */

    let currentPartB3 = 'part1';
    function switchPartB3(partId) {
      currentPartB3 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b3-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b3-' + p);
        const panel = document.getElementById('panel-b3-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (window.renderMathInElement) {
        const activeSec = document.getElementById('content-b3-' + partId);
        if (activeSec) {
          renderMathInElement(activeSec, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        }
      }

      setTimeout(() => {
        if (partId === 'part1') resizeB3CloudCanvas();
        else if (partId === 'part2') resizeB3OrbitalCanvas();
        else if (partId === 'part3') renderB3OrbitalBoxes();
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


    let currentPartB4 = 'part1';
    function switchPartB4(partId) {
      currentPartB4 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b4-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b4-' + p);
        const panel = document.getElementById('panel-b4-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (window.renderMathInElement) {
        const activeSec = document.getElementById('content-b4-' + partId);
        if (activeSec) {
          renderMathInElement(activeSec, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        }
      }

      setTimeout(() => {
        if (partId === 'part1') resizeB4MindmapCanvas();
        else if (partId === 'part3') renderB4CurrentQuestion();
      }, 50);
    }

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






    let currentPartB5 = 'part1';
    function switchPartB5(partId) {
      currentPartB5 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b5-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b5-' + p);
        const panel = document.getElementById('panel-b5-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (window.renderMathInElement) {
        const activeSec = document.getElementById('content-b5-' + partId);
        if (activeSec) {
          renderMathInElement(activeSec, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        }
      }

      setTimeout(() => {
        if (partId === 'part1') initB5PeriodicTable();
        else if (partId === 'part2') resizeB5AnatomyCanvas();
        else if (partId === 'part3') renderB5CurrentQuestion();
      }, 50);
    }


function checkB5Quiz(btn, isCorrect, feedbackText) {
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
       TAB 1: DỮ LIỆU & BẢNG TUẦN HOÀN 118 NGUYÊN TỐ
       ---------------------------------------------------------- */
    // Dữ liệu mẫu phong phú của các nguyên tố tiêu biểu và đầy đủ cấu trúc 18 cột
    const B5_ELEMENTS_DATA = [
      // Chu kì 1
      { Z: 1, sym: 'H', name: 'Hydrogen', mass: '1.008', period: 1, group: 'IA', col: 1, row: 1, type: 'nonmetal', block: 's', config: '1s¹' },
      { Z: 2, sym: 'He', name: 'Helium', mass: '4.003', period: 1, group: 'VIIIA', col: 18, row: 1, type: 'noble', block: 's', config: '1s²' },

      // Chu kì 2
      { Z: 3, sym: 'Li', name: 'Lithium', mass: '6.941', period: 2, group: 'IA', col: 1, row: 2, type: 'metal', block: 's', config: '[He] 2s¹' },
      { Z: 4, sym: 'Be', name: 'Beryllium', mass: '9.012', period: 2, group: 'IIA', col: 2, row: 2, type: 'metal', block: 's', config: '[He] 2s²' },
      { Z: 5, sym: 'B', name: 'Boron', mass: '10.81', period: 2, group: 'IIIA', col: 13, row: 2, type: 'metalloid', block: 'p', config: '[He] 2s² 2p¹' },
      { Z: 6, sym: 'C', name: 'Carbon', mass: '12.011', period: 2, group: 'IVA', col: 14, row: 2, type: 'nonmetal', block: 'p', config: '[He] 2s² 2p²' },
      { Z: 7, sym: 'N', name: 'Nitrogen', mass: '14.007', period: 2, group: 'VA', col: 15, row: 2, type: 'nonmetal', block: 'p', config: '[He] 2s² 2p³' },
      { Z: 8, sym: 'O', name: 'Oxygen', mass: '15.999', period: 2, group: 'VIA', col: 16, row: 2, type: 'nonmetal', block: 'p', config: '[He] 2s² 2p⁴' },
      { Z: 9, sym: 'F', name: 'Fluorine', mass: '18.998', period: 2, group: 'VIIA', col: 17, row: 2, type: 'nonmetal', block: 'p', config: '[He] 2s² 2p⁵' },
      { Z: 10, sym: 'Ne', name: 'Neon', mass: '20.180', period: 2, group: 'VIIIA', col: 18, row: 2, type: 'noble', block: 'p', config: '[He] 2s² 2p⁶' },

      // Chu kì 3
      { Z: 11, sym: 'Na', name: 'Sodium', mass: '22.990', period: 3, group: 'IA', col: 1, row: 3, type: 'metal', block: 's', config: '[Ne] 3s¹' },
      { Z: 12, sym: 'Mg', name: 'Magnesium', mass: '24.305', period: 3, group: 'IIA', col: 2, row: 3, type: 'metal', block: 's', config: '[Ne] 3s²' },
      { Z: 13, sym: 'Al', name: 'Aluminium', mass: '26.982', period: 3, group: 'IIIA', col: 13, row: 3, type: 'metal', block: 'p', config: '[Ne] 3s² 3p¹' },
      { Z: 14, sym: 'Si', name: 'Silicon', mass: '28.085', period: 3, group: 'IVA', col: 14, row: 3, type: 'metalloid', block: 'p', config: '[Ne] 3s² 3p²' },
      { Z: 15, sym: 'P', name: 'Phosphorus', mass: '30.974', period: 3, group: 'VA', col: 15, row: 3, type: 'nonmetal', block: 'p', config: '[Ne] 3s² 3p³' },
      { Z: 16, sym: 'S', name: 'Sulfur', mass: '32.065', period: 3, group: 'VIA', col: 16, row: 3, type: 'nonmetal', block: 'p', config: '[Ne] 3s² 3p⁴' },
      { Z: 17, sym: 'Cl', name: 'Chlorine', mass: '35.453', period: 3, group: 'VIIA', col: 17, row: 3, type: 'nonmetal', block: 'p', config: '[Ne] 3s² 3p⁵' },
      { Z: 18, sym: 'Ar', name: 'Argon', mass: '39.948', period: 3, group: 'VIIIA', col: 18, row: 3, type: 'noble', block: 'p', config: '[Ne] 3s² 3p⁶' },

      // Chu kì 4 (18 nguyên tố)
      { Z: 19, sym: 'K', name: 'Potassium', mass: '39.098', period: 4, group: 'IA', col: 1, row: 4, type: 'metal', block: 's', config: '[Ar] 4s¹' },
      { Z: 20, sym: 'Ca', name: 'Calcium', mass: '40.078', period: 4, group: 'IIA', col: 2, row: 4, type: 'metal', block: 's', config: '[Ar] 4s²' },
      { Z: 21, sym: 'Sc', name: 'Scandium', mass: '44.956', period: 4, group: 'IIIB', col: 3, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d¹ 4s²' },
      { Z: 22, sym: 'Ti', name: 'Titanium', mass: '47.867', period: 4, group: 'IVB', col: 4, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d² 4s²' },
      { Z: 23, sym: 'V', name: 'Vanadium', mass: '50.942', period: 4, group: 'VB', col: 5, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d³ 4s²' },
      { Z: 24, sym: 'Cr', name: 'Chromium', mass: '51.996', period: 4, group: 'VIB', col: 6, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d⁵ 4s¹' },
      { Z: 25, sym: 'Mn', name: 'Manganese', mass: '54.938', period: 4, group: 'VIIB', col: 7, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d⁵ 4s²' },
      { Z: 26, sym: 'Fe', name: 'Iron (Sắt)', mass: '55.845', period: 4, group: 'VIIIB', col: 8, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d⁶ 4s²' },
      { Z: 27, sym: 'Co', name: 'Cobalt', mass: '58.933', period: 4, group: 'VIIIB', col: 9, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d⁷ 4s²' },
      { Z: 28, sym: 'Ni', name: 'Nickel', mass: '58.693', period: 4, group: 'VIIIB', col: 10, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d⁸ 4s²' },
      { Z: 29, sym: 'Cu', name: 'Copper (Đồng)', mass: '63.546', period: 4, group: 'IB', col: 11, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d¹⁰ 4s¹' },
      { Z: 30, sym: 'Zn', name: 'Zinc (Kẽm)', mass: '65.38', period: 4, group: 'IIB', col: 12, row: 4, type: 'transition', block: 'd', config: '[Ar] 3d¹⁰ 4s²' },
      { Z: 31, sym: 'Ga', name: 'Gallium', mass: '69.723', period: 4, group: 'IIIA', col: 13, row: 4, type: 'metal', block: 'p', config: '[Ar] 3d¹⁰ 4s² 4p¹' },
      { Z: 32, sym: 'Ge', name: 'Germanium', mass: '72.630', period: 4, group: 'IVA', col: 14, row: 4, type: 'metalloid', block: 'p', config: '[Ar] 3d¹⁰ 4s² 4p²' },
      { Z: 33, sym: 'As', name: 'Arsenic', mass: '74.922', period: 4, group: 'VA', col: 15, row: 4, type: 'metalloid', block: 'p', config: '[Ar] 3d¹⁰ 4s² 4p³' },
      { Z: 34, sym: 'Se', name: 'Selenium', mass: '78.96', period: 4, group: 'VIA', col: 16, row: 4, type: 'nonmetal', block: 'p', config: '[Ar] 3d¹⁰ 4s² 4p⁴' },
      { Z: 35, sym: 'Br', name: 'Bromine', mass: '79.904', period: 4, group: 'VIIA', col: 17, row: 4, type: 'nonmetal', block: 'p', config: '[Ar] 3d¹⁰ 4s² 4p⁵' },
      { Z: 36, sym: 'Kr', name: 'Krypton', mass: '83.798', period: 4, group: 'VIIIA', col: 18, row: 4, type: 'noble', block: 'p', config: '[Ar] 3d¹⁰ 4s² 4p⁶' },

      // Chu kì 5, 6, 7 tiêu biểu
      { Z: 37, sym: 'Rb', name: 'Rubidium', mass: '85.468', period: 5, group: 'IA', col: 1, row: 5, type: 'metal', block: 's', config: '[Kr] 5s¹' },
      { Z: 38, sym: 'Sr', name: 'Strontium', mass: '87.62', period: 5, group: 'IIA', col: 2, row: 5, type: 'metal', block: 's', config: '[Kr] 5s²' },
      { Z: 47, sym: 'Ag', name: 'Silver (Bạc)', mass: '107.87', period: 5, group: 'IB', col: 11, row: 5, type: 'transition', block: 'd', config: '[Kr] 4d¹⁰ 5s¹' },
      { Z: 53, sym: 'I', name: 'Iodine', mass: '126.90', period: 5, group: 'VIIA', col: 17, row: 5, type: 'nonmetal', block: 'p', config: '[Kr] 4d¹⁰ 5s² 5p⁵' },
      { Z: 54, sym: 'Xe', name: 'Xenon', mass: '131.29', period: 5, group: 'VIIIA', col: 18, row: 5, type: 'noble', block: 'p', config: '[Kr] 4d¹⁰ 5s² 5p⁶' },

      { Z: 55, sym: 'Cs', name: 'Caesium', mass: '132.91', period: 6, group: 'IA', col: 1, row: 6, type: 'metal', block: 's', config: '[Xe] 6s¹' },
      { Z: 56, sym: 'Ba', name: 'Barium', mass: '137.33', period: 6, group: 'IIA', col: 2, row: 6, type: 'metal', block: 's', config: '[Xe] 6s²' },
      { Z: 79, sym: 'Au', name: 'Gold (Vàng)', mass: '196.97', period: 6, group: 'IB', col: 11, row: 6, type: 'transition', block: 'd', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹' },
      { Z: 80, sym: 'Hg', name: 'Mercury (Thuỷ ngân)', mass: '200.59', period: 6, group: 'IIB', col: 12, row: 6, type: 'transition', block: 'd', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²' },
      { Z: 82, sym: 'Pb', name: 'Lead (Chì)', mass: '207.2', period: 6, group: 'IVA', col: 14, row: 6, type: 'metal', block: 'p', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²' },
      { Z: 86, sym: 'Rn', name: 'Radon', mass: '222', period: 6, group: 'VIIIA', col: 18, row: 6, type: 'noble', block: 'p', config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶' },

      { Z: 87, sym: 'Fr', name: 'Francium', mass: '223', period: 7, group: 'IA', col: 1, row: 7, type: 'metal', block: 's', config: '[Rn] 7s¹' },
      { Z: 88, sym: 'Ra', name: 'Radium', mass: '226', period: 7, group: 'IIA', col: 2, row: 7, type: 'metal', block: 's', config: '[Rn] 7s²' },
      { Z: 118, sym: 'Og', name: 'Oganesson', mass: '294', period: 7, group: 'VIIIA', col: 18, row: 7, type: 'noble', block: 'p', config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶' }
    ];

    let b5SelectedElement = B5_ELEMENTS_DATA.find(e => e.Z === 13); // Default Aluminium
    let b5CurrentFilter = 'all';

    function initB5PeriodicTable() {
      const grid = document.getElementById('b5-periodic-table-grid');
      if (!grid) return;
      grid.innerHTML = '';

      // Khởi tạo ma trận 7 hàng x 18 cột
      let matrix = {};
      for (let r = 1; r <= 7; r++) {
        matrix[r] = {};
        for (let c = 1; c <= 18; c++) matrix[r][c] = null;
      }

      B5_ELEMENTS_DATA.forEach(el => {
        if (el.row && el.col) {
          matrix[el.row][el.col] = el;
        }
      });

      for (let r = 1; r <= 7; r++) {
        for (let c = 1; c <= 18; c++) {
          const el = matrix[r][c];
          const cell = document.createElement('div');
          
          if (!el) {
            cell.style.cssText = 'height:46px; background:transparent;';
          } else {
            const isMatch = isB5ElementMatchingFilter(el);
            const isSelected = (b5SelectedElement && b5SelectedElement.Z === el.Z);

            let bg = '#ffffff';
            let border = '#cbd5e1';
            let textColor = '#0f172a';

            if (el.type === 'metal') { bg = '#dbeafe'; border = '#93c5fd'; textColor = '#1e3a8a'; }
            else if (el.type === 'nonmetal') { bg = '#fef3c7'; border = '#fde047'; textColor = '#854d0e'; }
            else if (el.type === 'noble') { bg = '#f3e8ff'; border = '#d8b4fe'; textColor = '#6b21a8'; }
            else if (el.type === 'transition') { bg = '#ffedd5'; border = '#fdba74'; textColor = '#9a3412'; }
            else if (el.type === 'metalloid') { bg = '#ecfdf5'; border = '#a7f3d0'; textColor = '#065f46'; }

            cell.id = 'b5-elem-cell-' + el.Z;
            cell.style.cssText = `height:46px; border:1px solid ${isSelected ? '#0284c7' : border}; background:${bg}; border-radius:6px; padding:2px 3px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; transition:all 0.15s; ${!isMatch ? 'opacity:0.25;' : ''} ${isSelected ? 'box-shadow:0 0 0 2px #0284c7;' : ''}`;

            cell.innerHTML = `
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:9px; color:#64748b; font-weight:700;">
                <span>${el.Z}</span>
                <span style="font-size:8px; opacity:0.7;">${el.block}</span>
              </div>
              <div style="font-size:13px; font-weight:800; text-align:center; color:${textColor}; line-height:1;">${el.sym}</div>
              <div style="font-size:8px; color:#64748b; text-align:center; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${el.mass}</div>
            `;

            cell.onclick = () => selectB5Element(el);
          }
          grid.appendChild(cell);
        }
      }

      updateB5InspectorUI();
    }

    function isB5ElementMatchingFilter(el) {
      if (b5CurrentFilter === 'all') return true;
      if (b5CurrentFilter === 'metal') return el.type === 'metal' || el.type === 'transition';
      if (b5CurrentFilter === 'nonmetal') return el.type === 'nonmetal' || el.type === 'metalloid';
      if (b5CurrentFilter === 'noble') return el.type === 'noble';
      return true;
    }

    function filterB5Table(filter) {
      b5CurrentFilter = filter;
      initB5PeriodicTable();
    }

    function selectB5Element(el) {
      b5SelectedElement = el;
      initB5PeriodicTable();
      updateB5InspectorUI();
      if (currentPartB5 === 'part2') {
        drawB5AnatomyCanvas();
      }
    }

    function updateB5InspectorUI() {
      if (!b5SelectedElement) return;
      const el = b5SelectedElement;

      const zEl = document.getElementById('b5-big-z');
      const symEl = document.getElementById('b5-big-sym');
      const massEl = document.getElementById('b5-big-mass');
      const nameEl = document.getElementById('b5-elem-name');
      const badgeEl = document.getElementById('b5-elem-type-badge');
      const posEl = document.getElementById('b5-elem-pos');
      const configEl = document.getElementById('b5-elem-config');
      const blockEl = document.getElementById('b5-elem-block');

      if (zEl) zEl.innerText = el.Z;
      if (symEl) symEl.innerText = el.sym;
      if (massEl) massEl.innerText = el.mass;
      if (nameEl) nameEl.innerText = `${el.name}`;
      if (posEl) posEl.innerText = `Ô số ${el.Z}, Chu kì ${el.period}, Nhóm ${el.group}`;
      if (configEl) configEl.innerText = el.config;
      if (blockEl) blockEl.innerText = `Khối ${el.block}`;

      if (badgeEl) {
        badgeEl.innerText = el.type === 'metal' ? 'Kim loại điển hình' : (el.type === 'nonmetal' ? 'Phi kim' : (el.type === 'noble' ? 'Khí hiếm' : 'Kim loại chuyển tiếp'));
      }
    }

    /* ----------------------------------------------------------
       TAB 2: GIẢI PHẪU Ô • CHU KÌ • NHÓM (CANVAS)
       ---------------------------------------------------------- */
    let b5AnatomyCanvas, b5AnatomyCtx;

    function resizeB5AnatomyCanvas() {
      b5AnatomyCanvas = document.getElementById('b5AnatomyCanvas');
      if (!b5AnatomyCanvas) return;
      b5AnatomyCtx = b5AnatomyCanvas.getContext('2d');
      const rect = b5AnatomyCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b5AnatomyCanvas.width = rect.width * dpr;
      b5AnatomyCanvas.height = rect.height * dpr;
      if (b5AnatomyCtx) b5AnatomyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawB5AnatomyCanvas();
    }

    function selectB5AnatomyPreset(sym) {
      const found = B5_ELEMENTS_DATA.find(e => e.sym === sym);
      if (found) selectB5Element(found);
    }

    function drawB5AnatomyCanvas() {
      if (!b5AnatomyCanvas || !b5AnatomyCtx) return;
      const w = b5AnatomyCanvas.parentElement.clientWidth;
      const h = b5AnatomyCanvas.parentElement.clientHeight;
      const ctx = b5AnatomyCtx;
      const el = b5SelectedElement || B5_ELEMENTS_DATA[10]; // Na

      ctx.clearRect(0, 0, w, h);

      const cx = w / 3;
      const cy = h / 2;

      // 1. VẼ MÔ HÌNH LỚP ELECTRON ĐỒNG TÂM
      ctx.save();
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText(`Mô hình cấu trúc vỏ nguyên tử: ${el.name} (${el.sym})`, cx, 36);

      // Hạt nhân
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText(`+${el.Z}`, cx, cy);

      // Các lớp e (Chu kì = Số lớp)
      const numLayers = el.period;
      for (let l = 1; l <= numLayers; l++) {
        let r = 26 + l * 28;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = (l === numLayers) ? '#0284c7' : '#cbd5e1';
        ctx.lineWidth = (l === numLayers) ? 2 : 1;
        if (l === numLayers) ctx.setLineDash([3, 3]);
        else ctx.setLineDash([]);
        ctx.stroke();

        // Ghi nhãn lớp
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = (l === numLayers) ? '#0284c7' : '#94a3b8';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(`Lớp ${l}`, cx + r + 10, cy - 2);
      }
      ctx.setLineDash([]);
      ctx.restore();

      // 2. VẼ BẢNG GIẢI MÃ VỊ TRÍ PHÍA PHẢI
      const rx = (w * 2) / 3;
      ctx.save();
      ctx.textAlign = 'left';

      // Hộp giải thích
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(rx - 130, cy - 130, 260, 260, 12);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0369a1';
      ctx.fillText('GIẢI PHẪU QUY TẮC BẢNG TUẦN HOÀN', rx - 110, cy - 100);

      // Điểm 1: Số thứ tự ô
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`• Số thứ tự ô: `, rx - 110, cy - 65);
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#0284c7';
      ctx.fillText(`Ô ${el.Z} (= Điện tích hạt nhân Z = ${el.Z})`, rx - 15, cy - 65);

      // Điểm 2: Chu kì
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`• Thuộc Chu kì: `, rx - 110, cy - 25);
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Chu kì ${el.period} (Vì có ${el.period} lớp electron)`, rx - 10, cy - 25);

      // Điểm 3: Nhóm
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`• Thuộc Nhóm: `, rx - 110, cy + 15);
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Nhóm ${el.group} (Cấu hình: ${el.config})`, rx - 15, cy + 15);

      // Điểm 4: Khối nguyên tố
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`• Khối nguyên tố: `, rx - 110, cy + 55);
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#e11d48';
      ctx.fillText(`Khối ${el.block} (e cuối điền vào phân lớp ${el.block})`, rx - 5, cy + 55);

      // Kết luận tính chất
      ctx.font = 'italic 11.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`=> Kết luận: Là nguyên tố ${el.type === 'metal' ? 'Kim loại' : (el.type === 'nonmetal' ? 'Phi kim' : 'Khí hiếm')}`, rx - 110, cy + 95);

      ctx.restore();
    }

    /* ----------------------------------------------------------
       TAB 3: BÀI TẬP SGK TRANG 34
       ---------------------------------------------------------- */
    const B5_EXERCISES_DATA = [
      {
        id: 1,
        title: 'Câu 3 (SGK Trang 34): Thông tin trong ô nguyên tố',
        text: 'Ô nguyên tố trong bảng tuần hoàn cho ta biết những thông tin gì? Lấy ví dụ minh hoạ.',
        options: [
          'A. Chỉ cho biết tên nguyên tố và số hiệu nguyên tử',
          'B. Số hiệu nguyên tử (Z), kí hiệu nguyên tố, tên nguyên tố và nguyên tử khối trung bình',
          'C. Số khối A và số neutron trong hạt nhân',
          'D. Nhiệt độ nóng chảy và độ sôi của đơn chất'
        ],
        correct: 1,
        explain: 'Mỗi ô nguyên tố cung cấp các thông số cốt lõi: Số hiệu nguyên tử (Z), kí hiệu hoá học, tên nguyên tố và nguyên tử khối trung bình (ví dụ ô số 13 cho biết Al, aluminium, NTK trung bình 26.982).'
      },
      {
        id: 2,
        title: 'Câu 4 (SGK Trang 34): Cấu hình electron và e hoá trị của C, Mg, Cl',
        text: 'Dựa vào bảng tuần hoàn, hãy xác định cấu hình e và số electron hoá trị của: C (Z=6), Mg (Z=12) và Cl (Z=17).',
        options: [
          'A. C có 4e hoá trị; Mg có 2e hoá trị; Cl có 7e hoá trị',
          'B. C có 2e hoá trị; Mg có 2e hoá trị; Cl có 5e hoá trị',
          'C. C có 6e hoá trị; Mg có 12e hoá trị; Cl có 17e hoá trị',
          'D. Cả 3 nguyên tố đều có 8 electron hoá trị'
        ],
        correct: 0,
        explain: 'C (nhóm IVA) có 4e hoá trị (1s² 2s² 2p²); Mg (nhóm IIA) có 2e hoá trị (1s² 2s² 2p⁶ 3s²); Cl (nhóm VIIA) có 7e hoá trị (1s² 2s² 2p⁶ 3s² 3p⁵).'
      },
      {
        id: 3,
        title: 'Câu 5 (SGK Trang 34): Phân loại khối s, p, d, f',
        text: 'Các nguyên tố ¹²Mg, ¹⁵P, ²⁶Fe lần lượt thuộc khối nguyên tố nào sau đây?',
        options: [
          'A. Mg là khối p; P là khối s; Fe là khối d',
          'B. Mg là khối s; P là khối p; Fe là khối d',
          'C. Mg là khối s; P là khối d; Fe là khối p',
          'D. Cả 3 đều là nguyên tố khối s'
        ],
        correct: 1,
        explain: 'Mg (Z=12): [Ne] 3s² (e cuối điền vào 3s => khối s); P (Z=15): [Ne] 3s² 3p³ (e cuối điền vào 3p => khối p); Fe (Z=26): [Ar] 3d⁶ 4s² (e cuối điền vào 3d => khối d kim loại chuyển tiếp).'
      },
      {
        id: 4,
        title: 'Câu 6 (SGK Trang 34): Vị trí của Phosphorus và Calcium',
        text: 'Xác định vị trí (ô, chu kì, nhóm) của Phosphorus (Z=15) và Calcium (Z=20) trong bảng tuần hoàn.',
        options: [
          'A. P: Ô 15, chu kì 3, nhóm VA; Ca: Ô 20, chu kì 4, nhóm IIA',
          'B. P: Ô 15, chu kì 2, nhóm VA; Ca: Ô 20, chu kì 3, nhóm IIA',
          'C. P: Ô 15, chu kì 3, nhóm IIIA; Ca: Ô 20, chu kì 4, nhóm IVA',
          'D. P: Ô 15, chu kì 4, nhóm VA; Ca: Ô 20, chu kì 4, nhóm VIIIB'
        ],
        correct: 0,
        explain: 'P (Z=15) có 3 lớp e, 5e ngoài cùng => Ô 15, chu kì 3, nhóm VA. Ca (Z=20) có 4 lớp e, 2e ngoài cùng => Ô 20, chu kì 4, nhóm IIA.'
      },
      {
        id: 5,
        title: 'Câu 7 (SGK Trang 34): Đặc điểm nguyên tố Sulfur (S)',
        text: 'Nguyên tố Sulfur (S) nằm ở chu kì 3, nhóm VIA. Nguyên tử S có bao nhiêu electron thuộc lớp ngoài cùng và là kim loại hay phi kim?',
        options: [
          'A. Có 6 electron lớp ngoài cùng (phân lớp 3s² 3p⁴) — là Phi kim',
          'B. Có 3 electron lớp ngoài cùng — là Kim loại',
          'C. Có 8 electron lớp ngoài cùng — là Khí hiếm',
          'D. Có 4 electron lớp ngoài cùng — là Phi kim'
        ],
        correct: 0,
        explain: 'S thuộc nhóm VIA nên có 6 electron hoá trị ở lớp ngoài cùng (3s² 3p⁴). Nguyên tử có 6e lớp ngoài cùng có xu hướng nhận 2e => Phi kim điển hình.'
      }
    ];

    let b5CurrentQuestionIdx = 0;
    let b5UserAnswers = {};

    function initB5QuizArena() {
      buildB5QuestionStrip();
      renderB5CurrentQuestion();
    }

    function buildB5QuestionStrip() {
      const strip = document.getElementById('b5-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B5_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b5-q-strip-btn-' + idx;
        btn.style.cssText = 'width:28px; height:28px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.15s;';
        btn.innerText = idx + 1;
        btn.onclick = () => selectB5QuestionIdx(idx);
        strip.appendChild(btn);
      });
      updateB5QuestionStripUI();
    }

    function updateB5QuestionStripUI() {
      B5_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.getElementById('b5-q-strip-btn-' + idx);
        if (!btn) return;

        const isAnswered = (b5UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b5CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.borderWidth = '2px';
        } else {
          btn.style.borderColor = '#cbd5e1';
          btn.style.borderWidth = '1px';
        }

        if (isAnswered) {
          const isCorrect = (b5UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#10b981' : '#ef4444';
          btn.style.color = '#ffffff';
        } else {
          btn.style.background = isCurrent ? '#e0f2fe' : '#ffffff';
          btn.style.color = isCurrent ? '#0369a1' : '#334155';
        }
      });

      const prog = document.getElementById('b5-quiz-progress-text');
      const answeredCount = Object.keys(b5UserAnswers).length;
      if (prog) {
        prog.innerText = `Tiến độ: ${answeredCount} / ${B5_EXERCISES_DATA.length} câu`;
      }
    }

    function selectB5QuestionIdx(idx) {
      b5CurrentQuestionIdx = Math.max(0, Math.min(B5_EXERCISES_DATA.length - 1, idx));
      updateB5QuestionStripUI();
      renderB5CurrentQuestion();
    }

    function stepB5Question(delta) {
      selectB5QuestionIdx(b5CurrentQuestionIdx + delta);
    }

    function renderB5CurrentQuestion() {
      const container = document.getElementById('b5-question-card-container');
      if (!container) return;

      const q = B5_EXERCISES_DATA[b5CurrentQuestionIdx];
      const userSelected = b5UserAnswers[b5CurrentQuestionIdx];
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

        optionsHtml += `<button style="${optStyle}" onclick="chooseB5Option(${oIdx})" ${isAnswered ? 'disabled' : ''}>
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
              ${isCorrect ? '🎉 Hoàn toàn chính xác!' : '💡 Hướng dẫn giải chi tiết:'}
            </div>
            <div style="font-size:12.5px; color:#334155; line-height:1.5;">${q.explain}</div>
          </div>
        `;
      }

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:12px; font-weight:700; background:#e0f2fe; color:#0369a1; padding:3px 10px; border-radius:12px;">CÂU ${b5CurrentQuestionIdx + 1} / ${B5_EXERCISES_DATA.length}</span>
          <span style="font-size:12px; color:#64748b;">Mục Luyện tập SGK Hoá học 10</span>
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

    function chooseB5Option(optionIdx) {
      if (b5UserAnswers[b5CurrentQuestionIdx] !== undefined) return;
      b5UserAnswers[b5CurrentQuestionIdx] = optionIdx;
      updateB5QuestionStripUI();
      renderB5CurrentQuestion();
    }





    /* ==========================================================
       LOGIC BÀI 6: XU HƯỚNG BIẾN ĐỔI TÍNH CHẤT NGUYÊN TỬ
       ========================================================== */

    let currentPartB6 = 'part1';

    function switchPartB6(partId) {
      currentPartB6 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b6-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b6-' + p);
        const panel = document.getElementById('panel-b6-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (window.renderMathInElement) {
        const activeSec = document.getElementById('content-b6-' + partId);
        if (activeSec) {
          renderMathInElement(activeSec, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false}
            ],
            throwOnError: false
          });
        }
      }

      setTimeout(() => {
        if (partId === 'part1') resizeB6RadiusCanvas();
        else if (partId === 'part2') resizeB6ElectronegCanvas();
        else if (partId === 'part3') renderB6CurrentQuestion();
      }, 50);
    }

    function checkB6Quiz(btn, isCorrect, feedbackText) {
      const parent = btn.closest('.quiz-card');
      const allBtns = parent.querySelectorAll('.opt-btn');
      allBtns.forEach(b => b.classList.remove('selected', 'correct', 'wrong'));
      
      btn.classList.add('selected');
      if (isCorrect) btn.classList.add('correct');
      else btn.classList.add('wrong');

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
       TAB 1: TRỰC QUAN HOÁ BÁN KÍNH NGUYÊN TỬ (CANVAS)
       ---------------------------------------------------------- */
    let b6RadiusCanvas, b6RadiusCtx;
    let b6RadiusMode = 'period3'; // 'period3', 'period2', 'group1', 'group7'

    const B6_RADIUS_DATA = {
      period3: [
        { sym: 'Na', Z: 11, r: 186, type: 'metal' },
        { sym: 'Mg', Z: 12, r: 160, type: 'metal' },
        { sym: 'Al', Z: 13, r: 143, type: 'metal' },
        { sym: 'Si', Z: 14, r: 118, type: 'metalloid' },
        { sym: 'P',  Z: 15, r: 110, type: 'nonmetal' },
        { sym: 'S',  Z: 16, r: 104, type: 'nonmetal' },
        { sym: 'Cl', Z: 17, r: 99,  type: 'nonmetal' },
        { sym: 'Ar', Z: 18, r: 98,  type: 'noble' }
      ],
      period2: [
        { sym: 'Li', Z: 3,  r: 152, type: 'metal' },
        { sym: 'Be', Z: 4,  r: 112, type: 'metal' },
        { sym: 'B',  Z: 5,  r: 88,  type: 'metalloid' },
        { sym: 'C',  Z: 6,  r: 77,  type: 'nonmetal' },
        { sym: 'N',  Z: 7,  r: 75,  type: 'nonmetal' },
        { sym: 'O',  Z: 8,  r: 73,  type: 'nonmetal' },
        { sym: 'F',  Z: 9,  r: 71,  type: 'nonmetal' },
        { sym: 'Ne', Z: 10, r: 69,  type: 'noble' }
      ],
      group1: [
        { sym: 'Li', Z: 3,  r: 152, period: 2, type: 'metal' },
        { sym: 'Na', Z: 11, r: 186, period: 3, type: 'metal' },
        { sym: 'K',  Z: 19, r: 227, period: 4, type: 'metal' },
        { sym: 'Rb', Z: 37, r: 248, period: 5, type: 'metal' },
        { sym: 'Cs', Z: 55, r: 265, period: 6, type: 'metal' }
      ],
      group7: [
        { sym: 'F',  Z: 9,  r: 71,  period: 2, type: 'nonmetal' },
        { sym: 'Cl', Z: 17, r: 99,  period: 3, type: 'nonmetal' },
        { sym: 'Br', Z: 35, r: 114, period: 4, type: 'nonmetal' },
        { sym: 'I',  Z: 53, r: 133, period: 5, type: 'nonmetal' }
      ]
    };

    function resizeB6RadiusCanvas() {
      b6RadiusCanvas = document.getElementById('b6RadiusCanvas');
      if (!b6RadiusCanvas) return;
      b6RadiusCtx = b6RadiusCanvas.getContext('2d');
      const rect = b6RadiusCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b6RadiusCanvas.width = rect.width * dpr;
      b6RadiusCanvas.height = rect.height * dpr;
      if (b6RadiusCtx) b6RadiusCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawB6RadiusCanvas();
    }

    function selectB6RadiusMode(mode) {
      b6RadiusMode = mode;
      ['p3', 'p2', 'g1', 'g7'].forEach(m => {
        const btn = document.getElementById('btn-b6-radius-' + m);
        const mapM = { p3: 'period3', p2: 'period2', g1: 'group1', g7: 'group7' };
        if (btn) btn.classList.toggle('btn-tool-active', mapM[m] === mode);
        if (btn) btn.classList.toggle('btn-tool-subtle', mapM[m] !== mode);
      });
      drawB6RadiusCanvas();
    }

    function drawB6RadiusCanvas() {
      if (!b6RadiusCanvas || !b6RadiusCtx) return;
      const w = b6RadiusCanvas.parentElement.clientWidth;
      const h = b6RadiusCanvas.parentElement.clientHeight;
      const ctx = b6RadiusCtx;
      const list = B6_RADIUS_DATA[b6RadiusMode];

      ctx.clearRect(0, 0, w, h);

      // Tiêu đề trực quan
      ctx.save();
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';

      let title = '';
      if (b6RadiusMode === 'period3') title = 'Chu kì 3 (Từ trái qua phải): Bán kính nguyên tử GIẢM DẦN (Na ➔ Cl)';
      else if (b6RadiusMode === 'period2') title = 'Chu kì 2 (Từ trái qua phải): Bán kính nguyên tử GIẢM DẦN (Li ➔ F)';
      else if (b6RadiusMode === 'group1') title = 'Nhóm IA (Từ trên xuống dưới): Bán kính nguyên tử TĂNG DẦN (Li ➔ Cs)';
      else if (b6RadiusMode === 'group7') title = 'Nhóm VIIA (Từ trên xuống dưới): Bán kính nguyên tử TĂNG DẦN (F ➔ I)';
      ctx.fillText(title, w / 2, 38);

      // Dàn trải các hình cầu nguyên tử
      const count = list.length;
      const isPeriod = b6RadiusMode.startsWith('period');
      const startX = 60;
      const endX = w - 60;
      const stepX = (endX - startX) / (count - 1);
      const cy = h / 2 + 10;

      list.forEach((item, idx) => {
        const cx = startX + idx * stepX;
        // Tỷ lệ bán kính vẽ
        const drawRadius = (item.r / 265) * 48;

        // Vẽ vòng cầu với Radial Gradient 2.5D
        let grad = ctx.createRadialGradient(cx - drawRadius * 0.3, cy - drawRadius * 0.3, 2, cx, cy, drawRadius);
        if (item.type === 'metal') {
          grad.addColorStop(0, '#93c5fd');
          grad.addColorStop(0.8, '#3b82f6');
          grad.addColorStop(1, '#1d4ed8');
        } else if (item.type === 'nonmetal') {
          grad.addColorStop(0, '#fef08a');
          grad.addColorStop(0.8, '#eab308');
          grad.addColorStop(1, '#a16207');
        } else if (item.type === 'noble') {
          grad.addColorStop(0, '#e9d5ff');
          grad.addColorStop(0.8, '#a855f7');
          grad.addColorStop(1, '#6b21a8');
        } else {
          grad.addColorStop(0, '#a7f3d0');
          grad.addColorStop(0.8, '#10b981');
          grad.addColorStop(1, '#047857');
        }

        ctx.beginPath();
        ctx.arc(cx, cy, drawRadius, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Kí hiệu nguyên tố ở giữa
        ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.sym, cx, cy);

        // Nhãn số hiệu Z và bán kính pm bên dưới
        ctx.textBaseline = 'alphabetic';
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(`${item.r} pm`, cx, cy + drawRadius + 20);

        ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`Z = ${item.Z}`, cx, cy + drawRadius + 34);
      });

      // Mũi tên xu hướng biến đổi
      ctx.beginPath();
      ctx.moveTo(startX, h - 30);
      ctx.lineTo(endX, h - 30);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mũi tên đầu
      ctx.beginPath();
      ctx.moveTo(endX - 8, h - 35);
      ctx.lineTo(endX, h - 30);
      ctx.lineTo(endX - 8, h - 25);
      ctx.fillStyle = '#0284c7';
      ctx.fill();

      ctx.font = 'bold 11.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0369a1';
      ctx.textAlign = 'center';
      const trendText = isPeriod ? 'Chiều tăng dần điện tích hạt nhân Z (Bán kính GIẢM DẦN)' : 'Chiều tăng dần số lớp electron n (Bán kính TĂNG DẦN)';
      ctx.fillText(trendText, w / 2, h - 14);

      ctx.restore();
    }

    /* ----------------------------------------------------------
       TAB 2: ĐỘ ÂM ĐIỆN & NĂNG LƯỢNG ION HOÁ
       ---------------------------------------------------------- */
    let b6ElectronegCanvas, b6ElectronegCtx;
    let b6ChartMetric = 'en'; // 'en' (độ âm điện), 'ie' (năng lượng ion hoá)

    const B6_METRIC_DATA = [
      { sym: 'Li', Z: 3,  en: 0.98, ie: 520 },
      { sym: 'Be', Z: 4,  en: 1.57, ie: 899 },
      { sym: 'B',  Z: 5,  en: 2.04, ie: 801 },
      { sym: 'C',  Z: 6,  en: 2.55, ie: 1086 },
      { sym: 'N',  Z: 7,  en: 3.04, ie: 1402 },
      { sym: 'O',  Z: 8,  en: 3.44, ie: 1314 },
      { sym: 'F',  Z: 9,  en: 3.98, ie: 1681 },
      { sym: 'Ne', Z: 10, en: 0,    ie: 2080 }
    ];

    function resizeB6ElectronegCanvas() {
      b6ElectronegCanvas = document.getElementById('b6ElectronegCanvas');
      if (!b6ElectronegCanvas) return;
      b6ElectronegCtx = b6ElectronegCanvas.getContext('2d');
      const rect = b6ElectronegCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b6ElectronegCanvas.width = rect.width * dpr;
      b6ElectronegCanvas.height = rect.height * dpr;
      if (b6ElectronegCtx) b6ElectronegCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawB6ElectronegCanvas();
    }

    function setB6ChartMetric(metric) {
      b6ChartMetric = metric;
      const btnEn = document.getElementById('btn-b6-mode-en');
      const btnIe = document.getElementById('btn-b6-mode-ie');
      if (btnEn) {
        btnEn.classList.toggle('btn-tool-active', metric === 'en');
        btnEn.classList.toggle('btn-tool-subtle', metric !== 'en');
      }
      if (btnIe) {
        btnIe.classList.toggle('btn-tool-active', metric === 'ie');
        btnIe.classList.toggle('btn-tool-subtle', metric !== 'ie');
      }
      drawB6ElectronegCanvas();
    }

    function drawB6ElectronegCanvas() {
      if (!b6ElectronegCanvas || !b6ElectronegCtx) return;
      const w = b6ElectronegCanvas.parentElement.clientWidth;
      const h = b6ElectronegCanvas.parentElement.clientHeight;
      const ctx = b6ElectronegCtx;

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      const isEn = b6ChartMetric === 'en';
      const maxVal = isEn ? 4.2 : 2200;

      // Tiêu đề
      ctx.font = 'bold 13.5px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText(isEn ? 'Biểu đồ Độ âm điện Pauling qua Chu kì 2 (Li ➔ F)' : 'Biểu đồ Năng lượng Ion hoá Thứ nhất I₁ qua Chu kì 2 (kJ/mol)', w / 2, 34);

      // Trục toạ độ
      const ox = 70, oy = h - 50;
      const chartW = w - 120, chartH = h - 100;

      ctx.beginPath();
      ctx.moveTo(ox, oy - chartH);
      ctx.lineTo(ox, oy);
      ctx.lineTo(ox + chartW, oy);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cột giá trị
      const count = B6_METRIC_DATA.length;
      const stepX = chartW / count;

      B6_METRIC_DATA.forEach((d, idx) => {
        const val = isEn ? d.en : d.ie;
        if (val === 0) return; // Ne không xác định độ âm điện Pauling

        const barH = (val / maxVal) * chartH;
        const bx = ox + idx * stepX + 10;
        const bw = stepX - 20;
        const by = oy - barH;

        // Vẽ cột
        ctx.fillStyle = isEn ? '#f59e0b' : '#0284c7';
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, barH, [4, 4, 0, 0]);
        ctx.fill();

        // Giá trị trên đầu cột
        ctx.font = 'bold 10.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(isEn ? val.toFixed(2) : val, bx + bw / 2, by - 6);

        // Kí hiệu bên dưới
        ctx.font = 'bold 11.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#334155';
        ctx.fillText(d.sym, bx + bw / 2, oy + 18);
        ctx.font = '9.5px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`Z=${d.Z}`, bx + bw / 2, oy + 32);
      });

      ctx.restore();
    }

    /* ----------------------------------------------------------
       TAB 3: BÀI TẬP SGK TRANG 36 - 40
       ---------------------------------------------------------- */
    const B6_EXERCISES_DATA = [
      {
        id: 1,
        title: 'Câu 3b (SGK Trang 36): So sánh bán kính của Calcium và Selenium',
        text: 'Dựa vào bảng tuần hoàn, hãy so sánh bán kính nguyên tử của Calcium (Z = 20) và Selenium (Z = 34).',
        options: [
          'A. Bán kính của Calcium (Ca) lớn hơn Selenium (Se)',
          'B. Bán kính của Selenium (Se) lớn hơn Calcium (Ca)',
          'C. Hai nguyên tử có bán kính bằng nhau',
          'D. Không thể so sánh được vì khác nhóm'
        ],
        correct: 0,
        explain: 'Cả Ca và Se đều thuộc chu kì 4. Trong cùng một chu kì đi từ trái sang phải theo chiều tăng điện tích hạt nhân, bán kính nguyên tử giảm dần. Ca (nhóm IIA) nằm trước Se (nhóm VIA) nên bán kính của Ca (197 pm) lớn hơn Se (116 pm).'
      },
      {
        id: 2,
        title: 'Câu 5a (SGK Trang 38): Sắp xếp bán kính nguyên tử trong hợp kim Almelec',
        text: 'Hợp kim Almelec gồm: Al (Z=13), Mg (Z=12) và Si (Z=14). Thứ tự TĂNG DẦN về bán kính nguyên tử là:',
        options: [
          'A. Si < Al < Mg',
          'B. Mg < Al < Si',
          'C. Al < Mg < Si',
          'D. Si < Mg < Al'
        ],
        correct: 0,
        explain: 'Cả 3 nguyên tố cùng thuộc chu kì 3. Theo chiều tăng Z (Mg: 12 < Al: 13 < Si: 14), bán kính nguyên tử giảm dần: Mg (160 pm) > Al (143 pm) > Si (118 pm). Do đó thứ tự tăng dần bán kính là: Si < Al < Mg.'
      },
      {
        id: 3,
        title: 'Câu 5b (SGK Trang 38): Sắp xếp độ âm điện trong hợp kim Almelec',
        text: 'Thứ tự GIẢM DẦN về độ âm điện của các nguyên tố trong Almelec (Mg, Al, Si) là:',
        options: [
          'A. Si > Al > Mg',
          'B. Mg > Al > Si',
          'C. Al > Si > Mg',
          'D. Si > Mg > Al'
        ],
        correct: 0,
        explain: 'Trong chu kì 3, độ âm điện tăng dần theo chiều tăng Z: Mg (1.31) < Al (1.61) < Si (1.90). Do đó, thứ tự giảm dần về độ âm điện là: Si > Al > Mg.'
      },
      {
        id: 4,
        title: 'Câu 6 (SGK Trang 40): Sắp xếp tính kim loại giảm dần của Ba, Mg, Ca, Sr',
        text: 'Sắp xếp các nguyên tố nhóm IIA: Ba, Mg, Ca, Sr theo thứ tự GIẢM DẦN tính kim loại:',
        options: [
          'A. Ba > Sr > Ca > Mg',
          'B. Mg > Ca > Sr > Ba',
          'C. Ba > Ca > Sr > Mg',
          'D. Sr > Ba > Ca > Mg'
        ],
        correct: 0,
        explain: 'Cả 4 nguyên tố đều thuộc nhóm IIA (kim loại kiềm thổ). Trong một nhóm A, theo chiều từ trên xuống dưới theo thứ tự Z tăng dần (Mg ➔ Ca ➔ Sr ➔ Ba), tính kim loại tăng dần: Mg < Ca < Sr < Ba. Vì vậy, thứ tự giảm dần tính kim loại là: Ba > Sr > Ca > Mg.'
      },
      {
        id: 5,
        title: 'Tổng kết quy luật: Bán kính và Tính Kim loại',
        text: 'Khẳng định nào sau đây là hoàn toàn ĐÚNG về quy luật tuần hoàn?',
        options: [
          'A. Trong chu kì từ trái qua phải: Bán kính giảm, tính phi kim tăng',
          'B. Trong chu kì từ trái qua phải: Bán kính tăng, tính kim loại tăng',
          'C. Trong nhóm A từ trên xuống: Bán kính giảm, độ âm điện tăng',
          'D. Phi kim mạnh nhất là Francium, kim loại mạnh nhất là Fluorine'
        ],
        correct: 0,
        explain: 'Trong một chu kì, đi từ trái qua phải: điện tích hạt nhân Z tăng, số lớp e không đổi => bán kính nguyên tử giảm dần, lực hút electron mạnh hơn => tính phi kim tăng dần.'
      }
    ];

    let b6CurrentQuestionIdx = 0;
    let b6UserAnswers = {};

    function initB6QuizArena() {
      buildB6QuestionStrip();
      renderB6CurrentQuestion();
    }

    function buildB6QuestionStrip() {
      const strip = document.getElementById('b6-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B6_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b6-q-strip-btn-' + idx;
        btn.style.cssText = 'width:28px; height:28px; border-radius:6px; border:1px solid #cbd5e1; background:#fff; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.15s;';
        btn.innerText = idx + 1;
        btn.onclick = () => selectB6QuestionIdx(idx);
        strip.appendChild(btn);
      });
      updateB6QuestionStripUI();
    }

    function updateB6QuestionStripUI() {
      B6_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.getElementById('b6-q-strip-btn-' + idx);
        if (!btn) return;

        const isAnswered = (b6UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b6CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.borderWidth = '2px';
        } else {
          btn.style.borderColor = '#cbd5e1';
          btn.style.borderWidth = '1px';
        }

        if (isAnswered) {
          const isCorrect = (b6UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#10b981' : '#ef4444';
          btn.style.color = '#ffffff';
        } else {
          btn.style.background = isCurrent ? '#e0f2fe' : '#ffffff';
          btn.style.color = isCurrent ? '#0369a1' : '#334155';
        }
      });

      const prog = document.getElementById('b6-quiz-progress-text');
      const answeredCount = Object.keys(b6UserAnswers).length;
      if (prog) prog.innerText = `Tiến độ: ${answeredCount} / ${B6_EXERCISES_DATA.length} câu`;
    }

    function selectB6QuestionIdx(idx) {
      b6CurrentQuestionIdx = Math.max(0, Math.min(B6_EXERCISES_DATA.length - 1, idx));
      updateB6QuestionStripUI();
      renderB6CurrentQuestion();
    }

    function stepB6Question(delta) {
      selectB6QuestionIdx(b6CurrentQuestionIdx + delta);
    }

    function renderB6CurrentQuestion() {
      const container = document.getElementById('b6-question-card-container');
      if (!container) return;

      const q = B6_EXERCISES_DATA[b6CurrentQuestionIdx];
      const userSelected = b6UserAnswers[b6CurrentQuestionIdx];
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

        optionsHtml += `<button style="${optStyle}" onclick="chooseB6Option(${oIdx})" ${isAnswered ? 'disabled' : ''}>
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
              ${isCorrect ? '🎉 Hoàn toàn chính xác!' : '💡 Lời giải chi tiết sư phạm:'}
            </div>
            <div style="font-size:12.5px; color:#334155; line-height:1.5;">${q.explain}</div>
          </div>
        `;
      }

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <span style="font-size:12px; font-weight:700; background:#e0f2fe; color:#0369a1; padding:3px 10px; border-radius:12px;">CÂU ${b6CurrentQuestionIdx + 1} / ${B6_EXERCISES_DATA.length}</span>
          <span style="font-size:12px; color:#64748b;">Mục Luyện tập SGK Hoá học 10</span>
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

    function chooseB6Option(optionIdx) {
      if (b6UserAnswers[b6CurrentQuestionIdx] !== undefined) return;
      b6UserAnswers[b6CurrentQuestionIdx] = optionIdx;
      updateB6QuestionStripUI();
      renderB6CurrentQuestion();
    }





    /* ==========================================================
       LOGIC BÀI 7: XU HƯỚNG BIẾN ĐỔI THÀNH PHẦN VÀ TÍNH CHẤT HỢP CHẤT
       ========================================================== */

    let currentPartB7 = 'part1';
    let b7ViewMode = 'hydroxide'; // 'hydroxide' | 'oxide'
    let b7CurCompoundIdx = 0; // 0 to 6 (Na to Cl)

    const B7_COMPOUNDS_DATA = [
      {
        element: 'Na',
        group: 'IA',
        ox: 'Na₂O',
        oxType: 'Basic oxide',
        hyd: 'NaOH',
        hydType: 'Base mạnh',
        ph: 'pH ≈ 13 - 14',
        phColor: '#1d4ed8', // Dark blue
        litmus: 'Xanh đậm',
        color: '#3b82f6',
        desc: 'Tan mãnh liệt trong nước, toả nhiệt mạnh tạo xút ăn da NaOH.'
      },
      {
        element: 'Mg',
        group: 'IIA',
        ox: 'MgO',
        oxType: 'Basic oxide',
        hyd: 'Mg(OH)₂',
        hydType: 'Base yếu',
        ph: 'pH ≈ 9 - 10',
        phColor: '#60a5fa', // Light blue
        litmus: 'Xanh nhạt',
        color: '#60a5fa',
        desc: 'Ít tan trong nước, dung dịch base yếu, kết tủa trắng Mg(OH)₂.'
      },
      {
        element: 'Al',
        group: 'IIIA',
        ox: 'Al₂O₃',
        oxType: 'Oxide lưỡng tính',
        hyd: 'Al(OH)₃',
        hydType: 'Hydroxide lưỡng tính',
        ph: 'pH ≈ 7',
        phColor: '#059669', // Emerald
        litmus: 'Không đổi màu',
        color: '#10b981',
        desc: 'Không tan trong nước. Tan được trong cả dung dịch acid mạnh và base mạnh.'
      },
      {
        element: 'Si',
        group: 'IVA',
        ox: 'SiO₂',
        oxType: 'Acidic oxide',
        hyd: 'H₂SiO₃',
        hydType: 'Acid rất yếu',
        ph: 'pH ≈ 5 - 6',
        phColor: '#d97706', // Amber
        litmus: 'Hồng rất nhạt',
        color: '#f59e0b',
        desc: 'Không tan trong nước. Tạo kết tủa keo dính silicat, acid rất yếu.'
      },
      {
        element: 'P',
        group: 'VA',
        ox: 'P₂O₅',
        oxType: 'Acidic oxide',
        hyd: 'H₃PO₄',
        hydType: 'Acid trung bình',
        ph: 'pH ≈ 2 - 3',
        phColor: '#ea580c', // Orange
        litmus: 'Đỏ',
        color: '#f97316',
        desc: 'Hút nước cực mạnh tạo phosphoric acid ba nấc.'
      },
      {
        element: 'S',
        group: 'VIA',
        ox: 'SO₃',
        oxType: 'Acidic oxide',
        hyd: 'H₂SO₄',
        hydType: 'Acid mạnh',
        ph: 'pH ≈ 1',
        phColor: '#dc2626', // Red
        litmus: 'Đỏ đậm',
        color: '#ef4444',
        desc: 'Tan vô hạn trong nước, toả nhiệt ghê gớm tạo acid sulfuric mạnh.'
      },
      {
        element: 'Cl',
        group: 'VIIA',
        ox: 'Cl₂O₇',
        oxType: 'Acidic oxide',
        hyd: 'HClO₄',
        hydType: 'Acid rất mạnh',
        ph: 'pH < 1',
        phColor: '#991b1b', // Dark red
        litmus: 'Đỏ thẫm',
        color: '#b91c1c',
        desc: 'Perchloric acid, một trong những acid vô cơ mạnh nhất trong hoá học.'
      }
    ];

    function switchPartB7(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB7 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b7-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      // Show/hide sections in theory pane
      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b7-' + p);
        const panel = document.getElementById('panel-b7-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const activeSec = document.getElementById('content-b7-' + partId);
      if (activeSec) activeSec.scrollTop = 0;

      if (partId === 'part1' || partId === 'part3') {
        setTimeout(initB7CompoundLab, 50);
      } else if (partId === 'part2') {
        setTimeout(initB7BeakerSim, 50);
      }

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function checkB7MiniQuiz(btn, isCorrect, feedback) {
      const parent = btn.parentElement.parentElement;
      const allBtns = parent.querySelectorAll('.opt-btn');
      allBtns.forEach(b => {
        b.style.pointerEvents = 'none';
        b.style.opacity = '0.7';
      });

      if (isCorrect) {
        btn.style.background = '#dcfce7';
        btn.style.borderColor = '#16a34a';
        btn.style.color = '#15803d';
        btn.style.opacity = '1';
      } else {
        btn.style.background = '#fee2e2';
        btn.style.borderColor = '#dc2626';
        btn.style.color = '#b91c1c';
        btn.style.opacity = '1';
      }

      const fb = parent.querySelector('.quiz-feedback');
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = isCorrect ? '#f0fdf4' : '#fef2f2';
        fb.style.color = isCorrect ? '#166534' : '#991b1b';
        fb.style.border = `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`;
        fb.innerHTML = feedback;
      }
      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    /* -------------------------------------------------------------
       LAB CANVAS 1: THANG BIẾN ĐỔI ACID - BASE BÀI 7
       ------------------------------------------------------------- */
    let b7CompoundCanvas, b7CompoundCtx;
    let b7CompoundAnimFrame;

    function initB7CompoundLab() {
      b7CompoundCanvas = document.getElementById('b7CompoundCanvas');
      if (!b7CompoundCanvas) return;
      b7CompoundCtx = b7CompoundCanvas.getContext('2d');
      resizeB7CompoundCanvas();

      b7CompoundCanvas.onmousemove = handleB7CompoundHover;
      b7CompoundCanvas.onclick = handleB7CompoundClick;

      drawB7CompoundLab();
    }

    function resizeB7CompoundCanvas() {
      if (!b7CompoundCanvas) return;
      const rect = b7CompoundCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b7CompoundCanvas.width = rect.width * dpr;
      b7CompoundCanvas.height = rect.height * dpr;
      b7CompoundCtx.scale(dpr, dpr);
      drawB7CompoundLab();
    }

    function setB7ViewMode(mode) {
      b7ViewMode = mode;
      document.getElementById('btn-b7-view-hydroxide').classList.toggle('active', mode === 'hydroxide');
      document.getElementById('btn-b7-view-oxide').classList.toggle('active', mode === 'oxide');
      updateB7Hud();
      drawB7CompoundLab();
    }

    function handleB7CompoundHover(e) {
      if (!b7CompoundCanvas) return;
      const rect = b7CompoundCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = b7CompoundCanvas.parentElement.clientWidth;
      const h = b7CompoundCanvas.parentElement.clientHeight;

      const count = B7_COMPOUNDS_DATA.length;
      const startX = 60, endX = w - 60;
      const stepX = (endX - startX) / (count - 1);

      let hoveredIdx = -1;
      for (let i = 0; i < count; i++) {
        const cx = startX + i * stepX;
        const cy = h / 2 - 20;
        if (Math.hypot(x - cx, y - cy) < 40) {
          hoveredIdx = i;
          break;
        }
      }
      b7CompoundCanvas.style.cursor = hoveredIdx !== -1 ? 'pointer' : 'default';
    }

    function handleB7CompoundClick(e) {
      if (!b7CompoundCanvas) return;
      const rect = b7CompoundCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = b7CompoundCanvas.parentElement.clientWidth;
      const h = b7CompoundCanvas.parentElement.clientHeight;

      const count = B7_COMPOUNDS_DATA.length;
      const startX = 60, endX = w - 60;
      const stepX = (endX - startX) / (count - 1);

      for (let i = 0; i < count; i++) {
        const cx = startX + i * stepX;
        const cy = h / 2 - 20;
        if (Math.hypot(x - cx, y - cy) < 45) {
          b7CurCompoundIdx = i;
          updateB7Hud();
          drawB7CompoundLab();
          break;
        }
      }
    }

    function updateB7Hud() {
      const d = B7_COMPOUNDS_DATA[b7CurCompoundIdx];
      const compLabel = b7ViewMode === 'hydroxide' ? `${d.hyd} (Hydroxide)` : `${d.ox} (Oxide cao nhất)`;
      const typeLabel = b7ViewMode === 'hydroxide' ? d.hydType : d.oxType;

      const hudElem = document.getElementById('b7-hud-compound');
      if (hudElem) hudElem.innerText = compLabel;

      const hudChar = document.getElementById('b7-hud-character');
      if (hudChar) {
        hudChar.innerText = typeLabel;
        hudChar.style.color = d.phColor;
      }

      const hudPh = document.getElementById('b7-hud-ph');
      if (hudPh) {
        hudPh.innerText = d.ph;
        hudPh.style.color = d.phColor;
      }

      const statusTip = document.getElementById('b7-lab-status-tip');
      if (statusTip) {
        statusTip.innerHTML = `💡 <strong>${d.element} (Nhóm ${d.group}):</strong> ${d.desc}`;
      }
    }

    function drawB7CompoundLab() {
      if (!b7CompoundCtx || !b7CompoundCanvas) return;
      const w = b7CompoundCanvas.parentElement.clientWidth;
      const h = b7CompoundCanvas.parentElement.clientHeight;
      const ctx = b7CompoundCtx;

      ctx.clearRect(0, 0, w, h);

      // Gradient spectrum background bar
      const barY = h / 2 + 65;
      const grad = ctx.createLinearGradient(60, 0, w - 60, 0);
      grad.addColorStop(0, '#3b82f6');  // Base (Blue)
      grad.addColorStop(0.35, '#10b981'); // Amphoteric (Green)
      grad.addColorStop(0.65, '#f59e0b'); // Weak acid (Amber)
      grad.addColorStop(1, '#ef4444');  // Strong acid (Red)

      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(60, barY, w - 120, 14, 7);
      ctx.fill();

      // Spectrum labels
      ctx.font = '600 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#2563eb';
      ctx.textAlign = 'left';
      ctx.fillText('← Tính Base mạnh dần (Nhóm IA)', 60, barY + 36);

      ctx.fillStyle = '#dc2626';
      ctx.textAlign = 'right';
      ctx.fillText('Tính Acid mạnh dần (Nhóm VIIA) →', w - 60, barY + 36);

      ctx.fillStyle = '#059669';
      ctx.textAlign = 'center';
      ctx.fillText('Lưỡng tính (Al)', w / 2 - 40, barY + 36);
      ctx.restore();

      // Draw compounds
      const count = B7_COMPOUNDS_DATA.length;
      const startX = 60, endX = w - 60;
      const stepX = (endX - startX) / (count - 1);

      B7_COMPOUNDS_DATA.forEach((d, idx) => {
        const cx = startX + idx * stepX;
        const cy = h / 2 - 25;
        const isSelected = (idx === b7CurCompoundIdx);

        // Connector line to gradient bar
        ctx.strokeStyle = isSelected ? d.color : '#e2e8f0';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.setLineDash(isSelected ? [] : [3, 3]);
        ctx.beginPath();
        ctx.moveTo(cx, cy + 35);
        ctx.lineTo(cx, barY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Compound circle / card
        const radius = isSelected ? 36 : 28;

        // Shadow / Glow
        if (isSelected) {
          ctx.shadowColor = d.color;
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = isSelected ? '#ffffff' : '#f8fafc';
        ctx.strokeStyle = isSelected ? d.color : '#cbd5e1';
        ctx.lineWidth = isSelected ? 3 : 1.5;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Text formulas inside circle
        const formula = b7ViewMode === 'hydroxide' ? d.hyd : d.ox;
        ctx.fillStyle = isSelected ? d.phColor : '#1e293b';
        ctx.font = isSelected ? '700 13px "JetBrains Mono"' : '600 11px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(formula, cx, cy - 4);

        // Group label below
        ctx.font = '700 11px "Plus Jakarta Sans"';
        ctx.fillStyle = isSelected ? '#0f172a' : '#64748b';
        ctx.fillText(d.group, cx, cy + 14);

        // Character tag above
        const tag = b7ViewMode === 'hydroxide' ? d.hydType : d.oxType;
        ctx.font = isSelected ? '700 11px "Plus Jakarta Sans"' : '500 10px "Plus Jakarta Sans"';
        ctx.fillStyle = isSelected ? d.phColor : '#94a3b8';
        ctx.fillText(tag, cx, cy - radius - 12);
      });
    }

    /* -------------------------------------------------------------
       LAB CANVAS 2: THÍ NGHIỆM ẢO PHẢN ỨNG OXIDE VỚI NƯỚC (BÀI 7)
       ------------------------------------------------------------- */
    let b7BeakerCanvas, b7BeakerCtx;
    let b7BeakerSimState = 'idle'; // 'idle' | 'dropping' | 'reacting' | 'finished'
    let b7CurrentSimOxide = 'na2o';
    let b7AnimProgress = 0;
    let b7SimAnimId;

    function initB7BeakerSim() {
      b7BeakerCanvas = document.getElementById('b7BeakerCanvas');
      if (!b7BeakerCanvas) return;
      b7BeakerCtx = b7BeakerCanvas.getContext('2d');
      resizeB7BeakerCanvas();
      runB7SimOxide('na2o');
    }

    function resizeB7BeakerCanvas() {
      if (!b7BeakerCanvas) return;
      const rect = b7BeakerCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b7BeakerCanvas.width = rect.width * dpr;
      b7BeakerCanvas.height = rect.height * dpr;
      b7BeakerCtx.scale(dpr, dpr);
    }

    function runB7SimOxide(oxide) {
      b7CurrentSimOxide = oxide;
      ['na2o', 'mgo', 'p2o5'].forEach(o => {
        const btn = document.getElementById('btn-b7-sim-' + o);
        if (btn) btn.classList.toggle('active', o === oxide);
      });

      b7AnimProgress = 0;
      b7BeakerSimState = 'dropping';
      if (b7SimAnimId) cancelAnimationFrame(b7SimAnimId);
      animateB7Beaker();
    }

    function animateB7Beaker() {
      if (!b7BeakerCanvas || !b7BeakerCtx) return;
      const w = b7BeakerCanvas.parentElement.clientWidth;
      const h = b7BeakerCanvas.parentElement.clientHeight;
      const ctx = b7BeakerCtx;

      ctx.clearRect(0, 0, w, h);

      b7AnimProgress += 0.015;
      if (b7AnimProgress > 1) {
        b7AnimProgress = 1;
        b7BeakerSimState = 'finished';
      }

      // 1. Draw Beaker (Cốc thuỷ tinh)
      const bW = 200, bH = 220;
      const bX = (w - bW) / 2, bY = h / 2 - 40;

      // Beaker body gradient & glass border
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bX - 10, bY);
      ctx.lineTo(bX, bY);
      ctx.lineTo(bX, bY + bH - 10);
      ctx.quadraticCurveTo(bX, bY + bH, bX + 10, bY + bH);
      ctx.lineTo(bX + bW - 10, bY + bH);
      ctx.quadraticCurveTo(bX + bW, bY + bH, bX + bW, bY + bH - 10);
      ctx.lineTo(bX + bW, bY);
      ctx.lineTo(bX + bW + 10, bY);
      ctx.stroke();

      // 2. Liquid in Beaker with color transition
      // Water initial: #e0f2fe (pure water)
      // End color based on oxide:
      let endColor = '#1d4ed8'; // Na2O: Blue
      let liquidLabel = 'Dung dịch NaOH (Quỳ hoá Xanh đậm)';
      if (b7CurrentSimOxide === 'mgo') {
        endColor = '#93c5fd'; // MgO: Pale blue
        liquidLabel = 'Mg(OH)₂ ít tan (Quỳ hoá Xanh nhạt)';
      } else if (b7CurrentSimOxide === 'p2o5') {
        endColor = '#ef4444'; // P2O5: Red
        liquidLabel = 'Dung dịch H₃PO₄ (Quỳ hoá Đỏ)';
      }

      const liqLevel = bY + 80;
      const liqHeight = bH - 82;

      // Color interpolation
      const p = Math.max(0, (b7AnimProgress - 0.3) / 0.7);
      ctx.fillStyle = p > 0 ? endColor : '#e0f2fe';
      ctx.globalAlpha = 0.7 + p * 0.2;
      ctx.fillRect(bX + 3, liqLevel, bW - 6, liqHeight);
      ctx.globalAlpha = 1.0;

      // 3. Falling powder particles (Dropping phase)
      if (b7AnimProgress < 0.6) {
        const dropY = bY - 40 + b7AnimProgress * (liqLevel - (bY - 40));
        ctx.fillStyle = b7CurrentSimOxide === 'na2o' ? '#ffffff' : (b7CurrentSimOxide === 'mgo' ? '#f1f5f9' : '#ffffff');
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        for (let i = -15; i <= 15; i += 6) {
          ctx.beginPath();
          ctx.arc(bX + bW / 2 + i, dropY + (i % 8), 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      // 4. Litmus paper strip (Giấy quỳ tím)
      const stripW = 26, stripH = 140;
      const stripX = bX + bW - 55;
      const stripY = bY + 30;

      // Upper dry part: Purple #a855f7
      ctx.fillStyle = '#c084fc';
      ctx.fillRect(stripX, stripY, stripW, 50);

      // Submerged part: changes color with reaction
      ctx.fillStyle = p > 0.2 ? endColor : '#c084fc';
      ctx.fillRect(stripX, stripY + 50, stripW, stripH - 50);

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.strokeRect(stripX, stripY, stripW, stripH);

      // Litmus tag
      ctx.font = '600 11px "Plus Jakarta Sans"';
      ctx.fillStyle = '#475569';
      ctx.textAlign = 'left';
      ctx.fillText('Giấy quỳ tím', stripX + 32, stripY + 20);

      // Equation label below beaker
      ctx.textAlign = 'center';
      ctx.font = '700 14px "JetBrains Mono"';
      ctx.fillStyle = '#0f172a';
      let eqText = 'Na₂O + H₂O ➔ 2NaOH';
      if (b7CurrentSimOxide === 'mgo') eqText = 'MgO + H₂O ⇌ Mg(OH)₂ (ít tan)';
      if (b7CurrentSimOxide === 'p2o5') eqText = 'P₂O₅ + 3H₂O ➔ 2H₃PO₄';
      ctx.fillText(eqText, w / 2, bY + bH + 35);

      ctx.font = '600 13px "Plus Jakarta Sans"';
      ctx.fillStyle = endColor;
      ctx.fillText(liquidLabel, w / 2, bY + bH + 60);

      ctx.restore();

      if (b7AnimProgress < 1) {
        b7SimAnimId = requestAnimationFrame(animateB7Beaker);
      }
    }

    /* -------------------------------------------------------------
       LAB 3: ĐẤU TRƯỜNG LUYỆN TẬP SGK TRANG 42 (BÀI 7)
       ------------------------------------------------------------- */
    const B7_EXERCISES_DATA = [
      {
        id: 1,
        title: "Câu hỏi 2 (SGK Trang 42): So sánh tính Acid yếu nhất",
        text: "Trong các chất dưới đây, chất nào có tính acid yếu nhất?",
        options: [
          "A. H₂SO₄",
          "B. HClO₄",
          "C. H₃PO₄",
          "D. H₂SiO₃"
        ],
        correct: 3, // D
        explain: "Chính xác! Trong chu kì 3 theo chiều tăng điện tích hạt nhân (Si ➔ P ➔ S ➔ Cl), tính acid của hydroxide tăng dần: H₂SiO₃ (rất yếu) < H₃PO₄ (trung bình) < H₂SO₄ (mạnh) < HClO₄ (rất mạnh). Do đó H₂SiO₃ có tính acid yếu nhất."
      },
      {
        id: 2,
        title: "Câu hỏi 3 (SGK Trang 42): Thứ tự tính Base tăng dần",
        text: "Dãy gồm các chất có tính base tăng dần là:",
        options: [
          "A. Al(OH)₃ < Mg(OH)₂ < NaOH",
          "B. NaOH < Mg(OH)₂ < Al(OH)₃",
          "C. Mg(OH)₂ < Al(OH)₃ < NaOH",
          "D. Al(OH)₃ < NaOH < Mg(OH)₂"
        ],
        correct: 0, // A
        explain: "Chính xác! Trong chu kì 3 theo chiều từ trái sang phải (Na ➔ Mg ➔ Al), tính base giảm dần: NaOH (base mạnh) > Mg(OH)₂ (base yếu) > Al(OH)₃ (lưỡng tính). Do đó chiều TĂNG DẦN tính base là Al(OH)₃ < Mg(OH)₂ < NaOH."
      },
      {
        id: 3,
        title: "Câu hỏi 4 (SGK Trang 42): Quy luật biến đổi tuần hoàn",
        text: "Những đại lượng và tính chất nào của nguyên tố hoá học cho dưới đây KHÔNG biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân nguyên tử?",
        options: [
          "A. Tính kim loại và phi kim",
          "B. Tính acid – base của các hydroxide",
          "C. Khối lượng nguyên tử",
          "D. Cấu hình electron lớp ngoài cùng của nguyên tử"
        ],
        correct: 2, // C
        explain: "Chính xác! Khối lượng nguyên tử biến đổi tăng liên tục (không lặp lại có chu kì). Các đại lượng như cấu hình e lớp ngoài cùng, bán kính, độ âm điện, tính kim loại/phi kim, tính acid-base của hợp chất mới là những tính chất biến đổi tuần hoàn."
      }
    ];

    let b7CurrentQuestionIdx = 0;
    let b7UserAnswers = {};

    function initB7QuizArena() {
      b7CurrentQuestionIdx = 0;
      b7UserAnswers = {};
      renderB7QuizStrip();
      renderB7QuestionCard();
    }

    function renderB7QuizStrip() {
      const strip = document.getElementById('b7-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B7_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b7-q-strip-btn-' + idx;
        btn.className = 'btn-tool';
        btn.style.minWidth = '42px';
        btn.style.height = '36px';
        btn.style.fontWeight = '700';

        const isAnswered = (b7UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b7CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
        } else if (isAnswered) {
          const isCorrect = (b7UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
          btn.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
          btn.style.color = isCorrect ? '#15803d' : '#b91c1c';
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color = '#64748b';
        }

        btn.innerText = `Câu ${idx + 1}`;
        btn.onclick = () => {
          b7CurrentQuestionIdx = idx;
          renderB7QuizStrip();
          renderB7QuestionCard();
        };
        strip.appendChild(btn);
      });

      const prog = document.getElementById('b7-quiz-progress-text');
      const answeredCount = Object.keys(b7UserAnswers).length;
      if (prog) prog.innerText = `Đã hoàn thành: ${answeredCount} / ${B7_EXERCISES_DATA.length} câu`;

      const scoreBoard = document.getElementById('b7-quiz-score-board');
      if (scoreBoard) {
        scoreBoard.style.display = (answeredCount === B7_EXERCISES_DATA.length) ? 'block' : 'none';
      }
    }

    function renderB7QuestionCard() {
      const container = document.getElementById('b7-question-card-container');
      if (!container) return;

      const q = B7_EXERCISES_DATA[b7CurrentQuestionIdx];
      const userSelected = b7UserAnswers[b7CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        if (isAnswered) {
          if (optIdx === q.correct) {
            optStyle += 'background:#dcfce7; border-color:#16a34a; color:#15803d; font-weight:700;';
          } else if (optIdx === userSelected) {
            optStyle += 'background:#fee2e2; border-color:#dc2626; color:#b91c1c; font-weight:700;';
          } else {
            optStyle += 'opacity:0.6;';
          }
        }

        optionsHtml += `
          <button style="${optStyle}" onclick="selectB7Answer(${optIdx})" ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
            ${isAnswered && optIdx === q.correct ? '<span style="color:#16a34a; font-weight:800;">✓</span>' : ''}
            ${isAnswered && optIdx === userSelected && userSelected !== q.correct ? '<span style="color:#dc2626; font-weight:800;">✗</span>' : ''}
          </button>
        `;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; font-size:13px; color:${isCorrect ? '#166534' : '#991b1b'}; line-height:1.5;">
            <strong>${isCorrect ? '✓ Câu trả lời chính xác!' : '✗ Câu trả lời chưa chính xác!'}</strong><br/>
            ${q.explain}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#0284c7; text-transform:uppercase;">${q.title}</span>
            <span style="font-size:11px; font-weight:600; color:#64748b;">Câu ${b7CurrentQuestionIdx + 1} / ${B7_EXERCISES_DATA.length}</span>
          </div>
          <p style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; line-height:1.5;">${q.text}</p>
          <div>
            ${optionsHtml}
          </div>
          ${explainHtml}
        </div>
      `;

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB7Answer(optIdx) {
      if (b7UserAnswers[b7CurrentQuestionIdx] !== undefined) return;
      b7UserAnswers[b7CurrentQuestionIdx] = optIdx;
      renderB7QuizStrip();
      renderB7QuestionCard();
    }

    function resetB7QuizArena() {
      b7UserAnswers = {};
      b7CurrentQuestionIdx = 0;
      renderB7QuizStrip();
      renderB7QuestionCard();
    }

    function resetB7InteractiveState() {
      b7CurCompoundIdx = 0;
      updateB7Hud();
      drawB7CompoundLab();
      runB7SimOxide('na2o');
    }





    /* ==========================================================
       LOGIC BÀI 8: ĐỊNH LUẬT TUẦN HOÀN & Ý NGHĨA BẢNG TUẦN HOÀN
       ========================================================== */

    let currentPartB8 = 'part1';
    let b8CurElemKey = 'Mg'; // 'Mg' | 'P' | 'S' | 'K'

    const B8_ELEMENTS_DATA = {
      'Mg': {
        name: 'Magnesium',
        sym: 'Mg',
        z: 12,
        pos: 'Ô 12 • Chu kì 3 • Nhóm IIA',
        config: '1s² 2s² 2p⁶ 3s²',
        valenceE: '2e lớp ngoài cùng (3s²)',
        char: 'Kim loại hoạt động',
        charColor: '#16a34a',
        oxide: 'MgO (Basic oxide)',
        hyd: 'Mg(OH)₂ (Base yếu)',
        neighbor: 'So với Na (cùng chu kì): Mg có tính kim loại yếu hơn Na. So với Ca (cùng nhóm IIA phía dưới): Mg có tính kim loại yếu hơn Ca.'
      },
      'P': {
        name: 'Phosphorus',
        sym: 'P',
        z: 15,
        pos: 'Ô 15 • Chu kì 3 • Nhóm VA',
        config: '1s² 2s² 2p⁶ 3s² 3p³',
        valenceE: '5e lớp ngoài cùng (3s² 3p³)',
        char: 'Phi kim',
        charColor: '#ea580c',
        oxide: 'P₂O₅ (Acidic oxide)',
        hyd: 'H₃PO₄ (Acid trung bình)',
        neighbor: 'So với N (nhóm VA): N phi kim mạnh hơn P. So với S (chu kì 3 bên phải): S phi kim mạnh hơn P.'
      },
      'S': {
        name: 'Sulfur',
        sym: 'S',
        z: 16,
        pos: 'Ô 16 • Chu kì 3 • Nhóm VIA',
        config: '1s² 2s² 2p⁶ 3s² 3p⁴',
        valenceE: '6e lớp ngoài cùng (3s² 3p⁴)',
        char: 'Phi kim hoạt động',
        charColor: '#dc2626',
        oxide: 'SO₃ (Acidic oxide)',
        hyd: 'H₂SO₄ (Acid mạnh)',
        neighbor: 'So với P (bên trái): S phi kim mạnh hơn P. So với Cl (bên phải): Cl phi kim mạnh hơn S. So với O (phía trên): O phi kim mạnh hơn S.'
      },
      'K': {
        name: 'Potassium',
        sym: 'K',
        z: 19,
        pos: 'Ô 19 • Chu kì 4 • Nhóm IA',
        config: '[Ar] 4s¹',
        valenceE: '1e lớp ngoài cùng (4s¹)',
        char: 'Kim loại kiềm rất mạnh',
        charColor: '#2563eb',
        oxide: 'K₂O (Basic oxide mạnh)',
        hyd: 'KOH (Base rất mạnh, kiềm ăn da)',
        neighbor: 'So với Na (cùng nhóm IA phía trên): K có tính kim loại mạnh hơn Na. So với Ca (chu kì 4 bên phải): K kim loại mạnh hơn Ca.'
      }
    };

    function switchPartB8(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB8 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b8-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      // Show/hide sections in theory pane
      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b8-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
      });

      // Show/hide panels
      const panelP1 = document.getElementById('panel-b8-part1');
      const panelP3 = document.getElementById('panel-b8-part3');
      if (panelP1) panelP1.style.display = (partId === 'part1' || partId === 'part2') ? 'flex' : 'none';
      if (panelP3) panelP3.style.display = (partId === 'part3') ? 'flex' : 'none';

      const activeSec = document.getElementById('content-b8-' + partId);
      if (activeSec) activeSec.scrollTop = 0;

      if (partId === 'part1' || partId === 'part2') {
        setTimeout(initB8TriangleLab, 50);
      } else if (partId === 'part3') {
        setTimeout(initB8QuizArena, 50);
      }

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function checkB8MiniQuiz(btn, isCorrect, feedback) {
      const parent = btn.parentElement.parentElement;
      const allBtns = parent.querySelectorAll('.opt-btn');
      allBtns.forEach(b => {
        b.style.pointerEvents = 'none';
        b.style.opacity = '0.7';
      });

      if (isCorrect) {
        btn.style.background = '#dcfce7';
        btn.style.borderColor = '#16a34a';
        btn.style.color = '#15803d';
        btn.style.opacity = '1';
      } else {
        btn.style.background = '#fee2e2';
        btn.style.borderColor = '#dc2626';
        btn.style.color = '#b91c1c';
        btn.style.opacity = '1';
      }

      const fb = parent.querySelector('.quiz-feedback');
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = isCorrect ? '#f0fdf4' : '#fef2f2';
        fb.style.color = isCorrect ? '#166534' : '#991b1b';
        fb.style.border = `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`;
        fb.innerHTML = feedback;
      }
      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    /* -------------------------------------------------------------
       LAB CANVAS: TAM GIÁC SUY LUẬN HOÁ HỌC (BÀI 8)
       ------------------------------------------------------------- */
    let b8TriangleCanvas, b8TriangleCtx;
    let b8ActiveVertex = 'pos'; // 'pos' | 'config' | 'prop'

    function initB8TriangleLab() {
      b8TriangleCanvas = document.getElementById('b8TriangleCanvas');
      if (!b8TriangleCanvas) return;
      b8TriangleCtx = b8TriangleCanvas.getContext('2d');
      resizeB8TriangleCanvas();

      b8TriangleCanvas.onclick = handleB8TriangleClick;
      updateB8Hud();
      drawB8TriangleLab();
    }

    function resizeB8TriangleCanvas() {
      if (!b8TriangleCanvas) return;
      const rect = b8TriangleCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b8TriangleCanvas.width = rect.width * dpr;
      b8TriangleCanvas.height = rect.height * dpr;
      b8TriangleCtx.scale(dpr, dpr);
      drawB8TriangleLab();
    }

    function selectB8Element(key) {
      b8CurElemKey = key;
      ['Mg', 'P', 'S', 'K'].forEach(k => {
        const btn = document.getElementById('btn-b8-elem-' + k.toLowerCase());
        if (btn) btn.classList.toggle('active', k === key);
      });
      updateB8Hud();
      drawB8TriangleLab();
    }

    function updateB8Hud() {
      const d = B8_ELEMENTS_DATA[b8CurElemKey];
      const elemText = document.getElementById('b8-hud-element');
      if (elemText) elemText.innerText = `${d.name} (${d.sym}, Z = ${d.z})`;

      const posText = document.getElementById('b8-hud-position');
      if (posText) posText.innerText = d.pos;

      const cfgText = document.getElementById('b8-hud-config');
      if (cfgText) cfgText.innerText = d.config;

      const charText = document.getElementById('b8-hud-character');
      if (charText) {
        charText.innerText = d.char;
        charText.style.color = d.charColor;
      }

      const statusTip = document.getElementById('b8-lab-status-tip');
      if (statusTip) {
        statusTip.innerHTML = `💡 <strong>Quan hệ lân cận:</strong> ${d.neighbor}`;
      }
    }

    function handleB8TriangleClick(e) {
      if (!b8TriangleCanvas) return;
      const rect = b8TriangleCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = b8TriangleCanvas.parentElement.clientWidth;
      const h = b8TriangleCanvas.parentElement.clientHeight;

      // Coordinates of 3 vertices
      const topV = { x: w / 2, y: 70 };
      const leftV = { x: w / 2 - 170, y: h - 100 };
      const rightV = { x: w / 2 + 170, y: h - 100 };

      if (Math.hypot(x - topV.x, y - topV.y) < 55) {
        b8ActiveVertex = 'pos';
      } else if (Math.hypot(x - leftV.x, y - leftV.y) < 55) {
        b8ActiveVertex = 'config';
      } else if (Math.hypot(x - rightV.x, y - rightV.y) < 55) {
        b8ActiveVertex = 'prop';
      }
      drawB8TriangleLab();
    }

    function drawB8TriangleLab() {
      if (!b8TriangleCtx || !b8TriangleCanvas) return;
      const w = b8TriangleCanvas.parentElement.clientWidth;
      const h = b8TriangleCanvas.parentElement.clientHeight;
      const ctx = b8TriangleCtx;
      const d = B8_ELEMENTS_DATA[b8CurElemKey];

      ctx.clearRect(0, 0, w, h);

      // Coordinates of 3 vertices
      const topV = { x: w / 2, y: 75, id: 'pos', title: 'VỊ TRÍ TRONG BTH', color: '#0284c7' };
      const leftV = { x: w / 2 - 180, y: h - 110, id: 'config', title: 'CẤU HÌNH ELECTRON', color: '#2563eb' };
      const rightV = { x: w / 2 + 180, y: h - 110, id: 'prop', title: 'TÍNH CHẤT HOÁ HỌC', color: '#16a34a' };
      const vertices = [topV, leftV, rightV];

      // Draw two-way arrows between vertices
      drawTwoWayArrow(ctx, topV.x, topV.y, leftV.x, leftV.y, '#94a3b8');
      drawTwoWayArrow(ctx, topV.x, topV.y, rightV.x, rightV.y, '#94a3b8');
      drawTwoWayArrow(ctx, leftV.x, leftV.y, rightV.x, rightV.y, '#94a3b8');

      // Center element badge
      const cX = w / 2, cY = (topV.y + leftV.y) / 2 + 15;
      ctx.save();
      ctx.shadowColor = '#cbd5e1';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = d.charColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(cX - 55, cY - 35, 110, 70, 12);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#0f172a';
      ctx.font = '800 22px "Plus Jakarta Sans"';
      ctx.textAlign = 'center';
      ctx.fillText(d.sym, cX, cY - 4);

      ctx.font = '600 11px "JetBrains Mono"';
      ctx.fillStyle = '#64748b';
      ctx.fillText(`Z = ${d.z}`, cX, cY + 16);
      ctx.restore();

      // Draw vertices nodes
      vertices.forEach(v => {
        const isSelected = (v.id === b8ActiveVertex);

        ctx.save();
        if (isSelected) {
          ctx.shadowColor = v.color;
          ctx.shadowBlur = 16;
        }

        ctx.fillStyle = isSelected ? '#ffffff' : '#f8fafc';
        ctx.strokeStyle = isSelected ? v.color : '#cbd5e1';
        ctx.lineWidth = isSelected ? 3 : 1.5;

        // Card box at vertex
        const nodeW = 190, nodeH = 75;
        ctx.beginPath();
        ctx.roundRect(v.x - nodeW / 2, v.y - nodeH / 2, nodeW, nodeH, 10);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Header tag
        ctx.font = '700 11px "Plus Jakarta Sans"';
        ctx.fillStyle = v.color;
        ctx.textAlign = 'center';
        ctx.fillText(v.title, v.x, v.y - 18);

        // Body info based on vertex
        ctx.font = '600 12px "JetBrains Mono"';
        ctx.fillStyle = '#1e293b';
        if (v.id === 'pos') {
          ctx.fillText(d.pos, v.x, v.y + 4);
          ctx.font = '500 10px "Plus Jakarta Sans"';
          ctx.fillStyle = '#64748b';
          ctx.fillText(`Ô ${d.z} ➔ Số e = Số p = ${d.z}`, v.x, v.y + 20);
        } else if (v.id === 'config') {
          ctx.fillText(d.config, v.x, v.y + 4);
          ctx.font = '500 10px "Plus Jakarta Sans"';
          ctx.fillStyle = '#64748b';
          ctx.fillText(d.valenceE, v.x, v.y + 20);
        } else if (v.id === 'prop') {
          ctx.fillText(d.char, v.x, v.y + 4);
          ctx.font = '500 10px "Plus Jakarta Sans"';
          ctx.fillStyle = '#64748b';
          ctx.fillText(`${d.oxide} • ${d.hyd}`, v.x, v.y + 20);
        }

        ctx.restore();
      });
    }

    function drawTwoWayArrow(ctx, x1, y1, x2, y2, color) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    /* -------------------------------------------------------------
       LAB 3: ĐẤU TRƯỜNG LUYỆN TẬP SGK TRANG 44 (BÀI 8)
       ------------------------------------------------------------- */
    const B8_EXERCISES_DATA = [
      {
        id: 1,
        title: "Câu hỏi 2 (SGK Trang 44): Giải phẫu nguyên tố Magnesium",
        text: "Nguyên tố Magnesium thuộc ô số 12, chu kì 3, nhóm IIA của bảng tuần hoàn. Cấu hình electron và tính chất cơ bản của Mg là gì?",
        options: [
          "A. 1s² 2s² 2p⁶ 3s²; là kim loại; oxide MgO là basic oxide; hydroxide Mg(OH)₂ là base yếu",
          "B. 1s² 2s² 2p⁶ 3s¹; là kim loại kiềm; hydroxide MgOH là base mạnh",
          "C. 1s² 2s² 2p⁶ 3s² 3p²; là phi kim; oxide MgO₂ là acidic oxide",
          "D. 1s² 2s² 2p⁶; là khí hiếm trơ về mặt hoá học"
        ],
        correct: 0, // A
        explain: "Chính xác! Ô 12 ➔ Z = 12 ➔ 1s² 2s² 2p⁶ 3s². Có 2e ngoài cùng nên Mg là kim loại hoạt động. Hoá trị cao nhất với oxygen là II ➔ Basic oxide MgO và Base yếu kết tủa trắng Mg(OH)₂."
      },
      {
        id: 2,
        title: "Câu hỏi 2b (SGK Trang 44): So sánh tính kim loại của Mg với lân cận",
        text: "So sánh tính kim loại của Mg (Z = 12) với các nguyên tố lân cận Na (Z = 11) và Ca (Z = 20) trong bảng tuần hoàn:",
        options: [
          "A. Mg kim loại mạnh hơn Na và Ca",
          "B. Mg có tính kim loại yếu hơn Na và yếu hơn Ca",
          "C. Mg có tính kim loại mạnh hơn Na nhưng yếu hơn Ca",
          "D. Mg có tính kim loại yếu hơn Na nhưng mạnh hơn Ca"
        ],
        correct: 1, // B
        explain: "Chính xác! Trong chu kì 3: đi từ trái sang phải tính kim loại giảm ➔ Mg kim loại yếu hơn Na. Trong nhóm IIA: đi từ trên xuống dưới tính kim loại tăng ➔ Mg kim loại yếu hơn Ca."
      },
      {
        id: 3,
        title: "Câu hỏi 3 (SGK Trang 44): Nguyên tố dinh dưỡng Potassium (K)",
        text: "Nguyên tử potassium (K) có cấu hình electron lớp ngoài cùng là 4s¹. Vị trí và tính chất cơ bản của Potassium là gì?",
        options: [
          "A. Ô 19, Chu kì 4, Nhóm IA; là kim loại kiềm mạnh; KOH là base rất mạnh",
          "B. Ô 19, Chu kì 1, Nhóm IVA; là phi kim; H₂KO₃ là acid yếu",
          "C. Ô 17, Chu kì 3, Nhóm VIIA; là halogen; K₂O là acidic oxide",
          "D. Ô 20, Chu kì 4, Nhóm IIA; là kim loại kiềm thổ; K(OH)₂ là base yếu"
        ],
        correct: 0, // A
        explain: "Chính xác! 4s¹ ➔ 4 lớp electron (Chu kì 4), 1e ngoài cùng (Nhóm IA). Tổng số e = 2 + 8 + 8 + 1 = 19 (Ô 19). Potassium là kim loại kiềm rất mạnh, tan mãnh liệt trong nước tạo base mạnh (xút kali) KOH."
      }
    ];

    let b8CurrentQuestionIdx = 0;
    let b8UserAnswers = {};

    function initB8QuizArena() {
      b8CurrentQuestionIdx = 0;
      b8UserAnswers = {};
      renderB8QuizStrip();
      renderB8QuestionCard();
    }

    function renderB8QuizStrip() {
      const strip = document.getElementById('b8-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B8_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b8-q-strip-btn-' + idx;
        btn.className = 'btn-tool';
        btn.style.minWidth = '42px';
        btn.style.height = '36px';
        btn.style.fontWeight = '700';

        const isAnswered = (b8UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b8CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
        } else if (isAnswered) {
          const isCorrect = (b8UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
          btn.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
          btn.style.color = isCorrect ? '#15803d' : '#b91c1c';
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color = '#64748b';
        }

        btn.innerText = `Câu ${idx + 1}`;
        btn.onclick = () => {
          b8CurrentQuestionIdx = idx;
          renderB8QuizStrip();
          renderB8QuestionCard();
        };
        strip.appendChild(btn);
      });

      const prog = document.getElementById('b8-quiz-progress-text');
      const answeredCount = Object.keys(b8UserAnswers).length;
      if (prog) prog.innerText = `Đã hoàn thành: ${answeredCount} / ${B8_EXERCISES_DATA.length} câu`;

      const scoreBoard = document.getElementById('b8-quiz-score-board');
      if (scoreBoard) {
        scoreBoard.style.display = (answeredCount === B8_EXERCISES_DATA.length) ? 'block' : 'none';
      }
    }

    function renderB8QuestionCard() {
      const container = document.getElementById('b8-question-card-container');
      if (!container) return;

      const q = B8_EXERCISES_DATA[b8CurrentQuestionIdx];
      const userSelected = b8UserAnswers[b8CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        if (isAnswered) {
          if (optIdx === q.correct) {
            optStyle += 'background:#dcfce7; border-color:#16a34a; color:#15803d; font-weight:700;';
          } else if (optIdx === userSelected) {
            optStyle += 'background:#fee2e2; border-color:#dc2626; color:#b91c1c; font-weight:700;';
          } else {
            optStyle += 'opacity:0.6;';
          }
        }

        optionsHtml += `
          <button style="${optStyle}" onclick="selectB8Answer(${optIdx})" ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
            ${isAnswered && optIdx === q.correct ? '<span style="color:#16a34a; font-weight:800;">✓</span>' : ''}
            ${isAnswered && optIdx === userSelected && userSelected !== q.correct ? '<span style="color:#dc2626; font-weight:800;">✗</span>' : ''}
          </button>
        `;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; font-size:13px; color:${isCorrect ? '#166534' : '#991b1b'}; line-height:1.5;">
            <strong>${isCorrect ? '✓ Câu trả lời chính xác!' : '✗ Câu trả lời chưa chính xác!'}</strong><br/>
            ${q.explain}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#0284c7; text-transform:uppercase;">${q.title}</span>
            <span style="font-size:11px; font-weight:600; color:#64748b;">Câu ${b8CurrentQuestionIdx + 1} / ${B8_EXERCISES_DATA.length}</span>
          </div>
          <p style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; line-height:1.5;">${q.text}</p>
          <div>
            ${optionsHtml}
          </div>
          ${explainHtml}
        </div>
      `;

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB8Answer(optIdx) {
      if (b8UserAnswers[b8CurrentQuestionIdx] !== undefined) return;
      b8UserAnswers[b8CurrentQuestionIdx] = optIdx;
      renderB8QuizStrip();
      renderB8QuestionCard();
    }

    function resetB8QuizArena() {
      b8UserAnswers = {};
      b8CurrentQuestionIdx = 0;
      renderB8QuizStrip();
      renderB8QuestionCard();
    }

    function resetB8InteractiveState() {
      b8CurElemKey = 'Mg';
      selectB8Element('Mg');
    }





    /* ==========================================================
       LOGIC BÀI 9: ÔN TẬP & LUYỆN TẬP CHƯƠNG 2
       ========================================================== */

    let currentPartB9 = 'part1';

    function switchPartB9(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB9 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b9-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      // Show/hide sections in theory pane
      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b9-' + p);
        const panel = document.getElementById('panel-b9-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const activeSec = document.getElementById('content-b9-' + partId);
      if (activeSec) activeSec.scrollTop = 0;

      if (partId === 'part1') {
        setTimeout(initB9Mindmap, 50);
      } else if (partId === 'part2') {
        setTimeout(initB9ClozeLab, 50);
      } else if (partId === 'part3') {
        setTimeout(initB9QuizArena, 50);
      }

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    /* -------------------------------------------------------------
       LAB CANVAS 1: SƠ ĐỒ TƯ DUY TƯƠNG TÁC 2.5D CHƯƠNG 2
       ------------------------------------------------------------- */
    let b9MindmapCanvas, b9MindmapCtx;
    let b9SelectedBranch = 0;

    const B9_BRANCHES = [
      {
        id: 0,
        title: 'Cấu tạo BTH (Bài 5)',
        color: '#0284c7',
        sub: '118 nguyên tố • 7 Chu kì • 8 Nhóm A & 8 Nhóm B • Khối s, p, d, f',
        details: 'Ô = Z (proton, electron). Chu kì = Số lớp e. Nhóm A = Số e hoá trị = Số e lớp ngoài cùng.'
      },
      {
        id: 1,
        title: 'Tính chất Nguyên tử (Bài 6)',
        color: '#2563eb',
        sub: 'Bán kính r • Độ âm điện χ • Năng lượng I₁ • Tính KL - PK',
        details: 'Chu kì (Trái ➔ Phải): Bán kính giảm, độ âm điện tăng, I₁ tăng, KL giảm, PK tăng. Nhóm A (Trên ➔ Dưới): ngược lại.'
      },
      {
        id: 2,
        title: 'Tính chất Hợp chất (Bài 7)',
        color: '#16a34a',
        sub: 'Oxide & Hydroxide cao nhất • Thang Acid - Base',
        details: 'Hoá trị cao nhất với O tăng từ I đến VII. Chu kì: Tính base giảm dần, tính acid tăng dần (NaOH ➔ Al(OH)₃ ➔ HClO₄).'
      },
      {
        id: 3,
        title: 'Định luật Tuần hoàn (Bài 8)',
        color: '#d97706',
        sub: 'Quy luật tuần hoàn • Tam giác suy luận BTH',
        details: 'Mối quan hệ mật thiết 2 chiều giữa Vị trí trong BTH ⇄ Cấu hình electron ⇄ Tính chất hoá học và quan hệ lân cận.'
      }
    ];

    function initB9Mindmap() {
      b9MindmapCanvas = document.getElementById('b9MindmapCanvas');
      if (!b9MindmapCanvas) return;
      b9MindmapCtx = b9MindmapCanvas.getContext('2d');
      resizeB9MindmapCanvas();

      b9MindmapCanvas.onclick = handleB9MindmapClick;
      drawB9Mindmap();
    }

    function resizeB9MindmapCanvas() {
      if (!b9MindmapCanvas) return;
      const rect = b9MindmapCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b9MindmapCanvas.width = rect.width * dpr;
      b9MindmapCanvas.height = rect.height * dpr;
      b9MindmapCtx.scale(dpr, dpr);
      drawB9Mindmap();
    }

    function handleB9MindmapClick(e) {
      if (!b9MindmapCanvas) return;
      const rect = b9MindmapCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = b9MindmapCanvas.parentElement.clientWidth;
      const h = b9MindmapCanvas.parentElement.clientHeight;

      const cX = w / 2, cY = h / 2 - 20;
      const branchCoords = [
        { x: cX - 180, y: cY - 90 },
        { x: cX + 180, y: cY - 90 },
        { x: cX - 180, y: cY + 90 },
        { x: cX + 180, y: cY + 90 }
      ];

      branchCoords.forEach((b, idx) => {
        if (Math.hypot(x - b.x, y - b.y) < 65) {
          b9SelectedBranch = idx;
          const tip = document.getElementById('b9-lab-status-tip');
          if (tip) tip.innerHTML = `💡 <strong>${B9_BRANCHES[idx].title}:</strong> ${B9_BRANCHES[idx].details}`;
          drawB9Mindmap();
        }
      });
    }

    function drawB9Mindmap() {
      if (!b9MindmapCtx || !b9MindmapCanvas) return;
      const w = b9MindmapCanvas.parentElement.clientWidth;
      const h = b9MindmapCanvas.parentElement.clientHeight;
      const ctx = b9MindmapCtx;

      ctx.clearRect(0, 0, w, h);

      const cX = w / 2, cY = h / 2 - 20;

      const branchCoords = [
        { x: cX - 180, y: cY - 90 },
        { x: cX + 180, y: cY - 90 },
        { x: cX - 180, y: cY + 90 },
        { x: cX + 180, y: cY + 90 }
      ];

      // Draw curved branches to nodes
      branchCoords.forEach((b, idx) => {
        const br = B9_BRANCHES[idx];
        const isSelected = (idx === b9SelectedBranch);

        ctx.save();
        ctx.strokeStyle = isSelected ? br.color : '#cbd5e1';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.beginPath();
        ctx.moveTo(cX, cY);
        ctx.bezierCurveTo(cX, b.y, b.x, cY, b.x, b.y);
        ctx.stroke();
        ctx.restore();
      });

      // Center Node: CHƯƠNG 2
      ctx.save();
      ctx.shadowColor = '#cbd5e1';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cX - 75, cY - 45, 150, 90, 16);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = '800 13px "Plus Jakarta Sans"';
      ctx.fillStyle = '#0284c7';
      ctx.textAlign = 'center';
      ctx.fillText('BẢNG TUẦN HOÀN', cX, cY - 14);

      ctx.font = '700 11px "Plus Jakarta Sans"';
      ctx.fillStyle = '#0f172a';
      ctx.fillText('& ĐỊNH LUẬT', cX, cY + 4);

      ctx.font = '600 10px "JetBrains Mono"';
      ctx.fillStyle = '#64748b';
      ctx.fillText('CHƯƠNG 2', cX, cY + 22);
      ctx.restore();

      // Branch Nodes
      branchCoords.forEach((b, idx) => {
        const br = B9_BRANCHES[idx];
        const isSelected = (idx === b9SelectedBranch);

        ctx.save();
        if (isSelected) {
          ctx.shadowColor = br.color;
          ctx.shadowBlur = 16;
        }

        ctx.fillStyle = isSelected ? '#ffffff' : '#f8fafc';
        ctx.strokeStyle = isSelected ? br.color : '#cbd5e1';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;

        const nodeW = 190, nodeH = 75;
        ctx.beginPath();
        ctx.roundRect(b.x - nodeW / 2, b.y - nodeH / 2, nodeW, nodeH, 12);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font = '700 12px "Plus Jakarta Sans"';
        ctx.fillStyle = br.color;
        ctx.textAlign = 'center';
        ctx.fillText(br.title, b.x, b.y - 12);

        ctx.font = '500 10px "Plus Jakarta Sans"';
        ctx.fillStyle = '#475569';
        ctx.fillText(br.sub.substring(0, 32), b.x, b.y + 6);
        ctx.fillText(br.sub.substring(32), b.x, b.y + 20);
        ctx.restore();
      });
    }

    /* -------------------------------------------------------------
       LAB 2: HỆ THỐNG HOÁ ĐIỀN KHUYẾT (SGK TRANG 45 - 46)
       ------------------------------------------------------------- */
    const B9_CLOZE_ITEMS = [
      {
        id: 1,
        title: "1. Nguyên tắc sắp xếp Bảng tuần hoàn (SGK Trang 45)",
        text: "Các nguyên tố trong BTH được sắp xếp theo chiều tăng dần của (1) ______; các nguyên tố có cùng (2) ______ được xếp thành một hàng (chu kì); các nguyên tố có cùng (3) ______ được xếp thành một cột (nhóm).",
        options1: ["điện tích hạt nhân", "khối lượng nguyên tử", "bán kính nguyên tử"],
        correct1: "điện tích hạt nhân",
        options2: ["số lớp electron", "số proton", "số nơtron"],
        correct2: "số lớp electron",
        options3: ["số electron hoá trị", "số hạt mang điện", "số lớp electron"],
        correct3: "số electron hoá trị"
      },
      {
        id: 2,
        title: "2. Định luật tuần hoàn (SGK Trang 46)",
        text: "Tính chất của các (1) ______ và đơn chất cũng như thành phần và (2) ______ của các hợp chất tạo nên từ các nguyên tố đó biến đổi tuần hoàn theo chiều tăng của (3) ______ nguyên tử.",
        options1: ["nguyên tố", "phân tử", "nguyên tử"],
        correct1: "nguyên tố",
        options2: ["tính chất", "màu sắc", "trạng thái"],
        correct2: "tính chất",
        options3: ["điện tích hạt nhân", "khối lượng", "kích thước"],
        correct3: "điện tích hạt nhân"
      }
    ];

    let b9ClozeAnswers = {};

    function initB9ClozeLab() {
      const container = document.getElementById('b9-cloze-container');
      if (!container) return;
      container.innerHTML = '';

      B9_CLOZE_ITEMS.forEach((item, itemIdx) => {
        const div = document.createElement('div');
        div.style.background = '#ffffff';
        div.style.border = '1px solid #e2e8f0';
        div.style.borderRadius = '10px';
        div.style.padding = '16px';

        div.innerHTML = `
          <h4 style="font-size:14px; font-weight:700; color:#0284c7; margin:0 0 10px 0;">${item.title}</h4>
          <p style="font-size:13px; line-height:1.7; color:#1e293b; margin-bottom:12px;">
            ${item.text
              .replace('(1) ______', `<select id="b9-cloze-${itemIdx}-1" onchange="checkB9Cloze()" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; font-size:12px; font-weight:600; color:#0369a1;"><option value="">-- Chọn cụm từ (1) --</option>${item.options1.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`)
              .replace('(2) ______', `<select id="b9-cloze-${itemIdx}-2" onchange="checkB9Cloze()" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; font-size:12px; font-weight:600; color:#0369a1;"><option value="">-- Chọn cụm từ (2) --</option>${item.options2.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`)
              .replace('(3) ______', `<select id="b9-cloze-${itemIdx}-3" onchange="checkB9Cloze()" style="padding:4px 8px; border-radius:6px; border:1px solid #cbd5e1; font-size:12px; font-weight:600; color:#0369a1;"><option value="">-- Chọn cụm từ (3) --</option>${item.options3.map(o => `<option value="${o}">${o}</option>`).join('')}</select>`)}
          </p>
        `;
        container.appendChild(div);
      });
      checkB9Cloze();
    }

    function checkB9Cloze() {
      let total = 6;
      let correct = 0;

      B9_CLOZE_ITEMS.forEach((item, itemIdx) => {
        for (let s = 1; s <= 3; s++) {
          const sel = document.getElementById(`b9-cloze-${itemIdx}-${s}`);
          if (sel) {
            const val = sel.value;
            const target = item[`correct${s}`];
            if (val === target) {
              correct++;
              sel.style.borderColor = '#16a34a';
              sel.style.background = '#f0fdf4';
            } else if (val) {
              sel.style.borderColor = '#dc2626';
              sel.style.background = '#fef2f2';
            } else {
              sel.style.borderColor = '#cbd5e1';
              sel.style.background = '#ffffff';
            }
          }
        }
      });

      const board = document.getElementById('b9-cloze-status-board');
      if (board) {
        board.innerHTML = `
          <strong>Tiến độ hoàn thành:</strong> ${correct} / ${total} vị trí chính xác.<br/>
          ${correct === total ? '<span style="color:#16a34a; font-weight:700;">🎉 Tuyệt vời! Bạn đã hoàn thành chính xác 100% nội dung hệ thống hoá kiến thức BTH!</span>' : '<span style="color:#64748b;">Hãy lựa chọn cụm từ thích hợp cho từng ô trống để hoàn thiện mệnh đề.</span>'}
        `;
      }
    }

    /* -------------------------------------------------------------
       LAB 3: ĐẤU TRƯỜNG 6 BÀI TẬP SGK TRANG 46 - 47 (BÀI 9)
       ------------------------------------------------------------- */
    const B9_EXERCISES_DATA = [
      {
        id: 1,
        title: "Bài tập 1 (SGK Trang 46): Vị trí các nguyên tố bí ẩn E, T, Q, X, Y, Z",
        text: "Cho vị trí của các nguyên tố E, T, Q, X, Y, Z trong BTH rút gọn (chỉ biểu diễn nhóm A). Nhận xét nào dưới đây là ĐÚNG?",
        options: [
          "A. Thứ tự giảm dần tính kim loại là: Y > E > X",
          "B. Thứ tự tăng dần độ âm điện là: Y < X < Z < T",
          "C. Thứ tự tăng dần tính phi kim là: T < Z < Q",
          "D. Tất cả các nhận xét trên đều đúng"
        ],
        correct: 3, // D
        explain: "Chính xác! Y thuộc chu kì 3 nhóm IA (kim loại mạnh nhất), E ở nhóm IIA, X ở nhóm IIIA ➔ tính kim loại Y > E > X. Tăng dần độ âm điện từ kim loại sang phi kim ➔ Y < X < Z < T. Tính phi kim tăng dần từ dưới lên trên và sang phải ➔ T < Z < Q."
      },
      {
        id: 2,
        title: "Bài tập 2 (SGK Trang 47): Mệnh đề về Sulfur (S, Z = 16)",
        text: "Sulfur (S) là nguyên tố thuộc nhóm VIA, chu kì 3 của bảng tuần hoàn. Số phát biểu ĐÚNG trong số các phát biểu về S là:",
        options: [
          "A. 1",
          "B. 2",
          "C. 3",
          "D. 4"
        ],
        correct: 2, // C
        explain: "Chính xác! Có 3 phát biểu đúng: (1) S có 3 lớp e và 10 electron p (2p⁶ 3p⁴) [Đúng]; (2) Oxide cao nhất SO₃ mang tính acid [Đúng]; (3) Acid tương ứng H₂SO₄ là acid mạnh [Đúng]; (4) Bán kính nguyên tử S lớn hơn O nhưng nhỏ hơn P [Đúng - quy luật chu kì/nhóm]."
      },
      {
        id: 3,
        title: "Bài tập 3 (SGK Trang 47): Xu hướng biến đổi bán kính & độ âm điện trong Chu kì 3",
        text: "Cho các nguyên tố chu kì 3: ₁₁Na, ₁₂Mg, ₁₃Al, ₁₄Si, ₁₅P, ₁₆S, ₁₇Cl. Theo chiều tăng dần của điện tích hạt nhân (từ trái sang phải), xu hướng biến đổi nào sau đây là ĐÚNG?",
        options: [
          "A. Bán kính nguyên tử giảm dần, độ âm điện tăng dần",
          "B. Bán kính nguyên tử tăng dần, độ âm điện giảm dần",
          "C. Cả bán kính nguyên tử và độ âm điện đều tăng dần",
          "D. Cả bán kính nguyên tử và độ âm điện đều giảm dần"
        ],
        correct: 0, // A
        explain: "Chính xác! Trong cùng một chu kì, đi từ trái sang phải theo chiều Z tăng: số lớp electron không đổi (n = 3), điện tích hạt nhân tăng làm lực hút tĩnh điện giữa hạt nhân và electron lớp ngoài cùng tăng ➔ Bán kính nguyên tử giảm dần, độ âm điện tăng dần (Na: 0,93 ➔ Cl: 3,16)."
      },
      {
        id: 4,
        title: "Bài tập 4 (SGK Trang 47): Vị trí & tính chất của nguyên tố X (3s² 3p⁵)",
        text: "Nguyên tử của nguyên tố X có cấu hình electron lớp ngoài cùng là 3s² 3p⁵. Nhận xét nào sau đây về vị trí và tính chất của X là ĐÚNG?",
        options: [
          "A. X ở chu kì 3, nhóm VIIA, là phi kim điển hình",
          "B. X ở chu kì 3, nhóm VA, là phi kim",
          "C. X ở chu kì 3, nhóm VIIB, là kim loại chuyển tiếp",
          "D. X ở chu kì 5, nhóm IIIA, là kim loại"
        ],
        correct: 0, // A
        explain: "Chính xác! X có 3 lớp electron (chu kì 3), lớp ngoài cùng có 2 + 5 = 7 electron, electron cuối cùng điền vào phân lớp p ➔ thuộc Nhóm VIIA (halogen). X có 7 e ngoài cùng nên dễ nhận 1 e tạo anion X⁻, là phi kim rất mạnh (chính là Chlorine)."
      },
      {
        id: 5,
        title: "Bài tập 5 (SGK Trang 47): Sắp xếp tính base của các hydroxide Chu kì 3",
        text: "Dãy nào sau đây sắp xếp các hydroxide theo thứ tự GIẢM DẦN tính base?",
        options: [
          "A. NaOH > Mg(OH)₂ > Al(OH)₃",
          "B. Al(OH)₃ > Mg(OH)₂ > NaOH",
          "C. Mg(OH)₂ > NaOH > Al(OH)₃",
          "D. NaOH > Al(OH)₃ > Mg(OH)₂"
        ],
        correct: 0, // A
        explain: "Chính xác! Trong chu kì 3 từ trái qua phải, tính kim loại giảm dần ➔ tính base của các hydroxide tương ứng giảm dần: NaOH (base mạnh, kiềm) > Mg(OH)₂ (base yếu) > Al(OH)₃ (hydroxide lưỡng tính)."
      },
      {
        id: 6,
        title: "Bài tập 6 (SGK Trang 47): Xác định nguyên tố R dựa vào oxide cao nhất",
        text: "Nguyên tố R thuộc nhóm VIA của bảng tuần hoàn. Trong hợp chất oxide cao nhất của R, oxygen chiếm 60% về khối lượng. Nguyên tố R là:",
        options: [
          "A. Sulfur (S, nguyên tử khối 32)",
          "B. Selenium (Se, nguyên tử khối 79)",
          "C. Carbon (C, nguyên tử khối 12)",
          "D. Chromium (Cr, nguyên tử khối 52)"
        ],
        correct: 0, // A
        explain: "Chính xác! R thuộc nhóm VIA ➔ oxide cao nhất là RO₃. Ta có: %m_O = (3 × 16) / (R + 3 × 16) × 100% = 60% ➔ 48 / (R + 48) = 0,6 ➔ 0,6R + 28,8 = 48 ➔ 0,6R = 19,2 ➔ R = 32. Vậy R là Sulfur (S)."
      }
    ]; (3) Oxide cao nhất là SO₃ thuộc acidic oxide [Đúng]; (5) Hydroxide cao nhất là H₂SO₄ có tính acid mạnh [Đúng]. Phát biểu (2) sai vì S có 6e hoá trị và 6e s (1s² 2s² 3s²). Phát biểu (4) sai vì S có tính phi kim yếu hơn Oxygen (Z=8)."
      },
      {
        id: 3,
        title: "Bài tập 3 (SGK Trang 47): Cặp oxide cao nhất XO và YO₃",
        text: "X và Y là hai nguyên tố thuộc nhóm A trong cùng một chu kì. Oxide cao nhất của X và Y có dạng XO và YO₃. Số phát biểu ĐÚNG là:",
        options: [
          "A. 1",
          "B. 2",
          "C. 3",
          "D. 4"
        ],
        correct: 1, // B
        explain: "Chính xác! Có 2 phát biểu đúng: XO ➔ X thuộc nhóm IIA (kim loại); YO₃ ➔ Y thuộc nhóm VIA (phi kim) ➔ Phát biểu (2) đúng; X₂O không tồn tại mà là XO (basic oxide) và YO₃ (acidic oxide) ➔ Phát biểu (3) đúng. (1) sai vì nhóm IIA và VIA cách xa nhau. (4) sai vì hydroxide của Y có dạng H₂YO₄ là acid."
      },
      {
        id: 4,
        title: "Bài tập 4 (SGK Trang 47): Khoáng chất Borax (Hàn the - Na₂B₄O₇·10H₂O)",
        text: "Thứ tự sắp xếp các nguyên tố Na, B, O trong phân tử Borax theo chiều BÁN KÍNH NGUYÊN TỬ TĂNG DẦN là:",
        options: [
          "A. O < B < Na",
          "B. Na < B < O",
          "C. B < O < Na",
          "D. O < Na < B"
        ],
        correct: 0, // A
        explain: "Chính xác! O (Z=8, chu kì 2 nhóm VIA), B (Z=5, chu kì 2 nhóm IIIA), Na (Z=11, chu kì 3 nhóm IA). Trong chu kì 2: Bán kính O < B. Nguyên tố Na ở chu kì 3 có 3 lớp electron nên bán kính lớn nhất. Chiều bán kính tăng dần: O < B < Na."
      },
      {
        id: 5,
        title: "Bài tập 5 (SGK Trang 47): Phân tử Caffeine (C₈H₁₀N₄O₂)",
        text: "So sánh độ âm điện của các nguyên tố C, N, O cấu tạo nên phân tử Caffeine theo chiều TĂNG DẦN:",
        options: [
          "A. C < N < O",
          "B. O < N < C",
          "C. N < C < O",
          "D. C < O < N"
        ],
        correct: 0, // A
        explain: "Chính xác! C, N, O đều thuộc Chu kì 2 (nhóm IVA, VA, VIA). Đi từ trái sang phải trong chu kì, điện tích hạt nhân tăng dần kéo electron mạnh hơn làm độ âm điện tăng đều đặn: C (2,55) < N (3,04) < O (3,44)."
      },
      {
        id: 6,
        title: "Bài tập 6 (SGK Trang 47): Hợp kim hàng không A, B đứng kế tiếp",
        text: "Hai nguyên tố A, B đứng kế tiếp nhau trong cùng một chu kì của BTH có tổng số đơn vị điện tích hạt nhân là 25 (Z_A + Z_B = 25). A và B là:",
        options: [
          "A. Magnesium (Mg, Z = 12) và Aluminium (Al, Z = 13)",
          "B. Sodium (Na, Z = 11) và Silicon (Si, Z = 14)",
          "C. Carbon (C, Z = 6) và Potassium (K, Z = 19)",
          "D. Beryllium (Be, Z = 4) và Scandium (Sc, Z = 21)"
        ],
        correct: 0, // A
        explain: "Chính xác! Vì A và B kế tiếp nhau trong cùng chu kì nên Z_B - Z_A = 1. Kết hợp Z_A + Z_B = 25 ➔ Z_A = 12 (Mg) và Z_B = 13 (Al). Hợp kim nhôm - magie (Duralumin) siêu nhẹ và siêu bền, là vật liệu kinh điển trong kỹ thuật hàng không vũ trụ!"
      }
    ];

    let b9CurrentQuestionIdx = 0;
    let b9UserAnswers = {};

    function initB9QuizArena() {
      b9CurrentQuestionIdx = 0;
      b9UserAnswers = {};
      renderB9QuizStrip();
      renderB9QuestionCard();
    }

    function renderB9QuizStrip() {
      const strip = document.getElementById('b9-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B9_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b9-q-strip-btn-' + idx;
        btn.className = 'btn-tool';
        btn.style.minWidth = '42px';
        btn.style.height = '36px';
        btn.style.fontWeight = '700';

        const isAnswered = (b9UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b9CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
        } else if (isAnswered) {
          const isCorrect = (b9UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
          btn.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
          btn.style.color = isCorrect ? '#15803d' : '#b91c1c';
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color = '#64748b';
        }

        btn.innerText = `Câu ${idx + 1}`;
        btn.onclick = () => {
          b9CurrentQuestionIdx = idx;
          renderB9QuizStrip();
          renderB9QuestionCard();
        };
        strip.appendChild(btn);
      });

      const prog = document.getElementById('b9-quiz-progress-text');
      const answeredCount = Object.keys(b9UserAnswers).length;
      if (prog) prog.innerText = `Đã hoàn thành: ${answeredCount} / ${B9_EXERCISES_DATA.length} câu`;

      const scoreBoard = document.getElementById('b9-quiz-score-board');
      if (scoreBoard) {
        scoreBoard.style.display = (answeredCount === B9_EXERCISES_DATA.length) ? 'block' : 'none';
      }
    }

    function renderB9QuestionCard() {
      const container = document.getElementById('b9-question-card-container');
      if (!container) return;

      const q = B9_EXERCISES_DATA[b9CurrentQuestionIdx];
      const userSelected = b9UserAnswers[b9CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        if (isAnswered) {
          if (optIdx === q.correct) {
            optStyle += 'background:#dcfce7; border-color:#16a34a; color:#15803d; font-weight:700;';
          } else if (optIdx === userSelected) {
            optStyle += 'background:#fee2e2; border-color:#dc2626; color:#b91c1c; font-weight:700;';
          } else {
            optStyle += 'opacity:0.6;';
          }
        }

        optionsHtml += `
          <button style="${optStyle}" onclick="selectB9Answer(${optIdx})" ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
            ${isAnswered && optIdx === q.correct ? '<span style="color:#16a34a; font-weight:800;">✓</span>' : ''}
            ${isAnswered && optIdx === userSelected && userSelected !== q.correct ? '<span style="color:#dc2626; font-weight:800;">✗</span>' : ''}
          </button>
        `;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; font-size:13px; color:${isCorrect ? '#166534' : '#991b1b'}; line-height:1.5;">
            <strong>${isCorrect ? '✓ Câu trả lời chính xác!' : '✗ Câu trả lời chưa chính xác!'}</strong><br/>
            ${q.explain}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#0284c7; text-transform:uppercase;">${q.title}</span>
            <span style="font-size:11px; font-weight:600; color:#64748b;">Câu ${b9CurrentQuestionIdx + 1} / ${B9_EXERCISES_DATA.length}</span>
          </div>
          <p style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; line-height:1.5;">${q.text}</p>
          <div>
            ${optionsHtml}
          </div>
          ${explainHtml}
        </div>
      `;

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB9Answer(optIdx) {
      if (b9UserAnswers[b9CurrentQuestionIdx] !== undefined) return;
      b9UserAnswers[b9CurrentQuestionIdx] = optIdx;
      renderB9QuizStrip();
      renderB9QuestionCard();
    }

    function resetB9QuizArena() {
      b9UserAnswers = {};
      b9CurrentQuestionIdx = 0;
      renderB9QuizStrip();
      renderB9QuestionCard();
    }

    function resetB9InteractiveState() {
      b9SelectedBranch = 0;
      drawB9Mindmap();
      initB9ClozeLab();
    }





    /* ==========================================================
       LOGIC BÀI 10: QUY TẮC OCTET & KHÁI NIỆM LIÊN KẾT HOÁ HỌC
       ========================================================== */

    let currentPartB10 = 'part1';
    let b10SimMode = 'cl2'; // 'cl2' | 'naf' | 'h2o' | 'pcl5'

    const B10_MODELS_DATA = {
      'cl2': {
        title: 'Phân tử Chlorine (Cl₂)',
        valence: '7e (Cl trái) + 7e (Cl phải) ➔ Góp 1 cặp e dùng chung',
        status: 'Cả 2 nguyên tử Cl đều đạt Octet (8e)',
        statusColor: '#16a34a',
        bond: 'Liên kết cộng hoá trị không phân cực (Cl — Cl)',
        tip: 'Mỗi nguyên tử Chlorine góp 1 electron hoá trị độc thân để tạo thành 1 liên kết cộng hoá trị đơn.'
      },
      'naf': {
        title: 'Hợp chất Sodium Fluoride (NaF)',
        valence: 'Na (1e hoá trị) nhường 1e ➔ F (7e) nhận 1e',
        status: 'Cả cation Na⁺ và anion F⁻ đều đạt Octet [Ne]',
        statusColor: '#16a34a',
        bond: 'Liên kết ion (Lực hút tĩnh điện giữa Na⁺ và F⁻)',
        tip: 'Na nhường 1e ngoài cùng trở thành ion Na⁺ (10e giống Ne); F nhận 1e trở thành ion F⁻ (10e giống Ne).'
      },
      'h2o': {
        title: 'Phân tử Nước (H₂O)',
        valence: 'O (6e ngoài cùng) góp chung 2 cặp e với 2 nguyên tử H',
        status: 'O đạt Octet (8e), mỗi H đạt Duplet (2e của He)',
        statusColor: '#16a34a',
        bond: 'Liên kết cộng hoá trị phân cực (H — O — H, góc 104.5°)',
        tip: 'Oxygen ở tâm có 8e xung quanh (gồm 2 cặp liên kết và 2 cặp electron tự do không liên kết).'
      },
      'pcl5': {
        title: 'Phân tử Phosphorus Pentachloride (PCl₅)',
        valence: 'P (5e ngoài cùng) góp chung 5 cặp e với 5 nguyên tử Cl',
        status: 'P có 10 electron ngoài cùng (NGOẠI LỆ MỞ RỘNG OCTET)',
        statusColor: '#d97706',
        bond: '5 liên kết cộng hoá trị đơn hình chóp đôi tam giác',
        tip: 'Phosphorus ở chu kì 3 có phân lớp 3d còn trống nên có thể mở rộng lớp vỏ electron lên 10e.'
      }
    };

    function switchPartB10(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB10 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b10-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      // Show/hide sections in theory pane
      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b10-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
      });

      // Show/hide panels
      const panelP1 = document.getElementById('panel-b10-part1');
      const panelP3 = document.getElementById('panel-b10-part3');
      if (panelP1) panelP1.style.display = (partId === 'part1' || partId === 'part2') ? 'flex' : 'none';
      if (panelP3) panelP3.style.display = (partId === 'part3') ? 'flex' : 'none';

      const activeSec = document.getElementById('content-b10-' + partId);
      if (activeSec) activeSec.scrollTop = 0;

      if (partId === 'part1' || partId === 'part2') {
        setTimeout(initB10OctetLab, 50);
      } else if (partId === 'part3') {
        setTimeout(initB10QuizArena, 50);
      }

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function checkB10MiniQuiz(btn, isCorrect, feedback) {
      const parent = btn.parentElement.parentElement;
      const allBtns = parent.querySelectorAll('.opt-btn');
      allBtns.forEach(b => {
        b.style.pointerEvents = 'none';
        b.style.opacity = '0.7';
      });

      if (isCorrect) {
        btn.style.background = '#dcfce7';
        btn.style.borderColor = '#16a34a';
        btn.style.color = '#15803d';
        btn.style.opacity = '1';
      } else {
        btn.style.background = '#fee2e2';
        btn.style.borderColor = '#dc2626';
        btn.style.color = '#b91c1c';
        btn.style.opacity = '1';
      }

      const fb = parent.querySelector('.quiz-feedback');
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = isCorrect ? '#f0fdf4' : '#fef2f2';
        fb.style.color = isCorrect ? '#166534' : '#991b1b';
        fb.style.border = `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`;
        fb.innerHTML = feedback;
      }
      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    /* -------------------------------------------------------------
       LAB CANVAS: MÔ PHỎNG LIÊN KẾT & OCTET 2.5D (BÀI 10)
       ------------------------------------------------------------- */
    let b10OctetCanvas, b10OctetCtx;
    let b10AnimAngle = 0;
    let b10AnimFrameId;

    function initB10OctetLab() {
      b10OctetCanvas = document.getElementById('b10OctetCanvas');
      if (!b10OctetCanvas) return;
      b10OctetCtx = b10OctetCanvas.getContext('2d');
      resizeB10OctetCanvas();

      if (b10AnimFrameId) cancelAnimationFrame(b10AnimFrameId);
      animateB10Octet();
    }

    function resizeB10OctetCanvas() {
      if (!b10OctetCanvas) return;
      const rect = b10OctetCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b10OctetCanvas.width = rect.width * dpr;
      b10OctetCanvas.height = rect.height * dpr;
      b10OctetCtx.scale(dpr, dpr);
    }

    function selectB10SimMode(mode) {
      b10SimMode = mode;
      ['cl2', 'naf', 'h2o', 'pcl5'].forEach(m => {
        const btn = document.getElementById('btn-b10-sim-' + m);
        if (btn) btn.classList.toggle('active', m === mode);
      });
      updateB10Hud();
    }

    function updateB10Hud() {
      const d = B10_MODELS_DATA[b10SimMode];
      const modelText = document.getElementById('b10-hud-model');
      if (modelText) modelText.innerText = d.title;

      const valText = document.getElementById('b10-hud-valence');
      if (valText) valText.innerText = d.valence;

      const statText = document.getElementById('b10-hud-status');
      if (statText) {
        statText.innerText = d.status;
        statText.style.color = d.statusColor;
      }

      const bondText = document.getElementById('b10-hud-bond');
      if (bondText) bondText.innerText = d.bond;

      const tip = document.getElementById('b10-lab-status-tip');
      if (tip) tip.innerHTML = `💡 <strong>${d.title}:</strong> ${d.tip}`;
    }

    function animateB10Octet() {
      if (!b10OctetCtx || !b10OctetCanvas) return;
      const w = b10OctetCanvas.parentElement.clientWidth;
      const h = b10OctetCanvas.parentElement.clientHeight;
      const ctx = b10OctetCtx;

      ctx.clearRect(0, 0, w, h);
      b10AnimAngle += 0.02;

      const cX = w / 2, cY = h / 2 - 10;

      if (b10SimMode === 'cl2') {
        drawB10Cl2Sim(ctx, cX, cY);
      } else if (b10SimMode === 'naf') {
        drawB10NaFSim(ctx, cX, cY);
      } else if (b10SimMode === 'h2o') {
        drawB10H2OSim(ctx, cX, cY);
      } else if (b10SimMode === 'pcl5') {
        drawB10PCl5Sim(ctx, cX, cY);
      }

      b10AnimFrameId = requestAnimationFrame(animateB10Octet);
    }

    function drawB10Cl2Sim(ctx, cX, cY) {
      const dist = 75;
      const leftX = cX - dist, rightX = cX + dist;
      const r = 58;

      // Draw two overlapping atomic orbits
      drawAtomCircle(ctx, leftX, cY, r, '#3b82f6', 'Cl');
      drawAtomCircle(ctx, rightX, cY, r, '#3b82f6', 'Cl');

      // Shared electron pair in overlap zone
      const sharedX = cX;
      drawElectron(ctx, sharedX, cY - 14 + Math.sin(b10AnimAngle * 2) * 4, '#f59e0b', 'e⁻');
      drawElectron(ctx, sharedX, cY + 14 - Math.sin(b10AnimAngle * 2) * 4, '#f59e0b', 'e⁻');

      // Draw 6 unshared electrons around left Cl
      for (let i = 0; i < 3; i++) {
        const ang = Math.PI * 0.7 + i * (Math.PI * 0.3);
        const ex = leftX + Math.cos(ang + b10AnimAngle * 0.5) * (r - 10);
        const ey = cY + Math.sin(ang + b10AnimAngle * 0.5) * (r - 10);
        drawElectron(ctx, ex, ey, '#2563eb', 'e⁻');
        const ex2 = leftX + Math.cos(ang + 0.15 + b10AnimAngle * 0.5) * (r - 10);
        const ey2 = cY + Math.sin(ang + 0.15 + b10AnimAngle * 0.5) * (r - 10);
        drawElectron(ctx, ex2, ey2, '#2563eb', 'e⁻');
      }

      // Draw 6 unshared electrons around right Cl
      for (let i = 0; i < 3; i++) {
        const ang = -Math.PI * 0.3 + i * (Math.PI * 0.3);
        const ex = rightX + Math.cos(ang - b10AnimAngle * 0.5) * (r - 10);
        const ey = cY + Math.sin(ang - b10AnimAngle * 0.5) * (r - 10);
        drawElectron(ctx, ex, ey, '#2563eb', 'e⁻');
        const ex2 = rightX + Math.cos(ang + 0.15 - b10AnimAngle * 0.5) * (r - 10);
        const ey2 = cY + Math.sin(ang + 0.15 - b10AnimAngle * 0.5) * (r - 10);
        drawElectron(ctx, ex2, ey2, '#2563eb', 'e⁻');
      }

      // Overlap label
      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#b45309';
      ctx.textAlign = 'center';
      ctx.fillText('1 Cặp e dùng chung (Liên kết đơn)', cX, cY + r + 35);
    }

    function drawB10NaFSim(ctx, cX, cY) {
      const leftX = cX - 110, rightX = cX + 110;

      // Cation Na+ (nhỏ hơn, màu xanh)
      drawAtomCircle(ctx, leftX, cY, 44, '#3b82f6', 'Na⁺');
      ctx.font = '700 11px "Plus Jakarta Sans"';
      ctx.fillStyle = '#2563eb';
      ctx.textAlign = 'center';
      ctx.fillText('[Ne] (Đã nhường 1e)', leftX, cY + 65);

      // Anion F- (lớn hơn, màu ngọc)
      drawAtomCircle(ctx, rightX, cY, 62, '#10b981', 'F⁻');
      ctx.fillStyle = '#059669';
      ctx.fillText('[Ne] (Đã nhận 1e ➔ Đủ 8e)', rightX, cY + 80);

      // 8 electrons around F-
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI / 4) + b10AnimAngle;
        const ex = rightX + Math.cos(ang) * 48;
        const ey = cY + Math.sin(ang) * 48;
        drawElectron(ctx, ex, ey, '#059669', 'e⁻');
      }

      // Electrostatic attraction arrow between Na+ and F-
      ctx.save();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(leftX + 48, cY);
      ctx.lineTo(rightX - 66, cY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#d97706';
      ctx.fillText('⚡ Lực hút tĩnh điện (Liên kết ion)', cX, cY - 14);
    }

    function drawB10H2OSim(ctx, cX, cY) {
      // Oxygen at center
      drawAtomCircle(ctx, cX, cY - 20, 52, '#ef4444', 'O');

      // Two Hydrogen atoms at angles 104.5 degrees
      const h1X = cX - 90, h1Y = cY + 50;
      const h2X = cX + 90, h2Y = cY + 50;

      drawAtomCircle(ctx, h1X, h1Y, 30, '#0284c7', 'H');
      drawAtomCircle(ctx, h2X, h2Y, 30, '#0284c7', 'H');

      // Bonding electron pairs
      drawElectron(ctx, (cX + h1X) / 2, (cY - 20 + h1Y) / 2 - 4, '#f59e0b', 'e⁻');
      drawElectron(ctx, (cX + h1X) / 2, (cY - 20 + h1Y) / 2 + 6, '#f59e0b', 'e⁻');

      drawElectron(ctx, (cX + h2X) / 2, (cY - 20 + h2Y) / 2 - 4, '#f59e0b', 'e⁻');
      drawElectron(ctx, (cX + h2X) / 2, (cY - 20 + h2Y) / 2 + 6, '#f59e0b', 'e⁻');

      // 2 lone pairs on top of Oxygen
      drawElectron(ctx, cX - 16, cY - 70, '#dc2626', 'e⁻');
      drawElectron(ctx, cX - 8, cY - 74, '#dc2626', 'e⁻');
      drawElectron(ctx, cX + 16, cY - 70, '#dc2626', 'e⁻');
      drawElectron(ctx, cX + 8, cY - 74, '#dc2626', 'e⁻');

      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#dc2626';
      ctx.textAlign = 'center';
      ctx.fillText('2 Cặp e tự do (Lone pairs)', cX, cY - 86);
      ctx.fillStyle = '#0284c7';
      ctx.fillText('Góc liên kết 104.5° (Mô hình gấp khúc)', cX, cY + 95);
    }

    function drawB10PCl5Sim(ctx, cX, cY) {
      // P at center
      drawAtomCircle(ctx, cX, cY, 46, '#ea580c', 'P (10e)');

      // 5 Cl atoms around (trigonal bipyramidal projection)
      const angles = [0, Math.PI * 0.4, Math.PI * 0.8, Math.PI * 1.2, Math.PI * 1.6];
      const dist = 110;

      angles.forEach((ang, i) => {
        const clX = cX + Math.cos(ang + b10AnimAngle * 0.3) * dist;
        const clY = cY + Math.sin(ang + b10AnimAngle * 0.3) * dist;
        drawAtomCircle(ctx, clX, clY, 30, '#10b981', 'Cl');

        // Line connect to P
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cX, cY);
        ctx.lineTo(clX, clY);
        ctx.stroke();

        // 2 electrons on bond
        const midX = (cX + clX) / 2, midY = (cY + clY) / 2;
        drawElectron(ctx, midX, midY, '#f59e0b', 'e⁻');
      });

      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#ea580c';
      ctx.textAlign = 'center';
      ctx.fillText('⚠️ Ngoại lệ mở rộng Octet: 5 liên kết = 10 electron', cX, cY + dist + 45);
    }

    function drawAtomCircle(ctx, x, y, r, color, label) {
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '800 15px "Plus Jakarta Sans"';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x, y);
      ctx.restore();
    }

    function drawElectron(ctx, x, y, color, label) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    /* -------------------------------------------------------------
       LAB 3: ĐẤU TRƯỜNG LUYỆN TẬP SGK TRANG 50 (BÀI 10)
       ------------------------------------------------------------- */
    const B10_EXERCISES_DATA = [
      {
        id: 1,
        title: "Câu hỏi 3 (SGK Trang 50): Giải thích liên kết trong CCl₄",
        text: "Vận dụng quy tắc octet để giải thích sự hình thành liên kết trong phân tử Carbon tetrachloride (CCl₄):",
        options: [
          "A. C có 4e hoá trị, mỗi nguyên tử Cl có 7e hoá trị ➔ C góp chung 4 cặp e với 4 nguyên tử Cl, cả C và 4 Cl đều đạt 8e octet",
          "B. C nhường 4 electron cho 4 nguyên tử Cl để tạo ion C⁴⁺ và 4 Cl⁻",
          "C. C nhận 4 electron từ các nguyên tử Cl để đạt 8 electron",
          "D. CCl₄ chỉ có liên kết cho - nhận giữa C và Cl"
        ],
        correct: 0, // A
        explain: "Chính xác! Carbon có 4 electron lớp ngoài cùng (cần 4e), mỗi Chlorine có 7 electron (cần 1e). Carbon góp chung 1 electron với mỗi nguyên tử Chlorine tạo nên 4 liên kết cộng hoá trị đơn. Kết quả cả Carbon và 4 Chlorine đều đạt cơ cấu octet 8e bền vững."
      },
      {
        id: 2,
        title: "Câu hỏi 3b (SGK Trang 50): Sự hình thành liên kết trong NF₃",
        text: "Sự phân bố electron trong phân tử Nitrogen trifluoride (NF₃) tuân theo quy tắc octet như thế nào?",
        options: [
          "A. N nhường 3 electron cho 3 nguyên tử F tạo thành hợp chất ion",
          "B. N (có 5e hoá trị) góp chung 3e với 3 nguyên tử F, còn lại 1 cặp e tự do ➔ Cả N và 3 nguyên tử F đều đạt 8e octet",
          "C. N tạo liên kết đôi với 1 nguyên tử F và liên kết đơn với 2 nguyên tử F",
          "D. N có 10 electron lớp ngoài cùng (ngoại lệ octet)"
        ],
        correct: 1, // B
        explain: "Chính xác! Nitrogen thuộc nhóm VA có 5e hoá trị (gồm 1 cặp e tự do và 3e độc thân). N đem 3e độc thân góp chung với 3 nguyên tử F (mỗi F góp 1e). Xung quanh N có 3 cặp e liên kết + 1 cặp e chưa liên kết = 8e (octet); mỗi F cũng đạt 8e."
      },
      {
        id: 3,
        title: "Câu hỏi 4 (SGK Trang 50): Khí Phosphine (PH₃) và hiện tượng ma trơi",
        text: "Phosphine (PH₃) là khí độc, tự cháy ngoài không khí tạo hiện tượng 'ma trơi'. Vận dụng quy tắc octet giải thích liên kết trong PH₃:",
        options: [
          "A. P (nhóm VA, 5e hoá trị) góp chung 3 electron với 3 nguyên tử H (mỗi H góp 1e) ➔ P đạt octet 8e, mỗi H đạt duplet 2e",
          "B. P nhường 3 electron cho 3 nguyên tử H tạo muối hydride ion",
          "C. P nhận 3 electron từ 3 nguyên tử H để đạt cấu hình Neon",
          "D. P có 6 electron lớp ngoài cùng trong phân tử PH₃"
        ],
        correct: 0, // A
        explain: "Chính xác! P thuộc nhóm VA có 5e lớp ngoài cùng. P góp chung 3e với 3 nguyên tử H tạo 3 cặp e dùng chung. Xung quanh P có 3 cặp e liên kết và 1 cặp e không liên kết ➔ P đạt octet 8e bền của Argon (Ar). Mỗi H có 2e bền vững của Helium (He)."
      }
    ];

    let b10CurrentQuestionIdx = 0;
    let b10UserAnswers = {};

    function initB10QuizArena() {
      b10CurrentQuestionIdx = 0;
      b10UserAnswers = {};
      renderB10QuizStrip();
      renderB10QuestionCard();
    }

    function renderB10QuizStrip() {
      const strip = document.getElementById('b10-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B10_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b10-q-strip-btn-' + idx;
        btn.className = 'btn-tool';
        btn.style.minWidth = '42px';
        btn.style.height = '36px';
        btn.style.fontWeight = '700';

        const isAnswered = (b10UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b10CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
        } else if (isAnswered) {
          const isCorrect = (b10UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
          btn.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
          btn.style.color = isCorrect ? '#15803d' : '#b91c1c';
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color = '#64748b';
        }

        btn.innerText = `Câu ${idx + 1}`;
        btn.onclick = () => {
          b10CurrentQuestionIdx = idx;
          renderB10QuizStrip();
          renderB10QuestionCard();
        };
        strip.appendChild(btn);
      });

      const prog = document.getElementById('b10-quiz-progress-text');
      const answeredCount = Object.keys(b10UserAnswers).length;
      if (prog) prog.innerText = `Đã hoàn thành: ${answeredCount} / ${B10_EXERCISES_DATA.length} câu`;

      const scoreBoard = document.getElementById('b10-quiz-score-board');
      if (scoreBoard) {
        scoreBoard.style.display = (answeredCount === B10_EXERCISES_DATA.length) ? 'block' : 'none';
      }
    }

    function renderB10QuestionCard() {
      const container = document.getElementById('b10-question-card-container');
      if (!container) return;

      const q = B10_EXERCISES_DATA[b10CurrentQuestionIdx];
      const userSelected = b10UserAnswers[b10CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        if (isAnswered) {
          if (optIdx === q.correct) {
            optStyle += 'background:#dcfce7; border-color:#16a34a; color:#15803d; font-weight:700;';
          } else if (optIdx === userSelected) {
            optStyle += 'background:#fee2e2; border-color:#dc2626; color:#b91c1c; font-weight:700;';
          } else {
            optStyle += 'opacity:0.6;';
          }
        }

        optionsHtml += `
          <button style="${optStyle}" onclick="selectB10Answer(${optIdx})" ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
            ${isAnswered && optIdx === q.correct ? '<span style="color:#16a34a; font-weight:800;">✓</span>' : ''}
            ${isAnswered && optIdx === userSelected && userSelected !== q.correct ? '<span style="color:#dc2626; font-weight:800;">✗</span>' : ''}
          </button>
        `;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; font-size:13px; color:${isCorrect ? '#166534' : '#991b1b'}; line-height:1.5;">
            <strong>${isCorrect ? '✓ Câu trả lời chính xác!' : '✗ Câu trả lời chưa chính xác!'}</strong><br/>
            ${q.explain}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#0284c7; text-transform:uppercase;">${q.title}</span>
            <span style="font-size:11px; font-weight:600; color:#64748b;">Câu ${b10CurrentQuestionIdx + 1} / ${B10_EXERCISES_DATA.length}</span>
          </div>
          <p style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; line-height:1.5;">${q.text}</p>
          <div>
            ${optionsHtml}
          </div>
          ${explainHtml}
        </div>
      `;

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB10Answer(optIdx) {
      if (b10UserAnswers[b10CurrentQuestionIdx] !== undefined) return;
      b10UserAnswers[b10CurrentQuestionIdx] = optIdx;
      renderB10QuizStrip();
      renderB10QuestionCard();
    }

    function resetB10QuizArena() {
      b10UserAnswers = {};
      b10CurrentQuestionIdx = 0;
      renderB10QuizStrip();
      renderB10QuestionCard();
    }

    function resetB10InteractiveState() {
      b10SimMode = 'cl2';
      selectB10SimMode('cl2');
    }





    /* ==========================================================
       LOGIC BÀI 11: LIÊN KẾT ION & TINH THỂ NACL
       ========================================================== */

    let currentPartB11 = 'part1';
    let b11InteractiveView = 'crystal'; // 'crystal' | 'circuit'
    let b11CircuitSample = 'water'; // 'sugar' | 'solid_nacl' | 'sol_nacl'

    function switchPartB11(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB11 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b11-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      // Show/hide sections in theory pane
      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b11-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
      });

      // Show/hide panels
      const panelP1 = document.getElementById('panel-b11-part1');
      const panelP3 = document.getElementById('panel-b11-part3');
      if (panelP1) panelP1.style.display = (partId === 'part1' || partId === 'part2') ? 'flex' : 'none';
      if (panelP3) panelP3.style.display = (partId === 'part3') ? 'flex' : 'none';

      const activeSec = document.getElementById('content-b11-' + partId);
      if (activeSec) activeSec.scrollTop = 0;

      if (partId === 'part1' || partId === 'part2') {
        setTimeout(initB11IonLab, 50);
      } else if (partId === 'part3') {
        setTimeout(initB11QuizArena, 50);
      }

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function setB11InteractiveView(view) {
      b11InteractiveView = view;
      document.getElementById('btn-b11-view-crystal').classList.toggle('active', view === 'crystal');
      document.getElementById('btn-b11-view-circuit').classList.toggle('active', view === 'circuit');
      updateB11Hud();
    }

    /* -------------------------------------------------------------
       LAB CANVAS: TINH THỂ NACL 3D & MẠCH THỬ ĐIỆN 2.5D (BÀI 11)
       ------------------------------------------------------------- */
    let b11IonCanvas, b11IonCtx;
    let b11RotAngleX = 0.4, b11RotAngleY = 0.6;
    let b11IsDragging = false, b11LastMouseX = 0, b11LastMouseY = 0;
    let b11AnimFrameId;

    function initB11IonLab() {
      b11IonCanvas = document.getElementById('b11IonCanvas');
      if (!b11IonCanvas) return;
      b11IonCtx = b11IonCanvas.getContext('2d');
      resizeB11IonCanvas();

      b11IonCanvas.onmousedown = (e) => {
        if (b11InteractiveView !== 'crystal') return;
        b11IsDragging = true;
        b11LastMouseX = e.clientX;
        b11LastMouseY = e.clientY;
      };

      window.onmousemove = (e) => {
        if (!b11IsDragging || b11InteractiveView !== 'crystal') return;
        const dx = e.clientX - b11LastMouseX;
        const dy = e.clientY - b11LastMouseY;
        b11RotAngleY += dx * 0.01;
        b11RotAngleX += dy * 0.01;
        b11LastMouseX = e.clientX;
        b11LastMouseY = e.clientY;
      };

      window.onmouseup = () => { b11IsDragging = false; };

      b11IonCanvas.onclick = handleB11CircuitClick;

      if (b11AnimFrameId) cancelAnimationFrame(b11AnimFrameId);
      animateB11Lab();
      updateB11Hud();
    }

    function resizeB11IonCanvas() {
      if (!b11IonCanvas) return;
      const rect = b11IonCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b11IonCanvas.width = rect.width * dpr;
      b11IonCanvas.height = rect.height * dpr;
      b11IonCtx.scale(dpr, dpr);
    }

    function handleB11CircuitClick(e) {
      if (b11InteractiveView !== 'circuit') return;
      const rect = b11IonCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = b11IonCanvas.parentElement.clientWidth;

      // 3 beaker buttons at bottom
      const bY = 60;
      const step = 140;
      const startX = w / 2 - step;

      if (Math.hypot(x - startX, y - bY) < 45) {
        b11CircuitSample = 'sugar';
      } else if (Math.hypot(x - (startX + step), y - bY) < 45) {
        b11CircuitSample = 'solid_nacl';
      } else if (Math.hypot(x - (startX + step * 2), y - bY) < 45) {
        b11CircuitSample = 'sol_nacl';
      }
      updateB11Hud();
    }

    function updateB11Hud() {
      const modeText = document.getElementById('b11-hud-mode');
      const coordText = document.getElementById('b11-hud-coord');
      const lampText = document.getElementById('b11-hud-lamp');
      const conducText = document.getElementById('b11-hud-conduc');
      const tipText = document.getElementById('b11-lab-status-tip');

      if (b11InteractiveView === 'crystal') {
        if (modeText) modeText.innerText = 'Mô hình Tinh thể NaCl 3D';
        if (coordText) coordText.innerText = '6 : 6 (Mỗi Na⁺ tiếp xúc 6 Cl⁻)';
        if (lampText) {
          lampText.innerText = 'Mạng lập phương tâm diện';
          lampText.style.color = '#0284c7';
        }
        if (conducText) conducText.innerText = 'Nhiệt độ nóng chảy: 801 °C';
        if (tipText) tipText.innerHTML = '💡 <em>Giữ chuột và kéo để xoay đa hướng tinh thể muối ăn NaCl 3D (Na⁺ màu tím nhỏ, Cl⁻ màu xanh lớn).</em>';
      } else {
        if (modeText) modeText.innerText = 'Thí nghiệm Đo Độ Dẫn Điện';
        if (coordText) coordText.innerText = 'Mạch điện nguồn 6V + Bóng đèn';

        if (b11CircuitSample === 'sugar') {
          if (lampText) { lampText.innerText = 'Đèn TẮT (Không sáng)'; lampText.style.color = '#64748b'; }
          if (conducText) conducText.innerText = '0 mS/cm (Không dẫn điện)';
          if (tipText) tipText.innerHTML = '💡 <strong>Nước đường:</strong> Phân tử liên kết cộng hoá trị không phân li ra ion tự do nên không dẫn điện.';
        } else if (b11CircuitSample === 'solid_nacl') {
          if (lampText) { lampText.innerText = 'Đèn TẮT (Không sáng)'; lampText.style.color = '#64748b'; }
          if (conducText) conducText.innerText = '0 mS/cm (Không dẫn điện)';
          if (tipText) tipText.innerHTML = '💡 <strong>NaCl rắn khan:</strong> Các ion bị giam giữ chặt tại các nút mạng tinh thể, không tự do di chuyển được.';
        } else if (b11CircuitSample === 'sol_nacl') {
          if (lampText) { lampText.innerText = 'Đèn SÁNG RỰC RỠ 💡'; lampText.style.color = '#f59e0b'; }
          if (conducText) conducText.innerText = '145 mS/cm (Dẫn điện cực mạnh)';
          if (tipText) tipText.innerHTML = '💡 <strong>Dung dịch NaCl:</strong> Nước làm tan rã mạng tinh thể, giải phóng các ion Na⁺ và Cl⁻ tự do tải điện!';
        }
      }
    }

    function animateB11Lab() {
      if (!b11IonCtx || !b11IonCanvas) return;
      const w = b11IonCanvas.parentElement.clientWidth;
      const h = b11IonCanvas.parentElement.clientHeight;
      const ctx = b11IonCtx;

      ctx.clearRect(0, 0, w, h);

      if (b11InteractiveView === 'crystal') {
        if (!b11IsDragging) {
          b11RotAngleY += 0.005;
        }
        drawB11Crystal3D(ctx, w / 2, h / 2);
      } else {
        drawB11Circuit2D(ctx, w, h);
      }

      b11AnimFrameId = requestAnimationFrame(animateB11Lab);
    }

    function drawB11Crystal3D(ctx, cX, cY) {
      // 3x3x3 grid of alternating Na+ and Cl-
      const size = 65;
      const nodes = [];

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const isNa = (Math.abs(x + y + z) % 2 === 0);
            nodes.push({ x: x * size, y: y * size, z: z * size, isNa });
          }
        }
      }

      // Rotate nodes around X and Y axes
      const cosY = Math.cos(b11RotAngleY), sinY = Math.sin(b11RotAngleY);
      const cosX = Math.cos(b11RotAngleX), sinX = Math.sin(b11RotAngleX);

      const projNodes = nodes.map(n => {
        // Rot Y
        let x1 = n.x * cosY + n.z * sinY;
        let z1 = -n.x * sinY + n.z * cosY;
        // Rot X
        let y2 = n.y * cosX - z1 * sinX;
        let z2 = n.y * sinX + z1 * cosX;

        const scale = 280 / (280 + z2);
        return {
          px: cX + x1 * scale,
          py: cY + y2 * scale,
          z: z2,
          isNa: n.isNa,
          scale: scale
        };
      });

      // Sort by depth (painter algorithm)
      projNodes.sort((a, b) => b.z - a.z);

      // Draw bounding box wireframe lines
      ctx.save();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.restore();

      // Draw spheres
      projNodes.forEach(n => {
        const r = (n.isNa ? 10 : 16) * n.scale;
        const color = n.isNa ? '#8b5cf6' : '#10b981'; // Na+ purple, Cl- emerald

        ctx.save();
        ctx.beginPath();
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(n.px - r * 0.3, n.py - r * 0.3, r * 0.1, n.px, n.py, r);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, color);
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      // Legend in bottom left
      ctx.save();
      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#8b5cf6';
      ctx.fillText('🟣 Cation Na⁺ (bán kính nhỏ)', 24, cY + 120);
      ctx.fillStyle = '#10b981';
      ctx.fillText('🟢 Anion Cl⁻ (bán kính lớn)', 24, cY + 140);
      ctx.restore();
    }

    function drawB11Circuit2D(ctx, w, h) {
      // Draw 3 Beaker selection tabs
      const step = 140;
      const startX = w / 2 - step;
      const bY = 55;

      const samples = [
        { id: 'sugar', label: '1. Nước đường', color: '#64748b' },
        { id: 'solid_nacl', label: '2. NaCl khan', color: '#64748b' },
        { id: 'sol_nacl', label: '3. Dung dịch NaCl', color: '#0284c7' }
      ];

      samples.forEach((s, idx) => {
        const sx = startX + idx * step;
        const isSel = (s.id === b11CircuitSample);

        ctx.save();
        ctx.fillStyle = isSel ? '#0284c7' : '#f1f5f9';
        ctx.strokeStyle = isSel ? '#0284c7' : '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(sx - 60, bY - 18, 120, 36, 8);
        ctx.fill();
        ctx.stroke();

        ctx.font = isSel ? '700 12px "Plus Jakarta Sans"' : '600 11px "Plus Jakarta Sans"';
        ctx.fillStyle = isSel ? '#ffffff' : '#334155';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.label, sx, bY);
        ctx.restore();
      });

      // Main Beaker apparatus
      const bW = 180, bH = 150;
      const bX = (w - bW) / 2, bCenterY = h / 2 + 50;

      // Draw Beaker
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bX, bCenterY);
      ctx.lineTo(bX, bCenterY + bH);
      ctx.lineTo(bX + bW, bCenterY + bH);
      ctx.lineTo(bX + bW, bCenterY);
      ctx.stroke();

      // Liquid / Content
      if (b11CircuitSample === 'sugar') {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(bX + 3, bCenterY + 40, bW - 6, bH - 42);
      } else if (b11CircuitSample === 'solid_nacl') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bX + 3, bCenterY + 70, bW - 6, bH - 72);
        // Salt grains
        ctx.fillStyle = '#cbd5e1';
        for (let i = 0; i < 40; i++) {
          ctx.fillRect(bX + 15 + (i * 19) % (bW - 30), bCenterY + 80 + (i * 7) % 55, 3, 3);
        }
      } else {
        ctx.fillStyle = '#dbeafe';
        ctx.fillRect(bX + 3, bCenterY + 40, bW - 6, bH - 42);
        // Floating ions
        ctx.font = '700 10px "JetBrains Mono"';
        ctx.fillStyle = '#8b5cf6';
        ctx.fillText('Na⁺', bX + 40, bCenterY + 80);
        ctx.fillText('Na⁺', bX + 120, bCenterY + 110);
        ctx.fillStyle = '#10b981';
        ctx.fillText('Cl⁻', bX + 90, bCenterY + 70);
        ctx.fillText('Cl⁻', bX + 50, bCenterY + 120);
      }

      // Electrodes (2 que than điện cực)
      ctx.fillStyle = '#334155';
      ctx.fillRect(bX + 45, bCenterY + 15, 14, bH - 30);
      ctx.fillRect(bX + bW - 59, bCenterY + 15, 14, bH - 30);

      // Light Bulb above
      const lampX = w / 2, lampY = bCenterY - 70;
      const isLighting = (b11CircuitSample === 'sol_nacl');

      if (isLighting) {
        // Glow
        const glow = ctx.createRadialGradient(lampX, lampY, 5, lampX, lampY, 45);
        glow.addColorStop(0, 'rgba(250, 204, 21, 0.9)');
        glow.addColorStop(0.5, 'rgba(250, 204, 21, 0.4)');
        glow.addColorStop(1, 'rgba(250, 204, 21, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(lampX, lampY, 45, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bulb circle
      ctx.beginPath();
      ctx.arc(lampX, lampY, 18, 0, Math.PI * 2);
      ctx.fillStyle = isLighting ? '#fde047' : '#f1f5f9';
      ctx.strokeStyle = isLighting ? '#eab308' : '#94a3b8';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Wires
      ctx.strokeStyle = isLighting ? '#eab308' : '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bX + 52, bCenterY + 15);
      ctx.lineTo(bX + 52, lampY);
      ctx.lineTo(lampX - 18, lampY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(lampX + 18, lampY);
      ctx.lineTo(bX + bW - 52, lampY);
      ctx.lineTo(bX + bW - 52, bCenterY + 15);
      ctx.stroke();

      ctx.restore();
    }

    /* -------------------------------------------------------------
       LAB 3: ĐẤU TRƯỜNG LUYỆN TẬP SGK TRANG 52 - 54 (BÀI 11)
       ------------------------------------------------------------- */
    const B11_EXERCISES_DATA = [
      {
        id: 1,
        title: "Câu hỏi 3 (SGK Trang 51): Tại sao một O²⁻ kết hợp với 2 Li⁺?",
        text: "Giải thích vì sao một ion oxide (O²⁻) kết hợp được với hai ion lithium (Li⁺) để tạo phân tử Li₂O:",
        options: [
          "A. O²⁻ có điện tích 2-, mỗi Li⁺ có điện tích 1+ ➔ Cần 2 ion Li⁺ để trung hoà về điện tích",
          "B. O²⁻ và Li⁺ có cùng kích thước hạt nhân",
          "C. Li nhường 2 electron cho 1 nguyên tử O",
          "D. Tạo liên kết cộng hoá trị phân cực giữa Li và O"
        ],
        correct: 0, // A
        explain: "Chính xác! Theo định luật bảo toàn điện tích, tinh thể hợp chất ion phải trung hoà về điện: Tổng điện tích dương = Tổng điện tích âm. 1 ion O²⁻ mang 2 đơn vị điện tích âm cần 2 ion Li⁺ (mỗi ion mang 1+) để tạo phân tử trung hoà Li₂O."
      },
      {
        id: 2,
        title: "Câu hỏi 6a (SGK Trang 54): Vì sao muối ăn có nhiệt độ nóng chảy cao (801 °C)?",
        text: "Tại sao muối ăn (NaCl) ở điều kiện thường là chất rắn và có nhiệt độ nóng chảy rất cao (801 °C)?",
        options: [
          "A. Do tinh thể NaCl có khối lượng riêng rất lớn",
          "B. Do lực hút tĩnh điện giữa các ion Na⁺ và Cl⁻ trong mạng tinh thể vô cùng lớn và bền chặt",
          "C. Do các liên kết cộng hoá trị kim cương liên kết giữa các nguyên tử",
          "D. Do sự có mặt của liên kết hydrogen giữa các ion"
        ],
        correct: 1, // B
        explain: "Chính xác! Trong mạng tinh thể NaCl, mỗi ion Na⁺ được bao quanh bởi 6 ion Cl⁻ gần nhất và ngược lại. Lực hút tĩnh điện giữa các ion trái dấu cực kì mạnh mẽ và đan xen chặt chẽ khắp mạng lưới không gian 3 chiều, đòi hỏi cung cấp nhiệt lượng rất lớn (801 °C) mới có thể phá vỡ cấu trúc tinh thể."
      },
      {
        id: 3,
        title: "Câu hỏi 6b (SGK Trang 54): Điều kiện để hợp chất ion dẫn điện",
        text: "Hợp chất ion có thể dẫn điện trong trường hợp nào dưới đây?",
        options: [
          "A. Khi ở trạng thái tinh thể rắn khan",
          "B. Khi bị đập vỡ thành hạt mịn nhỏ",
          "C. Khi nóng chảy hoặc khi hoà tan vào trong nước",
          "D. Không bao giờ dẫn điện trong mọi điều kiện"
        ],
        correct: 2, // C
        explain: "Chính xác! Điều kiện để một chất dẫn điện là phải có các hạt mang điện tự do. Ở trạng thái rắn, các ion bị khoá cứng tại các mắt xích mạng tinh thể. Chỉ khi nóng chảy hoặc hoà tan vào nước, lực tương tác mạng bị phá vỡ, các ion Na⁺ và Cl⁻ mới có thể chuyển động tự do để tải dòng điện."
      }
    ];

    let b11CurrentQuestionIdx = 0;
    let b11UserAnswers = {};

    function initB11QuizArena() {
      b11CurrentQuestionIdx = 0;
      b11UserAnswers = {};
      renderB11QuizStrip();
      renderB11QuestionCard();
    }

    function renderB11QuizStrip() {
      const strip = document.getElementById('b11-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B11_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b11-q-strip-btn-' + idx;
        btn.className = 'btn-tool';
        btn.style.minWidth = '42px';
        btn.style.height = '36px';
        btn.style.fontWeight = '700';

        const isAnswered = (b11UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b11CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
        } else if (isAnswered) {
          const isCorrect = (b11UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
          btn.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
          btn.style.color = isCorrect ? '#15803d' : '#b91c1c';
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color = '#64748b';
        }

        btn.innerText = `Câu ${idx + 1}`;
        btn.onclick = () => {
          b11CurrentQuestionIdx = idx;
          renderB11QuizStrip();
          renderB11QuestionCard();
        };
        strip.appendChild(btn);
      });

      const prog = document.getElementById('b11-quiz-progress-text');
      const answeredCount = Object.keys(b11UserAnswers).length;
      if (prog) prog.innerText = `Đã hoàn thành: ${answeredCount} / ${B11_EXERCISES_DATA.length} câu`;

      const scoreBoard = document.getElementById('b11-quiz-score-board');
      if (scoreBoard) {
        scoreBoard.style.display = (answeredCount === B11_EXERCISES_DATA.length) ? 'block' : 'none';
      }
    }

    function renderB11QuestionCard() {
      const container = document.getElementById('b11-question-card-container');
      if (!container) return;

      const q = B11_EXERCISES_DATA[b11CurrentQuestionIdx];
      const userSelected = b11UserAnswers[b11CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        if (isAnswered) {
          if (optIdx === q.correct) {
            optStyle += 'background:#dcfce7; border-color:#16a34a; color:#15803d; font-weight:700;';
          } else if (optIdx === userSelected) {
            optStyle += 'background:#fee2e2; border-color:#dc2626; color:#b91c1c; font-weight:700;';
          } else {
            optStyle += 'opacity:0.6;';
          }
        }

        optionsHtml += `
          <button style="${optStyle}" onclick="selectB11Answer(${optIdx})" ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
            ${isAnswered && optIdx === q.correct ? '<span style="color:#16a34a; font-weight:800;">✓</span>' : ''}
            ${isAnswered && optIdx === userSelected && userSelected !== q.correct ? '<span style="color:#dc2626; font-weight:800;">✗</span>' : ''}
          </button>
        `;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; font-size:13px; color:${isCorrect ? '#166534' : '#991b1b'}; line-height:1.5;">
            <strong>${isCorrect ? '✓ Câu trả lời chính xác!' : '✗ Câu trả lời chưa chính xác!'}</strong><br/>
            ${q.explain}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#0284c7; text-transform:uppercase;">${q.title}</span>
            <span style="font-size:11px; font-weight:600; color:#64748b;">Câu ${b11CurrentQuestionIdx + 1} / ${B11_EXERCISES_DATA.length}</span>
          </div>
          <p style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; line-height:1.5;">${q.text}</p>
          <div>
            ${optionsHtml}
          </div>
          ${explainHtml}
        </div>
      `;

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB11Answer(optIdx) {
      if (b11UserAnswers[b11CurrentQuestionIdx] !== undefined) return;
      b11UserAnswers[b11CurrentQuestionIdx] = optIdx;
      renderB11QuizStrip();
      renderB11QuestionCard();
    }

    function resetB11QuizArena() {
      b11UserAnswers = {};
      b11CurrentQuestionIdx = 0;
      renderB11QuizStrip();
      renderB11QuestionCard();
    }

    function resetB11InteractiveState() {
      b11RotAngleX = 0.4;
      b11RotAngleY = 0.6;
      b11CircuitSample = 'sol_nacl';
      updateB11Hud();
    }





    /* ==========================================================
       LOGIC BÀI 12: LIÊN KẾT CỘNG HOÁ TRỊ, XEN PHỦ AO & EB
       ========================================================== */

    let currentPartB12 = 'part1';
    let b12CurMol = 'c2h4'; // 'hcl' | 'cl2' | 'c2h4' | 'n2'

    const B12_MOLECULES_DATA = {
      'hcl': {
        title: 'Hydrogen Chloride (HCl)',
        bonds: '1 liên kết σ (xen phủ s - p)',
        deltachi: 'Δχ = 3.16 - 2.20 = 0.96 (0.4 ≤ Δχ < 1.7)',
        type: 'CHT Phân cực (cặp e lệch về phía Cl)',
        typeColor: '#d97706',
        desc: 'Xen phủ trục giữa orbital tròn 1s của H và một thuỳ orbital 3p của Cl tạo liên kết đơn σ bền vững.'
      },
      'cl2': {
        title: 'Chlorine (Cl₂)',
        bonds: '1 liên kết σ (xen phủ p - p trục)',
        deltachi: 'Δχ = 3.16 - 3.16 = 0.00 (Không phân cực)',
        type: 'CHT Không phân cực (cặp e nằm chính giữa)',
        typeColor: '#16a34a',
        desc: 'Xen phủ trục giữa 2 orbital 3p của 2 nguyên tử Cl dọc theo đường nối tâm hạt nhân.'
      },
      'c2h4': {
        title: 'Ethene (C₂H₄)',
        bonds: '5 liên kết σ (4 C-H + 1 C-C) + 1 liên kết π (C=C)',
        deltachi: 'Δχ(C-H) = 0.35; Δχ(C-C) = 0.00',
        type: 'Liên kết đôi C=C (1σ + 1π)',
        typeColor: '#2563eb',
        desc: 'Hai nguyên tử Carbon xen phủ trục tạo 1 liên kết σ ở giữa và 2 orbital 2p thẳng đứng xen phủ bên tạo 1 liên kết π ở hai phía.'
      },
      'n2': {
        title: 'Nitrogen (N₂)',
        bonds: '1 liên kết σ + 2 liên kết π (Liên kết ba N≡N)',
        deltachi: 'Δχ = 3.04 - 3.04 = 0.00',
        type: 'Liên kết ba cực bền (Eb = 945 kJ/mol)',
        typeColor: '#dc2626',
        desc: 'Gồm 1 liên kết σ dọc trục và 2 liên kết π vuông góc nhau (xen phủ py-py và pz-pz) tạo lớp vỏ bọc e siêu bền.'
      }
    };

    function switchPartB12(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB12 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b12-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      // Show/hide sections in theory pane
      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b12-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
      });

      // Show/hide panels
      const panelP1 = document.getElementById('panel-b12-part1');
      const panelP3 = document.getElementById('panel-b12-part3');
      if (panelP1) panelP1.style.display = (partId === 'part1' || partId === 'part2') ? 'flex' : 'none';
      if (panelP3) panelP3.style.display = (partId === 'part3') ? 'flex' : 'none';

      const activeSec = document.getElementById('content-b12-' + partId);
      if (activeSec) activeSec.scrollTop = 0;

      if (partId === 'part1' || partId === 'part2') {
        setTimeout(initB12AOLab, 50);
      } else if (partId === 'part3') {
        setTimeout(initB12QuizArena, 50);
      }

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB12Molecule(mol) {
      b12CurMol = mol;
      ['hcl', 'cl2', 'c2h4', 'n2'].forEach(m => {
        const btn = document.getElementById('btn-b12-mol-' + m);
        if (btn) btn.classList.toggle('active', m === mol);
      });
      updateB12Hud();
    }

    function updateB12Hud() {
      const d = B12_MOLECULES_DATA[b12CurMol];
      const molText = document.getElementById('b12-hud-mol');
      if (molText) molText.innerText = d.title;

      const bondText = document.getElementById('b12-hud-bonds');
      if (bondText) bondText.innerText = d.bonds;

      const deltaText = document.getElementById('b12-hud-deltachi');
      if (deltaText) deltaText.innerText = d.deltachi;

      const typeText = document.getElementById('b12-hud-type');
      if (typeText) {
        typeText.innerText = d.type;
        typeText.style.color = d.typeColor;
      }

      const tipText = document.getElementById('b12-lab-status-tip');
      if (tipText) tipText.innerHTML = `💡 <strong>${d.title}:</strong> ${d.desc}`;
    }

    /* -------------------------------------------------------------
       LAB CANVAS: MÔ PHỎNG XEN PHỦ AO 2.5D (BÀI 12)
       ------------------------------------------------------------- */
    let b12AOCanvas, b12AOCtx;
    let b12AOAnimProgress = 0;
    let b12AOAnimId;

    function initB12AOLab() {
      b12AOCanvas = document.getElementById('b12AOCanvas');
      if (!b12AOCanvas) return;
      b12AOCtx = b12AOCanvas.getContext('2d');
      resizeB12AOCanvas();

      if (b12AOAnimId) cancelAnimationFrame(b12AOAnimId);
      animateB12AO();
      updateB12Hud();
    }

    function resizeB12AOCanvas() {
      if (!b12AOCanvas) return;
      const rect = b12AOCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b12AOCanvas.width = rect.width * dpr;
      b12AOCanvas.height = rect.height * dpr;
      b12AOCtx.scale(dpr, dpr);
    }

    function animateB12AO() {
      if (!b12AOCtx || !b12AOCanvas) return;
      const w = b12AOCanvas.parentElement.clientWidth;
      const h = b12AOCanvas.parentElement.clientHeight;
      const ctx = b12AOCtx;

      ctx.clearRect(0, 0, w, h);
      b12AOAnimProgress += 0.02;

      const cX = w / 2, cY = h / 2 - 10;

      if (b12CurMol === 'hcl') {
        drawB12HClOverlap(ctx, cX, cY);
      } else if (b12CurMol === 'cl2') {
        drawB12Cl2Overlap(ctx, cX, cY);
      } else if (b12CurMol === 'c2h4') {
        drawB12C2H4Overlap(ctx, cX, cY);
      } else if (b12CurMol === 'n2') {
        drawB12N2Overlap(ctx, cX, cY);
      }

      b12AOAnimId = requestAnimationFrame(animateB12AO);
    }

    function drawB12HClOverlap(ctx, cX, cY) {
      // 1s orbital of H (Sphere) on left
      const hX = cX - 70;
      ctx.save();
      ctx.beginPath();
      ctx.arc(hX, cY, 32, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '700 13px "Plus Jakarta Sans"';
      ctx.fillStyle = '#0369a1';
      ctx.textAlign = 'center';
      ctx.fillText('1s (H)', hX, cY + 4);

      // 3p orbital of Cl (Dumbbell shape) on right
      const clX = cX + 60;
      // Left lobe (overlapping)
      ctx.beginPath();
      ctx.ellipse(clX - 40, cY, 40, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.stroke();

      // Right lobe
      ctx.beginPath();
      ctx.ellipse(clX + 40, cY, 40, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.stroke();

      ctx.fillStyle = '#065f46';
      ctx.fillText('3p (Cl)', clX, cY + 4);

      // Highlight overlap zone on axis
      ctx.beginPath();
      ctx.ellipse(cX - 20, cY, 20, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.fill();

      // Overlap label
      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#d97706';
      ctx.fillText('Vùng xen phủ trục s - p (Liên kết σ)', cX, cY + 70);
      ctx.restore();
    }

    function drawB12Cl2Overlap(ctx, cX, cY) {
      // 2 dumbbell orbitals overlapping head-on (p - p trục)
      const leftX = cX - 70, rightX = cX + 70;

      ctx.save();
      // Left Cl p-orbital
      ctx.beginPath();
      ctx.ellipse(leftX - 35, cY, 35, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(leftX + 35, cY, 38, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.stroke();

      // Right Cl p-orbital
      ctx.beginPath();
      ctx.ellipse(rightX - 35, cY, 38, 24, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(rightX + 35, cY, 35, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.stroke();

      // Center overlap
      ctx.beginPath();
      ctx.ellipse(cX, cY, 25, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.65)';
      ctx.fill();

      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#065f46';
      ctx.textAlign = 'center';
      ctx.fillText('Cl (trái)', leftX - 45, cY + 4);
      ctx.fillText('Cl (phải)', rightX + 45, cY + 4);

      ctx.fillStyle = '#d97706';
      ctx.fillText('Xen phủ trục p - p (Liên kết σ)', cX, cY + 70);
      ctx.restore();
    }

    function drawB12C2H4Overlap(ctx, cX, cY) {
      // Ethene C=C: 1 sigma bond on axis, 1 pi bond side-by-side
      const c1X = cX - 65, c2X = cX + 65;

      ctx.save();
      // Axis line (Sigma)
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(c1X, cY);
      ctx.lineTo(c2X, cY);
      ctx.stroke();

      // Vertical 2p orbitals (Pi overlap above and below)
      // C1 pz
      ctx.fillStyle = 'rgba(249, 115, 22, 0.4)';
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(c1X, cY - 45, 18, 40, 0, 0, Math.PI * 2);
      ctx.ellipse(c1X, cY + 45, 18, 40, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // C2 pz
      ctx.beginPath();
      ctx.ellipse(c2X, cY - 45, 18, 40, 0, 0, Math.PI * 2);
      ctx.ellipse(c2X, cY + 45, 18, 40, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pi cloud overlap bands (top & bottom)
      const wave = Math.sin(b12AOAnimProgress * 2) * 2;
      ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.beginPath();
      ctx.ellipse(cX, cY - 55 + wave, 55, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cX, cY + 55 - wave, 55, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Carbon nucleus
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(c1X, cY, 8, 0, Math.PI * 2);
      ctx.arc(c2X, cY, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '800 13px "Plus Jakarta Sans"';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('C', c1X, cY);
      ctx.fillText('C', c2X, cY);

      // Labels
      ctx.font = '700 11px "Plus Jakarta Sans"';
      ctx.fillStyle = '#2563eb';
      ctx.fillText('Liên kết σ (trục)', cX, cY + 16);

      ctx.fillStyle = '#dc2626';
      ctx.fillText('Đám mây liên kết π (trên & dưới)', cX, cY - 85);
      ctx.fillText('Tổng: 5 liên kết σ (4 C-H + 1 C-C) và 1 liên kết π', cX, cY + 110);
      ctx.restore();
    }

    function drawB12N2Overlap(ctx, cX, cY) {
      // Nitrogen N2 triple bond: 1 sigma + 2 pi
      const n1X = cX - 60, n2X = cX + 60;

      ctx.save();
      // Sigma bond in center
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(n1X, cY);
      ctx.lineTo(n2X, cY);
      ctx.stroke();

      // Pi_y (vertical) and Pi_z (slanted)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.beginPath();
      ctx.ellipse(cX, cY - 48, 50, 16, 0, 0, Math.PI * 2);
      ctx.ellipse(cX, cY + 48, 50, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.beginPath();
      ctx.ellipse(cX, cY, 48, 16, Math.PI * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Nuclei
      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath();
      ctx.arc(n1X, cY, 14, 0, Math.PI * 2);
      ctx.arc(n2X, cY, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '800 13px "Plus Jakarta Sans"';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', n1X, cY);
      ctx.fillText('N', n2X, cY);

      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#dc2626';
      ctx.fillText('Liên kết ba N ≡ N (1σ + 2π)', cX, cY - 75);

      ctx.font = '600 11px "JetBrains Mono"';
      ctx.fillStyle = '#64748b';
      ctx.fillText('Năng lượng liên kết Eb = 945 kJ/mol (Cực bền)', cX, cY + 80);
      ctx.restore();
    }

    /* -------------------------------------------------------------
       LAB 3: ĐẤU TRƯỜNG LUYỆN TẬP SGK TRANG 61 - 63 (BÀI 12)
       ------------------------------------------------------------- */
    const B12_EXERCISES_DATA = [
      {
        id: 1,
        title: "Câu hỏi 4 (SGK Trang 61): Số liên kết σ và π trong phân tử C₂H₄",
        text: "Số liên kết σ và liên kết π có trong phân tử Ethene (C₂H₄) lần lượt là:",
        options: [
          "A. 4 và 1",
          "B. 5 và 1",
          "C. 3 và 2",
          "D. 5 và 2"
        ],
        correct: 1, // B
        explain: "Chính xác! Công thức cấu tạo của C₂H₄ là CH₂=CH₂. Gồm 4 liên kết đơn C-H (mỗi liên kết đơn là 1σ) + 1 liên kết đôi C=C (gồm 1σ và 1π) ➔ Tổng cộng có 5 liên kết σ và 1 liên kết π."
      },
      {
        id: 2,
        title: "Câu hỏi 6 (SGK Trang 63): So sánh độ bền liên kết halogen dựa vào Eb",
        text: "Dựa vào giá trị năng lượng liên kết Eb: Cl-Cl (243 kJ/mol), Br-Br (193 kJ/mol), I-I (151 kJ/mol), thứ tự giảm dần độ bền liên kết giữa các phân tử là:",
        options: [
          "A. I₂ > Br₂ > Cl₂",
          "B. Br₂ > Cl₂ > I₂",
          "C. Cl₂ > Br₂ > I₂",
          "D. Cl₂ > I₂ > Br₂"
        ],
        correct: 2, // C
        explain: "Chính xác! Năng lượng liên kết Eb càng lớn thì liên kết càng bền và phân tử càng khó bị nhiệt phân huỷ: Eb(Cl-Cl) = 243 > Eb(Br-Br) = 193 > Eb(I-I) = 151 kJ/mol ➔ Thứ tự độ bền giảm dần: Cl₂ > Br₂ > I₂."
      },
      {
        id: 3,
        title: "Vận dụng: Phân loại liên kết theo hiệu độ âm điện Δχ",
        text: "Cho độ âm điện: Na (0.93), H (2.20), C (2.55), Cl (3.16). Phân tử nào dưới đây có liên kết cộng hoá trị phân cực?",
        options: [
          "A. NaCl (Δχ = 2.23)",
          "B. CH₄ (Δχ = 0.35)",
          "C. HCl (Δχ = 0.96)",
          "D. Cl₂ (Δχ = 0.00)"
        ],
        correct: 2, // C
        explain: "Chính xác! Theo thang đo Pauling: 0.4 ≤ Δχ < 1.7 là liên kết cộng hoá trị phân cực. Ở HCl có Δχ = 3.16 - 2.20 = 0.96 (nằm trong khoảng 0.4 đến 1.7) ➔ CHT phân cực, cặp e lệch về Cl. NaCl (Δχ = 2.23 ≥ 1.7) là liên kết ion; CH₄ và Cl₂ là CHT không phân cực."
      }
    ];

    let b12CurrentQuestionIdx = 0;
    let b12UserAnswers = {};

    function initB12QuizArena() {
      b12CurrentQuestionIdx = 0;
      b12UserAnswers = {};
      renderB12QuizStrip();
      renderB12QuestionCard();
    }

    function renderB12QuizStrip() {
      const strip = document.getElementById('b12-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B12_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b12-q-strip-btn-' + idx;
        btn.className = 'btn-tool';
        btn.style.minWidth = '42px';
        btn.style.height = '36px';
        btn.style.fontWeight = '700';

        const isAnswered = (b12UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b12CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
        } else if (isAnswered) {
          const isCorrect = (b12UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
          btn.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
          btn.style.color = isCorrect ? '#15803d' : '#b91c1c';
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color = '#64748b';
        }

        btn.innerText = `Câu ${idx + 1}`;
        btn.onclick = () => {
          b12CurrentQuestionIdx = idx;
          renderB12QuizStrip();
          renderB12QuestionCard();
        };
        strip.appendChild(btn);
      });

      const prog = document.getElementById('b12-quiz-progress-text');
      const answeredCount = Object.keys(b12UserAnswers).length;
      if (prog) prog.innerText = `Đã hoàn thành: ${answeredCount} / ${B12_EXERCISES_DATA.length} câu`;

      const scoreBoard = document.getElementById('b12-quiz-score-board');
      if (scoreBoard) {
        scoreBoard.style.display = (answeredCount === B12_EXERCISES_DATA.length) ? 'block' : 'none';
      }
    }

    function renderB12QuestionCard() {
      const container = document.getElementById('b12-question-card-container');
      if (!container) return;

      const q = B12_EXERCISES_DATA[b12CurrentQuestionIdx];
      const userSelected = b12UserAnswers[b12CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        if (isAnswered) {
          if (optIdx === q.correct) {
            optStyle += 'background:#dcfce7; border-color:#16a34a; color:#15803d; font-weight:700;';
          } else if (optIdx === userSelected) {
            optStyle += 'background:#fee2e2; border-color:#dc2626; color:#b91c1c; font-weight:700;';
          } else {
            optStyle += 'opacity:0.6;';
          }
        }

        optionsHtml += `
          <button style="${optStyle}" onclick="selectB12Answer(${optIdx})" ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
            ${isAnswered && optIdx === q.correct ? '<span style="color:#16a34a; font-weight:800;">✓</span>' : ''}
            ${isAnswered && optIdx === userSelected && userSelected !== q.correct ? '<span style="color:#dc2626; font-weight:800;">✗</span>' : ''}
          </button>
        `;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; font-size:13px; color:${isCorrect ? '#166534' : '#991b1b'}; line-height:1.5;">
            <strong>${isCorrect ? '✓ Câu trả lời chính xác!' : '✗ Câu trả lời chưa chính xác!'}</strong><br/>
            ${q.explain}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#0284c7; text-transform:uppercase;">${q.title}</span>
            <span style="font-size:11px; font-weight:600; color:#64748b;">Câu ${b12CurrentQuestionIdx + 1} / ${B12_EXERCISES_DATA.length}</span>
          </div>
          <p style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; line-height:1.5;">${q.text}</p>
          <div>
            ${optionsHtml}
          </div>
          ${explainHtml}
        </div>
      `;

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB12Answer(optIdx) {
      if (b12UserAnswers[b12CurrentQuestionIdx] !== undefined) return;
      b12UserAnswers[b12CurrentQuestionIdx] = optIdx;
      renderB12QuizStrip();
      renderB12QuestionCard();
    }

    function resetB12QuizArena() {
      b12UserAnswers = {};
      b12CurrentQuestionIdx = 0;
      renderB12QuizStrip();
      renderB12QuestionCard();
    }

    function resetB12InteractiveState() {
      b12CurMol = 'c2h4';
      selectB12Molecule('c2h4');
    }





    /* ==========================================================
       LOGIC BÀI 13: LIÊN KẾT HYDROGEN & TƯƠNG TÁC VAN DER WAALS
       ========================================================== */

    let currentPartB13 = 'part1';
    let b13SimMode = 'water'; // 'water' | 'hf' | 'vdw' | 'pentane'

    const B13_MODELS_DATA = {
      'water': {
        title: 'Mạng lưới Liên kết Hydrogen: Nước (H₂O)',
        dipole: 'O(δ⁻ = -0.66) • H(δ⁺ = +0.33)',
        type: 'Liên kết Hydrogen liên phân tử (O-H ··· O)',
        typeColor: '#2563eb',
        boil: '100 °C (Bất thường so với H₂S: -60.7 °C)',
        tip: 'Mỗi phân tử H₂O tạo tối đa 4 liên kết hydrogen tứ diện, tạo nên sức căng bề mặt lớn và cấu trúc rỗng của băng tuyết.'
      },
      'hf': {
        title: 'Liên kết Hydrogen dị loại: HF ··· NH₃',
        dipole: 'F(δ⁻ = -0.45) • H(δ⁺ = +0.45) • N(δ⁻ = -0.80)',
        type: 'Liên kết Hydrogen giữa 2 chất khác nhau (F-H ··· N)',
        typeColor: '#16a34a',
        boil: 'HF sôi ở 19.5 °C (khí dễ hoá lỏng)',
        tip: 'Nguyên tử H linh động của HF bị hút mạnh bởi cặp electron tự do của nguyên tử Nitrogen trong phân tử Ammonia.'
      },
      'vdw': {
        title: 'Tương tác Van der Waals: Lưỡng cực tạm thời (Cl₂ / Ar)',
        dipole: 'Lưỡng cực tức thời: δ⁺ ··· δ⁻',
        type: 'Lực hút tĩnh điện yếu giữa các lưỡng cực cảm ứng',
        typeColor: '#d97706',
        boil: 'Cl₂: -34.6 °C; Br₂: 58.8 °C; I₂: 184.4 °C',
        tip: 'Sự dao động mây electron sinh ra các cực tức thời hút nhau, tăng nhanh theo khối lượng phân tử M và số e.'
      },
      'pentane': {
        title: 'Diện tích tiếp xúc: Pentane vs Neopentane (C₅H₁₂)',
        dipole: 'Cùng CTPT C₅H₁₂ (M = 72 g/mol)',
        type: 'Van der Waals phụ thuộc hình dạng phân tử',
        typeColor: '#dc2626',
        boil: 'Pentane (36.1 °C) > Neopentane (9.5 °C)',
        tip: 'Pentane mạch thẳng dài tiếp xúc diện rộng hút chặt hơn neopentane hình cầu tiếp xúc điểm nhỏ.'
      }
    };

    function switchPartB13(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB13 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b13-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      // Show/hide sections in theory pane
      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b13-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
      });

      // Show/hide panels
      const panelP1 = document.getElementById('panel-b13-part1');
      const panelP3 = document.getElementById('panel-b13-part3');
      if (panelP1) panelP1.style.display = (partId === 'part1' || partId === 'part2') ? 'flex' : 'none';
      if (panelP3) panelP3.style.display = (partId === 'part3') ? 'flex' : 'none';

      const activeSec = document.getElementById('content-b13-' + partId);
      if (activeSec) activeSec.scrollTop = 0;

      if (partId === 'part1' || partId === 'part2') {
        setTimeout(initB13InterLab, 50);
      } else if (partId === 'part3') {
        setTimeout(initB13QuizArena, 50);
      }

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB13SimMode(mode) {
      b13SimMode = mode;
      ['water', 'hf', 'vdw', 'pentane'].forEach(m => {
        const btn = document.getElementById('btn-b13-sim-' + m);
        if (btn) btn.classList.toggle('active', m === mode);
      });
      updateB13Hud();
    }

    function updateB13Hud() {
      const d = B13_MODELS_DATA[b13SimMode];
      const modeText = document.getElementById('b13-hud-mode');
      if (modeText) modeText.innerText = d.title;

      const dipText = document.getElementById('b13-hud-dipole');
      if (dipText) dipText.innerText = d.dipole;

      const typeText = document.getElementById('b13-hud-type');
      if (typeText) {
        typeText.innerText = d.type;
        typeText.style.color = d.typeColor;
      }

      const boilText = document.getElementById('b13-hud-boil');
      if (boilText) boilText.innerText = d.boil;

      const tipText = document.getElementById('b13-lab-status-tip');
      if (tipText) tipText.innerHTML = `💡 <strong>${d.title}:</strong> ${d.tip}`;
    }

    /* -------------------------------------------------------------
       LAB CANVAS: MÔ PHỎNG LIÊN KẾT H & VAN DER WAALS 2.5D (BÀI 13)
       ------------------------------------------------------------- */
    let b13InterCanvas, b13InterCtx;
    let b13AnimTime = 0;
    let b13AnimId;

    function initB13InterLab() {
      b13InterCanvas = document.getElementById('b13InterCanvas');
      if (!b13InterCanvas) return;
      b13InterCtx = b13InterCanvas.getContext('2d');
      resizeB13InterCanvas();

      if (b13AnimId) cancelAnimationFrame(b13AnimId);
      animateB13Inter();
      updateB13Hud();
    }

    function resizeB13InterCanvas() {
      if (!b13InterCanvas) return;
      const rect = b13InterCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      b13InterCanvas.width = rect.width * dpr;
      b13InterCanvas.height = rect.height * dpr;
      b13InterCtx.scale(dpr, dpr);
    }

    function animateB13Inter() {
      if (!b13InterCtx || !b13InterCanvas) return;
      const w = b13InterCanvas.parentElement.clientWidth;
      const h = b13InterCanvas.parentElement.clientHeight;
      const ctx = b13InterCtx;

      ctx.clearRect(0, 0, w, h);
      b13AnimTime += 0.025;

      const cX = w / 2, cY = h / 2 - 10;

      if (b13SimMode === 'water') {
        drawB13WaterNetwork(ctx, cX, cY);
      } else if (b13SimMode === 'hf') {
        drawB13HFNH3(ctx, cX, cY);
      } else if (b13SimMode === 'vdw') {
        drawB13VDWInteraction(ctx, cX, cY);
      } else if (b13SimMode === 'pentane') {
        drawB13PentaneComparison(ctx, cX, cY);
      }

      b13AnimId = requestAnimationFrame(animateB13Inter);
    }

    function drawB13WaterNetwork(ctx, cX, cY) {
      // 3 Water molecules linked by dotted lines
      const m1 = { x: cX - 100, y: cY - 20 };
      const m2 = { x: cX + 40, y: cY - 40 };
      const m3 = { x: cX - 20, y: cY + 80 };

      // Draw H-bond lines between Oxygen and Hydrogen
      ctx.save();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);

      // m1(H) to m2(O)
      ctx.beginPath();
      ctx.moveTo(m1.x + 30, m1.y + 10);
      ctx.lineTo(m2.x - 25, m2.y);
      ctx.stroke();

      // m1(O) to m3(H)
      ctx.beginPath();
      ctx.moveTo(m1.x, m1.y + 20);
      ctx.lineTo(m3.x - 20, m3.y - 15);
      ctx.stroke();

      // m2(H) to m3(O)
      ctx.beginPath();
      ctx.moveTo(m2.x - 10, m2.y + 25);
      ctx.lineTo(m3.x + 10, m3.y - 10);
      ctx.stroke();
      ctx.restore();

      // Draw molecules
      drawWaterMol(ctx, m1.x, m1.y, 0.2);
      drawWaterMol(ctx, m2.x, m2.y, -0.4);
      drawWaterMol(ctx, m3.x, m3.y, 0.8);

      // Label
      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#0284c7';
      ctx.textAlign = 'center';
      ctx.fillText('Đường chấm xanh: Liên kết Hydrogen liên phân tử (···)', cX, cY + 130);
    }

    function drawWaterMol(ctx, x, y, rot) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);

      // Oxygen
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '800 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Oᵟ⁻', 0, 0);

      // 2 Hydrogens
      const hDist = 32;
      const h1 = { x: -Math.cos(0.55) * hDist, y: Math.sin(0.55) * hDist };
      const h2 = { x: Math.cos(0.55) * hDist, y: Math.sin(0.55) * hDist };

      // Bonds
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(h1.x, h1.y);
      ctx.moveTo(0, 0);
      ctx.lineTo(h2.x, h2.y);
      ctx.stroke();

      // H circles
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(h1.x, h1.y, 11, 0, Math.PI * 2);
      ctx.arc(h2.x, h2.y, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = '700 9px "Plus Jakarta Sans"';
      ctx.fillText('Hᵟ⁺', h1.x, h1.y);
      ctx.fillText('Hᵟ⁺', h2.x, h2.y);
      ctx.restore();
    }

    function drawB13HFNH3(ctx, cX, cY) {
      const hfX = cX - 110, nh3X = cX + 90;

      // HF on left
      ctx.save();
      // F atom
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(hfX - 25, cY, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 13px "Plus Jakarta Sans"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Fᵟ⁻', hfX - 25, cY);

      // Covalent bond
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(hfX - 25, cY);
      ctx.lineTo(hfX + 25, cY);
      ctx.stroke();

      // H atom
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(hfX + 25, cY, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.font = '700 9px "Plus Jakarta Sans"';
      ctx.fillText('Hᵟ⁺', hfX + 25, cY);

      // NH3 on right (N at center)
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(nh3X, cY, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 13px "Plus Jakarta Sans"';
      ctx.fillText('Nᵟ⁻', nh3X, cY);

      // 3 H of NH3
      const nhAngles = [-0.6, 0.4, 1.4];
      nhAngles.forEach(ang => {
        const hx = nh3X + Math.cos(ang) * 36;
        const hy = cY + Math.sin(ang) * 36;
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(nh3X, cY);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(hx, hy, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      // Hydrogen Bond: F-H ··· N
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(hfX + 38, cY);
      ctx.lineTo(nh3X - 24, cY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = '700 13px "Plus Jakarta Sans"';
      ctx.fillStyle = '#16a34a';
      ctx.textAlign = 'center';
      ctx.fillText('F — H ··· N  (Liên kết Hydrogen rất mạnh)', cX, cY - 50);
      ctx.restore();
    }

    function drawB13VDWInteraction(ctx, cX, cY) {
      const p1X = cX - 100, p2X = cX + 100;

      // Oscillating temporary dipoles
      const osc = Math.sin(b13AnimTime * 3);
      const shift = osc * 8;

      ctx.save();
      // Particle 1 (Cl2 / Ar)
      ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(p1X + shift, cY, 65, 45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 11px "JetBrains Mono"';
      ctx.fillStyle = '#ea580c';
      ctx.textAlign = 'center';
      ctx.fillText('δ⁺', p1X - 35 + shift, cY);
      ctx.fillText('δ⁻', p1X + 35 + shift, cY);
      ctx.font = '600 10px "Plus Jakarta Sans"';
      ctx.fillText('Lưỡng cực tạm thời 1', p1X, cY + 65);

      // Particle 2 (Induced dipole)
      ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(p2X + shift * 0.9, cY, 65, 45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 11px "JetBrains Mono"';
      ctx.fillStyle = '#ea580c';
      ctx.fillText('δ⁺', p2X - 35 + shift * 0.9, cY);
      ctx.fillText('δ⁻', p2X + 35 + shift * 0.9, cY);
      ctx.font = '600 10px "Plus Jakarta Sans"';
      ctx.fillText('Lưỡng cực cảm ứng 2', p2X, cY + 65);

      // Weak attraction arrows
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(p1X + 50 + shift, cY);
      ctx.lineTo(p2X - 50 + shift * 0.9, cY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = '700 12px "Plus Jakarta Sans"';
      ctx.fillStyle = '#dc2626';
      ctx.fillText('⚡ Lực hút tĩnh điện Van der Waals (δ⁻ ··· δ⁺)', cX, cY - 40);
      ctx.restore();
    }

    function drawB13PentaneComparison(ctx, cX, cY) {
      // Top: Pentane (mạch thẳng tiếp xúc diện rộng)
      // Bottom: Neopentane (hình cầu tiếp xúc điểm nhỏ)
      const topY = cY - 50, botY = cY + 50;

      ctx.save();
      // Pentane 1 & 2
      ctx.fillStyle = '#dbeafe';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cX - 130, topY - 24, 260, 20, 6);
      ctx.roundRect(cX - 130, topY + 4, 260, 20, 6);
      ctx.fill();
      ctx.stroke();

      ctx.font = '700 11px "Plus Jakarta Sans"';
      ctx.fillStyle = '#1e40af';
      ctx.textAlign = 'center';
      ctx.fillText('Pentane mạch thẳng: DIỆN TÍCH TIẾP XÚC LỚN (T° sôi = 36.1 °C)', cX, topY - 35);

      // Neopentane 1 & 2
      ctx.fillStyle = '#fee2e2';
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(cX - 45, botY, 26, 0, Math.PI * 2);
      ctx.arc(cX + 45, botY, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#991b1b';
      ctx.fillText('Neopentane phân nhánh hình cầu: TIẾP XÚC ĐIỂM NHỎ (T° sôi = 9.5 °C)', cX, botY + 45);
      ctx.restore();
    }

    /* -------------------------------------------------------------
       LAB 3: ĐẤU TRƯỜNG LUYỆN TẬP SGK TRANG 65 - 67 (BÀI 13)
       ------------------------------------------------------------- */
    const B13_EXERCISES_DATA = [
      {
        id: 1,
        title: "Câu hỏi 2 (SGK Trang 65): Nguyên tử H nào trong Ethanol không tạo liên kết H?",
        text: "Trong phân tử ethanol (CH₃-CH₂-OH), những nguyên tử hydrogen nào KHÔNG tham gia vào liên kết hydrogen?",
        options: [
          "A. Nguyên tử H trong nhóm -OH",
          "B. 5 nguyên tử H liên kết trực tiếp với nguyên tử Carbon trong gốc ethyl (-C₂H₅)",
          "C. Cả 6 nguyên tử H đều tạo được liên kết hydrogen",
          "D. Không có nguyên tử H nào tạo được liên kết hydrogen"
        ],
        correct: 1, // B
        explain: "Chính xác! 5 nguyên tử H liên kết với Carbon (độ âm điện 2.55) có hiệu độ âm điện nhỏ (0.35), liên kết C-H hầu như không phân cực, không mang điện tích dương đủ lớn và C không còn cặp e tự do. Chỉ có nguyên tử H liên kết trực tiếp với Oxygen linh động mới tạo được liên kết hydrogen."
      },
      {
        id: 2,
        title: "Câu hỏi 3 (SGK Trang 66): So sánh nhiệt độ sôi của Butane và Isobutane",
        text: "Butane (CH₃-CH₂-CH₂-CH₃, t° sôi = -0.5 °C) và Isobutane ((CH₃)₂CH-CH₃, t° sôi = -11.7 °C) có cùng công thức phân tử C₄H₁₀. Nguyên nhân butane có nhiệt độ sôi cao hơn là:",
        options: [
          "A. Butane có liên kết cộng hoá trị bền hơn",
          "B. Butane có khối lượng phân tử lớn hơn isobutane",
          "C. Butane có mạch thẳng không nhánh, diện tích tiếp xúc giữa các phân tử lớn hơn nên tương tác Van der Waals mạnh hơn",
          "D. Butane tạo được liên kết hydrogen liên phân tử"
        ],
        correct: 2, // C
        explain: "Chính xác! Butane có cấu trúc mạch thẳng dài, diện tích bề mặt tiếp xúc giữa các phân tử lớn hơn nhiều so với phân tử isobutane phân nhánh dạng cầu. Do đó lực hút Van der Waals giữa các phân tử butane mạnh hơn, đòi hỏi nhiệt độ cao hơn (-0.5 °C so với -11.7 °C) để hoá hơi."
      },
      {
        id: 3,
        title: "SGK Trang 64: Nguyên nhân nước đá nổi trên mặt nước lỏng",
        text: "Tại sao băng tuyết (nước đá) lại có khối lượng riêng nhỏ hơn nước lỏng và có thể nổi trên mặt nước?",
        options: [
          "A. Do nước đá bẫy nhiều bọt khí nitrogen bên trong",
          "B. Do cấu trúc mạng tinh thể nước đá rỗng hơn vì mỗi phân tử H₂O tạo 4 liên kết hydrogen tứ diện mở",
          "C. Do các liên kết cộng hoá trị O-H dãn dài ra khi đông đặc",
          "D. Do lực đẩy Archimedes của muối khoáng hoà tan"
        ],
        correct: 1, // B
        explain: "Chính xác! Trong tinh thể nước đá, mỗi phân tử nước liên kết với 4 phân tử nước xung quanh bằng 4 liên kết hydrogen định hướng theo cấu trúc tứ diện mở. Mạng lưới này tạo nhiều khoang trống rỗng khiến thể tích dãn nở và khối lượng riêng của nước đá nhỏ hơn nước lỏng, làm băng nổi lên trên."
      }
    ];

    let b13CurrentQuestionIdx = 0;
    let b13UserAnswers = {};

    function initB13QuizArena() {
      b13CurrentQuestionIdx = 0;
      b13UserAnswers = {};
      renderB13QuizStrip();
      renderB13QuestionCard();
    }

    function renderB13QuizStrip() {
      const strip = document.getElementById('b13-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = '';

      B13_EXERCISES_DATA.forEach((q, idx) => {
        const btn = document.createElement('button');
        btn.id = 'b13-q-strip-btn-' + idx;
        btn.className = 'btn-tool';
        btn.style.minWidth = '42px';
        btn.style.height = '36px';
        btn.style.fontWeight = '700';

        const isAnswered = (b13UserAnswers[idx] !== undefined);
        const isCurrent = (idx === b13CurrentQuestionIdx);

        if (isCurrent) {
          btn.style.borderColor = '#0284c7';
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
        } else if (isAnswered) {
          const isCorrect = (b13UserAnswers[idx] === q.correct);
          btn.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
          btn.style.borderColor = isCorrect ? '#16a34a' : '#dc2626';
          btn.style.color = isCorrect ? '#15803d' : '#b91c1c';
        } else {
          btn.style.background = '#f8fafc';
          btn.style.color = '#64748b';
        }

        btn.innerText = `Câu ${idx + 1}`;
        btn.onclick = () => {
          b13CurrentQuestionIdx = idx;
          renderB13QuizStrip();
          renderB13QuestionCard();
        };
        strip.appendChild(btn);
      });

      const prog = document.getElementById('b13-quiz-progress-text');
      const answeredCount = Object.keys(b13UserAnswers).length;
      if (prog) prog.innerText = `Đã hoàn thành: ${answeredCount} / ${B13_EXERCISES_DATA.length} câu`;

      const scoreBoard = document.getElementById('b13-quiz-score-board');
      if (scoreBoard) {
        scoreBoard.style.display = (answeredCount === B13_EXERCISES_DATA.length) ? 'block' : 'none';
      }
    }

    function renderB13QuestionCard() {
      const container = document.getElementById('b13-question-card-container');
      if (!container) return;

      const q = B13_EXERCISES_DATA[b13CurrentQuestionIdx];
      const userSelected = b13UserAnswers[b13CurrentQuestionIdx];
      const isAnswered = (userSelected !== undefined);

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let optStyle = 'width:100%; text-align:left; padding:12px 14px; border-radius:8px; border:1px solid #cbd5e1; background:#ffffff; font-size:13px; font-weight:500; cursor:pointer; margin-bottom:8px; transition:all 0.15s; display:flex; align-items:center; justify-content:space-between;';
        if (isAnswered) {
          if (optIdx === q.correct) {
            optStyle += 'background:#dcfce7; border-color:#16a34a; color:#15803d; font-weight:700;';
          } else if (optIdx === userSelected) {
            optStyle += 'background:#fee2e2; border-color:#dc2626; color:#b91c1c; font-weight:700;';
          } else {
            optStyle += 'opacity:0.6;';
          }
        }

        optionsHtml += `
          <button style="${optStyle}" onclick="selectB13Answer(${optIdx})" ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
            ${isAnswered && optIdx === q.correct ? '<span style="color:#16a34a; font-weight:800;">✓</span>' : ''}
            ${isAnswered && optIdx === userSelected && userSelected !== q.correct ? '<span style="color:#dc2626; font-weight:800;">✗</span>' : ''}
          </button>
        `;
      });

      let explainHtml = '';
      if (isAnswered) {
        const isCorrect = (userSelected === q.correct);
        explainHtml = `
          <div style="margin-top:14px; padding:12px; border-radius:8px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}; font-size:13px; color:${isCorrect ? '#166534' : '#991b1b'}; line-height:1.5;">
            <strong>${isCorrect ? '✓ Câu trả lời chính xác!' : '✗ Câu trả lời chưa chính xác!'}</strong><br/>
            ${q.explain}
          </div>
        `;
      }

      container.innerHTML = `
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:#0284c7; text-transform:uppercase;">${q.title}</span>
            <span style="font-size:11px; font-weight:600; color:#64748b;">Câu ${b13CurrentQuestionIdx + 1} / ${B13_EXERCISES_DATA.length}</span>
          </div>
          <p style="font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; line-height:1.5;">${q.text}</p>
          <div>
            ${optionsHtml}
          </div>
          ${explainHtml}
        </div>
      `;

      if (typeof renderMathInPage === 'function') renderMathInPage();
    }

    function selectB13Answer(optIdx) {
      if (b13UserAnswers[b13CurrentQuestionIdx] !== undefined) return;
      b13UserAnswers[b13CurrentQuestionIdx] = optIdx;
      renderB13QuizStrip();
      renderB13QuestionCard();
    }

    function resetB13QuizArena() {
      b13UserAnswers = {};
      b13CurrentQuestionIdx = 0;
      renderB13QuizStrip();
      renderB13QuestionCard();
    }

    function resetB13InteractiveState() {
      b13SimMode = 'water';
      selectB13SimMode('water');
    }




    /* ==========================================================
       BÀI 14: ÔN TẬP VÀ LUYỆN TẬP CHƯƠNG 3 (LIÊN KẾT HOÁ HỌC)
       ========================================================== */
    let currentPartB14 = 'part1';

    function switchPartB14(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB14 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b14-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b14-' + p);
        const panel = document.getElementById('panel-b14-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const tip = document.getElementById('b14-lab-status-tip');
      if (tip) {
        if (partId === 'part1') tip.innerHTML = '💡 <em>Sơ đồ tư duy 2.5D tương tác: Bấm vào từng nhánh kiến thức để khám phá tóm tắt bản chất liên kết.</em>';
        else if (partId === 'part2') tip.innerHTML = '💡 <em>Hệ thống hoá Điền khuyết SGK Trang 67: Chọn đáp án đúng cho các chỗ trống để kiểm tra mức độ ghi nhớ.</em>';
        else tip.innerHTML = '💡 <em>Đấu trường 6 bài tập SGK Trang 68: Kiểm tra năng lực vận dụng liên kết hoá học tổng hợp.</em>';
      }

      if (partId === 'part1') {
        setTimeout(drawB14Mindmap, 50);
      }
    }

    // --- PART 1: 2.5D MINDMAP LOGIC ---
    let b14SelectedNode = null;
    const b14MindmapNodes = [
      { id: 'center', label: 'LIÊN KẾT HOÁ HỌC', x: 0.5, y: 0.5, r: 64, color: '#0284c7', desc: 'Bản chất liên kết giữa các nguyên tử/phân tử tạo thành hệ bền vững (Chương 3).' },
      { id: 'octet', label: '1. Quy tắc Octet', x: 0.2, y: 0.24, r: 52, color: '#3b82f6', desc: 'Xu hướng đạt 8 electron lớp ngoài cùng bền vững như khí hiếm (Bài 10).' },
      { id: 'ionic', label: '2. Liên kết Ion', x: 0.8, y: 0.24, r: 52, color: '#8b5cf6', desc: 'Lực hút tĩnh điện giữa cation kim loại và anion phi kim mang điện trái dấu (Bài 11).' },
      { id: 'covalent', label: '3. Liên kết CHT', x: 0.2, y: 0.76, r: 52, color: '#10b981', desc: 'Dùng chung cặp electron. Gồm xen phủ trục sigma và xen phủ bên pi (Bài 12).' },
      { id: 'inter', label: '4. LK H & Van der Waals', x: 0.8, y: 0.76, r: 52, color: '#f59e0b', desc: 'Tương tác liên phân tử quyết định nhiệt độ nóng chảy, nhiệt độ sôi (Bài 13).' }
    ];

    function initB14Mindmap() {
      const canvas = document.getElementById('b14MindmapCanvas');
      if (!canvas) return;
      
      canvas.removeEventListener('click', handleB14CanvasClick);
      canvas.addEventListener('click', handleB14CanvasClick);
      
      window.removeEventListener('resize', resizeB14Mindmap);
      window.addEventListener('resize', resizeB14Mindmap);
      
      resizeB14Mindmap();
    }

    function resizeB14Mindmap() {
      const canvas = document.getElementById('b14MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 450) * dpr;
      drawB14Mindmap();
    }

    function handleB14CanvasClick(e) {
      const canvas = document.getElementById('b14MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let found = null;
      for (const node of b14MindmapNodes) {
        const nx = node.x * rect.width;
        const ny = node.y * rect.height;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist <= node.r) {
          found = node;
          break;
        }
      }
      b14SelectedNode = found;
      drawB14Mindmap();
    }

    function drawB14Mindmap() {
      const canvas = document.getElementById('b14MindmapCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = rect.width || 500;
      const ch = rect.height || 450;

      // Draw connections
      const centerNode = b14MindmapNodes[0];
      const cx = centerNode.x * cw;
      const cy = centerNode.y * ch;

      for (let i = 1; i < b14MindmapNodes.length; i++) {
        const node = b14MindmapNodes[i];
        const nx = node.x * cw;
        const ny = node.y * ch;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Pulsing line indicator
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = (b14SelectedNode && b14SelectedNode.id === node.id) ? 3.5 : 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw nodes
      for (const node of b14MindmapNodes) {
        const nx = node.x * cw;
        const ny = node.y * ch;
        const isSelected = (b14SelectedNode && b14SelectedNode.id === node.id);

        // Shadow / Glow
        ctx.save();
        ctx.shadowColor = isSelected ? node.color : 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = isSelected ? 18 : 8;
        ctx.shadowOffsetY = 4;

        // Circle body
        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.lineWidth = isSelected ? 4 : 2.5;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.restore();

        // Node Title
        ctx.font = node.id === 'center' ? 'bold 13px Plus Jakarta Sans, sans-serif' : '600 12px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = node.id === 'center' ? '#0f172a' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      }

      // Draw tooltip / info box at bottom if node is selected
      if (b14SelectedNode) {
        const boxW = Math.min(cw - 32, 420);
        const boxH = 64;
        const bx = (cw - boxW) / 2;
        const by = ch - boxH - 14;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 10);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = b14SelectedNode.color;
        ctx.stroke();

        ctx.font = 'bold 12.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = b14SelectedNode.color;
        ctx.textAlign = 'left';
        ctx.fillText(b14SelectedNode.label, bx + 14, by + 22);

        ctx.font = '11.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(b14SelectedNode.desc, bx + 14, by + 44);
        ctx.restore();
      }

      ctx.restore();
    }

    // --- PART 2: CLOZE LAB (SGK TRANG 67) ---
    const b14ClozeAnswers = {
      q1: '8 electron',
      q2: 'tĩnh điện',
      q3: 'dùng chung',
      q4: 'hiệu độ âm điện'
    };

    function initB14ClozeLab() {
      updateB14ClozeStatus();
    }

    function checkB14Cloze() {
      let correctCount = 0;
      for (const [key, val] of Object.entries(b14ClozeAnswers)) {
        const sel = document.getElementById('b14-cloze-' + key);
        if (sel) {
          if (sel.value === val) {
            sel.style.borderColor = '#16a34a';
            sel.style.backgroundColor = '#f0fdf4';
            correctCount++;
          } else if (sel.value !== '') {
            sel.style.borderColor = '#dc2626';
            sel.style.backgroundColor = '#fef2f2';
          }
        }
      }

      const board = document.getElementById('b14-cloze-status-board');
      if (board) {
        if (correctCount === 4) {
          board.innerHTML = `<div style="color: #166534; font-weight: 700; font-size: 14px;">✨ Hoàn thành xuất sắc: 4/4 ô chính xác!</div>
          <p style="margin: 6px 0 0 0; color: #1e293b;">Bạn đã nắm rất vững bản chất quy tắc Octet, lực hút tĩnh điện liên kết ion, cặp electron dùng chung và tiêu chuẩn phân loại theo hiệu độ âm điện.</p>`;
        } else {
          board.innerHTML = `<div style="color: #0284c7; font-weight: 700;">Tiến độ: Đúng ${correctCount}/4 ô</div>
          <p style="margin: 6px 0 0 0; color: #475569;">Hãy kiểm tra lại các chỗ tô đỏ và chọn phương án chuẩn nhất theo định nghĩa SGK.</p>`;
        }
      }
    }

    function updateB14ClozeStatus() {
      const board = document.getElementById('b14-cloze-status-board');
      if (board) {
        board.innerHTML = `<div style="color: #64748b;">Chưa kiểm tra. Hãy chọn từ khoá thích hợp trong 4 ô trống ở cột bên trái rồi bấm <strong>"Kiểm tra kết quả"</strong>.</div>`;
      }
    }

    // --- PART 3: QUIZ ARENA 6 BÀI TẬP SGK TR. 68 ---
    const b14QuizData = [
      {
        id: 1,
        title: 'Câu 1 (SGK Tr.68)',
        question: 'Dãy gồm các chất đều có liên kết ion là:',
        options: [
          'A. NaCl, CaO, K2S',
          'B. CO2, H2O, CH4',
          'C. HCl, NH3, Cl2',
          'D. Na2O, SO2, SO3'
        ],
        answer: 0,
        explanation: 'NaCl, CaO, K2S đều được tạo thành từ kim loại điển hình (nhóm IA, IIA) và phi kim điển hình (nhóm VIA, VIIA), có hiệu độ âm điện lớn (Δχ >= 1.7) nên liên kết ion hình thành.'
      },
      {
        id: 2,
        title: 'Câu 2 (SGK Tr.68)',
        question: 'Chất nào sau đây chứa liên kết cộng hoá trị không phân cực?',
        options: [
          'A. H2O',
          'B. Cl2',
          'C. NH3',
          'D. HCl'
        ],
        answer: 1,
        explanation: 'Phân tử Cl2 gồm hai nguyên tử cùng một nguyên tố Cl giống nhau, hiệu độ âm điện Δχ = 0 nên cặp electron dùng chung nằm chính giữa => Liên kết CHT không phân cực.'
      },
      {
        id: 3,
        title: 'Câu 3 (SGK Tr.68)',
        question: 'Số cặp electron hoá trị dùng chung và chưa liên kết trong phân tử H2O là:',
        options: [
          'A. 2 cặp dùng chung, 2 cặp chưa liên kết (tự do)',
          'B. 1 cặp dùng chung, 3 cặp chưa liên kết',
          'C. 2 cặp dùng chung, không còn electron tự do',
          'D. 4 cặp electron dùng chung'
        ],
        answer: 0,
        explanation: 'Nguyên tử O có 6e hoá trị, góp 2e tạo 2 liên kết đơn với 2 nguyên tử H (2 cặp dùng chung). Còn lại 4e tương ứng 2 cặp electron tự do.'
      },
      {
        id: 4,
        title: 'Câu 4 (SGK Tr.68)',
        question: 'Cho độ âm điện: Na (0.93), Cl (3.16), H (2.20), O (3.44). Hợp chất nào sau đây có độ phân cực lớn nhất?',
        options: [
          'A. HCl (Δχ = 0.96)',
          'B. H2O (Δχ = 1.24)',
          'C. NaCl (Δχ = 2.23)',
          'D. Cl2O (Δχ = 0.28)'
        ],
        answer: 2,
        explanation: 'Hiệu độ âm điện trong NaCl: Δχ = 3.16 - 0.93 = 2.23 (lớn nhất trong các chất nêu trên, thuộc liên kết ion).'
      },
      {
        id: 5,
        title: 'Câu 5 (SGK Tr.68)',
        question: 'Dãy các oxide chu kì 3: Na2O, MgO, Al2O3, SiO2, P2O5, SO3, Cl2O7. Xu hướng biến đổi tính phân cực của liên kết trong dãy là:',
        options: [
          'A. Độ phân cực tăng dần',
          'B. Độ phân cực giảm dần từ liên kết ion sang cộng hoá trị',
          'C. Không thay đổi',
          'D. Biến đổi tuần hoàn không theo quy luật'
        ],
        answer: 1,
        explanation: 'Từ trái sang phải trong chu kì 3, độ âm điện của các nguyên tố tăng dần (Na -> Cl) trong khi liên kết với O có độ âm điện cố định (3.44), nên Δχ giảm dần: liên kết chuyển dần từ ion sang CHT phân cực rồi CHT ít phân cực.'
      },
      {
        id: 6,
        title: 'Câu 6 (SGK Tr.68)',
        question: 'Ethanol (C2H5OH) có nhiệt độ sôi (78.3°C) cao hơn nhiều so với dimethyl ether (CH3-O-CH3, nhiệt độ sôi -24°C) dù có cùng khối lượng phân tử (46) vì:',
        options: [
          'A. Ethanol có liên kết ion bền vững',
          'B. Ethanol tạo được liên kết hydrogen liên phân tử mạnh mẽ',
          'C. Dimethyl ether có khối lượng riêng nhỏ hơn',
          'D. Ethanol là hợp chất vô cơ'
        ],
        answer: 1,
        explanation: 'Trong ethanol có nhóm -O-H với nguyên tử H linh động gắn vào nguyên tử O có độ âm điện lớn, tạo được liên kết hydrogen liên phân tử giữa các phân tử C2H5OH, làm tăng nhiệt độ sôi vượt trội so với đồng phân ether.'
      }
    ];

    let b14UserAnswers = {};

    function initB14QuizArena() {
      b14UserAnswers = {};
      renderB14QuestionStrip();
      renderB14CurrentQuestion(0);
    }

    function renderB14QuestionStrip() {
      const strip = document.getElementById('b14-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = b14QuizData.map((q, idx) => {
        const isAnswered = b14UserAnswers[idx] !== undefined;
        const isCorrect = isAnswered && (b14UserAnswers[idx] === q.answer);
        let bg = '#f1f5f9';
        let color = '#475569';
        if (isAnswered) {
          bg = isCorrect ? '#dcfce7' : '#fee2e2';
          color = isCorrect ? '#166534' : '#991b1b';
        }
        return `<button onclick="renderB14CurrentQuestion(${idx})" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: ${bg}; color: ${color}; font-weight: 700; font-size: 12px; cursor: pointer;">Câu ${idx + 1}</button>`;
      }).join('');
    }

    function renderB14CurrentQuestion(idx) {
      const q = b14QuizData[idx];
      const leftCol = document.getElementById('b14-quiz-active-question-card');
      if (!leftCol) return;

      const userChoice = b14UserAnswers[idx];
      const isAnswered = userChoice !== undefined;

      let optsHtml = q.options.map((opt, optIdx) => {
        let optStyle = 'padding: 10px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; margin-bottom: 8px; cursor: pointer; font-size: 13px; transition: all 0.15s; background: #ffffff;';
        if (isAnswered) {
          if (optIdx === q.answer) {
            optStyle += ' border-color: #16a34a; background: #f0fdf4; color: #166534; font-weight: 700;';
          } else if (optIdx === userChoice) {
            optStyle += ' border-color: #dc2626; background: #fef2f2; color: #991b1b;';
          }
        }
        return `<div onclick="handleB14Answer(${idx}, ${optIdx})" style="${optStyle}">${opt}</div>`;
      }).join('');

      let feedbackHtml = '';
      if (isAnswered) {
        const isCorrect = userChoice === q.answer;
        feedbackHtml = `
          <div style="margin-top: 14px; padding: 12px; border-radius: 8px; background: ${isCorrect ? '#f0fdf4' : '#fffbeb'}; border-left: 4px solid ${isCorrect ? '#16a34a' : '#f59e0b'};">
            <div style="font-weight: 700; color: ${isCorrect ? '#166534' : '#b45309'};">
              ${isCorrect ? '✅ Chính xác!' : '⚠️ Chưa chính xác!'}
            </div>
            <div style="font-size: 12.5px; color: #334155; margin-top: 4px; line-height: 1.5;">
              <strong>Giải thích:</strong> ${q.explanation}
            </div>
          </div>
        `;
      }

      leftCol.innerHTML = `
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: #0284c7; font-size: 14px;">${q.title}</span>
          <span style="font-size: 12px; color: #64748b;">Câu ${idx + 1} / 6</span>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 14px;">
          ${q.question}
        </div>
        <div>
          ${optsHtml}
        </div>
        ${feedbackHtml}
      `;
    }

    function handleB14Answer(qIdx, optIdx) {
      if (b14UserAnswers[qIdx] !== undefined) return;
      b14UserAnswers[qIdx] = optIdx;
      renderB14QuestionStrip();
      renderB14CurrentQuestion(qIdx);

      const answeredCount = Object.keys(b14UserAnswers).length;
      const progressText = document.getElementById('b14-quiz-progress-text');
      if (progressText) {
        progressText.innerText = `Đã hoàn thành: ${answeredCount} / 6 câu`;
      }

      if (answeredCount === 6) {
        const scoreBoard = document.getElementById('b14-quiz-score-board');
        if (scoreBoard) scoreBoard.style.display = 'block';
      }
    }

    function resetB14QuizArena() {
      initB14QuizArena();
      const scoreBoard = document.getElementById('b14-quiz-score-board');
      if (scoreBoard) scoreBoard.style.display = 'none';
      const progressText = document.getElementById('b14-quiz-progress-text');
      if (progressText) progressText.innerText = 'Đã hoàn thành: 0 / 6 câu';
    }

    function resetB14InteractiveState() {
      if (currentPartB14 === 'part1') {
        b14SelectedNode = null;
        drawB14Mindmap();
      } else if (currentPartB14 === 'part2') {
        ['q1', 'q2', 'q3', 'q4'].forEach(k => {
          const el = document.getElementById('b14-cloze-' + k);
          if (el) {
            el.value = '';
            el.style.borderColor = '#cbd5e1';
            el.style.backgroundColor = '#ffffff';
          }
        });
        updateB14ClozeStatus();
      } else {
        resetB14QuizArena();
      }
    }



    /* ==========================================================
       BÀI 15: PHẢN ỨNG OXI HOÁ - KHỬ & SỐ OXI HOÁ
       ========================================================== */
    let currentPartB15 = 'part1';

    function switchPartB15(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB15 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b15-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b15-' + p);
        const panel = document.getElementById('panel-b15-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const tip = document.getElementById('b15-lab-status-tip');
      const hudTool = document.getElementById('b15-hud-tool');
      if (tip) {
        if (partId === 'part1') {
          tip.innerHTML = '💡 <em>Chọn chất mẫu ở trên để xem từng bước quy đổi số oxi hoá theo quy tắc trung hoà điện tích.</em>';
          if (hudTool) hudTool.innerText = 'Máy tính Số Oxi Hoá';
        } else if (partId === 'part2') {
          tip.innerHTML = '💡 <em>Mô phỏng dòng electron: Quan sát electron bức ra từ chất khử và bay sang chất oxi hoá.</em>';
          if (hudTool) hudTool.innerText = 'Dòng Chuyển Electron';
          setTimeout(initB15RedoxSim, 50);
        } else {
          tip.innerHTML = '💡 <em>Thử thách 4 bước thăng bằng electron & các câu hỏi ứng dụng thực tiễn SGK Tr. 78.</em>';
          if (hudTool) hudTool.innerText = 'Luyện Tập Cân Bằng';
        }
      }
    }

    // --- PART 1: MÁY TÍNH SỐ OXI HOÁ ---
    const b15CompoundDatabase = {
      'Fe2O3': {
        formula: 'Fe₂O₃ (Iron(III) oxide)',
        targetElem: 'Fe',
        steps: [
          'Theo Quy tắc 2: Oxygen trong hợp chất có số oxi hoá là -2.',
          'Đặt số oxi hoá của Iron (Fe) là x.',
          'Theo Quy tắc 3: Phân tử trung hoà điện => Tổng số oxi hoá = 0.',
          'Biểu thức: 2 * (x) + 3 * (-2) = 0',
          '2x - 6 = 0 => 2x = +6 => x = +3.',
          'Kết luận: Fe có số oxi hoá là +3, O là -2. Ký hiệu: Fe₂(+3)O₃(-2).'
        ],
        stateHtml: '<span style="color: #ea580c; font-weight: 800; font-size: 20px;">Fe: +3</span> &nbsp;|&nbsp; <span style="color: #0284c7; font-weight: 800; font-size: 20px;">O: -2</span>'
      },
      'KMnO4': {
        formula: 'KMnO₄ (Potassium permanganate)',
        targetElem: 'Mn',
        steps: [
          'Theo Quy tắc 2: Kali (K thuộc nhóm IA) luôn là +1, Oxygen luôn là -2.',
          'Đặt số oxi hoá của Mangan (Mn) là x.',
          'Theo Quy tắc 3: 1*(+1) + 1*(x) + 4*(-2) = 0',
          '+1 + x - 8 = 0 => x - 7 = 0 => x = +7.',
          'Kết luận: Mn đạt số oxi hoá cực đại +7. Đây là chất oxi hoá rất mạnh trong thực tế!'
        ],
        stateHtml: '<span style="color: #7c3aed; font-weight: 800; font-size: 20px;">Mn: +7</span> &nbsp;|&nbsp; <span style="color: #16a34a; font-weight: 800; font-size: 20px;">K: +1</span> &nbsp;|&nbsp; <span style="color: #0284c7; font-weight: 800; font-size: 20px;">O: -2</span>'
      },
      'H2SO4': {
        formula: 'H₂SO₄ (Sulfuric acid)',
        targetElem: 'S',
        steps: [
          'Theo Quy tắc 2: H có số oxi hoá +1, O có số oxi hoá -2.',
          'Đặt số oxi hoá của Sulfur (S) là x.',
          'Theo Quy tắc 3: 2*(+1) + 1*(x) + 4*(-2) = 0',
          '+2 + x - 8 = 0 => x - 6 = 0 => x = +6.',
          'Kết luận: Sulfur có số oxi hoá cao nhất là +6.'
        ],
        stateHtml: '<span style="color: #f59e0b; font-weight: 800; font-size: 20px;">S: +6</span> &nbsp;|&nbsp; <span style="color: #0284c7; font-weight: 800; font-size: 20px;">H: +1</span> &nbsp;|&nbsp; <span style="color: #ef4444; font-weight: 800; font-size: 20px;">O: -2</span>'
      },
      'NH4_plus': {
        formula: 'NH₄⁺ (Ammonium ion)',
        targetElem: 'N',
        steps: [
          'Theo Quy tắc 2: H có số oxi hoá +1.',
          'Đặt số oxi hoá của Nitrogen (N) là x.',
          'Theo Quy tắc 4: Trong ion đa nguyên tử, tổng số oxi hoá bằng điện tích của ion (+1).',
          'Biểu thức: 1*(x) + 4*(+1) = +1',
          'x + 4 = +1 => x = -3.',
          'Kết luận: Nitrogen trong NH₄⁺ có số oxi hoá là -3.'
        ],
        stateHtml: '<span style="color: #2563eb; font-weight: 800; font-size: 20px;">N: -3</span> &nbsp;|&nbsp; <span style="color: #10b981; font-weight: 800; font-size: 20px;">H: +1</span> &nbsp;(Điện tích ion: +1)'
      },
      'Cr2O7_2minus': {
        formula: 'Cr₂O₇²⁻ (Dichromate ion)',
        targetElem: 'Cr',
        steps: [
          'Theo Quy tắc 2: Oxygen có số oxi hoá là -2.',
          'Đặt số oxi hoá của Chromium (Cr) là x.',
          'Theo Quy tắc 4: Tổng số oxi hoá bằng điện tích của ion (-2).',
          'Biểu thức: 2*(x) + 7*(-2) = -2',
          '2x - 14 = -2 => 2x = +12 => x = +6.',
          'Kết luận: Chromium trong ion dicromat đạt số oxi hoá +6.'
        ],
        stateHtml: '<span style="color: #ea580c; font-weight: 800; font-size: 20px;">Cr: +6</span> &nbsp;|&nbsp; <span style="color: #0284c7; font-weight: 800; font-size: 20px;">O: -2</span> &nbsp;(Điện tích ion: 2-)'
      },
      'HNO3': {
        formula: 'HNO₃ (Nitric acid)',
        targetElem: 'N',
        steps: [
          'Theo Quy tắc 2: H có số oxi hoá +1, O có số oxi hoá -2.',
          'Đặt số oxi hoá của Nitrogen (N) là x.',
          'Theo Quy tắc 3: 1*(+1) + 1*(x) + 3*(-2) = 0',
          '+1 + x - 6 = 0 => x - 5 = 0 => x = +5.',
          'Kết luận: Nitrogen trong HNO₃ đạt mức oxi hoá cao nhất là +5 (chất oxi hoá mạnh).'
        ],
        stateHtml: '<span style="color: #2563eb; font-weight: 800; font-size: 20px;">N: +5</span> &nbsp;|&nbsp; <span style="color: #10b981; font-weight: 800; font-size: 20px;">H: +1</span> &nbsp;|&nbsp; <span style="color: #ef4444; font-weight: 800; font-size: 20px;">O: -2</span>'
      }
    };

    function selectB15SampleCompound(key) {
      const data = b15CompoundDatabase[key];
      if (!data) return;

      const card = document.getElementById('b15-compound-display-card');
      if (!card) return;

      const stepsHtml = data.steps.map((st, i) => `
        <div style="margin-bottom: 8px; display: flex; gap: 8px; align-items: flex-start;">
          <span style="background: #e0f2fe; color: #0369a1; border-radius: 50%; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; flex-shrink: 0;">${i+1}</span>
          <span style="font-size: 13px; color: #334155; line-height: 1.5;">${st}</span>
        </div>
      `).join('');

      card.innerHTML = `
        <div style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 12px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 800; color: #0f172a;">${data.formula}</h3>
          <div>${data.stateHtml}</div>
        </div>
        <div style="background: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 10px; font-size: 13px;">📝 Các bước giải chi tiết:</div>
          ${stepsHtml}
        </div>
      `;
    }

    // --- PART 2: REDOX ELECTRON SIMULATOR ---
    let b15AnimId = null;
    let b15SimReac = 'fe_cu';
    let b15Electrons = [];

    const b15ReactionsConfig = {
      'fe_cu': {
        reducer: 'Fe (Chất khử)',
        oxidizer: 'Cu²⁺ (Chất oxi hoá)',
        equation: 'Fe⁰  +  Cu⁺²SO₄  →  Fe⁺²SO₄  +  Cu⁰↓',
        eCount: 2,
        desc: 'Fe nhường 2e tạo Fe²⁺. Cu²⁺ nhận 2e tạo Cu kim loại bám ngoài đinh sắt.'
      },
      'c_o2': {
        reducer: 'C (Chất khử)',
        oxidizer: 'O₂ (Chất oxi hoá)',
        equation: 'C⁰  +  O₂⁰  →  C⁺⁴O₂⁻²',
        eCount: 4,
        desc: 'Carbon nhường 4e cho 2 nguyên tử O. C cháy sáng toả nhiệt mạnh.'
      },
      'nh3_o2': {
        reducer: 'NH₃ (Chất khử)',
        oxidizer: 'O₂ (Chất oxi hoá)',
        equation: '4N⁻³H₃  +  5O₂⁰  →  4N⁺²O  +  6H₂O⁻²',
        eCount: 5,
        desc: 'Nitrogen từ -3 nhường 5e tăng lên +2 trong NO (Quá trình Ostwald sản xuất HNO₃).'
      }
    };

    function setB15RedoxReaction(key) {
      b15SimReac = key;
      initB15RedoxSim();
    }

    function initB15RedoxSim() {
      const canvas = document.getElementById('b15RedoxCanvas');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 420) * dpr;

      // Spawn initial electron stream
      b15Electrons = [];
      const eMax = b15ReactionsConfig[b15SimReac].eCount * 4;
      for (let i = 0; i < eMax; i++) {
        b15Electrons.push({
          x: 0.25 + Math.random() * 0.1,
          y: 0.5 + (Math.random() - 0.5) * 0.12,
          speed: 0.003 + Math.random() * 0.004,
          rad: 4 + Math.random() * 2
        });
      }

      if (b15AnimId) cancelAnimationFrame(b15AnimId);
      renderB15RedoxLoop();
    }

    function renderB15RedoxLoop() {
      const canvas = document.getElementById('b15RedoxCanvas');
      if (!canvas || currentPartB15 !== 'part2') return;

      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = canvas.getBoundingClientRect().width || 500;
      const ch = canvas.getBoundingClientRect().height || 420;

      const conf = b15ReactionsConfig[b15SimReac];

      // Draw Equation Header
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 15px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(conf.equation, cw / 2, 36);

      ctx.fillStyle = '#64748b';
      ctx.font = '12px Plus Jakarta Sans, sans-serif';
      ctx.fillText(conf.desc, cw / 2, 60);

      // Reducer Sphere (Left)
      const rx = cw * 0.22;
      const ry = ch * 0.55;
      ctx.save();
      ctx.shadowColor = 'rgba(239, 68, 68, 0.3)';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(rx, ry, 54, 0, Math.PI * 2);
      ctx.fillStyle = '#fee2e2';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ef4444';
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(conf.reducer, rx, ry - 6);
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
      ctx.fillText('NHƯỜNG e (Số oxh TĂNG)', rx, ry + 14);

      // Oxidizer Sphere (Right)
      const ox = cw * 0.78;
      const oy = ch * 0.55;
      ctx.save();
      ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(ox, oy, 54, 0, Math.PI * 2);
      ctx.fillStyle = '#dbeafe';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#3b82f6';
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(conf.oxidizer, ox, oy - 6);
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
      ctx.fillText('NHẬN e (Số oxh GIẢM)', ox, oy + 14);

      // Stream Flow Pipeline
      ctx.beginPath();
      ctx.moveTo(rx + 54, ry);
      ctx.lineTo(ox - 54, oy);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Draw Flying Electrons
      for (const el of b15Electrons) {
        el.x += el.speed;
        if (el.x > 0.75) {
          el.x = 0.25;
          el.y = 0.55 + (Math.random() - 0.5) * 0.12;
        }

        const ex = el.x * cw;
        const ey = el.y * ch;

        ctx.save();
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ex, ey, el.rad, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('e⁻', ex, ey);
      }

      ctx.restore();
      b15AnimId = requestAnimationFrame(renderB15RedoxLoop);
    }

    // --- PART 3: BÀI TẬP SGK TRANG 78 & CÂN BẰNG THĂNG BẰNG ELECTRON ---
    const b15QuizData = [
      {
        id: 1,
        title: 'Câu 1 (SGK Tr. 78)',
        question: 'Trong phản ứng: 2Fe + 3Cl₂ → 2FeCl₃, vai trò của các chất là:',
        options: [
          'A. Fe là chất oxi hoá, Cl₂ là chất khử',
          'B. Fe là chất khử, Cl₂ là chất oxi hoá',
          'C. Cả Fe và Cl₂ đều là chất khử',
          'D. Cả Fe và Cl₂ đều là chất oxi hoá'
        ],
        answer: 1,
        explanation: 'Fe từ 0 tăng lên +3 trong FeCl₃ (nhường e => chất khử). Cl₂ từ 0 giảm xuống -1 trong FeCl₃ (nhận e => chất oxi hoá).'
      },
      {
        id: 2,
        title: 'Câu 2 (SGK Tr. 78)',
        question: 'Dãy gồm các chất và ion đều có tính khử là:',
        options: [
          'A. Fe²⁺, Cu, S²⁻',
          'B. Fe³⁺, Cu²⁺, Cl⁻',
          'C. KMnO₄, HNO₃, H₂SO₄ đặc',
          'D. O₂, F₂, Cl₂'
        ],
        answer: 0,
        explanation: 'Fe²⁺, Cu, S²⁻ đều chứa các nguyên tố ở mức oxi hoá trung gian hoặc thấp nhất, có khả năng nhường electron để tăng số oxi hoá lên mức cao hơn.'
      },
      {
        id: 3,
        title: 'Câu 3: Thăng bằng electron',
        question: 'Cho phản ứng: a Cu + b HNO₃ → c Cu(NO₃)₂ + d NO↑ + e H₂O. Tổng hệ số nguyên tối giản (a + b + c + d + e) là:',
        options: [
          'A. 18',
          'B. 20',
          'C. 22',
          'D. 24'
        ],
        answer: 1,
        explanation: 'Quá trình: 3x(Cu → Cu²⁺ + 2e) và 2x(N⁺⁵ + 3e → N⁺²). Phương trình cân bằng: 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O. Tổng hệ số: 3 + 8 + 3 + 2 + 4 = 20.'
      },
      {
        id: 4,
        title: 'Câu 4: Thực tiễn đời sống',
        question: 'Hiện tượng "lúa phất cờ" sau cơn mưa giông sấm sét liên quan trực tiếp đến phản ứng oxi hoá – khử nào?',
        options: [
          'A. S + O₂ → SO₂',
          'B. N₂ + O₂ → 2NO (ở 3000°C do tia lửa điện sét)',
          'C. C + O₂ → CO₂',
          'D. Fe + H₂O + O₂ → gỉ sắt'
        ],
        answer: 1,
        explanation: 'Tia sét tạo nhiệt độ cực lớn giúp N₂ phản ứng với O₂ tạo NO, sau đó tiếp tục chuỗi oxi hoá thành axit nitric rồi hoà tan thành phân đạm nitrate (NO₃⁻) bón tự nhiên cho cây trồng.'
      }
    ];

    let b15UserAnswers = {};

    function initB15QuizArena() {
      b15UserAnswers = {};
      renderB15QuizQuestion(0);
    }

    function renderB15QuizQuestion(idx) {
      const q = b15QuizData[idx];
      const card = document.getElementById('b15-quiz-active-question-card');
      if (!card) return;

      const userChoice = b15UserAnswers[idx];
      const isAnswered = userChoice !== undefined;

      let optsHtml = q.options.map((opt, optIdx) => {
        let optStyle = 'padding: 10px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; margin-bottom: 8px; cursor: pointer; font-size: 13px; transition: all 0.15s; background: #ffffff;';
        if (isAnswered) {
          if (optIdx === q.answer) {
            optStyle += ' border-color: #16a34a; background: #f0fdf4; color: #166534; font-weight: 700;';
          } else if (optIdx === userChoice) {
            optStyle += ' border-color: #dc2626; background: #fef2f2; color: #991b1b;';
          }
        }
        return `<div onclick="handleB15Answer(${idx}, ${optIdx})" style="${optStyle}">${opt}</div>`;
      }).join('');

      let feedbackHtml = '';
      if (isAnswered) {
        const isCorrect = userChoice === q.answer;
        feedbackHtml = `
          <div style="margin-top: 12px; padding: 12px; border-radius: 8px; background: ${isCorrect ? '#f0fdf4' : '#fffbeb'}; border-left: 4px solid ${isCorrect ? '#16a34a' : '#f59e0b'};">
            <div style="font-weight: 700; color: ${isCorrect ? '#166534' : '#b45309'};">
              ${isCorrect ? '✅ Chính xác!' : '⚠️ Chưa chính xác!'}
            </div>
            <div style="font-size: 12.5px; color: #334155; margin-top: 4px; line-height: 1.5;">
              <strong>Giải thích:</strong> ${q.explanation}
            </div>
          </div>
        `;
      }

      let navButtons = `
        <div style="display: flex; justify-content: space-between; margin-top: 14px;">
          <button class="btn-tool" onclick="renderB15QuizQuestion(${Math.max(0, idx - 1)})" ${idx === 0 ? 'disabled' : ''}>← Câu trước</button>
          <button class="btn-tool" onclick="renderB15QuizQuestion(${Math.min(b15QuizData.length - 1, idx + 1)})" ${idx === b15QuizData.length - 1 ? 'disabled' : ''}>Câu sau →</button>
        </div>
      `;

      card.innerHTML = `
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: #0284c7; font-size: 14px;">${q.title}</span>
          <span style="font-size: 12px; color: #64748b;">Câu ${idx + 1} / ${b15QuizData.length}</span>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 14px;">
          ${q.question}
        </div>
        <div>
          ${optsHtml}
        </div>
        ${feedbackHtml}
        ${navButtons}
      `;
    }

    function handleB15Answer(qIdx, optIdx) {
      if (b15UserAnswers[qIdx] !== undefined) return;
      b15UserAnswers[qIdx] = optIdx;
      renderB15QuizQuestion(qIdx);

      const answeredCount = Object.keys(b15UserAnswers).length;
      const progressText = document.getElementById('b15-quiz-progress-text');
      if (progressText) {
        progressText.innerText = `Đã trả lời: ${answeredCount} / ${b15QuizData.length} câu`;
      }
    }

    function resetB15InteractiveState() {
      if (currentPartB15 === 'part1') {
        selectB15SampleCompound('Fe2O3');
      } else if (currentPartB15 === 'part2') {
        initB15RedoxSim();
      } else {
        b15UserAnswers = {};
        renderB15QuizQuestion(0);
        const progressText = document.getElementById('b15-quiz-progress-text');
        if (progressText) progressText.innerText = `Đã trả lời: 0 / ${b15QuizData.length} câu`;
      }
    }



    /* ==========================================================
       BÀI 16: ÔN TẬP VÀ LUYỆN TẬP CHƯƠNG 4 (PHẢN ỨNG OXI HOÁ - KHỬ)
       ========================================================== */
    let currentPartB16 = 'part1';

    function switchPartB16(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB16 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b16-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b16-' + p);
        const panel = document.getElementById('panel-b16-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const tip = document.getElementById('b16-lab-status-tip');
      if (tip) {
        if (partId === 'part1') tip.innerHTML = '💡 <em>Sơ đồ tư duy 2.5D tương tác: Bấm vào từng nhánh kiến thức để khám phá tóm tắt bản chất phản ứng oxi hoá – khử.</em>';
        else if (partId === 'part2') tip.innerHTML = '💡 <em>Thử thách Điền khuyết SGK Trang 79: Chọn từ khoá thích hợp để củng cố cặp phạm trù Chất khử - Chất oxi hoá.</em>';
        else tip.innerHTML = '💡 <em>Đấu trường 7 bài tập SGK Trang 79 – 80: Vận dụng bảo toàn electron và tính toán phản ứng thực tiễn.</em>';
      }

      if (partId === 'part1') {
        setTimeout(drawB16Mindmap, 50);
      }
    }

    // --- PART 1: 2.5D MINDMAP LOGIC ---
    let b16SelectedNode = null;
    const b16MindmapNodes = [
      { id: 'center', label: 'PHẢN ỨNG OXI HOÁ - KHỬ', x: 0.5, y: 0.5, r: 66, color: '#dc2626', desc: 'Phản ứng có sự chuyển dịch electron, làm thay đổi số oxi hoá của các nguyên tố.' },
      { id: 'reducer', label: '1. Chất khử (Khử cho)', x: 0.2, y: 0.24, r: 52, color: '#ef4444', desc: 'Nhường electron, tham gia quá trình oxi hoá, số oxi hoá tăng sau phản ứng.' },
      { id: 'oxidizer', label: '2. Chất oxi hoá (O nhận)', x: 0.8, y: 0.24, r: 52, color: '#2563eb', desc: 'Nhận electron, tham gia quá trình khử, số oxi hoá giảm sau phản ứng.' },
      { id: 'balance', label: '3. Thăng bằng electron', x: 0.2, y: 0.76, r: 52, color: '#16a34a', desc: 'Nguyên tắc: Tổng số e nhường = Tổng số e nhận. Thực hiện qua 4 bước chuẩn mực.' },
      { id: 'applied', label: '4. Ứng dụng thực tiễn', x: 0.8, y: 0.76, r: 52, color: '#f59e0b', desc: 'Sự cháy nhiên liệu, gỉ kim loại, luyện kim, sản xuất hoá chất & sấm sét tạo phân đạm.' }
    ];

    function initB16Mindmap() {
      const canvas = document.getElementById('b16MindmapCanvas');
      if (!canvas) return;

      canvas.removeEventListener('click', handleB16CanvasClick);
      canvas.addEventListener('click', handleB16CanvasClick);

      window.removeEventListener('resize', resizeB16Mindmap);
      window.addEventListener('resize', resizeB16Mindmap);

      resizeB16Mindmap();
    }

    function resizeB16Mindmap() {
      const canvas = document.getElementById('b16MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 450) * dpr;
      drawB16Mindmap();
    }

    function handleB16CanvasClick(e) {
      const canvas = document.getElementById('b16MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let found = null;
      for (const node of b16MindmapNodes) {
        const nx = node.x * rect.width;
        const ny = node.y * rect.height;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist <= node.r) {
          found = node;
          break;
        }
      }
      b16SelectedNode = found;
      drawB16Mindmap();
    }

    function drawB16Mindmap() {
      const canvas = document.getElementById('b16MindmapCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = rect.width || 500;
      const ch = rect.height || 450;

      // Draw connections
      const centerNode = b16MindmapNodes[0];
      const cx = centerNode.x * cw;
      const cy = centerNode.y * ch;

      for (let i = 1; i < b16MindmapNodes.length; i++) {
        const node = b16MindmapNodes[i];
        const nx = node.x * cw;
        const ny = node.y * ch;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = (b16SelectedNode && b16SelectedNode.id === node.id) ? 3.5 : 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw nodes
      for (const node of b16MindmapNodes) {
        const nx = node.x * cw;
        const ny = node.y * ch;
        const isSelected = (b16SelectedNode && b16SelectedNode.id === node.id);

        ctx.save();
        ctx.shadowColor = isSelected ? node.color : 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = isSelected ? 18 : 8;
        ctx.shadowOffsetY = 4;

        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.lineWidth = isSelected ? 4 : 2.5;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.restore();

        ctx.font = node.id === 'center' ? 'bold 12.5px Plus Jakarta Sans, sans-serif' : '600 12px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = node.id === 'center' ? '#0f172a' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      }

      // Tooltip / Details box
      if (b16SelectedNode) {
        const boxW = Math.min(cw - 32, 420);
        const boxH = 64;
        const bx = (cw - boxW) / 2;
        const by = ch - boxH - 14;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 10);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = b16SelectedNode.color;
        ctx.stroke();

        ctx.font = 'bold 12.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = b16SelectedNode.color;
        ctx.textAlign = 'left';
        ctx.fillText(b16SelectedNode.label, bx + 14, by + 22);

        ctx.font = '11.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(b16SelectedNode.desc, bx + 14, by + 44);
        ctx.restore();
      }

      ctx.restore();
    }

    // --- PART 2: CLOZE LAB (SGK TRANG 79) ---
    const b16ClozeAnswers = {
      q1: 'nhường',
      q2: 'chất khử',
      q3: 'nhận',
      q4: 'chất oxi hoá'
    };

    function initB16ClozeLab() {
      updateB16ClozeStatus();
    }

    function checkB16Cloze() {
      let correctCount = 0;
      for (const [key, val] of Object.entries(b16ClozeAnswers)) {
        const sel = document.getElementById('b16-cloze-' + key);
        if (sel) {
          if (sel.value === val) {
            sel.style.borderColor = '#16a34a';
            sel.style.backgroundColor = '#f0fdf4';
            correctCount++;
          } else if (sel.value !== '') {
            sel.style.borderColor = '#dc2626';
            sel.style.backgroundColor = '#fef2f2';
          }
        }
      }

      const board = document.getElementById('b16-cloze-status-board');
      if (board) {
        if (correctCount === 4) {
          board.innerHTML = `<div style="color: #166534; font-weight: 700; font-size: 14px;">✨ Hoàn thành xuất sắc: 4/4 ô chính xác!</div>
          <p style="margin: 6px 0 0 0; color: #1e293b;">Bạn đã nắm vững trọn vẹn bản chất: Chất khử nhường electron (quá trình oxi hoá) và Chất oxi hoá nhận electron (quá trình khử).</p>`;
        } else {
          board.innerHTML = `<div style="color: #0284c7; font-weight: 700;">Tiến độ: Đúng ${correctCount}/4 ô</div>
          <p style="margin: 6px 0 0 0; color: #475569;">Hãy ghi nhớ khẩu quyết: "Khử cho, O nhận". Hãy chọn lại những ô chưa chính xác.</p>`;
        }
      }
    }

    function updateB16ClozeStatus() {
      const board = document.getElementById('b16-cloze-status-board');
      if (board) {
        board.innerHTML = `<div style="color: #64748b;">Chưa kiểm tra. Hãy chọn từ khoá thích hợp trong 4 ô trống ở cột bên trái rồi bấm <strong>"Kiểm tra kết quả"</strong>.</div>`;
      }
    }

    // --- PART 3: QUIZ ARENA 7 BÀI TẬP SGK TRANG 79 - 80 ---
    const b16QuizData = [
      {
        id: 1,
        title: 'Câu 1 (SGK Tr. 79)',
        question: 'Trong phản ứng oxi hoá – khử, chất oxi hoá là chất:',
        options: [
          'A. Nhận electron',
          'B. Nhường proton',
          'C. Nhường electron',
          'D. Nhận proton'
        ],
        answer: 0,
        explanation: 'Theo định nghĩa chuẩn SGK Hoá 10: Chất oxi hoá là chất nhận electron (làm giảm số oxi hoá).'
      },
      {
        id: 2,
        title: 'Câu 2 (SGK Tr. 79)',
        question: 'Trong phản ứng hoá học: Fe + H₂SO₄ → FeSO₄ + H₂, mỗi nguyên tử Fe đã:',
        options: [
          'A. Nhường 2 electron',
          'B. Nhận 2 electron',
          'C. Nhường 3 electron',
          'D. Nhận 3 electron'
        ],
        answer: 0,
        explanation: 'Fe từ mức 0 chuyển thành Fe²⁺ trong FeSO₄, do đó mỗi nguyên tử Fe đã nhường 2 electron (Fe → Fe²⁺ + 2e).'
      },
      {
        id: 3,
        title: 'Câu 3 (SGK Tr. 79)',
        question: 'Trong phản ứng: 2Na + 2H₂O → 2NaOH + H₂, chất oxi hoá là:',
        options: [
          'A. H₂O',
          'B. NaOH',
          'C. Na',
          'D. H₂'
        ],
        answer: 0,
        explanation: 'Trong H₂O, nguyên tử H có số oxi hoá +1, sau phản ứng giảm xuống 0 trong đơn chất H₂ (nhận e) => H₂O đóng vai trò là chất oxi hoá.'
      },
      {
        id: 4,
        title: 'Câu 4 (SGK Tr. 79)',
        question: 'Cho nước Cl₂ vào dung dịch NaBr: Cl₂ + 2NaBr → 2NaCl + Br₂. Trong phản ứng trên, xảy ra quá trình oxi hoá chất nào?',
        options: [
          'A. NaCl',
          'B. Br₂',
          'C. Cl₂',
          'D. NaBr'
        ],
        answer: 3,
        explanation: 'Trong NaBr, Br có số oxi hoá -1 nhường electron tạo Br₂⁰ (2Br⁻ → Br₂ + 2e). Đây là quá trình oxi hoá ion Br⁻ (thuộc chất NaBr).'
      },
      {
        id: 5,
        title: 'Câu 5 (SGK Tr. 80): Luyện gang & Blend',
        question: 'Trong các phản ứng sau, phản ứng nào KHÔNG PHẢI là phản ứng oxi hoá – khử?',
        options: [
          'A. Fe₂O₃ + 3CO → 2Fe + 3CO₂',
          'B. 2ZnS + 3O₂ → 2ZnO + 2SO₂',
          'C. 2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂ (điện phân)',
          'D. CaCO₃ → CaO + CO₂ (nhiệt phân đá vôi)'
        ],
        answer: 3,
        explanation: 'Trong phản ứng CaCO₃ → CaO + CO₂, số oxi hoá của tất cả các nguyên tố (Ca +2, C +4, O -2) đều được bảo toàn nguyên vẹn, không có sự trao đổi electron.'
      },
      {
        id: 6,
        title: 'Câu 6 (SGK Tr. 80): Quá trình Ostwald',
        question: 'Cần trộn 1 thể tích khí NH₃ với bao nhiêu thể tích không khí (chứa 21% O₂) để thực hiện phản ứng: 4NH₃ + 5O₂ → 4NO + 6H₂O?',
        options: [
          'A. Khoảng 5.95 thể tích',
          'B. Khoảng 4.25 thể tích',
          'C. Khoảng 6.50 thể tích',
          'D. Khoảng 1.25 thể tích'
        ],
        answer: 0,
        explanation: 'Tỉ lệ phản ứng: 4 thể tích NH₃ cần 5 thể tích O₂ => 1 thể tích NH₃ cần 5/4 = 1.25 thể tích O₂. Vì O₂ chiếm 21% thể tích không khí nên V_kk = 1.25 / 0.21 ≈ 5.95 thể tích.'
      },
      {
        id: 7,
        title: 'Câu 7 (SGK Tr. 80): Sản xuất CuSO₄ xanh & Môi trường',
        question: 'Để sản xuất CuSO₄, phương pháp nào sử dụng ít axit H₂SO₄ hơn và thân thiện với môi trường hơn?',
        options: [
          'A. Cu + 2H₂SO₄ (đặc, nóng) → CuSO₄ + SO₂↑ + 2H₂O',
          'B. 2Cu + O₂ + 2H₂SO₄ (loãng, sục khí) → 2CuSO₄ + 2H₂O',
          'C. Cả 2 phương pháp như nhau',
          'D. Không có phương pháp nào khả thi'
        ],
        answer: 1,
        explanation: 'Phương pháp sục không khí: 1 mol Cu chỉ tiêu tốn 1 mol H₂SO₄ và sản phẩm phụ chỉ là nước H₂O, hoàn toàn không sinh ra khí độc SO₂ gây mưa axit như khi đun với H₂SO₄ đặc.'
      }
    ];

    let b16UserAnswers = {};

    function initB16QuizArena() {
      b16UserAnswers = {};
      renderB16QuestionStrip();
      renderB16CurrentQuestion(0);
    }

    function renderB16QuestionStrip() {
      const strip = document.getElementById('b16-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = b16QuizData.map((q, idx) => {
        const isAnswered = b16UserAnswers[idx] !== undefined;
        const isCorrect = isAnswered && (b16UserAnswers[idx] === q.answer);
        let bg = '#f1f5f9';
        let color = '#475569';
        if (isAnswered) {
          bg = isCorrect ? '#dcfce7' : '#fee2e2';
          color = isCorrect ? '#166534' : '#991b1b';
        }
        return `<button onclick="renderB16CurrentQuestion(${idx})" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: ${bg}; color: ${color}; font-weight: 700; font-size: 12px; cursor: pointer;">Câu ${idx + 1}</button>`;
      }).join('');
    }

    function renderB16CurrentQuestion(idx) {
      const q = b16QuizData[idx];
      const leftCol = document.getElementById('b16-quiz-active-question-card');
      if (!leftCol) return;

      const userChoice = b16UserAnswers[idx];
      const isAnswered = userChoice !== undefined;

      let optsHtml = q.options.map((opt, optIdx) => {
        let optStyle = 'padding: 10px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; margin-bottom: 8px; cursor: pointer; font-size: 13px; transition: all 0.15s; background: #ffffff;';
        if (isAnswered) {
          if (optIdx === q.answer) {
            optStyle += ' border-color: #16a34a; background: #f0fdf4; color: #166534; font-weight: 700;';
          } else if (optIdx === userChoice) {
            optStyle += ' border-color: #dc2626; background: #fef2f2; color: #991b1b;';
          }
        }
        return `<div onclick="handleB16Answer(${idx}, ${optIdx})" style="${optStyle}">${opt}</div>`;
      }).join('');

      let feedbackHtml = '';
      if (isAnswered) {
        const isCorrect = userChoice === q.answer;
        feedbackHtml = `
          <div style="margin-top: 14px; padding: 12px; border-radius: 8px; background: ${isCorrect ? '#f0fdf4' : '#fffbeb'}; border-left: 4px solid ${isCorrect ? '#16a34a' : '#f59e0b'};">
            <div style="font-weight: 700; color: ${isCorrect ? '#166534' : '#b45309'};">
              ${isCorrect ? '✅ Chính xác!' : '⚠️ Chưa chính xác!'}
            </div>
            <div style="font-size: 12.5px; color: #334155; margin-top: 4px; line-height: 1.5;">
              <strong>Giải thích chi tiết:</strong> ${q.explanation}
            </div>
          </div>
        `;
      }

      leftCol.innerHTML = `
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: #dc2626; font-size: 14px;">${q.title}</span>
          <span style="font-size: 12px; color: #64748b;">Câu ${idx + 1} / 7</span>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 14px;">
          ${q.question}
        </div>
        <div>
          ${optsHtml}
        </div>
        ${feedbackHtml}
      `;
    }

    function handleB16Answer(qIdx, optIdx) {
      if (b16UserAnswers[qIdx] !== undefined) return;
      b16UserAnswers[qIdx] = optIdx;
      renderB16QuestionStrip();
      renderB16CurrentQuestion(qIdx);

      const answeredCount = Object.keys(b16UserAnswers).length;
      const progressText = document.getElementById('b16-quiz-progress-text');
      if (progressText) {
        progressText.innerText = `Đã hoàn thành: ${answeredCount} / 7 câu`;
      }

      if (answeredCount === 7) {
        const scoreBoard = document.getElementById('b16-quiz-score-board');
        if (scoreBoard) scoreBoard.style.display = 'block';
      }
    }

    function resetB16QuizArena() {
      initB16QuizArena();
      const scoreBoard = document.getElementById('b16-quiz-score-board');
      if (scoreBoard) scoreBoard.style.display = 'none';
      const progressText = document.getElementById('b16-quiz-progress-text');
      if (progressText) progressText.innerText = 'Đã hoàn thành: 0 / 7 câu';
    }

    function resetB16InteractiveState() {
      if (currentPartB16 === 'part1') {
        b16SelectedNode = null;
        drawB16Mindmap();
      } else if (currentPartB16 === 'part2') {
        ['q1', 'q2', 'q3', 'q4'].forEach(k => {
          const el = document.getElementById('b16-cloze-' + k);
          if (el) {
            el.value = '';
            el.style.borderColor = '#cbd5e1';
            el.style.backgroundColor = '#ffffff';
          }
        });
        updateB16ClozeStatus();
      } else {
        resetB16QuizArena();
      }
    }



    /* ==========================================================
       BÀI 17: BIẾN THIÊN ENTHALPY TRONG CÁC PHẢN ỨNG HOÁ HỌC
       ========================================================== */
    let currentPartB17 = 'part1';

    function switchPartB17(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB17 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : (partId === 'part3' ? 'p3' : 'p4'));
      ['p1', 'p2', 'p3', 'p4'].forEach(p => {
        const btn = document.getElementById('tab-btn-b17-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3', 'part4'].forEach(p => {
        const sec = document.getElementById('content-b17-' + p);
        const panel = document.getElementById('panel-b17-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const tip = document.getElementById('b17-lab-status-tip');
      const hudTool = document.getElementById('b17-hud-tool');
      if (tip) {
        if (partId === 'part1') {
          tip.innerHTML = '💡 <em>Mô phỏng nhiệt kế: Quan sát cột thuỷ ngân tăng khi toả nhiệt và giảm khi thu nhiệt.</em>';
          if (hudTool) hudTool.innerText = 'Nhiệt Kế Đo Nhiệt Độ';
          setTimeout(initB17ThermoSim, 50);
        } else if (partId === 'part2') {
          tip.innerHTML = '💡 <em>Biểu đồ mức năng lượng: Quan sát sự chênh lệch enthalpy giữa Chất đầu và Sản phẩm.</em>';
          if (hudTool) hudTool.innerText = 'Biểu Đồ Năng Lượng';
          setTimeout(initB17EnergyProfile, 50);
        } else if (partId === 'part3') {
          tip.innerHTML = '💡 <em>Máy tính Nhiệt động học: Tra cứu và tính toán ΔrH°298 theo ΔfH° và Eb từng bước.</em>';
          if (hudTool) hudTool.innerText = 'Máy Tính Enthalpy';
          setTimeout(() => { calcB17Reaction('h2_cl2'); }, 50);
        } else {
          tip.innerHTML = '💡 <em>Đấu trường trắc nghiệm Bài 17: Kiểm tra độ hiểu bài về biến thiên enthalpy và nhiệt hoá học.</em>';
          if (hudTool) hudTool.innerText = 'Đấu Trường Trắc Nghiệm';
          renderB17QuizQuestion();
        }
      }
    }

    /* ĐẤU TRƯỜNG TRẮC NGHIỆM BÀI 17 */
    let b17QuizStep = 0;
    let b17QuizScore = 0;
    let b17QuizAnswered = false;

    const b17QuizList = [
      {
        q: "Câu 1: Phản ứng toả nhiệt (exothermic reaction) là phản ứng hoá học có đặc điểm nào sau đây?",
        options: [
          "Giải phóng nhiệt năng ra môi trường xung quanh, biến thiên enthalpy ΔrH°₂₉₈ < 0",
          "Hấp thụ nhiệt năng từ môi trường, biến thiên enthalpy ΔrH°₂₉₈ > 0",
          "Biến thiên enthalpy ΔrH°₂₉₈ = 0 và nhiệt độ môi trường giảm",
          "Chỉ xảy ra khi liên tục đun nóng ở nhiệt độ cao"
        ],
        ans: 0,
        explain: "Phản ứng toả nhiệt giải phóng nhiệt lượng ra môi trường làm môi trường nóng lên, hệ mất bớt nhiệt năng nên enthalpy giảm (ΔrH°₂₉₈ < 0). Ví dụ: phản ứng đốt than, trung hoà acid - base."
      },
      {
        q: "Câu 2: Theo quy ước quốc tế về nhiệt động hoá học, nhiệt tạo thành chuẩn (ΔfH°₂₉₈) của đơn chất bền nhất bằng bao nhiêu?",
        options: [
          "0 kJ/mol",
          "100 kJ/mol",
          "-298 kJ/mol",
          "Không xác định được"
        ],
        ans: 0,
        explain: "Nhiệt tạo thành chuẩn ΔfH°₂₉₈ của các đơn chất ở dạng bền vững nhất trong điều kiện chuẩn (như O₂(g), N₂(g), H₂(g), C(graphite)) được quy ước bằng 0 kJ/mol."
      },
      {
        q: "Câu 3: Điều kiện chuẩn trong nhiệt hoá học quy định áp suất và nhiệt độ là bao nhiêu?",
        options: [
          "Áp suất 1 bar, nhiệt độ 25 °C (298 K)",
          "Áp suất 1 atm, nhiệt độ 0 °C (273 K)",
          "Áp suất 760 mmHg, nhiệt độ 100 °C",
          "Áp suất 2 bar, nhiệt độ 25 °C"
        ],
        ans: 0,
        explain: "Theo IUPAC hiện hành, điều kiện chuẩn của chất khí hoặc dung dịch là áp suất 1 bar (10⁵ Pa), nồng độ 1 mol/L (đối với chất tan) và thường lấy ở nhiệt độ 25 °C (tức 298,15 K)."
      },
      {
        q: "Câu 4: Biến thiên enthalpy chuẩn của một phản ứng hoá học tính theo nhiệt tạo thành chuẩn (ΔfH°₂₉₈) tuân theo công thức nào?",
        options: [
          "ΔrH°₂₉₈ = ∑ ΔfH°₂₉₈(sản phẩm) - ∑ ΔfH°₂₉₈(chất đầu)",
          "ΔrH°₂₉₈ = ∑ ΔfH°₂₉₈(chất đầu) - ∑ ΔfH°₂₉₈(sản phẩm)",
          "ΔrH°₂₉₈ = ∑ ΔfH°₂₉₈(sản phẩm) + ∑ ΔfH°₂₉₈(chất đầu)",
          "ΔrH°₂₉₈ = [∑ ΔfH°₂₉₈(sản phẩm)] / [∑ ΔfH°₂₉₈(chất đầu)]"
        ],
        ans: 0,
        explain: "Công thức tính biến thiên enthalpy phản ứng theo nhiệt tạo thành: ΔrH°₂₉₈ = ∑ ΔfH°₂₉₈(sản phẩm) - ∑ ΔfH°₂₉₈(chất đầu) (lấy tổng nhiệt tạo thành của các chất sản phẩm trừ tổng nhiệt tạo thành của các chất tham gia, có nhân hệ số tỉ lượng)."
      },
      {
        q: "Câu 5: Cho phản ứng xảy ra ở thể khí: H₂(g) + Cl₂(g) → 2HCl(g). Biết năng lượng liên kết Eb(H-H) = 436 kJ/mol, Eb(Cl-Cl) = 242 kJ/mol, Eb(H-Cl) = 431 kJ/mol. Giá trị ΔrH°₂₉₈ của phản ứng là:",
        options: [
          "-184 kJ",
          "+184 kJ",
          "-92 kJ",
          "+92 kJ"
        ],
        ans: 0,
        explain: "Tính theo năng lượng liên kết: ΔrH°₂₉₈ = ∑ Eb(chất đầu) - ∑ Eb(sản phẩm) = [Eb(H-H) + Eb(Cl-Cl)] - 2×Eb(H-Cl) = (436 + 242) - 2×431 = 678 - 862 = -184 kJ. Dấu âm chứng tỏ đây là phản ứng toả nhiệt mạnh."
      }
    ];

    function renderB17QuizQuestion() {
      const q = b17QuizList[b17QuizStep];
      const titleEl = document.getElementById('b17-arena-q-title');
      const textEl = document.getElementById('b17-arena-question-text');
      const optListEl = document.getElementById('b17-arena-options-list');
      const feedEl = document.getElementById('b17-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b17-next-q');

      if (titleEl) titleEl.textContent = 'Câu hỏi ' + (b17QuizStep + 1) + ' / ' + b17QuizList.length;
      if (textEl) textEl.textContent = q.q;
      if (feedEl) feedEl.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';

      b17QuizAnswered = false;
      if (!optListEl) return;
      optListEl.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-tool';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.padding = '12px 16px';
        btn.style.fontSize = '14px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '12px';
        btn.innerHTML = '<strong style="color: #0284c7;">' + letters[idx] + '.</strong> <span>' + opt + '</span>';
        btn.onclick = () => submitB17QuizAnswer(idx);
        optListEl.appendChild(btn);
      });
    }

    function submitB17QuizAnswer(selectedIdx) {
      if (b17QuizAnswered) return;
      b17QuizAnswered = true;
      const q = b17QuizList[b17QuizStep];
      const isCorrect = (selectedIdx === q.ans);
      const feedEl = document.getElementById('b17-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b17-next-q');
      const scoreEl = document.getElementById('b17-arena-score');

      if (isCorrect) {
        b17QuizScore += 10;
        if (scoreEl) scoreEl.textContent = 'Điểm: ' + b17QuizScore + ' / 50';
      }

      if (feedEl) {
        feedEl.style.display = 'block';
        if (isCorrect) {
          feedEl.style.background = '#f0fdf4';
          feedEl.style.border = '1px solid #86efac';
          feedEl.style.color = '#15803d';
          feedEl.innerHTML = '<strong>✓ Chính xác!</strong> ' + q.explain;
        } else {
          feedEl.style.background = '#fef2f2';
          feedEl.style.border = '1px solid #fca5a5';
          feedEl.style.color = '#b91c1c';
          feedEl.innerHTML = '<strong>✗ Chưa chính xác.</strong> Đáp án đúng là <strong>' + ['A', 'B', 'C', 'D'][q.ans] + '</strong>.<br>' + q.explain;
        }
      }

      const optListEl = document.getElementById('b17-arena-options-list');
      if (optListEl) {
        const buttons = optListEl.querySelectorAll('button');
        buttons.forEach((btn, idx) => {
          btn.disabled = true;
          if (idx === q.ans) {
            btn.style.borderColor = '#16a34a';
            btn.style.background = '#f0fdf4';
            btn.style.color = '#15803d';
          } else if (idx === selectedIdx && !isCorrect) {
            btn.style.borderColor = '#dc2626';
            btn.style.background = '#fef2f2';
            btn.style.color = '#b91c1c';
          }
        });
      }

      if (nextBtn) {
        nextBtn.style.display = 'inline-block';
        if (b17QuizStep === b17QuizList.length - 1) {
          nextBtn.textContent = 'Hoàn thành đấu trường 🏆';
        } else {
          nextBtn.textContent = 'Câu tiếp theo →';
        }
      }
    }

    function nextB17Question() {
      if (b17QuizStep < b17QuizList.length - 1) {
        b17QuizStep++;
        renderB17QuizQuestion();
      } else {
        alert('Chúc mừng bạn đã hoàn thành Đấu trường Bài 17! Tổng điểm đạt được: ' + b17QuizScore + ' / 50.');
        b17QuizStep = 0;
        b17QuizScore = 0;
        const scoreEl = document.getElementById('b17-arena-score');
        if (scoreEl) scoreEl.textContent = 'Điểm: 0 / 50';
        renderB17QuizQuestion();
      }
    }

    // --- PART 1: THERMOMETER & HEAT FLOW SIMULATOR ---
    let b17ThermoAnimId = null;
    let b17SimMode = 'neutralize';
    let b17CurTemp = 25.0;
    let b17TargetTemp = 28.5;

    const b17ThermoConfigs = {
      'neutralize': {
        title: 'Phản ứng trung hoà: HCl + NaOH → NaCl + H₂O',
        type: 'Toả nhiệt (Exothermic)',
        initTemp: 25.0,
        targetTemp: 29.5,
        color: '#ef4444',
        desc: 'Nhiệt lượng giải phóng ra môi trường làm cốc ấm lên, cột thuỷ ngân dâng cao.'
      },
      'dissolve_c': {
        title: 'Hoà tan viên sủi Vitamin C vào nước',
        type: 'Thu nhiệt (Endothermic)',
        initTemp: 25.0,
        targetTemp: 19.5,
        color: '#0284c7',
        desc: 'Phản ứng hấp thụ nhiệt từ nước xung quanh, nhiệt độ giảm xuống làm nước mát lạnh.'
      },
      'combust': {
        title: 'Đốt cháy than đá: C + O₂ → CO₂',
        type: 'Toả nhiệt mãnh liệt (Exothermic)',
        initTemp: 25.0,
        targetTemp: 85.0,
        color: '#dc2626',
        desc: 'Nhiệt lượng toả ra cực lớn, phản ứng duy trì tự phát và phát sáng rực rỡ.'
      }
    };

    function setB17SimType(mode) {
      b17SimMode = mode;
      const conf = b17ThermoConfigs[mode];
      b17CurTemp = conf.initTemp;
      b17TargetTemp = conf.targetTemp;
      initB17ThermoSim();
    }

    function initB17ThermoSim() {
      const canvas = document.getElementById('b17ThermoCanvas');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 420) * dpr;

      if (b17ThermoAnimId) cancelAnimationFrame(b17ThermoAnimId);
      renderB17ThermoLoop();
    }

    function renderB17ThermoLoop() {
      const canvas = document.getElementById('b17ThermoCanvas');
      if (!canvas || currentPartB17 !== 'part1') return;

      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = canvas.getBoundingClientRect().width || 500;
      const ch = canvas.getBoundingClientRect().height || 420;

      // Animate temperature change smoothly
      b17CurTemp += (b17TargetTemp - b17CurTemp) * 0.04;

      const conf = b17ThermoConfigs[b17SimMode];

      // Draw Title and Status
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(conf.title, cw / 2, 34);

      ctx.fillStyle = conf.color;
      ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
      ctx.fillText(`${conf.type} • Nhiệt độ hiện thời: ${b17CurTemp.toFixed(1)}°C`, cw / 2, 58);

      ctx.fillStyle = '#64748b';
      ctx.font = '12px Plus Jakarta Sans, sans-serif';
      ctx.fillText(conf.desc, cw / 2, 80);

      // Draw Beaker (Left)
      const bx = cw * 0.32;
      const by = ch * 0.72;
      const bw = 140;
      const bh = 150;

      // Beaker glass
      ctx.fillStyle = 'rgba(224, 242, 254, 0.4)';
      ctx.fillRect(bx - bw/2, by - bh, bw, bh);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.strokeRect(bx - bw/2, by - bh, bw, bh);

      // Liquid inside beaker
      const liquidHeight = bh * 0.65;
      ctx.fillStyle = (b17SimMode === 'dissolve_c') ? 'rgba(56, 189, 248, 0.4)' : (b17SimMode === 'combust' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(245, 158, 11, 0.35)');
      ctx.fillRect(bx - bw/2 + 2, by - liquidHeight, bw - 4, liquidHeight);

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Hỗn hợp phản ứng', bx, by - 20);

      // Draw Thermometer (Right)
      const tx = cw * 0.74;
      const ty = ch * 0.72;
      const th = 180;
      const tw = 20;

      // Thermometer stem
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tx - tw/2, ty - th, tw, th);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(tx - tw/2, ty - th, tw, th);

      // Bulb
      ctx.beginPath();
      ctx.arc(tx, ty + 10, 18, 0, Math.PI * 2);
      ctx.fillStyle = conf.color;
      ctx.fill();
      ctx.stroke();

      // Mercury column
      const tempClamped = Math.max(0, Math.min(100, b17CurTemp));
      const mercuryHeight = (tempClamped / 100) * (th - 20);
      ctx.fillStyle = conf.color;
      ctx.fillRect(tx - (tw - 8)/2, ty - mercuryHeight, tw - 8, mercuryHeight);

      // Temperature scale ticks
      ctx.fillStyle = '#475569';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      for (let t = 0; t <= 100; t += 20) {
        const tickY = ty - (t / 100) * (th - 20);
        ctx.fillRect(tx + tw/2, tickY, 6, 1.5);
        ctx.fillText(t + '°C', tx + tw/2 + 10, tickY + 3);
      }

      ctx.restore();
      b17ThermoAnimId = requestAnimationFrame(renderB17ThermoLoop);
    }

    // --- PART 2: ENERGY PROFILE DIAGRAM ---
    let b17ProfileMode = 'exo';

    function setB17EnergyProfile(mode) {
      b17ProfileMode = mode;
      drawB17EnergyProfile();
    }

    function initB17EnergyProfile() {
      const canvas = document.getElementById('b17EnergyProfileCanvas');
      if (!canvas) return;

      window.removeEventListener('resize', drawB17EnergyProfile);
      window.addEventListener('resize', drawB17EnergyProfile);

      drawB17EnergyProfile();
    }

    function drawB17EnergyProfile() {
      const canvas = document.getElementById('b17EnergyProfileCanvas');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 420) * dpr;

      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = rect.width || 500;
      const ch = rect.height || 420;

      const isExo = (b17ProfileMode === 'exo');

      // Draw Axes
      const ox = 70;
      const oy = ch - 60;
      const axLenX = cw - 120;
      const axLenY = ch - 120;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Y axis
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox, oy - axLenY);
      // X axis
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + axLenX, oy);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12.5px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tiến trình phản ứng →', ox + axLenX / 2, oy + 36);

      ctx.save();
      ctx.translate(24, oy - axLenY / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Enthalpy (H) →', 0, 0);
      ctx.restore();

      // Energy Levels
      const reactantY = isExo ? (oy - axLenY * 0.7) : (oy - axLenY * 0.35);
      const productY = isExo ? (oy - axLenY * 0.25) : (oy - axLenY * 0.75);

      // Reactants line
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(ox + 30, reactantY);
      ctx.lineTo(ox + 130, reactantY);
      ctx.stroke();

      ctx.fillStyle = '#1d4ed8';
      ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Chất đầu', ox + 30, reactantY - 10);

      // Products line
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(ox + axLenX - 130, productY);
      ctx.lineTo(ox + axLenX - 30, productY);
      ctx.stroke();

      ctx.fillStyle = '#047857';
      ctx.font = 'bold 13px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Sản phẩm', ox + axLenX - 130, productY - 10);

      // Activation curve
      const peakY = Math.min(reactantY, productY) - 50;
      ctx.strokeStyle = isExo ? '#ef4444' : '#0284c7';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(ox + 130, reactantY);
      ctx.bezierCurveTo(ox + 180, reactantY, ox + axLenX / 2 - 40, peakY, ox + axLenX / 2, peakY);
      ctx.bezierCurveTo(ox + axLenX / 2 + 40, peakY, ox + axLenX - 180, productY, ox + axLenX - 130, productY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Delta H Arrow
      const arrowX = ox + axLenX - 80;
      ctx.strokeStyle = isExo ? '#dc2626' : '#2563eb';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(arrowX, reactantY);
      ctx.lineTo(arrowX, productY);
      ctx.stroke();

      // Arrowhead
      const ahY = productY;
      const ahDir = isExo ? 1 : -1;
      ctx.fillStyle = isExo ? '#dc2626' : '#2563eb';
      ctx.beginPath();
      ctx.moveTo(arrowX, ahY);
      ctx.lineTo(arrowX - 6, ahY - 8 * ahDir);
      ctx.lineTo(arrowX + 6, ahY - 8 * ahDir);
      ctx.closePath();
      ctx.fill();

      // Delta H Text
      ctx.font = 'bold 14px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      if (isExo) {
        ctx.fillStyle = '#dc2626';
        ctx.fillText('ΔrH°₂₉₈ < 0 (Toả nhiệt)', arrowX, (reactantY + productY) / 2);
      } else {
        ctx.fillStyle = '#2563eb';
        ctx.fillText('ΔrH°₂₉₈ > 0 (Thu nhiệt)', arrowX, (reactantY + productY) / 2);
      }

      ctx.restore();
    }

    // --- PART 3: ENTHALPY CALCULATOR ---
    const b17CalcDatabase = {
      'h2_cl2': {
        name: 'H₂(g) + Cl₂(g) → 2HCl(g)',
        method: 'Theo Năng Lượng Liên Kết (Eb)',
        formula: 'ΔrH°₂₉₈ = Eb(H-H) + Eb(Cl-Cl) - 2*Eb(H-Cl)',
        data: 'Eb(H-H) = 436 kJ/mol; Eb(Cl-Cl) = 243 kJ/mol; Eb(H-Cl) = 432 kJ/mol',
        calc: 'ΔrH°₂₉₈ = (436 + 243) - (2 * 432) = 679 - 864 = -185 kJ',
        result: '-185 kJ',
        conclusion: 'ΔrH°₂₉₈ = -185 kJ < 0 => Phản ứng toả nhiệt mạnh.'
      },
      'so2_o2': {
        name: 'SO₂(g) + ½O₂(g) → SO₃(l)',
        method: 'Theo Nhiệt Tạo Thành Chuẩn (ΔfH°₂₉₈)',
        formula: 'ΔrH°₂₉₈ = ΔfH°₂₉₈(SO₃) - [ΔfH°₂₉₈(SO₂) + ½*ΔfH°₂₉₈(O₂)]',
        data: 'ΔfH°₂₉₈(SO₃, l) = -441.0 kJ/mol; ΔfH°₂₉₈(SO₂, g) = -296.8 kJ/mol; ΔfH°₂₉₈(O₂, g) = 0 kJ/mol',
        calc: 'ΔrH°₂₉₈ = -441.0 - (-296.8 + 0) = -144.2 kJ',
        result: '-144.2 kJ',
        conclusion: 'ΔrH°₂₉₈ = -144.2 kJ < 0 => Phản ứng toả nhiệt.'
      },
      'ch4_o2': {
        name: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)',
        method: 'Theo Nhiệt Tạo Thành Chuẩn (Đốt cháy Methane)',
        formula: 'ΔrH°₂₉₈ = [ΔfH°(CO₂) + 2*ΔfH°(H₂O)] - [ΔfH°(CH₄) + 2*ΔfH°(O₂)]',
        data: 'ΔfH°(CO₂) = -393.5 kJ/mol; ΔfH°(H₂O, l) = -285.8 kJ/mol; ΔfH°(CH₄) = -74.8 kJ/mol',
        calc: 'ΔrH°₂₉₈ = [-393.5 + 2*(-285.8)] - [-74.8 + 0] = -965.1 - (-74.8) = -890.3 kJ',
        result: '-890.3 kJ',
        conclusion: 'ΔrH°₂₉₈ = -890.3 kJ < 0 => Khí methane là nhiên liệu cháy toả nhiệt rất lớn!'
      },
      'caco3': {
        name: 'CaCO₃(s) → CaO(s) + CO₂(g) (Nung vôi)',
        method: 'Theo Nhiệt Tạo Thành Chuẩn (Thu nhiệt nung)',
        formula: 'ΔrH°₂₉₈ = [ΔfH°(CaO) + ΔfH°(CO₂)] - ΔfH°(CaCO₃)',
        data: 'ΔfH°(CaO) = -635.1 kJ/mol; ΔfH°(CO₂) = -393.5 kJ/mol; ΔfH°(CaCO₃) = -1206.9 kJ/mol',
        calc: 'ΔrH°₂₉₈ = [-635.1 + (-393.5)] - [-1206.9] = -1028.6 + 1206.9 = +178.3 kJ',
        result: '+178.3 kJ',
        conclusion: 'ΔrH°₂₉₈ = +178.3 kJ > 0 => Phản ứng thu nhiệt (phải đốt than liên tục để nung đá vôi).'
      }
    };

    function calcB17Reaction(key) {
      const item = b17CalcDatabase[key];
      if (!item) return;

      const card = document.getElementById('b17-calc-display-card');
      if (!card) return;

      const isExo = item.result.includes('-');

      card.innerHTML = `
        <div style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 12px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: #0f172a;">${item.name}</h3>
            <span style="font-size: 12px; font-weight: 700; color: #0284c7;">${item.method}</span>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 20px; font-weight: 800; color: ${isExo ? '#dc2626' : '#2563eb'};">${item.result}</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #334155; line-height: 1.5;">
          <div><strong>1. Biểu thức áp dụng:</strong> <span style="font-family: 'JetBrains Mono', monospace; color: #0284c7;">${item.formula}</span></div>
          <div><strong>2. Dữ liệu nhiệt động:</strong> <span style="font-size: 12.5px; color: #475569;">${item.data}</span></div>
          <div><strong>3. Quá trình tính:</strong> <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #0f172a;">${item.calc}</span></div>
          <div style="margin-top: 6px; padding: 10px; border-radius: 6px; background: ${isExo ? '#fef2f2' : '#eff6ff'}; border-left: 4px solid ${isExo ? '#ef4444' : '#3b82f6'}; font-weight: 700; color: ${isExo ? '#b91c1c' : '#1d4ed8'};">
            ${item.conclusion}
          </div>
        </div>
      `;
    }

    function resetB17InteractiveState() {
      if (currentPartB17 === 'part1') {
        setB17SimType('neutralize');
      } else if (currentPartB17 === 'part2') {
        setB17EnergyProfile('exo');
      } else {
        calcB17Reaction('h2_cl2');
      }
    }



    /* ==========================================================
       BÀI 18: ÔN TẬP VÀ LUYỆN TẬP CHƯƠNG 5 (NĂNG LƯỢNG HOÁ HỌC)
       ========================================================== */
    let currentPartB18 = 'part1';

    function switchPartB18(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB18 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b18-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b18-' + p);
        const panel = document.getElementById('panel-b18-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const tip = document.getElementById('b18-lab-status-tip');
      if (tip) {
        if (partId === 'part1') tip.innerHTML = '💡 <em>Sơ đồ tư duy 2.5D: Bấm vào từng nhánh để xem tóm tắt nhiệt động hoá học.</em>';
        else if (partId === 'part2') tip.innerHTML = '💡 <em>Điền khuyết công thức SGK Trang 90: Kiểm tra độ chuẩn xác của công thức ΔfH° và Eb.</em>';
        else tip.innerHTML = '💡 <em>Đấu trường 8 bài tập SGK Trang 90 – 91: Tính toán nhiệt phản ứng và giá trị năng lượng thực tiễn.</em>';
      }

      if (partId === 'part1') {
        setTimeout(drawB18Mindmap, 50);
      }
    }

    // --- PART 1: 2.5D MINDMAP LOGIC ---
    let b18SelectedNode = null;
    const b18MindmapNodes = [
      { id: 'center', label: 'NĂNG LƯỢNG HOÁ HỌC', x: 0.5, y: 0.5, r: 66, color: '#0284c7', desc: 'Biến thiên nhiệt lượng trong phản ứng hoá học ở điều kiện áp suất không đổi (Chương 5).' },
      { id: 'exo', label: '1. Phản ứng Toả nhiệt', x: 0.2, y: 0.24, r: 52, color: '#ef4444', desc: 'ΔrH°₂₉₈ < 0. Giải phóng nhiệt ra môi trường, sản phẩm bền hơn chất đầu.' },
      { id: 'endo', label: '2. Phản ứng Thu nhiệt', x: 0.8, y: 0.24, r: 52, color: '#3b82f6', desc: 'ΔrH°₂₉₈ > 0. Hấp thụ nhiệt từ môi trường, chất đầu bền hơn sản phẩm.' },
      { id: 'delta_f', label: '3. Theo Nhiệt tạo thành', x: 0.2, y: 0.76, r: 52, color: '#10b981', desc: 'ΔrH°₂₉₈ = ΣΔfH°(sản phẩm) - ΣΔfH°(chất đầu). Đơn chất bền nhất có ΔfH° = 0.' },
      { id: 'eb', label: '4. Theo Năng lượng liên kết', x: 0.8, y: 0.76, r: 52, color: '#f59e0b', desc: 'ΔrH°₂₉₈ = ΣEb(chất đầu) - ΣEb(sản phẩm) (áp dụng cho các chất ở thể khí).' }
    ];

    function initB18Mindmap() {
      const canvas = document.getElementById('b18MindmapCanvas');
      if (!canvas) return;

      canvas.removeEventListener('click', handleB18CanvasClick);
      canvas.addEventListener('click', handleB18CanvasClick);

      window.removeEventListener('resize', resizeB18Mindmap);
      window.addEventListener('resize', resizeB18Mindmap);

      resizeB18Mindmap();
    }

    function resizeB18Mindmap() {
      const canvas = document.getElementById('b18MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 450) * dpr;
      drawB18Mindmap();
    }

    function handleB18CanvasClick(e) {
      const canvas = document.getElementById('b18MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let found = null;
      for (const node of b18MindmapNodes) {
        const nx = node.x * rect.width;
        const ny = node.y * rect.height;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist <= node.r) {
          found = node;
          break;
        }
      }
      b18SelectedNode = found;
      drawB18Mindmap();
    }

    function drawB18Mindmap() {
      const canvas = document.getElementById('b18MindmapCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = rect.width || 500;
      const ch = rect.height || 450;

      // Draw connections
      const centerNode = b18MindmapNodes[0];
      const cx = centerNode.x * cw;
      const cy = centerNode.y * ch;

      for (let i = 1; i < b18MindmapNodes.length; i++) {
        const node = b18MindmapNodes[i];
        const nx = node.x * cw;
        const ny = node.y * ch;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = (b18SelectedNode && b18SelectedNode.id === node.id) ? 3.5 : 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw nodes
      for (const node of b18MindmapNodes) {
        const nx = node.x * cw;
        const ny = node.y * ch;
        const isSelected = (b18SelectedNode && b18SelectedNode.id === node.id);

        ctx.save();
        ctx.shadowColor = isSelected ? node.color : 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = isSelected ? 18 : 8;
        ctx.shadowOffsetY = 4;

        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.lineWidth = isSelected ? 4 : 2.5;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.restore();

        ctx.font = node.id === 'center' ? 'bold 12.5px Plus Jakarta Sans, sans-serif' : '600 12px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = node.id === 'center' ? '#0f172a' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      }

      // Tooltip / Details box
      if (b18SelectedNode) {
        const boxW = Math.min(cw - 32, 420);
        const boxH = 64;
        const bx = (cw - boxW) / 2;
        const by = ch - boxH - 14;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 10);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = b18SelectedNode.color;
        ctx.stroke();

        ctx.font = 'bold 12.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = b18SelectedNode.color;
        ctx.textAlign = 'left';
        ctx.fillText(b18SelectedNode.label, bx + 14, by + 22);

        ctx.font = '11.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(b18SelectedNode.desc, bx + 14, by + 44);
        ctx.restore();
      }

      ctx.restore();
    }

    // --- PART 2: CLOZE LAB (SGK TRANG 90) ---
    const b18ClozeAnswers = {
      q1: 'toả',
      q2: 'thu',
      q3: 'ΣΔfH°(sp) - ΣΔfH°(cđ)',
      q4: 'ΣEb(cđ) - ΣEb(sp)'
    };

    function initB18ClozeLab() {
      updateB18ClozeStatus();
    }

    function checkB18Cloze() {
      let correctCount = 0;
      for (const [key, val] of Object.entries(b18ClozeAnswers)) {
        const sel = document.getElementById('b18-cloze-' + key);
        if (sel) {
          if (sel.value === val) {
            sel.style.borderColor = '#16a34a';
            sel.style.backgroundColor = '#f0fdf4';
            correctCount++;
          } else if (sel.value !== '') {
            sel.style.borderColor = '#dc2626';
            sel.style.backgroundColor = '#fef2f2';
          }
        }
      }

      const board = document.getElementById('b18-cloze-status-board');
      if (board) {
        if (correctCount === 4) {
          board.innerHTML = `<div style="color: #166534; font-weight: 700; font-size: 14px;">✨ Hoàn thành xuất sắc: 4/4 công thức chính xác!</div>
          <p style="margin: 6px 0 0 0; color: #1e293b;">Bạn đã nắm rất vững: ΔrH° < 0 là Toả nhiệt, ΔrH° > 0 là Thu nhiệt, ΔfH° lấy Sau trừ Trước, Eb lấy Trước trừ Sau.</p>`;
        } else {
          board.innerHTML = `<div style="color: #0284c7; font-weight: 700;">Tiến độ: Đúng ${correctCount}/4 ô</div>
          <p style="margin: 6px 0 0 0; color: #475569;">Gợi ý: Hãy chú ý thứ tự trừ của Nhiệt tạo thành (Sản phẩm - Chất đầu) vs Năng lượng liên kết (Chất đầu - Sản phẩm).</p>`;
        }
      }
    }

    function updateB18ClozeStatus() {
      const board = document.getElementById('b18-cloze-status-board');
      if (board) {
        board.innerHTML = `<div style="color: #64748b;">Chưa kiểm tra. Hãy chọn giá trị thích hợp trong 4 ô trống ở cột bên trái rồi bấm <strong>"Kiểm tra kết quả"</strong>.</div>`;
      }
    }

    // --- PART 3: QUIZ ARENA 8 BÀI TẬP SGK TRANG 90 - 91 ---
    const b18QuizData = [
      {
        id: 1,
        title: 'Câu 1 (SGK Tr. 90): Thù hình Phosphorus',
        question: 'Phản ứng: P(s, đỏ) → P(s, trắng) có ΔrH°₂₉₈ = +17.6 kJ. Điều này chứng tỏ:',
        options: [
          'A. Phản ứng thu nhiệt, P đỏ bền hơn P trắng',
          'B. Phản ứng thu nhiệt, P trắng bền hơn P đỏ',
          'C. Phản ứng toả nhiệt, P đỏ bền hơn P trắng',
          'D. Phản ứng toả nhiệt, P trắng bền hơn P đỏ'
        ],
        answer: 0,
        explanation: 'ΔrH°₂₉₈ = +17.6 kJ > 0 là phản ứng thu nhiệt. Hệ có mức năng lượng thấp hơn (P đỏ) sẽ có độ bền nhiệt động học cao hơn dạng có mức năng lượng cao hơn (P trắng).'
      },
      {
        id: 2,
        title: 'Câu 2 (SGK Tr. 90): Nhiệt tạo thành CO',
        question: 'Biết CO(g) + ½O₂(g) → CO₂(g) có ΔrH°₂₉₈ = -283.0 kJ và ΔfH°₂₉₈(CO₂) = -393.5 kJ/mol. Nhiệt tạo thành chuẩn của CO(g) là:',
        options: [
          'A. -110.5 kJ/mol',
          'B. +110.5 kJ/mol',
          'C. -676.5 kJ/mol',
          'D. +676.5 kJ/mol'
        ],
        answer: 0,
        explanation: 'Công thức: ΔrH° = ΔfH°(CO₂) - [ΔfH°(CO) + ½ΔfH°(O₂)]. Ta có: -283.0 = -393.5 - ΔfH°(CO) => ΔfH°(CO) = -393.5 - (-283.0) = -110.5 kJ/mol.'
      },
      {
        id: 3,
        title: 'Câu 3 (SGK Tr. 90): Truyền dịch Glucose y tế',
        question: 'Dung dịch glucose 5% (D = 1.02 g/mL), oxi hoá 1 mol glucose toả ra 2803 kJ. Năng lượng tối đa người bệnh nhận được khi truyền một chai 500 mL glucose 5% là:',
        options: [
          'A. 397.09 kJ',
          'B. -397.09 kJ',
          'C. 389.31 kJ',
          'D. 412.50 kJ'
        ],
        answer: 0,
        explanation: 'm_dd = 500 * 1.02 = 510 g => m_glucose = 510 * 5% = 25.5 g => n_glucose = 25.5 / 180 = 0.14167 mol. Năng lượng nhận được: 0.14167 * 2803 ≈ 397.09 kJ.'
      },
      {
        id: 4,
        title: 'Câu 4 (SGK Tr. 91): Cracking butane',
        question: 'Cho Eb: C-H (414), C-C (347), C=C (611 kJ/mol). Biến thiên enthalpy của phản ứng cracking C₄H₁₀(g) → C₂H₆(g) + C₂H₄(g) là:',
        options: [
          'A. +80 kJ',
          'B. -80 kJ',
          'C. +120 kJ',
          'D. -120 kJ'
        ],
        answer: 0,
        explanation: 'Chất đầu C₄H₁₀ có 3 liên kết C-C và 10 liên kết C-H. Sản phẩm C₂H₆ (1 C-C, 6 C-H) và C₂H₄ (1 C=C, 4 C-H). ΔrH° = [3*Eb(C-C) + 10*Eb(C-H)] - [1*Eb(C-C) + 1*Eb(C=C) + 10*Eb(C-H)] = 2*Eb(C-C) - Eb(C=C) = 2*347 - 611 = 694 - 611 = +83 kJ (gần nhất với +80 kJ theo bảng dữ liệu chuẩn SGK).'
      },
      {
        id: 5,
        title: 'Câu 5 (SGK Tr. 91): Đốt cháy Methane',
        question: 'Đốt cháy methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) có ΔrH°₂₉₈ = -890.3 kJ. Cho ΔfH°(CO₂) = -393.5 kJ/mol, ΔfH°(H₂O, l) = -285.8 kJ/mol. Nhiệt tạo thành của CH₄ là:',
        options: [
          'A. -74.8 kJ/mol',
          'B. +74.8 kJ/mol',
          'C. -120.5 kJ/mol',
          'D. -965.1 kJ/mol'
        ],
        answer: 0,
        explanation: 'Ta có: -890.3 = [-393.5 + 2*(-285.8)] - ΔfH°(CH₄) => ΔfH°(CH₄) = -965.1 - (-890.3) = -74.8 kJ/mol.'
      },
      {
        id: 6,
        title: 'Câu 6 (SGK Tr. 91): Cồn vs Mỡ lợn (Tristearin)',
        question: 'So sánh nhiệt toả ra khi đốt cháy 1 kg cồn (C₂H₅OH, M=46) so với 1 kg tristearin (C₅₇H₁₁₀O₆, M=890 có trong mỡ lợn):',
        options: [
          'A. 1 kg mỡ lợn toả ra nhiệt lượng lớn hơn nhiều (≈39958 kJ vs ≈29713 kJ)',
          'B. 1 kg cồn toả ra nhiệt lượng lớn hơn',
          'C. Cả 2 toả ra nhiệt lượng bằng nhau',
          'D. Tristearin không cháy toả nhiệt'
        ],
        answer: 0,
        explanation: '1 kg cồn = 1000/46 mol => toả (1000/46)*1367 ≈ 29717 kJ. 1 kg tristearin = 1000/890 mol => toả (1000/890)*35563 ≈ 39958 kJ. Mỡ lợn (chất béo) cung cấp mật độ năng lượng trên mỗi kg cao hơn cồn.'
      },
      {
        id: 7,
        title: 'Câu 7 (SGK Tr. 91): Đốt cháy Acetone',
        question: 'Biến thiên enthalpy của phản ứng đốt cháy acetone CH₃COCH₃(g) + 4O₂(g) → 3CO₂(g) + 3H₂O(g) có giá trị âm lớn biểu thị:',
        options: [
          'A. Phản ứng toả nhiệt lượng rất lớn',
          'B. Phản ứng thu nhiệt',
          'C. Acetone không phản ứng với oxy',
          'D. Phản ứng không có biến thiên năng lượng'
        ],
        answer: 0,
        explanation: 'Đốt cháy các hợp chất hữu cơ dễ bay hơi như acetone luôn có ΔrH° << 0, giải phóng nhiệt lượng lớn và tạo ra CO₂, H₂O thể hơi.'
      },
      {
        id: 8,
        title: 'Câu 8 (SGK Tr. 91): Tính ngày dùng bình gas 12 kg LPG',
        question: 'Bình gas 12 kg (propane : butane tỉ lệ 1:2 về số mol). Mỗi ngày hộ gia đình cần 10000 kJ (hiệu suất 80% => tiêu thụ 12500 kJ nhiệt gas). Bình gas dùng được trong khoảng:',
        options: [
          'A. Khoảng 47 - 48 ngày',
          'B. Khoảng 30 ngày',
          'C. Khoảng 60 ngày',
          'D. Khoảng 25 ngày'
        ],
        answer: 0,
        explanation: 'Gọi x là n_propane => n_butane = 2x. Khối lượng: 44x + 58*(2x) = 160x = 12000 g => x = 75 mol. Nhiệt toả: 75*2220 + 150*2877 = 166500 + 431550 = 598050 kJ. Nhiệt thực dùng: 598050 * 80% = 478440 kJ. Số ngày: 478440 / 10000 ≈ 47.8 ngày.'
      }
    ];

    let b18UserAnswers = {};

    function initB18QuizArena() {
      b18UserAnswers = {};
      renderB18QuestionStrip();
      renderB18CurrentQuestion(0);
    }

    function renderB18QuestionStrip() {
      const strip = document.getElementById('b18-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = b18QuizData.map((q, idx) => {
        const isAnswered = b18UserAnswers[idx] !== undefined;
        const isCorrect = isAnswered && (b18UserAnswers[idx] === q.answer);
        let bg = '#f1f5f9';
        let color = '#475569';
        if (isAnswered) {
          bg = isCorrect ? '#dcfce7' : '#fee2e2';
          color = isCorrect ? '#166534' : '#991b1b';
        }
        return `<button onclick="renderB18CurrentQuestion(${idx})" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: ${bg}; color: ${color}; font-weight: 700; font-size: 12px; cursor: pointer;">Câu ${idx + 1}</button>`;
      }).join('');
    }

    function renderB18CurrentQuestion(idx) {
      const q = b18QuizData[idx];
      const leftCol = document.getElementById('b18-quiz-active-question-card');
      if (!leftCol) return;

      const userChoice = b18UserAnswers[idx];
      const isAnswered = userChoice !== undefined;

      let optsHtml = q.options.map((opt, optIdx) => {
        let optStyle = 'padding: 10px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; margin-bottom: 8px; cursor: pointer; font-size: 13px; transition: all 0.15s; background: #ffffff;';
        if (isAnswered) {
          if (optIdx === q.answer) {
            optStyle += ' border-color: #16a34a; background: #f0fdf4; color: #166534; font-weight: 700;';
          } else if (optIdx === userChoice) {
            optStyle += ' border-color: #dc2626; background: #fef2f2; color: #991b1b;';
          }
        }
        return `<div onclick="handleB18Answer(${idx}, ${optIdx})" style="${optStyle}">${opt}</div>`;
      }).join('');

      let feedbackHtml = '';
      if (isAnswered) {
        const isCorrect = userChoice === q.answer;
        feedbackHtml = `
          <div style="margin-top: 14px; padding: 12px; border-radius: 8px; background: ${isCorrect ? '#f0fdf4' : '#fffbeb'}; border-left: 4px solid ${isCorrect ? '#16a34a' : '#f59e0b'};">
            <div style="font-weight: 700; color: ${isCorrect ? '#166534' : '#b45309'};">
              ${isCorrect ? '✅ Chính xác!' : '⚠️ Chưa chính xác!'}
            </div>
            <div style="font-size: 12.5px; color: #334155; margin-top: 4px; line-height: 1.5;">
              <strong>Giải thích chi tiết:</strong> ${q.explanation}
            </div>
          </div>
        `;
      }

      leftCol.innerHTML = `
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: #0284c7; font-size: 14px;">${q.title}</span>
          <span style="font-size: 12px; color: #64748b;">Câu ${idx + 1} / 8</span>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 14px;">
          ${q.question}
        </div>
        <div>
          ${optsHtml}
        </div>
        ${feedbackHtml}
      `;
    }

    function handleB18Answer(qIdx, optIdx) {
      if (b18UserAnswers[qIdx] !== undefined) return;
      b18UserAnswers[qIdx] = optIdx;
      renderB18QuestionStrip();
      renderB18CurrentQuestion(qIdx);

      const answeredCount = Object.keys(b18UserAnswers).length;
      const progressText = document.getElementById('b18-quiz-progress-text');
      if (progressText) {
        progressText.innerText = `Đã hoàn thành: ${answeredCount} / 8 câu`;
      }

      if (answeredCount === 8) {
        const scoreBoard = document.getElementById('b18-quiz-score-board');
        if (scoreBoard) scoreBoard.style.display = 'block';
      }
    }

    function resetB18QuizArena() {
      initB18QuizArena();
      const scoreBoard = document.getElementById('b18-quiz-score-board');
      if (scoreBoard) scoreBoard.style.display = 'none';
      const progressText = document.getElementById('b18-quiz-progress-text');
      if (progressText) progressText.innerText = 'Đã hoàn thành: 0 / 8 câu';
    }

    function resetB18InteractiveState() {
      if (currentPartB18 === 'part1') {
        b18SelectedNode = null;
        drawB18Mindmap();
      } else if (currentPartB18 === 'part2') {
        ['q1', 'q2', 'q3', 'q4'].forEach(k => {
          const el = document.getElementById('b18-cloze-' + k);
          if (el) {
            el.value = '';
            el.style.borderColor = '#cbd5e1';
            el.style.backgroundColor = '#ffffff';
          }
        });
        updateB18ClozeStatus();
      } else {
        resetB18QuizArena();
      }
    }



    /* ==========================================================
       BÀI 19: TỐC ĐỘ PHẢN ỨNG HOÁ HỌC
       ========================================================== */
    let currentPartB19 = 'part1';

    function switchPartB19(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB19 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : (partId === 'part3' ? 'p3' : 'p4'));
      ['p1', 'p2', 'p3', 'p4'].forEach(p => {
        const btn = document.getElementById('tab-btn-b19-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3', 'part4'].forEach(p => {
        const sec = document.getElementById('content-b19-' + p);
        const panel = document.getElementById('panel-b19-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const tip = document.getElementById('b19-lab-status-tip');
      const hudTool = document.getElementById('b19-hud-tool');
      if (tip) {
        if (partId === 'part1') {
          tip.innerHTML = '💡 <em>Đồ thị nồng độ giảm dần của chất đầu (đường cong đi xuống) và nồng độ tăng dần của sản phẩm.</em>';
          if (hudTool) hudTool.innerText = 'Đồ Thị Nồng Độ - Thời Gian';
          setTimeout(initB19KineticsGraph, 50);
        } else if (partId === 'part2') {
          tip.innerHTML = '💡 <em>Mô phỏng Guldberg - Waage: Kéo thanh trượt nồng độ để thấy tốc độ tức thời thay đổi theo luỹ thừa bậc 2.</em>';
          if (hudTool) hudTool.innerText = 'Định Luật Khối Lượng';
          setTimeout(updateB19RateCalc, 50);
        } else if (partId === 'part3') {
          tip.innerHTML = '💡 <em>Quy tắc Van't Hoff: Xem tốc độ tăng vọt theo cấp số nhân và thời gian phản ứng rút ngắn ngoạn mục.</em>';
          if (hudTool) hudTool.innerText = 'Máy Tính Van't Hoff';
          setTimeout(calcB19Vanthoff, 50);
        } else {
          tip.innerHTML = '💡 <em>Đấu trường trắc nghiệm Bài 19: Luyện tập tốc độ phản ứng, Guldberg - Waage và Van't Hoff.</em>';
          if (hudTool) hudTool.innerText = 'Đấu Trường Trắc Nghiệm';
          renderB19QuizQuestion();
        }
      }
    }

    /* ĐẤU TRƯỜNG TRẮC NGHIỆM BÀI 19 */
    let b19QuizStep = 0;
    let b19QuizScore = 0;
    let b19QuizAnswered = false;

    const b19QuizList = [
      {
        q: "Câu 1: Tốc độ phản ứng hoá học là đại lượng đặc trưng cho:",
        options: [
          "Sự biến thiên nồng độ của một trong các chất phản ứng hoặc sản phẩm trong một đơn vị thời gian",
          "Thời gian cần thiết để một phản ứng hoá học xảy ra hoàn toàn",
          "Lượng chất phản ứng tham gia trong toàn bộ quá trình phản ứng",
          "Số mol chất sản phẩm thu được khi phản ứng kết thúc"
        ],
        ans: 0,
        explain: "Tốc độ phản ứng là đại lượng đặc trưng cho mức độ nhanh hay chậm của phản ứng hoá học, được đo bằng độ biến thiên lượng chất (thường là nồng độ mol/L) của chất phản ứng hoặc sản phẩm trong một đơn vị thời gian (s hoặc phút)."
      },
      {
        q: "Câu 2: Với phản ứng đơn giản: aA + bB → Sản phẩm. Biểu thức định luật tác dụng khối lượng Guldberg – Waage biểu diễn tốc độ tức thời v là:",
        options: [
          "v = k · C_A^a · C_B^b",
          "v = k · (C_A + C_B)",
          "v = k · (C_A / C_B)",
          "v = k · a · b · C_A · C_B"
        ],
        ans: 0,
        explain: "Định luật tác dụng khối lượng (Guldberg – Waage): Ở nhiệt độ không đổi, tốc độ phản ứng hoá học tỉ lệ thuận với tích số nồng độ các chất phản ứng nâng lên các luỹ thừa bằng hệ số tỉ lượng tương ứng trong phương trình hoá học: v = k · C_A^a · C_B^b."
      },
      {
        q: "Câu 3: Hằng số tốc độ phản ứng k phụ thuộc vào yếu tố nào sau đây?",
        options: [
          "Bản chất của phản ứng và nhiệt độ (không phụ thuộc nồng độ chất phản ứng)",
          "Nồng độ của các chất tham gia phản ứng",
          "Thời gian xảy ra phản ứng",
          "Thể tích bình chứa phản ứng"
        ],
        ans: 0,
        explain: "Hằng số tốc độ k là hằng số ở nhiệt độ xác định, chỉ phụ thuộc vào bản chất của các chất phản ứng và nhiệt độ, không phụ thuộc vào nồng độ của các chất tham gia."
      },
      {
        q: "Câu 4: Khi dùng than củi để đun nấu, việc đập nhỏ than thành những miếng vừa phải trước khi nhóm lửa nhằm mục đích gì?",
        options: [
          "Làm tăng diện tích tiếp xúc bề mặt giữa than và oxygen, giúp than cháy nhanh và mạnh hơn",
          "Làm tăng nồng độ của khí oxygen trong không khí",
          "Làm giảm nhiệt độ cháy của carbon",
          "Làm tăng áp suất bên trong lò than"
        ],
        ans: 0,
        explain: "Đập nhỏ than làm tăng diện tích bề mặt tiếp xúc giữa chất rắn (C) và chất khí (O₂), làm tăng số va chạm hiệu quả giữa các phân tử, do đó tốc độ phản ứng cháy tăng lên rõ rệt."
      },
      {
        q: "Câu 5: Một phản ứng hoá học có hệ số nhiệt độ Van't Hoff γ = 2. Khi tăng nhiệt độ từ 20 °C lên 50 °C (tăng thêm 30 °C), tốc độ phản ứng tăng lên bao nhiêu lần?",
        options: [
          "8 lần",
          "6 lần",
          "3 lần",
          "16 lần"
        ],
        ans: 0,
        explain: "Theo quy tắc Van't Hoff: v_T2 / v_T1 = γ^((T2 - T1) / 10) = 2^((50 - 20) / 10) = 2^3 = 8 lần. Tốc độ phản ứng tăng 8 lần, đồng thời thời gian để phản ứng xảy ra rút ngắn đi 8 lần."
      }
    ];

    function renderB19QuizQuestion() {
      const q = b19QuizList[b19QuizStep];
      const titleEl = document.getElementById('b19-arena-q-title');
      const textEl = document.getElementById('b19-arena-question-text');
      const optListEl = document.getElementById('b19-arena-options-list');
      const feedEl = document.getElementById('b19-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b19-next-q');

      if (titleEl) titleEl.textContent = 'Câu hỏi ' + (b19QuizStep + 1) + ' / ' + b19QuizList.length;
      if (textEl) textEl.textContent = q.q;
      if (feedEl) feedEl.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';

      b19QuizAnswered = false;
      if (!optListEl) return;
      optListEl.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-tool';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.padding = '12px 16px';
        btn.style.fontSize = '14px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '12px';
        btn.innerHTML = '<strong style="color: #0284c7;">' + letters[idx] + '.</strong> <span>' + opt + '</span>';
        btn.onclick = () => submitB19QuizAnswer(idx);
        optListEl.appendChild(btn);
      });
    }

    function submitB19QuizAnswer(selectedIdx) {
      if (b19QuizAnswered) return;
      b19QuizAnswered = true;
      const q = b19QuizList[b19QuizStep];
      const isCorrect = (selectedIdx === q.ans);
      const feedEl = document.getElementById('b19-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b19-next-q');
      const scoreEl = document.getElementById('b19-arena-score');

      if (isCorrect) {
        b19QuizScore += 10;
        if (scoreEl) scoreEl.textContent = 'Điểm: ' + b19QuizScore + ' / 50';
      }

      if (feedEl) {
        feedEl.style.display = 'block';
        if (isCorrect) {
          feedEl.style.background = '#f0fdf4';
          feedEl.style.border = '1px solid #86efac';
          feedEl.style.color = '#15803d';
          feedEl.innerHTML = '<strong>✓ Chính xác!</strong> ' + q.explain;
        } else {
          feedEl.style.background = '#fef2f2';
          feedEl.style.border = '1px solid #fca5a5';
          feedEl.style.color = '#b91c1c';
          feedEl.innerHTML = '<strong>✗ Chưa chính xác.</strong> Đáp án đúng là <strong>' + ['A', 'B', 'C', 'D'][q.ans] + '</strong>.<br>' + q.explain;
        }
      }

      const optListEl = document.getElementById('b19-arena-options-list');
      if (optListEl) {
        const buttons = optListEl.querySelectorAll('button');
        buttons.forEach((btn, idx) => {
          btn.disabled = true;
          if (idx === q.ans) {
            btn.style.borderColor = '#16a34a';
            btn.style.background = '#f0fdf4';
            btn.style.color = '#15803d';
          } else if (idx === selectedIdx && !isCorrect) {
            btn.style.borderColor = '#dc2626';
            btn.style.background = '#fef2f2';
            btn.style.color = '#b91c1c';
          }
        });
      }

      if (nextBtn) {
        nextBtn.style.display = 'inline-block';
        if (b19QuizStep === b19QuizList.length - 1) {
          nextBtn.textContent = 'Hoàn thành đấu trường 🏆';
        } else {
          nextBtn.textContent = 'Câu tiếp theo →';
        }
      }
    }

    function nextB19Question() {
      if (b19QuizStep < b19QuizList.length - 1) {
        b19QuizStep++;
        renderB19QuizQuestion();
      } else {
        alert('Chúc mừng bạn đã hoàn thành Đấu trường Bài 19! Tổng điểm đạt được: ' + b19QuizScore + ' / 50.');
        b19QuizStep = 0;
        b19QuizScore = 0;
        const scoreEl = document.getElementById('b19-arena-score');
        if (scoreEl) scoreEl.textContent = 'Điểm: 0 / 50';
        renderB19QuizQuestion();
      }
    }

    // --- PART 1: KINETICS GRAPH ---
    let b19KinReac = 'h2o2';

    function setB19KineticsReaction(key) {
      b19KinReac = key;
      drawB19Kinetics();
    }

    function initB19KineticsGraph() {
      const canvas = document.getElementById('b19KineticsCanvas');
      if (!canvas) return;

      window.removeEventListener('resize', drawB19Kinetics);
      window.addEventListener('resize', drawB19Kinetics);

      drawB19Kinetics();
    }

    function drawB19Kinetics() {
      const canvas = document.getElementById('b19KineticsCanvas');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 420) * dpr;

      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = rect.width || 500;
      const ch = rect.height || 420;

      // Draw Axes
      const ox = 60;
      const oy = ch - 50;
      const axLenX = cw - 100;
      const axLenY = ch - 100;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Y axis
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox, oy - axLenY);
      // X axis
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + axLenX, oy);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Thời gian (giây) →', ox + axLenX / 2, oy + 36);

      ctx.save();
      ctx.translate(20, oy - axLenY / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Nồng độ (mol/L) →', 0, 0);
      ctx.restore();

      // Draw Reactant Decay Curve (Exponential)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const pointsR = [];
      for (let t = 0; t <= axLenX; t += 10) {
        const conc = Math.exp(-t / (axLenX * 0.35));
        const px = ox + t;
        const py = oy - conc * (axLenY * 0.85);
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
        pointsR.push({x: px, y: py});
      }
      ctx.stroke();

      // Draw Product Growth Curve
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let t = 0; t <= axLenX; t += 10) {
        const conc = 1 - Math.exp(-t / (axLenX * 0.35));
        const px = ox + t;
        const py = oy - conc * (axLenY * 0.85);
        if (t === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Legend & Formula
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12.5px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('— Nồng độ Chất phản ứng (giảm dần, ΔC < 0)', ox + 20, 36);

      ctx.fillStyle = '#10b981';
      ctx.fillText('— Nồng độ Sản phẩm (tăng dần, ΔC > 0)', ox + 20, 56);

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 12.5px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('v_tb = -(1/a)·(ΔC_A/Δt) = +(1/c)·(ΔC_C/Δt)', cw - 40, 46);

      ctx.restore();
    }

    // --- PART 2: GULDBERG - WAAGE RATE CALCULATOR ---
    function updateB19RateCalc() {
      const sliderNO = document.getElementById('b19-slider-cno');
      const sliderO2 = document.getElementById('b19-slider-co2');
      const valNO = document.getElementById('b19-val-cno');
      const valO2 = document.getElementById('b19-val-co2');
      const card = document.getElementById('b19-rate-calc-card');
      if (!sliderNO || !sliderO2 || !card) return;

      const cNO = parseFloat(sliderNO.value);
      const cO2 = parseFloat(sliderO2.value);
      if (valNO) valNO.innerText = cNO.toFixed(1) + ' M';
      if (valO2) valO2.innerText = cO2.toFixed(1) + ' M';

      const k = 0.5; // hằng số giả định
      const rate = k * Math.pow(cNO, 2) * Math.pow(cO2, 1);
      const standardRate = k * 1.0 * 1.0;
      const ratio = rate / standardRate;

      card.innerHTML = `
        <div style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #0f172a;">Phản ứng đơn giản: 2NO(g) + O₂(g) → 2NO₂(g)</h3>
            <span style="font-size: 12px; color: #64748b;">Định luật Guldberg - Waage: v = k · [NO]² · [O₂]</span>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 20px; font-weight: 800; color: #0284c7;">v = ${rate.toFixed(3)} M/s</span>
          </div>
        </div>
        <div style="font-size: 13px; color: #334155; line-height: 1.6;">
          <div><strong>1. Biểu thức tỉ lệ:</strong> $v = 0.5 \\times (${cNO})^2 \\times (${cO2})^1$</div>
          <div><strong>2. Nhận xét độ nhạy:</strong> Do NO có hệ số là <strong>2</strong> nên nồng độ NO ảnh hưởng theo <em>bậc hai (luỹ thừa 2)</em>: tăng gấp 2 lần NO thì tốc độ tăng vọt gấp <strong>4 lần</strong>!</div>
          <div style="margin-top: 8px; padding: 10px; border-radius: 6px; background: #f0fdf4; border-left: 4px solid #16a34a; font-weight: 700; color: #166534;">
            ⚡ Tốc độ hiện tại nhanh gấp ${ratio.toFixed(2)} lần so với điều kiện chuẩn nồng độ 1 M.
          </div>
        </div>
      `;
    }

    // --- PART 3: VAN'T HOFF TEMPERATURE COEFFICIENT CALCULATOR ---
    function calcB19Vanthoff() {
      const inT1 = document.getElementById('b19-vh-t1');
      const inT2 = document.getElementById('b19-vh-t2');
      const inGamma = document.getElementById('b19-vh-gamma');
      const inTime1 = document.getElementById('b19-vh-time1');
      const card = document.getElementById('b19-vh-result-card');
      if (!inT1 || !inT2 || !inGamma || !inTime1 || !card) return;

      const t1 = parseFloat(inT1.value);
      const t2 = parseFloat(inT2.value);
      const gamma = parseFloat(inGamma.value);
      const time1 = parseFloat(inTime1.value);

      const deltaT = t2 - t1;
      const exponent = deltaT / 10;
      const speedMultiplier = Math.pow(gamma, exponent);
      const time2 = time1 / speedMultiplier;

      card.innerHTML = `
        <div style="border-bottom: 1.5px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="margin: 0; font-size: 16px; font-weight: 800; color: #0f172a;">Quy tắc Van't Hoff: T₁ = ${t1}°C ➔ T₂ = ${t2}°C (ΔT = ${deltaT}°C)</h3>
            <span style="font-size: 12px; color: #64748b;">Hệ số γ = ${gamma}</span>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 18px; font-weight: 800; color: #dc2626;">Tốc độ tăng: ×${speedMultiplier.toFixed(1)} lần</span>
          </div>
        </div>
        <div style="font-size: 13px; color: #334155; line-height: 1.6;">
          <div><strong>1. Công thức áp dụng:</strong> $\\frac{v_{T_2}}{v_{T_1}} = \\gamma^{\\frac{T_2 - T_1}{10}} = ${gamma}^{\\frac{${deltaT}}{10}} = ${gamma}^{${exponent.toFixed(1)}} = ${speedMultiplier.toFixed(2)}$</div>
          <div><strong>2. Thời gian phản ứng tương ứng:</strong> Thời gian tỉ lệ nghịch với tốc độ phản ứng: $t_2 = \\frac{t_1}{${speedMultiplier.toFixed(2)}} = \\frac{${time1}\\text{ s}}{${speedMultiplier.toFixed(2)}} \\approx$ <strong style="color: #16a34a; font-size: 15px;">${time2.toFixed(1)} giây</strong>.</div>
          <div style="margin-top: 8px; padding: 10px; border-radius: 6px; background: #eff6ff; border-left: 4px solid #3b82f6; color: #1e40af;">
            💡 <strong>Ý nghĩa thực tế:</strong> Tăng nhiệt độ từ ${t1}°C lên ${t2}°C giúp rút ngắn thời gian từ ${time1}s xuống chỉ còn ${time2.toFixed(1)}s (giải thích tại sao hầm nhừ thực phẩm bằng nồi áp suất nhanh hơn gấp bội).
          </div>
        </div>
      `;
    }

    function resetB19InteractiveState() {
      if (currentPartB19 === 'part1') {
        drawB19Kinetics();
      } else if (currentPartB19 === 'part2') {
        const sliderNO = document.getElementById('b19-slider-cno');
        const sliderO2 = document.getElementById('b19-slider-co2');
        if (sliderNO) sliderNO.value = 1.0;
        if (sliderO2) sliderO2.value = 1.0;
        updateB19RateCalc();
      } else {
        const inT1 = document.getElementById('b19-vh-t1');
        const inT2 = document.getElementById('b19-vh-t2');
        const inGamma = document.getElementById('b19-vh-gamma');
        const inTime1 = document.getElementById('b19-vh-time1');
        if (inT1) inT1.value = 20;
        if (inT2) inT2.value = 50;
        if (inGamma) inGamma.value = 3.0;
        if (inTime1) inTime1.value = 270;
        calcB19Vanthoff();
      }
    }



    /* ==========================================================
       BÀI 20: ÔN TẬP VÀ LUYỆN TẬP CHƯƠNG 6 (TỐC ĐỘ PHẢN ỨNG)
       ========================================================== */
    let currentPartB20 = 'part1';

    function switchPartB20(partId) {
      if (typeof renderMathInPage === 'function') setTimeout(renderMathInPage, 30);
      currentPartB20 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');
      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b20-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b20-' + p);
        const panel = document.getElementById('panel-b20-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      const tip = document.getElementById('b20-lab-status-tip');
      if (tip) {
        if (partId === 'part1') tip.innerHTML = '💡 <em>Sơ đồ tư duy 2.5D: Bấm vào từng nút để xem cơ chế điều khiển tốc độ phản ứng.</em>';
        else if (partId === 'part2') tip.innerHTML = '💡 <em>Điền khuyết công thức SGK Trang 102: Hoàn thành các định luật và công thức chuẩn mực.</em>';
        else tip.innerHTML = '💡 <em>Đấu trường 5 bài tập SGK Trang 103: Vận dụng thực nghiệm phân huỷ H₂O₂ và quy tắc Van\'t Hoff.</em>';
      }

      if (partId === 'part1') {
        setTimeout(drawB20Mindmap, 50);
      }
    }

    // --- PART 1: 2.5D MINDMAP LOGIC ---
    let b20SelectedNode = null;
    const b20MindmapNodes = [
      { id: 'center', label: 'TỐC ĐỘ PHẢN ỨNG', x: 0.5, y: 0.5, r: 66, color: '#0284c7', desc: 'Đại lượng đo mức độ biến thiên nồng độ chất phản ứng/sản phẩm theo thời gian (Chương 6).' },
      { id: 'v_tb', label: '1. Tốc độ trung bình', x: 0.2, y: 0.24, r: 52, color: '#3b82f6', desc: 'v_tb = -(1/a)·(ΔC_A/Δt) = +(1/c)·(ΔC_C/Δt). Dấu trừ đảm bảo tốc độ luôn mang giá trị dương.' },
      { id: 'gw', label: '2. Định luật Guldberg', x: 0.8, y: 0.24, r: 52, color: '#8b5cf6', desc: 'v = k·C_Aᵃ·C_Bᵇ. Áp dụng cho phản ứng đơn giản. Hằng số k độc lập với nồng độ.' },
      { id: 'collision', label: '3. 4 Yếu tố va chạm', x: 0.2, y: 0.76, r: 52, color: '#ef4444', desc: 'Nồng độ, Áp suất, Nhiệt độ, Bề mặt: Làm tăng số va chạm hiệu quả giữa các phân tử.' },
      { id: 'catalyst', label: '4. Xúc tác & Van\'t Hoff', x: 0.8, y: 0.76, r: 52, color: '#10b981', desc: 'Xúc tác làm giảm năng lượng hoạt hoá Ea. Quy tắc Van\'t Hoff: v_T2 / v_T1 = γ^(ΔT/10).' }
    ];

    function initB20Mindmap() {
      const canvas = document.getElementById('b20MindmapCanvas');
      if (!canvas) return;

      canvas.removeEventListener('click', handleB20CanvasClick);
      canvas.addEventListener('click', handleB20CanvasClick);

      window.removeEventListener('resize', resizeB20Mindmap);
      window.addEventListener('resize', resizeB20Mindmap);

      resizeB20Mindmap();
    }

    function resizeB20Mindmap() {
      const canvas = document.getElementById('b20MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width || 500) * dpr;
      canvas.height = (rect.height || 450) * dpr;
      drawB20Mindmap();
    }

    function handleB20CanvasClick(e) {
      const canvas = document.getElementById('b20MindmapCanvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let found = null;
      for (const node of b20MindmapNodes) {
        const nx = node.x * rect.width;
        const ny = node.y * rect.height;
        const dist = Math.hypot(clickX - nx, clickY - ny);
        if (dist <= node.r) {
          found = node;
          break;
        }
      }
      b20SelectedNode = found;
      drawB20Mindmap();
    }

    function drawB20Mindmap() {
      const canvas = document.getElementById('b20MindmapCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.scale(dpr, dpr);
      const cw = rect.width || 500;
      const ch = rect.height || 450;

      // Draw connections
      const centerNode = b20MindmapNodes[0];
      const cx = centerNode.x * cw;
      const cy = centerNode.y * ch;

      for (let i = 1; i < b20MindmapNodes.length; i++) {
        const node = b20MindmapNodes[i];
        const nx = node.x * cw;
        const ny = node.y * ch;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx, ny, nx, cy, nx, ny);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = (b20SelectedNode && b20SelectedNode.id === node.id) ? 3.5 : 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw nodes
      for (const node of b20MindmapNodes) {
        const nx = node.x * cw;
        const ny = node.y * ch;
        const isSelected = (b20SelectedNode && b20SelectedNode.id === node.id);

        ctx.save();
        ctx.shadowColor = isSelected ? node.color : 'rgba(0, 0, 0, 0.08)';
        ctx.shadowBlur = isSelected ? 18 : 8;
        ctx.shadowOffsetY = 4;

        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.lineWidth = isSelected ? 4 : 2.5;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.restore();

        ctx.font = node.id === 'center' ? 'bold 12.5px Plus Jakarta Sans, sans-serif' : '600 12px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = node.id === 'center' ? '#0f172a' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      }

      // Tooltip / Details box
      if (b20SelectedNode) {
        const boxW = Math.min(cw - 32, 420);
        const boxH = 64;
        const bx = (cw - boxW) / 2;
        const by = ch - boxH - 14;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 10);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = b20SelectedNode.color;
        ctx.stroke();

        ctx.font = 'bold 12.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = b20SelectedNode.color;
        ctx.textAlign = 'left';
        ctx.fillText(b20SelectedNode.label, bx + 14, by + 22);

        ctx.font = '11.5px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(b20SelectedNode.desc, bx + 14, by + 44);
        ctx.restore();
      }

      ctx.restore();
    }

    // --- PART 2: CLOZE LAB (SGK TRANG 102) ---
    const b20ClozeAnswers = {
      q1: '-(1/a)·(ΔCA/Δt)',
      q2: 'k·CAᵃ·CBᵇ',
      q3: 'tăng số va chạm hiệu quả',
      q4: 'năng lượng hoạt hoá giảm'
    };

    function initB20ClozeLab() {
      updateB20ClozeStatus();
    }

    function checkB20Cloze() {
      let correctCount = 0;
      for (const [key, val] of Object.entries(b20ClozeAnswers)) {
        const sel = document.getElementById('b20-cloze-' + key);
        if (sel) {
          if (sel.value === val) {
            sel.style.borderColor = '#16a34a';
            sel.style.backgroundColor = '#f0fdf4';
            correctCount++;
          } else if (sel.value !== '') {
            sel.style.borderColor = '#dc2626';
            sel.style.backgroundColor = '#fef2f2';
          }
        }
      }

      const board = document.getElementById('b20-cloze-status-board');
      if (board) {
        if (correctCount === 4) {
          board.innerHTML = `<div style="color: #166534; font-weight: 700; font-size: 14px;">✨ Hoàn thành xuất sắc: 4/4 công thức chính xác!</div>
          <p style="margin: 6px 0 0 0; color: #1e293b;">Bạn đã nắm vững: v_tb có dấu âm trước chất đầu, v = k·C_Aᵃ·C_Bᵇ cho phản ứng đơn giản, va chạm hiệu quả và chất xúc tác làm giảm Ea.</p>`;
        } else {
          board.innerHTML = `<div style="color: #0284c7; font-weight: 700;">Tiến độ: Đúng ${correctCount}/4 ô</div>
          <p style="margin: 6px 0 0 0; color: #475569;">Gợi ý: Kiểm tra dấu của tốc độ trung bình và vai trò giảm rào cản năng lượng hoạt hoá của xúc tác.</p>`;
        }
      }
    }

    function updateB20ClozeStatus() {
      const board = document.getElementById('b20-cloze-status-board');
      if (board) {
        board.innerHTML = `<div style="color: #64748b;">Chưa kiểm tra. Hãy chọn công thức thích hợp trong 4 ô trống ở cột bên trái rồi bấm <strong>"Kiểm tra kết quả"</strong>.</div>`;
      }
    }

    // --- PART 3: QUIZ ARENA 5 BÀI TẬP SGK TRANG 103 ---
    const b20QuizData = [
      {
        id: 1,
        title: 'Câu 1 (SGK Tr. 103): Tốc độ nhanh / chậm',
        question: 'Phản ứng nào sau đây xảy ra với tốc độ nhanh nhất trong điều kiện phòng thí nghiệm?',
        options: [
          'A. Phản ứng trung hoà axit - bazơ (HCl + NaOH)',
          'B. Phản ứng kim loại sắt bị gỉ trong không khí ẩm',
          'C. Quá trình lên men tinh bột tạo rượu',
          'D. Quá trình tạo thạch nhũ trong hang động đá vôi'
        ],
        answer: 0,
        explanation: 'Phản ứng trao đổi ion giữa axit mạnh và bazơ mạnh (H⁺ + OH⁻ → H₂O) xảy ra gần như tức thời (tốc độ cực nhanh). Trong khi gỉ sắt, lên men và tạo thạch nhũ mất từ vài ngày, vài tháng đến hàng ngàn năm.'
      },
      {
        id: 2,
        title: 'Câu 2 (SGK Tr. 103): Biến đổi điều kiện Zn + H₂SO₄',
        question: 'Biện pháp nào sau đây sẽ làm GIẢM tốc độ phản ứng giữa hạt kẽm và dung dịch H₂SO₄ 1 M?',
        options: [
          'A. Thay dung dịch H₂SO₄ 1 M bằng dung dịch H₂SO₄ 0.5 M',
          'B. Thay kẽm hạt bằng kẽm bột cùng khối lượng',
          'C. Đun nóng dung dịch phản ứng lên 60°C',
          'D. Khuấy đều dung dịch trong khi phản ứng'
        ],
        answer: 0,
        explanation: 'Giảm nồng độ axit từ 1 M xuống 0.5 M làm giảm mật độ hạt H⁺, làm giảm tần số va chạm hiệu quả => Tốc độ phản ứng giảm xuống.'
      },
      {
        id: 3,
        title: 'Câu 3 (SGK Tr. 103): Thực nghiệm phân huỷ H₂O₂',
        question: 'Phân huỷ H₂O₂: Từ t=0 đến t=1 min thu được 14 cm³ O₂; từ t=1 đến t=2 min thu được thêm (24 - 14) = 10 cm³ O₂. Nhận xét về tốc độ trung bình theo thời gian:',
        options: [
          'A. Tốc độ trung bình giảm dần theo thời gian (14 cm³/min ➔ 10 cm³/min ➔ ...)',
          'B. Tốc độ trung bình tăng dần theo thời gian',
          'C. Tốc độ phản ứng không đổi',
          'D. Tốc độ biến đổi không theo quy luật'
        ],
        answer: 0,
        explanation: 'Khi phản ứng diễn ra, nồng độ H₂O₂ giảm dần theo thời gian, dẫn đến tốc độ trung bình của phản ứng giảm dần (từ 0-1 min là 14 cm³/min, từ 1-2 min giảm còn 10 cm³/min, từ 2-3 min giảm còn 6 cm³/min).'
      },
      {
        id: 4,
        title: 'Câu 4 (SGK Tr. 103): Thiết kế thí nghiệm nhiệt độ',
        question: 'Để chứng minh ảnh hưởng của nhiệt độ đến tốc độ phản ứng Zn + H₂SO₄ loãng, phương án thực nghiệm chuẩn xác là:',
        options: [
          'A. Dùng 2 ống nghiệm chứa cùng khối lượng kẽm hạt, cùng thể tích và nồng độ H₂SO₄; một ống ở nhiệt độ phòng (25°C), một ống ngâm trong cốc nước nóng (60°C)',
          'B. Một ống dùng kẽm bột ở 25°C, một ống dùng kẽm hạt ở 60°C',
          'C. Một ống dùng H₂SO₄ 1 M ở 25°C, một ống dùng H₂SO₄ 2 M ở 60°C',
          'D. Dùng lượng kẽm khác nhau ở cùng một nhiệt độ'
        ],
        answer: 0,
        explanation: 'Nguyên tắc kiểm soát biến số thực nghiệm (control variables): Để khảo sát ảnh hưởng của nhiệt độ, bắt buộc phải giữ cố định tất cả các yếu tố khác (kích thước hạt kẽm, khối lượng, nồng độ và thể tích axit).'
      },
      {
        id: 5,
        title: 'Câu 5 (SGK Tr. 103): Bài toán hạ nhiệt độ Van\'t Hoff',
        question: 'Một phản ứng ở 50°C có tốc độ 0.18 mol/(L·min). Hỏi phải giảm xuống nhiệt độ bao nhiêu để tốc độ phản ứng chỉ còn 0.045 mol/(L·min), biết hệ số Van\'t Hoff γ = 2?',
        options: [
          'A. 30°C',
          'B. 40°C',
          'C. 20°C',
          'D. 10°C'
        ],
        answer: 0,
        explanation: 'Tỉ số tốc độ: v₁ / v₂ = 0.18 / 0.045 = 4 = 2². Theo Van\'t Hoff: v₁/v₂ = γ^((T₁ - T₂)/10) = 2^((50 - T₂)/10) = 2² => (50 - T₂)/10 = 2 => 50 - T₂ = 20 => T₂ = 30°C.'
      }
    ];

    let b20UserAnswers = {};

    function initB20QuizArena() {
      b20UserAnswers = {};
      renderB20QuestionStrip();
      renderB20CurrentQuestion(0);
    }

    function renderB20QuestionStrip() {
      const strip = document.getElementById('b20-question-selector-strip');
      if (!strip) return;
      strip.innerHTML = b20QuizData.map((q, idx) => {
        const isAnswered = b20UserAnswers[idx] !== undefined;
        const isCorrect = isAnswered && (b20UserAnswers[idx] === q.answer);
        let bg = '#f1f5f9';
        let color = '#475569';
        if (isAnswered) {
          bg = isCorrect ? '#dcfce7' : '#fee2e2';
          color = isCorrect ? '#166534' : '#991b1b';
        }
        return `<button onclick="renderB20CurrentQuestion(${idx})" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: ${bg}; color: ${color}; font-weight: 700; font-size: 12px; cursor: pointer;">Câu ${idx + 1}</button>`;
      }).join('');
    }

    function renderB20CurrentQuestion(idx) {
      const q = b20QuizData[idx];
      const leftCol = document.getElementById('b20-quiz-active-question-card');
      if (!leftCol) return;

      const userChoice = b20UserAnswers[idx];
      const isAnswered = userChoice !== undefined;

      let optsHtml = q.options.map((opt, optIdx) => {
        let optStyle = 'padding: 10px 14px; border-radius: 8px; border: 1.5px solid #e2e8f0; margin-bottom: 8px; cursor: pointer; font-size: 13px; transition: all 0.15s; background: #ffffff;';
        if (isAnswered) {
          if (optIdx === q.answer) {
            optStyle += ' border-color: #16a34a; background: #f0fdf4; color: #166534; font-weight: 700;';
          } else if (optIdx === userChoice) {
            optStyle += ' border-color: #dc2626; background: #fef2f2; color: #991b1b;';
          }
        }
        return `<div onclick="handleB20Answer(${idx}, ${optIdx})" style="${optStyle}">${opt}</div>`;
      }).join('');

      let feedbackHtml = '';
      if (isAnswered) {
        const isCorrect = userChoice === q.answer;
        feedbackHtml = `
          <div style="margin-top: 14px; padding: 12px; border-radius: 8px; background: ${isCorrect ? '#f0fdf4' : '#fffbeb'}; border-left: 4px solid ${isCorrect ? '#16a34a' : '#f59e0b'};">
            <div style="font-weight: 700; color: ${isCorrect ? '#166534' : '#b45309'};">
              ${isCorrect ? '✅ Chính xác!' : '⚠️ Chưa chính xác!'}
            </div>
            <div style="font-size: 12.5px; color: #334155; margin-top: 4px; line-height: 1.5;">
              <strong>Giải thích chi tiết:</strong> ${q.explanation}
            </div>
          </div>
        `;
      }

      leftCol.innerHTML = `
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: #0284c7; font-size: 14px;">${q.title}</span>
          <span style="font-size: 12px; color: #64748b;">Câu ${idx + 1} / 5</span>
        </div>
        <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 14px;">
          ${q.question}
        </div>
        <div>
          ${optsHtml}
        </div>
        ${feedbackHtml}
      `;
    }

    function handleB20Answer(qIdx, optIdx) {
      if (b20UserAnswers[qIdx] !== undefined) return;
      b20UserAnswers[qIdx] = optIdx;
      renderB20QuestionStrip();
      renderB20CurrentQuestion(qIdx);

      const answeredCount = Object.keys(b20UserAnswers).length;
      const progressText = document.getElementById('b20-quiz-progress-text');
      if (progressText) {
        progressText.innerText = `Đã hoàn thành: ${answeredCount} / 5 câu`;
      }

      if (answeredCount === 5) {
        const scoreBoard = document.getElementById('b20-quiz-score-board');
        if (scoreBoard) scoreBoard.style.display = 'block';
      }
    }

    function resetB20QuizArena() {
      initB20QuizArena();
      const scoreBoard = document.getElementById('b20-quiz-score-board');
      if (scoreBoard) scoreBoard.style.display = 'none';
      const progressText = document.getElementById('b20-quiz-progress-text');
      if (progressText) progressText.innerText = 'Đã hoàn thành: 0 / 5 câu';
    }

    function resetB20InteractiveState() {
      if (currentPartB20 === 'part1') {
        b20SelectedNode = null;
        drawB20Mindmap();
      } else if (currentPartB20 === 'part2') {
        ['q1', 'q2', 'q3', 'q4'].forEach(k => {
          const el = document.getElementById('b20-cloze-' + k);
          if (el) {
            el.value = '';
            el.style.borderColor = '#cbd5e1';
            el.style.backgroundColor = '#ffffff';
          }
        });
        updateB20ClozeStatus();
      } else {
        resetB20QuizArena();
      }
    }




    
    /* ==========================================================
       LOGIC BÀI 21: NHÓM HALOGEN (CHƯƠNG 7)
       ========================================================== */
    let currentPartB21 = 'part1';
    let b21SelectedJar = 1;
    let b21DispKey = 'cl2_nabr';
    let b21PrepFlowing = false;
    let b21PrepTick = 0;
    let b21PrepAnimId = null;
    let b21QuizStep = 0;
    let b21QuizScore = 0;
    let b21QuizAnswered = false;

    const b21Jars = [
      {
        sym: 'F₂',
        name: 'Fluorine',
        state: 'Khí (20 °C)',
        colorName: 'Lục nhạt',
        tnc: '-219,6 °C',
        ts: '-188,1 °C',
        bodyFill: 'rgba(217, 249, 157, 0.45)',
        borderCol: '#84cc16',
        desc: 'Khí màu lục nhạt, rất độc. Độ âm điện lớn nhất (3,98), tính oxi hoá mạnh nhất nhóm, bốc cháy ngay khi tiếp xúc với hơi nước.'
      },
      {
        sym: 'Cl₂',
        name: 'Chlorine',
        state: 'Khí (20 °C)',
        colorName: 'Vàng lục',
        tnc: '-101,0 °C',
        ts: '-34,1 °C',
        bodyFill: 'rgba(134, 239, 172, 0.55)',
        borderCol: '#16a34a',
        desc: 'Khí màu vàng lục, mùi xốc, độc, nặng gấp 2,45 lần không khí. Tan một phần trong nước tạo nước chlorine có tính tẩy màu và sát trùng.'
      },
      {
        sym: 'Br₂',
        name: 'Bromine',
        state: 'Lỏng (20 °C)',
        colorName: 'Nâu đỏ',
        tnc: '-7,3 °C',
        ts: '+59,2 °C',
        bodyFill: 'rgba(234, 88, 12, 0.85)',
        vaporFill: 'rgba(251, 146, 60, 0.35)',
        borderCol: '#ea580c',
        desc: 'Chất lỏng màu nâu đỏ, dễ bay hơi tạo hơi màu da cam độc, gây bỏng sâu khi rơi vào da. Tương tác van der Waals mạnh hơn Cl₂.'
      },
      {
        sym: 'I₂',
        name: 'Iodine',
        state: 'Rắn (20 °C)',
        colorName: 'Đen tím',
        tnc: '+113,6 °C',
        ts: '+185,5 °C',
        bodyFill: '#4c1d95',
        vaporFill: 'rgba(168, 85, 247, 0.32)',
        borderCol: '#7c3aed',
        desc: 'Tinh thể rắn màu đen tím. Có tính thăng hoa đặc trưng (chuyển thẳng từ thể rắn sang hơi màu tím khi đun nóng ở áp suất thường).'
      }
    ];

    const b21DispData = {
      'cl2_nabr': {
        title: 'Thí nghiệm 1: Sục khí Chlorine (Cl₂) vào dung dịch Sodium bromide (NaBr)',
        equation: 'Cl₂ + 2NaBr ➔ 2NaCl + Br₂',
        obs: 'Dung dịch NaBr không màu chuyển dần sang màu vàng cam / nâu đỏ của bromine (Br₂) tự do.',
        principle: 'Chlorine có tính oxi hoá mạnh hơn bromine (Cl₂ > Br₂) nên đẩy được bromine ra khỏi dung dịch muối.',
        liquidBefore: 'rgba(241, 245, 249, 0.7)',
        liquidAfter: 'rgba(234, 88, 12, 0.65)',
        reagentLabel: 'Sục khí Cl₂ vàng lục'
      },
      'br2_nai': {
        title: 'Thí nghiệm 2: Nhỏ nước Bromine (Br₂) vào dung dịch Sodium iodide (NaI)',
        equation: 'Br₂ + 2NaI ➔ 2NaBr + I₂',
        obs: 'Dung dịch NaI không màu chuyển sang màu nâu sẫm / tím đen do iodine (I₂) sinh ra.',
        principle: 'Bromine có tính oxi hoá mạnh hơn iodine (Br₂ > I₂) nên oxi hoá được ion I⁻ thành I₂.',
        liquidBefore: 'rgba(241, 245, 249, 0.7)',
        liquidAfter: 'rgba(109, 40, 217, 0.65)',
        reagentLabel: 'Nhỏ nước Br₂ nâu đỏ'
      },
      'i2_starch': {
        title: 'Thí nghiệm 3: Nhỏ dung dịch Iodine (I₂) vào ống nghiệm chứa Hồ tinh bột',
        equation: 'I₂ + Hồ tinh bột ➔ Hợp chất bọc màu xanh tím đặc trưng',
        obs: 'Dung dịch lập tức xuất hiện màu xanh tím đậm đặc trưng (mất màu khi đun nóng, hiện lại khi để nguội).',
        principle: 'Phân tử amylose trong tinh bột có cấu trúc xoắn lò xo giữ các phân tử I₂ bên trong tạo màu xanh tím.',
        liquidBefore: 'rgba(241, 245, 249, 0.85)',
        liquidAfter: 'rgba(30, 58, 138, 0.82)',
        reagentLabel: 'Nhỏ dung dịch I₂'
      },
      'f2_h2o': {
        title: 'Thí nghiệm 4: Dẫn khí Fluorine (F₂) tiếp xúc với Nước (H₂O)',
        equation: '2F₂ + 2H₂O ➔ 4HF + O₂↑ (Bốc cháy mãnh liệt)',
        obs: 'Hơi nước bốc cháy ngay lập tức với ngọn lửa sáng, giải phóng khí oxygen (O₂). Không thể dùng F₂ đẩy Cl⁻ trong dung dịch!',
        principle: 'Do F₂ có tính oxi hoá cực mạnh nên ưu tiên oxi hoá mãnh liệt nguyên tử oxygen (-2) trong phân tử H₂O thành O₂.',
        liquidBefore: 'rgba(224, 242, 254, 0.7)',
        liquidAfter: 'rgba(254, 240, 138, 0.75)',
        reagentLabel: 'Thổi luồng khí F₂'
      }
    };

    const b21QuizList = [
      {
        q: "Câu 1: Nguyên nhân chính làm cho nhiệt độ nóng chảy và nhiệt độ sôi của các đơn chất halogen tăng dần từ F₂ đến I₂ là gì?",
        options: [
          "Độ âm điện của các nguyên tử tăng dần từ F đến I",
          "Khối lượng phân tử và kích thước phân tử tăng làm tương tác van der Waals tăng dần",
          "Liên kết hydrogen giữa các phân tử X₂ bền vững dần",
          "Năng lượng liên kết cộng hoá trị X-X tăng dần từ F₂ đến I₂"
        ],
        ans: 1,
        explain: "Các phân tử X₂ đều không phân cực. Từ F₂ đến I₂, phân tử khối và bán kính đám mây electron tăng mạnh làm lực tương tác van der Waals tăng dần, dẫn đến t_nc và t_s tăng."
      },
      {
        q: "Câu 2: Khi đun nóng tinh thể iodine (I₂) trong ống nghiệm ở áp suất thường, hiện tượng nào xảy ra?",
        options: [
          "Iodine nóng chảy thành chất lỏng màu vàng lục",
          "Iodine phân huỷ thành nguyên tử và mất màu",
          "Iodine thăng hoa chuyển thẳng từ thể rắn sang hơi màu tím, sau đó ngưng tụ lại ở thành ống nghiệm lạnh",
          "Iodine bốc cháy tạo khói trắng"
        ],
        ans: 2,
        explain: "Ở áp suất thường, tinh thể I₂ có tính thăng hoa: khi đun nóng chuyển thẳng từ thể rắn sang hơi màu tím mà không qua trạng thái lỏng."
      },
      {
        q: "Câu 3: Phát biểu nào sau đây là SAI khi nói về tính chất hoá học của các đơn chất halogen?",
        options: [
          "Chlorine oxi hoá sắt (Fe) ở nhiệt độ cao tạo thành iron(III) chloride (FeCl₃)",
          "Fluorine phản ứng nổ mạnh với hydrogen ngay trong bóng tối và nhiệt độ rất thấp (-252 °C)",
          "Sục khí fluorine (F₂) vào dung dịch NaCl sẽ thu được khí chlorine (Cl₂) thoát ra",
          "Nước Javel được sản xuất bằng cách dẫn khí Cl₂ vào dung dịch NaOH loãng, nguội"
        ],
        ans: 2,
        explain: "Phát biểu C sai vì F₂ có tính oxi hoá quá mạnh nên khi sục vào dung dịch NaCl, F₂ lập tức oxi hoá nước mãnh liệt: 2F₂ + 2H₂O ➔ 4HF + O₂↑ chứ không đẩy được Cl₂."
      },
      {
        q: "Câu 4: Trong phản ứng tự oxi hoá – khử: Cl₂ + 2NaOH ➔ NaCl + NaClO + H₂O, vai trò của Cl₂ là:",
        options: [
          "Chỉ là chất oxi hoá",
          "Chỉ là chất khử",
          "Vừa là chất oxi hoá, vừa là chất khử",
          "Không phải chất oxi hoá, cũng không phải chất khử"
        ],
        ans: 2,
        explain: "Số oxi hoá của Cl thay đổi từ 0 (trong Cl₂) xuống -1 (trong NaCl, nhận e ➔ chất oxi hoá) và tăng lên +1 (trong NaClO, nhường e ➔ chất khử)."
      },
      {
        q: "Câu 5: Trong hệ thống điều chế khí Cl₂ từ MnO₂ và HCl đặc, bình rửa khí thứ nhất chứa dung dịch NaCl bão hoà có tác dụng gì?",
        options: [
          "Hấp thụ hơi nước làm khô khí Cl₂",
          "Giữ lại khí HCl bay theo mà hạn chế hoà tan khí Cl₂",
          "Trung hoà khí Cl₂ dư tránh ô nhiễm",
          "Tăng tốc độ phản ứng sinh khí Cl₂"
        ],
        ans: 1,
        explain: "Khí Cl₂ thoát ra từ bình phản ứng thường lẫn khí HCl bay hơi và hơi nước. Bình 1 chứa dung dịch NaCl bão hoà dùng để giữ lại khí HCl; Bình 2 chứa H₂SO₄ đặc dùng để hút ẩm làm khô khí Cl₂."
      }
    ];

    function switchPartB21(partId) {
      currentPartB21 = partId;
      if (b21PrepAnimId) {
        cancelAnimationFrame(b21PrepAnimId);
        b21PrepAnimId = null;
      }

      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : (partId === 'part3' ? 'p3' : 'p4'));
      ['p1', 'p2', 'p3', 'p4'].forEach(p => {
        const btn = document.getElementById('tab-btn-b21-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3', 'part4'].forEach(p => {
        const sec = document.getElementById('content-b21-' + p);
        const panel = document.getElementById('panel-b21-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (typeof renderMathInPage === 'function') renderMathInPage();

      const tip = document.getElementById('b21-lab-status-tip');
      const hudTool = document.getElementById('b21-hud-tool');

      if (partId === 'part1') {
        if (tip) tip.innerHTML = '💡 <em>Click vào từng lọ halogen để khám phá màu sắc, trạng thái và giải thích nhiệt độ sôi tăng dần.</em>';
        if (hudTool) hudTool.innerText = 'Bộ 4 Lọ Đơn Chất Halogen 2.5D';
        setTimeout(initB21HalogenJars, 50);
      } else if (partId === 'part2') {
        if (tip) tip.innerHTML = '💡 <em>Thí nghiệm thế halogen: Chọn cặp chất để quan sát sự biến đổi màu sắc trong ống nghiệm.</em>';
        if (hudTool) hudTool.innerText = 'Thí Nghiệm Đẩy Muối Halide';
        setTimeout(() => { simB21Displacement(b21DispKey); }, 50);
      } else if (partId === 'part3') {
        if (tip) tip.innerHTML = '💡 <em>Hệ thống điều chế Cl₂: Bấm "Đun nóng & Mở khoá HCl" để quan sát dòng khí đi qua 2 bình rửa khí.</em>';
        if (hudTool) hudTool.innerText = 'Dây Chuyền Điều Chế Chlorine';
        setTimeout(drawB21PrepApparatus, 50);
      } else if (partId === 'part4') {
        if (tip) tip.innerHTML = '💡 <em>Đấu trường trắc nghiệm: Chinh phục 5 câu hỏi cốt lõi Bài 21.</em>';
        if (hudTool) hudTool.innerText = 'Đấu Trường Trắc Nghiệm Bài 21';
        renderB21QuizQuestion();
      }
    }

    function initB21HalogenJars() {
      const canvas = document.getElementById('b21HalogenCanvas');
      if (!canvas) return;

      canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const idx = Math.floor((x / rect.width) * 4);
        if (idx >= 0 && idx < 4) {
          b21SelectedJar = idx;
          drawB21HalogenJars();
        }
      };

      drawB21HalogenJars();
    }

    function drawB21HalogenJars() {
      const canvas = document.getElementById('b21HalogenCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const colW = w / 4;
      const jarW = Math.min(76, colW - 24);
      const jarH = 155;
      const jarY = 50;

      b21Jars.forEach((jar, i) => {
        const cx = colW * i + colW / 2;
        const jx = cx - jarW / 2;
        const isSel = (i === b21SelectedJar);

        // Vẽ nút bình thuỷ tinh
        ctx.fillStyle = isSel ? jar.borderCol : '#64748b';
        ctx.fillRect(cx - 18, jarY - 14, 36, 10);
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(cx - 14, jarY - 4, 28, 6);

        // Vẽ thân bình
        ctx.save();
        if (isSel) {
          ctx.shadowColor = jar.borderCol;
          ctx.shadowBlur = 14;
        }
        ctx.beginPath();
        ctx.roundRect(jx, jarY, jarW, jarH, 10);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = isSel ? 3 : 1.8;
        ctx.strokeStyle = isSel ? jar.borderCol : '#94a3b8';
        ctx.stroke();
        ctx.restore();

        // Vẽ chất bên trong lọ
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(jx + 3, jarY + 3, jarW - 6, jarH - 6, 8);
        ctx.clip();

        if (i === 0 || i === 1) {
          // Thể khí tràn đầy bình
          ctx.fillStyle = jar.bodyFill;
          ctx.fillRect(jx, jarY, jarW, jarH);
        } else if (i === 2) {
          // Br2: hơi màu cam phía trên, lỏng nâu đỏ phía dưới
          ctx.fillStyle = jar.vaporFill;
          ctx.fillRect(jx, jarY, jarW, jarH);
          ctx.fillStyle = jar.bodyFill;
          ctx.fillRect(jx, jarY + jarH * 0.62, jarW, jarH * 0.38);
        } else if (i === 3) {
          // I2: hơi tím nhạt phía trên, tinh thể rắn đen tím dưới đáy
          ctx.fillStyle = jar.vaporFill;
          ctx.fillRect(jx, jarY, jarW, jarH);
          ctx.fillStyle = jar.bodyFill;
          ctx.beginPath();
          ctx.moveTo(jx, jarY + jarH);
          ctx.lineTo(jx + 15, jarY + jarH - 26);
          ctx.lineTo(jx + 38, jarY + jarH - 32);
          ctx.lineTo(jx + 58, jarY + jarH - 22);
          ctx.lineTo(jx + jarW, jarY + jarH);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Nhãn lọ
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.fillRect(cx - 22, jarY + 45, 44, 28);
        ctx.strokeStyle = jar.borderCol;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(cx - 22, jarY + 45, 44, 28);

        ctx.fillStyle = '#0f172a';
        ctx.font = '800 14px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(jar.sym, cx, jarY + 64);

        ctx.fillStyle = isSel ? jar.borderCol : '#334155';
        ctx.font = '700 13px Plus Jakarta Sans';
        ctx.fillText(jar.name, cx, jarY + jarH + 22);
        ctx.fillStyle = '#64748b';
        ctx.font = '11.5px Plus Jakarta Sans';
        ctx.fillText(jar.state, cx, jarY + jarH + 38);
      });

      // Hộp thông tin chi tiết của lọ đang chọn
      const sel = b21Jars[b21SelectedJar];
      const bx = 20;
      const by = jarY + jarH + 54;
      const bw = w - 40;
      const bh = Math.max(82, h - by - 14);

      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 10);
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = sel.borderCol;
      ctx.stroke();

      ctx.fillStyle = sel.borderCol;
      ctx.font = '800 14px Plus Jakarta Sans';
      ctx.textAlign = 'left';
      ctx.fillText(sel.sym + ' – ' + sel.name + ' (' + sel.colorName + ' | t_nc: ' + sel.tnc + ' | t_s: ' + sel.ts + ')', bx + 16, by + 26);

      ctx.fillStyle = '#334155';
      ctx.font = '12.5px Plus Jakarta Sans';
      ctx.fillText(sel.desc, bx + 16, by + 52, bw - 32);
    }

    function simB21Displacement(key) {
      b21DispKey = key;
      const keys = ['cl2_nabr', 'br2_nai', 'i2_starch', 'f2_h2o'];
      keys.forEach((k, idx) => {
        const btn = document.getElementById('btn-b21-disp-' + (idx + 1));
        if (btn) btn.classList.toggle('active', k === key);
      });

      const item = b21DispData[key];
      const card = document.getElementById('b21-disp-result-card');
      if (card && item) {
        card.innerHTML = `
          <div style="font-weight: 800; color: #0f172a; font-size: 13.5px; margin-bottom: 4px;">
            ${item.title} &nbsp;|&nbsp; <span style="color: #0284c7; font-family: 'JetBrains Mono', monospace;">${item.equation}</span>
          </div>
          <div style="font-size: 12.5px; color: #334155;">
            <strong>Hiện tượng:</strong> ${item.obs}<br>
            <strong style="color: #15803d;">Giải thích:</strong> ${item.principle}
          </div>
        `;
      }

      drawB21DispCanvas();
    }

    function drawB21DispCanvas() {
      const canvas = document.getElementById('b21DispCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const item = b21DispData[b21DispKey];
      if (!item) return;

      // Vẽ 2 ống nghiệm: Trước phản ứng (Trái) và Sau khi cho thuốc thử (Phải)
      const positions = [
        { cx: w * 0.3, title: 'TRƯỚC KHI PHẢN ỨNG', col: item.liquidBefore, reacted: false },
        { cx: w * 0.7, title: 'SAU KHI THÊM THUỐC THỬ', col: item.liquidAfter, reacted: true }
      ];

      // Mũi tên chuyển tiếp ở giữa
      ctx.fillStyle = '#0284c7';
      ctx.font = '800 13px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText('+ ' + item.reagentLabel, w * 0.5, h * 0.45);
      ctx.font = '800 22px Plus Jakarta Sans';
      ctx.fillText('➔', w * 0.5, h * 0.54);

      const tubeW = 58;
      const tubeH = 175;
      const ty = 55;

      positions.forEach(p => {
        const tx = p.cx - tubeW / 2;

        // Dung dịch trong ống
        ctx.beginPath();
        ctx.moveTo(tx + 3, ty + 65);
        ctx.lineTo(tx + 3, ty + tubeH - 28);
        ctx.arc(p.cx, ty + tubeH - 28, tubeW / 2 - 3, Math.PI, 0, true);
        ctx.lineTo(tx + tubeW - 3, ty + 65);
        ctx.closePath();
        ctx.fillStyle = p.col;
        ctx.fill();

        // Hiệu ứng đặc biệt ở ống phải
        if (p.reacted) {
          if (b21DispKey === 'f2_h2o') {
            // Ngọn lửa bốc cháy trên mặt nước
            ctx.beginPath();
            ctx.arc(p.cx, ty + 60, 18, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(239, 68, 68, 0.75)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(p.cx, ty + 62, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.fill();
          } else {
            // Giọt thuốc thử đang nhỏ xuống
            ctx.beginPath();
            ctx.arc(p.cx, ty + 35, 5, 0, Math.PI * 2);
            ctx.fillStyle = p.col;
            ctx.fill();
          }
        }

        // Thành ống nghiệm
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx, ty + tubeH - 28);
        ctx.arc(p.cx, ty + tubeH - 28, tubeW / 2, Math.PI, 0, true);
        ctx.lineTo(tx + tubeW, ty);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#64748b';
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = '700 12px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText(p.title, p.cx, ty - 14);
      });
    }

    function toggleB21PrepFlow() {
      b21PrepFlowing = !b21PrepFlowing;
      const btn = document.getElementById('btn-b21-prep-toggle');
      if (btn) {
        btn.innerHTML = b21PrepFlowing ? '⏸ Dừng đun nóng' : '▶ Đun nóng & Mở khoá HCl';
      }
      if (b21PrepFlowing) {
        animateB21Prep();
      } else if (b21PrepAnimId) {
        cancelAnimationFrame(b21PrepAnimId);
        b21PrepAnimId = null;
        drawB21PrepApparatus();
      }
    }

    function animateB21Prep() {
      if (!b21PrepFlowing || currentPartB21 !== 'part3') return;
      b21PrepTick += 1;
      drawB21PrepApparatus();
      b21PrepAnimId = requestAnimationFrame(animateB21Prep);
    }

    function drawB21PrepApparatus() {
      const canvas = document.getElementById('b21PrepCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const baseY = h * 0.72;
      const x1 = w * 0.16; // Bình cầu MnO2 + HCl
      const x2 = w * 0.42; // Bình 1: dd NaCl bão hoà
      const x3 = w * 0.66; // Bình 2: H2SO4 đặc
      const x4 = w * 0.88; // Bình 3: Thu khí Cl2

      // Ống dẫn khí nối giữa các bình
      ctx.strokeStyle = b21PrepFlowing ? '#16a34a' : '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, baseY - 75);
      ctx.lineTo(x1, baseY - 115);
      ctx.lineTo(x2 - 12, baseY - 115);
      ctx.lineTo(x2 - 12, baseY - 15);

      ctx.moveTo(x2 + 12, baseY - 75);
      ctx.lineTo(x2 + 12, baseY - 115);
      ctx.lineTo(x3 - 12, baseY - 115);
      ctx.lineTo(x3 - 12, baseY - 15);

      ctx.moveTo(x3 + 12, baseY - 75);
      ctx.lineTo(x3 + 12, baseY - 115);
      ctx.lineTo(x4, baseY - 115);
      ctx.lineTo(x4, baseY - 15);
      ctx.stroke();

      // 1. Bình cầu phản ứng
      ctx.beginPath();
      ctx.arc(x1, baseY - 35, 36, 0, Math.PI * 2);
      ctx.fillStyle = b21PrepFlowing ? 'rgba(134, 239, 172, 0.35)' : '#f8fafc';
      ctx.fill();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#475569';
      ctx.stroke();

      // Hạt MnO2 đen dưới đáy bình cầu
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(x1, baseY - 12, 16, 0, Math.PI, false);
      ctx.fill();

      // Ngọn lửa đèn cồn khi đun
      if (b21PrepFlowing) {
        ctx.beginPath();
        ctx.arc(x1, baseY + 12, 10 + Math.sin(b21PrepTick * 0.2) * 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
      }

      // 2. Bình rửa 1 (NaCl bão hoà) & 3. Bình rửa 2 (H2SO4 đặc) & 4. Bình thu Cl2
      const bottles = [
        { x: x2, label: 'Bình 1: dd NaCl bão hoà', sub: '(Giữ khí HCl)', fill: 'rgba(186, 230, 253, 0.55)' },
        { x: x3, label: 'Bình 2: H₂SO₄ đặc', sub: '(Hút ẩm giữ H₂O)', fill: 'rgba(254, 240, 138, 0.55)' },
        { x: x4, label: 'Bình thu Cl₂ khô', sub: '(Bông tẩm NaOH)', fill: b21PrepFlowing ? 'rgba(134, 239, 172, 0.65)' : 'rgba(241, 245, 249, 0.4)' }
      ];

      bottles.forEach((b, idx) => {
        const bw = 64;
        const bh = 88;
        ctx.beginPath();
        ctx.roundRect(b.x - bw / 2, baseY - bh, bw, bh, 8);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Mực chất lỏng
        ctx.fillStyle = b.fill;
        if (idx < 2) {
          ctx.fillRect(b.x - bw / 2 + 2, baseY - bh * 0.6, bw - 4, bh * 0.6 - 2);
        } else {
          ctx.fillRect(b.x - bw / 2 + 2, baseY - bh + 2, bw - 4, bh - 4);
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#475569';
        ctx.stroke();

        // Nút bông tẩm NaOH ở bình 3
        if (idx === 2) {
          ctx.beginPath();
          ctx.arc(b.x, baseY - bh - 4, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#e2e8f0';
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.stroke();
        }

        // Bọt khí sủi qua bình khi đang chạy
        if (b21PrepFlowing && idx < 2) {
          for (let k = 0; k < 4; k++) {
            const by = baseY - 15 - ((b21PrepTick * 1.5 + k * 14) % 40);
            ctx.beginPath();
            ctx.arc(b.x - 10 + (k % 2) * 6, by, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e';
            ctx.fill();
          }
        }

        ctx.fillStyle = '#0f172a';
        ctx.font = '700 11.5px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText(b.label, b.x, baseY + 22);
        ctx.fillStyle = '#0284c7';
        ctx.font = '600 11px Plus Jakarta Sans';
        ctx.fillText(b.sub, b.x, baseY + 38);
      });

      ctx.fillStyle = '#0f172a';
      ctx.font = '700 11.5px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText('MnO₂ + HCl đặc (t°)', x1, baseY + 32);
    }

    function renderB21QuizQuestion() {
      const q = b21QuizList[b21QuizStep];
      const titleEl = document.getElementById('b21-arena-q-title');
      const textEl = document.getElementById('b21-arena-question-text');
      const optListEl = document.getElementById('b21-arena-options-list');
      const feedEl = document.getElementById('b21-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b21-next-q');

      if (titleEl) titleEl.textContent = 'Câu hỏi ' + (b21QuizStep + 1) + ' / ' + b21QuizList.length;
      if (textEl) textEl.textContent = q.q;
      if (feedEl) feedEl.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';

      b21QuizAnswered = false;
      if (!optListEl) return;
      optListEl.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-tool';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.padding = '12px 16px';
        btn.style.fontSize = '14px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '12px';
        btn.innerHTML = '<strong style="color: #0284c7;">' + letters[idx] + '.</strong> <span>' + opt + '</span>';
        btn.onclick = () => submitB21QuizAnswer(idx);
        optListEl.appendChild(btn);
      });
    }

    function submitB21QuizAnswer(selectedIdx) {
      if (b21QuizAnswered) return;
      b21QuizAnswered = true;
      const q = b21QuizList[b21QuizStep];
      const isCorrect = (selectedIdx === q.ans);
      const feedEl = document.getElementById('b21-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b21-next-q');
      const scoreEl = document.getElementById('b21-arena-score');

      if (isCorrect) {
        b21QuizScore += 10;
        if (scoreEl) scoreEl.textContent = 'Điểm: ' + b21QuizScore + ' / 50';
      }

      if (feedEl) {
        feedEl.style.display = 'block';
        if (isCorrect) {
          feedEl.style.background = '#f0fdf4';
          feedEl.style.border = '1px solid #86efac';
          feedEl.style.color = '#166534';
          feedEl.innerHTML = '<strong>✓ CHÍNH XÁC!</strong><br>' + q.explain;
        } else {
          feedEl.style.background = '#fef2f2';
          feedEl.style.border = '1px solid #fca5a5';
          feedEl.style.color = '#991b1b';
          feedEl.innerHTML = '<strong>✗ CHƯA ĐÚNG!</strong> Đáp án đúng là <strong>' + ['A','B','C','D'][q.ans] + '</strong>.<br>' + q.explain;
        }
      }

      if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        if (b21QuizStep === b21QuizList.length - 1) {
          nextBtn.innerHTML = '<span>Xem kết quả ➔</span>';
        } else {
          nextBtn.innerHTML = '<span>Câu tiếp theo ➔</span>';
        }
      }
    }

    function nextB21Question() {
      if (b21QuizStep < b21QuizList.length - 1) {
        b21QuizStep++;
        renderB21QuizQuestion();
      } else {
        const optListEl = document.getElementById('b21-arena-options-list');
        const textEl = document.getElementById('b21-arena-question-text');
        const titleEl = document.getElementById('b21-arena-q-title');
        const feedEl = document.getElementById('b21-arena-feedback-box');
        const nextBtn = document.getElementById('btn-b21-next-q');

        if (titleEl) titleEl.textContent = '🎉 HOÀN THÀNH ĐẤU TRƯỜNG BÀI 21!';
        if (textEl) textEl.innerHTML = 'Bạn đã hoàn thành 5/5 câu hỏi! Điểm số đạt được: <strong style="color: #0284c7; font-size: 18px;">' + b21QuizScore + ' / 50 điểm</strong>.';
        if (optListEl) optListEl.innerHTML = '';
        if (feedEl) feedEl.style.display = 'none';
        if (nextBtn) {
          nextBtn.innerHTML = '<span>↺ Làm lại đấu trường</span>';
          nextBtn.onclick = resetB21QuizArena;
        }
      }
    }

    function resetB21QuizArena() {
      b21QuizStep = 0;
      b21QuizScore = 0;
      const scoreEl = document.getElementById('b21-arena-score');
      if (scoreEl) scoreEl.textContent = 'Điểm: 0 / 50';
      const nextBtn = document.getElementById('btn-b21-next-q');
      if (nextBtn) nextBtn.onclick = nextB21Question;
      renderB21QuizQuestion();
    }

    function resetB21InteractiveState() {
      if (currentPartB21 === 'part1') {
        b21SelectedJar = 1;
        drawB21HalogenJars();
      } else if (currentPartB21 === 'part2') {
        simB21Displacement('cl2_nabr');
      } else if (currentPartB21 === 'part3') {
        b21PrepFlowing = false;
        const btn = document.getElementById('btn-b21-prep-toggle');
        if (btn) btn.innerHTML = '▶ Đun nóng & Mở khoá HCl';
        drawB21PrepApparatus();
      } else if (currentPartB21 === 'part4') {
        resetB21QuizArena();
      }
    }



    /* ==========================================================
       LOGIC BÀI 22: HYDROGEN HALIDE & MUỐI HALIDE (CHƯƠNG 7)
       ========================================================== */
    let currentPartB22 = 'part1';
    let b22SelectedMol = 'HF';
    let b22AcidExp = 'hf_glass';
    let b22AcidActive = false;
    let b22AcidTick = 0;
    let b22AcidAnimId = null;

    let b22AgNO3State = { dropped: false, progress: 0 };
    let b22SilverAnimId = null;

    let b22QuizStep = 0;
    let b22QuizScore = 0;
    let b22QuizAnswered = false;

    const b22MolData = {
      'HF': {
        name: 'HF (Hydrogen fluoride)',
        length: '92 pm',
        energy: '565 kJ/mol',
        bp: '+19,5 °C',
        bpColor: '#dc2626',
        desc: '💡 HF có độ âm điện của F rất lớn (3,98). Liên kết H-F phân cực mạnh, tạo liên kết hydrogen liên phân tử bền (...H-F...H-F...), làm nhiệt độ sôi tăng vọt lên +19,5 °C.',
        hRadius: 16,
        xRadius: 28,
        xColor: '#84cc16'
      },
      'HCl': {
        name: 'HCl (Hydrogen chloride)',
        length: '127 pm',
        energy: '431 kJ/mol',
        bp: '-84,9 °C',
        bpColor: '#0284c7',
        desc: '💡 HCl không tạo được liên kết hydrogen. Lực hút giữa các phân tử chủ yếu là tương tác van der Waals yếu nên nhiệt độ sôi rất thấp (-84,9 °C).',
        hRadius: 16,
        xRadius: 36,
        xColor: '#22c55e'
      },
      'HBr': {
        name: 'HBr (Hydrogen bromide)',
        length: '141 pm',
        energy: '364 kJ/mol',
        bp: '-66,7 °C',
        bpColor: '#d97706',
        desc: '💡 Từ HCl đến HBr, khối lượng phân tử tăng (36,5 ➔ 81), kích thước phân tử tăng làm tương tác van der Waals mạnh hơn, khiến nhiệt độ sôi tăng lên -66,7 °C.',
        hRadius: 16,
        xRadius: 44,
        xColor: '#ea580c'
      },
      'HI': {
        name: 'HI (Hydrogen iodide)',
        length: '161 pm',
        energy: '297 kJ/mol',
        bp: '-35,8 °C',
        bpColor: '#9333ea',
        desc: '💡 HI có phân tử khối lớn nhất (128) và bán kính đám mây electron lớn nhất, tương tác van der Waals mạnh nhất trong dãy HX (trừ HF có liên kết hydrogen), nhiệt độ sôi đạt -35,8 °C.',
        hRadius: 16,
        xRadius: 52,
        xColor: '#7e22ce'
      }
    };

    const b22QuizList = [
      {
        q: "Câu 1: Chất nào sau đây có nhiệt độ sôi cao bất thường trong dãy hydrogen halide và nguyên nhân chính là gì?",
        options: [
          "HF, do giữa các phân tử hình thành liên kết hydrogen liên phân tử bền vững",
          "HCl, do phân tử khối lớn và liên kết cộng hoá trị bền",
          "HI, do tương tác van der Waals lớn nhất trong nhóm",
          "HBr, do có tính acid mạnh nhất"
        ],
        ans: 0,
        explain: "HF có nhiệt độ sôi cao bất thường (+19,5 °C) vì nguyên tử F có độ âm điện lớn (3,98) và bán kính nhỏ, tạo liên kết hydrogen liên phân tử bền: ...H-F...H-F..."
      },
      {
        q: "Câu 2: Thứ tự sắp xếp tính acid TĂNG DẦN của các dung dịch hydrohalic acid nào sau đây là đúng?",
        options: [
          "HI < HBr < HCl < HF",
          "HF < HCl < HBr < HI",
          "HCl < HBr < HI < HF",
          "HF < HI < HBr < HCl"
        ],
        ans: 1,
        explain: "Từ HF đến HI, độ dài liên kết H-X tăng (92 ➔ 161 pm) và năng lượng liên kết giảm mạnh (565 ➔ 297 kJ/mol), khiến khả năng phân li ra ion H+ trong nước tăng dần: HF (acid yếu) < HCl < HBr < HI (acid rất mạnh)."
      },
      {
        q: "Câu 3: Dung dịch acid nào sau đây hoà tan được silicon dioxide (SiO₂) và được dùng để khắc chữ, hoa văn lên thuỷ tinh?",
        options: [
          "Dung dịch Hydrochloric acid (HCl)",
          "Dung dịch Hydrofluoric acid (HF)",
          "Dung dịch Sulfuric acid đặc (H₂SO₄)",
          "Dung dịch Nitric acid (HNO₃)"
        ],
        ans: 1,
        explain: "Hydrofluoric acid (HF) ăn mòn thuỷ tinh do phản ứng: SiO₂ + 4HF ➔ SiF₄↑ + 2H₂O. Khí SiF₄ bay ra để lại rãnh khắc sâu trên kính."
      },
      {
        q: "Câu 4: Khi nhỏ dung dịch silver nitrate (AgNO₃) vào 4 ống nghiệm chứa riêng biệt NaF, NaCl, NaBr, NaI, ống nghiệm nào KHÔNG xuất hiện kết tủa?",
        options: [
          "Ống nghiệm chứa dung dịch NaCl",
          "Ống nghiệm chứa dung dịch NaBr",
          "Ống nghiệm chứa dung dịch NaF",
          "Ống nghiệm chứa dung dịch NaI"
        ],
        ans: 2,
        explain: "Muối silver fluoride (AgF) tan tốt trong nước nên ống nghiệm chứa NaF không có kết tủa. Các ống còn lại tạo kết tủa: AgCl (trắng), AgBr (vàng nhạt), AgI (vàng đậm)."
      },
      {
        q: "Câu 5: Cho các muối rắn NaCl, NaBr, NaI tác dụng với dung dịch H₂SO₄ đặc, nóng. Thứ tự tính khử của các ion halide được chứng minh là:",
        options: [
          "Cl⁻ < Br⁻ < I⁻ (Cl⁻ không khử được H₂SO₄ đặc; Br⁻ khử xuống SO₂; I⁻ khử sâu xuống H₂S)",
          "I⁻ < Br⁻ < Cl⁻",
          "Br⁻ < Cl⁻ < I⁻",
          "Cả 3 ion đều chỉ xảy ra phản ứng trao đổi tạo khí HX"
        ],
        ans: 0,
        explain: "Do bán kính ion tăng dần từ Cl⁻ đến I⁻ nên khả năng nhường electron tăng: Cl⁻ không khử được H₂SO₄ đặc; Br⁻ khử S(+6) xuống SO₂(+4); I⁻ khử mạnh S(+6) xuống tận H₂S(-2)."
      }
    ];

    function stopB22Animations() {
      if (b22AcidAnimId) {
        cancelAnimationFrame(b22AcidAnimId);
        b22AcidAnimId = null;
      }
      if (b22SilverAnimId) {
        cancelAnimationFrame(b22SilverAnimId);
        b22SilverAnimId = null;
      }
    }

    function switchPartB22(partId) {
      currentPartB22 = partId;
      stopB22Animations();

      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : (partId === 'part3' ? 'p3' : 'p4'));
      ['p1', 'p2', 'p3', 'p4'].forEach(p => {
        const btn = document.getElementById('tab-btn-b22-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3', 'part4'].forEach(p => {
        const sec = document.getElementById('content-b22-' + p);
        const panel = document.getElementById('panel-b22-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (typeof renderMathInPage === 'function') renderMathInPage();

      const tip = document.getElementById('b22-lab-status-tip');
      const hudTool = document.getElementById('b22-hud-tool');

      if (partId === 'part1') {
        if (tip) tip.innerHTML = '💡 <em>Tương tác: Chọn từng phân tử HX để quan sát cấu trúc không gian và liên kết hydrogen 2.5D.</em>';
        if (hudTool) hudTool.innerText = 'Mô Hình Liên Kết Phân Tử HX';
        setTimeout(drawB22MoleculeCanvas, 50);
      } else if (partId === 'part2') {
        if (tip) tip.innerHTML = '💡 <em>Thí nghiệm: Bấm "Bắt đầu phản ứng" để quan sát hiệu ứng bọt khí và khắc chữ trên thuỷ tinh.</em>';
        if (hudTool) hudTool.innerText = 'Ăn Mòn Thuỷ Tinh & Hydrochloric Acid';
        b22AcidActive = false;
        setTimeout(() => { drawB22AcidCanvas(); }, 50);
      } else if (partId === 'part3') {
        if (tip) tip.innerHTML = '💡 <em>Nhận biết: Bấm "Nhỏ AgNO₃ Cả 4 Ống" để quan sát giọt thuốc thử rơi và tạo kết tủa lắng dần.</em>';
        if (hudTool) hudTool.innerText = 'Giá 4 Ống Nghiệm Thuốc Thử AgNO₃';
        setTimeout(() => { drawB22SilverCanvas(); }, 50);
      } else if (partId === 'part4') {
        if (tip) tip.innerHTML = '💡 <em>Đấu trường trắc nghiệm: Hoàn thành 5 câu hỏi trọng tâm SGK Hoá học 10.</em>';
        if (hudTool) hudTool.innerText = 'Đấu Trường Trắc Nghiệm Bài 22';
        renderB22QuizQuestion();
      }
    }

    function selectB22Molecule(mol) {
      b22SelectedMol = mol;
      ['HF', 'HCl', 'HBr', 'HI'].forEach(m => {
        const btn = document.getElementById('btn-b22-mol-' + m.toLowerCase());
        if (btn) btn.classList.toggle('active', m === mol);
      });

      const d = b22MolData[mol];
      if (d) {
        const tipEl = document.getElementById('b22-mol-tip');
        if (tipEl) tipEl.innerHTML = d.desc;
      }
      drawB22MoleculeCanvas();
    }

    function drawB22MoleculeCanvas() {
      const canvas = document.getElementById('b22MolCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const d = b22MolData[b22SelectedMol];

      if (b22SelectedMol === 'HF') {
        ctx.fillStyle = '#0f172a';
        ctx.font = '700 13.5px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Chuỗi liên kết Hydrogen liên phân tử: ··· H — F ··· H — F ··· H — F ··· (t_s = +19,5 °C)', w / 2, 34);

        const startX = w / 2 - 160;
        const cy = h / 2 + 10;
        const chain = [
          { x: startX, hx: -28, fx: 28 },
          { x: startX + 160, hx: -28, fx: 28 },
          { x: startX + 320, hx: -28, fx: 28 }
        ];

        chain.forEach((pair, idx) => {
          const hX = pair.x + pair.hx;
          const fX = pair.x + pair.fx;

          ctx.beginPath();
          ctx.moveTo(hX, cy);
          ctx.lineTo(fX, cy);
          ctx.lineWidth = 4;
          ctx.strokeStyle = '#0284c7';
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(hX, cy, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#f8fafc';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#38bdf8';
          ctx.stroke();
          ctx.fillStyle = '#0369a1';
          ctx.font = '700 11px Plus Jakarta Sans';
          ctx.fillText('H', hX, cy + 4);

          ctx.font = '10px JetBrains Mono';
          ctx.fillStyle = '#0284c7';
          ctx.fillText('δ+', hX, cy - 20);

          ctx.beginPath();
          ctx.arc(fX, cy, 26, 0, Math.PI * 2);
          const fGrad = ctx.createRadialGradient(fX - 8, cy - 8, 4, fX, cy, 26);
          fGrad.addColorStop(0, '#bef264');
          fGrad.addColorStop(1, '#65a30d');
          ctx.fillStyle = fGrad;
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#4d7c0f';
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = '700 14px Plus Jakarta Sans';
          ctx.fillText('F', fX, cy + 5);

          ctx.font = '10px JetBrains Mono';
          ctx.fillStyle = '#dc2626';
          ctx.fillText('δ-', fX, cy - 32);

          if (idx < chain.length - 1) {
            const nextHx = chain[idx + 1].x + chain[idx + 1].hx;
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(fX + 26, cy);
            ctx.lineTo(nextHx - 14, cy);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#dc2626';
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = '#dc2626';
            ctx.font = '700 11px Plus Jakarta Sans';
            ctx.fillText('Liên kết H', (fX + nextHx) / 2, cy - 14);
          }
        });

      } else {
        const cx = w / 2;
        const cy = h / 2;

        ctx.fillStyle = '#0f172a';
        ctx.font = '700 13.5px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.name + ' • Nhiệt độ sôi: ' + d.bp, cx, 34);

        const hX = cx - 70;
        const xX = cx + 50;

        ctx.beginPath();
        ctx.moveTo(hX, cy);
        ctx.lineTo(xX, cy);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#0284c7';
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(cx, cy, d.xRadius + 110, d.xRadius + 50, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(2, 132, 199, 0.06)';
        ctx.fill();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = '11.5px Plus Jakarta Sans';
        ctx.fillStyle = '#64748b';
        ctx.fillText('Đám mây electron phân tử & Tương tác van der Waals', cx, cy + d.xRadius + 75);

        ctx.beginPath();
        ctx.arc(hX, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();
        ctx.fillStyle = '#0369a1';
        ctx.font = '700 13px Plus Jakarta Sans';
        ctx.fillText('H', hX, cy + 4);
        ctx.font = '10px JetBrains Mono';
        ctx.fillStyle = '#0284c7';
        ctx.fillText('δ+', hX, cy - 26);

        ctx.beginPath();
        ctx.arc(xX, cy, d.xRadius, 0, Math.PI * 2);
        const xGrad = ctx.createRadialGradient(xX - d.xRadius*0.3, cy - d.xRadius*0.3, 4, xX, cy, d.xRadius);
        xGrad.addColorStop(0, '#ffffff');
        xGrad.addColorStop(0.3, d.xColor);
        xGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = xGrad;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0f172a';
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 16px Plus Jakarta Sans';
        ctx.fillText(b22SelectedMol.replace('H',''), xX, cy + 6);
        ctx.font = '10px JetBrains Mono';
        ctx.fillStyle = '#dc2626';
        ctx.fillText('δ-', xX, cy - d.xRadius - 8);

        ctx.beginPath();
        ctx.moveTo(hX, cy + 35);
        ctx.lineTo(xX, cy + 35);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.font = '700 11.5px JetBrains Mono';
        ctx.fillStyle = '#334155';
        ctx.fillText('Độ dài lk: ' + d.length + ' • Năng lượng lk: ' + d.energy, (hX + xX) / 2, cy + 52);
      }
    }

    function selectB22AcidExp(expKey) {
      b22AcidExp = expKey;
      b22AcidActive = false;
      if (b22AcidAnimId) {
        cancelAnimationFrame(b22AcidAnimId);
        b22AcidAnimId = null;
      }

      ['hf_glass', 'hcl_zn', 'hcl_cu', 'hcl_carb'].forEach(k => {
        const btn = document.getElementById('btn-b22-exp-' + k.replace('hf_glass','hf').replace('hcl_',''));
        if (btn) btn.classList.toggle('active', k === expKey);
      });

      const descEl = document.getElementById('b22-acid-desc');
      if (expKey === 'hf_glass') {
        if (descEl) descEl.textContent = 'Phản ứng: SiO₂ + 4HF ➔ SiF₄↑ + 2H₂O (Khí SiF₄ thoát ra để lại nét khắc rãnh sâu trên kính).';
      } else if (expKey === 'hcl_zn') {
        if (descEl) descEl.textContent = 'Phản ứng: Zn + 2HCl ➔ ZnCl₂ + H₂↑ (Kẽm tan dần, sủi bọt khí hydrogen không màu mãnh liệt).';
      } else if (expKey === 'hcl_cu') {
        if (descEl) descEl.textContent = 'Phản ứng: Cu + HCl ➔ KHÔNG PHẢN ỨNG (Đồng đứng sau hydrogen trong dãy hoạt động hoá học).';
      } else if (expKey === 'hcl_carb') {
        if (descEl) descEl.textContent = 'Phản ứng: NaHCO₃ + HCl ➔ NaCl + CO₂↑ + H₂O (Bột NaHCO₃ tan nhanh với hiện tượng sủi bọt khí CO₂).';
      }

      drawB22AcidCanvas();
    }

    function runB22AcidReaction() {
      b22AcidActive = true;
      b22AcidTick = 0;
      if (b22AcidAnimId) cancelAnimationFrame(b22AcidAnimId);
      animateB22Acid();
    }

    function animateB22Acid() {
      if (!b22AcidActive || currentPartB22 !== 'part2') return;
      b22AcidTick += 1;
      drawB22AcidCanvas();
      b22AcidAnimId = requestAnimationFrame(animateB22Acid);
    }

    function drawB22AcidCanvas() {
      const canvas = document.getElementById('b22AcidCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      if (b22AcidExp === 'hf_glass') {
        const plateW = Math.min(340, w - 40);
        const plateH = 190;
        const px = (w - plateW) / 2;
        const py = (h - plateH) / 2 + 10;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fillRect(px, py, plateW, plateH);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#38bdf8';
        ctx.strokeRect(px, py, plateW, plateH);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '700 12px Plus Jakarta Sans';
        ctx.textAlign = 'left';
        ctx.fillText('TẤM KÍNH THUỶ TINH (SiO₂)', px + 14, py + 24);

        if (b22AcidActive) {
          // Ống nhỏ giọt HF di chuyển nhẹ
          const dropX = px + plateW / 2 + Math.sin(b22AcidTick * 0.05) * 45;
          ctx.beginPath();
          ctx.moveTo(dropX - 8, py - 38);
          ctx.lineTo(dropX + 8, py - 38);
          ctx.lineTo(dropX + 3, py - 6);
          ctx.lineTo(dropX - 3, py - 6);
          ctx.closePath();
          ctx.fillStyle = '#bef264';
          ctx.fill();

          // Giọt HF rơi
          const dropY = py - 4 + (b22AcidTick * 2.5) % 45;
          ctx.beginPath();
          ctx.arc(dropX, dropY, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#84cc16';
          ctx.fill();

          // Nét khắc rãnh sâu hiện rõ dần
          const alpha = Math.min(1, b22AcidTick / 45);
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.font = '800 22px Plus Jakarta Sans';
          ctx.fillStyle = '#f8fafc';
          ctx.textAlign = 'center';
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 14;
          ctx.fillText('★ HOÁ HỌC 10 - KNTT ★', px + plateW / 2, py + plateH / 2);
          ctx.font = '700 13px Plus Jakarta Sans';
          ctx.fillStyle = '#facc15';
          ctx.fillText('SiO₂ + 4HF ➔ SiF₄↑ + 2H₂O (Ăn mòn rãnh kính)', px + plateW / 2, py + plateH / 2 + 28);
          ctx.restore();

          // Bọt khí SiF4 bay lên động
          for (let i = 0; i < 10; i++) {
            const bx = px + 60 + ((i * 27) % (plateW - 120));
            const by = py + plateH / 2 - ((b22AcidTick * 1.4 + i * 15) % 75);
            ctx.beginPath();
            ctx.arc(bx, by, 3 + (i % 3), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.fill();
          }
        } else {
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '13px Plus Jakarta Sans';
          ctx.textAlign = 'center';
          ctx.fillText('Bấm "▶ Bắt đầu phản ứng" để nhỏ dung dịch HF khắc chữ lên tấm thuỷ tinh', px + plateW / 2, py + plateH / 2);
        }

      } else {
        const tubeW = 84;
        const tubeH = 215;
        const tx = (w - tubeW) / 2;
        const ty = 55;

        ctx.beginPath();
        ctx.moveTo(tx + 3, ty + 85);
        ctx.lineTo(tx + 3, ty + tubeH - 42);
        ctx.arc(tx + tubeW / 2, ty + tubeH - 42, tubeW / 2 - 3, Math.PI, 0, true);
        ctx.lineTo(tx + tubeW - 3, ty + 85);
        ctx.closePath();
        ctx.fillStyle = 'rgba(186, 230, 253, 0.35)';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx, ty + tubeH - 42);
        ctx.arc(tx + tubeW / 2, ty + tubeH - 42, tubeW / 2, Math.PI, 0, true);
        ctx.lineTo(tx + tubeW, ty);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = '700 11.5px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('dd HCl loãng', tx + tubeW / 2, ty + 110);

        if (b22AcidExp === 'hcl_zn') {
          ctx.beginPath();
          ctx.arc(tx + tubeW / 2 - 12, ty + tubeH - 25, 10, 0, Math.PI * 2);
          ctx.arc(tx + tubeW / 2 + 12, ty + tubeH - 22, 12, 0, Math.PI * 2);
          ctx.fillStyle = '#94a3b8';
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = '700 9.5px Plus Jakarta Sans';
          ctx.fillText('Zn', tx + tubeW / 2, ty + tubeH - 20);

          if (b22AcidActive) {
            for (let i = 0; i < 16; i++) {
              const bx = tx + 16 + ((i * 11) % (tubeW - 32));
              const by = ty + tubeH - 30 - ((b22AcidTick * 1.8 + i * 12) % 105);
              ctx.beginPath();
              ctx.arc(bx, by, 2.5 + (i % 2), 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
            }
            ctx.fillStyle = '#4ade80';
            ctx.font = '700 12.5px Plus Jakarta Sans';
            ctx.fillText('Khí H₂↑ thoát ra liên tục!', tx + tubeW / 2, ty + 45);
          }
        } else if (b22AcidExp === 'hcl_cu') {
          ctx.fillStyle = '#b45309';
          ctx.fillRect(tx + tubeW / 2 - 16, ty + tubeH - 35, 32, 14);
          ctx.fillStyle = '#ffffff';
          ctx.font = '700 9.5px Plus Jakarta Sans';
          ctx.fillText('Lá Cu', tx + tubeW / 2, ty + tubeH - 25);

          if (b22AcidActive) {
            ctx.fillStyle = '#f87171';
            ctx.font = '700 12.5px Plus Jakarta Sans';
            ctx.fillText('Không có bọt khí (Cu đứng sau H)', tx + tubeW / 2, ty + 45);
          }
        } else if (b22AcidExp === 'hcl_carb') {
          ctx.fillStyle = '#f1f5f9';
          ctx.fillRect(tx + tubeW / 2 - 22, ty + tubeH - 30, 44, 11);
          ctx.fillStyle = '#0f172a';
          ctx.font = '700 9px Plus Jakarta Sans';
          ctx.fillText('NaHCO₃', tx + tubeW / 2, ty + tubeH - 22);

          if (b22AcidActive) {
            for (let i = 0; i < 24; i++) {
              const bx = tx + 12 + ((i * 9) % (tubeW - 24));
              const by = ty + tubeH - 30 - ((b22AcidTick * 2.4 + i * 9) % 110);
              ctx.beginPath();
              ctx.arc(bx, by, 3 + (i % 3), 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
            }
            ctx.fillStyle = '#38bdf8';
            ctx.font = '700 12.5px Plus Jakarta Sans';
            ctx.fillText('Sủi bọt khí CO₂↑ mãnh liệt!', tx + tubeW / 2, ty + 45);
          }
        }
      }
    }

    function triggerAgNO3All() {
      b22AgNO3State.dropped = true;
      b22AgNO3State.progress = 0;
      if (b22SilverAnimId) cancelAnimationFrame(b22SilverAnimId);

      const rf = document.getElementById('b22-res-f');
      const rcl = document.getElementById('b22-res-cl');
      const rbr = document.getElementById('b22-res-br');
      const ri = document.getElementById('b22-res-i');

      if (rf) { rf.textContent = 'Không kết tủa (AgF tan)'; rf.style.color = '#64748b'; }
      if (rcl) { rcl.textContent = 'AgCl↓ trắng'; rcl.style.color = '#0284c7'; }
      if (rbr) { rbr.textContent = 'AgBr↓ vàng nhạt'; rbr.style.color = '#d97706'; }
      if (ri) { ri.textContent = 'AgI↓ vàng đậm'; ri.style.color = '#ca8a04'; }

      animateB22Silver();
    }

    function animateB22Silver() {
      if (!b22AgNO3State.dropped || currentPartB22 !== 'part3') return;
      b22AgNO3State.progress = Math.min(1, b22AgNO3State.progress + 0.025);
      drawB22SilverCanvas();
      if (b22AgNO3State.progress < 1) {
        b22SilverAnimId = requestAnimationFrame(animateB22Silver);
      }
    }

    function resetAgNO3Rack() {
      b22AgNO3State.dropped = false;
      b22AgNO3State.progress = 0;
      if (b22SilverAnimId) {
        cancelAnimationFrame(b22SilverAnimId);
        b22SilverAnimId = null;
      }
      ['f', 'cl', 'br', 'i'].forEach(k => {
        const el = document.getElementById('b22-res-' + k);
        if (el) {
          el.textContent = 'Chưa nhỏ AgNO₃';
          el.style.color = '#64748b';
        }
      });
      drawB22SilverCanvas();
    }

    function drawB22SilverCanvas() {
      const canvas = document.getElementById('b22SilverCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const tubes = [
        { label: 'Ống 1: NaF (F⁻)', ppt: null, pptColor: null },
        { label: 'Ống 2: NaCl (Cl⁻)', ppt: 'AgCl↓ (Trắng)', pptColor: '#f8fafc', strokePpt: '#94a3b8' },
        { label: 'Ống 3: NaBr (Br⁻)', ppt: 'AgBr↓ (Vàng nhạt)', pptColor: '#fef08a', strokePpt: '#eab308' },
        { label: 'Ống 4: NaI (I⁻)', ppt: 'AgI↓ (Vàng đậm)', pptColor: '#eab308', strokePpt: '#a16207' }
      ];

      const gap = w / 4;
      const tubeW = 48;
      const tubeH = 185;
      const ty = 65;

      // Giá đỡ ống nghiệm
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(20, ty + tubeH - 18, w - 40, 22);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, ty + tubeH - 18, w - 40, 22);

      tubes.forEach((t, i) => {
        const tx = gap * i + (gap - tubeW) / 2;
        const cx = tx + tubeW / 2;

        // Dung dịch trong ống
        ctx.beginPath();
        ctx.moveTo(tx + 2, ty + 65);
        ctx.lineTo(tx + 2, ty + tubeH - 22);
        ctx.arc(cx, ty + tubeH - 22, tubeW / 2 - 2, Math.PI, 0, true);
        ctx.lineTo(tx + tubeW - 2, ty + 65);
        ctx.closePath();
        ctx.fillStyle = 'rgba(224, 242, 254, 0.45)';
        ctx.fill();

        if (b22AgNO3State.dropped) {
          const p = b22AgNO3State.progress;
          // Nếu đang trong nửa đầu hành trình: vẽ giọt AgNO3 rơi từ miệng ống xuống mặt thoáng
          if (p < 0.45) {
            const dropY = ty + 5 + (p / 0.45) * 58;
            ctx.beginPath();
            ctx.arc(cx, dropY, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = '#0284c7';
            ctx.fill();
          }

          // Từ p >= 0.35: bắt đầu tạo kết tủa lắng xuống đáy
          if (t.ppt && p >= 0.3) {
            const pptRatio = Math.min(1, (p - 0.3) / 0.7);
            const pptHeight = 36 * pptRatio;
            ctx.beginPath();
            ctx.moveTo(tx + 3, ty + tubeH - 22 - pptHeight);
            ctx.lineTo(tx + 3, ty + tubeH - 22);
            ctx.arc(cx, ty + tubeH - 22, tubeW / 2 - 3, Math.PI, 0, true);
            ctx.lineTo(tx + tubeW - 3, ty + tubeH - 22 - pptHeight);
            ctx.closePath();
            ctx.fillStyle = t.pptColor;
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = t.strokePpt;
            ctx.stroke();

            ctx.fillStyle = '#0f172a';
            ctx.font = '700 11.5px Plus Jakarta Sans';
            ctx.textAlign = 'center';
            ctx.fillText(t.ppt, cx, ty + tubeH + 26);
          } else if (!t.ppt && p >= 0.45) {
            ctx.fillStyle = '#64748b';
            ctx.font = '700 11.5px Plus Jakarta Sans';
            ctx.textAlign = 'center';
            ctx.fillText('AgF tan (Trong suốt)', cx, ty + tubeH + 26);
          }
        }

        // Thành ống thuỷ tinh
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx, ty + tubeH - 22);
        ctx.arc(cx, ty + tubeH - 22, tubeW / 2, Math.PI, 0, true);
        ctx.lineTo(tx + tubeW, ty);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#64748b';
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = '700 12.5px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText(t.label, cx, ty - 14);
      });
    }

    function renderB22QuizQuestion() {
      const q = b22QuizList[b22QuizStep];
      const titleEl = document.getElementById('b22-arena-q-title');
      const textEl = document.getElementById('b22-arena-question-text');
      const optListEl = document.getElementById('b22-arena-options-list');
      const feedEl = document.getElementById('b22-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b22-next-q');

      if (titleEl) titleEl.textContent = 'Câu hỏi ' + (b22QuizStep + 1) + ' / ' + b22QuizList.length;
      if (textEl) textEl.textContent = q.q;
      if (feedEl) feedEl.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';

      b22QuizAnswered = false;
      if (!optListEl) return;
      optListEl.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-tool';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.padding = '12px 16px';
        btn.style.fontSize = '14px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '12px';
        btn.innerHTML = '<strong style="color: #0284c7;">' + letters[idx] + '.</strong> <span>' + opt + '</span>';
        btn.onclick = () => submitB22QuizAnswer(idx);
        optListEl.appendChild(btn);
      });
    }

    function submitB22QuizAnswer(selectedIdx) {
      if (b22QuizAnswered) return;
      b22QuizAnswered = true;
      const q = b22QuizList[b22QuizStep];
      const isCorrect = (selectedIdx === q.ans);
      const feedEl = document.getElementById('b22-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b22-next-q');
      const scoreEl = document.getElementById('b22-arena-score');

      if (isCorrect) {
        b22QuizScore += 10;
        if (scoreEl) scoreEl.textContent = 'Điểm: ' + b22QuizScore + ' / 50';
      }

      if (feedEl) {
        feedEl.style.display = 'block';
        if (isCorrect) {
          feedEl.style.background = '#f0fdf4';
          feedEl.style.border = '1px solid #86efac';
          feedEl.style.color = '#166534';
          feedEl.innerHTML = '<strong>✓ CHÍNH XÁC!</strong><br>' + q.explain;
        } else {
          feedEl.style.background = '#fef2f2';
          feedEl.style.border = '1px solid #fca5a5';
          feedEl.style.color = '#991b1b';
          feedEl.innerHTML = '<strong>✗ CHƯA ĐÚNG!</strong> Đáp án đúng là <strong>' + ['A','B','C','D'][q.ans] + '</strong>.<br>' + q.explain;
        }
      }

      if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        if (b22QuizStep === b22QuizList.length - 1) {
          nextBtn.innerHTML = '<span>Xem kết quả chung cuộc ➔</span>';
        } else {
          nextBtn.innerHTML = '<span>Câu tiếp theo ➔</span>';
        }
      }
    }

    function nextB22Question() {
      if (b22QuizStep < b22QuizList.length - 1) {
        b22QuizStep++;
        renderB22QuizQuestion();
      } else {
        const optListEl = document.getElementById('b22-arena-options-list');
        const textEl = document.getElementById('b22-arena-question-text');
        const titleEl = document.getElementById('b22-arena-q-title');
        const feedEl = document.getElementById('b22-arena-feedback-box');
        const nextBtn = document.getElementById('btn-b22-next-q');

        if (titleEl) titleEl.textContent = '🎉 HOÀN THÀNH ĐẤU TRƯỜNG BÀI 22!';
        if (textEl) textEl.innerHTML = 'Bạn đã hoàn thành 5/5 câu hỏi! Điểm số đạt được: <strong style="color: #0284c7; font-size: 18px;">' + b22QuizScore + ' / 50 điểm</strong>.';
        if (optListEl) optListEl.innerHTML = '';
        if (feedEl) feedEl.style.display = 'none';
        if (nextBtn) {
          nextBtn.innerHTML = '<span>↺ Làm lại đấu trường</span>';
          nextBtn.onclick = resetB22QuizArena;
        }
      }
    }

    function resetB22QuizArena() {
      b22QuizStep = 0;
      b22QuizScore = 0;
      const scoreEl = document.getElementById('b22-arena-score');
      if (scoreEl) scoreEl.textContent = 'Điểm: 0 / 50';
      const nextBtn = document.getElementById('btn-b22-next-q');
      if (nextBtn) nextBtn.onclick = nextB22Question;
      renderB22QuizQuestion();
    }

    function resetB22InteractiveState() {
      if (currentPartB22 === 'part1') {
        selectB22Molecule('HF');
      } else if (currentPartB22 === 'part2') {
        selectB22AcidExp('hf_glass');
      } else if (currentPartB22 === 'part3') {
        resetAgNO3Rack();
      } else if (currentPartB22 === 'part4') {
        resetB22QuizArena();
      }
    }



    /* ==========================================================
       LOGIC BÀI 23: ÔN TẬP & LUYỆN TẬP CHƯƠNG 7 (HALOGEN)
       ========================================================== */
    let currentPartB23 = 'part1';
    let b23SelectedNode = null;
    let b23QuizStep = 0;
    let b23QuizScore = 0;
    let b23QuizAnswered = false;

    const b23Nodes = [
      {
        id: 'center',
        x: 0.5,
        y: 0.48,
        label: 'HALOGEN (VIIA)',
        sub: 'F, Cl, Br, I',
        color: '#0284c7',
        bg: '#e0f2fe',
        desc: 'Nhóm các nguyên tố phi kim điển hình có 7 electron hoá trị, tính oxi hoá mạnh đặc trưng.'
      },
      {
        id: 'atom',
        x: 0.22,
        y: 0.26,
        label: 'Nguyên tử Halogen',
        sub: 'ns² np⁵ • Oxi hoá',
        color: '#166534',
        bg: '#dcfce7',
        desc: 'Cấu hình ns²np⁵. Xu hướng nhận 1 electron tạo X⁻: X + 1e ➔ X⁻ thể hiện tính oxi hoá mạnh. Độ âm điện giảm từ F (3,98) đến I (2,66).'
      },
      {
        id: 'element',
        x: 0.78,
        y: 0.26,
        label: 'Đơn chất Halogen',
        sub: 'X₂ • F₂, Cl₂, Br₂, I₂',
        color: '#9a3412',
        bg: '#ffedd5',
        desc: 'Phân tử X₂ liên kết CHT không cực. Nhiệt độ nóng chảy và sôi tăng dần do tương tác Van der Waals tăng. Tính oxi hoá giảm dần: F₂ > Cl₂ > Br₂ > I₂.'
      },
      {
        id: 'hx',
        x: 0.22,
        y: 0.72,
        label: 'Hydrogen Halide',
        sub: 'HX • Tính acid tăng',
        color: '#6b21a8',
        bg: '#f3e8ff',
        desc: 'HF sôi ở +19,5 °C do liên kết hydrogen. Tính acid tăng từ HF (acid yếu) đến HI (acid rất mạnh). HF ăn mòn thuỷ tinh: SiO₂ + 4HF ➔ SiF₄↑ + 2H₂O.'
      },
      {
        id: 'salt',
        x: 0.78,
        y: 0.72,
        label: 'Muối Halide',
        sub: 'Thuốc thử AgNO₃',
        color: '#0369a1',
        bg: '#e0f2fe',
        desc: 'Thuốc thử AgNO₃ nhận biết: F⁻ không tủa; Cl⁻ tủa trắng AgCl; Br⁻ tủa vàng nhạt AgBr; I⁻ tủa vàng đậm AgI. Tính khử tăng dần: Cl⁻ < Br⁻ < I⁻.'
      }
    ];

    const b23QuizList = [
      {
        q: "Câu 1 (SGK Tr.119): Liên kết trong phân tử nào sau đây có độ phân cực lớn nhất?",
        options: [
          "H — F",
          "H — Cl",
          "H — Br",
          "H — I"
        ],
        ans: 0,
        explain: "Do hiệu độ âm điện giữa H (2,20) và F (3,98) là lớn nhất (Δχ = 1,78) nên liên kết H — F có độ phân cực lớn nhất trong dãy."
      },
      {
        q: "Câu 2 (SGK Tr.119): Trong nhóm halogen, từ F đến I, bán kính nguyên tử biến đổi theo chiều nào?",
        options: [
          "Giảm dần",
          "Không đổi",
          "Tăng dần",
          "Biến đổi tuần hoàn"
        ],
        ans: 2,
        explain: "Đi từ F đến I trong cùng nhóm A, số lớp electron tăng dần (từ 2 lớp ở F đến 5 lớp ở I) nên bán kính nguyên tử tăng dần."
      },
      {
        q: "Câu 3 (SGK Tr.119): Trong dãy đơn chất từ F₂ đến I₂, chất có tính oxi hoá mạnh nhất là:",
        options: [
          "F₂",
          "Cl₂",
          "Br₂",
          "I₂"
        ],
        ans: 0,
        explain: "Fluorine (F₂) có độ âm điện lớn nhất, bán kính nhỏ nhất nên có tính oxi hoá mạnh nhất, oxi hoá được tất cả các kim loại và nước bốc cháy ngay nhiệt độ thường."
      },
      {
        q: "Câu 4 (SGK Tr.119): Khi điều chế và thu khí Cl₂ vào bình, để ngăn khí Cl₂ thoát ra ngoài gây độc, cần đậy miệng bình bằng bông tẩm dung dịch nào?",
        options: [
          "Dung dịch NaCl",
          "Dung dịch HCl",
          "Dung dịch NaOH",
          "Dung dịch KCl"
        ],
        ans: 2,
        explain: "Dung dịch kiềm NaOH phản ứng hoá học giữ khí độc Cl₂ lại tạo nước Javel không độc hại thoát ra: Cl₂ + 2NaOH ➔ NaCl + NaClO + H₂O."
      },
      {
        q: "Câu 5 (SGK Tr.119): Một hộ gia đình làm muối trên ruộng chứa 200 000 L nước biển (chứa 30 g NaCl / 1 L, hiệu suất 60%). Khối lượng muối thu được là:",
        options: [
          "1 200 kg",
          "10 000 kg",
          "6 000 kg",
          "3 600 kg"
        ],
        ans: 3,
        explain: "Khối lượng NaCl lý thuyết = 200 000 L × 30 g/L = 6 000 000 g = 6 000 kg. Với hiệu suất 60%, khối lượng muối thu được thực tế = 6 000 × 60% = 3 600 kg."
      },
      {
        q: "Câu 6 (SGK Tr.119): Cho X, Y là hai halogen tự nhiên ở 2 chu kì liên tiếp (Z_X < Z_Y). Hoà tan 0,402 g hỗn hợp NaX và NaY vào nước, cho tác dụng AgNO₃ dư thu được 0,574 g kết tủa. X và Y lần lượt là:",
        options: [
          "F và Cl",
          "Cl và Br",
          "Br và I",
          "Cl và I"
        ],
        ans: 0,
        explain: "Giả sử cả 2 đều tạo kết tủa thì n_kết_tủa = (0,574 - 0,402) / (108 - 23) = 0,00202 mol ➔ M_tb = 198,6 > 150 (vô lí). Vậy phải có 1 chất không tạo kết tủa là NaF (AgF tan). Chỉ có NaCl tạo kết tủa AgCl: n_AgCl = 0,574 / 143,5 = 0,004 mol ➔ m_NaCl = 0,234 g ➔ m_NaF = 0,402 - 0,234 = 0,168 g > 0 (thoả mãn). Vậy X là F và Y là Cl."
      }
    ];

    function switchPartB23(partId) {
      currentPartB23 = partId;
      const partNum = partId === 'part1' ? 'p1' : (partId === 'part2' ? 'p2' : 'p3');

      ['p1', 'p2', 'p3'].forEach(p => {
        const btn = document.getElementById('tab-btn-b23-' + p);
        if (btn) btn.classList.toggle('active', p === partNum);
      });

      ['part1', 'part2', 'part3'].forEach(p => {
        const sec = document.getElementById('content-b23-' + p);
        const panel = document.getElementById('panel-b23-' + p);
        if (sec) sec.classList.toggle('active', p === partId);
        if (panel) panel.style.display = (p === partId) ? 'flex' : 'none';
      });

      if (typeof renderMathInPage === 'function') renderMathInPage();

      const tip = document.getElementById('b23-lab-status-tip');
      if (partId === 'part1') {
        if (tip) tip.innerHTML = '💡 <em>Sơ đồ tư duy 2.5D: Nhấp vào từng nút để xem kiến thức cốt lõi của Chương 7.</em>';
        setTimeout(initB23Mindmap, 50);
      } else if (partId === 'part2') {
        if (tip) tip.innerHTML = '💡 <em>Điền khuyết SGK Tr. 118: Nhập câu trả lời và bấm Kiểm tra kết quả.</em>';
      } else if (partId === 'part3') {
        if (tip) tip.innerHTML = '💡 <em>Đấu trường 6 bài tập SGK Tr. 119: Hoàn thành để kết thúc trọn vẹn chương trình Hoá học 10!</em>';
        renderB23QuizQuestion();
      }
    }

    function initB23Mindmap() {
      const canvas = document.getElementById('b23MindmapCanvas');
      if (!canvas) return;

      canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        let found = null;
        b23Nodes.forEach(node => {
          const nx = node.x * w;
          const ny = node.y * h;
          const dist = Math.hypot(clickX - nx, clickY - ny);
          if (dist < 46) {
            found = node;
          }
        });

        if (found) {
          b23SelectedNode = found;
          const tEl = document.getElementById('b23-node-title');
          const dEl = document.getElementById('b23-node-desc');
          if (tEl) tEl.textContent = found.label + ' (' + found.sub + ')';
          if (dEl) dEl.textContent = found.desc;
          drawB23Mindmap();
        }
      };

      drawB23Mindmap();
    }

    function drawB23Mindmap() {
      const canvas = document.getElementById('b23MindmapCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const center = b23Nodes[0];
      const cx = center.x * w;
      const cy = center.y * h;

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#cbd5e1';
      b23Nodes.slice(1).forEach(node => {
        const nx = node.x * w;
        const ny = node.y * h;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();
      });

      b23Nodes.forEach(node => {
        const nx = node.x * w;
        const ny = node.y * h;
        const isSelected = (b23SelectedNode && b23SelectedNode.id === node.id);
        const radius = (node.id === 'center') ? 48 : 40;

        ctx.shadowColor = isSelected ? node.color : 'rgba(0,0,0,0.06)';
        ctx.shadowBlur = isSelected ? 16 : 8;

        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.bg;
        ctx.fill();
        ctx.lineWidth = isSelected ? 3.5 : 2;
        ctx.strokeStyle = node.color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = node.color;
        ctx.font = '700 ' + (node.id === 'center' ? '12px' : '11px') + ' Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ny - 4);

        ctx.fillStyle = '#64748b';
        ctx.font = '9px JetBrains Mono';
        ctx.fillText(node.sub, nx, ny + 11);
      });
    }

    function checkB23ClozeAll() {
      const q1 = (document.getElementById('b23-cloze-q1')?.value || '').trim().toLowerCase();
      const q2 = (document.getElementById('b23-cloze-q2')?.value || '').trim().toLowerCase();
      const q3 = (document.getElementById('b23-cloze-q3')?.value || '').trim().toLowerCase();
      const q4 = (document.getElementById('b23-cloze-q4')?.value || '').trim().toLowerCase();

      const c1 = (q1.includes('ns2') && q1.includes('np5')) || q1 === 'ns2np5';
      const c2 = q2.includes('oxi');
      const c3 = q3.includes('agno3') || q3.includes('bạc') || q3.includes('silver');
      const c4 = (q4.includes('cl') && q4.includes('br') && q4.includes('i')) || q4.includes('<');

      const setStyle = (id, ok) => {
        const el = document.getElementById(id);
        if (el) {
          el.style.borderColor = ok ? '#10b981' : '#ef4444';
          el.style.backgroundColor = ok ? '#f0fdf4' : '#fef2f2';
        }
      };

      setStyle('b23-cloze-q1', c1);
      setStyle('b23-cloze-q2', c2);
      setStyle('b23-cloze-q3', c3);
      setStyle('b23-cloze-q4', c4);

      const feedEl = document.getElementById('b23-cloze-feedback');
      if (feedEl) {
        feedEl.style.display = 'block';
        const total = [c1, c2, c3, c4].filter(Boolean).length;
        if (total === 4) {
          feedEl.style.background = '#f0fdf4';
          feedEl.style.border = '1px solid #86efac';
          feedEl.style.color = '#166534';
          feedEl.innerHTML = '<strong>🎉 XUẤT SẮC!</strong> Bạn đã hoàn thành chính xác 100% nội dung hệ thống hoá SGK Tr. 118.';
        } else {
          feedEl.style.background = '#fffbeb';
          feedEl.style.border = '1px solid #fde68a';
          feedEl.style.color = '#92400e';
          feedEl.innerHTML = '<strong>Đúng ' + total + ' / 4 câu.</strong><br>Đáp án gợi ý: 1. ns² np⁵; 2. tính oxi hoá; 3. dung dịch AgNO₃; 4. Cl⁻ &lt; Br⁻ &lt; I⁻.';
        }
      }
    }

    function renderB23QuizQuestion() {
      const q = b23QuizList[b23QuizStep];
      const titleEl = document.getElementById('b23-arena-q-title');
      const textEl = document.getElementById('b23-arena-question-text');
      const optListEl = document.getElementById('b23-arena-options-list');
      const feedEl = document.getElementById('b23-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b23-next-q');

      if (titleEl) titleEl.textContent = 'Bài tập ' + (b23QuizStep + 1) + ' / ' + b23QuizList.length + ' (SGK Trang 119)';
      if (textEl) textEl.textContent = q.q;
      if (feedEl) feedEl.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';

      b23QuizAnswered = false;
      if (!optListEl) return;
      optListEl.innerHTML = '';

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-tool';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.style.padding = '12px 16px';
        btn.style.fontSize = '14px';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '12px';
        btn.innerHTML = '<strong style="color: #0284c7;">' + letters[idx] + '.</strong> <span>' + opt + '</span>';
        btn.onclick = () => submitB23QuizAnswer(idx);
        optListEl.appendChild(btn);
      });
    }

    function submitB23QuizAnswer(selectedIdx) {
      if (b23QuizAnswered) return;
      b23QuizAnswered = true;
      const q = b23QuizList[b23QuizStep];
      const isCorrect = (selectedIdx === q.ans);
      const feedEl = document.getElementById('b23-arena-feedback-box');
      const nextBtn = document.getElementById('btn-b23-next-q');
      const scoreEl = document.getElementById('b23-arena-score');

      if (isCorrect) {
        b23QuizScore += 10;
        if (scoreEl) scoreEl.textContent = 'Điểm: ' + b23QuizScore + ' / 60';
      }

      if (feedEl) {
        feedEl.style.display = 'block';
        if (isCorrect) {
          feedEl.style.background = '#f0fdf4';
          feedEl.style.border = '1px solid #86efac';
          feedEl.style.color = '#166534';
          feedEl.innerHTML = '<strong>✓ CHÍNH XÁC!</strong><br>' + q.explain;
        } else {
          feedEl.style.background = '#fef2f2';
          feedEl.style.border = '1px solid #fca5a5';
          feedEl.style.color = '#991b1b';
          feedEl.innerHTML = '<strong>✗ CHƯA ĐÚNG!</strong> Đáp án đúng là <strong>' + ['A','B','C','D'][q.ans] + '</strong>.<br>' + q.explain;
        }
      }

      if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        if (b23QuizStep === b23QuizList.length - 1) {
          nextBtn.innerHTML = '<span>Tốt Nghiệp Hoá Học 10! 🏆</span>';
        }
      }
    }

    function nextB23Question() {
      if (b23QuizStep < b23QuizList.length - 1) {
        b23QuizStep++;
        renderB23QuizQuestion();
      } else {
        const optListEl = document.getElementById('b23-arena-options-list');
        const textEl = document.getElementById('b23-arena-question-text');
        const titleEl = document.getElementById('b23-arena-q-title');
        const feedEl = document.getElementById('b23-arena-feedback-box');
        const nextBtn = document.getElementById('btn-b23-next-q');

        if (titleEl) titleEl.textContent = '🎓 CHÚC MỪNG BẠN ĐÃ TỐT NGHIỆP HOÁ HỌC 10!';
        if (textEl) textEl.innerHTML = 'Bạn đã hoàn thành 100% toàn bộ 7 Chương và 23 Bài học của Sách giáo khoa Hoá học 10 (Bộ Kết nối tri thức với cuộc sống)! Điểm số Đấu trường Bài 23: <strong style="color: #0284c7; font-size: 18px;">' + b23QuizScore + ' / 60 điểm</strong>.';
        if (optListEl) optListEl.innerHTML = '';
        if (feedEl) feedEl.style.display = 'none';
        if (nextBtn) {
          nextBtn.innerHTML = '<span>↺ Làm lại đấu trường Bài 23</span>';
          nextBtn.onclick = resetB23QuizArena;
        }
      }
    }

    function resetB23QuizArena() {
      b23QuizStep = 0;
      b23QuizScore = 0;
      const scoreEl = document.getElementById('b23-arena-score');
      if (scoreEl) scoreEl.textContent = 'Điểm: 0 / 60';
      const nextBtn = document.getElementById('btn-b23-next-q');
      if (nextBtn) {
        nextBtn.onclick = nextB23Question;
      }
      renderB23QuizQuestion();
    }

    function resetB23InteractiveState() {
      if (currentPartB23 === 'part1') {
        b23SelectedNode = null;
        drawB23Mindmap();
      } else if (currentPartB23 === 'part2') {
        ['q1', 'q2', 'q3', 'q4'].forEach(k => {
          const el = document.getElementById('b23-cloze-' + k);
          if (el) {
            el.value = '';
            el.style.borderColor = '#cbd5e1';
            el.style.backgroundColor = '#ffffff';
          }
        });
        const feed = document.getElementById('b23-cloze-feedback');
        if (feed) feed.style.display = 'none';
      } else {
        resetB23QuizArena();
      }
    }


</body>
</html>
