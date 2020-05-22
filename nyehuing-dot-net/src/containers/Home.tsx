import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyle = makeStyles({
  SubTitle1: {
    fontFamily: 'CookieRunRegular',
    fontSize: '30px',
    color: 'white',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  SubTitle2: {
    fontFamily: 'CookieRunRegular',
    fontSize: '40px',
    color: 'gold',
  },
});

const Home: React.FC = () => {
  const style = useStyle();
  return (
    <div>
      <Typography className={style.SubTitle1}>
        하찮았지만 귀찮았던것을 대신 해주는 사이트.
      </Typography>
      <Typography className={style.SubTitle2}>
        ★녜힁 닷넷★
      </Typography>
    </div>

  )
};

export default Home;
