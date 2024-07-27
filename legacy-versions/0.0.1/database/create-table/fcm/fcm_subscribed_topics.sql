CREATE TABLE IF NOT EXISTS "public"."fcm_subscribed_topics" (
    "user_id" "uuid" NOT NULL,
    "topic" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone
);

ALTER TABLE "public"."fcm_subscribed_topics" OWNER TO "postgres";

ALTER TABLE ONLY "public"."fcm_subscribed_topics"
    ADD CONSTRAINT "fcm_subscribed_topics_pkey" PRIMARY KEY ("user_id", "topic");

ALTER TABLE ONLY "public"."fcm_subscribed_topics"
    ADD CONSTRAINT "fcm_subscribed_topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users_public"("user_id");

CREATE POLICY "can view only user" ON "public"."fcm_subscribed_topics" FOR SELECT TO "authenticated" USING (("user_id" = "auth"."uid"()));

ALTER TABLE "public"."fcm_subscribed_topics" ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE "public"."fcm_subscribed_topics" TO "anon";
GRANT ALL ON TABLE "public"."fcm_subscribed_topics" TO "authenticated";
GRANT ALL ON TABLE "public"."fcm_subscribed_topics" TO "service_role";
