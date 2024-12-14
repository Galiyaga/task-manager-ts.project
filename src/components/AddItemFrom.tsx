import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type ItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm = React.memo ( (props: ItemFormPropsType) => {

  const [newItemTitle, setNewItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.target.value);
  };

  const handleAddItem = () => {
    if (newItemTitle.trim().length) {
      props.addItem(newItemTitle.trim());
      setNewItemTitle("");
    } else {
      setError("Заполните поле")
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    e.charCode === 13 && handleAddItem();
  };

  return (
    <div>
    <TextField 
          type="text"
          required
          value={newItemTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          variant="outlined"
          label="Название"
          error={!!error}
          helperText={error}
        />
        <IconButton onClick={handleAddItem} color="primary">
          <ControlPoint />
        </IconButton>
    </div>
  )
})