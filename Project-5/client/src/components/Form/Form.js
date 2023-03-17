import useStyles from "./styles";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { createPost, updatePost } from "../../actions/post";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const Form = ({ current_id, setcurrent_id }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    current_id ? state.posts.find((post) => post._id === current_id) : null
  );
  const [postData, setPostData] = useState({
    creator: "",
    message: "",
    title: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();

  useEffect(() => {
    if (current_id) setPostData(post);
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(postData);
    if (!current_id) dispatch(createPost(postData));
    else {
      dispatch(updatePost(current_id, postData));
    }
    clear();
  };

  const clear = () => {
    setcurrent_id(null);
    setPostData({
      creator: "",
      message: "",
      title: "",
      tags: "",
      selectedFile: "",
    });
  };
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
        <Typography variant="h6">
          {current_id ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />

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
            setPostData({ ...postData, tags: e.target.value.split(",") })
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
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
