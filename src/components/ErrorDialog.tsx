import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../state/errorSlice';
import { AppDispatch, AppRootStateType } from '../state/store';
import { useNavigate } from 'react-router-dom';

export const GlobalErrorDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const errorMessage = useSelector(
      (state: AppRootStateType) => state.error.message
    );
  
    const handleClose = () => {
      dispatch(setError(''))
      navigate(-1)
    };
  return (
    <>
      <Dialog
        open={!!errorMessage}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"There was a problem"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
          try again
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}