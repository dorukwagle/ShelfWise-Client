import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface ButtonText {
    yes: string;
    no?: string;
}

interface Props {
    buttonText: ButtonText;
    title: string;
    body: string;
    show: boolean;
    onYes?: () => void;
    onNo?: () => void;
}

const InfoModel = ({ show, buttonText, title, body, onYes, onNo }: Props) => {
  const handleClickYes = () => onYes && onYes();

  const handleClickNo = () => onNo && onNo();

  return (
    <>
      <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { buttonText.no && <Button onClick={handleClickNo}>{buttonText.no}</Button>}
          <Button onClick={handleClickYes} autoFocus>
            {buttonText.yes}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InfoModel;