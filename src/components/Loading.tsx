import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";

export const Loading = () => {
  const isLoading = useSelector(
    (state: AppRootStateType) => state.loading.isLoading,
  );

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent", 
        zIndex: 9999,
        pointerEvents: "none",
        opacity: isLoading ? 1 : 0, 
        transition: "opacity 0.2s ease-in-out",
        visibility: isLoading ? "visible" : "hidden",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
