import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [{ label: "Home", path: "/" }];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My React App
          </Typography>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              component={Link}
              to={item.path}
              sx={{
                textDecoration: "none",
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
              }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
