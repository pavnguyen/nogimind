# visual-refresh-spec.md — Đổi icon, làm lại bảng màu, tăng tương phản

> Trạng thái: **SPEC — chưa code**. Tài liệu này chốt yêu cầu cho một lần làm lớn (một PR duy nhất).
> Yêu cầu gốc: *"tôi muốn sử dụng icons khác cho app, màu khác cho app, tương phản cao hơn, bạn có ý kiến gì không?"*

---

## 0. TL;DR

| Hạng mục | Chốt |
|---|---|
| Icon | **Bộ SVG custom chủ đề grappling** cho các khái niệm BJJ (12 icon), **lucide-react giữ cho tiện ích** (mũi tên, settings, search…). Không thêm dependency icon mới. |
| Đóng gói icon | **Component cho UI + SVG sprite cho PWA/share** |
| Màu | **Làm lại bảng màu hoàn toàn**, giữ **5 màu hub** nhưng chọn lại; nền **than ấm (warm charcoal)**; vibe **navy–kem của logo** |
| Logo | **Bất biến**: kem `#f0efea` + navy `#0d2648`. Không đụng asset (favicon/PWA/OG). |
| Semantic | **cam-đỏ + xanh mòng két** (thay đỏ tươi / xanh neon) |
| Tương phản | **WCAG AA 4.5:1** cho text; **bảng tương phản đầy đủ + script kiểm tra tự động** |
| Light mode | **Mặc định Sáng + công tắc ghi đè**: Theo hệ thống / Sáng / Tối, lưu preference |
| Typography | **Đổi mặt hiển thị (display)**, giữ Inter cho body. 3 phương án ở §10 (cần chốt). |
| Kiến trúc theme | **Giữ nguyên** cơ chế `[data-hub]` 5 theme, **chỉ đổi giá trị token** |
| Triển khai | **Một PR lớn**, gồm cả icon components + custom SVG |
| Ưu tiên | **Đẹp trước, chấp nhận bundle nặng hơn** |

---

## 1. Mục tiêu & phạm vi

1. Thay bộ icon của **toàn app**: hub navigation, brand mark, và các khái niệm BJJ dùng xuyên suốt (positions, skills, defensive layers, safety/tap).
2. Làm lại **bảng màu toàn app**: surface, text, border, accent theo hub, semantic.
3. **Tăng tương phản** đạt **WCAG AA 4.5:1** cho mọi cặp text/nền thực tế, gồm cả các token đang fail (§3).
4. Thêm **light mode theo hệ thống** (không có toggle trong Settings).
5. Đổi **mặt hiển thị (display font)** để chữ dễ đọc hơn.
6. Tự động hoá kiểm tra tương phản để không tái phát.

**Phạm vi:** theme + icon + typography. Không bao gồm bố cục trang, tính năng, i18n, dữ liệu.

---

## 2. Ràng buộc bất biến (hard constraints)

- **Màu logo phải giữ**: kem `#f0efea` trên navy `#0d2648` (đo được **13.14:1** — đang rất tốt, không đụng).
- **Không đụng brand asset**: favicon, PWA icons, OG/Twitter card, manifest — giữ nguyên.
- **Không dùng neon/gắt**, **không đỏ tươi**, **không hồng/tím**.
- **Giữ cơ chế theme 5 hub** qua `[data-hub]`; chỉ đổi giá trị token.
- **Không thêm dependency icon mới** (không cài bộ icon khác).
- **Một PR lớn**; icon custom phải **pha được với lucide** ở những chỗ còn lại.
- Không thêm toggle theme thủ công (light chỉ theo hệ thống).

---

## 3. Hiện trạng đã khảo sát (có bằng chứng)

### 3.1 Cấu trúc theme
- Token nằm ở `src/styles/hallmark-themes.css`: `:root` (Dashboard/fallback) + 5 block `[data-hub="learn|study|fix|build|reference"]`.
- Tailwind **v4 CSS-first** (không có `tailwind.config.js`); `@theme` nằm trong `src/index.css`, ánh xạ `--color-hallmark-*` → `var(--hallmark-*)`.
- `src/contexts/HubThemeProvider.tsx` set `data-hub` trên một wrapper div theo route; `HubThemeContext.ts` định nghĩa `HubId = 'learn'|'study'|'fix'|'build'|'reference'`.
- `body` đang hard-code `color-scheme: dark`.

### 3.2 Màu hiện tại (vấn đề)
| Token | Giá trị | Ghi chú |
|---|---|---|
| `--hallmark-bg-primary` | `#06080d` | gần như đen-xanh, **lạnh** |
| `--hallmark-text-primary` | `#f1f5f9` | tốt |
| `--hallmark-text-secondary` | `#94a3b8` | tốt |
| `--hallmark-text-tertiary` | `#64748b` | ❌ **4.21:1** trên `#06080d` → **fail AA 4.5** |
| `--color-hub-learn` | `#22d3ee` cyan | **neon** — vi phạm ràng buộc |
| `--color-hub-study` | `#34d399` | xanh ngọc sáng, hơi gắt |
| `--color-hub-fix` | `#fb923c` | cam sáng |
| `--color-hub-build` | `#a78bfa` **violet** | ❌ **tím** — vi phạm ràng buộc |
| `--color-hub-reference` | `#94a3b8` | xám lạnh |

Đo thực tế: `text-slate-500` (`#64748b`) trên nền `#06080d` = **4.21:1** → **fail**. Có **66 chỗ** dùng `text-slate-500` (con số này chính là token tertiary). `text-slate-400` (83 chỗ) = 7.81:1 → đạt.

### 3.3 Bug phát hiện khi khảo sát (nên sửa trong PR này)
`src/components/layout/navItems.ts` dùng `hub: 'defense'` (route `/defense`), nên `data-hub="defense"`, **nhưng CSS chỉ định nghĩa `[data-hub="fix"]`**. Hệ quả: **theme của hub defense/fix chưa bao giờ được áp**. Lỗi bị che bởi cast `matchedHub?.hub as HubId` trong `HubThemeProvider.tsx` (nằm ngoài union type nên lẽ ra phải báo lỗi TS).
→ Cần **thống nhất một ID duy nhất** (`defense` hoặc `fix`) ở: `navItems.ts`, `HallmarkThemeContext.HubId`, `hallmark-themes.css`, và bỏ cast để TS bắt lỗi.

