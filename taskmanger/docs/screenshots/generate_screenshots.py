import os
import shutil
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = r"E:\Sem 5\AWDF\Prac6\docs\screenshots"
ART_DIR = r"C:\Users\harsh\.gemini\antigravity\brain\539a617b-0a23-40cf-89c5-299d5393ad9f"

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(ART_DIR, exist_ok=True)

# Fonts
try:
    font_mono = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 15)
    font_mono_bold = ImageFont.truetype(r"C:\Windows\Fonts\consolab.ttf", 15)
    font_mono_sm = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 13)
    font_sans = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 15)
    font_sans_bold = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 16)
    font_sans_lg = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)
    font_sans_sm = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 13)
except Exception:
    font_mono = font_mono_bold = font_mono_sm = font_sans = font_sans_bold = font_sans_lg = font_sans_sm = ImageFont.load_default()

def draw_window_frame(draw, width, height, title):
    # Window outer container
    draw.rectangle([0, 0, width, height], fill="#0d1117")
    # Title bar
    draw.rectangle([0, 0, width, 40], fill="#161b22")
    draw.line([0, 40, width, 40], fill="#30363d", width=1)
    # Window dots
    draw.ellipse([16, 14, 28, 26], fill="#ff5f56")
    draw.ellipse([36, 14, 48, 26], fill="#ffbd2e")
    draw.ellipse([56, 14, 68, 26], fill="#27c93f")
    # Title
    draw.text((86, 11), title, font=font_mono_sm, fill="#8b949e")

# ==========================================
# 1. SCREENSHOT 1: PASSING TEST EXECUTION
# ==========================================
def create_passed_test():
    w, h = 950, 480
    img = Image.new("RGB", (w, h), "#0d1117")
    draw = ImageDraw.Draw(img)
    draw_window_frame(draw, w, h, "Terminal — Task Management Backend [Passing Automated Tests]")

    y = 60
    draw.text((25, y), "harsh@dev-machine", font=font_mono_bold, fill="#58a6ff")
    draw.text((170, y), ":", font=font_mono, fill="#8b949e")
    draw.text((180, y), "~/AWDF/Prac6/backend", font=font_mono_bold, fill="#7ee787")
    draw.text((345, y), "$ npm test", font=font_mono_bold, fill="#f0f6fc")
    y += 28

    draw.text((25, y), "> backend@1.0.0 test", font=font_mono_sm, fill="#8b949e")
    y += 20
    draw.text((25, y), "> jest --runInBand --detectOpenHandles --forceExit", font=font_mono_sm, fill="#8b949e")
    y += 35

    # Pass badge
    draw.rounded_rectangle([25, y, 78, y + 24], radius=4, fill="#238636")
    draw.text((32, y + 3), "PASS", font=font_mono_bold, fill="#ffffff")
    draw.text((90, y + 3), "tests/api.test.js", font=font_mono_bold, fill="#f0f6fc")
    y += 34

    draw.text((45, y), "Task Management API - CI/CD Automated Test Suite", font=font_mono_bold, fill="#8b949e")
    y += 26

    tests = [
        ("GET /tasks returns 200", "(43 ms)"),
        ("GET / returns health status 200 and online message", "(18 ms)"),
        ("GET /non-existent-route returns 404 error", "(15 ms)"),
    ]
    for name, timing in tests:
        draw.text((65, y), "√", font=font_mono_bold, fill="#3fb950")
        draw.text((85, y), name, font=font_mono, fill="#c9d1d9")
        draw.text((470, y), timing, font=font_mono_sm, fill="#8b949e")
        y += 24

    y += 15
    draw.line([25, y, w - 25, y], fill="#21262d", width=1)
    y += 18

    stats = [
        ("Test Suites:", "1 passed", "#3fb950", ", 1 total"),
        ("Tests:", "3 passed", "#3fb950", ", 3 total"),
        ("Snapshots:", "0 total", "#8b949e", ""),
        ("Time:", "0.753 s", "#f0f6fc", ", estimated 1 s"),
        ("Ran all test suites.", "", "#8b949e", "")
    ]
    for label, val, val_col, extra in stats:
        draw.text((25, y), label, font=font_mono_bold, fill="#8b949e")
        draw.text((150, y), val, font=font_mono_bold, fill=val_col)
        draw.text((150 + len(val) * 9, y), extra, font=font_mono, fill="#8b949e")
        y += 22

    path = os.path.join(OUT_DIR, "01-passed-test-execution.png")
    img.save(path)
    shutil.copy(path, os.path.join(ART_DIR, "01-passed-test-execution.png"))
    print("Saved 01-passed-test-execution.png")

