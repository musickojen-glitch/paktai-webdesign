# Paktai Showcase progress

Updated 2026-11-07. User authorized ongoing hourly development; preserve sales homepage and pricing. Ruayruay is paused.

## Implemented baseline
10 separate demo paths: school, clinic, temple, prosecutor, court, subdistrict, municipality, hospital, pao, cooperative. Distinct page ordering and layout variants, three new original hero images, searchable sample stories and article dialogs. Homepage gallery opens native full-screen dialog with iframe, close/Escape and separate-tab link. Original sample content; visible fictitious-site labels and official source links for menu inspiration. No real submissions.

## Next tasks / honest limits
- Browser baseline verified: all ten pages load, one H1 and ten detail controls each, no horizontal overflow at desktop viewport. School fullscreen open/close and cooperative article open verified. More keyboard/mobile QA pending.
- Increase original category-specific article detail beyond current shared explanatory bodies. Do not bulk-copy source text.
- Replace homepage preview crops with screenshots of actual demos after browser QA.
- Create distinct city/hospital/PAO/cooperative image assets; current baseline reuses some original art.
- Test narrow screens and keyboard navigation. Improve actual defects before adding animation.
- Add category-specific document examples clearly labelled demonstration; no real names or claims.

## Autonomous workflow
Read main and this file before each run. Check current changes to avoid overwriting concurrent work. Complete bounded work, validate, update this progress record, commit with expected head, verify Cloudflare deployment. Report only verified completion. Do not buy services or request credentials. No unrelated repository edits.

## 2026-11-08 accessibility correction
Source inspection found inherited dark button text on dark PAO cards and the first municipality card. Corrected those colors, added explicit focus-visible rings to links/buttons/search fields, inherited heading font sizes on article buttons, and small-screen brand wrapping/input shrink rules. Static CSS reviewed; no browser or mobile verification claimed in this run. Next: browser keyboard/narrow-screen QA, distinct article content and actual demo screenshot thumbnails. Preserve homepage/prices.

## 2026-11-08 school article content
Replaced three generic school news summaries and modal bodies with distinct original demonstration prose: open-house learning stations, library spaces and community inquiry. Preserved existing official structural source link and visible fictional-content label. No real dates, student names or event claims. Static checks: exactly 3 news cards replaced, 3 unique article texts, source/disclaimer retained. Browser interaction and responsive verification not performed in this pass. Previous verified commit 1c42360. Next: enrich the other nine categories, then browser keyboard/narrow-screen QA and actual page thumbnails.

## 2026-11-08 clinic and temple content
Added six distinct original news summaries and matching detail bodies for clinic (team roles, visit preparation, community learning) and temple (architecture, community archive, visit guidance). Fictional labels and structural source links preserved. Static assertions verified three replacements per page and disclaimer retention. No browser/mobile QA in this pass. Last deployed baseline ac26f39. Next: enrich remaining seven sectors; browser keyboard/narrow-screen checks and actual thumbnails remain queued.

## 2026-11-08 prosecutor and court content
Six original category-specific news summaries and detail bodies added, replacing generic placeholders. Legal pages explain information discovery only; no case-specific advice, submission, court fee, actual legal requirement or personal data. Source links and fictional labels retained. Static assertions: exactly three news cards replaced per page; visible demo labels preserved. Browser/keyboard/mobile not tested in this pass. Baseline commit 6d467ed. Next: remaining five categories (subdistrict, municipality, hospital, PAO, cooperative), then pending browser QA and thumbnails.

## 2026-11-08 remaining five category news
Added 15 original category-specific summaries and matching modal bodies for subdistrict, municipality, hospital, PAO and cooperative. Category news enrichment now covers all ten demos (30 stories total across the recorded passes); generic shared information-center details remain a separate backlog. Preserved exact source sections and visible fictitious-content labels. Static assertions: 3 replacements each on 5 pages; source blocks unchanged. Browser/mobile/keyboard verification NOT performed in this pass. Prior deployment 49a6c86. Next priority: browser functional and responsive QA, screenshots for real thumbnails, then richer information-center content and distinct remaining hero assets. No random cosmetic work.

