import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Grid, IconButton, Typography } from "@material-ui/core";
import axios from "axios";
import { MdFileDownload } from "react-icons/md";

import Layout from "../components/layout";
import CenteredModal from "../components/centeredModal";
import ImageZoom from "../components/imageZoom";

const ENDPOINT = "https://picsum.photos/id/:id/info";

const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, [id]);

  return (
    <Layout>
      {!image && "Please wait a moment..."}
      {image && (
        <>
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
              <a
                href={image.download_url}
                onClick={e => {
                  e.preventDefault();
                  setModalOpen(true);
                }}
              >
                <img
                  width="100%"
                  src={image.download_url}
                  alt={`Author: ${image.author}`}
                />
              </a>
              Author: {image.author}
            </Grid>
          </Grid>

          <CenteredModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
            disableAutoFocus
          >
            <ImageZoom
              src={image.download_url}
              alt={`Author: ${image.author}`}
            />
          </CenteredModal>

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
        </>
      )}
    </Layout>
  );
};

export default ImagePage;