### 3.4 Icon hiện tại
- **47 icon lucide** distinct, import trong **35 file** (`.ts`/`.tsx`); tổng repo 142 file TS/TSX.
- Icon hub: `learn=Compass`, `study=Zap`, `defense=Wrench`, `build=Layers3`, `reference=BookOpen`. Brand: `brandIcon = BrainCircuit`.
- Brand ngoài lucide: `BrandIcons.tsx` đã có `FacebookIcon`, `InstagramIcon` (inline SVG, `currentColor`) — **mẫu tham chiếu tốt** cho bộ custom.
- Một số icon lucide mang nghĩa võ thuật đã dùng: `Sword`, `Shield`, `ShieldCheck`, `Target`, `Flag`, `Dice5`, `GitFork`, `Network`.

### 3.5 Typography hiện tại
- Body: **Inter** (Google Fonts trong `index.html`, weight 300–800).
- Display: **Fraunces** qua `@fontsource/fraunces` (self-host, đã có dependency); dùng cho `h1`–`h6` và các chỗ editorial.
- `--font-sans`, `--font-display`, `--font-mono` (`JetBrains Mono` — chưa thấy cài đặt/vendored).

### 3.6 Hạ tầng kiểm chứng sẵn có
- Scripts: `typecheck` (`tsc -b`), `lint` (eslint), `test` (vitest run), `build` (`tsc -b && vite build`), `validate:content`, `validate:videos`, `audit:vi`.
- Test hiện tại: **369 pass**. Có `DashboardPage.test.tsx` — cẩn thận khi đổi class trong Dashboard.

---

## 4. Nhật ký phỏng vấn (quyết định đã chốt)

| # | Câu hỏi | Lựa chọn của bạn |
|---|---|---|
| 1 | Phạm vi icon | **Toàn app** |
| 2 | Phong cách icon | **Custom SVG chủ đề grappling** |
| 3 | Hướng màu | **Làm lại bảng màu hoàn toàn** |
| 4 | Ràng buộc | **Giữ màu logo**, tông **Guardian HCMC**, không ràng buộc khác |
| 5 | Độ phủ icon custom | **Custom bộ chủ đạo, lucide cho tiện ích** |
| 6 | Chiến lược accent | **Giữ 5 màu hub (chọn lại)** |
| 7 | Nền tối | **Than ấm (warm charcoal)** |
| 8 | Mức tương phản | **WCAG AA (4.5:1)** |
| 9 | Hướng 5 màu hub | **Hợp navy–kem của logo** |
| 10 | Tông Guardian HCMC | **Giữ amber–rose** cho mục cảm ơn |
| 11 | Màu ngữ nghĩa | **Cam-đỏ + xanh mòng két** |
| 12 | Light mode | **Theo hệ thống (mặc định) + công tắc Sáng/Tối** |
| 13 | Đóng gói icon | **Component cho UI + sprite cho PWA/share** |
| 14 | Style icon BJJ | **Outline 2px, khớp lucide** |
| 15 | Triển khai | **Một lần, một PR lớn** |
| 16 | Typography | **Đổi mặt hiển thị (display)** |
| 17 | Mặt display mới | **Nhờ mình đề xuất 3 lựa chọn** (§10) |
| 18 | Asset thương hiệu | **Không đụng** |
| 19 | Hỗ trợ contrast cao của OS | **Chưa cần** |
| 20 | Kiểm tra tương phản | **Bảng đầy đủ + script kiểm tra tự động** |
| 21 | Gán màu cho 5 hub | **Tự quyết** (§7) |
| 22 | Icon BJJ bắt buộc (12) | Hook/móc chân, Grip/khoá tay, Choke/siết cổ, Leg lock/đường gối, Ghim & Mount, Thoát hiểm (escape/bridge), Vật & takedown, Back take/kiểm soát lưng, Guard, Chuỗi submission, An toàn & tap, Khung chặn (frame) |
| 23 | Nav khi KHÔNG active | **Tăng rõ nhưng vẫn thua mục active** |
| 24 | Gam màu cấm | **Không neon/gắt, không đỏ tươi, không hồng/tím** |
| 25 | Kiến trúc theme | **Giữ nguyên cơ chế, chỉ đổi giá trị token** |
| 26 | Mục "ý kiến" trong spec | **Chỉ kết luận ngắn** (§5) |
| 27 | Ràng buộc kỹ thuật icon | **Ưu tiên đẹp, chấp nhận nặng hơn** |

> **Xung đột cần chốt (xem §18.1):** #10 "giữ amber–rose" vs #24 "không hồng/tím" — `rose` là hồng-đỏ. Đề xuất: giữ tinh thần gradient nhưng thay `rose` bằng **cam-đỏ (copper)** để nằm trong palette.

---

## 5. Ý kiến ngắn (kết luận)

Làm cùng lúc là **đúng** — icon, màu và tương phản dùng chung một bộ token, tách ra sẽ phải sửa hai lần. Ba điểm cần lưu ý:

1. **Tương phản là lý do mạnh nhất để làm.** Token tertiary đang fail AA (4.21:1) và violet/cyan vi phạm chính ràng buộc "không tím/neon" của bạn — đây không phải sở thích, là lỗi.
2. **Icon custom chỉ nên phủ khái niệm BJJ** (12 icon). Custom hoá cả 47 icon sẽ tốn công vô ích và dễ lệch nét với lucide ở các chỗ tiện ích.
3. **Nên sửa luôn bug `defense` vs `fix`** trong cùng PR, vì nó nằm ngay trên file theme bạn đang sửa.

Rủi ro chính không phải kỹ thuật mà là **thẩm định bằng mắt**: contrast script chỉ bắt được cặp token, không bắt được "trông có ổn không".

