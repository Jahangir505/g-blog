/* eslint-disable */
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import Link from 'next/link'
import { isEmpty } from "src/helpers/functions";


function getRandomColor(color = null) {
  if (color) {
    return color;
  }
  const colors = [
    "teal",
    "yellow",
    "blue",
    "primary",
    "secondary",
    "danger",
    "warning",
    "info",
    "success",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const BlogItem = ({ item }) => {
  const color = getRandomColor(item?.color);
  const cover = isEmpty(item?.cover)
    ? "https://picsum.photos/seed/picsum/400/300"
    : item.cover;

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, []);
  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        height: "250px",
        width: "100%",
      }}
      className="blog-item bg-image-center"
      // style={{ backgroundImage: `url(${cover})` }}
    >
     <Link href={`/${item.slug}`} passHref >
      <Box
        sx={{
          transition: "all 0.5s ease-in-out",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: .5,
          position: 'absolute',

          "&:hover": {
            transition: "all 0.5s ease-in-out",
            transform: "scale(1.3)",
            opacity: 1,
          },
        }}
        component="img"
        src={cover}
        alt={item?.cover_alt}
      />
      </Link>
      {/*<Link href={`/${item.slug}`} passHref>*/}
        <Box
          sx={{
            // backgroundColor: "rgba(#000, 0.4)",
            padding: "20px",
            width: "100%",
            height: "100%",
            background: '#00000073',
          }}
        >
          <Box
            sx={{
              padding: "1px 3px",
              fontSize: "10px",
              color: "#fefefe",
              backgroundColor: "#555",
              display: "inline-block",
              position: "absolute",
              top: "10px",
              left: "10px",
              background: `${color}`,
              fontWeight: 600,
            }}
          >
            {item.category}
          </Box>
          <Box
            sx={{ position: "absolute", left: "10px", bottom: "20px" }}
            className="item-titles"
          >
            <Typography
              sx={{
                margin: "2px 0",
                color: "#fefefe",
                fontSize: "18px",
                textDecoration: "none",
                marginBottom: "5px",
                transition: "0.4s ease",

                "& a": {
                  color: "#fefefe",

                  "&:hover": {
                    color: "#fefefe",
                    textDecoration: "underline",
                  },
                },
              }}
              component="h3"
            >
              <Link href={`/${item.slug}`} passHref>{item.title}</Link>
            </Typography>
            <Typography
              sx={{
                paddingRight: "25px",
                margin: "2px 0",
                fontSize: "13px",
                color: "#fefefe",
              }}
              component="h6"
            >
              {item.sub_title}
            </Typography>
          </Box>
          <Link passHref href={`/${item.slug}`}>
            <IconButton
              sx={{
                textDecoration: "none",
                borderRadius: "50%",
                position: "absolute",
                right: "10px",
                bottom: "15px",
                overflow: "hidden",
                width: "25px",
                height: "25px",
                backgroundColor: "#dddddd7a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "0.4s ease",
                outline: "none",

                "&:hover": {
                  backgroundColor: "#ddd",
                },
              }}
            >
               <ArrowForwardIosIcon sx={{ width: 12 }} />
            </IconButton>
          </Link>
        </Box>
      {/*</Link>*/}
    </Box>
  );
};

export default BlogItem;
