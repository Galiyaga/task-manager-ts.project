import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Help = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%", maxWidth: 600, margin: "150px auto" }}>
        <Typography variant="h4" gutterBottom>
          Вы столкнулись с трудностями при авторизации.
        </Typography>
        <Typography variant="body1" gutterBottom>
          При нажатии кнопки авторизации с правильными данными для входа могла
          отобразиться ошибка прохождении капчи. Это означает, что сервер
          запрашивает подтверждении моего аккаунта, который необходимо совершить
          на сайте, предоставляюющей API.
        </Typography>
        <Typography variant="body1">
          Пожалуйста, сообщите мне, если это произошло,
          <Link href="mailto:galiyaga@yandex.ru" sx={{ marginLeft: "4px" }}>
            по email
          </Link>
          {" или "}
          <Link href="https://t.me/hikitzo" target="blank">
            в телеграм
          </Link>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ display: "block" }}>
          Я сделаю всё возможное для того, чтобы Вы смогли продолжить просмотр
          проекта.
        </Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 700, margin: "150px auto" }}>
        <Typography variant="h4" gutterBottom>
          You encountered difficulties logging in.
        </Typography>
        <Typography variant="body1" gutterBottom>
          When you clicked the authorization button with the correct login data,
          an error in completing the captcha could be displayed. This means that
          the server is asking for confirmation of my account, which must be
          done on the site that provides the API.
        </Typography>
        <Typography variant="body1">
          Please let me know if this happens
          <Link href="mailto:galiyaga@yandex.ru" sx={{ marginLeft: "4px" }}>
            by email
          </Link>
          {" or "}
          <Link href="https://t.me/hikitzo" target="blank">
            telegram
          </Link>
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ display: "block" }}>
          I will do my best so that you can continue viewing the project.
        </Typography>
      </Box>
    </Box>
  );
};
