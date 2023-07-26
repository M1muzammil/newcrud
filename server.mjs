import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const __dirname = path.resolve();

import apiv1router from './apiv1/main.mjs'







// Enable CORS for specific origins
app.use(cors({
  origin: ['http://localhost:3000', 'http://your-allowed-domain.com'],
}));

app.use(express.json());
app.use("/api/v1", apiv1router)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