## 2026-11-08 live keyboard verification
Verified on production desktop browser: Enter on school gallery link opens native viewer dialog; Escape closes it; focus returns to the school card. Reopened and closed using close button. Follow-up DOM read confirmed body overflow restored to empty (initial close event read was transiently hidden; no persistent lock defect). iframe navigation was still about:blank at immediate snapshot, so full iframe loading NOT certified in this pass. No code changed without an observed persistent defect. Browser QA next: await actual iframe content, all ten previews, article search/dialog, narrow-screen and screenshots. No mobile verification claimed. Baseline a7eb9a4.

## 2026-11-08 iframe loading verification
Production school viewer loaded real content after awaiting visible h1: hero, all 3 enriched stories, information buttons, sources and fictitious label observed in browser AX. Batch of ten was attempted but browser kernel timed out/reset; DO NOT count this as ten passed. Tool getByRole heading level filter did not constrain locator; use frame locator('h1') instead. Next run must test small batches (2-3 demos), persist results per batch; no repeated long batch. Mobile, article search/dialog and thumbnails still pending. No source code changes warranted by this tool timeout. Previous main commit ea0d3834ff09fea2701da5d816dba821224f3398.

## 2026-11-08 bounded live QA: clinic and temple
Production iframe h1 awaited and full AX content observed for clinic and temple. Clinic search nonsense query returned 0 visible news cards; clearing search restored news and first story opened its correct enriched body in native article dialog. Escape dismissed detail and close viewer returned to gallery, enabling temple launch. Verified iframe-loaded categories so far: school, clinic, temple (3/10); remaining seven NOT certified by these runs. No new code change required. Narrow-screen QA, screenshots and information-center enrichment remain queued. Baseline 96796b2d75a1b684588f2ac01216c91eb27cd15d. Next bounded browser batch: prosecutor and court.

## 2026-11-08 bounded live QA: prosecutor and court
Production expanded viewers loaded category-specific pages for prosecutor and court; full accessibility trees confirmed 3 enriched stories, source links and fictitious labels on both. Court first news opened its matching original body; Escape dismissed detail, viewer close returned to gallery with court card focused. Verified iframe-loaded categories now school, clinic, temple, prosecutor, court (5/10). Important test refinement: waiting for any visible h1 immediately after switching may match the previous frame before navigation; inspect the actual category page identity after navigation before counting success. No source defect observed, no cosmetic edit made. Narrow-screen and separate-tab interaction not tested here. Baseline 7a6e11360ad554c51dcd6e343e729b517e6c46c4. Next bounded QA: subdistrict and municipality, then hospital/PAO/cooperative; actual screenshot thumbnails and information-center enrichment remain queued.

## 2026-11-08 bounded QA: subdistrict verified; municipality blocked
Production subdistrict expanded iframe loaded the correct h1 and first original news detail. Escape dismissed article and viewer close allowed return to gallery. Municipality Enter activation opened viewer and correct external link, but subsequent frame checks timed out and AX remained about:blank. Municipality is NOT passed; transient navigation/tool failure requires focused diagnosis next, no unsupported source fix made. Loaded preview coverage now 6/10. Baseline c20371dff1fcbef339eaf2df48ba17d1197768fd. Next: investigate municipality blank iframe, then hospital/PAO/cooperative; mobile, separate-tab, screenshot thumbnails and information-center enrichment still pending.

## 2026-11-08 fix delayed close cleanup race
Inspected blank municipality navigation and found a plausible race: queued dialog close event can run after the next preview is opened, resetting its iframe to about:blank. Guard close cleanup when viewer.open is true. Node VM branch check passed: reopened viewer retains frame; actually closed viewer clears frame and scroll lock. This is a logic check, not browser certification; production municipality remains unverified and loaded coverage stays 6/10. Baseline b824c101203c70cd6ab19ab6d7a6c0c9e1df42e9. Next: production rapid-switch regression and municipality load, then hospital/PAO/cooperative, mobile and thumbnails. Homepage design, prices and contact untouched.

## 2026-11-08 production regression: municipality and hospital
Fresh production tab loaded municipality correct category h1 and full AX (news, sources, demo label). Closed and immediately pressed Enter on hospital card; hospital correct h1 and full AX loaded, no blank iframe observed in this switch. This verifies one rapid-switch regression after guard fix; not exhaustive timing certification. Loaded preview coverage 8/10, PAO/cooperative next. Mobile, separate-tab interaction, actual screenshot thumbnails and information-center enrichment pending. No source change required this pass. Baseline d64bdf0f762dac4bb125413036681fa2982510f3.

