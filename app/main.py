"""
API Merge Video - terima 3 URL video dari n8n, merge, simpan hasil ke folder video.
"""
import os
import shutil
import uuid
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from pydantic import BaseModel, HttpUrl, Field

from .config import VIDEO_OUTPUT_DIR
from .video_merger import ensure_temp_dir, download_video, merge_videos


class MergeRequest(BaseModel):
    """Request dari n8n: 3 URL video + nama untuk file hasil."""
    video_url_1: HttpUrl = Field(..., description="URL video pertama")
    video_url_2: HttpUrl = Field(..., description="URL video kedua")
    video_url_3: HttpUrl = Field(..., description="URL video ketiga")
    nama_animasi: str = Field(..., min_length=1, description="Nama file hasil (tanpa .mp4)")


@asynccontextmanager
async def lifespan(app: FastAPI):
    ensure_temp_dir()
    yield
    # cleanup optional


app = FastAPI(
    title="Merge Video Service",
    description="Terima 3 URL video, merge, simpan hasil ke folder video. Untuk dipanggil dari n8n.",
    version="1.0.0",
    lifespan=lifespan,
)


@app.get("/")
async def root():
    return {
        "service": "merge-video",
        "docs": "/docs",
        "endpoint": "POST /merge — merge 3 video, simpan ke folder video (isi folder dibersihkan dulu)",
        "body": "video_url_1, video_url_2, video_url_3, nama_animasi",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/video/{filename}")
async def get_video(filename: str):
    """Download file hasil merge dari folder video."""
    if ".." in filename or "/" in filename or "\\" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    video_dir = Path(VIDEO_OUTPUT_DIR).resolve()
    file_path = (video_dir / filename).resolve()
    if not file_path.is_file() or file_path.parent != video_dir:
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, media_type="video/mp4", filename=filename)


def _cleanup_temp(paths: list[str], *extra: str) -> None:
    for p in paths:
        try:
            os.unlink(p)
        except OSError:
            pass
    for p in extra:
        try:
            os.unlink(p)
        except OSError:
            pass


def _ensure_video_dir() -> str:
    """Buat folder video jika belum ada, return path absolut."""
    path = Path(VIDEO_OUTPUT_DIR).resolve()
    path.mkdir(parents=True, exist_ok=True)
    return str(path)


def _clear_video_folder() -> None:
    """Hapus semua file di folder video supaya tidak menumpuk (hemat storage)."""
    video_dir = Path(VIDEO_OUTPUT_DIR).resolve()
    if not video_dir.exists():
        return
    for f in video_dir.iterdir():
        if f.is_file():
            try:
                f.unlink()
            except OSError:
                pass


@app.post("/merge")
async def merge_and_save(body: MergeRequest, request: Request):
    """
    Download 3 video dari URL, merge jadi satu, simpan ke folder video.
    Sebelum simpan, isi folder video dihapus dulu (supaya tidak menumpuk).
    Nama file = nama_animasi.mp4. Response menyertakan URL untuk akses file.
    """
    _clear_video_folder()
    run_id = str(uuid.uuid4())[:8]
    temp_dir = ensure_temp_dir()
    prefix = os.path.join(temp_dir, f"merge_{run_id}_")
    urls = [body.video_url_1.unicode_string(), body.video_url_2.unicode_string(), body.video_url_3.unicode_string()]
    paths = []
    out_path = f"{prefix}merged.mp4"
    try:
        for i, url in enumerate(urls, 1):
            path = f"{prefix}part{i}.mp4"
            download_video(url, path)
            paths.append(path)
        merge_videos(paths, out_path)
        safe_name = "".join(c for c in body.nama_animasi if c.isalnum() or c in " ._-") or "animasi"
        filename = f"{safe_name}.mp4"
        video_dir = _ensure_video_dir()
        dest_path = os.path.join(video_dir, filename)
        shutil.copy2(out_path, dest_path)
        base = str(request.base_url).rstrip("/")
        file_url = f"{base}/video/{filename}"
        return {
            "success": True,
            "message": "Video berhasil di-merge dan disimpan ke folder video.",
            "file_name": filename,
            "file_url": file_url,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        _cleanup_temp(paths, out_path)
