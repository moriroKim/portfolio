"use client";

/* ------------------------------------------------------------------
   블록 인라인 도식. React Flow 캔버스 위에 자유 배치한다.
   한 화면에 다 안 들어와도 확대와 이동이 되므로, 배치는 내용에
   맞춰 고른다. 사이클은 원형, 분기는 격자.
   글은 최소로 두고 도식이 스스로 설명하게 한다.
------------------------------------------------------------------ */

import type { ReactNode } from "react";
import {
  Moon, AlarmClock, Lock, LockOpen, Upload, RefreshCw,
  BatteryLow, ShieldCheck, Smartphone, Server, Database, Wrench,
  Store, Check, X, TrainFront, Clock, Filter, EyeOff, Layers,
  Zap, Route, FileJson, Gauge, CloudOff, Cpu,
} from "lucide-react";
import { FlowFigure, ring, type Chip, type Link } from "./flow-figure";

const L = (s: string, i: number) => {
  const p = s.split("|");
  return p.length === 3 ? p[i] : s;
};
const ix = (loc: string) => (loc === "ja" ? 1 : loc === "en" ? 2 : 0);

/* ── 도즈 사이클: 원형 ── */
function DozeCycle({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const defs = [
    { id: "sleep",  icon: Moon,       tone: "muted"  as const, label: t("잠듦|眠る|asleep"),        note: t("CPU 정지|CPU停止|CPU off") },
    { id: "alarm",  icon: AlarmClock, tone: "cyan"   as const, label: t("알람|アラーム|alarm"),      note: t("9분 그리드|9分グリッド|9 min grid") },
    { id: "lock",   icon: Lock,       tone: "amber"  as const, label: t("웨이크락|ウェイクロック|wake lock"), note: t("CPU 붙잡음|CPUを保持|holds CPU"), badge: "90s" },
    { id: "work",   icon: Upload,     tone: "violet" as const, label: t("수집·전송|収集・送信|collect, send"), note: t("검증 후 개방|検証後に開放|validate, open") },
    { id: "free",   icon: LockOpen,   tone: "amber"  as const, label: t("반납|返却|release"),        note: t("워치독 회수|ウォッチドッグ回収|watchdog") },
    { id: "next",   icon: RefreshCw,  tone: "cyan"   as const, label: t("다음 예약|次を予約|reschedule"), note: t("체인 유지|チェーン維持|keeps chain") },
  ];
  const chips: Chip[] = defs.map((d, n) => ({ ...d, seq: n, ...ring(defs.length, n) }));
  const links: Link[] = defs.map((d, n) => ({
    from: d.id, to: defs[(n + 1) % defs.length].id,
    tone: defs[(n + 1) % defs.length].tone,
    dashed: n === defs.length - 1,
    label: n === defs.length - 1 ? t("끊기면 영영 침묵|切れれば永遠に沈黙|break it, silence") : undefined,
  }));
  return (
    <FlowFigure
      title={t("도즈에서 도는 한 사이클|Dozeで回る1サイクル|one cycle under doze")}
      chips={chips} links={links} height={340}
      conclusion={{
        icon: RefreshCw, tone: "cyan",
        text: t(
          "마지막 단계가 다음 알람을 잡습니다. 이 고리가 끊기면 앱은 다시 깨어나지 못합니다|最後の段階が次のアラームを取ります。この輪が切れれば二度と目覚めません|The last step books the next alarm. Break that link and it never wakes again.",
        ),
      }}
    />
  );
}

/* ── 도즈 편차 ── */
function DozeDrift({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  return (
    <figure className="my-7 rounded-xl border border-line bg-paper-warm">
      <p className="border-b border-line/70 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        {t("예약 대비 실제 발화|予約に対する実際の発火|scheduled versus actual")}
      </p>
      <div className="space-y-2.5 px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="w-20 shrink-0 whitespace-nowrap text-right font-mono text-[10.5px] font-bold text-emerald-700 sm:w-24 sm:text-[11px]">45s</span>
          <span className="h-3 flex-1 overflow-hidden rounded-full bg-emerald/10">
            <span className="block h-full rounded-full bg-emerald-600/70" style={{ width: "12.6%" }} />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-20 shrink-0 whitespace-nowrap text-right font-mono text-[10.5px] font-bold text-rose sm:w-24 sm:text-[11px]">136~357s</span>
          <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-rose/10">
            <span className="absolute inset-y-0 rounded-full bg-rose/25" style={{ left: "38%", right: 0 }} />
            <span className="fig-drift absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-rose" />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-line/70 bg-violet-faint px-4 py-2.5">
        <Clock className="h-3.5 w-3.5 shrink-0 text-violet-dark" strokeWidth={2} aria-hidden />
        <p className="text-[11px] font-semibold leading-snug text-violet-dark">
          {t("타이머 대신 벽시계로 지난 시간을 다시 계산합니다|タイマーではなく壁時計で経過時間を計算し直します|The wall clock, not the timer, decides how much time passed.")}
        </p>
      </div>
    </figure>
  );
}

/* ── 권한: 두 갈래가 하나로 모이는 AND ── */
function PermissionGate({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const chips: Chip[] = [
    { id: "batt", icon: BatteryLow, tone: "indigo", label: t("배터리 예외|電池除外|battery exempt"), note: t("잠든 기기에서 깨어남|眠った端末で目覚める|lets it wake"), x: 0, y: 20, seq: 0 },
    { id: "knox", icon: ShieldCheck, tone: "violet", label: t("Knox 라이선스|Knoxライセンス|Knox license"), note: t("데이터를 열 수 있음|通信を開ける|lets it open data"), x: 0, y: 150, seq: 1 },
    { id: "and",  icon: Zap, tone: "emerald", label: t("둘 다 있어야 전송|両方揃って送信|both, then upload"), note: t("하나만 빠져도 0건|一つ欠ければ0件|miss one, nothing"), x: 250, y: 85 },
    { id: "gate", icon: Lock, tone: "amber", label: t("온보딩 게이트|オンボーディングゲート|onboarding gate"), note: t("시스템에 재확인|システムに再確認|re-checked with the OS"), x: 500, y: 85 },
  ];
  const links: Link[] = [
    { from: "batt", to: "and", tone: "indigo" },
    { from: "knox", to: "and", tone: "violet" },
    { from: "and", to: "gate", tone: "emerald", label: "AND" },
  ];
  return (
    <FlowFigure
      title={t("이 앱이 도는 근거|このアプリが動く根拠|what the app stands on")}
      chips={chips} links={links} height={270}
      conclusion={{
        icon: Zap, tone: "violet",
        text: t(
          "온보딩은 두 권한을 다 확인해야 통과합니다|オンボーディングは両方を確認して初めて通過します|Onboarding does not advance until both grants are held.",
        ),
      }}
    />
  );
}

/* ── 코드푸시: 두 경로 ── */
function CodePush({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const chips: Chip[] = [
    { id: "bug", icon: X, tone: "rose", label: t("버그 발견|バグ発見|bug found"), x: 0, y: 90 },
    { id: "store", icon: Store, tone: "rose", label: t("서비스센터|サービスセンター|service center"), note: t("직접 방문|直接来店|in person"), dashed: true, x: 210, y: 20 },
    { id: "one", icon: Smartphone, tone: "rose", label: t("1대만 해결|1台だけ|one device"), dashed: true, x: 430, y: 20 },
    { id: "bundle", icon: Layers, tone: "emerald", label: t("번들 교체|バンドル差替|bundle swap"), note: t("네이티브 그대로|ネイティブはそのまま|native untouched"), x: 210, y: 160, seq: 0 },
    { id: "ride", icon: Upload, tone: "emerald", label: t("전송 창에 편승|送信の窓に同載|rides the window"), note: t("별도 개방 없음|別途開放なし|no extra opening"), x: 430, y: 160, seq: 1 },
    { id: "roll", icon: RefreshCw, tone: "emerald", label: t("실패 시 롤백|失敗時ロールバック|auto rollback"), x: 650, y: 160, seq: 2 },
  ];
  const links: Link[] = [
    { from: "bug", to: "store", tone: "rose", dashed: true, label: t("네이티브 변경|ネイティブ変更|native change") },
    { from: "store", to: "one", tone: "rose", dashed: true },
    { from: "bug", to: "bundle", tone: "emerald", label: t("화면 로직|画面ロジック|screen logic") },
    { from: "bundle", to: "ride", tone: "emerald" },
    { from: "ride", to: "roll", tone: "emerald" },
  ];
  return (
    <FlowFigure
      title={t("수정 하나가 단말에 닿기까지|修正一つが端末に届くまで|how a fix reaches a device")}
      chips={chips} links={links} height={300}
      conclusion={{
        icon: CloudOff, tone: "amber",
        text: t(
          "네이티브는 여전히 방문이 필요하므로, 구버전은 사라지지 않습니다|ネイティブは依然として来店が必要なため、旧バージョンは消えません|Native still needs a visit, so old builds never disappear.",
        ),
      }}
    />
  );
}

/* ── 우회: 계층별 대응 ── */
function BypassLayers({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const rows = [
    { a: "clock", ai: Clock, al: t("시계 되돌리기|時計の巻き戻し|clock rollback"),
      d: "vendor", di: ShieldCheck, dl: t("제조사 정책|メーカーポリシー|vendor policy"), dn: t("시각 변경 잠금|時刻変更ロック|clock locked"), tone: "violet" as const, y: 0 },
    { a: "a11y", ai: EyeOff, al: t("접근성 끄기|アクセシビリティ解除|revoke a11y"),
      d: "perm", di: Layers, dl: t("안드로이드 권한|Android権限|Android permissions"), dn: t("데드맨 스위치|デッドマンスイッチ|dead man's switch"), tone: "cyan" as const, y: 90 },
    { a: "kill", ai: X, al: t("앱 강제 종료|強制終了|force stop"),
      d: "app", di: Cpu, dl: t("앱 계층|アプリ層|app layer"), dn: t("네이티브 우선 처리|ネイティブ優先|native-first"), tone: "emerald" as const, y: 180 },
  ];
  const chips: Chip[] = rows.flatMap((r) => [
    { id: r.a, icon: r.ai, tone: "rose" as const, label: r.al, dashed: true, x: 0, y: r.y },
    { id: r.d, icon: r.di, tone: r.tone, label: r.dl, note: r.dn, badge: t("차단|遮断|blocked"), x: 300, y: r.y },
  ]);
  const links: Link[] = rows.map((r) => ({ from: r.a, to: r.d, tone: "rose", dashed: true }));
  return (
    <FlowFigure
      title={t("우회 시도와 대응 계층|迂回の試みと対応する層|attempt, and the layer that answers it")}
      chips={chips} links={links} height={300}
      conclusion={{
        icon: Layers, tone: "violet",
        text: t(
          "우회가 들어온 계층과 같은 곳에서 막습니다|迂回が来た層と同じ場所で塞ぎます|Each bypass is answered at the layer it came from.",
        ),
      }}
    />
  );
}

/* ── 3중 필터 ── */
function TripleFilter({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const chips: Chip[] = [
    { id: "gap", icon: EyeOff, tone: "muted", label: t("GPS 공백|GPS空白|GPS gap"), x: 0, y: 80 },
    { id: "st", icon: TrainFront, tone: "violet", label: t("역 매칭|駅マッチング|station"), x: 200, y: 80, seq: 0 },
    { id: "di", icon: Route, tone: "violet", label: t("거리|距離|distance"), x: 380, y: 80, seq: 1 },
    { id: "du", icon: Clock, tone: "violet", label: t("소요시간|所要時間|duration"), x: 560, y: 80, seq: 2 },
    { id: "show", icon: Check, tone: "emerald", label: t("지도에 표시|地図に表示|shown"), x: 740, y: 80 },
    { id: "drop", icon: X, tone: "rose", label: t("표시 안 함|表示しない|not shown"), note: t("공백으로 남김|空白のまま|gap stays"), dashed: true, x: 380, y: 200 },
  ];
  const links: Link[] = [
    { from: "gap", to: "st", tone: "violet" },
    { from: "st", to: "di", tone: "violet" },
    { from: "di", to: "du", tone: "violet" },
    { from: "du", to: "show", tone: "emerald" },
    { from: "st", to: "drop", tone: "rose", dashed: true },
    { from: "di", to: "drop", tone: "rose", dashed: true },
    { from: "du", to: "drop", tone: "rose", dashed: true, label: t("하나라도 어긋나면|一つでも外れれば|any mismatch") },
  ];
  return (
    <FlowFigure
      title={t("지하철 이동을 표시하기까지|地下鉄移動を表示するまで|before a subway trip is shown")}
      chips={chips} links={links} height={300}
      conclusion={{
        icon: Filter, tone: "rose",
        text: t(
          "커버리지를 포기하는 대신, 화면에 뜬 것은 믿을 수 있습니다|カバレッジを諦める代わりに、画面に出たものは信じられます|Coverage is traded away so whatever appears can be trusted.",
        ),
      }}
    />
  );
}

/* ── 스키마 게이트 ── */
function SchemaGate({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const chips: Chip[] = [
    { id: "mig", icon: Database, tone: "muted", label: t("마이그레이션|マイグレーション|migration"), x: 0, y: 90 },
    { id: "gate", icon: Filter, tone: "amber", label: t("추가 전용 게이트|追加専用ゲート|additive-only"), note: "ADD COLUMN / INDEX", x: 220, y: 90, seq: 0 },
    { id: "go", icon: Server, tone: "emerald", label: t("blue / green 전환|blue / green切替|switch"), x: 470, y: 20 },
    { id: "stop", icon: X, tone: "rose", label: t("배포 중단|デプロイ中断|abort"), note: "DROP / DELETE", dashed: true, x: 470, y: 165 },
  ];
  const links: Link[] = [
    { from: "mig", to: "gate", tone: "amber" },
    { from: "gate", to: "go", tone: "emerald", label: t("통과|通過|pass") },
    { from: "gate", to: "stop", tone: "rose", dashed: true, label: t("감지|検知|found") },
  ];
  return (
    <FlowFigure
      title={t("배포 앞의 스키마 게이트|デプロイ前のスキーマゲート|the gate in front of a deploy")}
      chips={chips} links={links} height={280}
      conclusion={{
        icon: Server, tone: "emerald",
        text: t(
          "배포 중에는 구버전 코드도 함께 돕니다. 삭제 구문은 서버에 닿기 전에 막습니다|デプロイ中は旧コードも動きます。削除構文はサーバーに届く前に止めます|Old code runs during a deploy, so destructive statements stop before the server.",
        ),
      }}
    />
  );
}

/* ── 요금제 ── */
function DataPlan({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const Bar = ({ label, segs, total, fg }: {
    label: string; total: string; fg: string; segs: { w: number; c: string }[];
  }) => (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 whitespace-nowrap text-right font-mono text-[10px] text-ink-soft sm:w-16">{label}</span>
      <span className="flex h-4 flex-1 overflow-hidden rounded-md bg-paper-soft">
        {segs.map((s, n) => <span key={n} className="fig-grow h-full" style={{ width: `${s.w}%`, background: s.c }} />)}
      </span>
      <span className="w-14 shrink-0 whitespace-nowrap font-mono text-[10.5px] font-bold sm:text-[11px]" style={{ color: fg }}>{total}</span>
    </div>
  );
  return (
    <figure className="my-7 rounded-xl border border-line bg-paper-warm">
      <p className="border-b border-line/70 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        {t("요청 1건의 구성|リクエスト1件の構成|what one request costs")}
      </p>
      <div className="space-y-2.5 px-4 py-4">
        <Bar label={t("이전|以前|before")} total="15.7KB" fg="#e11d48"
          segs={[{ w: 36, c: "rgba(225,29,72,0.75)" }, { w: 64, c: "rgba(251,113,133,0.55)" }]} />
        <Bar label={t("이후|以後|after")} total="1.1KB" fg="#047857"
          segs={[{ w: 7, c: "rgba(5,150,105,0.85)" }]} />
        <div className="flex flex-wrap gap-x-4 gap-y-1 pl-0 sm:pl-[76px] pt-1 font-mono text-[9px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: "rgba(225,29,72,0.75)" }} />
            {t("핸드셰이크|ハンドシェイク|handshake")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: "rgba(251,113,133,0.55)" }} />
            {t("평문 JSON|平文JSON|plain JSON")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: "rgba(5,150,105,0.85)" }} />
            {t("gzip · 연결 재사용|gzip · 接続再利用|gzip, reused conn")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-line/70 bg-emerald/8 px-4 py-2.5">
        <FileJson className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2} aria-hidden />
        <p className="text-[11px] font-semibold leading-snug text-emerald-700">
          {t("단말 1대 월 43MB → 6.8MB|端末1台の月間43MB → 6.8MB|43MB to 6.8MB per device per month")}
        </p>
      </div>
    </figure>
  );
}

/* ── 블루그린 ── */
function BlueGreen({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const chips: Chip[] = [
    { id: "dev", icon: Smartphone, tone: "muted", label: t("자녀 단말|子ども端末|devices"), x: 0, y: 90 },
    { id: "ngx", icon: Route, tone: "violet", label: "nginx", note: t("트래픽 전환|トラフィック切替|switches traffic"), x: 210, y: 90 },
    { id: "chk", icon: Gauge, tone: "amber", label: t("준비 점검|準備確認|readiness"), note: "DB · Redis", x: 430, y: 10, seq: 0 },
    { id: "green", icon: Server, tone: "amber", label: "green", note: t("새 버전 대기|新バージョン待機|new build waiting"), dashed: true, x: 650, y: 10 },
    { id: "blue", icon: Server, tone: "emerald", label: "blue", note: t("현재 처리 중|現在処理中|serving now"), x: 430, y: 170 },
  ];
  const links: Link[] = [
    { from: "dev", to: "ngx", tone: "muted", label: t("업로드|アップロード|uploads") },
    { from: "ngx", to: "blue", tone: "emerald" },
    { from: "ngx", to: "chk", tone: "amber", dashed: true },
    { from: "chk", to: "green", tone: "amber", label: t("통과 후 전환|通過後に切替|switch on pass") },
  ];
  return (
    <FlowFigure
      title={t("배포 중에도 수집은 멈추지 않는다|デプロイ中も収集は止まらない|ingestion never stops")}
      chips={chips} links={links} height={290}
      conclusion={{
        icon: Check, tone: "emerald",
        text: t(
          "점검에 실패하면 트래픽은 blue에 그대로 남습니다|チェックに失敗すればトラフィックはblueのままです|If the check fails, traffic simply stays on blue.",
        ),
      }}
    />
  );
}

function DozeFigures({ loc }: { loc: string }) {
  return (<><DozeCycle loc={loc} /><DozeDrift loc={loc} /></>);
}

/* ── KSTT: 도구 → 플랫폼 진화 ── */
function PlatformEvolution({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const chips: Chip[] = [
    { id: "v0", icon: FileJson, tone: "muted", dashed: true,
      label: t("일회성 도구|使い切りの道具|one-shot tool"),
      note: t("응시 → 채점 → 끝|受験 → 採点 → 終了|take, grade, done"), x: 0, y: 100 },
    { id: "round", icon: RefreshCw, tone: "violet", seq: 0,
      label: t("회차|回次|rounds"),
      note: t("학교·학기 반복|学校・学期で反復|repeats per school, term"), x: 230, y: 0 },
    { id: "perm", icon: ShieldCheck, tone: "indigo", seq: 1,
      label: t("권한 시스템|権限システム|permissions"),
      note: t("역할 + 개인 예외|役割 + 個人例外|roles plus overrides"), x: 230, y: 68 },
    { id: "stt", icon: Layers, tone: "cyan", seq: 2,
      label: t("STT 배치|STTバッチ|batch STT"),
      note: t("피크를 큐가 흡수|ピークをキューが吸収|the queue absorbs peaks"), x: 230, y: 136 },
    { id: "grade", icon: Check, tone: "amber", seq: 3,
      label: t("채점 화면|採点画面|grading UX"),
      note: t("자동 분배 · 파형 재생|自動分配 · 波形再生|auto-assign, waveform"), x: 230, y: 204 },
    { id: "v1", icon: Server, tone: "emerald",
      label: t("운영 플랫폼|運用プラットフォーム|operated platform"),
      note: t("반복 가능한 시험 운영|反復可能な試験運用|repeatable exam operation"), x: 470, y: 100 },
  ];
  const links: Link[] = [
    { from: "v0", to: "round", tone: "violet" },
    { from: "v0", to: "perm", tone: "indigo" },
    { from: "v0", to: "stt", tone: "cyan" },
    { from: "v0", to: "grade", tone: "amber" },
    { from: "round", to: "v1", tone: "emerald" },
    { from: "perm", to: "v1", tone: "emerald" },
    { from: "stt", to: "v1", tone: "emerald" },
    { from: "grade", to: "v1", tone: "emerald" },
  ];
  return (
    <FlowFigure
      title={t("도구가 플랫폼이 된 네 단계|道具がプラットフォームになった4段階|four steps from tool to platform")}
      chips={chips} links={links} height={330}
      conclusion={{
        icon: Server, tone: "emerald",
        text: t(
          "한 번 치르는 시험이 아니라, 반복 운영되는 시험 서비스가 됐습니다|一度きりの試験ではなく、反復運用される試験サービスになりました|Not one exam run once, but an exam service run repeatedly.",
        ),
      }}
    />
  );
}

const FIGURES: Record<string, Record<string, (p: { loc: string }) => ReactNode>> = {
  "odiya-child": {
    "제약": PermissionGate, "制約": PermissionGate, "Constraints": PermissionGate,
    "절전 모드와의 싸움": DozeFigures, "省電力モードとの戦い": DozeFigures, "Fighting doze mode": DozeFigures,
    "요금제라는 제약": DataPlan, "料金プランという制約": DataPlan, "The data plan as a constraint": DataPlan,
    "서비스센터에 가야 고칠 수 있는 앱": CodePush,
    "サービスセンターに行かないと直せないアプリ": CodePush,
    "An app you had to visit a service center to fix": CodePush,
  },
  "odiya-parents": { "선택과 근거": TripleFilter, "選択と根拠": TripleFilter, "Decision and rationale": TripleFilter },
  "mohani": {
    "설치 후에 열리는 우회 루트들": BypassLayers,
    "設置後に開く迂回ルート": BypassLayers,
    "The bypass routes that open after setup": BypassLayers,
  },
  "kocca-kstt": {
    "선택과 근거": SchemaGate, "選択と根拠": SchemaGate, "Decision and rationale": SchemaGate,
    "일회성 도구에서 운영 플랫폼으로": PlatformEvolution,
    "使い切りの道具から運用プラットフォームへ": PlatformEvolution,
    "From a one-shot tool to an operated platform": PlatformEvolution,
  },
  "odiya-backend": {
    "레거시 톰캣에서 무중단 배포로": BlueGreen,
    "レガシーTomcatから無停止デプロイへ": BlueGreen,
    "From legacy Tomcat to zero-downtime deploys": BlueGreen,
  },
};

export function BlockFigure({ slug, heading, locale }: { slug: string; heading: string; locale: string }) {
  const F = FIGURES[slug]?.[heading];
  return F ? <F loc={locale} /> : null;
}
