import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';

const useStyle = makeStyles({
  SubTitle1: {
    fontFamily: 'CookieRunRegular',
    fontSize: '30px',
    color: 'white'
  },
  SubTitle2: {
    fontFamily: 'CookieRunRegular',
    fontSize: '25px',
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
