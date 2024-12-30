import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";

export const Loading = () => {

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
