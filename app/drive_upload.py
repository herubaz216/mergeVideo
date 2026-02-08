"""
Upload file ke Google Drive folder 'animasi'.
Mendukung credentials dari file (GOOGLE_APPLICATION_CREDENTIALS) atau
dari env GOOGLE_DRIVE_CREDENTIALS_JSON (string JSON) untuk Render.
"""
import io
import json
import os
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

from .config import ANIMASI_FOLDER_ID, GOOGLE_DRIVE_CREDENTIALS_JSON, GOOGLE_APPLICATION_CREDENTIALS

SCOPES = ["https://www.googleapis.com/auth/drive.file"]


def _get_credentials():
    if GOOGLE_DRIVE_CREDENTIALS_JSON:
        info = json.loads(GOOGLE_DRIVE_CREDENTIALS_JSON)
        return service_account.Credentials.from_service_account_info(
            info, scopes=SCOPES
        )
    path = GOOGLE_APPLICATION_CREDENTIALS or os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if path and Path(path).exists():
        return service_account.Credentials.from_service_account_file(
            path, scopes=SCOPES
        )
    raise RuntimeError(
        "Set GOOGLE_DRIVE_CREDENTIALS_JSON (isi JSON) atau "
        "GOOGLE_APPLICATION_CREDENTIALS (path ke file JSON)"
    )


def upload_to_animasi_folder(local_path: str, drive_filename: str) -> dict:
    """
    Upload file ke folder animasi di Google Drive.
    Returns: dict dengan id, name, webViewLink (jika ada).
    """
    if not ANIMASI_FOLDER_ID:
        raise RuntimeError("ANIMASI_FOLDER_ID belum di-set di environment")
    creds = _get_credentials()
    service = build("drive", "v3", credentials=creds)
    # Pastikan nama berakhiran .mp4 jika belum
    if not drive_filename.lower().endswith(".mp4"):
        drive_filename = drive_filename.rstrip(".") + ".mp4"
    file_metadata = {
        "name": drive_filename,
        "parents": [ANIMASI_FOLDER_ID],
    }
    media = MediaFileUpload(
        local_path,
        mimetype="video/mp4",
        resumable=True,
    )
    f = (
        service.files()
        .create(
            body=file_metadata,
            media_body=media,
            fields="id, name, webViewLink",
        )
        .execute()
    )
    return {
        "id": f.get("id"),
        "name": f.get("name"),
        "webViewLink": f.get("webViewLink"),
    }
