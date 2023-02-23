import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import {Link} from "react-router-dom";

const Navbar = () => {
  const classes = useStyles();
  const user = null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer} >
        <Typography className={classes.heading} variant="h2" align="center" component={Link} to = '/'>
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height={60}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src = {user.image.imageUrl}></Avatar>
            <Typography className={classes.userName} variant = "h6" >{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color = "secondary"></Button>
            </div>

        ):(
            <Button component = {Link} to = "/auth" variant="contained" color = "primary">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
