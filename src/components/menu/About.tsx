import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const About = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "100%", maxWidth: 1200, margin: "80px auto" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Немного о проекте
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body1" gutterBottom>
            Я рада, что Вы заинтересовались моим портфолио и рассматриваете одну
            из моих работ. Визуал приложения не так красив, как мог бы быть, так
            как я почти не использую вёрстку и всё внимание уделила работе
            функционала. Сейчас я бы хотела рассказать Вам, какой стек
            технологий я использовала при разработке этого небольшого
            приложения.
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ display: "block" }}>
            Данный веб-сайт разработан с помощью{" "}
            <strong>create-react-app</strong> и <strong>TypeScript</strong> и
            осуществляет возможность добавления, удаления, фильтрации и
            редактирования задач, используя современные инструменты для
            разработки. <br />
            Такие как:
            <ul>
              <li>функциональные React-компоненты и хуки</li>
              <li>хранилище Store и срезы Slice</li>
              <li>база данных Redux-toolkit</li>
              <li>
                управление состоянем через синхронные reducers и асинхронные
                extraReducers
              </li>
              <li>маршрутизация Routes</li>
              <li>
                сохранение токена и других данных с сервера во временном
                хранилище localStorage
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ display: "block" }}>
            В данном проекте ведется работа с сервером с помощью axios и
            createAsyncThunk. В ходе разработки веб-сайта были применены
            приниципы KISS и DRY, а также принцип иммутабельности. Для
            тестирования thunks, reducers, extraReducer были написаны юнит-тесты
            согласно принципу TDD и направляли и корректировали работу на
            протяжении всей разработки. Также использовался Storybook для
            тестирования api-запросов, был создан decorater и подключались
            визуальные тесты с помощью Cromatic. Проект оптимизирован благодаря
            мемоизации компонентов и функций обратного вызова с помощью
            React.memo и useCallback. Обработка ошибок и отображение загрузки
            осуществляется с помощью глобальных компонентов.
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ display: "block" }}>
            Проект оптимизирован благодаря мемоизации компонентов и функций
            обратного вызова с помощью React.memo и useCallback. Обработка
            ошибок и отображение загрузки осуществляется с помощью глобальных
            компонентов.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
