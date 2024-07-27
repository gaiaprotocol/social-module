import { serveWithOptions } from "../_shared/cors.ts";
import { sendFcmToSpecificUser } from "../_shared/fcm.ts";

serveWithOptions(async (req) => {
  const { secret, receiver, type, data } = await req.json();
  if (!secret || secret !== Deno.env.get("INTERNAL_ACCESS_KEY")) {
    throw new Error("Unauthorized");
  }

  let title: string | undefined;
  let body: string | undefined;
  let icon: string | undefined;

  //TODO:
});
