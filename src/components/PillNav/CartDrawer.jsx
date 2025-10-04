    // src/components/CartDrawer.jsx
    import React from "react";
    import Drawer from "@mui/material/Drawer";
    import List from "@mui/material/List";
    import ListItem from "@mui/material/ListItem";
    import IconButton from "@mui/material/IconButton";
    import Button from "@mui/material/Button";
    import Typography from "@mui/material/Typography";
    import { useCart } from "../contexts/CartContext";
    import CloseIcon from "@mui/icons-material/Close";

    const CartDrawer = ({ open, onClose }) => {
    const { cartItems, removeItem, updateQty, getTotalPrice, clearCart } = useCart();

    const changeQty = (id, delta) => {
        const item = cartItems.find((i) => i.id === id);
        if (!item) return;
        const newQty = Math.max(1, item.qty + delta);
        updateQty(id, newQty);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
        <div style={{ width: 380, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">سلة مشترياتك</Typography>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </div>

            <List>
            {cartItems.length === 0 && (
                <Typography sx={{ mt: 2 }}>السلة فارغة حالياً</Typography>
            )}

            {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <img src={item.image || ""} alt={item.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 8, background: "#f3f3f3" }} />
                <div style={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                    <Typography sx={{ color: "#666", fontSize: 13 }}>{item.price} SAR</Typography>

                    <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
                    <Button size="small" variant="outlined" onClick={() => changeQty(item.id, -1)}>-</Button>
                    <Typography>{item.qty}</Typography>
                    <Button size="small" variant="outlined" onClick={() => changeQty(item.id, 1)}>+</Button>
                    <Button size="small" color="error" onClick={() => removeItem(item.id)}>حذف</Button>
                    </div>
                </div>
                </ListItem>
            ))}
            </List>

            <div style={{ marginTop: 16 }}>
            <Typography variant="subtitle1">الإجمالي: {getTotalPrice()} SAR</Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={cartItems.length === 0}>
                إتمام الدفع
            </Button>
            <Button variant="text" color="inherit" fullWidth sx={{ mt: 1 }} onClick={clearCart}>
                تفريغ السلة
            </Button>
            </div>
        </div>
        </Drawer>
    );
    };

    export default CartDrawer;
