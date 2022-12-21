/* eslint-disable */
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import Head from 'next/head';
import Link from 'next/link';
import readingTime from "reading-time";
import PublicPage from "src/components/PublicPage";
import RenderdContent from "../container/Blog/RenderdContent";
import { getPost } from "../container/Blog/content";
import { useRouter } from 'next/router'

function BlogPost() {
  const item  = useRouter();
  const navRef = useRef();
  const post = getPost(item?.query?.id);
  // console.log( 'Param', params );
  let stats ;
  if(post) {
    stats = readingTime(post?.content);
  }

  const handleScroll = () => {
    if (!navRef.current) return false;
    const nav = navRef.current.querySelector(".navbar-fixed");
    if (window.scrollY > 100) {
      return nav.classList.add("navbar-bg");
    }
    return nav.classList.remove("navbar-bg");
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // useEffect(() => {
  //   document.title = post?.meta_title ? post?.meta_title : post?.title

  // }, []);
  if (!post) {
    return <Box>Post not found</Box>;
  }
  return (
    <PublicPage
      headerPosition="relative"
      title={post?.meta_title ? post?.meta_title : post?.title}
      description={post?.meta_description ? post?.meta_description: "No description"}
    >

      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(${post.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: 340,
          position: "relative",
          top: -60,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "rgb(62 8 98 / 42%)",
            backgroundBlendMode: "color",
            minHeight: 340,
          }}
        >
          <Grid item={true} md={2} />
          <Grid item={true} md={8}>
            <Box sx={{ minHeight: 200, paddingTop: "10em" }}>
              <Typography
                component="h1"
                sx={{
                  padding: "10px 0px",
                  whiteSpace: "break-spaces",
                  fontSize: {md: '3.5em', sm: '2em', xs: '1.5em'},
                  color: "#fefefe",
                  margin: 0,
                  lineHeight: 1.1,
                  fontWeight: "bold",
                }}
              >
                {post.title}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: "#fefefe",
                  padding: "4px 0",
                  fontWeight: 500,
                  fontSize: {md: "2em", sm: "1.5em", xs: '1.3em'},
                  lineHeight: 1.3,
                  textDecoration: 'none',

                }}
              >
                {post.sub_title}
              </Typography>
              <Box
                sx={{
                  color: "#fefefe",
                  marginTop: "15px",
                  fontSize: "14px",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                className="time"
              >
                {" "}
                <AccessTimeIcon sx={{ fontSize: 14 }} /> ~ {stats?.text}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2} sx={{ marginTop: "-50px" }}>
        {/* text-color-white */}
        <Grid item={true} md={2} xs={12} sx={{ marginBottom: "15px" }}>
          <Box
            sx={{
              display: "inline",
              padding: "15px 10px",
              paddingLeft: "45px",
              position: "sticky",
              top: "10%",

              "& a": {
                color: "#fefefe",
                fontStyle: "normal",
                textDecoration: "none",
              },
            }}
          >
            <Link href="/">Back </Link>
          </Box>
        </Grid>
        <Grid item={true} md={8} xs={12} className="justify-content-center">
          <Box>
            <RenderdContent
              style={{
                padding: "35px",
                backgroundColor: "#fefefe",
                textAlign: "justify",
              }}
              className="post-content article-body"
              post={post?.content}
              disableImageSave={true}
              title={post?.meta_title ? post?.meta_title : post?.title}
              meta_desc={post?.meta_description ? post?.meta_description : "No description"}
            >
              {(component) => <article>{component}</article>}
            </RenderdContent>
          </Box>
        </Grid>
      </Grid>
    </PublicPage>
  );
}

export default BlogPost;
