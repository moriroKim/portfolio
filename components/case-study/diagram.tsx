import type { ReactNode } from "react";

/* ---------- primitives ---------- */

const W = 720;

function Box({
  x, y, w, h, title, sub, tone = "plain",
}: {
  x: number; y: number; w: number; h: number;
  title: string; sub?: string;
  tone?: "plain" | "accent" | "muted" | "danger";
}) {
  const fill =
    tone === "accent" ? "var(--color-violet-soft)"
    : tone === "danger" ? "rgba(251,113,133,0.12)"
    : tone === "muted" ? "var(--color-paper-soft)"
    : "var(--color-paper)";
  const stroke =
    tone === "accent" ? "var(--color-violet)"
    : tone === "danger" ? "var(--color-rose)"
    : "var(--color-line-strong)";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={fill} stroke={stroke} strokeWidth={tone === "plain" ? 1 : 1.5} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 5 : y + h / 2 + 4}
        textAnchor="middle" className="dg-title">{title}</text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" className="dg-sub">
          {sub}
        </text>
      )}
    </g>
  );
}

/** Straight arrow with a pulse travelling along it. */
function Flow({
  d, label, delay = 0, dashed = false, tone = "plain",
}: {
  d: string; label?: string; delay?: number; dashed?: boolean;
  tone?: "plain" | "danger";
}) {
  const color = tone === "danger" ? "var(--color-rose)" : "var(--color-line-strong)";
  const dot = tone === "danger" ? "var(--color-rose)" : "var(--color-violet)";
  const id = `p${Math.abs(hash(d))}`;
  return (
    <g>
      <path id={id} d={d} fill="none" stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? "4 4" : undefined} markerEnd="url(#dg-arrow)" />
      <circle r={3.5} fill={dot} className="dg-pulse">
        <animateMotion dur="2.6s" begin={`${delay}s`} repeatCount="indefinite"
          keyPoints="0;1" keyTimes="0;1" calcMode="linear">
          <mpath href={`#${id}`} />
        </animateMotion>
        <animate attributeName="opacity" dur="2.6s" begin={`${delay}s`}
          values="0;1;1;0" keyTimes="0;0.12;0.85;1" repeatCount="indefinite" />
      </circle>
      {label && <FlowLabel d={d} label={label} />}
    </g>
  );
}

function FlowLabel({ d, label }: { d: string; label: string }) {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const x1 = nums[0] ?? 0, y1 = nums[1] ?? 0;
  const x2 = nums[nums.length - 2] ?? 0, y2 = nums[nums.length - 1] ?? 0;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const vertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
  return (
    <text x={vertical ? mx + 8 : mx} y={vertical ? my : my - 7}
      textAnchor={vertical ? "start" : "middle"} className="dg-label">
      {label}
    </text>
  );
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i) | 0;
  return h;
}

