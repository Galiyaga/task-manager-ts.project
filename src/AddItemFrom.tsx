import { ChangeEvent, KeyboardEvent, useState } from "react";

type ItemFormPropsType = {
    addItem: (title: string) => void;
};

export function AddItemForm(props: ItemFormPropsType) {

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
    e.charCode === 13 && handleAddTasks();
    setError(null);
  };

  return (
    <div>
    <input
          className={error ? "error" : ""}
          type="text"
          required
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={handleAddTasks}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
  )
}