## 2026-11-08 gallery state changed; QA queue reconciled
Production homepage now exposes 20 concept SVG image links, no [data-showcase] anchors (browser count 0), while heading still says 10 forms. Therefore prior interactive-gallery QA 8/10 describes the earlier gallery, NOT current homepage behavior. PAO/cooperative expansion QA cannot proceed from current gallery. Do not overwrite newer portfolio work or reinstate old cards blindly. Current head b94bc3ef48a421227e2110eccec4833fe43765bd. Next priority: reconcile 20 image portfolio with required 10 interactive demos, preserve new authorized art/contact work; update gallery count/labels only with actual chosen presentation. Mobile and separate opening still unverified. No product code changed in this pass due to concurrent presentation changes.

## 2026-11-08 restore interactive access alongside current portfolio
Added explicit ten-category demo navigation above the existing image gallery and reconnected showroom.js. Kept current portfolio images, labels, prices and contact untouched. Static check: exactly 10 data-showcase anchors, existing image asset retained. Browser interaction/mobile not certified in this pass. Baseline f362a1d6024baaffc8c674a265c4ed2d1e6e1d5b. Next: live opening/closing from new navigation, PAO/cooperative remaining iframe QA, mobile and separate-tab tests; no longer blocked by missing gallery controls.

## 2026-11-08 interactive navigation live QA: PAO/cooperative
New homepage demo navigation observed in production alongside 11 current image portfolio links. PAO opened correct iframe h1/full AX, demo labels/news/sources observed. Closed viewer then Enter opened cooperative; correct cooperative h1 and first news detail observed. Historical category iframe load coverage now 10/10 across recorded passes, NOT full functional/mobile QA and not a claim all new navigation links were retested. Baseline e05f46b3b3a52d697888b7c7e6c559e3c1c5d6b8. Next queue: narrow-screen QA, separate-tab interaction and keyboard close/focus from new navigation; richer information-center content and demo-specific visuals still pending. Preserve current 11 image portfolio assets.

## 2026-11-08 separate-tab and keyboard QA
Production new school navigation activated with Enter; viewerExternal click created a separate school tab at /demos/school with correct title (browser tab inventory confirmed). Escape on viewer close dismissed dialog and focus returned to school navigation. Follow-up DOM read confirmed body overflow empty after queued close cleanup; immediate read was transiently hidden. No persistent defect observed. Mobile/narrow viewport NOT tested; no supported resize API used. Baseline 349a263e02464c5b9f3a3819563b5f90fb8bdc45. Next priority: narrow-screen verification when supported, then information-center enrichment and distinct demo art. Do not repeat school desktop QA without a new change.

## 2026-11-08 school information-center enrichment
Replaced seven repeated generic modal bodies with original school-specific demonstrations: inquiry project, communication, creative technology, arts/sport, fictional organization, FAQ and document organization. No actual curriculum, admissions, student data or official results claimed. Existing source link retained; this pass adds fictional examples, not new factual claims from unreviewed sources. Static replacement count 7; source and news retained. Browser/mobile not tested for this content edit. Baseline 4f328f2a8c95dcadf512a557473e5fae633e1716. Next: enrich clinic/temple information centers, then remaining categories; narrow-screen QA remains blocked by absent supported resize in current browser API, not certified.

## 2026-11-08 temple information-center enrichment
Seven generic detail bodies replaced with original fictional temple-specific content: history evidence, art, community, visiting, organization, FAQ and documents. No invented founding dates, monks, historical attribution, donation totals or transactions. Existing sources/layout retained. Static check exactly 7 replacements; browser/mobile not tested in this pass. Baseline 938f1c8f0fa89b4b46c78472f78145184ed3f2f5. Next clinic information center, then remaining 7 categories; browser content QA and mobile remain queued.

## 2026-11-08 clinic information-center enrichment
Replaced seven generic detail bodies with fictional clinic-specific information architecture (service categories, educational media, community coordination, previsit questions, organization, FAQ, documents). No medical advice, real schedules, eligibility, patient data or submissions. Existing layout and sources retained. Static replacement assertion passed: 7. Browser/mobile not tested for this edit. Baseline 84975c8a1f930448cb9fb0bfd711d9455aa8d778. Information enrichment now school/temple/clinic; remaining 7 categories next, plus browser content and mobile QA.

