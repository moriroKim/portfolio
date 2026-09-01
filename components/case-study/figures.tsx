"use client";

/* ------------------------------------------------------------------
   블록 단위 인라인 도식. 상단의 시스템 다이어그램과 달리, 각 블록이
   설명하는 논리 자체를 그린다. slug + heading 키로 매칭된다.
------------------------------------------------------------------ */

import type { ReactNode } from "react";

const L = (s: string, i: number) => {
  const p = s.split("|");
  return p.length === 3 ? p[i] : s;
};
const idx = (loc: string) => (loc === "ja" ? 1 : loc === "en" ? 2 : 0);

function Frame({ caption, height, children }: { caption: string; height: number; children: ReactNode }) {
  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-line bg-paper-warm">
      <div className="overflow-x-auto p-4 sm:p-5">
        <svg viewBox={`0 0 720 ${height}`} width="100%" style={{ minWidth: 520 }} role="img" aria-label={caption}>
          {children}
        </svg>
      </div>
      <figcaption className="border-t border-line/70 px-5 py-2.5 text-center text-[11px] leading-relaxed text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ── 도즈: 잠든 기기에서 한 사이클이 도는 과정 ── */
function DozeTimeline({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);

  // 한 사이클 6단계. dur는 애니메이션 배분 비율
  const steps = [
    { k: "sleep",  label: t("기기 잠듦|端末が眠る|device asleep"),      note: t("CPU 정지 · 네트워크 차단|CPU停止 · 通信遮断|CPU off, network gated") },
    { k: "alarm",  label: t("알람 발화|アラーム発火|alarm fires"),        note: t("도즈 예외 알람 · 약 9분 그리드|Doze例外アラーム · 約9分グリッド|doze-exempt, ~9 min grid") },
    { k: "lock",   label: t("웨이크락 획득|ウェイクロック取得|wake lock"), note: t("CPU 재수면 방지 · 최대 90초|CPU再睡眠を防止 · 最大90秒|keeps CPU up, 90s cap") },
    { k: "work",   label: t("수집과 전송|収集と送信|collect and send"),   note: t("좌표 검증 · 네트워크 개방|座標検証 · 通信開放|validate, open network") },
    { k: "release",label: t("웨이크락 반납|ウェイクロック返却|release lock"), note: t("반납 누락은 워치독이 회수|返却漏れはウォッチドッグが回収|watchdog reclaims") },
    { k: "next",   label: t("다음 알람 예약|次のアラーム予約|reschedule"),  note: t("체인이 끊기면 영영 침묵|チェーンが切れれば永遠に沈黙|a broken link means silence") },
  ];
  const W = 108, GAP = 14, X0 = 22, Y = 62;
  const cx = (n: number) => X0 + n * (W + GAP);
  const CYCLE = 7.2;

  return (
    <Frame
      height={228}
      caption={t(
        "잠든 기기에서 한 사이클이 도는 과정입니다. 알람이 깨우고, 웨이크락이 일하는 동안 CPU를 붙잡고, 끝나면 반납한 뒤 다음 알람을 직접 예약합니다. 마지막 예약이 빠지면 체인이 끊겨 앱은 다시 깨어나지 못합니다|眠った端末で1サイクルが回る過程です。アラームが起こし、ウェイクロックが作業中のCPUを掴み、終われば返却して次のアラームを自ら予約します。最後の予約が抜ければチェーンが切れ、アプリは二度と目覚めません|One cycle on a sleeping device: the alarm wakes it, the wake lock holds the CPU while work happens, then it is released and the next alarm is booked. Miss that last step and the chain breaks and the app never wakes again.",
      )}
    >
      {/* 도즈 배경 띠 */}
      <rect x={12} y={30} width={696} height={92} rx={10} fill="rgba(100,116,139,0.07)" stroke="var(--color-line)" strokeWidth={1} strokeDasharray="5 4" />
      <text x={22} y={24} className="fig-lab" fill="#64748b">
        {t("도즈 상태 · 시스템은 앱을 계속 재우려 한다|Doze状態 · システムはアプリを眠らせ続けようとする|doze, the system keeps trying to sleep the app", )}
      </text>

      {/* 단계 카드 */}
      {steps.map((st, n) => {
        const isLock = st.k === "lock" || st.k === "release";
        const isWork = st.k === "work";
        const c = isWork ? "#7c3aed" : isLock ? "#d97706" : st.k === "sleep" ? "#64748b" : "#0891b2";
        const begin = `${(n * CYCLE) / steps.length}s`;
        return (
          <g key={st.k}>
            <rect x={cx(n)} y={Y} width={W} height={46} rx={7} fill="var(--color-paper)" stroke={c} strokeWidth={1.3} />
            {/* 활성 강조 */}
            <rect x={cx(n)} y={Y} width={W} height={46} rx={7} fill={c} opacity={0}>
              <animate attributeName="opacity" values="0;0.14;0.14;0" keyTimes="0;0.06;0.14;0.2"
                dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite" />
            </rect>
            <text x={cx(n) + W / 2} y={Y + 19} textAnchor="middle" className="fig-node" fill={c}>{st.label}</text>
            <text x={cx(n) + W / 2} y={Y + 34} textAnchor="middle" className="fig-note" style={{ fontSize: 9 }}>{st.note}</text>

            {/* 진행 화살표 */}
            {n < steps.length - 1 && (
              <g>
                <line x1={cx(n) + W} y1={Y + 23} x2={cx(n + 1) - 5} y2={Y + 23} stroke="var(--color-line-strong)" strokeWidth={1.2} />
                <path d={`M ${cx(n + 1)} ${Y + 23} l -6 -3.5 l 0 7 z`} fill="var(--color-line-strong)" />
                <circle r={3.2} fill="var(--color-violet)" opacity={0}>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1"
                    dur={`${CYCLE / steps.length}s`} begin={begin} repeatCount="indefinite" />
                  <animate attributeName="cx" from={cx(n) + W} to={cx(n + 1)} dur={`${CYCLE / steps.length}s`}
                    begin={begin} repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${Y + 23};${Y + 23}`} dur={`${CYCLE / steps.length}s`}
                    begin={begin} repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </g>
        );
      })}

      {/* 웨이크락 유지 구간 */}
      <line x1={cx(2) + 10} y1={Y + 58} x2={cx(4) + W - 10} y2={Y + 58} stroke="#d97706" strokeWidth={2} strokeLinecap="round" />
      <line x1={cx(2) + 10} y1={Y + 54} x2={cx(2) + 10} y2={Y + 62} stroke="#d97706" strokeWidth={2} />
      <line x1={cx(4) + W - 10} y1={Y + 54} x2={cx(4) + W - 10} y2={Y + 62} stroke="#d97706" strokeWidth={2} />
      <text x={(cx(2) + cx(4) + W) / 2} y={Y + 74} textAnchor="middle" className="fig-note" fill="#d97706">
        {t("웨이크락이 CPU를 붙잡는 구간 (최대 90초)|ウェイクロックがCPUを掴む区間 (最大90秒)|wake lock holds the CPU here (90s cap)")}
      </text>

      {/* 체인 되돌림 */}
      <path d={`M ${cx(5) + W / 2} ${Y + 46} L ${cx(5) + W / 2} 196 L ${cx(0) + W / 2} 196 L ${cx(0) + W / 2} ${Y + 46}`}
        fill="none" stroke="#0891b2" strokeWidth={1.4} strokeDasharray="5 4" />
      <path d={`M ${cx(0) + W / 2} ${Y + 46} l -4 8 l 8 0 z`} fill="#0891b2" />
      <circle r={3.4} fill="#0891b2">
        <animateMotion dur={`${CYCLE}s`} begin={`${(5 * CYCLE) / steps.length}s`} repeatCount="indefinite"
          path={`M ${cx(5) + W / 2} ${Y + 46} L ${cx(5) + W / 2} 196 L ${cx(0) + W / 2} 196 L ${cx(0) + W / 2} ${Y + 46}`} />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.3;0.35" dur={`${CYCLE}s`}
          begin={`${(5 * CYCLE) / steps.length}s`} repeatCount="indefinite" />
      </circle>
      <text x={(cx(0) + cx(5) + W) / 2} y={212} textAnchor="middle" className="fig-note" fill="#0891b2">
        {t("자기 재예약 체인 · 이 화살표가 끊기면 다시 깨어나지 못한다|自己再予約チェーン · この矢印が切れれば二度と目覚めない|self-rescheduling chain, break this and it never wakes again")}
      </text>
    </Frame>
  );
}

/* ── 도즈: 예약과 실측의 편차 ── */
function DozeDrift({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const marks = [0, 45, 136, 240, 357];
  const x = (sec: number) => 96 + (sec / 400) * 560;
  return (
    <Frame
      height={150}
      caption={t(
        "그래서 타이머를 믿을 수 없습니다. 45초로 예약해도 실제 발화는 136초에서 357초 사이에 흩어졌고, 깨어날 때마다 벽시계로 실제 지난 시간을 다시 계산해 밀린 만큼 보정합니다|だからタイマーは信用できません。45秒で予約しても実際の発火は136秒から357秒の間に散らばり、目覚めるたびに壁時計で実際の経過時間を計算し直して遅れた分を補正します|This is why timers cannot be trusted. A 45-second schedule fired anywhere from 136 to 357 seconds out, so every wake recomputes real elapsed time from the wall clock and corrects the backlog.",
      )}
    >
      <line x1={96} y1={92} x2={664} y2={92} stroke="var(--color-line-strong)" strokeWidth={1.5} />
      {marks.map((m) => (
        <g key={m}>
          <line x1={x(m)} y1={87} x2={x(m)} y2={97} stroke="var(--color-line-strong)" strokeWidth={1} />
          <text x={x(m)} y={113} textAnchor="middle" className="fig-tick">{m}s</text>
        </g>
      ))}
      <text x={16} y={44} className="fig-lab" fill="#059669">{t("예약|予約|scheduled")}</text>
      <rect x={x(0)} y={32} width={x(45) - x(0)} height={16} rx={8} fill="rgba(5,150,105,0.2)" stroke="#059669" strokeWidth={1} />
      <circle cx={x(45)} cy={40} r={4} fill="#059669" />
      <text x={16} y={74} className="fig-lab" fill="#e11d48">{t("실측|実測|measured")}</text>
      <rect x={x(136)} y={62} width={x(357) - x(136)} height={16} rx={8} fill="rgba(225,29,72,0.14)" stroke="#e11d48" strokeWidth={1} strokeDasharray="4 3" />
      <circle r={4.5} fill="#e11d48">
        <animate attributeName="cx" values={`${x(136)};${x(357)};${x(190)};${x(300)};${x(136)}`} dur="5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="70;70;70;70;70" dur="5s" repeatCount="indefinite" />
      </circle>
      <path d={`M ${x(45)} 130 L ${x(357)} 130`} stroke="var(--color-violet)" strokeWidth={1.2} strokeDasharray="3 3" />
      <path d={`M ${x(45)} 130 l 6 -4 l 0 8 z`} fill="var(--color-violet)" />
      <path d={`M ${x(357)} 130 l -6 -4 l 0 8 z`} fill="var(--color-violet)" />
      <text x={(x(45) + x(357)) / 2} y={146} textAnchor="middle" className="fig-note" fill="var(--color-violet)">
        {t("이 편차를 벽시계로 보정|このズレを壁時計で補正|corrected against the wall clock")}
      </text>
    </Frame>
  );
}

function DozeFigures({ loc }: { loc: string }) {
  return (
    <>
      <DozeTimeline loc={loc} />
      <DozeDrift loc={loc} />
    </>
  );
}

/* ── 코드푸시: 두 경로 비교 ── */
function CodePushPaths({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const Node = ({ x, y, w, label, tone }: { x: number; y: number; w: number; label: string; tone: "bad" | "good" }) => {
    const c = tone === "bad" ? "#e11d48" : "#059669";
    const bg = tone === "bad" ? "rgba(225,29,72,0.08)" : "rgba(5,150,105,0.08)";
    return (
      <g>
        <rect x={x} y={y} width={w} height={34} rx={6} fill={bg} stroke={c} strokeWidth={1.2} />
        <text x={x + w / 2} y={y + 21} textAnchor="middle" className="fig-node" fill={c}>{label}</text>
      </g>
    );
  };
  const Arrow = ({ x1, x2, y, tone }: { x1: number; x2: number; y: number; tone: "bad" | "good" }) => (
    <g>
      <line x1={x1} y1={y} x2={x2 - 7} y2={y} stroke={tone === "bad" ? "#e11d48" : "#059669"} strokeWidth={1.2} opacity={0.6} />
      <path d={`M ${x2} ${y} l -7 -4 l 0 8 z`} fill={tone === "bad" ? "#e11d48" : "#059669"} opacity={0.8} />
    </g>
  );
  return (
    <Frame
      height={176}
      caption={t(
        "네이티브를 바꾸려면 여전히 방문이 필요합니다. 화면 로직만 고치면 되는 경우에는, 위치 전송을 위해 이미 열리는 네트워크 창에 번들을 얹어 보냅니다|ネイティブを変えるには依然として来店が必要です。画面ロジックだけを直す場合は、位置送信のためにすでに開く通信の窓にバンドルを載せて送ります|Changing native code still needs a visit. When only screen logic needs fixing, the bundle rides the network window that already opens for location uploads.",
      )}
    >
      <text x={16} y={30} className="fig-lab" fill="#e11d48">{t("이전|以前|before")}</text>
      <Node x={16} y={42} w={132} label={t("버그 발견|バグ発見|bug found")} tone="bad" />
      <Arrow x1={148} x2={176} y={59} tone="bad" />
      <Node x={176} y={42} w={150} label={t("서비스센터 방문|サービスセンター来店|service center visit")} tone="bad" />
      <Arrow x1={326} x2={354} y={59} tone="bad" />
      <Node x={354} y={42} w={150} label={t("수동 업데이트|手動アップデート|manual update")} tone="bad" />
      <Arrow x1={504} x2={532} y={59} tone="bad" />
      <Node x={532} y={42} w={172} label={t("단말 1대만 해결|端末1台だけ解決|one device fixed")} tone="bad" />

      <line x1={16} y1={92} x2={704} y2={92} stroke="var(--color-line)" strokeWidth={1} />

      <text x={16} y={122} className="fig-lab" fill="#059669">{t("이후|以後|after")}</text>
      <Node x={16} y={134} w={132} label={t("번들만 교체|バンドルのみ差替|bundle only")} tone="good" />
      <Arrow x1={148} x2={176} y={151} tone="good" />
      <Node x={176} y={134} w={150} label={t("위치 전송 창에 편승|位置送信の窓に同載|rides the upload window")} tone="good" />
      <Arrow x1={326} x2={354} y={151} tone="good" />
      <Node x={354} y={134} w={150} label={t("단계적 적용|段階的に適用|staged rollout")} tone="good" />
      <Arrow x1={504} x2={532} y={151} tone="good" />
      <Node x={532} y={134} w={172} label={t("실패 시 자동 롤백|失敗時は自動ロールバック|auto rollback on failure")} tone="good" />
    </Frame>
  );
}

/* ── 블루그린: 배포 중 트래픽이 어디로 가는가 ── */
function BlueGreen({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const Slot = ({ y, name, state, tone }: { y: number; name: string; state: string; tone: "live" | "warm" | "off" }) => {
    const c = tone === "live" ? "#059669" : tone === "warm" ? "#d97706" : "#94a3b8";
    return (
      <g>
        <rect x={250} y={y} width={190} height={40} rx={7}
          fill={tone === "off" ? "var(--color-paper-soft)" : `${c}14`} stroke={c} strokeWidth={1.3}
          strokeDasharray={tone === "warm" ? "5 3" : undefined} />
        <text x={266} y={y + 18} className="fig-node" fill={c}>{name}</text>
        <text x={266} y={y + 32} className="fig-note" fill="var(--color-ink-soft)">{state}</text>
      </g>
    );
  };
  return (
    <Frame
      height={210}
      caption={t(
        "새 버전은 비활성 슬롯에서 먼저 뜨고, DB와 Redis까지 확인하는 준비 상태 점검을 통과해야만 트래픽을 받습니다. 그동안 수집은 한 번도 멈추지 않습니다|新バージョンは非稼働スロットで先に立ち上がり、DBとRedisまで確認する準備状態チェックを通過して初めてトラフィックを受けます。その間、収集は一度も止まりません|The new version boots on the idle slot and only takes traffic after a readiness check that reaches DB and Redis. Ingestion never stops.",
      )}
    >
      <rect x={16} y={78} width={140} height={44} rx={7} fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth={1.2} />
      <text x={86} y={96} textAnchor="middle" className="fig-node">{t("자녀 단말|子ども端末|devices")}</text>
      <text x={86} y={111} textAnchor="middle" className="fig-note">{t("위치 업로드|位置アップロード|uploads")}</text>

      <line x1={156} y1={100} x2={193} y2={100} stroke="var(--color-ink-soft)" strokeWidth={1.3} />
      <path d="M 200 100 l -7 -4 l 0 8 z" fill="var(--color-ink-soft)" />
      <rect x={200} y={78} width={34} height={44} rx={6} fill="var(--color-violet-soft)" stroke="var(--color-violet)" strokeWidth={1.2} />
      <text x={217} y={104} textAnchor="middle" className="fig-node" fill="var(--color-violet-deep)">N</text>
      <text x={217} y={136} textAnchor="middle" className="fig-note">nginx</text>

      <Slot y={40} name={t("green 슬롯|greenスロット|green slot")} state={t("새 버전 · 준비 상태 점검 중|新バージョン · 準備状態チェック中|new build, readiness check")} tone="warm" />
      <Slot y={122} name={t("blue 슬롯|blueスロット|blue slot")} state={t("현재 트래픽 처리 중|現在トラフィック処理中|serving traffic now")} tone="live" />

      <path d="M 234 96 L 244 62" stroke="#d97706" strokeWidth={1.2} strokeDasharray="4 3" />
      <path d="M 234 106 L 244 140" stroke="#059669" strokeWidth={1.4} />
      <path d="M 244 140 l -8 -2 l 3 7 z" fill="#059669" />

      <rect x={468} y={40} width={236} height={40} rx={7} fill="rgba(217,119,6,0.08)" stroke="#d97706" strokeWidth={1.2} />
      <text x={484} y={58} className="fig-node" fill="#d97706">{t("준비 상태 점검|準備状態チェック|readiness gate")}</text>
      <text x={484} y={72} className="fig-note">{t("DB · Redis · 로그인 응답|DB · Redis · ログイン応答|DB, Redis, login response")}</text>
      <line x1={440} y1={60} x2={461} y2={60} stroke="#d97706" strokeWidth={1.2} />
      <path d="M 468 60 l -7 -4 l 0 8 z" fill="#d97706" />

      <text x={468} y={122} className="fig-note" fill="var(--color-ink-soft)">
        {t("통과하면 nginx가 트래픽을 green으로 넘기고|通過すればnginxがトラフィックをgreenへ渡し|on pass, nginx hands traffic to green")}
      </text>
      <text x={468} y={138} className="fig-note" fill="var(--color-ink-soft)">
        {t("그 뒤에 blue를 내립니다|その後にblueを落とします|and only then blue stops")}
      </text>
      <text x={468} y={160} className="fig-note" fill="#e11d48">
        {t("실패하면 트래픽은 blue에 그대로|失敗すればトラフィックはblueのまま|on failure traffic stays on blue")}
      </text>
    </Frame>
  );
}

/* ── 요금제: 요청 1건의 바이트 구성이 어떻게 줄어드는가 ── */
function DataPlan({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const X = 132, W = 520;
  const Bar = ({ y, segs, total, label }: {
    y: number; label: string;
    segs: { w: number; c: string; name: string }[]; total: string;
  }) => {
    let acc = 0;
    return (
      <g>
        <text x={16} y={y + 15} className="fig-lab" fill="var(--color-ink-soft)">{label}</text>
        {segs.map((sg) => {
          const x0 = X + acc;
          acc += sg.w;
          return (
            <g key={sg.name}>
              <rect x={x0} y={y} width={sg.w} height={22} fill={sg.c} opacity={0.85}>
                <animate attributeName="width" from="0" to={sg.w} dur="0.9s" fill="freeze" />
              </rect>
              {sg.w > 54 && (
                <text x={x0 + sg.w / 2} y={y + 15} textAnchor="middle" className="fig-note" fill="#fff" style={{ fontSize: 9 }}>
                  {sg.name}
                </text>
              )}
            </g>
          );
        })}
        <text x={X + acc + 10} y={y + 16} className="fig-node" fill="var(--color-ink)">{total}</text>
      </g>
    );
  };
  return (
    <Frame
      height={186}
      caption={t(
        "요청 1건은 본문과 연결 비용으로 나뉩니다. 압축이 본문을 89% 줄이고, 연결 재사용이 매번 새로 치르던 핸드셰이크를 걷어냅니다. 남는 것은 실제 위치 데이터뿐입니다|リクエスト1件は本文と接続コストに分かれます。圧縮が本文を89%削り、接続再利用が毎回支払っていたハンドシェイクを取り除きます。残るのは実際の位置データだけです|A single request splits into body and connection cost. Compression takes 89% off the body, and connection reuse strips the handshake that used to be paid every time. What remains is the location data itself.",
      )}
    >
      <text x={16} y={22} className="fig-lab" fill="#e11d48">{t("개선 전 · 요청 1건|改善前 · リクエスト1件|before, one request")}</text>
      <Bar y={32} label="" total="15.7KB"
        segs={[
          { w: 190, c: "#e11d48", name: t("TLS 핸드셰이크|TLSハンドシェイク|TLS handshake") },
          { w: 330, c: "#fb7185", name: t("평문 JSON 본문|平文JSON本文|plain JSON body") },
        ]} />

      <text x={16} y={92} className="fig-lab" fill="#059669">{t("개선 후 · 요청 1건|改善後 · リクエスト1件|after, one request")}</text>
      <Bar y={102} label="" total="1.1KB"
        segs={[{ w: 36, c: "#059669", name: "" }]} />
      <text x={X + 46} y={118} className="fig-note" fill="#059669">
        {t("gzip 본문만 · 연결은 재사용|gzip本文のみ · 接続は再利用|gzipped body only, connection reused")}
      </text>

      <line x1={X} y1={140} x2={X + W} y2={140} stroke="var(--color-line)" strokeWidth={1} />
      <text x={X} y={160} className="fig-note" fill="var(--color-ink-muted)">
        {t("단말 1대 월 전송량|端末1台の月間送信量|monthly per device")}
      </text>
      <text x={X + 150} y={160} className="fig-node" fill="#e11d48">43MB</text>
      <text x={X + 200} y={160} className="fig-note">→</text>
      <text x={X + 222} y={160} className="fig-node" fill="#059669">6.8MB</text>
      <text x={X + 286} y={160} className="fig-note" fill="var(--color-ink-soft)">
        {t("하루 96회 업로드 기준|1日96回のアップロード基準|at 96 uploads a day")}
      </text>
    </Frame>
  );
}

/* ── 모하니: 우회는 계층을 타고 온다 ── */
function BypassLayers({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const rows = [
    { y: 40,  name: t("제조사 정책|メーカーポリシー|vendor policy"),   c: "#7c3aed",
      block: t("시각 변경 잠금 · 설정 봉쇄 · 도메인 차단|時刻変更ロック · 設定封鎖 · ドメイン遮断|clock lock, settings, domains") },
    { y: 96,  name: t("안드로이드 권한|Android権限|Android permissions"), c: "#0891b2",
      block: t("접근성 데드맨 스위치 · 사용 기록 스윕|アクセシビリティのデッドマンスイッチ · 利用履歴スイープ|dead man's switch, usage sweep") },
    { y: 152, name: t("앱 계층|アプリ層|app layer"),                 c: "#059669",
      block: t("화면 내용 기준 판정 · 보호 묶음|画面内容基準の判定 · 保護グループ|on-screen checks, clusters") },
  ];
  const attacks = [
    { y: 152, label: t("앱 강제 종료|アプリ強制終了|force stop") },
    { y: 96,  label: t("접근성 끄기|アクセシビリティ解除|revoke a11y") },
    { y: 40,  label: t("시계 되돌리기|時計の巻き戻し|clock rollback") },
  ];
  return (
    <Frame
      height={218}
      caption={t(
        "우회는 차단을 정면으로 뚫지 않고, 차단이 서 있는 계층을 치웁니다. 그래서 시도가 들어온 계층과 같은 곳에서 막습니다. 앱 계층에서 응급 처치하면 다음 우회가 바로 나옵니다|迂回はブロックを正面から破らず、ブロックが立つ層を取り除きます。だから試みが来た層と同じ場所で塞ぎます。アプリ層で応急処置すれば、次の迂回がすぐ出てきます|A bypass does not break blocking head-on; it removes the layer blocking stands on. So each attempt is answered at the layer it came from. Patch it in the app layer and the next bypass arrives immediately.",
      )}
    >
      {rows.map((r) => (
        <g key={r.name}>
          <rect x={188} y={r.y} width={430} height={44} rx={8} fill={`${r.c}12`} stroke={r.c} strokeWidth={1.3} />
          <text x={204} y={r.y + 19} className="fig-node" fill={r.c}>{r.name}</text>
          <text x={204} y={r.y + 34} className="fig-note">{r.block}</text>
          <text x={636} y={r.y + 27} className="fig-note" fill={r.c}>{t("차단|遮断|blocked")}</text>
        </g>
      ))}
      {attacks.map((a, n) => (
        <g key={a.label}>
          <rect x={16} y={a.y + 6} width={140} height={32} rx={6} fill="rgba(225,29,72,0.08)" stroke="#e11d48" strokeWidth={1.1} strokeDasharray="4 3" />
          <text x={86} y={a.y + 26} textAnchor="middle" className="fig-note" fill="#e11d48">{a.label}</text>
          <line x1={156} y1={a.y + 22} x2={181} y2={a.y + 22} stroke="#e11d48" strokeWidth={1.2} opacity={0.7} />
          <circle r={3.4} fill="#e11d48">
            <animate attributeName="cx" from={158} to={186} dur="2.4s" begin={`${n * 0.8}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${a.y + 22};${a.y + 22}`} dur="2.4s" begin={`${n * 0.8}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.7;1" dur="2.4s" begin={`${n * 0.8}s`} repeatCount="indefinite" />
          </circle>
          <text x={168} y={a.y + 14} textAnchor="middle" className="fig-note" fill="#e11d48" style={{ fontSize: 13 }}>✕</text>
        </g>
      ))}
      <text x={16} y={28} className="fig-lab" fill="#e11d48">{t("우회 시도|迂回の試み|attempts")}</text>
      <text x={204} y={28} className="fig-lab" fill="var(--color-ink-soft)">{t("같은 계층에서 대응|同じ層で対応|answered at the same layer")}</text>
    </Frame>
  );
}

/* ── 보호자 앱: 세 조건을 모두 통과해야 표시 ── */
function TripleFilter({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  const gates = [
    { x: 150, name: t("역 매칭|駅マッチング|station match") },
    { x: 300, name: t("거리|距離|distance") },
    { x: 450, name: t("소요시간|所要時間|duration") },
  ];
  return (
    <Frame
      height={158}
      caption={t(
        "지하철 이동은 세 조건을 모두 통과할 때만 표시합니다. 하나라도 어긋나면 추측을 버리고 공백으로 남깁니다. 커버리지를 일부 포기하는 대신, 화면에 뜬 것은 믿을 수 있게 만든 것입니다|地下鉄移動は三つの条件をすべて通過したときだけ表示します。一つでも外れれば推測を捨てて空白のまま残します。カバレッジを一部諦める代わりに、画面に出たものは信じられるようにしました|A subway trip is shown only when all three conditions hold. If any one fails, the guess is discarded and the gap stays a gap. Coverage is traded away so that whatever does appear can be trusted.",
      )}
    >
      <rect x={16} y={48} width={112} height={40} rx={7} fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth={1.2} />
      <text x={72} y={66} textAnchor="middle" className="fig-node">{t("GPS 공백|GPS空白|GPS gap")}</text>
      <text x={72} y={80} textAnchor="middle" className="fig-note">{t("좌표 없음|座標なし|no fixes")}</text>

      {gates.map((g, n) => (
        <g key={g.name}>
          <line x1={n === 0 ? 128 : gates[n - 1].x + 96} y1={68} x2={g.x - 6} y2={68} stroke="var(--color-line-strong)" strokeWidth={1.2} />
          <path d={`M ${g.x} 68 l -6 -3.5 l 0 7 z`} fill="var(--color-line-strong)" />
          <rect x={g.x} y={48} width={96} height={40} rx={7} fill="rgba(124,58,237,0.08)" stroke="#7c3aed" strokeWidth={1.3} />
          <text x={g.x + 48} y={73} textAnchor="middle" className="fig-node" fill="#7c3aed">{g.name}</text>
          <circle r={3.4} fill="#7c3aed">
            <animate attributeName="cx" from={g.x - 24} to={g.x} dur="2.6s" begin={`${n * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values="68;68" dur="2.6s" begin={`${n * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="2.6s" begin={`${n * 0.5}s`} repeatCount="indefinite" />
          </circle>
          {/* 탈락 경로 */}
          <line x1={g.x + 48} y1={88} x2={g.x + 48} y2={116} stroke="#e11d48" strokeWidth={1.1} strokeDasharray="3 3" />
          <path d={`M ${g.x + 48} 122 l -3.5 -6 l 7 0 z`} fill="#e11d48" />
        </g>
      ))}

      <line x1={546} y1={68} x2={578} y2={68} stroke="#059669" strokeWidth={1.4} />
      <path d="M 584 68 l -6 -3.5 l 0 7 z" fill="#059669" />
      <rect x={584} y={48} width={120} height={40} rx={7} fill="rgba(5,150,105,0.1)" stroke="#059669" strokeWidth={1.3} />
      <text x={644} y={73} textAnchor="middle" className="fig-node" fill="#059669">{t("지도에 표시|地図に表示|shown on map")}</text>

      <rect x={252} y={122} width={196} height={28} rx={7} fill="rgba(225,29,72,0.08)" stroke="#e11d48" strokeWidth={1.1} strokeDasharray="4 3" />
      <text x={350} y={140} textAnchor="middle" className="fig-note" fill="#e11d48">
        {t("하나라도 어긋나면 표시하지 않음|一つでも外れれば表示しない|any mismatch, nothing is shown")}
      </text>
    </Frame>
  );
}

/* ── KSTT: 배포 앞의 스키마 게이트 ── */
function SchemaGate({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);
  return (
    <Frame
      height={176}
      caption={t(
        "배포 스크립트가 마이그레이션을 먼저 읽습니다. 컬럼을 추가하는 구문만 통과하고, 삭제하는 구문이 하나라도 있으면 서버에 닿기 전에 배포가 멈춥니다. 무중단 배포 구간에는 구버전 코드가 함께 돌기 때문입니다|デプロイスクリプトがマイグレーションを先に読みます。カラムを追加する構文だけが通り、削除する構文が一つでもあればサーバーに届く前にデプロイが止まります。無停止デプロイの区間では旧バージョンのコードも一緒に動くからです|The deploy script reads the migration first. Only additive statements pass; a single destructive one stops the deploy before it reaches the server, because old code is still running during a zero-downtime switch.",
      )}
    >
      <rect x={16} y={54} width={148} height={54} rx={7} fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth={1.2} />
      <text x={90} y={76} textAnchor="middle" className="fig-node">{t("마이그레이션 SQL|マイグレーションSQL|migration SQL")}</text>
      <text x={90} y={92} textAnchor="middle" className="fig-note">{t("배포에 포함|デプロイに含まれる|part of the deploy")}</text>

      <line x1={164} y1={81} x2={222} y2={81} stroke="var(--color-line-strong)" strokeWidth={1.2} />
      <path d="M 228 81 l -6 -3.5 l 0 7 z" fill="var(--color-line-strong)" />

      <rect x={228} y={48} width={172} height={66} rx={8} fill="rgba(217,119,6,0.09)" stroke="#d97706" strokeWidth={1.4} />
      <text x={314} y={72} textAnchor="middle" className="fig-node" fill="#d97706">{t("추가 전용 게이트|追加専用ゲート|additive-only gate")}</text>
      <text x={314} y={88} textAnchor="middle" className="fig-note">ADD COLUMN / INDEX</text>
      <text x={314} y={102} textAnchor="middle" className="fig-note" fill="#e11d48">DROP / DELETE / TRUNCATE</text>

      <line x1={400} y1={64} x2={452} y2={64} stroke="#059669" strokeWidth={1.4} />
      <path d="M 458 64 l -6 -3.5 l 0 7 z" fill="#059669" />
      <text x={426} y={56} textAnchor="middle" className="fig-note" fill="#059669">{t("통과|通過|pass")}</text>
      <rect x={458} y={44} width={158} height={40} rx={7} fill="rgba(5,150,105,0.1)" stroke="#059669" strokeWidth={1.3} />
      <text x={537} y={68} textAnchor="middle" className="fig-node" fill="#059669">{t("blue / green 전환|blue / green 切替|blue / green switch")}</text>

      <line x1={400} y1={100} x2={452} y2={128} stroke="#e11d48" strokeWidth={1.4} strokeDasharray="4 3" />
      <path d="M 458 132 l -3 -7 l -4 6 z" fill="#e11d48" />
      <text x={422} y={126} textAnchor="middle" className="fig-note" fill="#e11d48">{t("감지|検知|found")}</text>
      <rect x={458} y={112} width={158} height={40} rx={7} fill="rgba(225,29,72,0.08)" stroke="#e11d48" strokeWidth={1.3} />
      <text x={537} y={136} textAnchor="middle" className="fig-node" fill="#e11d48">{t("배포 즉시 중단|デプロイ即中断|deploy aborts")}</text>

      <circle r={3.6} fill="#059669">
        <animateMotion dur="3.4s" repeatCount="indefinite" path="M 164 81 L 228 81 L 400 64 L 458 64" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.4s" repeatCount="indefinite" />
      </circle>
    </Frame>
  );
}

/* ── 권한 스택: 이 앱이 도는 근거 ── */
function PermissionStack({ loc }: { loc: string }) {
  const i = idx(loc);
  const t = (s: string) => L(s, i);

  const rows = [
    {
      y: 44, c: "#4f46e5",
      name: t("배터리 최적화 예외|電池最適化の除外|battery optimization exemption"),
      grant: t("사용자가 직접 승인|ユーザーが直接承認|user grants it"),
      without: t("대기 등급 하락 · 알람과 통신이 더 조여짐|待機ランク低下 · アラームと通信がさらに締まる|standby bucket drops, alarms and network tighten"),
      withIt: t("정확 알람 발화 · 백그라운드 통신 허용|正確アラーム発火 · バックグラウンド通信許可|exact alarms fire, background network allowed"),
    },
    {
      y: 118, c: "#7c3aed",
      name: t("Knox 관리 라이선스|Knox管理ライセンス|Knox management license"),
      grant: t("온보딩에서 활성화 · 제조사 승인 필요|オンボーディングで有効化 · メーカー承認が必要|activated in onboarding, vendor approval"),
      without: t("데이터 개방 요청 불가 · 전송 자체가 막힘|データ開放要求が不可 · 送信自体が塞がる|cannot ask for data, uploads blocked"),
      withIt: t("데이터 ON / OFF 제어 · 방화벽 · 앱 비활성화|データON / OFF制御 · ファイアウォール · アプリ無効化|toggles data, firewall, app disabling"),
    },
  ];

  return (
    <Frame
      height={222}
      caption={t(
        "이 앱은 두 권한 위에 서 있습니다. 배터리 최적화 예외가 없으면 잠든 기기에서 깨어나지 못하고, Knox 라이선스가 없으면 깨어나도 데이터를 열 수 없습니다. 둘 중 하나만 빠져도 위치는 올라가지 않으므로, 온보딩에서 둘 다 확보하지 못하면 다음 단계로 넘어가지 않습니다|このアプリは二つの権限の上に立っています。電池最適化の除外がなければ眠った端末で目覚められず、Knoxライセンスがなければ目覚めても通信を開けません。どちらか一つ欠けても位置は上がらないため、オンボーディングで両方を確保できなければ次へ進みません|The app stands on two grants. Without the battery optimization exemption it cannot wake on a sleeping device; without the Knox license it can wake but cannot open data. Missing either one means no locations at all, so onboarding does not advance until both are held.",
      )}
    >
      {rows.map((r) => (
        <g key={r.name}>
          <rect x={16} y={r.y} width={186} height={56} rx={8} fill={`${r.c}12`} stroke={r.c} strokeWidth={1.4} />
          <text x={32} y={r.y + 24} className="fig-node" fill={r.c}>{r.name}</text>
          <text x={32} y={r.y + 41} className="fig-note">{r.grant}</text>

          {/* 없을 때 */}
          <line x1={202} y1={r.y + 18} x2={244} y2={r.y + 18} stroke="#e11d48" strokeWidth={1.2} strokeDasharray="4 3" />
          <path d={`M 250 ${r.y + 18} l -6 -3.5 l 0 7 z`} fill="#e11d48" />
          <text x={222} y={r.y + 12} textAnchor="middle" className="fig-note" fill="#e11d48" style={{ fontSize: 9 }}>
            {t("없으면|なければ|without")}
          </text>
          <rect x={250} y={r.y + 4} width={210} height={28} rx={6} fill="rgba(225,29,72,0.08)" stroke="#e11d48" strokeWidth={1.1} />
          <text x={355} y={r.y + 22} textAnchor="middle" className="fig-note" fill="#e11d48" style={{ fontSize: 9 }}>{r.without}</text>

          {/* 있을 때 */}
          <line x1={202} y1={r.y + 42} x2={244} y2={r.y + 42} stroke="#059669" strokeWidth={1.3} />
          <path d={`M 250 ${r.y + 42} l -6 -3.5 l 0 7 z`} fill="#059669" />
          <text x={222} y={r.y + 56} textAnchor="middle" className="fig-note" fill="#059669" style={{ fontSize: 9 }}>
            {t("있으면|あれば|with")}
          </text>
          <rect x={250} y={r.y + 28} width={210} height={28} rx={6} fill="rgba(5,150,105,0.09)" stroke="#059669" strokeWidth={1.1} />
          <text x={355} y={r.y + 46} textAnchor="middle" className="fig-note" fill="#059669" style={{ fontSize: 9 }}>{r.withIt}</text>

          <line x1={460} y1={r.y + 42} x2={506} y2={r.y + 42} stroke="#059669" strokeWidth={1.3} />
          <path d={`M 512 ${r.y + 42} l -6 -3.5 l 0 7 z`} fill="#059669" />
          <circle r={3.4} fill="#059669">
            <animate attributeName="cx" from={462} to={512} dur="2.6s" begin={r.y === 44 ? "0s" : "0.7s"} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${r.y + 42};${r.y + 42}`} dur="2.6s" begin={r.y === 44 ? "0s" : "0.7s"} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.6s" begin={r.y === 44 ? "0s" : "0.7s"} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* AND 게이트 */}
      <rect x={512} y={60} width={192} height={92} rx={9} fill="rgba(124,58,237,0.07)" stroke="#7c3aed" strokeWidth={1.4} />
      <text x={608} y={88} textAnchor="middle" className="fig-node" fill="#7c3aed">
        {t("둘 다 있어야 동작|両方揃って初めて動作|both required")}
      </text>
      <text x={608} y={108} textAnchor="middle" className="fig-note">
        {t("깨어나서 · 데이터를 열고|目覚めて · 通信を開き|wake, then open data")}
      </text>
      <text x={608} y={124} textAnchor="middle" className="fig-note">
        {t("위치를 보낸다|位置を送る|and upload")}
      </text>
      <text x={608} y={144} textAnchor="middle" className="fig-note" fill="#e11d48" style={{ fontSize: 9 }}>
        {t("하나만 빠져도 전송 0건|一つ欠ければ送信0件|miss one and nothing ships")}
      </text>

      <text x={16} y={32} className="fig-lab" fill="var(--color-ink-soft)">
        {t("온보딩에서 확보해야 하는 것|オンボーディングで確保するもの|secured during onboarding")}
      </text>

      {/* 온보딩 게이트 */}
      <rect x={16} y={186} width={688} height={26} rx={7} fill="rgba(217,119,6,0.08)" stroke="#d97706" strokeWidth={1.2} strokeDasharray="5 4" />
      <text x={360} y={203} textAnchor="middle" className="fig-note" fill="#d97706">
        {t("온보딩은 게이트다 · 두 권한을 시스템에 다시 확인한 뒤에만 다음 단계로 넘어간다|オンボーディングはゲート · 二つの権限をシステムに再確認してから次へ進む|onboarding is a gate: it re-checks both grants with the system before advancing")}
      </text>
    </Frame>
  );
}

const FIGURES: Record<string, Record<string, (p: { loc: string }) => ReactNode>> = {
  "odiya-child": {
    "절전 모드와의 싸움": DozeFigures,
    "省電力モードとの戦い": DozeFigures,
    "Fighting doze mode": DozeFigures,
    "제약": PermissionStack,
    "制約": PermissionStack,
    "Constraints": PermissionStack,
    "요금제라는 제약": DataPlan,
    "料金プランという制約": DataPlan,
    "The data plan as a constraint": DataPlan,
    "서비스센터에 가야 고칠 수 있는 앱": CodePushPaths,
    "サービスセンターに行かないと直せないアプリ": CodePushPaths,
    "An app you had to visit a service center to fix": CodePushPaths,
  },
  "odiya-parents": {
    "선택과 근거": TripleFilter,
    "選択と根拠": TripleFilter,
    "Decision and rationale": TripleFilter,
  },
  "mohani": {
    "설치 후에 열리는 우회 루트들": BypassLayers,
    "設置後に開く迂回ルート": BypassLayers,
    "The bypass routes that open after setup": BypassLayers,
  },
  "kocca-kstt": {
    "선택과 근거": SchemaGate,
    "選択と根拠": SchemaGate,
    "Decision and rationale": SchemaGate,
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
