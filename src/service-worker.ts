import { precacheAndRoute } from "workbox-precaching";

declare const self: WorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
