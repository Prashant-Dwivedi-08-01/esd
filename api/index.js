import express from 'express';
import { registerUser, auth, checkBill, payBill, updateUser } from '../controllers/user.js';
import { officerAuth, insertBill, checkAllBill, updateBill, deleteBill, deleteUser, checkAllUsers } from '../controllers/officer.js';
import { checkUserAuth } from '../middlewares/checkUserAuth.js';
import { checkOfficerAuth } from '../middlewares/checkOfficerAuth.js';

const router = express.Router();

//!User Endpoints
router.post('/user/auth', auth);
router.post('/user/register', registerUser);
router.patch('/user/update/',checkUserAuth, updateUser);
router.get('/user/check-bill/:meterNumber', checkBill);
router.post('/user/pay-bill/:meterNumber',checkUserAuth, payBill);

//!Officer Endpoints
router.post('/officer/auth', officerAuth);
router.post('/officer/insert-bill', checkOfficerAuth, insertBill);
router.post('/officer/check-bill', checkOfficerAuth, checkAllBill);
router.post('/officer/check-user', checkOfficerAuth, checkAllUsers);
router.patch('/officer/update-bill', checkOfficerAuth, updateBill);
router.delete('/officer/delete-bill/:meterNumber', checkOfficerAuth, deleteBill);
router.delete('/officer/delete-user/:meterNumber', checkOfficerAuth, deleteUser);

export default router;
