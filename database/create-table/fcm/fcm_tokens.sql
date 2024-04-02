CREATE TABLE IF NOT EXISTS "public"."fcm_tokens" (
    "user_id" "uuid" NOT NULL,
    "token" "text" NOT NULL,
    "subscribed_topics" "text"[] DEFAULT '{}'::text[] NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone
);

ALTER TABLE "public"."fcm_tokens" OWNER TO "postgres";

ALTER TABLE ONLY "public"."fcm_tokens"
    ADD CONSTRAINT "fcm_tokens_pkey" PRIMARY KEY ("user_id", "token");

ALTER TABLE ONLY "public"."fcm_tokens"
    ADD CONSTRAINT "fcm_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users_public"("user_id");

ALTER TABLE "public"."fcm_tokens" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."fcm_tokens" TO "anon";
GRANT ALL ON TABLE "public"."fcm_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."fcm_tokens" TO "service_role";
