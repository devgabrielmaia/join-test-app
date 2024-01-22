import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Icon from "../@core/components/icon";
import Card from "@mui/material/Card";
import {useRouter} from "next/router";

const Home = () => {

  const router = useRouter();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card onClick={() => router.replace('/products')} style={{ padding: 30, borderRadius: 10}}>
            <Grid justifyContent="center" container>
              <Grid xs="auto" item>
                <Icon width={50} icon='icon-park-outline:ad-product' />
              </Grid>
              <Grid style={{ marginTop: 20 }} item xs={12}>
                <Typography textAlign="center">Products</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card onClick={() => router.replace('/categories')} style={{ padding: 30, borderRadius: 10}}>
            <Grid justifyContent="center" container>
              <Grid xs="auto" item>
                <Icon width={50} icon='material-symbols:category' />
              </Grid>
              <Grid style={{ marginTop: 20 }} item xs={12}>
                <Typography textAlign="center">Categories</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

      </Grid>
    </>
  )
}

export default Home