---

## 6. Bảng màu mới — Dark (warm charcoal)

Nền **than ấm** (thay `#06080d` lạnh bằng tông nâu-xám ấm). Mọi giá trị dưới đây đã **đo WCAG thực tế**.

> **Đây là bảng đề xuất ban đầu.** Bản đang chạy đã nâng sáng thêm một bậc — `#1a1814` / `#232019` / `#2f2b24` / `#514a3f` (xem §12). Các con số ở §6 giữ nguyên như lúc đề xuất, không phải giá trị token hiện tại.

### 6.1 Surface
| Token | Hex | Ghi chú |
|---|---|---|
| `--bg-primary` | `#0d0c0a` | than ấm, nền gốc |
| `--bg-surface` | `#14120f` | dải phụ |
| `--bg-card` | `#1a1815` | card |
| `--bg-elevated` | `#24211c` | popover/overlay |
| `--border-subtle` | `rgba(214,205,190,0.10)` | viền mờ |
| `--border-default` | `rgba(214,205,190,0.18)` | viền thường |

### 6.2 Text (AA yêu cầu ≥ 4.5:1)
| Token | Hex | Trên `bg-primary` | Trên `bg-card` |
|---|---|---|---|
| `--text-primary` | `#f6f4f0` | **17.80** ✅ | **16.13** ✅ |
| `--text-secondary` | `#cfc9bd` | **11.86** ✅ | **10.75** ✅ |
| `--text-tertiary` | `#a9a191` | **7.63** ✅ | **6.91** ✅ |

> Tertiary mới (7.63–6.91) so với cũ (4.21) — đây là mức tăng tương phản cốt lõi. Vẫn dịu hơn secondary nên giữ được phân cấp.

### 6.3 Accent theo hub
| Hub | Vai trò | Hex | Trên bg | Trên card | Chữ đậm trên nền accent |
|---|---|---|---|---|---|
| `learn` | amber vàng ấm | `#e8b05c` | 10.05 ✅ | 9.11 ✅ | 10.05 ✅ |
| `study` | xanh mòng két (teal) | `#3ec9b6` | 9.53 ✅ | 8.63 ✅ | 9.53 ✅ |
| `defense` | cam-đỏ copper | `#e07a4e` | 6.58 ✅ | 5.96 ✅ | 6.58 ✅ |
| `build` | xanh thép (steel) | `#7fa9e0` | 8.06 ✅ | 7.30 ✅ | 8.06 ✅ |
| `reference` | xám ấm graphite | `#b0a99b` | 8.37 ✅ | 7.59 ✅ | 8.37 ✅ |
| *(default/Dashboard)* | kem cát | `#ddd6c8` | 13.53 ✅ | 12.25 ✅ | 13.53 ✅ |

Mỗi accent cần đủ biến thể token: `--accent`, `--accent-dim` (≈12% alpha), `--accent-glow` (≈6%), `--surface-accent` (nền tối pha accent), `--text-accent` (bản sáng hơn cho chữ nhỏ).

### 6.4 Chuyển đổi token cũ → mới (giữ tên `--hallmark-*`)
| Token cũ | Giá trị cũ | Token/giá trị mới |
|---|---|---|
| `--hallmark-bg-primary` | `#06080d` | `#0d0c0a` |
| `--hallmark-bg-surface` | `#0b1018` | `#14120f` |
| `--hallmark-bg-card` | `#101722` | `#1a1815` |
| `--hallmark-bg-elevated` | `#182234` | `#24211c` |
| `--hallmark-text-tertiary` | `#64748b` | `#a9a191` |
| `--hallmark-border-subtle/default` | slate rgba | warm rgba |
| `--color-hub-learn` | `#22d3ee` | `#e8b05c` |
| `--color-hub-study` | `#34d399` | `#3ec9b6` |
| `--color-hub-fix` | `#fb923c` | `#e07a4e` |
| `--color-hub-build` | `#a78bfa` | `#7fa9e0` |
| `--color-hub-reference` | `#94a3b8` | `#b0a99b` |
| `--color-ink-*`, `--color-dojo-*` | navy-xám lạnh | dải than ấm tương ứng |

Giữ **tên** token để giảm số điểm sửa; thay **giá trị**. Riêng các class Tailwind hard-code `slate-*`/`sky-*`/`cyan-*`/`rose-*` ở component phải thay bằng token (xem §14).

---

## 7. Gán màu 5 hub + dashboard (quyết định của mình)

Giữ **5 slot** như cũ, thay bảng màu để ra vibe **navy–kem của logo** (trầm, ấm, không neon, không tím), pha 2 accent ấm:

| Hub | Slot cũ | Slot mới | Lý do |
|---|---|---|---|
| `learn` | cyan neon | **amber vàng ấm** `#e8b05c` | "editorial / học nền tảng" — ấm, gần kem |
| `study` | emerald | **teal** `#3ec9b6` | xanh mòng két trầm, không gắt |
| `defense`/`fix` | cam sáng | **copper cam-đỏ** `#e07a4e` | đúng "nguy hiểm/khẩn" mà không phải đỏ tươi |
| `build` | violet ❌ | **steel blue** `#7fa9e0` | hướng navy của logo, hết tím |
| `reference` | xám lạnh | **graphite ấm** `#b0a99b` | trung tính ấm, hết lệch tông |
| *Dashboard* | emerald-teal | **kem cát** `#ddd6c8` | giữ dashboard trung tính, gợi kem logo |

Bố cục ấm/lạnh: **2 ấm** (amber, copper) + **1 teal** + **1 steel** + **2 trung tính** (graphite, kem). Không slot nào là hồng/tím/neon.

---

## 8. Màu ngữ nghĩa (semantic)

| Ngữ nghĩa | Hex | Trên card | Ghi chú |
|---|---|---|---|
| success / an toàn | `#3ec9b6` (teal) | 8.63 ✅ | đồng bộ với hub `study` |
| warning / cảnh báo | `#e8b05c` (amber) | 9.11 ✅ | đồng bộ với hub `learn` |
| danger / nguy hiểm | `#e07a4e` (copper cam-đỏ) | 5.96 ✅ | **không đỏ tươi**; dùng cho "tap ngay", leg-lock nguy hiểm |
| info | `#7fa9e0` (steel) | 7.30 ✅ | |