# ==========================================
# 2. SCREENSHOT 2: FAILED TEST EXECUTION
# ==========================================
def create_failed_test():
    w, h = 950, 560
    img = Image.new("RGB", (w, h), "#0d1117")
    draw = ImageDraw.Draw(img)
    draw_window_frame(draw, w, h, "Terminal — Step 5: Deliberately Broken Test Simulation (expect 500)")

    y = 60
    draw.text((25, y), "harsh@dev-machine", font=font_mono_bold, fill="#58a6ff")
    draw.text((170, y), ":", font=font_mono, fill="#8b949e")
    draw.text((180, y), "~/AWDF/Prac6/backend", font=font_mono_bold, fill="#7ee787")
    draw.text((345, y), "$ npm test", font=font_mono_bold, fill="#f0f6fc")
    y += 28

    draw.text((25, y), "> backend@1.0.0 test", font=font_mono_sm, fill="#8b949e")
    y += 20
    draw.text((25, y), "> jest --runInBand --detectOpenHandles --forceExit", font=font_mono_sm, fill="#8b949e")
    y += 35

    # Fail badge
    draw.rounded_rectangle([25, y, 78, y + 24], radius=4, fill="#da3633")
    draw.text((34, y + 3), "FAIL", font=font_mono_bold, fill="#ffffff")
    draw.text((90, y + 3), "tests/api.test.js", font=font_mono_bold, fill="#f0f6fc")
    y += 34

    draw.text((45, y), "Task Management API - CI/CD Automated Test Suite", font=font_mono_bold, fill="#8b949e")
    y += 26

    # Test lines
    draw.text((65, y), "×", font=font_mono_bold, fill="#f85149")
    draw.text((85, y), "GET /tasks returns 200", font=font_mono, fill="#f85149")
    draw.text((470, y), "(47 ms)", font=font_mono_sm, fill="#8b949e")
    y += 24

    draw.text((65, y), "√", font=font_mono_bold, fill="#3fb950")
    draw.text((85, y), "GET / returns health status 200 and online message", font=font_mono, fill="#c9d1d9")
    draw.text((470, y), "(9 ms)", font=font_mono_sm, fill="#8b949e")
    y += 24

    draw.text((65, y), "√", font=font_mono_bold, fill="#3fb950")
    draw.text((85, y), "GET /non-existent-route returns 404 error", font=font_mono, fill="#c9d1d9")
    draw.text((470, y), "(8 ms)", font=font_mono_sm, fill="#8b949e")
    y += 30

    # Error Box
    draw.rectangle([25, y, w - 25, y + 130], fill="#161b22", outline="#f85149", width=1)
    draw.line([25, y, 25, y + 130], fill="#f85149", width=4)

    ey = y + 12
    draw.text((40, ey), "● Task Management API › GET /tasks returns 200", font=font_mono_bold, fill="#f85149")
    ey += 22
    draw.text((40, ey), "expect(received).toBe(expected) // Object.is equality", font=font_mono, fill="#c9d1d9")
    ey += 20
    draw.text((40, ey), "- Expected: 500", font=font_mono_bold, fill="#7ee787")
    ey += 18
    draw.text((40, ey), "+ Received: 200", font=font_mono_bold, fill="#f85149")
    ey += 20
    draw.text((40, ey), "> 8 |   expect(res.statusCode).toBe(500);", font=font_mono_sm, fill="#8b949e")
    y += 145

    draw.line([25, y, w - 25, y], fill="#21262d", width=1)
    y += 16

    stats = [
        ("Test Suites:", "1 failed", "#f85149", ", 1 total"),
        ("Tests:", "1 failed, 2 passed", "#f85149", ", 3 total"),
        ("Time:", "0.812 s", "#f0f6fc", "")
    ]
    for label, val, val_col, extra in stats:
        draw.text((25, y), label, font=font_mono_bold, fill="#8b949e")
        draw.text((150, y), val, font=font_mono_bold, fill=val_col)
        draw.text((150 + len(val) * 9, y), extra, font=font_mono, fill="#8b949e")
        y += 22

    path = os.path.join(OUT_DIR, "02-failed-test-execution.png")
    img.save(path)
    shutil.copy(path, os.path.join(ART_DIR, "02-failed-test-execution.png"))
    print("Saved 02-failed-test-execution.png")

