import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 4,
        textAlign: "center",
        py: 2,
      }}
    >
      <Typography variant="body2">
        Ahmad Alabed - {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
