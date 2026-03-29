import { Router, Request, Response } from 'express';
import { uploadConfig } from './config/multer';

// Middlewares
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';

// Controllers - User
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

// Controllers - Category
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

// Controllers - Product
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductController } from './controllers/product/ListProductController';

// Controllers - Cart
import { AddItemController } from './controllers/cart/AddItemController';
import { RemoveItemController } from './controllers/cart/RemoveItemController';
import { ListCartController } from './controllers/cart/ListCartController';

// Controllers - Order
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { ListAllOrdersController } from './controllers/order/ListAllOrdersController';
import { UpdateStatusOrderController } from './controllers/order/UpdateStatusOrderController';

// Controllers - Review
import { CreateReviewController } from './controllers/review/CreateReviewController';
import { ListReviewController } from './controllers/review/ListReviewController';

const router = Router();

// ==== ROTAS ====

// Test API
router.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Tech Store API is running!' });
});

// -- USERS / AUTH --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

// Protected routes (require token)
router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- CATEGORIES --
router.post('/category', isAuthenticated, isAdmin, new CreateCategoryController().handle);
router.get('/category', new ListCategoryController().handle);

// -- PRODUCTS --
router.post('/product', isAuthenticated, isAdmin, uploadConfig.single('file'), new CreateProductController().handle);
router.get('/product', new ListProductController().handle);

// -- CART --
router.post('/cart', isAuthenticated, new AddItemController().handle);
router.delete('/cart', isAuthenticated, new RemoveItemController().handle);
router.get('/cart', isAuthenticated, new ListCartController().handle);

// -- ORDERS (CHECKOUT) --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.get('/order', isAuthenticated, new ListOrderController().handle);

// -- ORDERS (ADMIN) --
router.get('/admin/orders', isAuthenticated, isAdmin, new ListAllOrdersController().handle);
router.put('/admin/orders/status', isAuthenticated, isAdmin, new UpdateStatusOrderController().handle);

// -- REVIEWS --
router.post('/review', isAuthenticated, new CreateReviewController().handle);
router.get('/review', new ListReviewController().handle);

export { router };
