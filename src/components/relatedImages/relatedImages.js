import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

const ENDPOINT = "https://picsum.photos/id/:id/400";

const RelatedImage = ({ id }) => (
  <Grid item xs={6} sm={4} lg={2}>
    <Link to={`/image/${id}`}>
      <img src={ENDPOINT.replace(":id", id)} style={{ width: "100%" }} />
    </Link>
  </Grid>
);

const RelatedImages = ({ id }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages([3, 4, 5, 6, 7, 8]);
  }, []);
  return (
    <div>
      <Typography variant="h5">Related images</Typography>

      <Grid container spacing={2} justify="space-between">
        {images.map(id => (
          <RelatedImage key={id} id={id} />
        ))}
      </Grid>
    </div>
  );
};

export default RelatedImages;
