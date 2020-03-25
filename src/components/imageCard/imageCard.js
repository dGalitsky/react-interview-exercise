import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button
} from "@material-ui/core";
import { MdFavorite } from "react-icons/md";

import resize from "../../utils/resize";

let ImageCard = ({ className, image }) => {
  const [liked, setLiked] = useState(false);
  return (
    image && (
      <Card className={className}>
        <CardHeader title={image.author || "Unknown author"} />
        <Link to={`/image/${image.id}`}>
          <CardMedia
            style={{ paddingTop: "56.25%" }}
            image={resize(image.download_url, 400)}
            title={image.author}
          />
        </Link>
        <CardActions disableSpacing>
          <Button onClick={() => setLiked(!liked)}>
            <MdFavorite color={liked && "red"} /> {liked ? 1 : 0}
          </Button>
        </CardActions>
      </Card>
    )
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string,
    download_url: PropTypes.string
  })
};

ImageCard = styled(ImageCard)`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: fadeIn .5s ease;
`;

export default ImageCard;
