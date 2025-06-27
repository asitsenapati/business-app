const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const corsOptions = {
    origin: "*",
  };
      
  // Enable CORS for all routes
  app.use(cors(corsOptions));
app.use('/auth', require('./routes/auth'));
app.use('/family', require('./routes/family'));
app.use('/pets', require('./routes/pets'));
app.use('/schedule', require('./routes/schedule'));
app.use('/payment', require('./routes/payment'));
app.use('/support', require('./routes/support'));
app.use('/admin', require('./routes/admin'));




app.get("/api", (req, res) => {
  res.json({ message: "CORS enabled for all origins!" });
});
    
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
