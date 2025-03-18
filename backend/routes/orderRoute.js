// backend/routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Middleware pour vérifier le token JWT

const router = express.Router();

// Créer une commande
router.post('/', verifyToken, async (req, res) => {
  const { products, totalPrice } = req.body;
  
  // Vérifier que les produits existent et sont en stock
  try {
    const productDetails = await Promise.all(
      products.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error(`Produit non trouvé: ${productId}`);
        if (product.stock < quantity) throw new Error(`Stock insuffisant pour le produit: ${productId}`);
        return { product, quantity };
      })
    );

    // Créer la commande
    const order = new Order({
      user: req.userId,  // Utilisateur connecté
      products: productDetails.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    await order.save();

    // Mettre à jour le stock des produits
    await Promise.all(
      productDetails.map(async ({ product, quantity }) => {
        product.stock -= quantity;
        await product.save();
      })
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Récupérer toutes les commandes de l'administrateur
router.get('/', verifyToken, async (req, res) => {
  try {
    if (!req.isAdmin) return res.status(403).json({ message: 'Accès interdit' });
    
    const orders = await Order.find().populate('user').populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
});

// Récupérer les commandes d'un utilisateur
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de vos commandes' });
  }
});

// Mettre à jour le statut d'une commande (ex: 'shipped', 'delivered')
router.put('/:id/status', verifyToken, async (req, res) => {
  const { status } = req.body;
  try {
    if (!req.isAdmin) return res.status(403).json({ message: 'Accès interdit' });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la commande' });
  }
});

export default router;
