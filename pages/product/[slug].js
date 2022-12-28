import React from "react";
import NextLink from "next/link";
import Layout from "../../components/Layout";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import useStyles from "../../utils/styles";
import Image from "next/image";
import db from "../../utils/db";
import Product from "../../models/Product";

export default function ProductScrean(props) {
  const {product} = props;
  const classes = useStyles();
  if (!product) {
    return <div>page not found</div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>Back To Home</Link>
        </NextLink>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              layout="responsive"
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
                <ListItem>
                <Typography component="h1" variant='h1' >{product.name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating: {product.rating} stars ({product.numReviews} reviews)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item md={6} xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Typography>{product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item md={6} xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item md={6} xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? "Available" : "Unavailable"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button fullWidth color="primary" variant="contained">
                    Add To Cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;
  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return{
    props:{
      product: db.convertDocToObj(product)
    },
  } 
}