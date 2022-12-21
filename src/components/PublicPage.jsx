/* eslint-disable */
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import backImg from "src/assets/images/landing-page-bg.png";
import Footer from 'src/container/Footer';
import NavBar from 'src/container/NavBar';
import Head from "next/head";

function PublicPage({
    children,
    title,
    handleClick,
    isAuth = false,
    headerPosition,
    description,
    ...rest
}) {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState('creators');

  // console.log({ backImg });
    return (
        <>
          <Head>
            <title>{title}</title>
            <meta
              name="description"
              content={description}
            />
            <meta  />
          </Head>
          <Grid
            container
            spacing={1}
            sx={{
              backgroundImage: `url(${backImg.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              backgroundPosition: '50%',
              minHeight: '100vh',
              margin: 0,
              width: '100% !important',
              backgroundColor: '#5e189b',
              scrollBehavior:'smooth',
            }}

          >
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                // alignItems: 'center',
                flexDirection: 'column',
                paddingLeft: '0px !important',
                width: '100%',
                scrollBehavior:'smooth',
              }}
              item={true}
            >
              <NavBar positionTop={headerPosition} handleData={handleClick} navBarShow={isAuth} />
              <Box {...rest}>{children}</Box>
              <Footer positionBottom={headerPosition} footBarShow={isAuth} />
            </Grid>
          </Grid>
        </>
    );
}

export default PublicPage;
