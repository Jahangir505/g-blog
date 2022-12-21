/* eslint-disable */
import { Box, Grid, styled, Typography } from "@mui/material";
import Link from 'next/link';

import facebookIcon from "src/assets/icons/facebook_svg_icon.svg";
import instagramIcon from "src/assets/icons/instagram_svg_icon.svg";
import linkedInIcon from "src/assets/icons/linkedin_svg_icon.svg";
import twitterIcon from "src/assets/icons/twitter_svg_icon.svg";
import appStoreIcon from "src/assets/images/applePlayStore.png";
import googlePlayIcon from "src/assets/images/appPlayStore.png";
import Image from "next/image";


function Footer({ positionBottom = { md: "sticky", sm: "" }, footBarShow }) {
  return (
    <Grid
      paddingY={3}
      container
      sx={{
        position: positionBottom,
        bottom: 0,
        paddingRight: "32px",
        paddingLeft: "20px",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid item={true} md={4} sm={4} xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fefefe",
              fontSize: "12px",
              opacity: 1,
            }}
          >
            &copy; {new Date().getFullYear()} Expli Oy
          </Typography>
          <Typography
            sx={{
              color: "#fefefe !important",
              marginLeft: "30px",
              fontSize: "12px",
              opacity: 1,
              "& a": {
                color: "#fff",
              },
            }}
          >
            <Link href="https://glostars.com/privacyPolicy">Privacy Policy</Link>
          </Typography>
          <Typography
            sx={{
              color: "#fefefe !important",
              marginLeft: "30px",
              fontSize: "12px",
              opacity: 1,
              "& a": {
                color: "#fff",
              },
            }}
          >
            <Link href="https://glostars.com/terms">Terms</Link>
          </Typography>
        </Box>
      </Grid>
      <Grid item={true} md={4} sm={4} xs={12}/>
      <Grid item={true} md={4} sm={4} xs={12}>
          
        {!footBarShow && (
          <Box

            sx={{
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: '10px'
            }}
          >

              <a
                href="https://apps.apple.com/fi/app/glostars/id1583087526"
                target="_blank"
                rel="noopener noreferrer"

              >
                <Image width={90} sx={{ height: {md: 30, sm: 25, xs:20} }} src={appStoreIcon} alt="App Store" />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.glostars.photos.android.app"
                target="_blank"
                rel="noopener noreferrer"

              >
                <Image
                  sx={{ height: {md: 30, sm: 25, xs:20} }}
                  src={googlePlayIcon}
                  width={90}
                  alt="Google Play"
                />
              </a>

            <a
              style={{
                color: "#fff",
                fontSize: "24px",
              }}
              href="https://fi-fi.facebook.com/Glostars/"
              className="social-icon-link"
              target="_blank"
            >
              <Image width={30} height={30}  src={facebookIcon} alt="icon" />
            </a>
            <a
              style={{
                color: "#fff",
                fontSize: "24px",
              }}
              href="https://www.instagram.com/glostarsofficial/?hl=fi"
              className="social-icon-link"
              target="_blank"
            >
              <Image width={30} height={30}  src={instagramIcon} alt="icon" />
            </a>
            <a
              style={{
                color: "#fff",
                fontSize: "24px",
              }}
              href="https://mobile.twitter.com/glostarsltd"
              className="social-icon-link"
              target="_blank"
            >
              <Image width={30} height={30}  src={twitterIcon} alt="icon" />
            </a>

            {/* <a
              style={{
                color: "#fff",
                fontSize: "24px",
              }}
              href="https://fi.pinterest.com/glostarsofficial/"
              className="social-icon-link"
              target="_blank"
            >
              <Image  src={pinterestIcon} alt="icon" />
            </a> */}

            <a
              style={{
                color: "#fff",
                fontSize: "24px",
              }}
              href="https://fi.linkedin.com/company/glostars?original_referer=https%3A%2F%2Fwww.google.com%2F"
              className="social-icon-link"
              target="_blank"
            >
              <Image width={30} height={30}  src={linkedInIcon} alt="icon" />
            </a>
            
            {/* <a
              style={{
                color: "#fff",
                fontSize: "24px",
              }}
              href="https://www.youtube.com/channel/UC-TsszNCBj6QbmLvRwczGLQ"
              className="social-icon-link"
              target="_blank"
            >
              <Image  src={youtubeIcon} alt="icon" />
            </a> */}
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Footer;