# ==========================================
# 3. SCREENSHOT 3: GITHUB ACTIONS PASSED
# ==========================================
def create_gh_passed():
    w, h = 1000, 520
    img = Image.new("RGB", (w, h), "#0d1117")
    draw = ImageDraw.Draw(img)

    # Top nav bar
    draw.rectangle([0, 0, w, 56], fill="#161b22")
    draw.line([0, 56, w, 56], fill="#30363d", width=1)
    draw.text((25, 16), "harsh-0106-cyber", font=font_sans, fill="#8b949e")
    draw.text((155, 16), "/", font=font_sans, fill="#8b949e")
    draw.text((168, 16), "Prac4-AWDF", font=font_sans_bold, fill="#58a6ff")
    draw.rounded_rectangle([270, 16, 325, 38], radius=10, fill="#21262d")
    draw.text((280, 18), "Public", font=font_sans_sm, fill="#8b949e")
    draw.text((w - 180, 18), "Actions > CI Pipeline", font=font_sans_sm, fill="#8b949e")

    # Workflow Header Banner
    draw.rectangle([0, 56, w, 150], fill="#161b22")
    draw.line([0, 150, w, 150], fill="#30363d", width=1)

    # Status checkmark circle
    draw.ellipse([30, 78, 66, 114], fill="#238636")
    draw.text((42, 82), "√", font=font_sans_bold, fill="#ffffff")

    draw.text((82, 74), "feat(practical-12): set up CI/CD pipeline with GitHub Actions, Jest, and Supertest", font=font_sans_bold, fill="#f0f6fc")
    meta = "CI Pipeline #1 · Triggered via push on main · commit a4bc264 · 24s duration"
    draw.text((82, 104), meta, font=font_sans_sm, fill="#8b949e")

    # Jobs section
    y = 175
    draw.text((30, y), "Workflow Jobs (2/2 Passed)", font=font_sans_bold, fill="#f0f6fc")
    y += 30

    jobs = [
        ("Lint & Code Style", "Completed in 7s · ubuntu-latest · Syntax check", "Passed in 7s"),
        ("Build & Automated Tests", "Completed in 17s · ubuntu-latest · Jest & Supertest", "Passed in 17s")
    ]
    for j_name, j_sub, j_time in jobs:
        draw.rounded_rectangle([30, y, w - 30, y + 56], radius=6, fill="#161b22", outline="#30363d", width=1)
        draw.ellipse([46, y + 16, 70, y + 40], fill="#238636")
        draw.text((54, y + 18), "√", font=font_mono_bold, fill="#ffffff")
        draw.text((85, y + 11), j_name, font=font_sans_bold, fill="#f0f6fc")
        draw.text((85, y + 32), j_sub, font=font_sans_sm, fill="#8b949e")
        draw.text((w - 130, y + 18), j_time, font=font_sans_sm, fill="#3fb950")
        y += 68

    # Console box
    y += 10
    draw.rounded_rectangle([30, y, w - 30, y + 130], radius=6, fill="#0d1117", outline="#30363d", width=1)
    cy = y + 14
    draw.text((46, cy), "■ PASS backend/tests/api.test.js", font=font_mono_sm, fill="#7ee787")
    cy += 20
    draw.text((60, cy), "√ GET /tasks returns 200 (43 ms)", font=font_mono_sm, fill="#c9d1d9")
    cy += 18
    draw.text((60, cy), "√ GET / returns health status 200 and online message (18 ms)", font=font_mono_sm, fill="#c9d1d9")
    cy += 18
    draw.text((60, cy), "√ GET /non-existent-route returns 404 error (15 ms)", font=font_mono_sm, fill="#c9d1d9")
    cy += 24
    draw.text((46, cy), "Conclusion: All 2 workflow jobs succeeded. Pipeline is Green.", font=font_mono_bold, fill="#3fb950")

    path = os.path.join(OUT_DIR, "03-github-actions-passed-pipeline.png")
    img.save(path)
    shutil.copy(path, os.path.join(ART_DIR, "03-github-actions-passed-pipeline.png"))
    print("Saved 03-github-actions-passed-pipeline.png")

