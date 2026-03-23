import express from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//route s
//root rout e
app.get('/', async (req, res) => {
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   let response = await fetch(url);
   let data = await response.json();
   
   let rand = Math.floor(Math.random() * 50);
   let randImg = data.hits[rand];
   
   res.render('home.ejs', {randImg});
});

app.get('/apod', async (req, res) => {
   try {
      const date = new Date();
      let pad = (n) => String(n).padStart(2, '0');
      let currentDate = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`

      let url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${currentDate}`;
      let response = await fetch(url);
      let data = await response.json();
      console.log("FULL DATA:", JSON.stringify(data));
      res.render('apod.ejs', {data});
   } catch(err) {
      console.log("Error!", err);
   }
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   let planetInfo = planets[`get${planet}`]();
   res.render('planet.ejs', {planetInfo, planet})
});

app.get('/meteorInfo', (req, res) => {
   let meteor = req.query.meteor;
   let meteorInfo = planets[`get${meteor}`]();
   res.render('meteor.ejs', {meteorInfo, meteor});
});

app.get('/comet-asteroidInfo', (req, res) => {
   let comet = req.query.comet;
   let cometInfo = planets[`get${comet}`]();
   res.render('comet-asteroid.ejs', {cometInfo, comet});
});

app.listen(3000, () => {
   console.log('server started');
});
