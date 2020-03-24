import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Grid, IconButton, Typography } from "@material-ui/core";
import axios from "axios";
import { MdFileDownload } from "react-icons/md";

import Layout from "../components/layout";

const ENDPOINT = "https://picsum.photos/id/:id/info";

const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});

  useEffect(async () => {
    try {
      const endpoint = ENDPOINT.replace(":id", id);
      const { data } = await axios.get(endpoint);
      if (typeof data !== "object") {
      }
      setImage(data);
    } catch (err) {
      // TODO: error handling,
      alert(err);
    }
  }, []);

  return (
    <Layout>
      {!image && "Please wait a moment..."}
      {image && (
        <React.Fragment>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item>
                  <IconButton href={image.download_url}>
                    <MdFileDownload />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <img
                width="100%"
                src={image.download_url}
                alt={`An image by ${image.author}`}
              />
              Author: {image.author}
            </Grid>
          </Grid>
          <div>
            <Typography variant="h5">Related images</Typography>
            <Grid container spacing={2} justify="space-between">
              <Grid item>
                <Link to="/image/0">First</Link>
              </Grid>
              <Grid item>
                <Link to="/image/1">Second</Link>
              </Grid>
              <Grid item>
                <Link to="/image/2">Third</Link>
              </Grid>
              <Grid item>
                <Link to="/image/3">Fourth</Link>
              </Grid>
              <Grid item>
                <Link to="/image/4">Fifth</Link>
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default ImagePage;
