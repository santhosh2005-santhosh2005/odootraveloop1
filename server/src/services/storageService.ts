import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Storage configuration
const UPLOADS_DIR = path.join(__dirname, '../../uploads/files');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

/**
 * Upload a file to storage.
 * Handles both raw Buffers and Multer file objects.
 */
export async function uploadFile(
  fileOrBuffer: Buffer | any,
  originalName?: string,
  mimeType?: string
): Promise<{ path: string; url: string }> {
  // If it's a Multer file object, it's already on disk
  if (fileOrBuffer && typeof fileOrBuffer === 'object' && 'path' in fileOrBuffer) {
    return {
      path: fileOrBuffer.filename, // We store the relative filename in the DB
      url: `/api/files/${fileOrBuffer.filename}`
    };
  }

  // Otherwise, it's a Buffer that we need to save
  const fileId = uuidv4();
  const extension = originalName ? path.extname(originalName) : '';
  const fileName = `${fileId}${extension}`;
  const filePath = path.join(UPLOADS_DIR, fileName);

  await fs.promises.writeFile(filePath, fileOrBuffer);

  return {
    path: fileName,
    url: `/api/files/${fileName}`
  };
}

/**
 * Delete a file from storage
 */
export async function deleteFile(filePath: string): Promise<void> {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(fileName: string): string {
  return `/api/files/${fileName}`;
}