## 2026-11-08 subdistrict information-center enrichment
Seven repeated information bodies replaced with original fictional local-government content: service discovery, planning, disclosure, procurement, organization, FAQ and documents. No actual requests, procurement figures, official records, personal data or assessment guarantees. Existing sources/layout/news retained. Static assertion exactly 7 replacements; browser/mobile not verified this pass. Baseline 3256853185e9e1247d1a82ee823cec3d9757f56b. Enriched information centers now 4/10; next municipality and PAO, then remaining categories, content browser QA and mobile.

## 2026-11-08 municipality information-center enrichment
Seven generic modal bodies replaced with original fictional municipality-specific content: city services, community discovery, environment, news, organization, FAQ and document library. No actual applications, payments, official schedules, figures or personal data. Layout/news/source links retained. Static replacement count 7 passed; browser/mobile not checked for this content edit. Baseline b32557c85cca3d0063c9867a235b884480d0d12e. Information-center enrichment now 5/10; next PAO, hospital, cooperative, prosecutor and court. Browser content checks and responsive QA remain pending.

## 2026-11-08 PAO information-center enrichment
Seven generic modal bodies replaced by original fictional PAO content: strategy, project lifecycle, public data, local networks, organization, FAQ and document library. No actual budgets, partnerships, official records, submissions or assessment claims. Static assertion exactly seven replacements; original source links/news/layout retained. Browser/mobile not tested for this edit. Baseline cc6db681b65ef9d92d61b5106f6b3b3a92b3958b. Information centers enriched 6/10. Next hospital, cooperative, prosecutor and court, then browser content and responsive QA.

## 2026-11-09 hospital information-center enrichment
Seven generic detail bodies replaced with original fictional hospital-specific content: department discovery, visitor guide, source-based eligibility information layout, news, organization, FAQ and documents. No medical advice, actual appointment/fee/eligibility promises, health data or real personnel. Static replacement count 7 passed; existing source links/layout/news retained. Browser/mobile not verified for this edit. Baseline 9516506058d0e2fcf39f661e7b994dff7f1abd5b. Information centers enriched 7/10; next cooperative, prosecutor and court; content browser checks and responsive QA pending.

## 2026-11-09 cooperative information-center enrichment
Seven generic detail bodies replaced with original fictional cooperative content: introduction, member service discovery, reading resources, meeting news, organization, FAQ and documents. No financial advice, returns, real figures, member data or transactions. Static replacement assertion 7 passed; existing layout/news/source links retained. Browser/mobile not checked for this edit. Baseline b605f8aaba8ab09974da3c5ca5f8d1c678d15683. Information centers enriched 8/10; prosecutor and court next, then content browser QA and responsive verification.


## 2026-11-09 prosecutor information-center enrichment
Replaced seven repeated detail bodies with original fictional content specific to prosecutor-office presentation: service discovery, contact guidance layout, reading library, documents, organization, website FAQ and reports. No legal advice, real case handling, personnel or invented metrics. Static replacement assertion: 7 matched and replaced. Existing layout, news and source links retained. Browser interactions and mobile layout not tested in this content edit. Baseline f23d14418209abcaa6188d12ac2ef64b69d82ccd; this entry is included in the same commit as the change. Information-center enrichment now 9/10. Next: court's seven details, then browser checks of new content and responsive QA; demo artwork remains in queue.


## 2026-11-09 court information-center enrichment
Replaced all seven generic court detail bodies with distinct original fictional visitor guide, document discovery, travel layout, external systems, organization, FAQ and reports content. No legal advice or real submissions. Static count assertion passed (7); original layout, source links and news preserved. Baseline bd3f2cef4c3812c47894fe18b019bcf046c1870c; commit containing this entry records this change. Information-center content pass now 10/10, not overall showcase completion. Browser, keyboard and responsive QA of enriched content remain unverified. Next: perform those checks, then demo-specific artwork from existing queue.


## 2026-11-09 court enriched-content keyboard QA
Production baseline 03a8bd7c6879c13fb18eadc8a4153fbb51aa1f39. Direct browser check at /demos/court: activated information-center visitor-guide button with Enter; observed matching new title/body and close button. Escape dismissed dialog; read-only DOM confirmed open=false and focus restored to originating visitor-guide button. Passed this bounded interaction only. No code change required. Other six court details, other nine demos' enriched details, pointer close, showroom expansion and responsive QA remain pending for this content pass. Browser API offers no viewport resize; mobile not certified. Next: continue bounded enriched-content checks, then artwork queue. Completion-summary browser tool rejected schema (code required); browser checks themselves succeeded.