**Quy tắc:** màu **không bao giờ là kênh thông tin duy nhất** — mỗi trạng thái phải kèm icon + nhãn chữ (`aria-label` / text). Điều này đặc biệt quan trọng cho vùng an toàn & tap (§11).

---

## 9. Dải "With gratitude" (Guardian HCMC)

Hiện tại: gradient `amber → rose` + chip Facebook/Instagram. Yêu cầu: **giữ tông amber–rose** nhưng **không dùng hồng/tím**.

Đề xuất thay `rose` bằng **copper cam-đỏ** `#e07a4e`, giữ ref cho Guardian:
- Nền: `linear-gradient(90deg, rgba(232,176,92,0.14), rgba(224,122,78,0.07), transparent)`
- Viền: `rgba(232,176,92,0.25)`; bo `rounded-lg`
- Tim: `#e8b05c` fill; chữ `#f6f4f0` / amber nhạt `#f0d9ae`
- Chip FB = amber `#e8b05c`, chip IG = copper `#e07a4e` (hover đậm + trắng)
- Icon brand: giữ `BrandIcons.tsx` (đã inline SVG `currentColor`) — **không đổi hình**, chỉ đổi màu theo palette mới

> Nếu bạn muốn **giữ đúng `rose`**: cần ghi rõ ngoại lệ "1 chỗ duy nhất dùng rose" trong spec, và mình sẽ thêm dòng comment lý do trong code (xem §18.1).

---

## 10. Typography — 3 phương án mặt display (cần bạn chốt)

Giữ **Inter cho body** (đang chạy tốt, tiết kiệm công). Chỉ thay mặt **display** (đang là Fraunces), và nên **self-host qua `@fontsource`** như Fraunces hiện tại (tránh phụ thuộc Google Fonts runtime).

| # | Font | Vì sao | Nhược điểm | Ghi chú kỹ thuật |
|---|---|---|---|---|
| **A** | **Bricolage Grotesque** | Grotesque ấm, có nét "thể thao/hiện đại", cá tính mà vẫn đọc tốt; hợp brand trẻ | Hơi lập dị ở size lớn | Variable, 1 file; `--font-display` |
| **B** | **Archivo** (dùng *Archivo Expanded* cho heading) | Rất chắc, thể thao/athletic, số liệu (stats) rõ — hợp dashboard nhiều số | Ít "ấm" hơn A | Variable + bản Expanded; pair cực tốt với Inter |
| **C** | **Source Serif 4** | Ấm kiểu editorial, gần tinh thần Fraunces nhưng **dễ đọc ở size nhỏ hơn** | Bớt "hiện đại/kỹ thuật" | Variable; giữ cảm giác "sách/võ đường" |

**Đề xuất của mình: B** cho heading + stats (rõ số, chắc, hợp UI kỹ thuật), giữ Inter cho body. Nếu bạn muốn giữ chất "editorial" thì **C**. **A** là lựa chọn "cá tính nhất".

Kèm theo: rà lại `line-height`, `letter-spacing` cho heading; kiểm tra `h1`–`h6` trong `src/index.css` (dòng ~164–180).

---

## 11. Hệ thống icon mới

### 11.1 Phân vai
- **Custom BJJ SVG (12 icon)**: phủ các khái niệm võ thuật chủ đạo.
- **lucide-react**: giữ cho tiện ích (mũi tên, chevron, search, settings, menu, eye, download, printer, refresh, X, command…). **Không cài thêm gói nào.**
- **BrandIcons.tsx**: giữ nguyên hình, chỉ cập nhật màu.

### 11.2 Danh sách 12 icon custom (tên component đề xuất)
| # | Khái niệm | Component | Ghi chú hình |
|---|---|---|---|
| 1 | Hook / móc chân | `BjjHook` | hook nhỏ + gót chân |
| 2 | Grip / khoá tay | `BjjGrip` | 2 bàn tay nắm vào cổ tay |
| 3 | Siết cổ (choke) | `BjjChoke` | cẳng tay ngang cổ |
| 4 | Leg lock / đường gối | `BjjLegLock` | chân khoá, khuỷu vào gối |
| 5 | Ghim & Mount | `BjjMount` | thân trên đè, khối mount |
| 6 | Thoát hiểm (escape/bridge) | `BjjEscape` | cầu hông (bridge) + mũi tên thoát |
| 7 | Vật & takedown | `BjjTakedown` | hai dáng người, một người hạ thấp |
| 8 | Back take / kiểm soát lưng | `BjjBackTake` | mũi tên vòng ra sau lưng |
| 9 | Guard | `BjjGuard` | hai chân vòng từ dưới |
| 10 | Chuỗi submission (chain/dilemma) | `BjjChain` | 2–3 mắt xích + mũi tên |
| 11 | An toàn & tap | `BjjTap` | bàn tay vỗ + ký hiệu an toàn |
| 12 | Khung chặn (frame) | `BjjFrame` | hai cẳng tay dựng khung |

### 11.3 Icon hub mới (thay lucide)
| Hub | Cũ | Mới |
|---|---|---|
| `learn` | `Compass` | `BjjGuard` (học nền tảng) |
| `study` | `Zap` | `BjjChain` (chuỗi kỹ thuật) |
| `defense`/`fix` | `Wrench` | `BjjEscape` (đúng "defense") |
| `build` | `Layers3` | `BjjMount` (xây/kiểm soát) |
| `reference` | `BookOpen` | `BjjGrip` (tra cứu) |
| brand | `BrainCircuit` | *Đề xuất:* custom mark hình học từ logo, hoặc giữ `BrainCircuit`. **Cần bạn chốt** (§18.2) |

