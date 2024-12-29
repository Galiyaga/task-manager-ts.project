import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Help = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 700, margin: '150px auto'}} >
      <Typography variant="h4" gutterBottom>
        Вы столкнулись с трудностями при авторизации.
      </Typography>
      <Typography variant="body1" gutterBottom>
        При нажатии кнопки авторизации с правильными данными для входа могла
        отобразиться ошибка прохождении капчи. Это означает, что сервер
        запрашивает подтверждении моего аккаунта, который необходимо совершить на
        сайте, предоставляюющей API.
      </Typography>
      <Typography variant="body1">
        Пожалуйста, сообщите мне, если это произошло,
        <Link href="mailto:galiyaga@yandex.ru" sx={{ marginLeft: "4px" }}>
          по email
        </Link>
        {' или '}
        <Link href="https://t.me/hikitzo" target="blank">
          в телеграм
        </Link>
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ display: "block" }}>
        Я сделаю всё возможное для того, чтобы Вы смогли продолжить просмотр
        проекта.
      </Typography>
    </Box>
  );
};
