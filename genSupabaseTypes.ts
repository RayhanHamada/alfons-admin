import fs from 'fs/promises';
import openapiTS from 'openapi-typescript';
import path from 'path';

(async () => {
  await openapiTS(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
  )
    .then(async (output) => {
      console.log('done fetching openapi');
      await fs
        .writeFile(
          path.resolve(__dirname, 'src', 'customTypes', 'supabase.ts'),
          output,
          'utf8'
        )
        .then(() => {
          console.log('done generate type');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(() => {
      console.log('error fetching openapi');
      process.exit(1);
    });
})();
