/* eslint-disable */
import { MoreVert } from "@mui/icons-material";
import {
  Box, Grid,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Button
} from "@mui/material";
import { useState } from "react";
import Link from 'next/link';
import logo from "src/assets/images/logo.png";
import Image from 'next/image';

const AuthButton = styled(Button)`
  background-color: transparent;
  text-transform: none;
  padding: 4px 15px;
  width: ${(props) => (props.type === "signup" ? "110px" : "75px")};
  font-size: 14px;
  margin-right: 10px;
  color: #fff;
  font-weight: 500;
  border: ${(props) =>
    props.type === "signup" ? "2px solid #ffffffa1" : "none"};
  border-radius: 20px;
  &:hover {
    background-color: transparent;
    color: #fff;
    border: ${(props) =>
      props.type === "signup" ? "2px solid #ffffff" : "none"};
  }
`;
function NavBar({ positionTop = "sticky", handleData, navBarShow }) {
  const [active, setActive] = useState("creators");
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = "public-right-side-menu";
  const renderMenu = (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          textTransform: "uppercase",
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 24,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <Link href="https://glostars.com/about">About</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="/blog">Blog</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href="https://glostars.com/faq">Faq</Link>
      </MenuItem>
    </Menu>
  );
  return (
    <Box
      sx={{
        position: { md: positionTop, sm: "fixed" },
        top: { md: "10px", sm: 0 },
        zIndex: 99,
        paddingY: 3,
        padding: "8px 0 8px 8px",
        overflow: 'hidden',
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          position: { md: positionTop, sm: "fixed" },
          top: { md: "10px", sm: 0 },
          zIndex: 99,
          paddingLeft: "15px",
        }}
        container
      >
        <Grid item={true} md={4}>
          <Link href="/" passHref sx={{ width: 150, padding: "4px 0" }}>
            <Image
              alt={""}
              src={logo}
              width={150}
            />
          </Link>
        </Grid>
        <Grid item={true} md={4}>
          {/* <Box display="flex" justifyContent="center" alignItems="center">
                        {!navBarShow && (
                            <>
                                <Button
                                    onClick={() => {
                                        handleData('creators');
                                        setActive('creators');
                                    }}
                                    sx={{
                                        backgroundColor: 'transparent',
                                        textTransform: 'capitalize',
                                        borderRadius: '20px',
                                        padding: '4px 15px',
                                        fontWeight: active === 'creators' ? 900 : 400,
                                        fontSize: '14px',
                                        color: '#fff',
                                        width: 130,
                                        '&:hover': {
                                            fontWeight: 900,
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    For Creators
                                </Button>
                                <Divider
                                    sx={{
                                        marginTop: '5px',
                                        width: 2,
                                        backgroundColor: '#fff',
                                        height: '20px',
                                    }}
                                    orientation="vertical"
                                    flexItem
                                />
                                <Button
                                    onClick={() => {
                                        handleData('business');
                                        setActive('business');
                                    }}
                                    sx={{
                                        backgroundColor: 'transparent',
                                        textTransform: 'capitalize',
                                        borderRadius: '20px',
                                        padding: '4px 15px',
                                        fontSize: '14px',
                                        fontWeight: active === 'business' ? 900 : 400,
                                        color: '#fff',
                                        width: 130,
                                        '&:hover': {
                                            fontWeight: 900,
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    For Business
                                </Button>
                            </>
                        )}
                    </Box> */}
        </Grid>
        <Grid item={true} md={4}>
          <Box sx={{ paddingRight: "12px", width: "100%", textAlign: "right" }}>
            <AuthButton type="login" component={Link} href="https://glostars.com/auth/login">
              Log in
            </AuthButton>
            <AuthButton type="signup" component={Link} href="https://glostars.com/auth/register">
              Sign up
            </AuthButton>
            
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              sx={{ color: "#fff" }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      {renderMenu}
    </Box>
  );
}

export default NavBar;
