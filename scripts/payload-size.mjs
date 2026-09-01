/**
 * 위치 배치 업로드 본문의 압축 효과 측정.
 * 케이스 스터디에 인용된 10.2KB → 1.1KB, 월 43MB → 6.8MB의 산출 근거.
 * 실행: node scripts/payload-size.mjs
 */
import { gzipSync } from "node:zlib";

const fix = (i) => ({
  latitude: +(37.5665 + i * 0.00013).toFixed(7),
  longitude: +(126.978 + i * 0.00011).toFixed(7),
  accuracy: 12 + (i % 7),
  gatheredDate: `2026-09-01T${String((i / 120) | 0 % 24).padStart(2, "0")}:${String((i / 2) | 0 % 60).padStart(2, "0")}:${String((i * 30) % 60).padStart(2, "0")}`,
  batteryLevel: 87 - (i % 40),
  activityState: ["STILL", "WALKING", "IN_VEHICLE"][i % 3],
  gpsEnabled: true, dataEnabled: true, wifiEnabled: false,
  satelliteCount: 8 + (i % 5),
  speed: +((i % 13) * 0.7).toFixed(2),
  provider: "fused", appVersion: "4.6.0", queued: false,
});

const envelope = (n) => ({
  username: "child_8f21c0", appVersion: "4.6.0",
  deviceModel: "SM-A165N", osVersion: "14", sentAt: "2026-09-01T09:15:30",
  positions: Array.from({ length: n }, (_, i) => fix(i)),
  diagLogs: Array.from({ length: 6 }, (_, i) => ({
    eventId: `d-${i}`, type: "NETWORK_OPEN", at: "2026-09-01T09:14:00",
    heldMs: 6120, owner: "SVC", result: "OK",
  })),
  parked: Array.from({ length: 3 }, (_, i) => ({ ...fix(100 + i), queued: true })),
});

for (const n of [10, 30, 60]) {
  const body = Buffer.from(JSON.stringify(envelope(n)));
  const gz = gzipSync(body, { level: 6 });
  console.log(`위치 ${String(n).padStart(2)}건  평문 ${body.length}B  gzip ${gz.length}B  감소 ${(100 * (1 - gz.length / body.length)).toFixed(1)}%`);
}

// 월 전송량: 30초 수집(하루 2,880 fix), 30건 묶음, TLS 신규 연결 오버헤드 5.5KB 근사
const n = 30;
const body = Buffer.from(JSON.stringify(envelope(n)));
const gz = gzipSync(body, { level: 6 });
const perDay = 2880 / n;
const HS = 5500;
const before = perDay * (body.length + HS);
const after = perDay * gz.length + HS * 24; // 연결 재사용: 시간당 1회 신규
console.log(`\n업로드/일 ${perDay}회`);
console.log(`개선 전 월 ${(before * 30 / 1024 / 1024).toFixed(1)}MB`);
console.log(`개선 후 월 ${(after * 30 / 1024 / 1024).toFixed(1)}MB  (${(100 * (1 - after / before)).toFixed(0)}% 감소)`);
