"use server";

export async function subscribeAction(formData: FormData, userGroup: string) {
  const email = formData.get("email") as string;

  // FORCER LE MODE OFFLINE - Toujours utiliser le mock
  const isDevelopment = true;

  if (isDevelopment) {
    console.log(`[DEV] Subscription simulée pour ${email} dans le groupe ${userGroup}`);
    return {
      success: true,
      message: "Inscription simulée en mode développement",
    };
  }

  const res = await fetch(
    "https://app.loops.so/api/newsletter-form/cm0bd20vj03imyjzv74y1crnb",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        userGroup,
      }),
    },
  );

  const json = await res.json();

  return json;
}
