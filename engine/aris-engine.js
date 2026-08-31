/**
 * ARIS Interactive Lesson Engine (v1.1)
 * Rock-Solid Responsive Flex/Grid Layout
 */

class ARISEngine {
  constructor(config = {}) {
    this.lessonData = config.lessonData || null;
    this.containerId = config.containerId || 'aris-slides-container';
    this.currentSceneIndex = 0;
    this.sceneStates = {};
    this.teacherMode = false;
  }

  init() {
    if (!this.lessonData) {
      console.error('ARIS Engine Error: No lesson data provided.');
      return;
    }
    this.renderAllScenes();
    this.initTeacherKeyboard();
    this.initHeaderControls();
    this.updateProgress();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderAllScenes() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.innerHTML = '';
    this.lessonData.scenes.forEach((scene, index) => {
      const sceneEl = document.createElement('div');
      sceneEl.className = `aris-scene ${index === 0 ? 'active' : ''}`;
      sceneEl.setAttribute('data-scene-id', scene.id);
      sceneEl.setAttribute('data-scene-index', index);
      sceneEl.innerHTML = this.renderSceneContent(scene, index);
      container.appendChild(sceneEl);

      this.sceneStates[index] = {
        step: 0,
        maxSteps: this.getSceneMaxSteps(scene),
        completed: false
      };
    });
  }

  getSceneMaxSteps(scene) {
    switch (scene.type) {
      case 'sentence_deconstructor': return scene.sentence.tokens.length + 1;
      case 'socratic_splitter': return 3;
      case 'ielts_upgrade': return scene.stages.length;
      default: return 1;
    }
  }

  renderSceneContent(scene, index) {
    switch (scene.type) {
      case 'hero': return this.renderHero(scene);
      case 'grammar_tree': return this.renderGrammarTree(scene);
      case 'sentence_deconstructor': return this.renderSentenceDeconstructor(scene, index);
      case 'verb_matrix': return this.renderVerbMatrix(scene);
      case 'socratic_splitter': return this.renderSocraticSplitter(scene, index);
      case 'live_quiz': return this.renderLiveQuiz(scene, index);
      case 'collocations': return this.renderCollocations(scene);
      case 'ielts_upgrade': return this.renderIELTSUpgrade(scene, index);
      default: return `<div>Scene type not supported: ${scene.type}</div>`;
    }
  }

