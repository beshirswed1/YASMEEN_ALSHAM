    // src/components/Header.jsx
    import React, { useState } from "react";
    import PillNav from "./PillNav"; // المكان حسب مشروعك
    import IconButton from "@mui/material/IconButton";
    import Badge from "@mui/material/Badge";
    import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
    import CartDrawer from "./CartDrawer";
    import { useCart } from "../contexts/CartContext";

    const Header = ({ logo, items, activeHref }) => {
    const { getTotalCount } = useCart();
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full flex items-center justify-between px-4 py-3">
        {/* نركّب الـ PillNav (يحتوي الشعار داخله بالفعل حسب مكوّنك) */}
        <div className="flex-1">
            <PillNav
            logo={logo}
            items={items}
            activeHref={activeHref}
            baseColor="#000000"
            pillColor="#ffffff"
            pillTextColor="#000000"
            hoveredPillTextColor="#ffffff"
            />
        </div>

        {/* أيقونة السلة بجانب الـ Navbar */}
        <div className="flex items-center gap-2">
            <IconButton id="cart-icon" aria-label="Cart" onClick={() => setOpen(true)}>
            <Badge badgeContent={getTotalCount()} color="error">
                <ShoppingCartIcon />
            </Badge>
            </IconButton>
        </div>

        {/* الدروَر الفعلي (CartDrawer) */}
        <CartDrawer open={open} onClose={() => setOpen(false)} />
        </header>
    );
    };

    export default Header;
