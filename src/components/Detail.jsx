import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CardActions,
    Box
  } from "@material-ui/core";
import {slugify} from "../helpers";
const basePicUri = "https://spoonacular.com/cdn/ingredients_100x100/";
const basePicRecipesUri = "https://spoonacular.com/recipeImages/";


export default class Detail extends Component{
    state = {
        ...this.state,
        recipes: {
          loading: false,
          error: false,
          errorMessage: "",
          dataReceived: false,
          data: [],
          steps: [],
          
        },
      };

      componentDidMount(){
          // to make two Api calls at the same time i use axios.all

          let apiIngredients = ` https://api.spoonacular.com/recipes/${this.props.match.params.id}/ingredientWidget.json?${process.env.REACT_APP_SPOON_API_KEY}`;
          let apiSteps = `https://api.spoonacular.com/recipes/${this.props.match.params.id}/analyzedInstructions?${process.env.REACT_APP_SPOON_API_KEY}`;
          let apiSimular = `https://api.spoonacular.com/recipes/${this.props.match.params.id}/similar?${process.env.REACT_APP_SPOON_API_KEY}`;
          const requestOne = axios.get(apiIngredients);
          const requestTwo = axios.get(apiSteps);
          const requestTree = axios.get(apiSimular);
        this.setState({
            ...this.state,
            recipes: {
              ...this.state.recipes,
              loading: true,
            },
          });

          axios.all([requestOne, requestTwo, requestTree]).then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responseTree = responses[2];
            console.log(responseTree);
            this.setState({
                ...this.state,
                recipes: {
                  ...this.state.recipes,
                  data: { ...responses[0].data },
                  steps: [...responses[1].data[0].steps],
                  similar: [...responses[2].data],
                  dataReceived : true,
                  error: false,
                  errorMessage: "",
                },

              });
            // use/access the results 
          })).catch(errors => {
            this.setState({
                ...this.state,
                recipes: {
                  ...this.state.recipes,
                  error: true,
                  errorMessage: errors,
                },
              });
          })
 
 

      }
    render(){
        // clean up the title
        const title = this.props.match.params.title.replace(/-/g," ");
    return(<>
    <Box
    borderBottom={1}>
    <Typography variant="h3">{title}</Typography>
    </Box>
    <Box
    pb={{ xs: 2, sm: 3, md: 4 }}
    pt={{ xs: 2, sm: 3, md: 4 }}
    >
    <Typography variant="overline" >What do we need to get cooking </Typography>
    </Box>

    {this.state.recipes.dataReceived && 
    (<><Box
      border={1} 
      borderRadius="5px"
      p={{ xs: 2, sm: 3, md: 4 }}>
    <Grid container spacing={4}>
        {this.state.recipes.data.ingredients.map(ingr => (
            <Grid item s={12} md={2} xl={2} key={ingr.id} >
                <Card>
            <CardActionArea>
            <Typography gutterBottom variant="subtitle1" component="h3" >{ingr.name}</Typography>
                <CardMedia
                component="img"
                height="100"
                src={basePicUri + ingr.image}
                title="sorry no img" />
                <CardContent>

    <Typography gutterBottom variant="subtitle1" component="h3" >{ingr.amount.metric.value} : {ingr.amount.metric.unit}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </Grid>
        ))}
        </Grid></Box>
        <Box
    pb={{ xs: 2, sm: 3, md: 4 }}
    pt={{ xs: 2, sm: 3, md: 4 }}
    >
        <Typography variant="overline" >How to make this Delicious dish</Typography>
        </Box>
        <Box 
        border={1} 
        borderRadius="5px"
        p={{ xs: 2, sm: 3, md: 4 }}
        >        
          <ol>{this.state.recipes.steps.map(steps => 
            (<li key={steps.id}>{steps.step}</li>))}
        </ol>
        </Box>
        <Box
    pb={{ xs: 2, sm: 3, md: 4 }}
    pt={{ xs: 2, sm: 3, md: 4 }}
    >
        <Typography variant="overline" >More recipes like this?</Typography>
        </Box>
    <Box
    border={1} 
    borderRadius="5px"
    p={{ xs: 2, sm: 3, md: 4 }}>
    <Grid container spacing={4}>

    {this.state.recipes.similar.map(recipe =>
    (<Grid item s={12} md={2} xl={2} key={recipe.id} >
        <Card>
            <CardActionArea>
                <CardMedia
                component="img"
                height="100"
                src={basePicRecipesUri + recipe.image}
                title="Menu pic" />
                <CardContent>
    <Typography gutterBottom variant="subtitle1" component="h2" >{recipe.title}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
          <Link to={`/recipe/${recipe.id}/${slugify(recipe.title)}`}>
            <Button size="small" color="primary">
              Go and cook this fabulous dish
            </Button>
          </Link>
        </CardActions>
        </Card>
    </Grid>))}</Grid></Box></>)
        }</>)
    }
}