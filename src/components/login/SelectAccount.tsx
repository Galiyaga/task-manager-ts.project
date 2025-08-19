import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import React, { useCallback, useState } from "react";

export type AccountType = {
    email: string,
    password: string
}

type SelectAccountPropsType = {
  open: boolean,
  accounts: AccountType[],
  onClose: (account: AccountType | null) => void
}

export const  SelectAccount = React.memo((props: SelectAccountPropsType) => {

  const [selectedValue, setSelectedValue] = useState<AccountType | null> (null)

  const handleClose = useCallback((account: AccountType | null) => {
    if (account) {
      setSelectedValue(account);
      props.onClose(account)
    } else props.onClose(null)
  }, [ props.onClose]);


  return (
    <div>
      <Dialog onClose={() => handleClose(null)} open={props.open} closeAfterTransition={false}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
          {props.accounts.map((account) => (
            <ListItem disablePadding key={account.email}>
              <ListItemButton onClick={() => handleClose(account)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={account.email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
})
