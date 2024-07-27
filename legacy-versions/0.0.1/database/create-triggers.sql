CREATE OR REPLACE TRIGGER "insert_feedback_webhook" AFTER INSERT
ON "public"."feedbacks" FOR EACH ROW
EXECUTE FUNCTION "supabase_functions"."http_request"(
    'https://jdrnvhppizwxhjjhisxd.supabase.co/functions/v1/insert-feedback-webhook',
    'POST',
    '{"Content-type":"application/json"}',
    '{"secret":"{INTERNAL_ACCESS_KEY}"}',
    '1000'
);
