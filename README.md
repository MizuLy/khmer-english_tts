# Khmer/English TTS + OCR

A simple web app to type Khmer or English text, hear it spoken aloud, save it as an MP3, and (WIP) extract text from images.

## Features
- Type Khmer or English text → hear it spoken
- Save any generated speech as an MP3
- Plain HTML/CSS/JS frontend, no build step
- FastAPI backend using [gTTS](https://pypi.org/project/gTTS/) (Google Translate TTS)

## Requirements
- Python 3.9+
- (Optional, for OCR features) [Tesseract OCR](https://github.com/UB-Mannheim/tesseract/wiki) with the Khmer language pack (`khm.traineddata`)

## Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/MizuLy/khmer-english_tts.git
   cd khmer-english_tts
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate it**
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - Windows (Git Bash):
     ```bash
     . venv/Scripts/activate
     ```
   - Windows (CMD/PowerShell):
     ```
     venv\Scripts\activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the server**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

6. **Open the app**
   Go to [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

## Notes
- Internet access is required — gTTS calls Google's TTS endpoint under the hood, it doesn't work offline.
- gTTS is unofficial (not a paid API) — fine for personal/testing use, but can get temporarily rate-limited if hit with a lot of requests quickly.
- If you plan to use the OCR/image-import feature, install Tesseract separately (it's a system binary, not a Python package) and make sure the Khmer language data (`khm.traineddata`) is in its `tessdata` folder.

## Project structure
```
khmer-tts-ocr/
├── main.py              # FastAPI backend
├── requirements.txt
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── audio_output/         # generated mp3s land here (gitignored)
└── README.md
```
