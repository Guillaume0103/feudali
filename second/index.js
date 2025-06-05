const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend du jeu de points multijoueur !');
});

// Route pour créer un point
app.post('/points', async (req, res) => {
  const { x, y, couleur } = req.body;
  if (typeof x !== 'number' || typeof y !== 'number' || typeof couleur !== 'string') {
    return res.status(400).json({ error: 'Paramètres invalides.' });
  }

  try {
    const point = await prisma.point.create({
      data: { x, y, couleur }
    });
    res.status(201).json(point);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement du point.' });
  }
});

// Route pour obtenir tous les points
app.get('/points', async (req, res) => {
  try {
    const points = await prisma.point.findMany();
    res.json(points);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des points.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
