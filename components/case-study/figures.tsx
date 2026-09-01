"use client";

/* ------------------------------------------------------------------
   블록 인라인 도식.
   HTML 레이아웃 + lucide 컴포넌트로 그린다. 고정 좌표가 없으므로
   어떤 화면 폭에서도 잘리거나 겹치지 않고, 좁아지면 세로로 흐른다.
   설명은 도식 안에 흡수하고, 애니메이션이 순서를 말한다.
------------------------------------------------------------------ */

import type { ReactNode } from "react";
import {
  Moon, AlarmClock, Lock, LockOpen, Upload, RefreshCw,
  BatteryLow, ShieldCheck, Smartphone, Server, Database, Wrench,
  Store, Check, X, TrainFront, Clock, Filter, EyeOff, Layers,
  Zap, Route, ArrowRight, FileJson, Gauge, CloudOff,
  type LucideIcon,
} from "lucide-react";

const L = (s: string, i: number) => {
  const p = s.split("|");
  return p.length === 3 ? p[i] : s;
};
const ix = (loc: string) => (loc === "ja" ? 1 : loc === "en" ? 2 : 0);

type Tone = "muted" | "cyan" | "violet" | "amber" | "rose" | "emerald" | "indigo";
const TONE: Record<Tone, { fg: string; bg: string; bd: string }> = {
  muted:   { fg: "#64748b", bg: "rgba(100,116,139,0.10)", bd: "rgba(100,116,139,0.35)" },
  cyan:    { fg: "#0891b2", bg: "rgba(8,145,178,0.10)",   bd: "rgba(8,145,178,0.40)" },
  violet:  { fg: "#7c3aed", bg: "rgba(124,58,237,0.10)",  bd: "rgba(124,58,237,0.40)" },
  amber:   { fg: "#b45309", bg: "rgba(217,119,6,0.12)",   bd: "rgba(217,119,6,0.42)" },
  rose:    { fg: "#e11d48", bg: "rgba(225,29,72,0.09)",   bd: "rgba(225,29,72,0.38)" },
  emerald: { fg: "#047857", bg: "rgba(5,150,105,0.10)",   bd: "rgba(5,150,105,0.40)" },
  indigo:  { fg: "#4f46e5", bg: "rgba(79,70,229,0.10)",   bd: "rgba(79,70,229,0.40)" },
};

/* ---------- 프리미티브 ---------- */

function Fig({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <figure className="my-7 rounded-xl border border-line bg-paper-warm p-4 sm:p-5">
      {title && (
        <p className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          {title}
        </p>
      )}
      {children}
    </figure>
  );
}

/** 가로로 흐르다가 좁아지면 세로로 쌓이는 단계 행. */
function Flowline({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-stretch">
      {children}
    </div>
  );
}

