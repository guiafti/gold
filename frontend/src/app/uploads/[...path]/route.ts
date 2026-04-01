import { readFile } from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: parts } = await params;
    const filename = parts.join("/");
    const safeFilename = filename.replace(/\.\./g, "");

    const primaryPath = path.resolve(
      process.cwd(),
      "..",
      "backend",
      "storage",
      "uploads",
      safeFilename
    );

    const legacyPath = path.resolve(
      process.cwd(),
      "public",
      "uploads",
      safeFilename
    );

    let data: Buffer;
    let ext: string;
    try {
      data = await readFile(primaryPath);
      ext = path.extname(primaryPath).toLowerCase();
    } catch {
      data = await readFile(legacyPath);
      ext = path.extname(legacyPath).toLowerCase();
    }

    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