  // 1. HERO RENDERER
  renderHero(scene) {
    return `
      <div class="grid grid-cols-12 gap-8 w-full h-full items-center">
        <div class="col-span-7 space-y-6">
          <div class="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span>${scene.badge || 'ARIS Lesson'}</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-black leading-tight text-slate-900">
            ${scene.title}
          </h1>
          <p class="text-slate-600 text-base leading-relaxed max-w-xl">
            ${scene.subtitle}
          </p>
          <div class="pt-2 flex items-center space-x-4">
            <button onclick="window.aris.nextScene()" class="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5">
              <span>Bắt đầu bài giảng (${scene.meta.scenesCount} Scenes)</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
            <div class="text-xs text-slate-500 font-mono flex items-center space-x-1">
              <i data-lucide="keyboard" class="w-3.5 h-3.5"></i>
              <span>[Space] / [→]</span>
            </div>
          </div>
        </div>

        <div class="col-span-5">
          <div class="bento-card p-6 space-y-4 shadow-xl border-2 border-blue-100 overflow-hidden relative">
            <div class="h-44 rounded-2xl bg-gradient-to-tr from-blue-800 via-blue-600 to-indigo-600 p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-md">
              <div class="absolute -right-6 -bottom-6 opacity-20">
                <i data-lucide="award" class="w-44 h-44"></i>
              </div>
              <div class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold w-fit">
                <i data-lucide="target" class="w-3.5 h-3.5 text-amber-300"></i>
                <span>Target: Band ${scene.meta.targetBand}</span>
              </div>
              <div>
                <div class="text-xs uppercase tracking-wider text-blue-200 font-semibold">ARIS Teaching System</div>
                <div class="text-2xl font-black">${this.lessonData.title}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 font-medium">
                <span class="text-blue-600 font-bold block mb-0.5">Duration</span> ${scene.meta.duration}
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 font-medium">
                <span class="text-emerald-600 font-bold block mb-0.5">Interaction</span> Socratic State
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. GRAMMAR TREE RENDERER
  renderGrammarTree(scene) {
    return `
      <div class="w-full flex flex-col justify-between h-full space-y-4">
        <div class="space-y-1">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-600">01 / Grammar Hierarchy</div>
          <h2 class="text-3xl font-extrabold text-slate-900">${scene.title}</h2>
          <p class="text-slate-600 text-sm">${scene.question}</p>
        </div>

        <div class="grid grid-cols-4 gap-4 w-full my-auto">
          ${scene.levels.map(lvl => `
            <div class="bento-card p-5 space-y-3 relative flex flex-col justify-between ${lvl.highlight ? 'border-2 border-blue-600 shadow-lg shadow-blue-500/10' : ''}">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="token-chip ${lvl.highlight ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}">LEVEL ${lvl.level}</span>
                  <span class="text-[11px] font-bold ${lvl.highlight ? 'text-blue-600 font-extrabold' : 'text-slate-400'}">${lvl.tag}</span>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900">${lvl.name}</h3>
                  <p class="text-xs text-slate-500 mt-0.5">${lvl.desc}</p>
                </div>
              </div>
              <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono space-y-1 text-slate-700">
                ${lvl.tokens ? `<div class="text-blue-600 font-bold">8 từ loại:</div><div>${lvl.tokens.join(', ')}</div>` : ''}
                ${lvl.examples ? lvl.examples.map(ex => `<div>• <em>${ex}</em></div>`).join('') : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium flex items-center justify-between">
          <span>💡 <strong>Nguyên lý:</strong> ${scene.takeaway}</span>
        </div>
      </div>
    `;
  }

  // 3. SENTENCE DECONSTRUCTOR
  renderSentenceDeconstructor(scene, index) {
    return `
      <div class="w-full flex flex-col justify-between h-full space-y-4">
        <div class="space-y-1">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-600">02 / Socratic Deconstruction</div>
          <h2 class="text-3xl font-extrabold text-slate-900">${scene.title}</h2>
          <p class="text-slate-600 text-sm">${scene.instruction}</p>
        </div>

        <div class="my-auto space-y-6 max-w-4xl mx-auto w-full">
          <div class="p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-lg space-y-4">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Sentence Analysis Canvas:</div>
            
            <div class="text-lg md:text-xl font-bold text-slate-900 leading-relaxed flex flex-wrap gap-2 items-center" id="deconstruct-tokens-${index}">
              ${scene.sentence.tokens.map((token, tIdx) => `
                <span class="deconstruct-token px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 cursor-pointer transition flex flex-col items-center" data-token-index="${tIdx}" onclick="window.aris.revealDeconstructToken(${index}, ${tIdx})">
                  <span>${token.text}</span>
                  <span class="token-role text-[10px] font-mono font-bold uppercase mt-1 text-slate-400 opacity-0 transition">${token.role}</span>
                </span>
              `).join('')}
            </div>
          </div>

          <div id="deconstruct-resolution-${index}" class="p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 opacity-30 transition space-y-2 text-center">
            <div class="text-xs font-bold uppercase tracking-widest text-blue-700 font-mono">CÔNG THỨC MỆNH ĐỀ ĐỘC LẬP</div>
            <div class="text-base font-extrabold text-slate-900 font-mono">${scene.rule.formula}</div>
            <div class="text-xs font-bold text-emerald-700 font-mono">&rarr; ${scene.rule.conclusion}</div>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
          <span class="text-xs text-slate-600">Bấm <strong>Space</strong> hoặc click vào từng cụm từ để giáo viên hướng dẫn bóc tách ngữ pháp.</span>
          <button onclick="window.aris.revealAllDeconstruct(${index})" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition">
            Bóc Tách Toàn Bộ
          </button>
        </div>
      </div>
    `;
  }

  // 4. VERB MATRIX
  renderVerbMatrix(scene) {
    return `
      <div class="w-full flex flex-col justify-between h-full space-y-4">
        <div class="space-y-1">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-600">03 / Verb Classification</div>
          <h2 class="text-3xl font-extrabold text-slate-900">${scene.title}</h2>
          <p class="text-slate-600 text-sm">${scene.subtitle}</p>
        </div>

        <div class="grid grid-cols-3 gap-5 w-full my-auto">
          ${scene.verbs.map(v => `
            <div class="bento-card p-5 space-y-3 border-t-4 border-t-${v.color === 'blue' ? 'blue-500' : v.color === 'indigo' ? 'indigo-600' : 'amber-500'}">
              <div class="flex items-center justify-between">
                <span class="token-chip bg-slate-100 text-slate-800">${v.type}</span>
                <span class="text-xs font-bold text-slate-500">${v.name}</span>
              </div>
              <h3 class="text-base font-bold text-slate-900">${v.rule}</h3>
              <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono space-y-1.5 text-slate-800">
                <div class="text-blue-700 font-bold">Cấu trúc: ${v.formula}</div>
                ${v.examples.map(ex => `<div>&bull; <em>${ex}</em></div>`).join('')}
              </div>
              ${v.warning ? `<div class="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">⚠️ ${v.warning}</div>` : ''}
            </div>
          `).join('')}
        </div>

        <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
          <span>🎯 <strong>Mẹo IELTS:</strong> Luôn học động từ kèm theo dạng tân ngữ ($V_t + O$) và giới từ bắt buộc của nó.</span>
        </div>
      </div>
    `;
  }

  // 5. SOCRATIC SPLITTER
  renderSocraticSplitter(scene, index) {
    return `
      <div class="w-full flex flex-col justify-between h-full space-y-4">
        <div class="space-y-1">
          <div class="text-xs font-bold uppercase tracking-wider text-purple-600">04 / Socratic Clause Splitter</div>
          <h2 class="text-3xl font-extrabold text-slate-900">${scene.title}</h2>
          <p class="text-slate-600 text-sm">${scene.instruction}</p>
        </div>

        <div class="my-auto space-y-6 max-w-4xl mx-auto w-full">
          <div class="grid grid-cols-11 gap-3 items-center p-6 bg-white rounded-3xl border-2 border-slate-200 shadow-xl">
            <div class="col-span-5 p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border-2 border-dashed border-slate-300 cursor-pointer transition space-y-3" id="split-part1-${index}" onclick="window.aris.revealSplitterPart(${index}, 1)">
              <div class="text-sm font-semibold text-slate-800 leading-relaxed">
                "${scene.complexSentence.part1.text}"
              </div>
              <div class="split-tag hidden p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-800">
                ${scene.complexSentence.part1.tag}
                <div class="text-[11px] font-normal text-amber-900 mt-1">${scene.complexSentence.part1.note}</div>
              </div>
            </div>

            <div class="col-span-1 text-center font-black text-xl text-slate-400" id="split-connector-${index}">
              +
            </div>

            <div class="col-span-5 p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border-2 border-dashed border-slate-300 cursor-pointer transition space-y-3" id="split-part2-${index}" onclick="window.aris.revealSplitterPart(${index}, 2)">
              <div class="text-sm font-semibold text-slate-800 leading-relaxed">
                "${scene.complexSentence.part2.text}"
              </div>
              <div class="split-tag hidden p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-800">
                ${scene.complexSentence.part2.tag}
                <div class="text-[11px] font-normal text-blue-900 mt-1">${scene.complexSentence.part2.note}</div>
              </div>
            </div>
          </div>

          <div id="split-formula-${index}" class="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200 text-center opacity-30 transition">
            <span class="text-xs font-mono font-bold text-purple-900">${scene.formula}</span>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
          <span class="text-xs text-slate-600">Click trực tiếp vào từng vế câu để giáo viên tương tác Socratic với lớp học.</span>
          <button onclick="window.aris.revealAllSplitter(${index})" class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition">
            Hiện Đáp Án Mệnh Đề
          </button>
        </div>
      </div>
    `;
  }

  // 6. LIVE QUIZ
  renderLiveQuiz(scene, index) {
    return `
      <div class="w-full flex flex-col justify-between h-full space-y-4">
        <div class="space-y-1">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-600">05 / Live Pedagogical Quiz</div>
          <h2 class="text-3xl font-extrabold text-slate-900">${scene.title}</h2>
          <p class="text-slate-600 text-sm">${scene.prompt}</p>
        </div>

        <div class="my-auto max-w-4xl mx-auto w-full space-y-4">
          <div class="p-5 rounded-2xl bg-slate-900 text-white shadow-lg space-y-2">
            <div class="text-xs font-mono text-amber-300 uppercase font-bold">CÂU HỎI TRẮC NGHIỆM:</div>
            <div class="text-base md:text-lg font-bold leading-relaxed">
              "${scene.question}"
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3" id="quiz-options-${index}">
            ${scene.options.map(opt => `
              <button class="quiz-opt-btn p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left transition flex items-start space-x-3 group" onclick="window.aris.handleQuizSelect(${index}, '${opt.id}')" data-opt-id="${opt.id}">
                <span class="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 transition">
                  ${opt.id}
                </span>
                <span class="text-xs font-semibold text-slate-800 pt-1 leading-relaxed">
                  ${opt.text}
                </span>
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback-${index}" class="hidden p-4 rounded-2xl border text-xs font-mono leading-relaxed transition"></div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
          <span class="text-xs text-slate-600">Chọn phương án để xem giải thích sư phạm chi tiết và highlight lỗi sai.</span>
          <button onclick="window.aris.resetQuiz(${index})" class="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition">
            Làm Lại (Reset)
          </button>
        </div>
      </div>
    `;
  }

  // 7. COLLOCATIONS
  renderCollocations(scene) {
    return `
      <div class="w-full flex flex-col justify-between h-full space-y-4">
        <div class="space-y-1">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-600">06 / Academic Lexicon</div>
          <h2 class="text-3xl font-extrabold text-slate-900">${scene.title}</h2>
          <p class="text-slate-600 text-sm">Bộ 4 cụm từ $V_t + \text{Object}$ kinh điển bắt buộc trong IELTS Writing:</p>
        </div>

        <div class="grid grid-cols-2 gap-4 w-full my-auto">
          ${scene.items.map(item => `
            <div class="bento-card img-wrapper p-4 flex space-x-4 items-center border-l-4 border-l-emerald-600">
              <div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                <img src="${item.image}" alt="${item.topic}" class="w-full h-full object-cover img-zoom">
              </div>
              <div class="space-y-1 flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] text-emerald-700 font-mono font-bold">#${item.num} · ${item.topic}</span>
                  <span class="text-[11px] font-semibold text-slate-400">${item.vietnamese}</span>
                </div>
                <div class="text-xs font-bold text-slate-800 leading-relaxed">
                  ${item.sentence}
                </div>
                <div class="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                  <strong class="text-emerald-700">Synonyms:</strong> ${item.verb} + ${item.object}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>💡 Học theo Collocation $V_t + O$ giúp điểm Lexical Resource bứt phá từ Band 6.0 lên Band 7.5+.</span>
        </div>
      </div>
    `;
  }

  // 8. IELTS TRANSFORMATION
  renderIELTSUpgrade(scene, index) {
    return `
      <div class="w-full flex flex-col justify-between h-full space-y-4">
        <div class="space-y-1">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-600">07 / IELTS Transformation Pipeline</div>
          <h2 class="text-3xl font-extrabold text-slate-900">${scene.title}</h2>
          <p class="text-slate-600 text-sm">${scene.instruction}</p>
        </div>

        <div class="my-auto max-w-4xl mx-auto w-full space-y-4">
          ${scene.stages.map((stg, sIdx) => `
            <div class="upgrade-stage bento-card p-5 space-y-2 border-l-4 border-l-${stg.color === 'slate' ? 'slate-400' : stg.color === 'amber' ? 'amber-500' : 'emerald-600'} ${sIdx > 0 ? 'opacity-40' : ''}" id="upgrade-stage-${index}-${sIdx}">
              <div class="flex items-center justify-between">
                <span class="token-chip ${stg.color === 'slate' ? 'bg-slate-100 text-slate-700' : stg.color === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700 font-extrabold'}">${stg.band}</span>
                <span class="text-xs text-slate-400 font-mono">Stage 0${sIdx + 1}</span>
              </div>
              <div class="text-sm md:text-base font-bold text-slate-900 leading-relaxed font-sans">
                "${stg.sentence}"
              </div>
              ${stg.breakdown ? `
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap gap-2 text-xs font-mono">
                  ${stg.breakdown.map(b => `<span class="px-2 py-0.5 rounded bg-${b.color}-100 text-${b.color}-800 font-semibold">${b.type}</span>`).join('')}
                </div>
              ` : ''}
              <p class="text-xs text-slate-600 italic">&bull; ${stg.analysis}</p>
            </div>
          `).join('')}
        </div>

        <div class="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
          <span class="text-xs text-slate-600">Bấm nút để nâng cấp từng bước lên chuẩn Band 8.0+.</span>
          <button onclick="window.aris.advanceUpgrade(${index})" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center space-x-2">
            <i data-lucide="zap" class="w-4 h-4"></i>
            <span>Morph & Upgrade (Tiếp Theo)</span>
          </button>
        </div>
      </div>
    `;
  }

  // INTERACTIVE HANDLERS
  revealDeconstructToken(sceneIdx, tokenIdx) {
    const tokenEl = document.querySelector(`#deconstruct-tokens-${sceneIdx} [data-token-index="${tokenIdx}"]`);
    if (!tokenEl) return;
    const roleEl = tokenEl.querySelector('.token-role');
    tokenEl.classList.add('bg-blue-50', 'border-blue-400', 'shadow-sm');
    roleEl.classList.remove('opacity-0');
    roleEl.classList.add('text-blue-700');

    const totalTokens = this.lessonData.scenes[sceneIdx].sentence.tokens.length;
    const revealed = document.querySelectorAll(`#deconstruct-tokens-${sceneIdx} .token-role:not(.opacity-0)`).length;
    if (revealed === totalTokens) {
      const res = document.getElementById(`deconstruct-resolution-${sceneIdx}`);
      if (res) res.classList.remove('opacity-30');
    }
  }

  revealAllDeconstruct(sceneIdx) {
    const tokens = document.querySelectorAll(`#deconstruct-tokens-${sceneIdx} .deconstruct-token`);
    tokens.forEach((t, i) => this.revealDeconstructToken(sceneIdx, i));
  }

  revealSplitterPart(sceneIdx, partNum) {
    const card = document.getElementById(`split-part${partNum}-${sceneIdx}`);
    if (!card) return;
    const tag = card.querySelector('.split-tag');
    tag.classList.remove('hidden');
    card.classList.add('border-solid');
    card.classList.remove('border-dashed');

    const p1 = document.querySelector(`#split-part1-${sceneIdx} .split-tag:not(.hidden)`);
    const p2 = document.querySelector(`#split-part2-${sceneIdx} .split-tag:not(.hidden)`);
    if (p1 && p2) {
      document.getElementById(`split-connector-${sceneIdx}`).classList.add('text-purple-600');
      document.getElementById(`split-formula-${sceneIdx}`).classList.remove('opacity-30');
    }
  }

  revealAllSplitter(sceneIdx) {
    this.revealSplitterPart(sceneIdx, 1);
    this.revealSplitterPart(sceneIdx, 2);
  }

  handleQuizSelect(sceneIdx, optId) {
    const scene = this.lessonData.scenes[sceneIdx];
    const option = scene.options.find(o => o.id === optId);
    const feedbackBox = document.getElementById(`quiz-feedback-${sceneIdx}`);
    const btns = document.querySelectorAll(`#quiz-options-${sceneIdx} .quiz-opt-btn`);

    btns.forEach(btn => {
      btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'border-rose-500', 'bg-rose-50');
      if (btn.getAttribute('data-opt-id') === optId) {
        if (option.isCorrect) {
          btn.classList.add('border-emerald-500', 'bg-emerald-50');
        } else {
          btn.classList.add('border-rose-500', 'bg-rose-50');
        }
      }
    });

    feedbackBox.classList.remove('hidden', 'bg-emerald-50', 'border-emerald-300', 'text-emerald-950', 'bg-rose-50', 'border-rose-300', 'text-rose-950');
    if (option.isCorrect) {
      feedbackBox.classList.add('bg-emerald-50', 'border-emerald-300', 'text-emerald-950');
      feedbackBox.innerHTML = `<strong>ĐÁP ÁN ĐÚNG!</strong> ${option.feedback}`;
    } else {
      feedbackBox.classList.add('bg-rose-50', 'border-rose-300', 'text-rose-950');
      feedbackBox.innerHTML = `<strong>CHƯA CHÍNH XÁC:</strong> ${option.feedback}`;
    }
  }

  resetQuiz(sceneIdx) {
    const feedbackBox = document.getElementById(`quiz-feedback-${sceneIdx}`);
    feedbackBox.classList.add('hidden');
    const btns = document.querySelectorAll(`#quiz-options-${sceneIdx} .quiz-opt-btn`);
    btns.forEach(btn => {
      btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'border-rose-500', 'bg-rose-50');
    });
  }

  advanceUpgrade(sceneIdx) {
    const state = this.sceneStates[sceneIdx];
    state.step = (state.step + 1) % 3;
    const stages = document.querySelectorAll(`[id^="upgrade-stage-${sceneIdx}-"]`);
    stages.forEach((stg, idx) => {
      if (idx <= state.step) {
        stg.classList.remove('opacity-40');
        stg.classList.add('shadow-md');
      } else {
        stg.classList.add('opacity-40');
      }
    });
  }

  // NAVIGATION & PROGRESS
  nextScene() {
    if (this.currentSceneIndex < this.lessonData.scenes.length - 1) {
      this.goToScene(this.currentSceneIndex + 1);
    }
  }

  prevScene() {
    if (this.currentSceneIndex > 0) {
      this.goToScene(this.currentSceneIndex - 1);
    }
  }

  goToScene(index) {
    const scenes = document.querySelectorAll('.aris-scene');
    scenes.forEach((s, idx) => {
      if (idx === index) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
    this.currentSceneIndex = index;
    this.updateProgress();
    if (window.lucide) window.lucide.createIcons();
  }

  updateProgress() {
    const curEl = document.getElementById('currentSceneNum');
    const totEl = document.getElementById('totalSceneNum');
    const barEl = document.getElementById('progressBar');
    const selEl = document.getElementById('sceneSelect');

    const total = this.lessonData.scenes.length;
    if (curEl) curEl.textContent = String(this.currentSceneIndex + 1).padStart(2, '0');
    if (totEl) totEl.textContent = String(total).padStart(2, '0');
    if (barEl) barEl.style.width = `${((this.currentSceneIndex + 1) / total) * 100}%`;
    if (selEl) selEl.value = this.currentSceneIndex;
  }

  initHeaderControls() {
    const selEl = document.getElementById('sceneSelect');
    if (selEl) {
      selEl.innerHTML = this.lessonData.scenes.map((s, idx) => `
        <option value="${idx}">Scene ${idx + 1}: ${s.title.substring(0, 32)}...</option>
      `).join('');
      selEl.addEventListener('change', (e) => this.goToScene(parseInt(e.target.value)));
    }
  }

  initTeacherKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'PageDown') {
        this.nextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        this.prevScene();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullScreen();
      } else if (e.key === 't' || e.key === 'T') {
        this.toggleTeacherMode();
      } else if (e.key === 'r' || e.key === 'R') {
        this.resetCurrentScene();
      }
    });
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  toggleTeacherMode() {
    this.teacherMode = !this.teacherMode;
    const btn = document.getElementById('toggleAnswersBtn');
    if (this.teacherMode) {
      btn.classList.add('bg-amber-500', 'text-white');
      btn.classList.remove('bg-amber-50', 'text-amber-800');
      this.revealAllDeconstruct(this.currentSceneIndex);
      this.revealAllSplitter(this.currentSceneIndex);
    } else {
      btn.classList.remove('bg-amber-500', 'text-white');
      btn.classList.add('bg-amber-50', 'text-amber-800');
    }
  }

  resetCurrentScene() {
    const scene = this.lessonData.scenes[this.currentSceneIndex];
    if (scene.type === 'live_quiz') this.resetQuiz(this.currentSceneIndex);
  }
}

window.ARISEngine = ARISEngine;
