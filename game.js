"use strict";

const cases = [
  ["세계적 배경", "온실가스 배출이 누적되면서 지구가 따뜻해지고 극심한 폭염의 위험이 커집니다. 노동·주거·건강·돌봄 조건에 따라 피해와 대응 능력은 달라집니다."],
  ["우리 동네의 폭염", "한빛동에 여러 날 폭염특보가 이어졌습니다. 걸어서 오는 주민이 이동 중 더위를 피하기 어렵다고 했고, 학습관은 다음 주 수요일 오후 2시 수업을 옮기려 합니다."],
  ["수업 변경안", "오후 7시가 우선 제안이고 오전 10시도 가능합니다. 오전에는 근무, 저녁에는 돌봄 때문에 참여하기 어려운 주민이 있습니다. 시간 변경만으로 이동 위험이 해소되지는 않습니다."],
  ["공지 전달", "한국어 문자와 게시판만 사용했습니다. 근무 중 문자를 확인하지 못한 주민과 공지를 정확히 이해하지 못한 주민이 있었습니다."],
  ["학습 참여", "수업에 참여하려면 시간을 아는 것 외에도 근무·돌봄 일정 조정, 공지 이해, 안전한 이동이 필요합니다. 응답하지 않은 주민의 참여 가능 여부는 확인되지 않았습니다."]
];
const residents = [
  { name:"지훈", role:"교대근무 주민", lines:["이번 수업 날에는 오전 6시부터 오후 2시까지 일해서 오전 수업에는 못 갑니다. 오후 7시면 갈 수 있어요.","작업 중에는 휴대전화를 보기 어려워서 문자를 늦게 확인합니다. 답을 안 했다고 괜찮다는 뜻은 아니에요.","다음 교대 때는 근무표가 달라져요. 앞으로도 저녁이 항상 좋다고 생각하지는 말아 주세요."] },
  { name:"마리아", role:"한국어 공지를 읽기 어려운 주민", lines:["두 시간 모두 가능하고 수업에 계속 참여하고 싶어요.","일상 대화는 하지만 ‘이견’이나 ‘간주’ 같은 공지 표현은 이해하기 어렵습니다.","이미 결정된 건지 제 의견을 묻는 건지 헷갈렸어요. 쉬운 문장이나 제가 이해할 수 있는 언어로 설명해 주면 의견을 말할 수 있습니다."] },
  { name:"수진", role:"가족 돌봄을 맡은 주민", lines:["오전에는 돌봄을 대신해 줄 사람이 있어 수업에 갈 수 있습니다. 저녁에는 제가 돌봐야 합니다.","더위를 피하려는 이유는 이해하지만 저녁으로 옮기면 저는 수업을 놓칩니다. 다른 시간에 배울 방법도 정해 주세요."] },
  { name:"영호", role:"폭염 중 이동이 어려운 주민", lines:["집이 더워 냉방이 되는 학습관이 도움이 됩니다. 그런데 학습관까지 가는 길에 그늘이 적고 오래 걸어야 합니다.","오전이나 저녁에도 이동이 걱정됩니다. 안전하게 갈 방법이 있는지 알려 주세요."] }
];
const proposals = [
  {
    ask:"정규 수업을 오후 7시로 옮기는 데 동의하나요?",
    agree:["저녁 수업에 온 지훈", "수요일 저녁, 지훈은 교대근무를 마치고 평생학습관에 도착했습니다. 같은 시간에 가족을 돌봐야 하는 수진의 자리는 비었습니다. 운영팀이 보충 수업 시간을 수진과 다시 정할 수 있습니다."],
    disagree:["오전 수업에 온 수진", "운영팀은 저녁 대신 오전 10시를 우선 검토했습니다. 수진은 돌봄을 부탁하고 수업에 올 수 있지만, 지훈은 근무 중입니다. 저녁 보충 수업이 가능한지 지훈에게 물어볼 수 있습니다."]
  },
  {
    ask:"쉬운 한국어 공지에 번역이나 음성 안내와 이해 확인을 더하는 데 동의하나요?",
    agree:["마리아에게서 돌아온 첫 답변", "마리아는 자신이 이해하기 편한 언어로 음성 안내를 듣고 ‘아직 시간을 정하는 중이군요’라고 확인했습니다. 이어 참여가 어려운 조건을 전화로 설명했고, 운영팀은 그 의견을 회의 기록에 남겼습니다."],
    disagree:["공지는 받았지만 답하기 어려웠던 마리아", "운영팀은 쉬운 한국어 공지와 전화 접수를 유지했습니다. 마리아는 시간을 읽었지만 언제까지 의견을 내야 하는지 확신이 없어 답하지 못했습니다. 운영팀은 답을 기다리면서 어떤 안내가 더 필요한지 확인할 수 있습니다."]
  },
  {
    ask:"정규 수업에 올 수 없는 주민과 다른 시간의 보충 학습을 마련하는 데 동의하나요?",
    agree:["수진과 함께 정한 보충 시간", "정규 수업이 저녁에 열렸지만 수진은 돌봄 일정에 맞춘 다음 날 오전 보충에 참여했습니다. 운영팀은 보충 시간을 조정할 인력과 공간이 드는 만큼, 다음 폭염 때도 운영할 수 있는지 확인해야 합니다."],
    disagree:["자료를 받았지만 질문할 곳이 없었던 수진", "저녁 수업에 오지 못한 수진은 학습 자료를 받았습니다. 혼자 읽다 막힌 부분을 질문할 기회는 없었습니다. 운영팀은 정규 시간 재검토나 짧은 전화 학습 안내를 제안할 수 있습니다."]
  },
  {
    ask:"이동 지원을 조정하고 당일 위험하면 대면 참여 방식을 다시 검토하는 데 동의하나요?",
    agree:["이동 지원을 확인한 운영팀", "운영팀은 동네 복지기관에 차량을 문의했습니다. 차량이 확보된 날에는 영호가 수업에 왔고, 확보되지 않은 날에는 폭염특보를 확인해 전화 학습을 제안했습니다. 기관마다 담당과 연락 시점을 정해 두었습니다."],
    disagree:["저녁에도 더워 발걸음을 돌린 영호", "수업을 저녁으로 옮겼지만 골목의 더위는 오래 남았습니다. 영호는 이동 지원 없이 걷다가 집으로 돌아갔습니다. 운영팀은 다음 회의에서 안전 확인과 대체 참여 방법을 함께 논의할 수 있습니다."]
  }
];
const voteNames = {agree:"동의해요",disagree:"동의하지 않아요"};
const supports = [
  ["보충 학습", "다른 시간에 보충 수업을 열거나 개별 학습을 안내합니다. 가능한 시간은 주민과 확인합니다."],
  ["언어·이해 지원", "선호 언어를 확인하고 번역·통역이나 음성 안내를 제공합니다. 이해 여부도 확인합니다."],
  ["안전한 이동 지원", "이동 동행이나 차량 지원을 조정합니다. 운영 가능 여부와 당일 기상 상황을 확인합니다."]
];
const originalTitle = "한빛동 평생학습관 수업 운영 변경 안내";
const noticeLines = [
  "폭염에 따른 운영 효율화 및 수강생 안전 확보를 위하여 다음 주 수요일 수업 시간을 기존 14:00에서 19:00로 일괄 변경할 예정입니다.",
  "변경 관련 이견은 전날 18:00까지 본 문자에 회신하시기 바랍니다. 기한 내 회신이 없을 경우 변경에 동의한 것으로 간주합니다.",
  "변경 시간에 참석이 어려운 수강생은 개별적으로 학습 내용을 확인하시기 바랍니다.",
  "추가 사항은 학습관 게시판을 참조하시기 바랍니다."
];
const original = originalTitle + "\n\n" + noticeLines.join("\n\n") + "\n\n한빛동 평생학습관 운영팀";
const steps = ["주민 대화","사례 분석","공동 결정","공지 수정","실천 기록"];
const titles = ["주민의 제안을 듣고 선택하세요","폭염은 어떻게 수업을 바꿀까요?","수업 시간과 지원을 정하세요","주민에게 보낼 공지를 고치세요","두 관점에서 결정 이유를 설명하세요"];
const times = {"10":"오전 10시","19":"오후 7시"};
const statuses = ["시행안으로 제안","조건부 제안","추가 의견 수렴 후 재결정"];
const guides = [
  "주민마다 동의 여부를 선택하고 후속 사례를 확인하세요. 적어도 한 주민의 말에서 판단에 영향을 준 대목과 이유를 남기세요.",
  "자료를 두 개 이상 골라 폭염과 학습 기회의 차이를 연결하세요.",
  "주민 의견을 듣고 시간 하나와 추가 지원 두 가지를 잠정 선택하세요.",
  "바꿀 부분을 표시하고 실제로 전달할 문구와 방법을 적으세요.",
  "두 질문에 각각 답하고 주민 참여와 공동 대응이 만나는 지점을 적으세요."
];
const fresh = () => ({
  mode:"welcome", step:0, far:0, remaining:600000, end:null, evidence:[], support:[],
  marks:{}, changes:{}, team:"", scene:0, votes:{}, dialogueVersion:1
});
const storageKey = "hanbit-class-prototype-v1";
let state = fresh();
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved) {
    state = {...state,...saved};
    if (!saved.dialogueVersion&&state.mode==="play"&&state.far<2) {
      state.step=0;
      state.far=0;
    }
  }
} catch {}
const get = id => document.getElementById(id);
const game = get("game");
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch {}
}
function esc(value = "") {
  return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function field(label,key,hint="",multiline=true) {
  const attrs = `data-key="${key}" placeholder="${esc(hint)}"`;
  return `<label class="field">${label}${multiline ? `<textarea rows="2" ${attrs}>${esc(state[key])}</textarea>` : `<input type="text" value="${esc(state[key])}" ${attrs}>`}</label>`;
}
function select(label,key,options,value=state[key]) {
  return `<label class="field">${label}<select data-key="${key}"><option value="">선택하세요</option>${options.map(([id,name])=>`<option value="${id}" ${String(value)===String(id)?"selected":""}>${name}</option>`).join("")}</select></label>`;
}
function choice(name,value,label,checked,type="checkbox",disabled=false) {
  return `<label class="choice"><input type="${type}" name="${name}" value="${value}" ${checked?"checked":""} ${disabled?"disabled":""}><span>${label}</span></label>`;
}
function panels(item) {
  return `<section class="panel">${item}</section>`;
}
function hero(kicker,title,body,welcome=false) {
  return `<div class="hero ${welcome?"welcome":""}">${welcome?'<div class="hero-art" aria-hidden="true"><i class="sun"></i><i class="hill"></i><i class="hill second"></i><i class="house"></i></div>':""}<div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${body}</p></div>`;
}
const perspectives = `<div class="grid"><div class="perspective"><strong>민주시민 관점</strong><p>권리와 책임을 이해하고 공동체의 의사결정에 참여합니다. 수업 시간 변경에 주민 의견을 어떻게 반영할까요?</p></div><div class="perspective"><strong>세계시민 관점</strong><p>지역과 세계의 연결을 이해하고 서로 다른 피해에 대응합니다. 기후위기의 영향에 어떤 공동 책임을 질까요?</p></div></div><p class="dim">두 관점 모두 다양성과 참여를 존중합니다. 민주시민 관점은 결정 절차에, 세계시민 관점은 지역과 세계의 연결과 불균등한 영향에 더 주목합니다.</p>`;
function caseCards(interactive=false) {
  return cases.map(([title,desc],index)=>{
    const label = `<strong>자료 ${index+1} · ${title}</strong><small>${desc}</small>`;
    return interactive ? choice("evidence",index,label,state.evidence.includes(index)) : `<div class="row">${label}</div>`;
  }).join("");
}
function roleCards() {
  return residents.map(r=>`<div class="row"><strong>${r.name} · ${r.role}</strong><blockquote>${r.lines.join(" ")}</blockquote></div>`).join("");
}
function navigation() {
  get("steps").innerHTML=steps.map((name,index)=>`<button class="step" data-step="${index}" ${state.mode==="play"&&state.step===index?'aria-current="step"':""} ${state.mode!=="play"||index>state.far?"disabled":""}><span aria-hidden="true">${String(index+1).padStart(2,"0")}</span>${name}</button>`).join("");
  get("refs").innerHTML=[
    ["case","▤","폭염과 학습 기회"],["roles","♙","주민 진술 카드"],["notice","▧","공지 원문"],["views","◇","두 시민 관점"]
  ].map(([id,icon,label])=>`<button class="ref-btn" data-ref="${id}"><span aria-hidden="true">${icon}</span>${label}</button>`).join("")+`<p>회의 도중에도 자료를 다시 열어볼 수 있습니다.</p>`;
  get("pause").hidden=state.mode!=="play";
  get("pause").textContent=state.end?"일시 정지":"계속하기";
  get("reset").hidden=state.mode==="welcome";
}
function welcome() {
  return hero("한빛동 평생학습관 · 가상 사례","폭염 속 우리 동네 수업","폭염으로 오후 수업을 옮겨야 합니다. 주민 네 명을 만나 제안에 답하고, 선택 뒤에 벌어지는 일을 확인하세요.",true)
    +panels(`<h2>오늘 회의에서 할 일</h2><p class="dim">혼자 플레이하거나 4~5명이 한 화면에서 상의하며 선택하세요. 주민의 제안은 한 명씩 공개됩니다.</p>${perspectives}${field("모둠 이름 (선택)","team","예: 한빛 1모둠",false)}<div class="actions"><span class="dim">10분 · 5단계</span><button class="primary" data-act="start">10분 회의 시작</button></div>`);
}
function dialogueStage() {
  const index=state.scene;
  const resident=residents[index];
  const proposal=proposals[index];
  const vote=state.votes[index];
  const hasNext=index<residents.length-1;
  const branch=vote&&proposal[vote];
  return panels(`<div class="dialogue-progress"><span>주민 ${index+1} / ${residents.length}</span><span>${Object.keys(state.votes).length}명 답변 완료</span></div>
    <div class="dialogue-scene resident-${index}">
      <div class="portrait" aria-hidden="true"><i class="portrait-body"></i><i class="portrait-neck"></i><i class="portrait-face"></i><i class="portrait-hair"></i><i class="portrait-eyes"></i><i class="portrait-mouth"></i></div>
      <div class="speech"><strong>${resident.name}</strong><span>${resident.role}</span><p>${resident.lines.join(" ")}</p></div>
    </div>
    <h2 class="proposal">${proposal.ask}</h2>
    <div class="vote-options" role="group" aria-label="제안에 대한 응답">${Object.entries(voteNames).map(([id,label])=>`<button type="button" class="vote" data-vote="${id}" aria-pressed="${vote===id}">${label}</button>`).join("")}</div>
    ${branch?`<div class="branch" tabindex="-1" id="branch"><div class="branch-label">선택에 따른 가상 사례</div><h3>${branch[0]}</h3><p>${branch[1]}</p>${field("이 주민의 말 중 판단에 영향을 준 대목과 이유","reflection"+index,"예: ‘답을 안 했다고 괜찮다는 뜻은 아니에요’라는 말에서 무응답 주민의 의견을 확인할 필요를 느꼈습니다.")}</div>`:""}
    <div class="actions">${index>0?'<button class="quiet" data-act="prev-resident">이전 주민</button>':'<span></span>'}
    ${hasNext&&branch?'<button class="primary" data-act="next-resident">다음 주민 만나기</button>':""}</div>`);
}
function voteSummary() {
  return residents.flatMap((r,i)=>{
    const vote=state.votes[i];
    return vote?[[r.name+" · "+voteNames[vote],proposals[i][vote][0]]]:[];
  });
}
function residentEffects() {
  if (!state.time) return "";
  const morning = state.time==="10";
  return [
    [morning,"근무 시간이 수업과 겹칩니다.",0],
    [true,"공지의 이해 여부와 의견 제출 가능 여부를 확인해야 합니다.",1],
    [!morning,"저녁에는 가족을 돌봐야 합니다.",0],
    [true,"이동 경로와 당일 기상 상황을 확인해야 합니다.",2]
  ].map(([barrier,reason,support],index)=>{
    if (!barrier) return [residents[index].name,"시간상 참여 가능","선택한 시간과 일정이 맞습니다."];
    if (state.support.includes(support)) return [residents[index].name,"지원 후 확인 필요",reason];
    return [residents[index].name,index===0||index===2?"참여 어려움":"확인 필요",reason];
  });
}
function decisionChoices() {
  const locked = Boolean(state.decisionLocked);
  return `<h2>수요일 수업 시간</h2><div class="grid">${Object.entries(times).map(([id,name])=>choice("time",id,name,state.time===id,"radio",locked)).join("")}</div><h3 style="margin-top:18px">추가 지원 <span class="dim" id="tokens">남은 토큰 ${2-state.support.length}개</span></h3><p class="dim">냉방 공간, 쉬운 한국어 공지, 전화 의견 접수는 기본 제공됩니다. 위험한 날에는 연기나 대체 방식을 검토합니다.</p>${supports.map(([name,desc],i)=>choice("support",i,`<strong>${name}</strong><small>${desc}</small>`,state.support.includes(i),"checkbox",locked||(state.support.length===2&&!state.support.includes(i)))).join("")}`;
}
function decisionStage() {
  const revised = state.decisionLocked;
  return panels(`${voteSummary().length?'<details open><summary>주민 제안에 남긴 답변</summary>'+rows(voteSummary())+'<p class="dim">각 답변은 제안 하나에 대한 의견입니다. 아래에서 시간과 지원을 하나의 운영안으로 조정하세요.</p></details>':""}<details><summary>주민별로 10초씩 발언하기</summary><p>“저는 ______ 때문에 참여가 어렵거나 가능합니다. ______을 고려해 주세요.” 먼저 합의를 시도하고, 투표했다면 반대 의견을 남기세요.</p>${roleCards()}</details>${field("주민 의견 및 반대 의견","opinions","누구에게 어떤 조건이나 이견이 있었나요?")}${decisionChoices()}${!state.revealed?'<div class="actions"><button class="primary" data-act="reveal">잠정안 영향 확인</button></div>':revised?'':'<div class="callout">추가 확인 결과, 두 주민이 공지를 받거나 이해했는지 확인되지 않았습니다. 의견을 다시 확인하는 방법을 정하고, 필요하면 시간과 지원을 한 번 수정하세요.</div><div class="actions"><button class="quiet" data-act="lock">이 조합으로 확정</button></div>'}<div id="effects">${state.revealed?effectsMarkup():""}</div>`)
    +(state.revealed?panels(`<h2>결정과 후속 조치</h2>${select("결정 상태","status",statuses.map((name,i)=>[i,name]))}${field("선택한 시간과 지원의 이유","reason")}${field("남은 문제 / 담당자 / 확인 시점","follow","예: 운영팀이 화요일 오후까지 영호의 이동 가능 여부를 확인합니다.")}`):"");
}
function effectsMarkup() {
  return `<div style="margin-top:16px"><strong>주민별 영향</strong>${residentEffects().map(([name,status,reason])=>`<div class="row"><strong>${name}</strong><span class="result-status ${status==="시간상 참여 가능"?"":"warn"}">${status}</span>${reason}</div>`).join("")}</div>`;
}
function noticeStage() {
  return panels(`<h2>원문에서 최소 두 곳을 표시하세요</h2><p class="dim">${originalTitle}</p><ul class="notice-lines">${noticeLines.map((line,i)=>{
    const mark = state.marks[i]||"";
    return `<li><div class="row">${line}</div>${select("이 대목을 어떻게 고칠까요?","mark"+i,[["delete","삭제"],["replace","바꾸기"],["add","추가"]],mark)}${mark&&mark!=="delete"?field(mark==="add"?"추가할 문구":"바꿀 문구","change"+i,"주민에게 전달할 쉬운 문장"): ""}</li>`;
  }).join("")}</ul>${field("전달 방법 / 의견 제출 방법","delivery","예: 문자와 전화로 알리고 전화를 포함해 의견을 받습니다.")}${field("이해 확인 / 결정 결과 재안내","confirmation","누가 언제 확인하고 결과와 이유를 어떻게 안내하나요?")}`);
}
function recordStage() {
  return panels(`<h2>실천 기록지</h2>${field("공통점과 차이점","concept","두 관점의 공통점과 각각 주목한 점을 적으세요.")}${field("민주시민 · 수업 시간 변경에 주민 의견을 어떻게 반영할까?","democratic","누구의 의견을 어떤 방법으로 듣고 결정에 반영할지 적으세요.")}${field("세계시민 · 기후위기가 주민에게 다르게 미치는 영향에 어떤 공동 책임을 질까?","global","주민마다 어떤 영향이 다른지, 어떤 주체가 어떤 지원을 맡을지 적으세요.")}${field("두 관점을 연결하는 실천","practice","주민의 제안이 지원으로 이어지려면 운영팀·지역기관·주민은 어떤 역할을 맡아야 하나요?")}`);
}
function stageContent() {
  switch(state.step) {
    case 0: return dialogueStage();
    case 1: return panels(`<h2>사례에서 근거를 고르세요</h2>${caseCards(true)}<p class="callout">세계적 기후위기 → 동네 폭염 → 수업 변경 → 공지와 생활 조건 → 학습 참여</p>${field("어떤 과정을 거쳐 학습 기회가 달라졌나요?","analysis","자료 번호를 두 개 이상 활용해 설명하세요.")}`);
    case 2: return decisionStage();
    case 3: return noticeStage();
    default: return recordStage();
  }
}
function modifiedNotice() {
  const edits = noticeLines.flatMap((line,i)=>{
    const mark = state.marks[i];
    const change = state["change"+i]?.trim();
    if (mark==="delete") return [];
    if (mark==="replace"&&change) return [change];
    if (mark==="add"&&change) return [line,change];
    return [line];
  });
  const parts = [
    "한빛동 평생학습관 수업 안내",
    ...edits,
    state.delivery&&"전달 및 의견 접수 방법 · "+state.delivery,
    state.confirmation&&"이해 확인 및 결과 안내 · "+state.confirmation,
    "한빛동 평생학습관 운영팀"
  ];
  return parts.filter(Boolean).join("\n\n");
}
function rows(entries) {
  return entries.map(([title,value])=>`<div class="row"><strong>${title}</strong><div class="pre">${esc(value?.trim?.()||"미기록")}</div></div>`).join("");
}
function records() {
  return [
    ["모둠",state.team],["사례 근거",state.evidence.map(i=>`자료 ${i+1} · ${cases[i][0]}`).join(", ")],
    ["학습 기회가 달라진 과정",state.analysis],
    ...voteSummary(),
    ...residents.flatMap((r,i)=>{
      const quote = r.lines[state["quote"+i]];
      const reflection = state["reflection"+i];
      return quote||reflection ? [[r.name+" 관점", [quote&&"“"+quote+"”",reflection].filter(Boolean).join("\n")]] : [];
    }),
    ["주민 의견 및 반대 의견",state.opinions],
    ["결정",state.time ? [times[state.time],statuses[state.status],...state.support.map(i=>supports[i][0])].filter(Boolean).join(" · ") : ""],
    ["선택 이유",state.reason],["남은 문제와 후속 조치",state.follow],
    ["두 관점의 공통점과 차이점",state.concept],["민주시민 관점",state.democratic],
    ["세계시민 관점",state.global],["함께 실천할 일",state.practice]
  ];
}
function result() {
  const changed = Object.keys(state.marks).length;
  const reflection = residents.some((r,i)=>state["reflection"+i]?.trim());
  const checks = [
    [state.evidence.length>=2&&state.analysis?.trim(),"사례 근거 두 가지 이상과 학습 참여의 연결"],
    [Object.keys(state.votes).length===residents.length,"주민 네 명의 제안에 답한 기록"],
    [reflection,"주민 진술과 판단을 연결한 기록"],
    [Boolean(state.follow?.trim()),"남은 어려움과 후속 조치"],
    [changed>=2&&Boolean(state.delivery?.trim()&&state.confirmation?.trim()),"공지 수정 및 전달·확인 계획"],
    [Boolean(state.democratic?.trim()&&state.global?.trim()&&state.practice?.trim()),"두 관점에 대한 답변과 공동 실천"]
  ];
  return hero("한빛동 주민회의","회의 결과와 실천 기록",state.expired?"10분이 끝났습니다. 시간 종료 시까지 입력한 내용을 확인하세요.":"결정안과 공지 초안을 검토한 뒤 실천 기록을 저장하세요.")
    +panels(`<h2>기록 확인</h2>${checks.map(([ok,label])=>`<div class="row"><span class="result-status ${ok?"":"warn"}">${ok?"기록 완료":"추가 확인"}</span>${label}</div>`).join("")}`)
    +panels(`<h2>주민별 영향</h2>${state.revealed?effectsMarkup():'<p class="dim">잠정안에 대한 영향을 확인하지 못했습니다.</p>'}`)
    +panels(`<h2>수정 공지 초안</h2>${changed?`<div class="pre">${esc(modifiedNotice())}</div>`:'<p class="dim">표시한 수정 사항이 없습니다.</p>'}`)
    +panels(`<h2>실천 기록지</h2>${rows(records())}`)
    +`<div class="actions"><button class="quiet" data-act="print">인쇄하기</button><button class="primary" data-act="download">기록 파일 저장</button></div>`;
}
function render(focus=false) {
  navigation();
  if (state.mode==="welcome") game.innerHTML=welcome();
  else if (state.mode==="results") game.innerHTML=result();
  else game.innerHTML=hero(`회의 ${state.step+1}단계 · ${steps[state.step]}`,titles[state.step],guides[state.step])
    +stageContent()
    +`<p class="error" id="error" role="alert" hidden></p><div class="actions">${state.step>0?'<button class="quiet" data-act="back">이전 단계</button>':'<span></span>'}${state.step!==0||Object.keys(state.votes).length===residents.length?'<button class="primary" data-act="next">'+(state.step===4?"회의 마치기":state.step===0?"사례 분석으로":"다음 단계")+'</button>':""}</div>`;
  if (focus) {
    game.focus({preventScroll:true});
    window.scrollTo(0,0);
  }
}
function remaining() {
  return state.end ? Math.max(0,state.end-Date.now()) : state.remaining;
}
function tick() {
  const left = remaining();
  const secs = Math.ceil(left/1000);
  get("clock").textContent=String(Math.floor(secs/60)).padStart(2,"0")+":"+String(secs%60).padStart(2,"0");
  if (state.mode==="play"&&left===0) finish(true);
}
function finish(expired=false) {
  state.remaining=remaining();
  state.end=null;
  state.expired=expired;
  state.mode="results";
  if (get("modal").open) get("modal").close();
  save();
  render(true);
}
function go(step) {
  state.step=step;
  state.far=Math.max(state.far,step);
  save();
  render(true);
}
function fail(message) {
  const error = get("error");
  error.textContent=message;
  error.hidden=false;
  error.scrollIntoView({block:"nearest"});
}
function validStage() {
  switch(state.step) {
    case 0:
      if (Object.keys(state.votes).length!==residents.length) return "주민 네 명의 제안에 모두 답해 주세요.";
      return residents.some((_,i)=>state["reflection"+i]?.trim()) ? "" : "적어도 한 주민의 말에서 판단에 영향을 준 대목과 이유를 적어 주세요.";
    case 1: return state.evidence.length>=2&&state.analysis?.trim() ? "" : "자료를 두 개 이상 선택하고 학습 참여에 미치는 과정을 적어 주세요.";
    case 2:
      if (!state.revealed||!state.time||state.support.length!==2) return "시간과 지원 두 가지를 선택하고 잠정안의 영향을 확인해 주세요.";
      if (!state.status||!state.reason?.trim()||!state.follow?.trim()) return "결정 상태, 선택 이유, 남은 문제와 확인 계획을 적어 주세요.";
      return "";
    case 3: {
      const marks=Object.entries(state.marks);
      if (marks.length<2||marks.some(([i,op])=>op!=="delete"&&!state["change"+i]?.trim())) return "수정할 대목을 두 곳 이상 표시하고, 바꾸거나 추가할 문구를 적어 주세요.";
      return state.delivery?.trim()&&state.confirmation?.trim() ? "" : "전달과 의견 접수 방법, 이해 확인과 재안내 계획을 적어 주세요.";
    }
    default:
      return ["concept","democratic","global","practice"].every(key=>state[key]?.trim()) ? "" : "공통점과 차이점, 두 질문의 답, 두 관점을 연결하는 실천을 적어 주세요.";
  }
}
function syncChoices() {
  for (const input of game.querySelectorAll('input[name="support"]')) {
    input.disabled=state.decisionLocked||(state.support.length===2&&!input.checked);
  }
  get("tokens").textContent=`남은 토큰 ${2-state.support.length}개`;
  if (state.revealed) get("effects").innerHTML=effectsMarkup();
}
game.addEventListener("input",e=>{
  const key=e.target.dataset.key;
  if (key&&e.target.tagName!=="SELECT") {
    state[key]=e.target.value;
    save();
  }
});
game.addEventListener("change",e=>{
  const input=e.target;
  const key=input.dataset.key;
  if (input.tagName==="SELECT") {
    if (key.startsWith("mark")) {
      const index=key.slice(4);
      if (input.value) state.marks[index]=input.value;
      else delete state.marks[index];
      render();
      game.querySelector(`select[data-key="${key}"]`)?.focus({preventScroll:true});
    } else state[key]=input.value;
  }
  if (input.name==="evidence"||input.name==="support") {
    const selections = state[input.name];
    const value = Number(input.value);
    if (input.checked&&!selections.includes(value)) selections.push(value);
    if (!input.checked&&selections.includes(value)) selections.splice(selections.indexOf(value),1);
  }
  if (input.name==="time") state.time=input.value;
  if (input.name==="support"||input.name==="time") syncChoices();
  save();
});
function download() {
  const content=records().map(([title,value])=>`[${title}]\n${value||"미기록"}`).join("\n\n");
  const notice=Object.keys(state.marks).length?modifiedNotice():"표시한 수정 사항이 없습니다.";
  const url=URL.createObjectURL(new Blob(["\uFEFF폭염 속 우리 동네 수업\n\n"+content+"\n\n[수정 공지 초안]\n"+notice],{type:"text/plain;charset=utf-8"}));
  const link=document.createElement("a");
  link.href=url;
  link.download="한빛동-실천-기록.txt";
  link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
document.addEventListener("click",e=>{
  const button=e.target.closest("button");
  if (!button) return;
  if (button.dataset.vote&&state.mode==="play"&&state.step===0) {
    state.votes[state.scene]=button.dataset.vote;
    save();
    render();
    get("branch").focus();
    return;
  }
  if (button.dataset.step!==undefined) go(Number(button.dataset.step));
  const ref=button.dataset.ref;
  if (ref) {
    const materials={
      case:["폭염과 학습 기회",caseCards()],
      roles:["주민 진술 카드",roleCards()],
      notice:["공지 원문",`<blockquote class="pre">${esc(original)}</blockquote>`],
      views:["두 시민 관점",perspectives]
    };
    get("modalTitle").textContent=materials[ref][0];
    get("modalBody").innerHTML=materials[ref][1];
    get("modal").showModal();
  }
  switch(button.dataset.act) {
    case "start":
      state.mode="play";
      state.end=Date.now()+state.remaining;
      go(0);
      break;
    case "back": go(state.step-1); break;
    case "prev-resident":
    case "next-resident":
      state.scene+=button.dataset.act==="next-resident"?1:-1;
      save();
      render(true);
      game.querySelector(".dialogue-scene").scrollIntoView({block:"nearest"});
      break;
    case "reveal":
      if (!state.time||state.support.length!==2) { fail("시간 하나와 지원 두 가지를 먼저 선택해 주세요."); break; }
      state.revealed=true;
      state.initial={time:state.time,support:[...state.support]};
      save();
      render();
      game.querySelector('[data-act="lock"]').focus();
      break;
    case "lock":
      if (state.support.length!==2) { fail("지원 두 가지를 선택해 주세요."); break; }
      state.decisionLocked=true;
      save();
      render();
      game.querySelector('[data-key="status"]').focus();
      break;
    case "next": {
      const message=validStage();
      if (message) { fail(message); break; }
      if (state.step===2) state.decisionLocked=true;
      if (state.step===4) finish();
      else go(state.step+1);
      break;
    }
    case "download": download(); break;
    case "print": window.print(); break;
  }
});
get("pause").addEventListener("click",()=>{
  if (state.end) {
    state.remaining=remaining();
    state.end=null;
  } else state.end=Date.now()+state.remaining;
  save();
  navigation();
  tick();
});
get("reset").addEventListener("click",()=>{
  if (!window.confirm("현재 회의의 기록을 비우고 새로 시작할까요?")) return;
  state=fresh();
  save();
  render(true);
  tick();
});
render();
tick();
setInterval(tick,250);
