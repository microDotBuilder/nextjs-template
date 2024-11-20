import { createEnv } from "@t3-oss/env-nextjs";
import { ZodError, z } from "zod";

export const env = createEnv({
    isServer: typeof window === "undefined",

    server: {
        NODE_ENV: z.enum(["development", "production"]),
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
        CLERK_SECRET_KEY: z.string().min(1),
    },
    onValidationError: (error: ZodError) => {
        console.error(
            "❌ Invalid environment variables:",
            error.flatten().fieldErrors
        );
        process.exit(1);
    },
    // Called when server variables are accessed on the client.
    onInvalidAccess: () => {
        throw new Error(
            "❌ Attempted to access a server-side environment variable on the client"
        );
    },

    // eslint-disable-next-line n/no-process-env
    experimental__runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});