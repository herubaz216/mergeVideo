import os
import tempfile
from dotenv import load_dotenv

load_dotenv()

# Temp directory untuk file saat proses (Windows: pakai %TEMP%)
_default_temp = os.path.join(tempfile.gettempdir(), "merge_video")
TEMP_DIR = os.getenv("TEMP_DIR", _default_temp)
# Folder hasil merge (relatif terhadap working dir atau path absolut)
VIDEO_OUTPUT_DIR = os.getenv("VIDEO_OUTPUT_DIR", "video")
# Timeout download (detik)
DOWNLOAD_TIMEOUT = int(os.getenv("DOWNLOAD_TIMEOUT", "300"))
# Max size per file (bytes) - 500MB
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "524288000"))
