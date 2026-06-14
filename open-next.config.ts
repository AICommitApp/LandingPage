import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Fully static marketing site — no incremental cache / R2 / image bindings needed.
export default defineCloudflareConfig();
