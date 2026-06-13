import { supabase } from './supabase';

/**
 * Upload an image file to Supabase Storage and return its public URL.
 *
 * @param file   The File object selected from an <input type="file" />.
 * @param folder Optional folder inside the bucket (defaults to "projects").
 * @returns      The publicly accessible URL of the uploaded image.
 */
export async function uploadImage(file: File, folder: string = 'projects'): Promise<string> {
  // Generate a random filename to avoid collisions.
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { data, error } = await supabase.storage.from('project_images').upload(fileName, file, {
    cacheControl: '3600', // 1 hour cache – adjust as needed
    upsert: false,
  });

  if (error) {
    console.error('Supabase upload error:', error);
    throw error;
  }

  // Get the public URL for the uploaded object.
  const { data: { publicUrl } } = supabase.storage.from('project_images').getPublicUrl(data.path);
  return publicUrl;
}
