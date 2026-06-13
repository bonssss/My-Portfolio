// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import { createClient } from '@supabase/supabase-js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// dotenv.config({ path: join(__dirname, '..', '.env') });

// const supabaseUrl = process.env.VITE_SUPABASE_URL;
// const serviceKey = process.env.VITE_SUPABASE_SERVICE_ROLE;

// if (!supabaseUrl || !serviceKey) {
//   console.error('Supabase URL or Service Role key missing in .env');
//   process.exit(1);
// }

// const supabase = createClient(supabaseUrl, serviceKey);

// const email = 'bons6710hos@gmail.com';
// const password = 'Test@1234';

// (async () => {
//   try {
//     const { data, error } = await supabase.auth.admin.createUser({
//       email,
//       password,
//       email_confirmed: true,
//     });
//     if (error) throw error;
//     console.log('User created:', data);
//   } catch (err) {
//     console.error('Error creating user:', err.message);
//     process.exit(1);
//   }
// })();

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', supabaseUrl);
console.log('KEY exists:', !!serviceKey);

if (!supabaseUrl || !serviceKey) {
  throw new Error('Missing env variables');
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function run() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'bons6710hos@gmail.com',
    password: 'Test@1234',
    email_confirm: true,
  });

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('User created:', data);
}

run();