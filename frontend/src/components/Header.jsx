import React from "react";

import { Box, Container, Stack, Typography } from "@mui/material";

const Header = ({ title, icon }) => {
  return (
    <Box
      sx={{
        py: 10,
        background: (theme) =>
          `linear-gradient(to right bottom, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
        color: "primary.contrastText",
      }}
    >
      <Container>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {icon}
          <Typography variant="h5"> {title}</Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