### 11.4 Chuẩn vẽ (bắt buộc, để pha được với lucide)
- `viewBox="0 0 24 24"`, `width/height` = `1em` (hoặc prop `size`)
- `fill="none"`, `stroke="currentColor"`, **`stroke-width={2}`** (brand mark dùng 2.4 vì chữ N ở 2px bị bít bộ đếm ở 16px — xem §26.1), `stroke-linecap="round"`, `stroke-linejoin="round"`
- `aria-hidden="true"`, `focusable="false"`
- Chỉ dùng path trong **lưới 24×24, safe-area ~2px**; không gradient, không fill đặc (trừ khi có biến thể `filled` riêng)
- Optional: prop `strokeWidth` để có biến thể 1.75/2.25 khi cần

### 11.5 API & cấu trúc file
```
src/components/icons/bjj/
  paths.ts        # map name -> JSX path elements (hoặc path d strings)
  BjjIcon.tsx     # <BjjIcon name="choke" size={18} className="…" />
  index.ts        # export named components (BjjChoke, …) + type BjjIconName
public/icons/bjj-sprite.svg   # <symbol id="bjj-choke"> … cho PWA/share/preview
scripts/…        # script đồng bộ sprite từ paths.ts (tránh lệch nét giữa 2 bản)
```
- UI dùng **component**; sprite phục vụ PWA/share/preview (và có thể dùng `<use href="/icons/bjj-sprite.svg#bjj-choke">`).
- **Nguồn sự thật duy nhất**: `paths.ts` → script generate sprite, để component và sprite không lệch.

### 11.6 Nơi cần thay icon (bản đồ áp dụng)
- `navItems.ts` (hub icons + `brandIcon`)
- `SkillDetailPage.tsx` `TabIcons` (đang có `accent: 'violet'` — thay)
- Positions / Concepts / Skills cards, Defensive Layers, Safety/tap UI
- Bất kỳ chỗ nào đang dùng `Sword`, `Shield*`, `Target`, `Flag`, `Dice5`, `GitFork`, `Network` để chỉ khái niệm BJJ → đổi sang custom nếu ngữ nghĩa khớp

---

## 12. Light mode (theo hệ thống, có công tắc ghi đè)

- **Bộ token light đầy đủ** cho `:root` **và từng `[data-hub]`**, đặt dưới `:root[data-theme="light"]`.
- `data-theme` trên `<html>` do `src/utils/theme.ts` giải từ preference đã lưu; `index.html` chạy lại đúng phép giải đó **trước lần vẽ đầu** nên không nháy. `color-scheme` đi theo attribute (native controls khớp app), không theo OS.
- Có UI: Settings → **Giao diện** (`ThemeSwitcher`) với 3 lựa chọn **Theo hệ thống / Sáng / Tối**, lưu cùng `nogi_settings`. **Mặc định `light`** ⇒ cài mới mở ra là nền kem. State lưu đã lên `version: 1`; `migrate` trong store và script trong `index.html` đổi `system` phiên bản 0 (mặc định cũ) thành `light` **một lần**, còn `system`/`dark` ghi ở v1 thì giữ nguyên.
- **Không** dùng `@media (prefers-color-scheme: light)` cho token: media query sẽ thắng lựa chọn trong app.
- **Dark mode được nâng sáng**: nền `#1a1814` → card `#2f2b24` (than ấm, không còn đen gần tuyệt đối `#0d0c0a`). Đổi ở `src/index.css` (`--color-warm-700…950`) và `src/styles/hallmark-themes.css` (`--hallmark-bg-*`) **theo cặp**, rồi chạy lại `npm run validate:contrast`.

Đề xuất token light (đã đo):
| Token | Hex | Trên `#f7f5f1` | Trên `#ffffff` |
|---|---|---|---|
| `--bg-primary` | `#f7f5f1` | — | — |
| `--bg-card` | `#ffffff` | — | — |
| `--text-primary` | `#1b1917` | 16.10 ✅ | 17.53 ✅ |
| `--text-secondary` | `#4a453d` | 8.73 ✅ | 9.50 ✅ |
| `--text-tertiary` | `#6b6459` | 5.37 ✅ | 5.85 ✅ |
| accent `learn` | `#8a5a12` | 5.43 ✅ | 5.91 ✅ |
| accent `study` | `#0f6b5f` | 5.86 ✅ | 6.39 ✅ |
| accent `defense` | `#a63f1c` | 5.76 ✅ | 6.27 ✅ |
| accent `build` | `#2f5da8` | 5.93 ✅ | 6.46 ✅ |
| accent `reference` | `#4a463f` | 8.61 ✅ | 9.38 ✅ |
| navy logo trên kem | `#0d2648` / `#f0efea` | 13.14 ✅ | 15.13 ✅ |

Lưu ý light mode: cần rà lại **toàn bộ gradient/shadow/glass** đang giả định nền tối (`--hallmark-hero-gradient`, `--hallmark-glass-bg`, `--shadow-*`, glow). Nên tách thành cặp token `--shadow-*` cho light.

---

## 13. Accessibility & nav

