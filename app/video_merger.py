"""
Download 3 video dari URL lalu merge dengan ffmpeg (concat demuxer).
"""
import os
import subprocess
from pathlib import Path

import httpx

from .config import TEMP_DIR, DOWNLOAD_TIMEOUT, MAX_FILE_SIZE


def ensure_temp_dir():
    Path(TEMP_DIR).mkdir(parents=True, exist_ok=True)
    return TEMP_DIR


def download_video(url: str, dest_path: str) -> str:
    """Download video dari URL ke path lokal. Return path file."""
    with httpx.stream(
        "GET", url, follow_redirects=True, timeout=DOWNLOAD_TIMEOUT
    ) as r:
        r.raise_for_status()
        content_length = r.headers.get("content-length")
        if content_length and int(content_length) > MAX_FILE_SIZE:
            raise ValueError(f"File terlalu besar: {content_length} bytes")
        with open(dest_path, "wb") as f:
            total = 0
            for chunk in r.iter_bytes(chunk_size=8192):
                total += len(chunk)
                if total > MAX_FILE_SIZE:
                    os.unlink(dest_path)
                    raise ValueError("File melebihi ukuran maksimum")
                f.write(chunk)
    return dest_path


def merge_videos(paths: list[str], output_path: str) -> str:
    """
    Merge beberapa file video dengan ffmpeg concat demuxer.
    paths: list path file video (urutan = urutan merge)
    output_path: path file output
    """
    if len(paths) < 2:
        raise ValueError("Minimal 2 video untuk di-merge")
    list_path = output_path + ".concat.txt"
    with open(list_path, "w", encoding="utf-8") as f:
        for p in paths:
            # ffmpeg concat format: file 'path' (escape single quote)
            escaped = p.replace("'", "'\\''")
            f.write(f"file '{escaped}'\n")
    cmd = [
        "ffmpeg",
        "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", list_path,
        "-c", "copy",
        output_path,
    ]
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=3600,
    )
    try:
        os.unlink(list_path)
    except OSError:
        pass
    if result.returncode != 0:
        raise RuntimeError(
            f"ffmpeg error: {result.stderr or result.stdout or 'unknown'}"
        )
    return output_path
