// client/src/hooks/usePushNotifications.ts
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string;

export type PushStatus = "unsupported" | "denied" | "subscribed" | "unsubscribed" | "loading";

export function usePushNotifications() {
  const [status, setStatus] = useState<PushStatus>("loading");

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }
    const reg = await navigator.serviceWorker.getRegistration("/sw.js");
    if (!reg) { setStatus("unsubscribed"); return; }
    const sub = await reg.pushManager.getSubscription();
    setStatus(sub ? "subscribed" : "unsubscribed");
  }

  async function subscribe() {    
    if (!VAPID_PUBLIC_KEY) {
      console.error("VITE_VAPID_PUBLIC_KEY is not set");
      return;
    }

    setStatus("loading");

    try {
      // Register service worker
      const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      await navigator.serviceWorker.ready;

      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }

      // Subscribe to push
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY,
      });

      const json = sub.toJSON();

      // Save to Supabase
      await supabase.from("push_subscriptions").upsert(
        {
          endpoint: json.endpoint!,
          p256dh: json.keys!.p256dh,
          auth: json.keys!.auth,
          user_agent: navigator.userAgent.slice(0, 200),
        },
        { onConflict: "endpoint" }
      );

      setStatus("subscribed");
    } catch (err) {
      console.error("Push subscribe failed:", err);
      setStatus("unsubscribed");
    }
  }

  async function unsubscribe() {
    setStatus("loading");
    try {
      const reg = await navigator.serviceWorker.getRegistration("/sw.js");
      if (reg) {
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          await supabase
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", sub.endpoint);
          await sub.unsubscribe();
        }
      }
      setStatus("unsubscribed");
    } catch (err) {
      console.error("Push unsubscribe failed:", err);
      setStatus("unsubscribed");
    }
  }

  return { status, subscribe, unsubscribe };
}