import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Layout from "../components/Layout";
// import data from "../utils/data";
import NextLink from 'next/link'
import db from "../utils/db";
import Product from "../models/Product";
export default function Home(props) {
  const {products} = props
  return (
    <Layout>
      <div>
        <h1>products</h1>
        {/* <ul>
          {productss.map((prod) => {
            console.log("this is : " , JSON.stringify({prod}))
          })}
        </ul> */}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              
              <Card>
                <NextLink href={`/product/${product.slug}`}>
                  <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
                </NextLink>
                
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="medium" color="primary">Add To Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return{
    props:{
      products: products.map(db.convertDocToObj)
    },
  } 
}