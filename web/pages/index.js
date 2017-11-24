import Layout from '../components/layout'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Send from 'material-ui-icons/Send'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    padding: 20
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  body: {
    opacity: 0.6
  }
})

const main = (props) => {
  const { classes } = props
  return (
    <Layout title='Ders.im | Ana sayfa'>
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            { /* <Paper className={classes.paper}>xs=12</Paper> */ }
            <Typography type='display1' gutterBottom>
              Ders.im, öğrenciler ve öğretmenler için bir <b>sosyal eğitim</b> ortamıdır 👋
            </Typography>
            <Typography type='body1' gutterBottom className={classes.body}>
              Çıkmış sınav sorularını inceleyebileceğin, ilgili dersin notlarına erişebileceğin, eğitim videoları ile bilgilerini pekiştirebileceğin ve hatta hazırladığın eğitim materyallerini sergileyebileceğin en iyi yer.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button className={classes.button} raised color='primary'>
              Giriş Yap & Kayıt Ol
              <Send className={props.classes.rightIcon} />
            </Button>
            <Button className={classes.button} raised color='primary'>
              Google Play Store
              <Send className={props.classes.rightIcon} />
            </Button>
            <Button className={classes.button} raised color='primary'>
              App Store
              <Send className={props.classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>Keşfet</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>Son Sorular</Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

main.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(main)