function Frame({ h, caption, children }: { h: number; caption: string; children: ReactNode }) {
  return (
    <figure className="my-12">
      <div className="overflow-x-auto rounded-2xl border border-line bg-paper-warm p-4 sm:p-6">
        <svg viewBox={`0 0 ${W} ${h}`} width="100%" style={{ minWidth: 560 }}
          role="img" aria-label={caption}>
          <defs>
            <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 z" fill="var(--color-line-strong)" />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ---------- per project ---------- */

function OdiyaChild() {
  return (
    <Frame h={330} caption="알람이 스스로 다음 알람을 예약하며 수집 주기를 유지합니다. 좌표는 세 단계 검증을 통과해야 전송되고, 서버 명령은 전송 응답에 실려 되돌아옵니다.">
      <Box x={16} y={130} w={104} h={56} title="알람" sub="자기 재예약" tone="accent" />
      <Flow d="M 120 158 L 168 158" delay={0} />
      <Box x={168} y={130} w={116} h={56} title="위치 획득" sub="활동 인식 기반" />
      <Flow d="M 284 158 L 332 158" delay={0.25} />
      <Box x={332} y={112} w={128} h={92} title="좌표 검증" tone="accent" />
      <text x={396} y={152} textAnchor="middle" className="dg-sub">정확도 게이트</text>
      <text x={396} y={168} textAnchor="middle" className="dg-sub">위성 수 판별</text>
      <text x={396} y={184} textAnchor="middle" className="dg-sub">속도 타당성</text>
      <Flow d="M 460 158 L 508 158" delay={0.5} label="통과분만" />
      <Box x={508} y={130} w={116} h={56} title="전송" sub="압축 후 업로드" />
      <Box x={508} y={36} w={116} h={52} title="데이터 개방" sub="최소 6초 유지" tone="accent" />
      <Flow d="M 566 88 L 566 130" delay={0.75} />
      <Box x={640} y={130} w={64} h={56} title="서버" tone="muted" />
      <Flow d="M 624 148 L 640 148" delay={1.0} />
      <Flow d="M 640 172 L 624 172" delay={1.4} tone="plain" dashed />
      <text x={632} y={210} textAnchor="middle" className="dg-label">응답에 명령 편승</text>
      <Flow d="M 566 186 L 566 250 L 68 250 L 68 186" delay={1.7} label="다음 알람 예약" />
      <text x={16} y={30} className="dg-head">자녀 단말 앱</text>
      <text x={640} y={30} className="dg-head">서버</text>
    </Frame>
  );
}

function OdiyaParents() {
  return (
    <Frame h={300} caption="서버에서 받은 원본 좌표는 세 갈래 해석을 거칩니다. 조건을 모두 만족할 때만 화면에 나타나고, 하나라도 어긋나면 표시하지 않습니다.">
      <Box x={16} y={120} w={112} h={56} title="서버 조회" sub="주기 자동 산정" tone="muted" />
      <Flow d="M 128 148 L 184 148" delay={0} label="원본 좌표" />
      <Box x={184} y={36} w={150} h={56} title="체류 군집화" sub="반경 3배 초과 시 분리" />
      <Box x={184} y={120} w={150} h={56} title="지하철 추론" sub="역 · 거리 · 소요시간" tone="accent" />
      <Box x={184} y={204} w={150} h={56} title="버전 게이트" sub="구버전은 해석 생략" />
      <Flow d="M 176 140 L 184 72" delay={0.2} />
      <Flow d="M 176 156 L 184 228" delay={0.4} />
      <Flow d="M 334 64 L 430 64" delay={0.7} />
      <Flow d="M 334 148 L 430 148" delay={0.9} />
      <Flow d="M 334 232 L 430 232" delay={1.1} />
      <Box x={430} y={110} w={130} h={76} title="판정" sub="모두 만족?" tone="accent" />
      <Flow d="M 560 134 L 640 134" delay={1.4} label="예" />
      <Box x={640} y={106} w={64} h={56} title="표시" />
      <Flow d="M 560 162 L 640 200" delay={1.6} tone="danger" label="아니오" />
      <Box x={640} y={176} w={64} h={48} title="침묵" tone="danger" />
      <text x={16} y={26} className="dg-head">보호자 앱 해석 파이프라인</text>
    </Frame>
  );
}

function KoccaKstt() {
  return (
    <Frame h={300} caption="녹음은 지워지지 않고 세대로 쌓입니다. 음성 인식 작업은 한 번에 하나만 선점되고, 배포는 파괴적 스키마 변경을 만나면 멈춥니다.">
      <Box x={16} y={40} w={128} h={56} title="응시 화면" sub="발음 · 말하기 녹음" />
      <Flow d="M 144 68 L 208 68" delay={0} label="업로드" />
      <Box x={208} y={40} w={136} h={56} title="녹음 저장" sub="세대로 누적" tone="accent" />
      <Flow d="M 344 68 L 408 68" delay={0.3} />
      <Box x={408} y={40} w={144} h={56} title="음성 인식 워커" sub="하나만 선점 · 하트비트" tone="accent" />
      <Flow d="M 552 68 L 616 68" delay={0.6} />
      <Box x={616} y={40} w={88} h={56} title="채점" sub="루브릭" />
      <Flow d="M 660 96 L 660 150" delay={0.9} />
      <Box x={560} y={150} w={144} h={56} title="데이터셋 빌드" sub="음량 정규화 · 익명화" tone="accent" />
      <Box x={16} y={150} w={128} h={56} title="문항 리비전" sub="응시 시점 고정" />
      <Flow d="M 80 150 L 80 96" delay={1.1} dashed />
      <Box x={16} y={236} w={128} h={48} title="배포" sub="blue / green" tone="muted" />
      <Flow d="M 144 260 L 236 260" delay={1.3} />
      <Box x={236} y={232} w={168} h={56} title="스키마 게이트" sub="추가 전용" tone="accent" />
      <Flow d="M 404 248 L 476 248" delay={1.6} label="통과" />
      <Box x={476} y={224} w={68} h={44} title="적용" />
      <Flow d="M 404 272 L 476 292" delay={1.8} tone="danger" />
      <text x={520} y={296} textAnchor="middle" className="dg-label">파괴적 구문이면 배포 중단</text>
      <text x={16} y={26} className="dg-head">응시에서 학습 데이터까지</text>
    </Frame>
  );
}

function Wigvo() {
  return (
    <Frame h={280} caption="두 개의 음성 세션이 통화 양쪽을 각각 맡습니다. 에코 게이트가 말할 차례를 판정해, 통역된 음성이 되돌아와 다시 번역되는 루프를 끊습니다.">
      <Box x={16} y={104} w={116} h={64} title="웹 클라이언트" sub="발신자" tone="muted" />
      <Flow d="M 132 124 L 208 124" delay={0} />
      <Flow d="M 208 148 L 132 148" delay={1.3} />
      <Box x={208} y={36} w={140} h={56} title="세션 A" sub="발신자 측 통역" tone="accent" />
      <Box x={208} y={180} w={140} h={56} title="세션 B" sub="수신자 측 통역" tone="accent" />
      <Box x={208} y={104} w={140} h={64} title="릴레이 서버" sub="오디오 라우팅 · 용량 관리" />
      <Flow d="M 278 104 L 278 92" delay={0.3} />
      <Flow d="M 278 168 L 278 180" delay={0.5} />
      <Box x={404} y={104} w={132} h={64} title="에코 게이트" sub="무음 주입 · 음성 활동 감지" tone="accent" />
      <Flow d="M 348 136 L 404 136" delay={0.7} />
      <Flow d="M 536 136 L 592 136" delay={0.9} />
      <Box x={592} y={104} w={112} h={64} title="전화망" sub="수신자" tone="muted" />
      <path d="M 648 168 L 648 250 L 470 250 L 470 168" fill="none"
        stroke="var(--color-rose)" strokeWidth={1.5} strokeDasharray="4 4" />
      <text x={559} y={266} textAnchor="middle" className="dg-label">
        에코 경로를 게이트가 차단
      </text>
      <text x={16} y={26} className="dg-head">이중 세션 에코 게이팅</text>
    </Frame>
  );
}

const MAP: Record<string, () => ReactNode> = {
  "odiya-child": OdiyaChild,
  "odiya-parents": OdiyaParents,
  "kocca-kstt": KoccaKstt,
  "wigvo-v2": Wigvo,
};

export function CaseStudyDiagram({ slug }: { slug: string }) {
  const D = MAP[slug];
  return D ? <D /> : null;
}
