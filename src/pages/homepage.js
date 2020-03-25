import React from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";

import Layout from "../components/layout";
import InfiniteScroll from "../components/infiniteScroll";
import ImageCard from "../components/imageCard";
import ErrorMessage from "../components/errorMessage";

const ENDPOINT = "https://picsum.photos/v2/list";
const IMAGES_LIMIT = 10;

class Homepage extends React.Component {
  state = {
    images: [],
    nextPage: 1,
    err: null,
    done: false
  };

  componentDidMount() {
    this.getImages();
  }

  appendImages(newImages) {
    this.setState(ps => ({
      images: ps.images.concat(newImages),
      nextPage: ps.nextPage + 1
    }));
  }

  async getImages() {
    if (this.state.done) {
      return;
    }
    try {
      const { data } = await axios.get(ENDPOINT, {
        params: { page: this.state.nextPage, limit: IMAGES_LIMIT }
      });
      if (data.length) {
        this.appendImages(data);
      } else {
        this.setState({ done: true });
      }
    } catch (err) {
      this.setState({ err });
    }
  }

  render() {
    const { images, err } = this.state;
    const cards = images.map(image => (
      <Grid item xs={6} sm={4} lg={2} key={image.id}>
        <ImageCard image={image} />
      </Grid>
    ));

    return (
      <Layout>
        {err && (
          <ErrorMessage
            onReturn={() => {
              this.setState({ err: false });
            }}
          />
        )}
        {images && (
          <InfiniteScroll onBottomHit={() => this.getImages()}>
            <Grid container spacing={2}>
              {cards}
            </Grid>
          </InfiniteScroll>
        )}
      </Layout>
    );
  }
}

export default Homepage;
