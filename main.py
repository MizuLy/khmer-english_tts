from gtts import gTTS
from fastapi.staticfiles import StaticFiles
from fastapi.responses import Response, FileResponse
from fastapi import FastAPI,  Form
import uuid
import os
import io


app = FastAPI()

AUDIO_DIR = "audio_output"
os.makedirs(AUDIO_DIR, exist_ok=True)


@app.post("/speak")
async def speak(text: str = Form(...), lang: str = Form("km")):
    """
    Convert text to speech and stream back mp3 bytes directly (no save).
    lang: 'km' for Khmer, 'en' for English
    """
    tts = gTTS(text=text, lang=lang)
    buf = io.BytesIO()
    tts.write_to_fp(buf)
    buf.seek(0)
    return Response(content=buf.read(), media_type="audio/mpeg")


@app.post("/speak-and-save")
async def speak_and_save(text: str = Form(...), lang: str = Form("km")):
    """
    Convert text to speech AND save it as a file on disk, returns a download link.
    """
    filename = f"{uuid.uuid4().hex}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)

    tts = gTTS(text=text, lang=lang)
    tts.save(filepath)

    return {"filename": filename, "url": f"/audio/{filename}"}


@app.get("/audio/{filename}")
async def get_audio(filename: str):
    filepath = os.path.join(AUDIO_DIR, filename)
    return FileResponse(filepath, media_type="audio/mpeg", filename=filename)


# Serve the frontend (index.html, script.js, style.css) from /static
app.mount("/", StaticFiles(directory="static", html=True), name="static")