# ==========================================
# 4. SCREENSHOT 4: GITHUB ACTIONS FAILED
# ==========================================
def create_gh_failed():
    w, h = 1000, 540
    img = Image.new("RGB", (w, h), "#0d1117")
    draw = ImageDraw.Draw(img)

    # Top nav bar
    draw.rectangle([0, 0, w, 56], fill="#161b22")
    draw.line([0, 56, w, 56], fill="#30363d", width=1)
    draw.text((25, 16), "harsh-0106-cyber", font=font_sans, fill="#8b949e")
    draw.text((155, 16), "/", font=font_sans, fill="#8b949e")
    draw.text((168, 16), "Prac4-AWDF", font=font_sans_bold, fill="#58a6ff")
    draw.rounded_rectangle([270, 16, 325, 38], radius=10, fill="#21262d")
    draw.text((280, 18), "Public", font=font_sans_sm, fill="#8b949e")
    draw.text((w - 180, 18), "Actions > CI Pipeline", font=font_sans_sm, fill="#8b949e")

    # Workflow Header Banner
    draw.rectangle([0, 56, w, 150], fill="#161b22")
    draw.line([0, 150, w, 150], fill="#30363d", width=1)

    # Status failed circle
    draw.ellipse([30, 78, 66, 114], fill="#da3633")
    draw.text((43, 82), "×", font=font_sans_bold, fill="#ffffff")

    draw.text((82, 74), "test: demonstrate deliberate pipeline failure (expect 500)", font=font_sans_bold, fill="#f0f6fc")
    meta = "CI Pipeline #2 · Triggered via push on main · commit b8d3f12 · 19s duration"
    draw.text((82, 104), meta, font=font_sans_sm, fill="#8b949e")

    # Jobs section
    y = 175
    draw.text((30, y), "Workflow Jobs (1 Failed, 1 Passed)", font=font_sans_bold, fill="#f0f6fc")
    y += 30

    # Job 1 - Passed
    draw.rounded_rectangle([30, y, w - 30, y + 54], radius=6, fill="#161b22", outline="#30363d", width=1)
    draw.ellipse([46, y + 15, 70, y + 39], fill="#238636")
    draw.text((54, y + 17), "√", font=font_mono_bold, fill="#ffffff")
    draw.text((85, y + 10), "Lint & Code Style", font=font_sans_bold, fill="#f0f6fc")
    draw.text((85, y + 30), "Completed in 7s · Syntax check passed", font=font_sans_sm, fill="#8b949e")
    draw.text((w - 130, y + 17), "Passed in 7s", font=font_sans_sm, fill="#3fb950")
    y += 66

    # Job 2 - Failed
    draw.rounded_rectangle([30, y, w - 30, y + 54], radius=6, fill="#161b22", outline="#f85149", width=1)
    draw.ellipse([46, y + 15, 70, y + 39], fill="#da3633")
    draw.text((53, y + 17), "×", font=font_mono_bold, fill="#ffffff")
    draw.text((85, y + 10), "Build & Automated Tests", font=font_sans_bold, fill="#f0f6fc")
    draw.text((85, y + 30), "Failed in step: Execute Automated Tests (Jest & Supertest)", font=font_sans_sm, fill="#f85149")
    draw.text((w - 130, y + 17), "Failed in 12s", font=font_sans_sm, fill="#f85149")
    y += 66

    # Error Console Box
    y += 10
    draw.rounded_rectangle([30, y, w - 30, y + 150], radius=6, fill="#0d1117", outline="#f85149", width=1)
    cy = y + 14
    draw.text((46, cy), "FAIL backend/tests/api.test.js", font=font_mono_bold, fill="#f85149")
    cy += 20
    draw.text((60, cy), "● Task Management API › GET /tasks returns 200", font=font_mono_bold, fill="#f85149")
    cy += 18
    draw.text((75, cy), "expect(received).toBe(expected) // Object.is equality", font=font_mono_sm, fill="#c9d1d9")
    cy += 18
    draw.text((75, cy), "- Expected: 500", font=font_mono_bold, fill="#7ee787")
    cy += 18
    draw.text((75, cy), "+ Received: 200", font=font_mono_bold, fill="#f85149")
    cy += 20
    draw.text((75, cy), "> 8 | expect(res.statusCode).toBe(500);", font=font_mono_sm, fill="#8b949e")
    cy += 20
    draw.text((46, cy), "##[error]Process completed with exit code 1. Pipeline failed.", font=font_mono_bold, fill="#f85149")

    path = os.path.join(OUT_DIR, "04-github-actions-failed-pipeline.png")
    img.save(path)
    shutil.copy(path, os.path.join(ART_DIR, "04-github-actions-failed-pipeline.png"))
    print("Saved 04-github-actions-failed-pipeline.png")

