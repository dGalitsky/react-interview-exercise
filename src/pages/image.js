import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, IconButton } from "@material-ui/core";
import axios from "axios";
import { MdFileDownload } from "react-icons/md";

import Layout from "../components/layout";
import CenteredModal from "../components/centeredModal";
import ImageZoom from "../components/imageZoom";
import RelatedImages from "../components/relatedImages";
import ErrorMessage from "../components/errorMessage";
import resize from "../utils/resize";

const ENDPOINT = "https://picsum.photos/id/:id/info";

const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const endpoint = ENDPOINT.replace(":id", id);
        const { data } = await axios.get(endpoint);
        if (typeof data !== "object") {
          setErr(data);
        } else {
          setImage(data);
          setLoading(false);
        }
      } catch (err) {
        setErr(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Layout>
      {err && <ErrorMessage />}
      {!loading ? (
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
                  srcSet={`${resize(image.download_url, 2560)} 2x, ${resize(
                    image.download_url,
                    1280
                  )} 1x`}
                  src={resize(image.download_url, 1280)}
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

          <RelatedImages id={id} />
        </>
      ) : (
        "Please wait a moment..."
      )}
    </Layout>
  );
};

export default ImagePage;
