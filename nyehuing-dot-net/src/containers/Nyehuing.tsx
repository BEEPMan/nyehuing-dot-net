import React from 'react';
import { TextField, Button, Typography, Snackbar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import { make_nyehuing, copy } from '../scripts/nyehuing_maker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[200],
    },
    secondary: {
      main: '#FFD700'
    }
  },
});

const useStyle = makeStyles({
  NyehuingMaker: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  Title: {
    fontFamily: 'CookieRunRegular',
    color: 'white',
    fontSize: '45px',
  },
  Paragraph: {
    marginTop: '5px',
    marginBottom: '5px',
  },
  Description: {
    display: 'inline-block',
    fontFamily: 'CookieRunRegular',
    color: 'white',
    fontSize: '20px',
    marginLeft: '5px',
    marginRight: '15px',
  },
  Button: {
    fontFamily: 'CookieRunRegular',
    fontSize: '20px',
    color: 'white',
    display: 'inline-block',
    width: '56px',
    paddingTop: '2px',
    paddingBottom: '2px',
    minWidth: '56px',
  },
  Nyehuing: {
    display: 'inline-block',
    fontFamily: 'CookieRunRegular',
    color: 'pink',
    fontSize: '30px',
  },
  TextField: {
    verticalAlign: 'middle',
    width: '35px',
  },
  TextFieldText: {
    fontFamily: 'inherit',
    fontSize: '150%',
    color: 'pink',
  }
});

const Nyehuing: React.FC = () => {
  const style = useStyle();
  const [length, setLength] = React.useState(2);
  const [isOpen, setOpen] = React.useState(false);
  const [nyehuing, setNyehuing] = React.useState('여기에 녜힁 출력');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.valueAsNumber);
  };

  const NyehuingMake = () => {
    setNyehuing(make_nyehuing(length));
  }

  const NyehuingClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
    copy(nyehuing);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className={style.NyehuingMaker}>
      <Typography className={style.Title}>★랜덤 녜힁 제조기★</Typography>

      <Button disableRipple={true} className={style.Nyehuing} onClick={NyehuingClick} children={nyehuing} />

      <div className={style.Paragraph}>
        <ThemeProvider theme={theme}>
          <TextField type="number" InputLabelProps={{ shrink: true }} onChange={NyehuingClick} value={2} className={style.TextField} color='primary' InputProps={{ className: style.TextFieldText }} />
          <Typography className={style.Description}>글자의 닉네임을  생성!</Typography>
          <Button className={style.Button} variant="contained" color="primary" size="small" onClick={NyehuingMake}>Go</Button>
        </ThemeProvider>
      </div>

      <Typography paragraph={true} className={style.Description}>
        (!) 닉네임을 클릭시 자동으로 복사가 됩니다.(일부 브라우저 제외)
      </Typography>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isOpen} onClose={handleClose} message="녜힁이 복사되었습니다." />
    </div>

  );
}

export default Nyehuing;