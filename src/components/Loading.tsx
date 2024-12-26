import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "../state/store";
import { setLoading } from "../state/loadingSlice";

export const Loading = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoadiing = useSelector(
    (state: AppRootStateType) => state.loading.isLoading
  );

  if (!isLoadiing) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
};
