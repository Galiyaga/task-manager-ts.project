import { loginThunk } from "./authThunk";
import { fetchTodolist } from "./todolistsThunks";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const successLoginMiddleware = createListenerMiddleware();

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
