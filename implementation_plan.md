# PORTFOLIO REBUILD PLAN — AFTER EFFECTS × VSCODE

> goal: web portfolio dengan identitas kuat gabungan ae + vscode, animasi smooth & elastis, ux jelas, dan manfaatin reactbits.dev lewat mcp secara maksimal.

---

## 1. CORE VISION & GUIDELINES

**konsep utama**

* web = "hybrid ui":
  * **frame vscode** (shell / layout utama)
  * **isi / content** nuansa **after effects** (timeline, keyframe, panel, comp).
* warna utama: biru + ungu → diikat dalam **design token** (primary, accent, surface, background, border, glow).
* tone: profesional, cinematic, tapi tetep ringan dan bisa dipahami orang awam.

**guideline animasi**

* gaya animasi terinspirasi from ae:
  * easing: *ease out, back, elastic, overshoot*.
  * movement: slide subtle, scale kecil, opacity.
  * jangan spam: tiap interaction punya tujuan (highlight info / arahkan mata user).
* semua animasi reusable via komponen & util, bukan hardcode di tiap file.

---

## 2. UX GOAL UTAMA

1. **first-time visitor ngerti dalam 5 detik**:
   * siapa lu
   * lu ngapain (video editor yang kebetulan bisa ngoding)
   * dimana lihat portfolionya.

2. **project showcase langsung keliatan** di halaman pertama (hero + highlight section, tanpa harus nyasar).

3. **tombol jelas**:
   * bedain banget mana **navigasi fungsional** vs **tombol dekoratif ala ae tools**.
   * functional punya styling dan hover yang konsisten.

4. **mobile-first**:
   * tampilan hp rapi, ga kebanyakan tombol kecil, no horizontal scroll.

---

## 3. STRUKTUR OVERHAUL

### 3.1. Shell / Layout (AppLayout, MenuBar, Toolbar, StatusBar)

**action: rombak konsep jadi "vscode frame + ae content"**

#### [MODIFY] [AppLayout.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/shell/AppLayout.tsx)

* jadikan layout sebagai "editor window" ala vscode:
  * sidebar kiri (nav utama / project tree feel).
  * top bar (tab / file name).
  * content area (ae comp).
* tambahkan transisi fade/slide **halus** saat route berubah.

---

#### [MODIFY] [MenuBar.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/shell/MenuBar.tsx)

* pastikan file title: `Langley.aep` (bukan `.prj`).
* ikon + teks lebih ringkas, jangan kebanyakan menu general.
* tambahkan animasi hover:
  * underline sliding
  * subtle glow biru/ungu
* di desktop: bisa tampil full.
* di mobile: simplified / collapsible.

---

#### [MODIFY] [Toolbar.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/shell/Toolbar.tsx)

