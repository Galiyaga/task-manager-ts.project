import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string,
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    
  return (
      editMode ? <TextField variant="standard" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/> : <span onDoubleClick={activateEditMode} >{props.title}</span>
  )
}