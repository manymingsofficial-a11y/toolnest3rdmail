'use client';

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

let ffmpegInstance: FFmpeg | null = null;
let initPromise: Promise<void> | null = null;
let isInitializing = false;

export async function getFFmpeg(): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;

  if (!initPromise) {
    if (isInitializing) {
      await initPromise;
      return ffmpegInstance!;
    }

    isInitializing = true;
    initPromise = (async () => {
      try {
        const ffmpeg = new FFmpeg();
        await ffmpeg.load({
          coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/ffmpeg-core.js',
        });
        ffmpegInstance = ffmpeg;
      } catch (error) {
        isInitializing = false;
        initPromise = null;
        throw error;
      }
      isInitializing = false;
    })();
  }

  await initPromise;
  return ffmpegInstance!;
}

export function resetFFmpeg() {
  ffmpegInstance = null;
  initPromise = null;
  isInitializing = false;
}

export async function runFFmpeg(
  args: string[],
  inputFiles: Array<{ name: string; data: Uint8Array | File }>,
  outputFileName: string
): Promise<Uint8Array> {
  const ffmpeg = await getFFmpeg();

  for (const file of inputFiles) {
    const data = file.data instanceof File ? await fetchFile(file.data) : file.data;
    // fetchFile returns Uint8Array | ArrayBuffer, cast to Uint8Array for writeFile
    ffmpeg.writeFile(file.name, data as Uint8Array);
  }

  try {
    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile(outputFileName);
    return new Uint8Array(data as Uint8Array);
  } finally {
    for (const file of inputFiles) {
      try {
        ffmpeg.deleteFile(file.name);
      } catch {
        // ignore
      }
    }
    try {
      ffmpeg.deleteFile(outputFileName);
    } catch {
      // ignore
    }
  }
}

export function revokeObjectUrl(url: string) {
  try {
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}