import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button
} from "@material-ui/core";
import { MdFavorite } from "react-icons/md";
import axios from "axios";

import Layout from "../components/layout";
import InfiniteScroll from "../components/infiniteScroll";
import resize from '../utils/resize'

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
      // TODO: error handling
      alert(err);
    }
  }

  likeImage = () => {};

  render() {
    const { images } = this.state;
    const cards = images.map(image => (
      <Grid item xs={6} sm={4} lg={2} key={image.id}>
        <Card>
          <CardHeader title={image.author || "Unknown author"} />
          <Link to={`/image/${image.id}`}>
            <CardMedia
              style={{ paddingTop: "56.25%" }}
              image={resize(image.download_url, 400)}
              title={image.author}
            />
          </Link>
          <CardActions disableSpacing>
            <Button>
              <MdFavorite /> 0
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));

    return (
      <Layout>
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
