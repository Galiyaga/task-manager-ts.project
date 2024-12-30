import { Snackbar, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const LoginInstructions = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setSnackbarMessage("Текст скопирован");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Ошибка при копировании:", err);
        setSnackbarMessage("Ошибка при копировании текста");
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Stack
        sx={{ width: "100%", maxWidth: 600, margin: "150px auto" }}
        spacing={2}
      >
        <Typography variant="h4" gutterBottom>
          Данные для авторизации
        </Typography>
        <Typography
          variant="body1"
          onClick={() => handleCopy("galiyaga@yandex.ru")}
          sx={{ cursor: "pointer" }}
        >
          Логин: galiyaga@yandex.ru
        </Typography>
        <Typography
          variant="body1"
          onClick={() => handleCopy("galiya")}
          sx={{ cursor: "pointer", marginBottom: "16px" }}
        >
          Пароль: galiya
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ display: "block" }}>
          Более удобный способ для авторизации размещен в форме авторизации по
          кнопке &quot;Select an account to view the project&ldquo;
        </Typography>
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          autoHideDuration={1200}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Stack>
      <Stack
        sx={{ width: "100%", maxWidth: 600, margin: "150px auto" }}
        spacing={2}
      >
        <Typography variant="h4" gutterBottom>
          Authorization data
        </Typography>
        <Typography
          variant="body1"
          onClick={() => handleCopy("galiyaga@yandex.ru")}
          sx={{ cursor: "pointer" }}
        >
          Login: galiyaga@yandex.ru
        </Typography>
        <Typography
          variant="body1"
          onClick={() => handleCopy("galiya")}
          sx={{ cursor: "pointer", marginBottom: "16px" }}
        >
          Password: galiya
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ display: "block" }}>
          A more convenient method for authorization is located in the
          authorization form using the &quot;Select an account to view the project&ldquo;
          button
        </Typography>
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          autoHideDuration={1200}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Stack>
    </Box>
  );
};
