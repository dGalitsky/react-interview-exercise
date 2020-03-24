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

const ENDPOINT = "https://picsum.photos/v2/list";
const IMAGES_LIMIT = 10;

class Homepage extends React.Component {
  state = {
    images: [],
    err: null,
    done: false
  };

  componentDidMount() {
    this.getImages();
  }

  appendImages(newImages) {
    this.setState(ps => ({
      images: ps.images.concat(newImages)
    }));
  }

  async getImages(page = 1) {
    try {
      const { data } = await axios.get(ENDPOINT, {
        params: { page, limit: IMAGES_LIMIT }
      });
      if (data.length) {
        this.appendImages(data);
      } else {
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
          <Link to={image.url}>
            <CardMedia
              style={{ paddingTop: "56.25%" }}
              image={image.download_url}
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
          <Grid container spacing={2}>
            {cards}
          </Grid>
        )}
      </Layout>
    );
  }
}

export default Homepage;
