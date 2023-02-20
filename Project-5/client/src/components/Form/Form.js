import useStyles from "./styles";
import { useState } from "react";
import FileBase from "react-file-base64";
import { Paper, TextField, Button, Typography } from "@material-ui/core";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    message: "",
    title: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();

  const handleSubmit = () =>{
  }
  const clear = () =>{
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, title: e.target.value.split(",") })
          }
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button className = {classes.buttonSubmit} variant = "contained" color = "primary" size = 'large' fullWidth>Submit</Button>
        <Button  variant = "contained" color = "secondary" size = 'small' onClick= {clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
