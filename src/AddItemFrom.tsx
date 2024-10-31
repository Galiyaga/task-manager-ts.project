import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type ItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm = React.memo ( (props: ItemFormPropsType) => {
  console.log('AddItemForm is called')

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const handleAddTasks = () => {
    if (newTaskTitle.trim().length) {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else setError("Заполните поле");
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    e.charCode === 13 && handleAddTasks();
  };

  return (
    <div>
    <TextField 
          type="text"
          required
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          variant="outlined"
          label="Название"
          error={!!error}
          helperText={error}
        />
        <IconButton onClick={handleAddTasks} color="primary">
          <ControlPoint />
        </IconButton>
    </div>
  )
})