## 2026-11-09 court remaining information-detail QA
Production baseline 661009a70eab3047e033f833f630dcf369fcaf99. Browser clicked remaining six information-center buttons (documents, travel, external systems, organization, FAQ, reports). Each displayed its matching distinct enriched body; pointer close returned to page and originating button focus in AX observations. Together with prior visitor-guide keyboard check, all seven court information bodies have been opened in production. No code defect found; documentation-only commit. This does not certify responsive layout, showroom expansion, or other nine demos' enriched details. Next: prosecutor seven detail checks, then other demos; mobile and artwork remain pending.


## 2026-11-09 prosecutor enriched-detail keyboard QA
Production baseline 97999c100de8442e780c4ef541e207a410b796eb. Opened all seven prosecutor information-center buttons via Enter, observed matching distinct titles/bodies, dismissed each via Escape. Read-only DOM after every dismissal confirmed dialog open=false and focus returned to its originating button. All 7 passed this interaction. No code changes needed. Court and prosecutor enriched details now checked; eight other demos, pointer-close on prosecutor, showroom expansion and mobile remain pending. Next: school/clinic/temple enriched-detail checks, followed by remaining demos and responsive verification; preserve artwork queue. Browser completion-summary call still rejected by tool schema; no effect on observed checks.


## 2026-11-09 school, clinic and temple detail QA
Production baseline 01bc8e488a97872f956529c312456fd50b678da2. Opened all seven information-center details on each of /demos/school, /demos/clinic and /demos/temple in Chrome (21 total). Alternated Enter/Escape and pointer open/close. The browser showed the corresponding title and distinct body for each entry. After every close the dialog was closed and focus returned to its trigger. No defect requiring code change was found in these checks. Enriched details exercised on 5 of 10 demos so far. Next: subdistrict, municipality, hospital, PAO and cooperative details, then showroom and narrow viewport QA. Demo artwork remains queued.


## 2026-11-09 remaining five demos detail QA
Production baseline ec523a09b2460350b51106e2ef59ad02bfbd6f6b. Verified seven distinct information-center details each for subdistrict, municipality, hospital, PAO and cooperative (35 total). Subdistrict and municipality alternated Enter/Escape with pointer open/close. Hospital's initial Enter check at the visitor guide did not open the dialog in this browser session. Hospital, PAO and cooperative subsequently passed pointer open/close for all seven, with matching dialog title/body and focus restoration. Keyboard coverage for those three is still pending. All 10 demos now have production detail coverage by at least one input method. Next: isolate the hospital keyboard result by tabbing to the actual trigger, then run showroom expansion and narrow viewport QA. Demo artwork remains queued.


## 2026-11-09 hospital visitor-guide keyboard retest
Production baseline cd0d46705b49074a20665f05a354d0e2875d2edd. In Chrome, traversed the page with Tab until the actual information-center visitor-guide button was focused. Enter opened the dialog with the matching heading. Escape closed it and restored focus to the same button. The earlier failed activation did not recur on this route. Remaining keyboard checks: six hospital detail buttons and PAO/cooperative. Next priority: showroom expand, close and separate-tab flow, then narrow viewport QA and demo artwork.


## 2026-11-09 production showroom interaction QA
Baseline 54153ede5b1224d3d9bd2fb7b4c3c9f82ae94ab7. Chrome at /#examples opened all 10 demo previews, alternating mouse and Enter. Each displayed its own heading inside the frame and the separate-tab link matched the selected demo. Closed with the button or Escape, then waited for the close event to clear the frame. Focus returned to the selected link and page scrolling was unlocked for all 10. Clicked the cooperative separate-tab link and confirmed the new tab loaded /demos/cooperative with the expected title. Only that separate-tab activation was tested in this run. No product code change was needed. Next: run narrow viewport QA for the homepage, showroom and demos with a viewport-capable runner, and finish keyboard detail checks for hospital, PAO and cooperative. Demo-specific artwork remains queued.


## 2026-11-09 narrow viewport QA attempt
Baseline 3206064d089c9bf53349d085a0b03402ba7cf660. Reviewed homepage and demo viewport and media-query configuration in source. Local Playwright is installed, but no Chromium executable is present. The official headless browser installer received an invalid or truncated ZIP. The previous live browser interface does not expose viewport resizing. No mobile render or interaction test ran, and no product code changed. Do not repeat the same download in the same environment. Use a runner with a working Chromium binary to check 320, 390 and 768 px for homepage, dialog toolbar, frame scrolling and the ten demos. Until that runner is available, finish outstanding keyboard checks or take the queued demo artwork work.


