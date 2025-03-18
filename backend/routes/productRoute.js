// backend/routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Ajouter un produit
router.post('/', async (req, res) => {
  const { name, description, price, image, stock } = req.body;

  try {
    const newProduct = new Product({ name, description, price, image, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du produit' });
  }
});

// Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
});

// Récupérer un produit spécifique
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
  }
});

export default router;