* kelompokkan tombol jadi 2 blok:
  1. **functional nav**: [Home](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/app/%28site%29/page.tsx#14-28), [Projects](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx#16-154), [About](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/app/%28site%29/about/page.tsx#15-232), `Contact`, `Studio`
     * styling: lebih terang, ada glow, ada hover transform tipis.
     * **ini yang di-*highlight* paling jelas**.
  2. **ae tools (decorative)**:
     * ikon/shape ala ae, tapi:
       * warna lebih lembut, opacity agak turun.
       * tooltip: "Decorative · AE vibe only" biar ga misleading.
* kurangi jumlah tombol dekoratif kalau bikin noise.
* tambahkan animasi masuk (stagger) tapi halus.

---

#### [MODIFY] [StatusBar.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/shell/StatusBar.tsx)

* gunakan layout mirip vscode status bar:
  * kiri: status project / file / fps / durasi.
  * kanan: theme switch, language, dll.
* `Go Live` bisa dibuat seperti "render / export" ala ae:
  * subtle pulse, tapi ga norak.
* tambahkan **real functional theme toggle**.

---

### 3.2. Home Page (Hero + Featured Projects)

#### [MODIFY] [Hero.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/home/Hero.tsx)

**tujuan: hook visual + jelas siapa lu + cta kuat**

* teks:
  * tagline indo: `Video editor yang kebetulan bisa ngoding`.
  * versi english: `A video editor who happens to code`.
* struktur:
  * kiri: teks + CTA.
  * kanan: "AE comp preview" (bentuk panel dengan timeline & keyframe pseudo).
* CTA:
  * `View Projects` → scroll ke [FeaturedProjects](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx#16-154) (smooth scroll).
  * `Contact` / `Hire Me` → ke bagian kontak.
* animasi (gunakan **reactbits** via mcp):
  * hero text masuk dengan `Text Reveal / Split Text` style (character / word).
  * panel ae muncul dengan animasi "scale + fade + slight overshoot".
  * timeline keyframe bergerak subtle loop (kecil, ga bikin pusing).

> **MCP Instruction**: Use `mcp_reactbits_search_components` to find text reveal/split text animations, then integrate into Hero.tsx with appropriate props (duration, easing, delay).

---

#### [MODIFY] [FeaturedProjects.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/home/FeaturedProjects.tsx)

**tujuan: project keliatan jelas di fold pertama / setelah sedikit scroll**

* geser section ini lebih ke atas (deket hero).
* tiap kartu project:
  * gunakan `<GlowCard>` / komponen card animasi (boleh custom + reactbits).
  * tambahkan:
    * thumbnail / frame video / still.
    * short label: tipe project (edit, motion, web).
  * hover:
    * elevate (translateY halus).
    * border gradient biru–ungu.
    * sedikit glow di shadow.
* tambahkan animasi "stagger" saat list muncul.

> **MCP Instruction**: Use `mcp_reactbits_search_components` for card hover effects, glow animations, and stagger patterns.

---

### 3.3. About Page

#### [MODIFY] [about/page.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/app/(site)/about/page.tsx)

* ubah semua referensi "Premiere Pro" → **"After Effects"** (terutama di bagian "tools i use").
* tambahkan layout:
  * panel kiri: cerita singkat.
  * panel kanan: "timeline / career / stack".
* terminal / console section:
  * tambah animasi typing (bisa pakai reactbits typed / custom).
* animasi masuk panel: slide soft + fade.

---

### 3.4. Footer (ini rombak total, bukan tambal)

#### [MODIFY] [Footer.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/global/Footer.tsx)

**ganti total jadi "AE render queue × VSCode status"**

* layout:
  * kiri: "Render Queue":
    * daftar 2–3 project dengan status: `Queued`, `Completed`, `Rendering…`.
  * tengah: quick links (Projects, About, Contact, Studio).
  * kanan: social dan "build info".
* style:
  * panel gelap ala editor.
  * garis tipis, sedikit glow di border.
  * small type info: `build vX.Y.Z / last updated`.
* animasi:
  * bar kecil "render progress" looping pelan.
  * hover social icon: "magnetic hover" (pakai animasi dari reactbits atau bikin sendiri).

> **MCP Instruction**: Use `mcp_reactbits_search_components` for magnetic hover effects and progress bar animations.

---

## 4. ANIMATION SYSTEM (REUSABLE)

### 4.1. Buat modul util

#### [NEW] [animations.tsx](file:///c:/Users/Rhin/Documents/GitHub/langley-portfolio/components/ui/animations.tsx)

isi minimal:

* `<FadeIn>`
* `<SlideIn>` (arah via prop)
* `<Stagger>` (wrapper anak)
* `<TextReveal>` (untuk hero & heading)
* `<GlowCard>` (wrapping card dengan border animasi)

> **MCP Instruction**: Use `mcp_reactbits_search_components` to find animation patterns for each component type, then adapt to reusable wrappers (not just copy CSS).

---

### 4.2. Integrasi per bagian

* hero → `TextReveal`, `SlideIn`, subtle `Glow`.
* featured projects → `Stagger + GlowCard`.
* toolbar / menubar → `FadeIn + hover transform`.
* footer → `progress bar + subtle loop`.

---

## 5. RESPONSIVE & INTERACTION REVIEW

**desktop**

* jangan ada tombol kecil numpuk.
* lebar max content, padding nyaman.
* pastikan layout tidak pecah di resolusi 1366, 1440, 1920.

**mobile**

* toolbar & nav harus simple:
  * bottom nav / drawer, tapi clear icon & label.
* hero di mobile:
  * atur supaya teks tetap kebaca, animasi ga berat.
* project cards:
  * 1 per row, full width, tap area besar.

---

## 6. CLEANUP & CONTENT CHECK

* pastikan:
  * semua `.prj` → `.aep`.
  * semua "Premiere Pro" → "After Effects".
* tagline:
  * indo + english konsisten di semua tempat (hero, about, meta kalau ada).

---

## 7. VERIFICATION PLAN (UPDATED)

### Manual UX Testing

1. **UX sanity check (manual):**
   * buka web pertama kali di tab baru.
   * dalam 5 detik: bisa jawab "ini web siapa? dia ngapain? kemana kalau mau lihat karya?"
   * cek apakah ada tombol yang bikin bingung / ga jelas fungsinya.

2. **project visibility:**
   * dari top, scroll dikit → project terlihat dan bisa diklik.

3. **functional vs decorative:**
   * semua tombol yang ga ngapa-ngapain harus jelas "dekoratif".
   * tombol penting: tampil paling menonjol.

4. **animasi:**
   * pastikan ga ada animasi patah / terlalu berat.
   * tes di hp mid-range.

### Automated Checks

5. **grep check:**
   ```bash
   grep -r "\.prj" --include="*.tsx" --include="*.ts"
   grep -r "Premiere Pro" --include="*.tsx" --include="*.ts"
   ```

---

## Implementation Order

1. **Quick Fixes** - `.prj` → `.aep`, "Premiere Pro" → "After Effects"
2. **Animation System** - Create reusable components with ReactBits integration
3. **Shell Components** - MenuBar, Toolbar, StatusBar enhancements
4. **Hero Redesign** - Add CTAs, text animations, AE comp preview
5. **Footer Rebuild** - Complete overhaul to render queue style
6. **Featured Projects** - Prominence and animations
7. **Responsive Polish** - Mobile optimizations
8. **Final Verification** - All checks from section 7
