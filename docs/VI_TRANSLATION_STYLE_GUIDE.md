# Vietnamese Translation Style Guide & Glossary

> **Mục tiêu:** NoGi Mind hiển thị thuần Việt, nhưng vẫn nói đúng ngôn ngữ BJJ no-gi.
> Người mới hiểu được. Người tập lâu thấy tự nhiên, không "dịch sách giáo khoa".

---

## Mục lục

1. [Tone of Voice](#1-tone-of-voice)
2. [Triết lý dịch](#2-triết-lý-dịch)
3. [Phân loại thuật ngữ](#3-phân-loại-thuật-ngữ)
4. [Bảng mapping thuật ngữ chuẩn](#4-bảng-mapping-thuật-ngữ-chuẩn)
5. [Quy tắc viết](#5-quy-tắc-viết)
6. [Các section của vi.ts: hướng dẫn theo nhóm](#6-các-section-của-vits-hướng-dẫn-theo-nhóm)
7. [Data layer: cách viết content kiểu BJJ tiếng Việt](#7-data-layer-cách-viết-content-kiểu-bjj-tiếng-việt)
8. [Những lỗi thường gặp](#8-những-lỗi-thường-gặp)
9. [Checklist khi review bản dịch](#9-checklist-khi-review-bản-dịch)
10. [Phụ lục: Quick Reference Card](#10-phụ-lục-quick-reference-card)
11. [Chưa chốt (TBD)](#11-chưa-chốt-tbd)

---

## 1. Tone of Voice

### Nguyên tắc chính

**Viết như một coach đang chỉ trên thảm.** Ngắn, trực diện, chỉ đúng bộ phận cơ thể và hướng di chuyển.

### Ví dụ tốt

| Câu | Tại sao tốt |
|---|---|
| "Tay phải kéo cổ tay trái đối thủ qua centerline." | Chỉ rõ tay nào, kéo gì, đi đâu |
| "Ngực drive chéo về hông xa." | Có điểm tiếp xúc + hướng + mục tiêu |
| "Khuỷu tay siết nằm dưới cằm đối thủ trước khi siết." | Có vị trí trước khi hành động |
| "Giấu heel trước khi xoay." | Ngắn, chỉ 2 bước, đúng thứ tự |
| "Dựng frame ở cổ trước, rồi mới mở hông." | Có thứ tự hành động |

### Ví dụ cần tránh

| Câu | Vấn đề |
|---|---|
| "Kiểm soát tay đối thủ." | Mơ hồ — tay nào? kiểm soát kiểu gì? |
| "Đặt chân lên hông." | Thiếu bên, thiếu mục đích |
| "Tạo áp lực." | Áp lực vào đâu? hướng nào? |
| "Kết thúc đòn siết." | Không nói cần làm gì trước khi kết thúc |

### Nguyên tắc viết

- **Mỗi câu một hành động.** Nếu có nhiều step, đánh số hoặc xuống dòng.
- **`bộ phận của tôi` → `hành động` → `bộ phận của đối thủ` → `hướng/đích`**.
- **"Rồi mới" là cấu trúc tốt** để chỉ thứ tự không thể đảo.
- **"Trước khi" cũng tốt** để chỉ precondition.
- **Độ dài: 5–12 từ cho một coaching cue.** Trên 20 từ là quá dài cho đọc lúc tập.

---

## 2. Triết lý dịch

### a) Không dịch "từ bằng mọi giá"

BJJ no-gi có từ vựng riêng mà người tập dùng hằng ngày:

- Dịch "heel hook" thành "móc gót" → không ai nói vậy
- Giữ "heel hook" → mọi người hiểu
- Nhưng viết cả câu xung quanh phải là tiếng Việt

**Nguyên tắc: Giải thích bằng tiếng Việt, giữ thuật ngữ chuyên môn bằng tiếng Anh nếu nó là từ nghề.**

### b) Không dùng gloss `(English)` làm mặc định

`getLocalizedTechnicalText()` hiện thêm `(English)` vào tự động. Đây là phương án migration, không phải đích đến.

- Mặc định hiển thị: **chỉ tiếng Việt**
- English alias: chỉ ở **Glossary page**, **tooltip**, **search index**
- Setting `Hiện thuật ngữ gốc` có thể bật/tắt

### c) Nhất quán trước hết

Một khái niệm — một bản dịch. Không lúc thì "finish", lúc thì "kết thúc", lúc thì "siết kết thúc" trừ khi có chủ đích.

### d) Phân biệt UI label vs coaching content

| Loại | Dịch | Ví dụ |
|---|---|---|
| UI label (nav, button, heading) | Luôn dịch thuần Việt | "Skill Map" → "Bản đồ kỹ năng" |
| Coaching short text | Việt + thuật ngữ giữ | "Giữ knee line trước khi clear" |
| Deep explanation | Việt hoàn toàn, có thể giữ proper noun | "K-Guard là guard mở dùng shin để kiểm soát knee line" |

---

## 3. Phân loại thuật ngữ

### Loại A: Giữ nguyên tiếng Anh (proper nouns / tên hệ / tên đòn)

**Không dịch.** Những từ này là tên riêng của kỹ thuật hoặc hệ thống.

| Thuật ngữ | Lý do giữ |
|---|---|
| K-Guard | Tên hệ guard — dịch mất bản chất |
| Matrix | Tên hệ chuyển tiếp |
| False Reap | Tên hệ leg entanglement |
| Octopus Guard | Tên hệ guard |
| Crab Ride | Tên hệ ride |
| Wrist Ride | Tên hệ ride |
| S-Mount | Tên vị trí |
| Smother | Tên hệ attack |
| Wrestle-Up | Tên kỹ thuật |
| Front Headlock | Tên vị trí |
| Turtle | Tên vị trí |
| Heel Hook | Tên submission |
| Kimura | Tên khóa |
| Guillotine | Tên choke |
| Arm Triangle / D'arce / Anaconda | Tên choke |
| RNC (Rear Naked Choke) | Tên choke |
| Omoplata | Tên khóa |
| Banana Split | Tên khóa |
| Estima Lock | Tên khóa |
| Ashi Garami | Tên leg entanglement (Nhật) |
| Saddle / 411 | Tên leg entanglement |
| Cross Ashi / Reap | Tên leg entanglement |
| Truck / Twister | Tên hệ |

> **Lưu ý:** Những từ này được GIỮ khi đứng một mình làm danh từ.
> Khi đứng trong câu giải thích, nguyên tắc là viết: "K-Guard dùng shin để kiểm soát knee line."

### Loại B: Dịch sang tiếng Việt (UI labels / coaching verbs / khái niệm sư phạm)

**Luôn dịch.** Đây là từ ngữ giao diện và ngôn ngữ dạy học.

| English | Vietnamese chuẩn |
|---|---|
| body mechanics | cơ học cơ thể |
| control | kiểm soát |
| finish (verb) | kết thúc / siết kết thúc |
| entry | đường vào / vào thế |
| escape (noun) | thoát / đường thoát |
| defense | phòng thủ |
| safety | an toàn |
| pressure | áp lực |
| alignment | căn chỉnh trục |
| isolation / isolate | cô lập |
| connection point | điểm kết nối |
| danger signal | tín hiệu nguy hiểm |
| next step | bước tiếp theo |
| reaction branch | nhánh phản ứng |
| checklist | danh sách kiểm tra / checklist |
| troubleshooting | xử lý lỗi / chẩn đoán |
| quality check | kiểm tra chất lượng |
| drill | bài tập / drill |
| prerequisite | điều kiện trước |
| overview | tổng quan |
| philosophy | triết lý |

### Loại C: Lai chuyên môn (từ nghề nên giữ hoặc hybrid)

**Linh hoạt — tuỳ ngữ cảnh, nhưng phải nhất quán.**

Những từ này thuộc vùng xám: người tập BJJ Việt Nam dùng cả tiếng Anh lẫn tiếng Việt.

| Thuật ngữ | Khuyến nghị | Ghi chú |
|---|---|---|
| frame | khung chặn (hoặc giữ "frame") | Có thể dùng "khung chặn" nếu câu đang giảng giải |
| underhook | underhook | Không ai nói "móc dưới" |
| overhook | overhook | Không ai nói "móc trên" |
| hand fight | đấu tay | OK nếu câu có "đấu tay trước khi vào đòn" |
| inside position | vị trí trong | Người tập hiểu "inside position" cũng được |
| scramble | tranh chấp / scramble | Nên giữ "scramble" hoặc "tranh chấp" |
| clamp | kẹp | Dịch được |
| wedge | nêm | Dịch được |
| hook | móc | Dịch được (VD: móc hông = hip hook) |
| post | trụ | "post tay xuống sàn" |
| base | base / nền | "mất base" là phrase quen |
| knee line | đường gối / knee line | Giải thích "đường gối (knee line)" lần đầu |
| hip line | đường hông / hip line | Giải thích lần đầu |
| shoulder line | đường vai / shoulder line | Giải thích lần đầu |
| centerline | centerline | Thường dùng tiếng Anh |
| slack | độ dư / slack | "Xóa slack trước khi siết" |
| grip | grip / nắm | "Grip cổ tay" hoặc "nắm cổ tay" |
| grip fight | đấu grip | OK |
| chin strap | chin strap | Không dịch |
| peek-out | peek-out | Tên kỹ thuật |
| sit-out | sit-out / ngồi ra | |
| re-guard | vào lại guard | OK |
| hip escape | hip escape / dịch hông | "hip escape" quen thuộc hơn |
| bridge | cầu / bridge | |
| shrimp | tôm / shrimp | Cả hai đều dùng |
| granby | granby roll | Tên kỹ thuật |
| berimbolo | berimbolo | Tên kỹ thuật |
| pummel | pummel / luồn tay | |

> **Nguyên tắc cho nhóm này:** Nếu từ đó xuất hiện lần đầu trong một page, có thể để gloss ở tooltip/glossary.
> Trong câu: "Thắng underhook rồi mới đứng dậy." — câu xung quanh là Việt, giữ underhook.

---

## 4. Bảng mapping thuật ngữ chuẩn

> Đây là **canonical mapping** cho tất cả recurring terms trong NoGi Mind.
> Mỗi lần dịch, tra bảng này trước.

### i18n UI labels (resource keys)

| English (en.ts) | Vietnamese (vi.ts) |
|---|---|
| Dashboard | Tổng Quan |
| Study | Học Skills |
| Fix | Sửa lỗi |
| Map / Map Mode | Bản đồ |
| Reference / Reference Mode | Tra cứu |
| Learn | Lộ trình |
| Skill Map | Bản đồ kỹ năng |
| Concepts | Khái niệm |
| Positions | Vị trí |
| Troubleshooter | Xử lý lỗi |
| Escape Maps | Thoát đòn |
| Archetypes | Kiểu game |
| Mastery Map | Trưởng thành |
| Defense / Safety | An toàn |
| Glossary | Thuật ngữ |
| Search | Tìm kiếm |
| Settings | Cài Đặt |
| About / Philosophy | Triết lý |
| Build | Xây Game |
| Loading | Đang tải... |
| Filters | Bộ lọc |
| Clear / Reset | Xóa lọc / Đặt lại |
| Export / Import | Xuất / Nhập |
| Save | Lưu |
| Delete / Remove | Xóa / Gỡ |
| Add | Thêm |
| All | Tất cả |
| None | Không có |
| Open | Mở |
| Close | Đóng |
| Yes / No | Có / Không |
| Next | Tiếp theo |
| Previous | Trước |

### Domain labels

| English | Vietnamese |
|---|---|
| Positional Awareness | Nhận thức vị trí |
| Survival & Defense | Sinh tồn & phòng thủ |
| Escapes | Thoát vị trí |
| Guard Retention | Giữ guard |
| Guard Offense | Tấn công từ guard |
| Wrestle-Up & Wrestling | Wrestle-up & wrestling |
| Passing | Passing |
| Pins & Rides | Pin & ride |
| Back Control | Kiểm soát lưng |
| Submission Systems | Hệ thống submission |

### Level labels

| English | Vietnamese |
|---|---|
| Beginner | Cơ bản |
| Intermediate | Trung cấp |
| Advanced | Nâng cao |

### Mechanics section

| English | Vietnamese |
|---|---|
| Body Mechanics | Cơ học cơ thể |
| Overview | Tổng quan |
| Global Principles | Nguyên tắc toàn hệ |
| Phases | Giai đoạn |
| Body Part Instructions | Chỉ dẫn theo body part |
| Connection Points | Điểm kết nối |
| Directional Cues | Chỉ dẫn hướng |
| Checkpoints | Điểm kiểm soát |
| Danger Signals | Tín hiệu nguy hiểm |
| Success Signals | Tín hiệu đúng |
| Common Mechanical Errors | Lỗi mechanics thường gặp |
| Correction Cues | Chỉ dẫn sửa lỗi |
| Safety Notes | Ghi chú an toàn |
| Non-negotiables | Nguyên tắc bắt buộc |
| Top / Bottom Player Goal | Mục tiêu top / bottom player |
| Attacker / Defender Goal | Mục tiêu attacker / defender |
| Why It Matters | Vì sao quan trọng |
| Common Errors | Lỗi thường gặp |
| Pressure Direction | Hướng pressure |
| Purpose | Mục đích |
| Body Part | Bộ phận cơ thể |
| Opponent Part | Phần của đối thủ |
| Objective | Mục tiêu |

### Mechanic Types

| English | Vietnamese |
|---|---|
| Alignment | Căn chỉnh |
| Pressure | Pressure |
| Frame | Khung chặn |
| Wedge | Nêm |
| Hook | Móc |
| Post | Trụ |
| Lever | Đòn bẩy |
| Grip | Grip |
| Inside Position | Vị trí trong |
| Weight Distribution | Phân bổ trọng lượng |
| Mobility | Di chuyển |
| Finishing | Cơ chế finish |
| Escape | Cơ chế thoát |
| Transition | Cơ chế chuyển pha |

### Force Directions

| English | Vietnamese |
|---|---|
| Pull left / right | Kéo sang trái / phải |
| Push left / right | Đẩy sang trái / phải |
| Pull toward you | Kéo về phía mình |
| Push away | Đẩy ra xa |
| Compress down | Ép xuống |
| Lift up | Nâng lên |
| Rotate clockwise | Xoay thuận chiều |
| Rotate counterclockwise | Xoay ngược chiều |
| Drive diagonal | Drive chéo |
| Drive forward / backward | Drive tới / lùi |
| Flare out | Mở rộng ra |
| Pin inward | Ép vào trong |
| Open outward | Mở ra ngoài |
| Close inward | Khép vào trong |
| Circle inside / outside | Di chuyển vòng vào trong / ra ngoài |
| Hide | Giấu |
| Expose | Lộ ra |
| Shelf | Tạo điểm kê |
| Wedge | Nêm |

### Modern System — Family labels

| English | Vietnamese |
|---|---|
| Guard | Guard |
| Passing | Passing |
| Submission | Submission |
| Back Take | Lấy lưng |
| Ride | Ride |
| Wrestling | Wrestling |
| Leg Lock | Leg lock |
| Front Headlock | Front headlock |
| Escape | Escape |
| Pin | Pin |
| Scramble | Scramble |
| Safety | Safety |
| Compression | Compression |
| Ruleset | Ruleset |

> **Lưu ý:** các family label này có thể giữ tiếng Anh vì là phân loại kỹ thuật.
> Nhưng section heading có thể dịch.

### Modern System — Risk labels

| English | Vietnamese |
|---|---|
| Low Risk | Rủi ro thấp |
| Medium Risk | Rủi ro vừa |
| High Risk | Rủi ro cao |
| Safety Critical | Cần an toàn cao |

### Video — Relevance labels

| English | Vietnamese |
|---|---|
| Primary reference | Tham khảo chính |
| Supplemental | Bổ sung |
| Competition example | Ví dụ thi đấu |
| Conceptual | Concept |
| Safety reference | Tham khảo an toàn |

### Video — Level labels

| English | Vietnamese |
|---|---|
| Beginner | Cơ bản |
| Intermediate | Trung cấp |
| Advanced | Nâng cao |
| Blackbelt | Cao cấp |

### Position Categories

| English | Vietnamese |
|---|---|
| Top control | Kiểm soát trên |
| Bottom guard | Guard dưới |
| Pin | Pin |
| Back control | Lấy lưng |
| Turtle | Turtle |
| Front headlock | Front headlock |
| Leg entanglement | Rối chân |
| Scramble | Scramble |
| Submission threat | Đe dọa submission |

### Position Statuses

| English | Vietnamese |
|---|---|
| Dominant | Áp đảo |
| Advantage | Có lợi thế |
| Neutral | Trung lập |
| Defensive | Phòng thủ |
| Dangerous | Nguy hiểm |
| Critical | Nguy cấp |

### Safety Categories

| English | Vietnamese |
|---|---|
| Leg lock | Leg lock |
| Neck | Cổ |
| Spine | Cột sống |
| Shoulder | Vai |
| Knee | Gối |
| Scramble | Scramble |
| Training etiquette | Quy tắc khi tập |
| Tapping | Tap |

### Body Parts (singular)

| English | Vietnamese |
|---|---|
| head | đầu |
| eyes | mắt |
| ear | tai |
| chin | cằm |
| neck | cổ |
| shoulder | vai |
| chest | ngực |
| sternum | xương ức |
| ribs | xương sườn |
| spine | cột sống |
| hip | hông |
| pelvis | khung chậu |
| hand | bàn tay |
| wrist | cổ tay |
| forearm | cẳng tay |
| elbow | khuỷu tay |
| biceps | bắp tay trước |
| triceps | bắp tay sau |
| knee | gối |
| thigh | đùi |
| shin | ống quyển |
| ankle | cổ chân |
| heel | gót |
| toes | ngón chân |
| foot | bàn chân |

### Body Parts (plural / labels)

| English | Vietnamese |
|---|---|
| Head | Đầu |
| Eyes | Mắt |
| Ears | Tai |
| Chin | Cằm |
| Neck | Cổ |
| Shoulders | Vai |
| Chest | Ngực |
| Sternum | Xương ức |
| Ribs | Xương sườn |
| Pelvis | Khung chậu |
| Hands | Bàn tay |
| Wrists | Cổ tay |
| Elbows | Khuỷu |
| Forearms | Cẳng tay |
| Biceps | Bắp tay |
| Knees | Gối |
| Thighs | Đùi |
| Shins | Ống chân |
| Ankles | Cổ chân |
| Heels | Gót |
| Toes | Ngón chân |
| Feet | Bàn chân |
| Hips | Hông |
| Spine | Cột sống |
| Pressure | Áp lực |
| Right hand | Tay phải |
| Left hand | Tay trái |
| Inside leg | Chân trong |
| Outside leg | Chân ngoài |

### Body-to-Body Contact

| English | Vietnamese |
|---|---|
| Contact Map | Bản đồ contact |
| Default orientation | Hướng mặc định |
| Mirror note | Ghi chú đổi bên |
| My | Của tôi |
| Opponent | Đối thủ |
| Action | Cách làm |
| Why it works | Vì sao hiệu quả |
| Avoid | Tránh |
| Correction | Cue sửa |
| Prevents | Chặn được |
| Creates | Tạo ra |

### Training Types

| English | Vietnamese |
|---|---|
| Class | Lớp học |
| Open mat | Open mat |
| Positional sparring | Sparring vị trí |
| Competition | Thi đấu |

### Intensity

| English | Vietnamese |
|---|---|
| Static | Tĩnh |
| Progressive | Tăng dần |
| Positional | Vị trí |
| Live | Live |

### Knowledge Types (search categories)

| English | Vietnamese |
|---|---|
| Skills | Kỹ năng |
| Concepts | Khái niệm |
| Positions | Vị trí |
| Glossary | Thuật ngữ |
| Defense / Safety | Phòng thủ / An toàn |
| Micro Details | Chi tiết vi mô |
| Technique Chain | Chuỗi kỹ thuật |
| Troubleshooters | Xử lý lỗi |
| Escape Maps | Bản đồ thoát |
| Problems | Vấn đề |
| Archetypes | Kiểu game |
| Mastery Map | Bản đồ phát triển kỹ năng |
| Technique Quality Checklist | Kiểm tra chất lượng kỹ thuật |
| Quick Mode | Chế độ nhanh |

### Detail Groups (skill page sections)

| English | Vietnamese |
|---|---|
| Understand | Hiểu |
| Execute | Thực thi |
| Adapt | Thích nghi |
| Finish / Control | Finish / Control |
| Connect | Kết nối |
| Next Step | Bước tiếp theo |

---

## 5. Quy tắc viết

### 5.1 Không `(English)` ở mặc định

**KHÔNG:** "Giữ guard (Guard Retention)" — ồn
**CÓ:** "Giữ guard"

### 5.2 Giữ chữ hoa cho proper noun

**CÓ:** K-Guard, Matrix, S-Mount, Heel Hook
**CÓ:** RNC, D'arce (viết hoa theo convention gốc)
**KHÔNG:** k-guard, matrix

### 5.3 UI label thống nhất

Chọn một từ cho một khái niệm, dùng xuyên suốt:
- "Sửa lỗi" — không lúc "Fix", lúc "Sửa lỗi", lúc "Xử lý vấn đề"
- "Thoát đòn" — không lúc "Escape map", lúc "Thoát"
- "Kiểu game" — không lúc "Archetype", lúc "Kiểu chơi", lúc "Kiểu game"
- "Khái niệm" — không lúc "Concepts", lúc "Khái niệm"

### 5.4 Giới từ và mạo từ

- Dùng "của" khi cần rõ sở hữu: "của tôi", "của đối thủ"
- Có thể lược bỏ nếu đã rõ ngữ cảnh: "Giữ wrist" thay vì "Giữ wrist của đối thủ"
- Nhưng khi viết body-to-body details: **bắt buộc** "Tay phải của tôi" + "cổ tay trái của đối thủ"

### 5.5 Câu điều kiện

Dùng "Nếu... thì..." thống nhất:
- "Nếu đối thủ thoát bằng cách clear hook, thì chuyển sang mount."

### 5.6 Câu mệnh lệnh

Bắt đầu bằng động từ:
- "Giấu heel trước khi xoay."
- "Dựng frame ở cổ."
- "Xóa slack rồi siết."

### 5.7 Viết số thứ tự

- Trong step: "Bước 1", "Bước 2"
- Trong hướng dẫn: "thứ nhất", "thứ hai"

### 5.8 Từ để hỏi trong UI

- "Dùng kỹ năng này khi..."
- "Mục tiêu ở đây là gì?"
- "Cần nhận ra danger nào?"
- "Nên học tiếp gì?"

### 5.9 Formatting đặc biệt

- **`kỹ thuật`**: không in nghiêng hoặc in đậm tràn lan
- "→" để chỉ hướng hoặc chuyển tiếp (không dùng "->")
- Dấu ngoặc kép: dùng "..." (kiểu Việt), không dùng '...'

---

## 6. Các section của vi.ts: hướng dẫn theo nhóm

### Section đã dịch tốt (giữ nguyên hoặc chỉ sửa nhỏ)

- `app` — OK
- `nav` — OK
- `navGroups` — OK
- `modeUx` — OK (study / fix / map / reference)
- `bodyToBody` — OK
- `blackbelt` — OK
- `learn` — OK
- `common` — OK (đã override hầu hết)
- `body` — OK
- `levels` — OK
- `detail` — OK
- `cardOS` — OK
- `detailGroups` — OK
- `microDetails` — OK
- `microDetailSystem` — OK
- `qualityChecklist` — OK
- `quickMode` — OK
- `glossary` — OK
- `about` — OK
- `settings` — OK
- `concepts` — OK
- `positions` — OK
- `defense` — OK
- `archetypes` — OK
- `search` — OK
- `sharedKnowledge` — OK
- `knowledgeGraph` — OK
- `mastery` — OK

### Section cần dịch thêm (bỏ English gloss, thuần Việt)

- `domains` — (Positional Awareness) → bỏ gloss
- `trainingTypes` — (Class) → bỏ gloss
- `mechanics` — heading/overview/filters/roles directions đều cần clean gloss
- `technical` — categories + forceDirections cần clean gloss
- `studyPage` — cần review nội dung kế thừa từ en
- `dashboard` — cần review nội dung kế thừa từ en

### Section cần quyết định policy

- `modern.family` — giữ English (Guard, Passing, Submission) hay dịch?
- `modern.system` — giữ English (K-Guard, Matrix) là chuẩn
- `positionCategories` — cần thống nhất dịch hay giữ
- `positionStatuses` — cần thống nhất dịch
- `safetyCategories` — một số cần dịch

---

## 7. Data layer: cách viết content kiểu BJJ tiếng Việt

### Cấu trúc câu chuẩn cho body-to-body details

```
[bộ phận của tôi] + [hành động] + [bộ phận của đối thủ] + [hướng/đích] + [vì sao]
```

Ví dụ:
- "Tay phải của tôi kéo cổ tay trái đối thủ qua centerline để phá cấu trúc tay của họ."
- "Ngực tôi drive chéo xuống hông xa của đối thủ để chặn đường hip escape."

### Checklist viết content

Khi viết nội dung cho skill/concept/position, kiểm tra:

1. **Đã rõ bộ phận nào chưa?** (tay, khuỷu, đầu, hông, gối)
2. **Đã rõ bên nào chưa?** (trái/phải/gần/xa/trong/ngoài)
3. **Đã rõ hướng lực chưa?** (kéo/đẩy/ép/nâng/xoay)
4. **Đã rõ thứ tự chưa?** (nên có "trước khi", "rồi mới")
5. **Đã cho biết vì sao hỏng chưa?** (nếu áp lực sai hướng, họ thoát kiểu gì)

### Giữ thuật ngữ cho search index

Data layer nên giữ cả `vi` lẫn `en` trong `LocalizedText` để search bi-lingual.
Ví dụ:
```ts
{
  en: "Frame the neck and hip before escaping.",
  vi: "Dựng frame ở cổ và hông trước khi thoát."
}
```

---

## 8. Những lỗi thường gặp

### 8.1 Dịch từ quá sát nghĩa

**SAI:** "Bắt tay an toàn" (literal translation of "safe grip")
**ĐÚNG:** "Grip an toàn" hoặc "giữ grip phòng thủ"

### 8.2 Dùng từ Việt quá "sách vở"

**SAI:** "Kỹ thuật điều khiển từ vị trí bên dưới" (một câu dài không ai nói)
**ĐÚNG:** "Kiểm soát từ bottom" hoặc "Bottom control"

### 8.3 Trộn tiếng Anh lung tung trong một câu

**SAI:** "Sau khi bạn đã build được frame, thì bạn cần phải maintain inside position để có thể advance."
**ĐÚNG:** "Dựng frame trước, giữ vị trí trong, rồi mới tiến lên."

### 8.4 Quá nhiều gloss `(English)`

**SAI:** "Giữ guard (Guard Retention) là kỹ năng nền tảng (Foundation skill)."
**ĐÚNG:** "Giữ guard là kỹ năng nền tảng."

### 8.5 Thiếu consistency giữa các section

- `mechanics.filters.headNeck`: "Đầu/Cổ (Head/Neck)"
- Nhưng ở file khác lại: "Đầu và cổ"

→ Luôn tra bảng mapping trước khi viết.

---

## 9. Checklist khi review bản dịch

### Kiểm tra content

- [ ] Câu có bắt đầu bằng bộ phận cơ thể hoặc hành động không?
- [ ] Câu có quá dài (>20 từ) không?
- [ ] Có từ BJJ nào bị dịch "sách vở" quá không?
- [ ] Có dấu hiệu "dịch word-by-word" từ tiếng Anh không?
- [ ] Giải thích có "nghe như coach trên thảm" không?

### Kiểm tra consistency

- [ ] Từ mapping có đúng bảng glossary không?
- [ ] UI label có thống nhất với nav/common không?
- [ ] Có dùng `(English)` ở những nơi không cần thiết không?

### Kiểm tra kỹ thuật

- [ ] key trong vi.ts có tồn tại tương ứng trong en.ts không?
- [ ] Value không phải là copy-paste từ en.ts?
- [ ] `getLocalizedTechnicalText()` có thể đổi thành `getLocalizedText()` không?
- [ ] Chạy `npm run audit:vi` — coverage có tăng không?

---

## Phụ lục: Audit commands

```bash
# So sánh vi.ts vs en.ts
npm run audit:vi

# Validate data integrity (skills, positions, concepts)
npm run validate:data
```

---

## 10. Phụ lục: Quick Reference Card

> 20 thuật ngữ dùng nhiều nhất — in ra và dán cạnh màn hình khi dịch.

### Luôn giữ tiếng Anh

| Từ | Ghi chú |
|---|---|
| K-Guard, Matrix, S-Mount | Tên hệ/position — KHÔNG dịch |
| Heel Hook, Kimura, RNC | Tên submission — KHÔNG dịch |
| Wrestle-Up, Front Headlock | Tên kỹ thuật — KHÔNG dịch |
| Crab Ride, Wrist Ride, Turtle | Tên hệ/position — KHÔNG dịch |

### Luôn dịch sang tiếng Việt

| English | Vietnamese |
|---|---|
| finish | kết thúc / siết kết thúc |
| control | kiểm soát |
| entry | đường vào / vào thế |
| escape | thoát |
| safety | an toàn |
| pressure | áp lực |
| checklist | danh sách kiểm tra |
| danger signal | tín hiệu nguy hiểm |
| next step | bước tiếp theo |
| frame | khung chặn |
| inside position | vị trí trong |
| body mechanics | cơ học cơ thể |
| alignment | căn chỉnh trục |

### Nhóm lai — linh hoạt

| English | Khuyến nghị |
|---|---|
| knee line | giải thích "đường gối" lần đầu, rồi giữ knee line |
| hip line | giải thích "đường hông" lần đầu, rồi giữ hip line |
| scramble | tranh chấp hoặc giữ scramble |
| underhook | giữ underhook (không dịch) |
| overhook | giữ overhook (không dịch) |

---

## 11. Chưa chốt (TBD)

Những thuật ngữ dưới đây cần thảo luận thêm để chọn hướng nhất quán:

| Thuật ngữ | Vấn đề |
|---|---|
| pummel | "luồn tay" hay giữ "pummel"? |
| bridge | "cầu" (bridge hip) hay giữ "bridge"? |
| shrimp | "tôm" hay giữ "shrimp"? |
| scramble | "tranh chấp" hay giữ "scramble"? |
| peek-out | giữ nguyên hay dịch? |
| sit-out | "ngồi ra" hay giữ "sit-out"? |
| re-guard | "vào lại guard" hay giữ "re-guard"? |
| posture | "tư thế" hay giữ "posture"? |
| base | "nền" hay giữ "base"? (VD: mất base) |
| post | "trụ" hay giữ "post"? |
| granby | giữ "granby" hay dịch "lăn granby"? |
| berimbolo | giữ nguyên — đây là tên kỹ thuật |

**Hướng giải quyết:**
- Test với người tập BJJ Việt Nam
- Nếu 80% người tập dùng tiếng Anh → giữ tiếng Anh
- Nếu cộng đồng đã có từ Việt chuẩn → dùng tiếng Việt
- Nếu chưa rõ → ưu tiên dễ hiểu, ghi chú trong glossary

---

> **Version:** 1.0
> **Last updated:** 2025
> **Maintainer:** NoGi Mind team
> **Next review:** Sau mỗi batch translation sprint
