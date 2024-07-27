import { serveWithOptions } from "../_shared/cors.ts";
import supabase, { getSignedUser } from "../_shared/supabase.ts";

serveWithOptions(async (req) => {
  const user = await getSignedUser(req);
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) throw error;
});