- Mục tiêu: **WCAG AA 4.5:1** text thường; **3:1** cho UI/border/icon lớn.
- **Nav không active**: "tăng rõ nhưng vẫn thua mục active" → đề xuất nav inactive dùng `--text-secondary` (`#cfc9bd`, 10.75:1) + icon cùng màu; **active** = accent hub + nền `--accent-dim` + chữ `--text-accent`. Như vậy inactive *sáng hơn hiện tại* nhưng vẫn dưới active (accent + nền + weight).
- Không dựa vào màu đơn thuần (thêm icon/nhãn/`aria-*`).
- `focus-visible` giữ `outline: 2px` + `--hallmark-focus-ring`; rà lại offset trên nền mới.
- Chưa làm hỗ trợ forced-colors / high-contrast của OS (#19).

---

## 14. Kế hoạch triển khai (một PR lớn)

**Phase 1 — Token & palette**
1. Sửa `src/styles/hallmark-themes.css`: `:root` + 5 hub (dark) + light theo media query.
2. Sửa `src/index.css` `@theme`: `--color-ink-*`, `--color-dojo-*`, `--color-hub-*`, `--color-hallmark-*`, shadow, `color-scheme`.
3. Thay class hard-code còn sót: `text-slate-500/600/400` (**66 + 9 + 83 chỗ**), `sky-*`, `cyan-*`, `rose-*`, `amber-*` → token.

**Phase 2 — Icon**
4. Thêm `src/components/icons/bjj/*` (12 icon) + sprite + script generate.
5. Cập nhật `navItems.ts` (hub icons, `brandIcon`), tab icons, các card/khái niệm BJJ.

**Phase 3 — Typography & fix bug**
6. Đổi `--font-display` (+ self-host qua `@fontsource`), rà `h1`–`h6`.
7. **Fix `defense` vs `fix`**: thống nhất ID, bỏ `as HubId` cast, đồng bộ CSS + type + navItems.
8. Dải "With gratitude" theo §9.

**Phase 4 — Kiểm chứng**
9. `scripts/validate-contrast.ts` + npm script `validate:contrast` (§15).
10. Rà mắt ở 375px và 1280px, light + dark.

---

## 15. Kiểm chứng tự động (bắt buộc theo #20)

### 15.1 Script tương phản
- `scripts/validate-contrast.ts`, chạy bằng `tsx` (đã có trong devDeps), thêm `"validate:contrast": "tsx scripts/validate-contrast.ts"`.
- **Nguồn dữ liệu**: `src/styles/palette.json` (hoặc parse trực tiếp CSS) khai báo mọi cặp `{fg, bg, min}`.
- Thuật toán: WCAG 2.x relative luminance + `(L1+0.05)/(L2+0.05)`.
- Ngưỡng: text ≥ **4.5**, UI/large ≥ **3.0**; fail → **exit 1** và in bảng lỗi.
- Bảng cần phủ: 3 mức text × (bg-primary, surface, card, elevated) × (dark, light) + 5 accent × (bg, card) × (dark, light) + 4 semantic + chữ trên nền accent-fill + nav inactive/active + chip Guardian.

### 15.2 Gate chạy sau khi sửa (theo thứ tự)
```
npm run typecheck && npm run lint && npm test && npm run build && npm run validate:contrast
```
- Baseline hiện tại: typecheck 0 · lint 0 · test **369/369** · build 0.
- Lưu ý: `DashboardPage.test.tsx` render qua jsdom — nếu đổi class/text trong Dashboard phải chạy lại `npm test`.
- **Verify bằng mắt** (không thể tự động): 375px & 1280px, dark & light — đặc biệt nav inactive vs active, dải Guardian, icon custom ở 16/18/20px.

---

## 16. Acceptance criteria

1. **Không còn** token text nào < 4.5:1 trên nền thực tế của nó (dark **và** light); `validate:contrast` exit 0.
2. Tertiary text tăng từ **4.21:1** lên ≥ **6.9:1**.
3. Không còn màu **tím/violet**, **cyan neon**, **hồng**, **đỏ tươi** trong token accent/semantic/nav.
4. `#a78bfa` (violet) và `#22d3ee` (cyan neon) **không còn xuất hiện** trong `src/`.
5. 12 icon BJJ tồn tại dưới dạng component **và** có mặt trong sprite; render đúng ở 16/18/20px với `stroke-width=2`, `currentColor`.
6. Hub icons dùng icon custom; lucide vẫn dùng cho tiện ích; **không thêm dependency icon nào** (`package.json` dependencies không đổi về icon).
7. **5 theme `[data-hub]` hoạt động**; bug `defense`/`fix` đã sửa và có **test** cho việc `data-hub` khớp route `/defense`.
8. Light mode áp cho **cả 6 bối cảnh** (`:root` + 5 hub) khi chọn **Sáng**, và khi OS đặt light ở chế độ Theo hệ thống — đã đo trên CSS đã build trong Chrome thật (`prefers-color-scheme` vẫn dark mà nền vẫn sáng).
9. Logo không đổi (`#f0efea` trên `#0d2648`); **không file asset nào bị sửa** (favicon/PWA/OG/manifest).
10. `typecheck` 0 · `lint` 0 · `test` 369/369 (hoặc nhiều hơn nếu thêm test mới) · `build` 0.
11. Mặt display mới đã áp dụng và self-host (không thêm request tới Google Fonts cho font mới).

---

## 17. Non-goals (không làm lần này)

- Không đổi asset thương hiệu (favicon, PWA icon, OG/Twitter card).
- Không làm hỗ trợ `forced-colors` / high-contrast của OS.
- Không thêm toggle theme trong Settings.
- Không đổi bố cục/route/i18n/dữ liệu.
- Không thay Inter ở body (trừ khi bạn đổi ý).
- Không tối ưu bundle size như mục tiêu (ưu tiên đẹp; xem §18.3).

---

## 18. Rủi ro & câu hỏi mở

### 18.1 Xung đột "amber–rose" vs "không hồng/tím" *(cần chốt)*
Bạn chọn giữ tông **amber–rose** cho dải cảm ơn *và* cấm **hồng**. `rose` là hồng-đỏ.
→ Mặc định trong spec: thay `rose` bằng **copper `#e07a4e`**. Nếu bạn muốn giữ `rose` thật, nó sẽ là **ngoại lệ duy nhất** và mình sẽ comment lý do trong code.

### 18.2 Brand mark *(cần chốt)*
`brandIcon = BrainCircuit` (lucide) — giữ hay thay bằng mark custom lấy từ hình học logo? Nếu thay, cần 1 lượt thiết kế nữa.

### 18.3 Bundle size *(đã chấp nhận nặng hơn)*
Custom icon tăng nhẹ (12 SVG inline ~ vài KB) + font display mới (~30–80KB woff2 variable). Bạn đã chọn "ưu tiên đẹp, chấp nhận nặng hơn" → không tối ưu, nhưng nên **self-host** font để không chặn render.

### 18.4 Số điểm sửa màu rất lớn
`text-slate-500/600/400` = **158 chỗ** trên nhiều file. Đổi hết là diff lớn, dễ sót. Đề xuất: **codemod/script sed theo bảng ánh xạ** + rà bằng grep sau cùng, thay vì sửa tay.

### 18.5 Light mode cho gradient/glass/shadow
Toàn bộ gradient và shadow hiện giả định nền tối. Light mode **cần bộ token riêng** cho `--hallmark-hero-gradient`, `--hallmark-glass-bg`, `--shadow-*`. Đây là phần dễ xấu nhất trong light.

### 18.6 `JetBrains Mono`
`--font-mono` tham chiếu JetBrains Mono nhưng chưa thấy cài/vendored → có thể đang fallback. Nên chốt: bỏ, hay self-host?

### 18.7 Icon "accent: 'violet'" trong code
`SkillDetailPage.tsx:148` gán `accent: 'violet'` — cần map sang slot mới (đề xuất `defense`/copper).

---

## 19. Danh mục file dự kiến chạm

| File | Việc |
|---|---|
| `src/styles/hallmark-themes.css` | Toàn bộ token dark + light |
| `src/index.css` | `@theme` colors, shadow, `color-scheme`, heading font |
| `src/components/icons/bjj/*` **(mới)** | 12 icon + API |
| `public/icons/bjj-sprite.svg` **(mới)** | Sprite |
| `scripts/validate-contrast.ts` **(mới)** | Kiểm tra tương phản |
| `src/styles/palette.json` **(mới, đề xuất)** | Nguồn dữ liệu màu cho script |
| `src/components/layout/navItems.ts` | Hub icons + brand + fix `defense`/`fix` |
| `src/contexts/HubThemeContext.ts` | `HubId` thống nhất; `HubThemeProvider.tsx` bỏ cast |
| `src/pages/DashboardPage.tsx` | Dải Guardian, class màu |
| `src/components/dashboard/*`, `layout/*`, `skill/*`, `skills/*`, `video/*` | Thay class màu/icon |
| `src/pages/*.tsx` (~15 file) | Thay `text-slate-*`, icon |
| `package.json` | Thêm `validate:contrast`, `@fontsource/<display>` (nếu chọn self-host) |

---

# PHẦN 2 — Chốt cuối & kết quả thực thi (đã làm xong)

## 20. Bốn quyết định cuối

| Điểm treo | Chốt |
|---|---|
| Mặt display (§10) | **Archivo** + `font-stretch` (biến thể Expanded) — self-host qua `@fontsource-variable/archivo/wdth.css` |
| Guardian "amber–rose" (§18.1) | **Thay `rose` bằng copper `#e07a4e`** → hết xung đột với ràng buộc "không hồng" |
| Brand mark (§18.2) | **Custom mark** (`BjjBrandMark`) — chữ **N monogram đậm** (xem §26: khung bo góc + N không đọc được ở 16px nên đã bỏ khung) |
| Phạm vi (§18.4) | **Toàn bộ theo spec, một PR lớn** |

## 21. Bảng màu đã chốt (7 tone + 1 neutral)

`warm` (than ấm) · `gold` `#e8b05c` · `copper` `#e07a4e` · `moss` `#a9b45f` · `jade` `#3ec9b6` · `sea` `#58aec4` · `steel` `#7fa9e0` · `sand` `#b0a99b`

Mỗi tone có thang 50–950 (sinh bằng OKLCH, không có neon / hồng / tím / đỏ tươi). Gán hub: learn→gold, study→jade, defense→copper, build→steel, reference→sand, Dashboard→sand.

Ánh xạ hue cũ → tone mới: `slate→warm`, `cyan|amber→gold`, `emerald→jade`, `teal|sky→sea`, `violet|indigo|blue→steel`, `purple|green→moss`, `rose|red|pink|orange→copper`. Text của accent dùng **token ngữ nghĩa** `text-<tone>`; ink trên nền accent dùng `text-on-accent` (đen ở dark, trắng ở light).

## 22. Đã giao (deliverables)

| Hạng mục | Kết quả |
|---|---|
| Đổi class màu | **1099 chỗ** trên hơn 50 file (kể cả `rose` và `border-t/*` bị sót ở lượt đầu rồi đổi nốt), 0 tàn dư hue cũ trong `src/` |
| Token | `src/index.css` (`@theme`) + `src/styles/hallmark-themes.css` viết lại; **6 bối cảnh** (`:root` + 5 hub) × 2 mode |
| Light mode | Theo hệ thống mặc định, ghi đè bằng `html[data-theme="light"]`; ghi đè chính các biến `--color-*` nên không cần sửa component nào |
| Icon | **13 glyph custom** (`src/components/icons/bjj/`) + `public/icons/bjj-sprite.svg` sinh từ cùng dữ liệu; lucide giữ cho tiện ích; **không thêm dependency icon** |
| Icon hub | learn→`BjjGuard`, study→`BjjChain`, defense→`BjjEscape`, build→`BjjMount`, reference→`BjjGrip`; brand→`BjjBrandMark` |
| Typography | Archivo (wght + wdth) self-host; body vẫn Inter; bỏ `@fontsource/fraunces` |
| Bug `defense`/`fix` | Đã sửa: `HubId` là nguồn sự thật, bỏ cast `as HubId`, CSS có `[data-hub="defense"]`, **có test khoá lại** |
| Kiểm tra tự động | `npm run validate:contrast` + `npm run gen:bjj-sprite` |

## 23. Bằng chứng kiểm chứng (đo sau khi sửa)

| Gate | Kết quả |
|---|---|
| `npm run typecheck` | 0 lỗi |
| `npm run lint` | 0 lỗi |
| `npm test` | **446/446** (377 ở lượt đầu + 69 test hình học icon ở §26) |
| `npm run build` | OK (2.1s) |
| `npm run validate:contrast` | **✓ tất cả cặp đạt WCAG AA** ở cả dark và light; 168 token; 43 scale + 8 semantic token được tham chiếu đều tồn tại; 0 tàn dư hue cũ |
| Tương phản chủ chốt | tertiary cũ `#64748b` = **4.21:1 (fail)** → `#a9a191` = **7.63:1**; warm-600 = 5.80:1 trên nền trang |
| CSS đã build | `.text-warm-500{color:var(--color-warm-500)}` → ghi đè light mode chạy được; **0 utility hue cũ**, 0 `#a78bfa`/`#22d3ee` |
| Sprite | 13 symbol, sinh lại từ `paths.ts` không đổi (không lệch nguồn) |

## 24. Giới hạn còn lại

- **Chưa kiểm tra bằng mắt trên trình duyệt**: chỉ render qua jsdom + đọc CSS đã build. Cần liếc ở ~375px và ~1280px, **cả dark và light**, đặc biệt: nav không active vs active và dải Guardian. Nét 13 icon BJJ đã được đo ở 16px (§26) nhưng vẫn nên liếc thật ở 16/18/20px.
- `warm-700` được dùng làm `--hallmark-bg-elevated` — đây là bề mặt sáng nhất trong dark mode; nếu thấy popover quá sáng thì hạ xuống một nấc.
- Màu in (`@media print`) dùng giấy trắng nên giữ tông riêng, chỉ đổi sang giá trị ấm cho khớp.
- Markdown ở repo root đã bị loại khỏi quét source của Tailwind (`@source not "../*.md"`) để tài liệu không kéo utility cũ vào bundle.

## 25. Việc nên làm tiếp

1. Rà mắt 2 mode (đặc biệt light mode chưa từng tồn tại trước đây).
2. ~~Nhìn kỹ 13 icon và tinh chỉnh `paths.ts`~~ — **đã làm ở §26** (đo ở 16px, sửa hình học, khoá bằng `bjjIcons.test.ts`).
3. Cân nhắc `forced-colors` / tương phản cao của OS (đã để ngoài phạm vi).

---

## 26. Lượt tinh chỉnh độ đọc của icon ở 16px (đã làm)

Sidebar render glyph hub ở `h-4 w-4` = **16px**, nên đây là cỡ quyết định. Thay vì "nhìn rồi đoán", mỗi glyph được **rasterize đúng như trình duyệt vẽ** (viewBox 24 → 16px, stroke 2u thành capsule bo tròn, lấy mẫu 0.25u) và đo:

| Số đo | Nghĩa |
|---|---|
| `cover` | % pixel 16×16 có ≥50% mực |
| `fringe` | pixel chỉ 25–50% mực — vệt nhoè làm nét trông mờ |
| `blobs` | số mảng mực rời nhau (1 mảng + 0 lỗ = một cục đặc) |
| `lost` | khe hở có trong hình học nhưng biến mất ở 16px |
| `minGap` | khe nhỏ nhất giữa **hai element khác nhau**, tính bằng pixel ở 16px |

Một `d` string = **một element** (mũi tên có 3 subpath vẫn là một chi), nên gai mũi tên không bị tính là chạm nhau.

### 26.1 Đã sửa gì

- **Luật lưới 16px**: stroke 2u = 1.33px, nên tâm nét nằm ở bội **lẻ của 0.75** → 1 pixel sắc; ở bội **của 1.5** → 2 pixel sắc. Đặt sai (ví dụ `y=19`) thì nét tràn nửa pixel sang hàng bên cạnh → nhoè. Đường thảm (mat) chuyển về `18.75`; chi người về `x.25`/`x.75`.
- **Brand mark**: khung bo góc 15 đơn vị ở 16px chỉ còn **5 mảng mực** (4 cạnh bị vỡ ở góc vì pixel <50%) và bộ đếm của chữ N bị bít. Bỏ khung, giữ **N monogram đậm** (stroke 2.4): còn **1 mảng, 0 pixel nhoè**, là hình khối liền mạch.
- **Cặp nét bị "lửng"**: `backTake` (mũi tên sát đầu → 0.57px, ngay ranh giới dính), `escape` (mũi tên dính vào cầu), `choke` (cẳng tay sát đầu 1.05px), `backTake` (thân không nối hông). Nay mọi cặp element hoặc **dính có chủ ý (≤2.0u)** hoặc **tách rõ (≥2.5u)** — không còn cặp nào trong vùng chết.
- **`legLock`**: cánh tay cũ là một cung thoải, ở 16px vỡ thành 2 đoạn gạch. Đổi thành **bracket** (2 đoạn thẳng 2.5u + cung dọc) → khối rõ, độ phủ 8.1% → 10.4%.
- **Luật "không đoạn thẳng nào < 2.5u (≈1.7px)"** giờ đúng cho cả 13 glyph (2 vấu bracket của `legLock` được kéo từ 1.5u lên 2.5u).

### 26.2 Kết quả đo

| Chỉ số | Trước | Sau |
|---|---|---|
| Tổng pixel nhoè (`fringe`) trên 13 icon | 159 | **93** (−41%) |
| Icon còn cờ cảnh báo | 1 (`backTake` TIGHT) | **0** |
| Cặp element trong vùng chết 2.0–2.5u | 1 | **0** |
| `brand` (blobs / fringe) | 5 / 8 | **1 / 0** |

### 26.3 Khoá lại bằng test

`src/components/icons/bjj/bjjIcons.test.tsx` (69 test) kiểm tra trực tiếp các luật vẽ đã ghi ở đầu `paths.ts`: safe area 2–22, chỉ line/cubic (cấm cung `A`), độ dài đoạn thẳng ≥2.5u, khoảng cách element (dính ≤2.0u hoặc tách ≥2.5u), bán kính đầu ≥2, stroke 2–2.8, nhãn không trùng, và **sprite khớp từng chữ với dữ liệu** (sửa `paths.ts` mà quên `npm run gen:bjj-sprite` là test đỏ).

**Giới hạn của phép đo**: đây là mô hình hình học — không tính hinting/subpixel của từng hệ điều hành, và `fringe`/`cover` chỉ là chỉ số thay thế cho "nhìn thấy rõ". Vẫn nên liếc icon thật ở 16/18/20px.