## 2026-11-09 original courthouse hero
Baseline dee9419907c506c7c11e91129e7a1c9cb8bed470. Added an original SVG showing a fictional courthouse against layered Southern hills. Applied it only to the court demo in place of shared hero artwork. XML parse and local vector element checks passed. Browser layout and interaction were not retested for this artwork change. Next: continue distinct artwork for the other shared-image demos and complete remaining keyboard QA. Narrow viewport testing still needs a working browser runner.


## 2026-11-09 hospital and cooperative hero illustrations
Baseline 6f41f8411679eddf155ecf94b219b2aacace33e9. Replaced shared hero artwork on the hospital and cooperative demos with original, self-contained SVGs. Hospital depicts a fictional glass hospital at blue hour. Cooperative depicts Southern fields and a community barn. XML validation and HTML asset reference checks passed. Browser rendering, interaction and narrow viewport checks were not rerun for this change. Next: prosecutor, municipality, PAO and subdistrict artwork, then visual verification of the new heroes and remaining keyboard and mobile QA.


## 2026-11-09 prosecutor and municipality hero illustrations
Baseline 44ab4f82cc4ec9de3c1b25cec7d3bda9039be666. Added two original SVGs: a fictional civic office with arched windows for prosecutor and a waterfront townscape for municipality. Updated the two demo hero references. Both SVGs parsed, internal references resolved, and each replaced its intended prior asset reference exactly once. Browser rendering, viewer interaction and narrow viewport testing remain unverified for these new images. Next: PAO and subdistrict hero artwork, then verify the new illustrations in the browser and finish outstanding keyboard and narrow viewport QA.


## 2026-11-09 PAO and subdistrict hero illustrations
Baseline 707b02902dc9f30481c24d9bef2b8d38a5a5e05d. Added an original abstract river and regional route map to the PAO demo and a fictional tiled-roof civic building to the subdistrict demo. Both SVGs parsed, internal references resolved, and each demo replaced its old hero reference once. This closes the queued shared-hero replacements. Browser visual verification and responsive checks for the new images are pending. Next: verify the new heroes in production and complete pending keyboard and narrow viewport QA before any further design changes.


## 2026-11-09 PAO and subdistrict production verification
At af60b0fde3344a5d944f5707c1b0184f6bc3dde7, GitHub showed no Cloudflare check run or commit status. Live Chrome loaded both demo pages, but their computed hero backgrounds still referenced hero-reference-v2.webp. The updated illustrations could not be visually tested in production. This progress-only commit also gives the existing Pages integration another push to process. If it produces no check, inspect the Cloudflare Pages deployment history and Git integration for main before making further deployment-only commits. Next: confirm live hero URLs, inspect rendering, then finish keyboard and mobile QA.

## 2026-11-09 production keyboard QA
Baseline bf18f2886fa3e8b68c99b265b52a4d98d95bbabb. In production Chrome, tested all seven information buttons on each of the hospital, PAO and cooperative demos (21 total). Enter opened a populated article dialog, Escape closed it, and focus returned to the originating button in all 21 cases. PAO and cooperative article bodies also matched the selected buttons. No product code changes. Next: verify the new hero illustrations visually and test 320, 390 and 768 px when a viewport-capable runner is available. Mobile layout and interactions remain unverified.

## 2026-11-09 production hero QA
Baseline 2a9d54726670a6fe5c745d7da24366d6b5384ea9. Opened all ten demo links from the live homepage in Chrome and verified ten distinct computed hero background URLs (three WebP and seven SVG). Desktop screenshots confirmed the new subdistrict building and PAO river map rendered behind their headlines. The other eight backgrounds were checked by computed URL only. No product code changed. Next: visually review the remaining five new SVG heroes after entrance animations settle, including text contrast, and test 320, 390 and 768 px with a viewport-capable runner. The previously documented mobile runner blocker remains.

## 2026-11-09 browser QA blocker
Baseline 57acf6798eb9ebe714cd1c986a11fdc503a7dee3. This session has no browser control tool and the local executor failed to start a shell process (exec-server: No such file or directory). No new visual or responsive result was obtained. Resume once a working browser runner is available. Review the five outstanding SVG heroes and test the homepage, viewer and demos at 320, 390 and 768 px. No site code changes.
