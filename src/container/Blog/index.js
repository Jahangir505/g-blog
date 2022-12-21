/* eslint-disable */
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import Link from 'next/link'
import PublicPage from "src/components/PublicPage";
import BlogItem from "./BlogItem";
// eslint-disable-next-line camelcase
import blogPosts from "./content";
import { useEffect, useState } from "react";

const Blog = () => {
  const [activeMenu, setActiveMenu] = useState("blog");
  // useEffect(() => {
  //   setActiveMenu(typeof window.localStorage.getItem('ActiveMenu'));
  // }, []);

  // console.log('Active Menu', activeMenu);
  return (
    <>
      <PublicPage headerPosition="relative" title={"Blog | Glostars"} description={"This is test description"} >

      <Grid container spacing={2}>
        <Grid item={true} md={2} sm={12} position="relative">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 10px",
              position: { md: "fixed", xs: "relative" },
              top: { md: "40%", xs: "20%" },

              "& a": {
                textDecoration: "none",
                outline: "none",
                width: "100%",
                padding: "10px 5px",
                color: "#fefefe",
                fontSize: "20px",
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                transition: "0.4s ease",
                textTransform: "uppercase",

                "&:hover": {
                  color: "#222",
                  backgroundColor: "#e0c016",
                },
              },
            }}
          >
            <Link
              href="https://glostars.com/about"
              replace>About</Link>
            <Link href="/" style={{
              background: activeMenu === 'blog' ? '#e0c016' : "transparent",
              color: activeMenu === 'blog' ? '#222222 !important' : "#fefefe",
            }} replace>Blog</Link>
            <Link
              href="https://glostars.com/faq"
              replace>Faq</Link>
          </Box>
        </Grid>
        <Grid item={true} md={10} sm={12}>
          <Box
            sx={{
              webkitScrollBehavior: "auto",
              overscrollBehavior: "auto contain",
              scrollBehavior: "smooth",
            }}
          >
            <Box
              sx={{
                fontSize: "4em",
                fontWeight: 600,
                margin: 0,
                marginBottom: "0.5em",
                color: "#fefefe",
                textTransform: "uppercase",
              }}
            >
              Blog
            </Box>
            <Box
              sx={{
                fontSize: "1.8em",
                marginBottom: 3,
                color: "#fefefe",
              }}
            >
              Photography News, Tips & Stories
            </Box>
            <Grid
              container
              sx={{ overflow: "hidden", scrollBehavior: "smooth" }}
              className="blog-items"
              style={{ width: '99%' }}
            >
              {blogPosts.length > 0 && blogPosts.map((item, index) => (
                <Grid item={true} md={4} sm={6} xs={12} key={index}>
                  <Box
                    sx={{
                      minHeight: 250,
                      maxHeight: 250,
                      margin: "5px",
                    }}
                    key={item.slug}
                  >
                     <BlogItem item={item} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PublicPage>
    </>
  );
};

export default Blog;
