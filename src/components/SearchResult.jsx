import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions
} from "@material-ui/core";
import {slugify} from "../helpers";

export default  ({test:{results, baseUri}})=>(
    <>
    <Grid container spacing={4}>
        {results.map(recipe => (<Grid item s={12} md={4} xl={4} key={recipe.id} >
            <Card>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="300"
                    src={baseUri + recipe.image}
                    title="Menu pic" />
                    <CardContent>
        <Typography gutterBottom variant="subtitle1" component="h2" >{recipe.title}</Typography>
        <Typography gutterBottom variant="overline">Cooking time: {recipe.readyInMinutes} minutes</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
              <Link to={`recipe/${recipe.id}/${slugify(recipe.title)}`}>
                <Button size="small" color="primary">
                  Go and cook this fabulous dish
                </Button>
              </Link>
            </CardActions>
            </Card>
        </Grid>))}
    </Grid>
    </>
)