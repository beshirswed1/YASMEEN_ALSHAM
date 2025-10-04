    // src/components/ProductCard.jsx
    import React from "react";
    import Button from "@mui/material/Button";
    import { useCart } from "../contexts/CartContext";
    import { gsap } from "gsap";

    const ProductCard = ({ product }) => {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        // 1) نعمل تأثير "fly to cart" - اختياري لكن يعطي تجربة ممتازة
        const img = document.getElementById(`prod-img-${product.id}`);
        const cartIcon = document.getElementById("cart-icon");

        if (img && cartIcon) {
        const clone = img.cloneNode(true);
        const rect = img.getBoundingClientRect();
        clone.style.position = "fixed";
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.zIndex = 9999;
        clone.style.borderRadius = "8px";
        document.body.appendChild(clone);

        const cartRect = cartIcon.getBoundingClientRect();
        const dx = cartRect.left + cartRect.width / 2 - (rect.left + rect.width / 2);
        const dy = cartRect.top + cartRect.height / 2 - (rect.top + rect.height / 2);

        gsap.to(clone, {
            duration: 0.8,
            x: dx,
            y: dy,
            scale: 0.2,
            opacity: 0.8,
            ease: "power3.out",
            onComplete: () => clone.remove(),
        });
        }

        // 2) نضيف العنصر فعلياً إلى السلة
        addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "",
        }, 1);
    };

    return (
        <div className="p-4 border rounded-md shadow-sm">
        <div className="w-full h-48 mb-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
            <img id={`prod-img-${product.id}`} src={product.image || ""} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <h3 className="font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
            <div className="text-lg font-bold">{product.price} SAR</div>
            <Button variant="contained" onClick={handleAddToCart}>أضف للسلة</Button>
        </div>
        </div>
    );
    };

    export default ProductCard;
