"""
Jalankan server: uvicorn app.main:app --host 0.0.0.0 --port 8000
"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(__import__("os").environ.get("PORT", "8000")),
        reload=__import__("os").environ.get("ENV", "production") != "production",
    )