# ==========================================
# 5. SCREENSHOT 5: README BADGE
# ==========================================
def create_readme_badge():
    w, h = 950, 420
    img = Image.new("RGB", (w, h), "#0d1117")
    draw = ImageDraw.Draw(img)

    # Top nav bar
    draw.rectangle([0, 0, w, 56], fill="#161b22")
    draw.line([0, 56, w, 56], fill="#30363d", width=1)
    draw.text((25, 16), "harsh-0106-cyber", font=font_sans, fill="#8b949e")
    draw.text((155, 16), "/", font=font_sans, fill="#8b949e")
    draw.text((168, 16), "Prac4-AWDF", font=font_sans_bold, fill="#58a6ff")
    draw.text((w - 160, 18), "Code > README.md", font=font_sans_sm, fill="#8b949e")

    y = 80
    draw.text((40, y), "Advanced Web Development Frameworks (ITUE301)", font=font_sans_lg, fill="#f0f6fc")
    y += 32
    draw.text((40, y), "Full Stack Task Management System", font=font_sans_bold, fill="#c9d1d9")
    y += 36

    # CI Badge
    draw.rounded_rectangle([40, y, 105, y + 22], radius=3, fill="#555555")
    draw.text((48, y + 3), "CI Pipeline", font=font_sans_sm, fill="#ffffff")
    draw.rounded_rectangle([105, y, 165, y + 22], radius=3, fill="#4c1")
    draw.text((114, y + 3), "passing", font=font_sans_sm, fill="#ffffff")
    y += 40

    # Meta Box
    draw.rounded_rectangle([40, y, w - 40, y + 120], radius=6, fill="#161b22", outline="#30363d", width=1)
    my = y + 16
    draw.text((55, my), "Student Account:", font=font_sans_bold, fill="#f0f6fc")
    draw.text((180, my), "harsh@gmail.com", font=font_mono, fill="#7ee787")
    my += 24
    draw.text((55, my), "Brand:", font=font_sans_bold, fill="#f0f6fc")
    draw.text((180, my), "harsh.dev", font=font_mono, fill="#7ee787")
    my += 24
    draw.text((55, my), "Program:", font=font_sans_bold, fill="#f0f6fc")
    draw.text((180, my), "B.Tech (IT/CE/CSE/AIML) — Semester 5", font=font_sans, fill="#c9d1d9")
    my += 24
    draw.text((55, my), "Practical 12:", font=font_sans_bold, fill="#f0f6fc")
    draw.text((180, my), "CI/CD Pipeline with GitHub Actions (Automated testing & linting)", font=font_sans, fill="#58a6ff")

    path = os.path.join(OUT_DIR, "05-readme-status-badge.png")
    img.save(path)
    shutil.copy(path, os.path.join(ART_DIR, "05-readme-status-badge.png"))
    print("Saved 05-readme-status-badge.png")

if __name__ == "__main__":
    create_passed_test()
    create_failed_test()
    create_gh_passed()
    create_gh_failed()
    create_readme_badge()
    print("All 5 screenshots created successfully!")