function Step({
  icon: Icon, label, note, tone = "muted", seq, total, dashed, badge,
}: {
  icon: LucideIcon; label: string; note?: string; tone?: Tone;
  seq?: number; total?: number; dashed?: boolean; badge?: string;
}) {
  const c = TONE[tone];
  const anim =
    seq !== undefined && total
      ? { animation: `fig-sweep ${total * 1.1}s ease-in-out infinite`, animationDelay: `${seq * 1.1}s` }
      : undefined;
  return (
    <div
      className="fig-step relative flex min-w-0 flex-1 items-start gap-2.5 rounded-lg border bg-paper px-3 py-2.5"
      style={{ borderColor: c.bd, borderStyle: dashed ? "dashed" : "solid", ...anim, ["--fg" as string]: c.fg }}
    >
      <span
        className="mt-px inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: c.bg, color: c.fg }}
      >
        <Icon className="h-[17px] w-[17px]" strokeWidth={1.9} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-bold leading-tight" style={{ color: c.fg }}>
          {label}
        </span>
        {note && <span className="mt-0.5 block text-[10.5px] leading-snug text-ink-soft">{note}</span>}
      </span>
      {badge && (
        <span
          className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[8.5px] font-bold"
          style={{ background: c.bg, color: c.fg }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

/** 단계 사이 화살표. 좁은 화면에서는 아래를 가리킨다. */
function Arrow({ tone = "muted" }: { tone?: Tone }) {
  return (
    <div className="flex shrink-0 items-center justify-center self-center px-0.5 py-0.5" aria-hidden>
      <ArrowRight
        className="h-3.5 w-3.5 rotate-90 sm:rotate-0"
        strokeWidth={2.2}
        style={{ color: TONE[tone].fg, opacity: 0.55 }}
      />
    </div>
  );
}

/** 한 줄 결론. 도식 안에서 설명을 끝낸다. */
function Conclusion({ icon: Icon, text, tone }: { icon: LucideIcon; text: string; tone: Tone }) {
  const c = TONE[tone];
  return (
    <div
      className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2"
      style={{ borderColor: c.bd, background: c.bg }}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ color: c.fg }} aria-hidden />
      <p className="text-[11px] font-medium leading-snug" style={{ color: c.fg }}>{text}</p>
    </div>
  );
}

/* ---------- 도식 ---------- */

function DozeCycle({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const steps: [LucideIcon, string, string, Tone][] = [
    [Moon,       t("기기 잠듦|端末が眠る|asleep"),        t("CPU 정지|CPU停止|CPU off"), "muted"],
    [AlarmClock, t("알람 발화|アラーム発火|alarm"),        t("약 9분 그리드|約9分|~9 min grid"), "cyan"],
    [Lock,       t("웨이크락 획득|ウェイクロック取得|lock"), t("CPU 붙잡음|CPUを保持|holds CPU"), "amber"],
    [Upload,     t("수집과 전송|収集と送信|collect, send"), t("검증 · 개방|検証 · 開放|validate, open"), "violet"],
    [LockOpen,   t("웨이크락 반납|返却|release"),          t("최대 90초|最大90秒|90s cap"), "amber"],
    [RefreshCw,  t("다음 알람 예약|次を予約|reschedule"),   t("체인 유지|チェーン維持|keeps chain"), "cyan"],
  ];
  return (
    <Fig title={t("도즈 상태에서 도는 한 사이클|Doze状態で回る1サイクル|one cycle under doze")}>
      <Flowline>
        {steps.map(([Icon, label, note, tone], n) => (
          <div key={label} className="contents">
            <Step icon={Icon} label={label} note={note} tone={tone} seq={n} total={steps.length}
              badge={n === 2 ? "90s" : undefined} />
            {n < steps.length - 1 && <Arrow tone={steps[n + 1][3]} />}
          </div>
        ))}
      </Flowline>
      <Conclusion icon={RefreshCw} tone="cyan"
        text={t(
          "마지막 단계가 다음 알람을 잡습니다. 이 고리가 한 번 끊기면 앱은 다시 깨어나지 못합니다|最後の段階が次のアラームを取ります。この輪が一度切れれば、アプリは二度と目覚めません|The last step books the next alarm. Break that link once and the app never wakes again.",
        )} />
    </Fig>
  );
}

function DozeDrift({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  return (
    <Fig title={t("예약과 실제 발화의 차이|予約と実際の発火の差|scheduled versus actual")}>
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-right font-mono text-[11px] font-bold text-emerald-700">45s</span>
          <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-emerald/10">
            <span className="block h-full rounded-full bg-emerald-600/70" style={{ width: "12.6%" }} />
          </span>
          <span className="w-20 shrink-0 font-mono text-[10px] text-ink-soft">
            {t("예약|予約|scheduled")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-right font-mono text-[11px] font-bold text-rose">136 ~ 357s</span>
          <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-rose/10">
            <span className="absolute inset-y-0 rounded-full bg-rose/25" style={{ left: "38%", right: "0%" }} />
            <span className="fig-drift absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-rose" />
          </span>
          <span className="w-20 shrink-0 font-mono text-[10px] text-ink-soft">
            {t("실측|実測|measured")}
          </span>
        </div>
      </div>
      <Conclusion icon={Clock} tone="violet"
        text={t(
          "타이머를 믿을 수 없으므로, 깨어날 때마다 벽시계로 실제 지난 시간을 다시 계산해 밀린 만큼 보정합니다|タイマーを信用できないため、目覚めるたびに壁時計で実際の経過時間を計算し直し、遅れた分を補正します|Timers cannot be trusted, so every wake recomputes elapsed time from the wall clock and corrects the backlog.",
        )} />
    </Fig>
  );
}

function PermissionGate({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const rows: [LucideIcon, string, string, string, Tone][] = [
    [BatteryLow, t("배터리 최적화 예외|電池最適化の除外|battery exemption"),
      t("없으면 잠든 기기에서 못 깨어남|なければ眠った端末で目覚めない|without it, it cannot wake"),
      t("정확 알람 · 백그라운드 통신|正確アラーム · 背景通信|exact alarms, background net"), "indigo"],
    [ShieldCheck, t("Knox 관리 라이선스|Knox管理ライセンス|Knox license"),
      t("없으면 데이터를 열 수 없음|なければ通信を開けない|without it, data stays shut"),
      t("데이터 제어 · 방화벽|データ制御 · ファイアウォール|data toggle, firewall"), "violet"],
  ];
  return (
    <Fig title={t("이 앱이 도는 근거|このアプリが動く根拠|what the app stands on")}>
      <div className="space-y-2.5">
        {rows.map(([Icon, name, without, withIt, tone]) => (
          <div key={name} className="flex flex-col gap-1.5 sm:flex-row sm:items-stretch">
            <div className="sm:w-[38%]">
              <Step icon={Icon} label={name} tone={tone} />
            </div>
            <Arrow tone={tone} />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-dashed px-3 py-2"
                style={{ borderColor: TONE.rose.bd, background: TONE.rose.bg }}>
                <X className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} style={{ color: TONE.rose.fg }} aria-hidden />
                <span className="text-[10.5px] leading-snug" style={{ color: TONE.rose.fg }}>{without}</span>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2"
                style={{ borderColor: TONE.emerald.bd, background: TONE.emerald.bg }}>
                <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} style={{ color: TONE.emerald.fg }} aria-hidden />
                <span className="text-[10.5px] leading-snug" style={{ color: TONE.emerald.fg }}>{withIt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Conclusion icon={Zap} tone="violet"
        text={t(
          "둘 다 있어야 깨어나서 데이터를 열고 보냅니다. 하나만 빠져도 전송은 0건이므로, 온보딩은 둘 다 확인해야 통과하는 게이트입니다|両方揃って初めて目覚め、通信を開き、送れます。一つ欠ければ送信は0件のため、オンボーディングは両方を確認して初めて通過するゲートです|Both are needed to wake, open data, and upload. Missing one means nothing ships, so onboarding is a gate that checks for both.",
        )} />
    </Fig>
  );
}

function CodePush({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const before: [LucideIcon, string][] = [
    [X, t("버그 발견|バグ発見|bug found")],
    [Store, t("서비스센터 방문|来店|service center")],
    [Wrench, t("수동 업데이트|手動更新|manual update")],
    [Smartphone, t("단말 1대만|1台だけ|one device")],
  ];
  const after: [LucideIcon, string][] = [
    [Layers, t("번들만 교체|バンドルのみ|bundle only")],
    [Upload, t("전송 창에 편승|送信の窓に同載|rides the window")],
    [Route, t("단계적 적용|段階的|staged")],
    [RefreshCw, t("실패 시 롤백|失敗時ロールバック|auto rollback")],
  ];
  return (
    <Fig title={t("수정 하나가 단말에 닿기까지|修正一つが端末に届くまで|how one fix reaches a device")}>
      <div className="space-y-3">
        <Flowline>
          {before.map(([Icon, label], n) => (
            <div key={label} className="contents">
              <Step icon={Icon} label={label} tone="rose" dashed />
              {n < before.length - 1 && <Arrow tone="rose" />}
            </div>
          ))}
        </Flowline>
        <Flowline>
          {after.map(([Icon, label], n) => (
            <div key={label} className="contents">
              <Step icon={Icon} label={label} tone="emerald" seq={n} total={after.length} />
              {n < after.length - 1 && <Arrow tone="emerald" />}
            </div>
          ))}
        </Flowline>
      </div>
      <Conclusion icon={CloudOff} tone="amber"
        text={t(
          "네이티브를 바꾸려면 여전히 방문이 필요합니다. 그래서 구버전은 사라지지 않고, 서버는 계속 그 버전과도 맞물려야 합니다|ネイティブを変えるには依然として来店が必要です。だから旧バージョンは消えず、サーバーはその版とも噛み合い続けなければなりません|Native changes still need a visit, so old builds never disappear and the server has to keep meshing with them.",
        )} />
    </Fig>
  );
}

function BypassLayers({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const rows: [LucideIcon, string, LucideIcon, string, string, Tone][] = [
    [Clock, t("시계 되돌리기|時計の巻き戻し|clock rollback"), ShieldCheck,
      t("제조사 정책|メーカーポリシー|vendor policy"), t("시각 변경 잠금|時刻変更ロック|clock locked"), "violet"],
    [EyeOff, t("접근성 끄기|アクセシビリティ解除|revoke a11y"), Layers,
      t("안드로이드 권한|Android権限|Android permissions"), t("데드맨 스위치|デッドマンスイッチ|dead man's switch"), "cyan"],
    [X, t("앱 강제 종료|強制終了|force stop"), Smartphone,
      t("앱 계층|アプリ層|app layer"), t("네이티브 우선 처리|ネイティブ優先処理|native-first handling"), "emerald"],
  ];
  return (
    <Fig title={t("우회 시도와 대응 계층|迂回の試みと対応する層|attempt, and the layer that answers it")}>
      <div className="space-y-2">
        {rows.map(([AIcon, attack, DIcon, layer, defense, tone]) => (
          <div key={attack} className="flex flex-col gap-1.5 sm:flex-row sm:items-stretch">
            <div className="sm:w-[32%]">
              <Step icon={AIcon} label={attack} tone="rose" dashed />
            </div>
            <div className="flex shrink-0 items-center justify-center self-center px-1" aria-hidden>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                style={{ background: TONE.rose.bg }}>
                <X className="h-3 w-3" strokeWidth={2.6} style={{ color: TONE.rose.fg }} />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <Step icon={DIcon} label={layer} note={defense} tone={tone}
                badge={t("차단|遮断|blocked")} />
            </div>
          </div>
        ))}
      </div>
      <Conclusion icon={Layers} tone="violet"
        text={t(
          "우회는 차단이 서 있는 계층을 치웁니다. 그래서 시도가 들어온 계층과 같은 곳에서 막습니다|迂回はブロックが立つ層を取り除きます。だから試みが来た層と同じ場所で塞ぎます|A bypass removes the layer blocking stands on, so each one is answered at the layer it came from.",
        )} />
    </Fig>
  );
}

function TripleFilter({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const gates: [LucideIcon, string][] = [
    [TrainFront, t("역 매칭|駅マッチング|station")],
    [Route, t("거리|距離|distance")],
    [Clock, t("소요시간|所要時間|duration")],
  ];
  return (
    <Fig title={t("지하철 이동을 표시하기까지|地下鉄移動を表示するまで|before a subway trip is shown")}>
      <Flowline>
        <Step icon={EyeOff} label={t("GPS 공백|GPS空白|GPS gap")} note={t("좌표 없음|座標なし|no fixes")} tone="muted" />
        <Arrow tone="violet" />
        {gates.map(([Icon, label], n) => (
          <div key={label} className="contents">
            <Step icon={Icon} label={label} tone="violet" seq={n} total={gates.length + 1} />
            {n < gates.length - 1 && <Arrow tone="violet" />}
          </div>
        ))}
        <Arrow tone="emerald" />
        <Step icon={Check} label={t("지도에 표시|地図に表示|shown")} tone="emerald" />
      </Flowline>
      <Conclusion icon={Filter} tone="rose"
        text={t(
          "하나라도 어긋나면 표시하지 않고 공백으로 남깁니다. 커버리지를 포기하는 대신 화면에 뜬 것은 믿을 수 있습니다|一つでも外れれば表示せず空白のまま残します。カバレッジを諦める代わりに、画面に出たものは信じられます|Any mismatch and nothing is drawn. Coverage is traded away so whatever appears can be trusted.",
        )} />
    </Fig>
  );
}

function SchemaGate({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  return (
    <Fig title={t("배포 앞의 스키마 게이트|デプロイ前のスキーマゲート|the gate in front of a deploy")}>
      <Flowline>
        <Step icon={Database} label={t("마이그레이션|マイグレーション|migration")}
          note={t("배포에 포함|デプロイに含む|part of the deploy")} tone="muted" />
        <Arrow tone="amber" />
        <Step icon={Filter} label={t("추가 전용 게이트|追加専用ゲート|additive-only")}
          note="ADD COLUMN / INDEX" tone="amber" seq={0} total={3} />
        <Arrow tone="emerald" />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Step icon={Server} label={t("blue / green 전환|blue / green切替|switch")} tone="emerald" />
          <Step icon={X} label={t("배포 즉시 중단|即中断|abort")}
            note="DROP / DELETE" tone="rose" dashed />
        </div>
      </Flowline>
      <Conclusion icon={Server} tone="emerald"
        text={t(
          "무중단 배포 구간에는 구버전 코드가 함께 돕니다. 그래서 삭제 구문은 서버에 닿기 전에 막습니다|無停止デプロイの区間では旧コードも一緒に動きます。だから削除構文はサーバーに届く前に止めます|Old code still runs during a zero-downtime switch, so destructive statements are stopped before they reach the server.",
        )} />
    </Fig>
  );
}

function DataPlan({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  const Bar = ({ label, segs, total, tone }: {
    label: string; total: string; tone: Tone;
    segs: { w: number; c: string; name?: string }[];
  }) => (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-right font-mono text-[10px] text-ink-soft">{label}</span>
      <span className="flex h-4 flex-1 overflow-hidden rounded-md bg-paper-soft">
        {segs.map((s, n) => (
          <span key={n} className="fig-grow h-full" style={{ width: `${s.w}%`, background: s.c }} />
        ))}
      </span>
      <span className="w-16 shrink-0 font-mono text-[11px] font-bold" style={{ color: TONE[tone].fg }}>
        {total}
      </span>
    </div>
  );
  return (
    <Fig title={t("요청 1건의 구성|リクエスト1件の構成|what one request costs")}>
      <div className="space-y-2.5">
        <Bar label={t("개선 전|改善前|before")} total="15.7KB" tone="rose"
          segs={[{ w: 36, c: "rgba(225,29,72,0.75)" }, { w: 64, c: "rgba(251,113,133,0.6)" }]} />
        <Bar label={t("개선 후|改善後|after")} total="1.1KB" tone="emerald"
          segs={[{ w: 7, c: "rgba(5,150,105,0.85)" }]} />
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 pl-[92px] font-mono text-[9.5px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: "rgba(225,29,72,0.75)" }} />
          {t("TLS 핸드셰이크|TLSハンドシェイク|TLS handshake")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: "rgba(251,113,133,0.6)" }} />
          {t("평문 JSON|平文JSON|plain JSON")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ background: "rgba(5,150,105,0.85)" }} />
          {t("gzip 본문 · 연결 재사용|gzip本文 · 接続再利用|gzipped, reused conn")}
        </span>
      </div>
      <Conclusion icon={FileJson} tone="emerald"
        text={t(
          "단말 1대 월 전송량 43MB에서 6.8MB. 하루 96회 업로드 기준입니다|端末1台の月間送信量が43MBから6.8MBへ。1日96回のアップロード基準です|Monthly upload per device falls from 43MB to 6.8MB, at 96 uploads a day.",
        )} />
    </Fig>
  );
}

function BlueGreen({ loc }: { loc: string }) {
  const i = ix(loc);
  const t = (s: string) => L(s, i);
  return (
    <Fig title={t("배포 중에도 수집은 멈추지 않는다|デプロイ中も収集は止まらない|ingestion never stops during a deploy")}>
      <Flowline>
        <Step icon={Smartphone} label={t("자녀 단말|子ども端末|devices")} note={t("위치 업로드|位置アップロード|uploads")} tone="muted" />
        <Arrow tone="violet" />
        <Step icon={Route} label="nginx" note={t("트래픽 전환|トラフィック切替|switches traffic")} tone="violet" />
        <Arrow tone="amber" />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Step icon={Gauge} label={t("green · 준비 점검 중|green · 準備確認中|green, checking")}
            note={t("DB · Redis · 로그인 응답|DB · Redis · ログイン応答|DB, Redis, login")} tone="amber" dashed seq={0} total={2} />
          <Step icon={Server} label={t("blue · 트래픽 처리 중|blue · 処理中|blue, serving")} tone="emerald" />
        </div>
      </Flowline>
      <Conclusion icon={Check} tone="emerald"
        text={t(
          "점검을 통과해야 트래픽이 green으로 넘어가고, 그 뒤에 blue를 내립니다. 실패하면 트래픽은 blue에 그대로 남습니다|チェックを通過して初めてトラフィックがgreenへ移り、その後にblueを落とします。失敗すればトラフィックはblueのまま残ります|Traffic moves to green only after the check passes, and blue stops afterwards. On failure, traffic simply stays on blue.",
        )} />
    </Fig>
  );
}

function DozeFigures({ loc }: { loc: string }) {
  return (
    <>
      <DozeCycle loc={loc} />
      <DozeDrift loc={loc} />
    </>
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
  "odiya-parents": {
    "선택과 근거": TripleFilter, "選択と根拠": TripleFilter, "Decision and rationale": TripleFilter,
  },
  "mohani": {
    "설치 후에 열리는 우회 루트들": BypassLayers,
    "設置後に開く迂回ルート": BypassLayers,
    "The bypass routes that open after setup": BypassLayers,
  },
  "kocca-kstt": {
    "선택과 근거": SchemaGate, "選択と根拠": SchemaGate, "Decision and rationale": SchemaGate,
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
