import { loginThunk } from "./authThunk";
import { setError } from "./errorSlice";
import { setLoading } from "./loadingSlice";
import { fetchTodolist } from "./todolistsThunks";
import {
  createListenerMiddleware,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

export const successLoginMiddleware = createListenerMiddleware();
export const errorMiddleware = createListenerMiddleware();
export const isLoadingMiddleware = createListenerMiddleware();

successLoginMiddleware.startListening({
  actionCreator: loginThunk.fulfilled,
  effect: async (_action, listenerApi) => {
    try {
      await listenerApi.dispatch(fetchTodolist());
    } catch (error) {
      console.error("Failed to fetch todolists after authorization", error);
    }
  },
});

errorMiddleware.startListening({
  matcher: isRejected,
  effect: async (action, listenerApi) => {
    const errorMesssage: string | undefined =
      (action.payload as string | undefined) || "An unknown error occurred";

    listenerApi.dispatch(setError(errorMesssage));
  },
});

isLoadingMiddleware.startListening({
  matcher: isPending,
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(setLoading(true));
  },
});

isLoadingMiddleware.startListening({
  matcher: isFulfilled || isRejected,
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(setLoading(false));
  },
});
