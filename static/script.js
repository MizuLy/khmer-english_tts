const textInput = document.getElementById("textInput");
const langSelect = document.getElementById("langSelect");
const playBtn = document.getElementById("playBtn");
const saveBtn = document.getElementById("saveBtn");
const audioPlayer = document.getElementById("audioPlayer");
const statusEl = document.getElementById("status");
const fileInput = document.getElementById("fileInput");
const ocrStatus = document.getElementById("ocrStatus");

// ---- Play button: hit /speak, stream mp3 straight into <audio> ----
playBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();
  if (!text) return (statusEl.textContent = "Type something first.");

  statusEl.textContent = "Generating audio...";
  playBtn.disabled = true;

  try {
    const form = new FormData();
    form.append("text", text);
    form.append("lang", langSelect.value);

    const res = await fetch("/speak", { method: "POST", body: form });
    if (!res.ok) throw new Error(await res.text());

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioPlayer.src = url;
    audioPlayer.style.display = "block";
    audioPlayer.play();
    statusEl.textContent = "";
  } catch (err) {
    statusEl.textContent = "Error: " + err.message;
  } finally {
    playBtn.disabled = false;
  }
});

// ---- Save button: hit /speak (same as Play), then save the blob directly ----
saveBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();
  if (!text) return (statusEl.textContent = "Type something first.");

  statusEl.textContent = "Saving mp3...";
  saveBtn.disabled = true;

  try {
    const form = new FormData();
    form.append("text", text);
    form.append("lang", langSelect.value);

    const res = await fetch("/speak", { method: "POST", body: form });
    if (!res.ok) throw new Error(await res.text());

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "speech.mp3";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    statusEl.textContent = "Saved as speech.mp3";
  } catch (err) {
    statusEl.textContent = "Error: " + err.message;
  } finally {
    saveBtn.disabled = false;
  }
});
