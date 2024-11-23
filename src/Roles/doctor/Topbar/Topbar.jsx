<AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={handleDrawerToggle}
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div">
      Doctor Dashboard
    </Typography>
  </Toolbar>
</AppBar>
